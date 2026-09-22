import os
import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Query
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.config import settings
from app.models.entities import (
    User, Farm, Disease, Diagnosis, DiagnosisImage, ChatSession, ChatMessage,
    WeatherRecord, ExpertReview, Feedback
)
from app.schemas.schemas import (
    FarmCreate, FarmResponse, DiagnosisResponse, ImageQualityResult,
    ChatMessageCreate, ChatMessageResponse, WeatherResponse,
    ExpertReviewCreate, ExpertReviewResolve, FeedbackCreate
)
from app.vision.vision_service import vision_service
from app.rag.rag_service import rag_service
from app.services.weather_service import weather_service
from app.speech.speech_service import speech_service

router = APIRouter()

# ----------------- AUTH & DEMO -----------------
@router.post("/auth/demo-login")
def demo_login(db: Session = Depends(get_db)):
    user = db.query(User).first()
    if not user:
        user = User(
            full_name="Ramesh Kumar",
            email="ramesh.farmer@agrisathi.org",
            role="farmer",
            preferred_language="en"
        )
        db.add(user)
        db.commit()
        db.refresh(user)

        # Seed initial farm for demo user
        demo_farm = Farm(
            user_id=user.id,
            name="Ramesh Organic Farm",
            location="Bhopal, Madhya Pradesh",
            area_acres=2.5,
            current_crop="Tomato",
            crop_variety="Pusa Ruby",
            crop_stage="Flowering",
            sowing_date="15 Aug 2026",
            irrigation_type="Drip Irrigation"
        )
        db.add(demo_farm)
        db.commit()

    return {
        "user_id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "role": user.role,
        "preferred_language": user.preferred_language,
        "token": "demo-token-agrisathi-2026"
    }

