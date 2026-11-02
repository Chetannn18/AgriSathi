export type Language = 'en' | 'hi';

export interface User {
  id: number;
  full_name: string;
  email: string;
  role: string;
  preferred_language: Language;
  token?: string;
}

export interface Farm {
  id: number;
  user_id: number;
  name: string;
  location: string;
  area_acres: number;
  current_crop: string;
  crop_variety?: string;
  crop_stage: string;
  sowing_date?: string;
  irrigation_type: string;
  created_at: string;
}

export interface DifferentialItem {
  disease: string;
  disease_hi?: string;
  probability: number;
}

export interface SourceCitation {
  title: string;
  organization: string;
  url: string;
}

export interface ExpertReviewItem {
  expert_name: string;
  organization: string;
  status: string;
  confirmed_disease?: string;
  notes?: string;
  prescription?: string;
  reviewed_at?: string;
}

export interface Diagnosis {
  id: number;
  crop: string;
  crop_hi?: string;
  possible_disease: string;
  disease_name_hi?: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Unknown';
  summary?: string;
  summary_hi?: string;
  observed_symptoms: string[];
  symptoms_hi?: string[];
  evidence_reason?: string;
  immediate_actions: string[];
  immediate_actions_hi: string[];
  prevention: string[];
  prevention_hi: string[];
  monitoring: string[];
  monitoring_hi: string[];
  differential_diagnosis: DifferentialItem[];
  warnings: string[];
  warnings_hi?: string[];
  sources: SourceCitation[];
  weather_context?: {
    temperature: number;
    humidity: number;
    rain_probability: number;
    risk_note?: string;
  };
  expert_reviewed?: boolean;
  expert_status?: 'none' | 'pending' | 'reviewed' | 'corrected';
  image_url?: string;
  created_at: string;
  expert_reviews?: ExpertReviewItem[];
}

export interface Disease {
  id: number;
  crop: string;
  name: string;
  name_hi: string;
  pathogen_type: string;
  scientific_name?: string;
  severity_level: string;
  symptoms: string[];
  symptoms_hi: string[];
  possible_causes?: string[];
  prevention: string[];
  prevention_hi: string[];
  management?: string[];
  management_hi?: string[];
  similar_diseases?: string[];
  image_url?: string;
  sources?: SourceCitation[];
}

export interface ChatMessage {
  id: number;
  session_id: number;
  sender: 'user' | 'assistant';
  text: string;
  image_url?: string;
  sources?: SourceCitation[];
  suggested_followups?: string[];
  created_at: string;
}

export interface WeatherDay {
  day: string;
  date: string;
  temp: number;
  humidity: number;
  rain_prob: number;
  condition: string;
}

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  rain_probability: number;
  wind_speed: number;
  condition: string;
  forecast_data: WeatherDay[];
  disease_risk_alert?: string;
  disease_risk_alert_hi?: string;
}

export interface ImageQualityResult {
  is_valid: boolean;
  message: string;
  message_hi: string;
  resolution_ok: boolean;
  brightness_ok: boolean;
  blur_ok: boolean;
  suggestions: string[];
  suggestions_hi: string[];
}

export interface ExpertCase {
  diagnosis_id: number;
  crop: string;
  ai_prediction: string;
  ai_confidence: number;
  severity: string;
  expert_status: string;
  image_url?: string;
  submitted_at: string;
}
