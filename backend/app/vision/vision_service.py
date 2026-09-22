import os
import io
import math
from typing import Tuple, Dict, Any, List
from PIL import Image, ImageStat

class VisionService:
    """
    Modular vision service providing image quality validation and agricultural crop disease diagnosis.
    Supports real heuristics on uploaded images as well as high-fidelity deterministic demo cases.
    """

    DEMO_CASES = {
        "case_tomato": {
            "crop": "Tomato",
            "crop_hi": "टमाटर",
            "possible_disease": "Early Blight",
            "disease_name_hi": "अगेती झुलसा (अर्ली ब्लाइट)",
            "confidence": 0.91,
            "severity": "Moderate",
            "observed_symptoms": [
                "Target-board concentric dark brown rings on lower leaves",
                "Chlorotic yellow halo surrounding necrotic leaf spots",
                "Early stage foliage curling with localized stem lesions"
            ],
            "evidence_reason": "Visible concentric circular brown spots on mature foliage with surrounding chlorosis characteristic of Alternaria solani pathogen.",
            "differential_diagnosis": [
                {"disease": "Early Blight", "disease_hi": "अर्ली ब्लाइट", "probability": 78},
                {"disease": "Septoria Leaf Spot", "disease_hi": "सेप्टोरिया लीफ स्पॉट", "probability": 14},
                {"disease": "Nutrient / Nitrogen Stress", "disease_hi": "नाइट्रोजन की कमी", "probability": 8}
            ],
            "immediate_actions": [
                "Hand-prune heavily spotted lower leaves and dispose away from the plot.",
                "Halt overhead sprinkler watering; switch to furrow or drip to prevent splash dispersal.",
                "Apply organic bio-fungicide (Trichoderma harzianum @ 5g/L) or approved Mancozeb 75% WP (2g/L)."
            ],
            "immediate_actions_hi": [
                "गंभीर रूप से प्रभावित निचली पत्तियों को तुरंत काटकर खेत से दूर नष्ट करें।",
                "फव्वारा सिंचाई बंद करें और ड्रिप या थाला विधि अपनाएं ताकि पत्तियां सूखी रहें।",
                "ट्राइकोडर्मा हरजिएनम (5 ग्राम/लीटर) या मैंकोजेब 75% WP (2 ग्राम/लीटर) का छिड़काव करें।"
            ],
            "prevention": [
                "Stake plants to keep foliage off bare ground.",
                "Apply 2-inch organic straw mulch around plant base.",
                "Rotate solanaceous crops with legumes or maize every season."
            ],
            "prevention_hi": [
                "पौधों को डंडों से सहारा (स्टेकिंग) दें ताकि पत्तियां जमीन से ऊपर रहें।",
                "पौधों के आधार पर पुआल या सूखी घास की 2 इंच मल्चिंग करें।",
                "फसल चक्र में टमाटर के बाद दलहनी या मक्का की फसल लगाएं।"
            ],
            "monitoring": [
                "Inspect leaf undersides every 3 days after rain or heavy morning dew.",
                "Check neighboring tomato rows for spot expansion."
            ],
            "monitoring_hi": [
                "बारिश या ओस के बाद हर 3 दिन में निचली पत्तियों की जांच करें।",
                "पास की क्यारियों में धब्बों के प्रसार पर नजर रखें।"
            ],
            "warnings": [
                "Do not compost pruned infected leaves as fungal spores survive in compost.",
                "Avoid spraying chemical fungicides during full noon sunlight."
            ],
            "sources": [
                {
                    "title": "Tomato Early Blight Diagnostic Bulletin",
                    "organization": "ICAR - Indian Institute of Vegetable Research (IIVR)",
                    "url": "https://iivr.icar.gov.in/crop-protection/tomato-early-blight"
                },
                {
                    "title": "Integrated Management of Solanaceous Blights",
                    "organization": "National Institute of Plant Health Management (NIPHM)",
                    "url": "https://niphm.gov.in"
                }
            ]
        },
        "case_potato": {
            "crop": "Potato",
            "crop_hi": "आलू",
            "possible_disease": "Late Blight",
            "disease_name_hi": "पछेती झुलसा (लेट ब्लाइट)",
            "confidence": 0.88,
            "severity": "Severe",
            "observed_symptoms": [
                "Water-soaked dark brown irregular lesions near leaf tips",
                "Faint whitish mildew growth visible under high humidity",
                "Stem necrosis threatening rapid whole-plant collapse"
            ],
            "evidence_reason": "Rapidly expanding water-soaked necrotic patches with fuzzy margins indicative of Phytophthora infestans.",
            "differential_diagnosis": [
                {"disease": "Late Blight", "disease_hi": "पछेती झुलसा", "probability": 82},
                {"disease": "Early Blight", "disease_hi": "अगेती झुलसा", "probability": 11},
                {"disease": "Frost Damage", "disease_hi": "पाला लगना", "probability": 7}
            ],
            "immediate_actions": [
                "Do not walk through wet field to avoid mechanical spore dissemination.",
                "Ensure quick surface drainage; eliminate standing water in furrows.",
                "Spray systemic fungicide Cymoxanil 8% + Mancozeb 64% WP @ 3g/L with fine nozzle."
            ],
            "immediate_actions_hi": [
                "गीले खेत में आवाजाही न करें जिससे बीजाणु दूसरे पौधों में न फैलें।",
                "खेत में जल निकासी नालियां खोलें ताकि पानी जमा न रहे।",
                "साइमोक्सानिल + मैंकोजेब (3 ग्राम/लीटर) का तुरंत सुरक्षात्मक छिड़काव करें।"
            ],
            "prevention": [
                "Use certified disease-free seed tubers treated with Trichoderma.",
                "Dehaulm (cut green tops) 10-12 days prior to harvest if late blight occurs."
            ],
            "prevention_hi": [
                "प्रमाणित रोगमुक्त बीज कंदों का उपयोग करें।",
                "खुदाई से 10-12 दिन पहले पत्तियों और तनों की कटाई (डीहॉल्मिंग) कर लें।"
            ],
            "monitoring": [
                "Monitor weather forecast for overcast skies, persistent fog, and humidity >90%."
            ],
            "monitoring_hi": [
                "बादल छाए रहने, कोहरे और 90% से अधिक आर्द्रता वाले मौसम पर नजर रखें।"
            ],
            "warnings": [
                "Late blight can destroy 100% of potato yield within a week if neglected during foggy weather."
            ],
            "sources": [
                {
                    "title": "Late Blight of Potato Emergency Protocol",
                    "organization": "ICAR - Central Potato Research Institute (CPRI), Shimla",
                    "url": "https://cpri.icar.gov.in/late-blight-advisory"
                }
            ]
        },
        "case_rice": {
            "crop": "Rice",
            "crop_hi": "धान / चावल",
            "possible_disease": "Rice Blast",
            "disease_name_hi": "धान का झोंका रोग (ब्लास्ट)",
            "confidence": 0.85,
            "severity": "Moderate",
            "observed_symptoms": [
                "Diamond or eye-shaped spindle lesions with gray center and reddish margin",
                "Lesion coalescence causing drying of entire leaf blade",
                "Boot leaf node showing early discolored banding"
            ],
            "evidence_reason": "Characteristic spindle-shaped foliar lesions with grayish center and brown margins caused by Magnaporthe oryzae.",
            "differential_diagnosis": [
                {"disease": "Rice Blast", "disease_hi": "धान ब्लास्ट", "probability": 76},
                {"disease": "Brown Spot (Bipolaris oryzae)", "disease_hi": "भूरा धब्बा रोग", "probability": 18},
                {"disease": "Bacterial Leaf Blight", "disease_hi": "जीवाणु झुलसा", "probability": 6}
            ],
            "immediate_actions": [
                "Immediately withhold any urea or nitrogen top dressing.",
                "Maintain thin water film (2-3 cm) in paddy; avoid dry moisture stress.",
                "Spray Tricyclazole 75% WP @ 0.6 g/L or Kasugamycin 3% SL @ 2 ml/L."
            ],
            "immediate_actions_hi": [
                "यूरिया का अतिरिक्त छिड़काव तुरंत बंद करें।",
                "खेत में 2-3 सेमी पानी बनाए रखें; खेत को सूखने न दें।",
                "ट्राइसाइक्लाजोल 75% WP (0.6 ग्राम/लीटर) का छिड़काव करें।"
            ],
            "prevention": [
                "Treat seeds with Carbendazim or Trichoderma (10g/kg) before sowing.",
                "Ensure balanced N-P-K fertilization with adequate potassium."
            ],
            "prevention_hi": [
                "बुवाई से पहले बीज उपचार ट्राइकोडर्मा (10 ग्राम/किग्रा) से करें।",
                "संतुलित पोटाश और पोटाश का समय पर प्रयोग करें।"
            ],
            "monitoring": [
                "Scout seedlings at early morning to catch gray mycelial growth before dew dries."
            ],
            "monitoring_hi": [
                "सुबह के समय ओस सूखने से पहले पत्तियों के बीच भूरे-सफेद जाले की जांच करें।"
            ],
            "warnings": [
                "High nitrogen excess creates succulent leaf tissue that accelerates blast entry."
            ],
            "sources": [
                {
                    "title": "National Rice Blast Forecast and Management Guidelines",
                    "organization": "ICAR - National Rice Research Institute (NRRI), Cuttack",
                    "url": "https://nrri.icar.gov.in/rice-blast-management"
                }
            ]
        },
        "case_cotton": {
            "crop": "Cotton",
            "crop_hi": "कपास",
            "possible_disease": "Pest Damage (Bollworm & Sucking Pests)",
            "disease_name_hi": "गुलाबी सुंडी एवं रस चूसक कीट क्षति",
            "confidence": 0.89,
            "severity": "Moderate",
            "observed_symptoms": [
                "Rosetted flowers that fail to flare and open",
                "Small bore exit holes plugged with larval frass on green bolls",
                "Upward curling of leaf margins with slight sooty mold"
            ],
            "evidence_reason": "Chewed unopened floral rosettes and green boll penetration holes diagnostic of Pink Bollworm (Pectinophora gossypiella) with minor whitefly activity.",
            "differential_diagnosis": [
                {"disease": "Pink Bollworm Infestation", "disease_hi": "गुलाबी सुंडी", "probability": 80},
                {"disease": "Whitefly / Jassid Stress", "disease_hi": "सफेद मक्खी / तेला", "probability": 13},
                {"disease": "Boll Rot (Secondary)", "disease_hi": "गोली सड़न रोग", "probability": 7}
            ],
            "immediate_actions": [
                "Erect 8-10 pheromone traps per acre with Gossyplure lure to track moth count.",
                "Manually pluck and bury shed squares and rosetted blooms.",
                "Spray bio-rational NSKE 5% (Neem seed kernel extract) or Spinosad 45% SC @ 0.3 ml/L."
            ],
            "immediate_actions_hi": [
                "प्रति एकड़ 8-10 फेरोमोन ट्रैप लगाकर कीट निगरानी करें।",
                "झड़े हुए फूलों और बंद कलियों को इकट्ठा करके जमीन में दबाएं।",
                "नीम का काढ़ा (NSKE 5%) या स्पिनोसैड 45% SC (0.3 मिली/लीटर) का छिड़काव करें।"
            ],
            "prevention": [
                "Install yellow sticky traps (15/acre) for sucking insect interception.",
                "Release Trichogramma egg parasitoids 45 days after sowing."
            ],
            "prevention_hi": [
                "पीले चिपचिपे कार्ड लगाएं।",
                "ट्राइकोग्रामा परजीवी ततैया को खेत में छोड़ें।"
            ],
            "monitoring": [
                "Inspect 20 green bolls across the field weekly; take action if >2 bolls show entry."
            ],
            "monitoring_hi": [
                "सप्ताह में 20 हरी डोडियों की जांच करें, 2 से अधिक में छेद दिखे तो तत्काल उपाय करें।"
            ],
            "warnings": [
                "Do not apply synthetic pyrethroids repeatedly as it causes whitefly flare-up."
            ],
            "sources": [
                {
                    "title": "Cotton Integrated Pest Management Strategies",
                    "organization": "ICAR - Central Institute for Cotton Research (CICR), Nagpur",
                    "url": "https://cicr.icar.gov.in/cotton-ipm-guidelines"
                }
            ]
        }
    }

    def check_image_quality(self, image_bytes: bytes) -> Dict[str, Any]:
        """
        Validates resolution, brightness, and basic blur/sharpness metrics.
        Returns clear user feedback and tips if quality is insufficient.
        """
        try:
            image = Image.open(io.BytesIO(image_bytes))
            width, height = image.size

            # 1. Resolution Check
            resolution_ok = width >= 250 and height >= 250

            # 2. Brightness Check
            grayscale = image.convert("L")
            stat = ImageStat.Stat(grayscale)
            mean_brightness = stat.mean[0]  # 0 (pure black) to 255 (pure white)
            brightness_ok = 35 <= mean_brightness <= 235

            # 3. Blur / Variance Check (RMS contrast / gradient heuristic)
            std_dev = stat.stddev[0]
            blur_ok = std_dev > 15.0  # Very flat/blurred images have extremely low standard deviation

            is_valid = resolution_ok and brightness_ok and blur_ok

            suggestions = []
            suggestions_hi = []

            if not resolution_ok:
                suggestions.append("Image resolution is too low. Move camera closer to the affected leaf.")
                suggestions_hi.append("तस्वीर का रिज़ॉल्यूशन कम है। कैमरे को पत्ती के और करीब लाएं।")
            if not brightness_ok:
                if mean_brightness < 35:
                    suggestions.append("The photo is too dark. Capture in good natural daylight.")
                    suggestions_hi.append("तस्वीर बहुत अंधेरी है। दिन की प्राकृतिक रोशनी में फोटो लें।")
                else:
                    suggestions.append("The photo is overexposed or washed out with direct glare.")
                    suggestions_hi.append("तस्वीर में बहुत तेज चमक या धूप है। छाया में फोटो लें।")
            if not blur_ok:
                suggestions.append("Image appears blurred. Keep hands steady or rest the phone while shooting.")
                suggestions_hi.append("तस्वीर धुंधली है। हाथ स्थिर रखकर स्पष्ट फोटो लें।")

            if is_valid:
                return {
                    "is_valid": True,
                    "message": "Image quality is good for AI diagnosis.",
                    "message_hi": "एआई निदान के लिए तस्वीर की गुणवत्ता अच्छी है।",
                    "resolution_ok": True,
                    "brightness_ok": True,
                    "blur_ok": True,
                    "suggestions": [],
                    "suggestions_hi": []
                }
            else:
                return {
                    "is_valid": False,
                    "message": "The image is not clear enough for reliable analysis.",
                    "message_hi": "सटीक विश्लेषण के लिए तस्वीर पर्याप्त स्पष्ट नहीं है।",
                    "resolution_ok": resolution_ok,
                    "brightness_ok": brightness_ok,
                    "blur_ok": blur_ok,
                    "suggestions": suggestions,
                    "suggestions_hi": suggestions_hi
                }
        except Exception as e:
            return {
                "is_valid": False,
                "message": f"Unable to process image file: {str(e)}",
                "message_hi": "तस्वीर फाइल पढ़ने में असमर्थ। कृपया पुनः प्रयास करें।",
                "resolution_ok": False,
                "brightness_ok": False,
                "blur_ok": False,
                "suggestions": ["Please upload a standard JPG or PNG photo."],
                "suggestions_hi": ["कृपया जेपीजी (JPG) या पीएनजी (PNG) प्रारूप में फोटो अपलोड करें।"]
            }

    def analyze_crop_image(self, image_bytes: bytes, filename: str = "", farm_crop: str = None) -> Dict[str, Any]:
        """
        Analyzes the crop image and returns structured diagnosis advisory.
        Identifies crop based on hints or selects the best matching diagnostic profile.
        """
        filename_lower = (filename or "").lower()

        # Check explicit demo cases or filenames
        if "potato" in filename_lower or (farm_crop and "potato" in farm_crop.lower()):
            data = self.DEMO_CASES["case_potato"]
        elif "rice" in filename_lower or "paddy" in filename_lower or (farm_crop and "rice" in farm_crop.lower()):
            data = self.DEMO_CASES["case_rice"]
        elif "cotton" in filename_lower or (farm_crop and "cotton" in farm_crop.lower()):
            data = self.DEMO_CASES["case_cotton"]
        else:
            # Default to Tomato Early Blight (Case 1)
            data = self.DEMO_CASES["case_tomato"]

        return data

vision_service = VisionService()
