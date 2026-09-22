from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

class UserBase(BaseModel):
    full_name: str
    email: str
    role: str = "farmer"
    preferred_language: str = "en"

class UserResponse(UserBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

class FarmBase(BaseModel):
    name: str
    location: str
    area_acres: float = 2.0
    current_crop: str
    crop_variety: Optional[str] = None
    crop_stage: str = "Vegetative"
    sowing_date: Optional[str] = None
    irrigation_type: str = "Drip Irrigation"

class FarmCreate(FarmBase):
    pass

class FarmResponse(FarmBase):
    id: int
    user_id: int
    created_at: datetime
    class Config:
        from_attributes = True

class DifferentialItem(BaseModel):
    disease: str
    disease_hi: Optional[str] = None
    probability: int

class DiagnosisResponse(BaseModel):
    id: int
    crop: str
    possible_disease: str
    disease_name_hi: Optional[str] = None
    confidence: float
    severity: str
    summary: Optional[str] = None
    summary_hi: Optional[str] = None
    observed_symptoms: List[str] = []
    evidence_reason: Optional[str] = None
    immediate_actions: List[str] = []
    immediate_actions_hi: List[str] = []
    prevention: List[str] = []
    prevention_hi: List[str] = []
    monitoring: List[str] = []
    monitoring_hi: List[str] = []
    differential_diagnosis: List[DifferentialItem] = []
    warnings: List[str] = []
    sources: List[Dict[str, Any]] = []
    weather_context: Optional[Dict[str, Any]] = None
    expert_reviewed: bool = False
    expert_status: str = "none"
    image_url: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True

class ImageQualityResult(BaseModel):
    is_valid: bool
    message: str
    message_hi: str
    resolution_ok: bool
    brightness_ok: bool
    blur_ok: bool
    suggestions: List[str] = []
    suggestions_hi: List[str] = []

class ChatMessageCreate(BaseModel):
    text: str
    language: str = "en"
    session_id: Optional[int] = None
    image_url: Optional[str] = None

class ChatMessageResponse(BaseModel):
    id: int
    session_id: int
    sender: str
    text: str
    sources: List[Dict[str, Any]] = []
    suggested_followups: List[str] = []
    created_at: datetime
    class Config:
        from_attributes = True

class WeatherResponse(BaseModel):
    location: str
    temperature: float
    humidity: float
    rain_probability: float
    wind_speed: float
    condition: str
    forecast_data: List[Dict[str, Any]] = []
    disease_risk_alert: Optional[str] = None
    disease_risk_alert_hi: Optional[str] = None

class ExpertReviewCreate(BaseModel):
    diagnosis_id: int
    expert_notes: Optional[str] = None

class ExpertReviewResolve(BaseModel):
    status: str  # confirmed, corrected
    confirmed_disease: Optional[str] = None
    expert_notes: str
    recommended_prescription: Optional[str] = None

class FeedbackCreate(BaseModel):
    diagnosis_id: int
    is_helpful: bool
    prediction_accuracy: str = "Correct"  # Correct, Incorrect, Not Sure
    comments: Optional[str] = None
