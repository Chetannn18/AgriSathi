from datetime import datetime
from sqlalchemy import (
    Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey, JSON
)
from sqlalchemy.orm import relationship
from app.core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    role = Column(String(20), default="farmer")  # farmer, student, expert
    preferred_language = Column(String(10), default="en")  # en, hi
    created_at = Column(DateTime, default=datetime.utcnow)

    farms = relationship("Farm", back_populates="owner", cascade="all, delete-orphan")
    diagnoses = relationship("Diagnosis", back_populates="user", cascade="all, delete-orphan")
    chat_sessions = relationship("ChatSession", back_populates="user", cascade="all, delete-orphan")

class Farm(Base):
    __tablename__ = "farms"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(120), nullable=False)
    location = Column(String(200), nullable=False)
    area_acres = Column(Float, default=2.0)
    current_crop = Column(String(80), nullable=False)
    crop_variety = Column(String(80), nullable=True)
    crop_stage = Column(String(50), default="Vegetative")  # Germination, Vegetative, Flowering, Development, Maturity, Harvest
    sowing_date = Column(String(50), nullable=True)
    irrigation_type = Column(String(80), default="Drip Irrigation")
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="farms")
    diagnoses = relationship("Diagnosis", back_populates="farm")

class Crop(Base):
    __tablename__ = "crops"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    name_hi = Column(String(100), nullable=False)
    category = Column(String(50), default="Vegetable")
    ideal_temp_min = Column(Float, nullable=True)
    ideal_temp_max = Column(Float, nullable=True)
    common_diseases = Column(JSON, default=list)

class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True, index=True)
    crop = Column(String(80), nullable=False, index=True)
    name = Column(String(120), nullable=False, index=True)
    name_hi = Column(String(120), nullable=False)
    pathogen_type = Column(String(50), default="Fungus")  # Fungus, Bacteria, Virus, Pest, Nutrient
    scientific_name = Column(String(150), nullable=True)
    severity_level = Column(String(30), default="Moderate")  # Mild, Moderate, Severe, Unknown
    symptoms = Column(JSON, default=list)
    symptoms_hi = Column(JSON, default=list)
    possible_causes = Column(JSON, default=list)
    prevention = Column(JSON, default=list)
    prevention_hi = Column(JSON, default=list)
    management = Column(JSON, default=list)
    management_hi = Column(JSON, default=list)
    similar_diseases = Column(JSON, default=list)
    image_url = Column(String(255), nullable=True)
    sources = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

class Diagnosis(Base):
    __tablename__ = "diagnoses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    farm_id = Column(Integer, ForeignKey("farms.id"), nullable=True)
    crop = Column(String(80), nullable=False)
    possible_disease = Column(String(120), nullable=False)
    disease_name_hi = Column(String(120), nullable=True)
    confidence = Column(Float, default=0.0)
    severity = Column(String(30), default="Moderate")  # Mild, Moderate, Severe, Unknown
    summary = Column(Text, nullable=True)
    summary_hi = Column(Text, nullable=True)
    observed_symptoms = Column(JSON, default=list)
    evidence_reason = Column(Text, nullable=True)
    immediate_actions = Column(JSON, default=list)
    immediate_actions_hi = Column(JSON, default=list)
    prevention = Column(JSON, default=list)
    prevention_hi = Column(JSON, default=list)
    monitoring = Column(JSON, default=list)
    monitoring_hi = Column(JSON, default=list)
    differential_diagnosis = Column(JSON, default=list)
    warnings = Column(JSON, default=list)
    sources = Column(JSON, default=list)
    weather_context = Column(JSON, default=dict)
    expert_reviewed = Column(Boolean, default=False)
    expert_status = Column(String(30), default="none")  # none, pending, reviewed, corrected
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="diagnoses")
    farm = relationship("Farm", back_populates="diagnoses")
    images = relationship("DiagnosisImage", back_populates="diagnosis", cascade="all, delete-orphan")
    expert_reviews = relationship("ExpertReview", back_populates="diagnosis", cascade="all, delete-orphan")
    feedbacks = relationship("Feedback", back_populates="diagnosis", cascade="all, delete-orphan")