@router.post("/auth/login")
def login(email: str = Form(...), password: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(
            full_name=email.split("@")[0].title(),
            email=email,
            role="farmer",
            preferred_language="en"
        )
        db.add(user)
        db.commit()
        db.refresh(user)
    return {
        "user_id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "role": user.role,
        "preferred_language": user.preferred_language,
        "token": "auth-token-agrisathi"
    }

# ----------------- IMAGE QUALITY & DIAGNOSIS -----------------
@router.post("/diagnosis/quality-check", response_model=ImageQualityResult)
async def check_quality(file: UploadFile = File(...)):
    contents = await file.read()
    res = vision_service.check_image_quality(contents)
    return res

@router.post("/diagnosis/image")
async def diagnose_crop_image(
    file: UploadFile = File(...),
    farm_id: Optional[int] = Form(None),
    farm_crop: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    contents = await file.read()

    # 1. Quality Check
    quality_res = vision_service.check_image_quality(contents)
    if not quality_res["is_valid"]:
        return {
            "quality_failed": True,
            "quality_details": quality_res
        }

    # 2. Save file
    file_ext = os.path.splitext(file.filename or "upload.jpg")[1] or ".jpg"
    unique_filename = f"{uuid.uuid4().hex}{file_ext}"
    save_path = settings.UPLOAD_DIR / unique_filename
    with open(save_path, "wb") as f:
        f.write(contents)
    image_url = f"/uploads/{unique_filename}"

    # 3. Vision Analysis
    diag_data = vision_service.analyze_crop_image(contents, filename=file.filename or "", farm_crop=farm_crop)

    # 4. Weather Context
    weather_info = weather_service.get_current_weather()

    # 5. Save to database
    user = db.query(User).first()
    user_id = user.id if user else None

    diagnosis = Diagnosis(
        user_id=user_id,
        farm_id=farm_id,
        crop=diag_data["crop"],
        possible_disease=diag_data["possible_disease"],
        disease_name_hi=diag_data.get("disease_name_hi"),
        confidence=diag_data["confidence"],
        severity=diag_data["severity"],
        summary=f"Analysis indicates symptoms characteristic of {diag_data['possible_disease']}.",
        summary_hi=f"विश्लेषण से पता चलता है कि यह {diag_data.get('disease_name_hi', diag_data['possible_disease'])} के लक्षण हैं।",
        observed_symptoms=diag_data["observed_symptoms"],
        evidence_reason=diag_data["evidence_reason"],
        immediate_actions=diag_data["immediate_actions"],
        immediate_actions_hi=diag_data.get("immediate_actions_hi", []),
        prevention=diag_data["prevention"],
        prevention_hi=diag_data.get("prevention_hi", []),
        monitoring=diag_data["monitoring"],
        monitoring_hi=diag_data.get("monitoring_hi", []),
        differential_diagnosis=diag_data["differential_diagnosis"],
        warnings=diag_data["warnings"],
        sources=diag_data["sources"],
        weather_context={
            "temperature": weather_info["temperature"],
            "humidity": weather_info["humidity"],
            "rain_probability": weather_info["rain_probability"],
            "risk_note": weather_info["disease_risk_alert"]
        },
        expert_status="none"
    )
    db.add(diagnosis)
    db.commit()
    db.refresh(diagnosis)

    diag_img = DiagnosisImage(
        diagnosis_id=diagnosis.id,
        image_url=image_url,
        image_type="primary",
        quality_score=0.98,
        is_clear=True
    )
    db.add(diag_img)
    db.commit()

    return {
        "quality_failed": False,
        "diagnosis_id": diagnosis.id,
        "crop": diagnosis.crop,
        "possible_disease": diagnosis.possible_disease,
        "disease_name_hi": diagnosis.disease_name_hi,
        "confidence": diagnosis.confidence,
        "severity": diagnosis.severity,
        "observed_symptoms": diagnosis.observed_symptoms,
        "evidence_reason": diagnosis.evidence_reason,
        "immediate_actions": diagnosis.immediate_actions,
        "immediate_actions_hi": diagnosis.immediate_actions_hi,
        "prevention": diagnosis.prevention,
        "prevention_hi": diagnosis.prevention_hi,
        "monitoring": diagnosis.monitoring,
        "monitoring_hi": diagnosis.monitoring_hi,
        "differential_diagnosis": diagnosis.differential_diagnosis,
        "warnings": diagnosis.warnings,
        "sources": diagnosis.sources,
        "weather_context": diagnosis.weather_context,
        "image_url": image_url,
        "created_at": diagnosis.created_at
    }

@router.get("/diagnosis/{id}")
def get_diagnosis_detail(id: int, db: Session = Depends(get_db)):
    diag = db.query(Diagnosis).filter(Diagnosis.id == id).first()
    if not diag:
        raise HTTPException(status_code=404, detail="Diagnosis record not found")

    img = db.query(DiagnosisImage).filter(DiagnosisImage.diagnosis_id == diag.id).first()
    reviews = db.query(ExpertReview).filter(ExpertReview.diagnosis_id == diag.id).all()

    return {
        "id": diag.id,
        "crop": diag.crop,
        "possible_disease": diag.possible_disease,
        "disease_name_hi": diag.disease_name_hi,
        "confidence": diag.confidence,
        "severity": diag.severity,
        "summary": diag.summary,
        "summary_hi": diag.summary_hi,
        "observed_symptoms": diag.observed_symptoms or [],
        "evidence_reason": diag.evidence_reason,
        "immediate_actions": diag.immediate_actions or [],
        "immediate_actions_hi": diag.immediate_actions_hi or [],
        "prevention": diag.prevention or [],
        "prevention_hi": diag.prevention_hi or [],
        "monitoring": diag.monitoring or [],
        "monitoring_hi": diag.monitoring_hi or [],
        "differential_diagnosis": diag.differential_diagnosis or [],
        "warnings": diag.warnings or [],
        "sources": diag.sources or [],
        "weather_context": diag.weather_context,
        "expert_reviewed": diag.expert_reviewed,
        "expert_status": diag.expert_status,
        "image_url": img.image_url if img else "/assets/demo/leaf_tomato.jpg",
        "created_at": diag.created_at,
        "expert_reviews": [
            {
                "expert_name": r.expert_name,
                "organization": r.expert_organization,
                "status": r.status,
                "confirmed_disease": r.confirmed_disease,
                "notes": r.expert_notes,
                "prescription": r.recommended_prescription,
                "reviewed_at": r.reviewed_at
            }
            for r in reviews
        ]
    }

@router.get("/diagnoses")
def list_diagnoses(
    crop: Optional[str] = None,
    disease: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Diagnosis).order_by(Diagnosis.created_at.desc())
    if crop:
        query = query.filter(Diagnosis.crop.ilike(f"%{crop}%"))
    if disease:
        query = query.filter(Diagnosis.possible_disease.ilike(f"%{disease}%"))

    items = query.all()
    results = []
    for d in items:
        img = db.query(DiagnosisImage).filter(DiagnosisImage.diagnosis_id == d.id).first()
        results.append({
            "id": d.id,
            "crop": d.crop,
            "possible_disease": d.possible_disease,
            "disease_name_hi": d.disease_name_hi,
            "confidence": d.confidence,
            "severity": d.severity,
            "expert_status": d.expert_status,
            "image_url": img.image_url if img else "/assets/demo/leaf_tomato.jpg",
            "created_at": d.created_at
        })
    return results

@router.post("/diagnosis/{id}/feedback")
def submit_feedback(id: int, payload: FeedbackCreate, db: Session = Depends(get_db)):
    diag = db.query(Diagnosis).filter(Diagnosis.id == id).first()
    if not diag:
        raise HTTPException(status_code=404, detail="Diagnosis not found")

    fb = Feedback(
        diagnosis_id=id,
        is_helpful=payload.is_helpful,
        prediction_accuracy=payload.prediction_accuracy,
        comments=payload.comments
    )
    db.add(fb)
    db.commit()
    return {"status": "Feedback recorded. Thank you for improving AgriSathi."}

# ----------------- CHAT & RAG -----------------
@router.post("/chat")
def chat_with_assistant(payload: ChatMessageCreate, db: Session = Depends(get_db)):
    # 1. Check or create session
    session = None
    if payload.session_id:
        session = db.query(ChatSession).filter(ChatSession.id == payload.session_id).first()
    if not session:
        session = ChatSession(
            title=f"Consultation: {payload.text[:30]}...",
            language=payload.language
        )
        db.add(session)
        db.commit()
        db.refresh(session)

    # 2. Save user message
    user_msg = ChatMessage(
        session_id=session.id,
        sender="user",
        text=payload.text,
        image_url=payload.image_url
    )
    db.add(user_msg)
    db.commit()

    # 3. Generate grounded RAG response
    response_data = rag_service.generate_response(
        query=payload.text,
        language=payload.language
    )

    # 4. Save assistant reply
    assistant_msg = ChatMessage(
        session_id=session.id,
        sender="assistant",
        text=response_data["text"],
        sources=response_data["sources"],
        suggested_followups=response_data["suggested_followups"]
    )
    db.add(assistant_msg)
    db.commit()
    db.refresh(assistant_msg)

    return {
        "session_id": session.id,
        "message_id": assistant_msg.id,
        "sender": "assistant",
        "text": assistant_msg.text,
        "sources": assistant_msg.sources,
        "suggested_followups": assistant_msg.suggested_followups,
        "created_at": assistant_msg.created_at
    }

# ----------------- SPEECH SERVICES -----------------
@router.post("/speech/transcribe")
async def transcribe_speech(
    file: UploadFile = File(None),
    language: str = Form("en")
):
    contents = await file.read() if file else b""
    res = speech_service.transcribe_audio(contents, filename=file.filename if file else "", language=language)
    return res

@router.post("/speech/synthesize")
def synthesize_speech(text: str = Form(...), language: str = Form("en")):
    res = speech_service.synthesize_speech(text, language=language)
    return res

# ----------------- WEATHER -----------------
@router.get("/weather", response_model=WeatherResponse)
def get_weather(location: str = "Madhya Pradesh, India"):
    data = weather_service.get_current_weather(location=location)
    return data

# ----------------- FARMS -----------------
@router.get("/farms", response_model=List[FarmResponse])
def get_farms(db: Session = Depends(get_db)):
    farms = db.query(Farm).all()
    return farms

@router.post("/farms", response_model=FarmResponse)
def create_farm(payload: FarmCreate, db: Session = Depends(get_db)):
    user = db.query(User).first()
    user_id = user.id if user else 1
    farm = Farm(
        user_id=user_id,
        name=payload.name,
        location=payload.location,
        area_acres=payload.area_acres,
        current_crop=payload.current_crop,
        crop_variety=payload.crop_variety,
        crop_stage=payload.crop_stage,
        sowing_date=payload.sowing_date,
        irrigation_type=payload.irrigation_type
    )
    db.add(farm)
    db.commit()
    db.refresh(farm)
    return farm

# ----------------- DISEASE LIBRARY -----------------
@router.get("/diseases")
def list_diseases(crop: Optional[str] = None, q: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Disease)
    if crop:
        query = query.filter(Disease.crop.ilike(f"%{crop}%"))
    if q:
        query = query.filter((Disease.name.ilike(f"%{q}%")) | (Disease.name_hi.ilike(f"%{q}%")))

    diseases = query.all()
    return [
        {
            "id": d.id,
            "crop": d.crop,
            "name": d.name,
            "name_hi": d.name_hi,
            "pathogen_type": d.pathogen_type,
            "severity_level": d.severity_level,
            "scientific_name": d.scientific_name,
            "symptoms": d.symptoms or [],
            "symptoms_hi": d.symptoms_hi or [],
            "prevention": d.prevention or [],
            "prevention_hi": d.prevention_hi or [],
            "image_url": d.image_url or "/assets/demo/leaf_tomato.jpg"
        }
        for d in diseases
    ]

@router.get("/diseases/{id}")
def get_disease_detail(id: int, db: Session = Depends(get_db)):
    d = db.query(Disease).filter(Disease.id == id).first()
    if not d:
        raise HTTPException(status_code=404, detail="Disease record not found in library")

    return {
        "id": d.id,
        "crop": d.crop,
        "name": d.name,
        "name_hi": d.name_hi,
        "pathogen_type": d.pathogen_type,
        "scientific_name": d.scientific_name,
        "severity_level": d.severity_level,
        "symptoms": d.symptoms or [],
        "symptoms_hi": d.symptoms_hi or [],
        "possible_causes": d.possible_causes or [],
        "prevention": d.prevention or [],
        "prevention_hi": d.prevention_hi or [],
        "management": d.management or [],
        "management_hi": d.management_hi or [],
        "similar_diseases": d.similar_diseases or [],
        "sources": d.sources or [],
        "image_url": d.image_url or "/assets/demo/leaf_tomato.jpg"
    }

# ----------------- EXPERT REVIEW -----------------
@router.post("/expert-review")
def request_expert_review(payload: ExpertReviewCreate, db: Session = Depends(get_db)):
    diag = db.query(Diagnosis).filter(Diagnosis.id == payload.diagnosis_id).first()
    if not diag:
        raise HTTPException(status_code=404, detail="Diagnosis not found")

    diag.expert_status = "pending"
    review = ExpertReview(
        diagnosis_id=diag.id,
        expert_name="Dr. Arvind Sharma (Senior Agronomist)",
        expert_organization="Krishi Vigyan Kendra (KVK)",
        status="pending",
        expert_notes=payload.expert_notes or "Farmer requested priority verification."
    )
    db.add(review)
    db.commit()
    return {"status": "Case submitted to agricultural expert queue.", "review_id": review.id}

@router.get("/expert/cases")
def get_expert_cases(db: Session = Depends(get_db)):
    cases = db.query(Diagnosis).filter(Diagnosis.expert_status.in_(["pending", "reviewed", "corrected"])).order_by(Diagnosis.created_at.desc()).all()
    results = []
    for c in cases:
        img = db.query(DiagnosisImage).filter(DiagnosisImage.diagnosis_id == c.id).first()
        results.append({
            "diagnosis_id": c.id,
            "crop": c.crop,
            "ai_prediction": c.possible_disease,
            "ai_confidence": c.confidence,
            "severity": c.severity,
            "expert_status": c.expert_status,
            "image_url": img.image_url if img else "/assets/demo/leaf_tomato.jpg",
            "submitted_at": c.created_at
        })
    return results

@router.post("/expert/cases/{id}/resolve")
def resolve_expert_case(id: int, payload: ExpertReviewResolve, db: Session = Depends(get_db)):
    diag = db.query(Diagnosis).filter(Diagnosis.id == id).first()
    if not diag:
        raise HTTPException(status_code=404, detail="Diagnosis record not found")

    diag.expert_reviewed = True
    diag.expert_status = payload.status  # "reviewed" or "corrected"
    if payload.confirmed_disease:
        diag.possible_disease = payload.confirmed_disease

    review = db.query(ExpertReview).filter(ExpertReview.diagnosis_id == id).order_by(ExpertReview.created_at.desc()).first()
    if not review:
        review = ExpertReview(diagnosis_id=id)
        db.add(review)

    review.status = payload.status
    review.confirmed_disease = payload.confirmed_disease or diag.possible_disease
    review.expert_notes = payload.expert_notes
    review.recommended_prescription = payload.recommended_prescription
    review.reviewed_at = datetime.utcnow()

    db.commit()
    return {"status": "Expert review saved and farmer notified."}
