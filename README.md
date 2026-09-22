# AgriSathi (एग्रीसाथी) 🌾
## Multimodal AI Agricultural Assistant for Crop Disease Detection & Vernacular Advisory

> **Version:** 1.0  
> **Platform:** Responsive Web Application (Mobile-First)  
> **Target Audience:** Indian Farmers, Agricultural Students, Agronomists & KVK Experts  
> **Languages Supported:** English + हिन्दी (Hindi)  
> **Knowledge Grounding:** ICAR, IIVR, CPRI, NRRI, CICR, IIHR, and IMD Agromet  

---

## 🌟 Key Highlights & Differentiators

- **📷 Computer Vision & Image Quality Check:** Validates blur, brightness, and resolution before scanning leaf lesions.
- **🎙 Multimodal Vernacular Assistant:** Text and Speech AI with live audio waveforms, Hindi/English speech recognition, and instant voice readout (TTS).
- **📚 Grounded Agricultural RAG:** Retrieval-Augmented Generation indexing institutional research bulletins from ICAR institutes, ensuring zero fabricated dosages.
- **⛅ Microclimate Disease Context:** Correlates real-time humidity, temperature, and rainfall probability with fungal spore germination risks.
- **🌱 My Farm Management:** Track multiple plots, acreage, crop stages (Germination to Harvest), and irrigation types.
- **📊 Diagnosis History & Visual Timeline:** Interactive Day 1 vs Day 7 slider to monitor foliar tissue recovery over time.
- **📖 Searchable Disease Library:** Catalog covering 8 major Indian crops (Tomato, Potato, Rice, Cotton, Chilli, Wheat, Maize, Soybean).
- **🛡 Human Expert Review Desk:** Seamless escalation path allowing farmers to submit diagnoses to local KVK agronomists for review and certified prescriptions.
- **⚡ 100% Offline / Zero-Setup Demo Mode:** Operates immediately without requiring paid external API keys.

---

## 🏗 System Architecture

```text
                                AgriSathi
                                    │
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
       Crop Image                 Voice                    Text
            │                       │                       │
      Vision Service            Speech STT/TTS          Chat Assistant
     (Quality + Model)              │                       │
            │                       │                       │
            └───────────────────────┼───────────────────────┘
                                    │
                             Context Engine
                     (Crop Stage + Weather + Farm)
                                    │
                                RAG System
                    (ICAR / KVK Institutional Vector Docs)
                                    │
                           Safety & Disclaimer
                                    │
                         Structured Advisory
```

---

## 📁 Project Directory Structure

```text
agrisathi/
├── frontend/                     # React 18 + TypeScript + Vite + Tailwind CSS
│   ├── public/
│   │   └── assets/demo/          # High-fidelity demo crop leaf specimens
│   └── src/
│       ├── components/           # Navbar, MobileNavigation, VoiceButton, WeatherCard, ScanAnimation, etc.
│       ├── context/              # LanguageContext (English & हिन्दी dictionaries)
│       ├── pages/                # Landing, Dashboard, Scan, Diagnosis, Assistant, Farms, History, Diseases, Weather, Expert, Profile
│       ├── services/             # API client with offline fallback
│       └── types/                # Strict TypeScript interfaces
│
├── backend/                      # Python FastAPI Backend
│   ├── app/
│   │   ├── api/                  # REST endpoints (/diagnosis, /chat, /weather, /farms, /diseases, /expert)
│   │   ├── core/                 # Config, Database engine, and Seed seeder
│   │   ├── models/               # SQLAlchemy entities (User, Farm, Diagnosis, Disease, ExpertReview, etc.)
│   │   ├── schemas/              # Pydantic schemas
│   │   ├── vision/               # Modular Vision service & blur/brightness quality analyzer
│   │   ├── rag/                  # RAG engine: DocumentLoader, chunking & semantic retriever
│   │   ├── speech/               # Speech-to-Text & Text-to-Speech fallback service
│   │   └── services/             # Weather & risk correlation service
│   ├── uploads/                  # Uploaded crop images
│   └── requirements.txt          # Python dependencies
│
├── knowledge/
│   └── documents/                # Curated ICAR / CPRI / IIVR / NRRI / FAO agricultural guides
│
└── README.md                     # Documentation & setup guide
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- **Node.js** (v18+) & **npm**
- **Python** (v3.10+) & **pip**

### 1. Backend Setup (FastAPI)

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Run the backend server (runs on http://127.0.0.1:8000)
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

*Note: On first startup, the database (`agrisathi.db`) is automatically created and seeded with demo farmers, farms, 8-crop pathology records, and ICAR knowledge base documents.*

### 2. Frontend Setup (React + Vite)

```bash
cd frontend

# Install dependencies
npm install

# Start Vite development server (runs on http://127.0.0.1:5173)
npm run dev -- --host 127.0.0.1 --port 5173
```

Open your browser at **`http://127.0.0.1:5173`**.

---

## 🧪 Testing the Primary User Journeys

| Journey | Flow | What to Test |
|---|---|---|
| **1. Landing & Vernacular** | `/` | Switch to **हिन्दी** in the top navigation to verify real-time translation of labels and headers. |
| **2. Crop Scan & Quality** | `/scan` | Click any 1-Click Demo case (e.g. Tomato Early Blight), watch the animated scan checklist, and verify redirection to `/diagnosis/1`. |
| **3. Diagnosis Advisory** | `/diagnosis/1` | Inspect visible symptoms, differential diagnosis chart, practical actions, prevention tips, and click **"Request Expert Review"**. |
| **4. Multimodal Assistant** | `/assistant` | Click suggested queries or use the microphone button to test voice interaction and grounded ICAR source citations. |
| **5. Farm Management** | `/farms` | Review plot acreage, growth stage timeline pills, or add a new farm plot. |
| **6. Health History** | `/history` | Drag the interactive **Day 1 vs Day 7 slider** to compare lesion recovery over time. |
| **7. Disease Library** | `/diseases` | Filter by crop or search for "Blast" or "Blight" to read certified prevention protocols. |
| **8. Agromet Weather** | `/weather` | View humidity thresholds and proactive fungal disease alerts. |
| **9. Expert Desk** | `/expert` | Open pending cases queue, confirm/correct predictions, and submit expert agronomist certifications. |

---

## 🛡 Agricultural Safety Protocol
AgriSathi adheres to the following safety principles:
- Uses **"Possible Disease"** rather than claiming 100% laboratory certainty.
- Does not fabricate chemical dosages or unapproved combinations.
- Prioritizes bio-control (*Trichoderma*, *Pseudomonas*, Neem oil) and IPM cultural practices.
- Displays prominent safety notices to follow approved product labels and consult local KVK experts.