class DiagnosisImage(Base):
    __tablename__ = "diagnosis_images"

    id = Column(Integer, primary_key=True, index=True)
    diagnosis_id = Column(Integer, ForeignKey("diagnoses.id"), nullable=False)
    image_url = Column(String(255), nullable=False)
    image_type = Column(String(30), default="primary")  # primary, day_1, day_7, comparison
    captured_at = Column(DateTime, default=datetime.utcnow)
    quality_score = Column(Float, default=1.0)
    is_clear = Column(Boolean, default=True)

    diagnosis = relationship("Diagnosis", back_populates="images")

class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    title = Column(String(150), default="Crop Consultation")
    language = Column(String(10), default="en")
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="chat_sessions")
    messages = relationship("ChatMessage", back_populates="session", cascade="all, delete-orphan")

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("chat_sessions.id"), nullable=False)
    sender = Column(String(20), default="user")  # user, assistant
    text = Column(Text, nullable=False)
    image_url = Column(String(255), nullable=True)
    audio_url = Column(String(255), nullable=True)
    sources = Column(JSON, default=list)
    suggested_followups = Column(JSON, default=list)
    created_at = Column(DateTime, default=datetime.utcnow)

    session = relationship("ChatSession", back_populates="messages")

class KnowledgeDocument(Base):
    __tablename__ = "knowledge_documents"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    crop = Column(String(80), nullable=False)
    disease = Column(String(120), nullable=True)
    region = Column(String(120), default="Pan-India")
    language = Column(String(20), default="English / Hindi")
    source_org = Column(String(150), nullable=False)
    source_url = Column(String(255), nullable=True)
    published_date = Column(String(50), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    chunks = relationship("KnowledgeChunk", back_populates="document", cascade="all, delete-orphan")

class KnowledgeChunk(Base):
    __tablename__ = "knowledge_chunks"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("knowledge_documents.id"), nullable=False)
    chunk_index = Column(Integer, default=0)
    content = Column(Text, nullable=False)
    keywords = Column(JSON, default=list)

    document = relationship("KnowledgeDocument", back_populates="chunks")

class WeatherRecord(Base):
    __tablename__ = "weather_records"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(String(120), nullable=False)
    temperature = Column(Float, nullable=False)
    humidity = Column(Float, nullable=False)
    rain_probability = Column(Float, default=0.0)
    wind_speed = Column(Float, default=5.0)
    condition = Column(String(60), default="Partly Cloudy")
    forecast_data = Column(JSON, default=list)
    disease_risk_alert = Column(String(255), nullable=True)
    recorded_at = Column(DateTime, default=datetime.utcnow)

class ExpertReview(Base):
    __tablename__ = "expert_reviews"

    id = Column(Integer, primary_key=True, index=True)
    diagnosis_id = Column(Integer, ForeignKey("diagnoses.id"), nullable=False)
    expert_name = Column(String(120), default="Dr. A. Sharma (Agronomist)")
    expert_organization = Column(String(150), default="Krishi Vigyan Kendra")
    status = Column(String(30), default="pending")  # pending, confirmed, corrected
    confirmed_disease = Column(String(120), nullable=True)
    expert_notes = Column(Text, nullable=True)
    recommended_prescription = Column(Text, nullable=True)
    reviewed_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    diagnosis = relationship("Diagnosis", back_populates="expert_reviews")

class Feedback(Base):
    __tablename__ = "feedbacks"

    id = Column(Integer, primary_key=True, index=True)
    diagnosis_id = Column(Integer, ForeignKey("diagnoses.id"), nullable=False)
    is_helpful = Column(Boolean, default=True)
    prediction_accuracy = Column(String(30), default="Correct")  # Correct, Incorrect, Not Sure
    comments = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    diagnosis = relationship("Diagnosis", back_populates="feedbacks")
