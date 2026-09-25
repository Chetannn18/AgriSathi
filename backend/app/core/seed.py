from sqlalchemy.orm import Session
from app.models.entities import User, Farm, Disease, Diagnosis, DiagnosisImage, ExpertReview

def seed_database(db: Session):
    # Check if already seeded
    if db.query(Disease).first():
        return

    print("Seeding AgriSathi database with initial agricultural data...")

    # 1. Demo User
    user = User(
        full_name="Ramesh Kumar",
        email="ramesh.farmer@agrisathi.org",
        role="farmer",
        preferred_language="en"
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # 2. Demo Farms
    farm1 = Farm(
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
    farm2 = Farm(
        user_id=user.id,
        name="Narmada Valley Field",
        location="Hoshangabad, Madhya Pradesh",
        area_acres=4.0,
        current_crop="Rice",
        crop_variety="Basmati Pusa 1121",
        crop_stage="Vegetative",
        sowing_date="05 Jul 2026",
        irrigation_type="Furrow / Canal"
    )
    db.add_all([farm1, farm2])
    db.commit()

    # 3. Diseases Library (Tomato, Potato, Rice, Wheat, Maize, Cotton, Soybean, Chilli)
    diseases = [
        Disease(
            crop="Tomato",
            name="Early Blight",
            name_hi="अगेती झुलसा (अर्ली ब्लाइट)",
            pathogen_type="Fungus",
            scientific_name="Alternaria solani",
            severity_level="Moderate",
            symptoms=[
                "Target-board brown circular concentric rings on lower leaves",
                "Yellow halo around diseased spots",
                "Premature defoliation exposing green fruit"
            ],
            symptoms_hi=[
                "निचली पत्तियों पर गोल कत्थई छल्लेदार धब्बे (टारगेट बोर्ड)",
                "धब्बों के चारों ओर पीला घेरा",
                "पत्तियों का समय से पहले सूखकर गिरना"
            ],
            possible_causes=["Warm humid weather (24-29°C)", "Overhead sprinkler splash", "Crowded plant spacing"],
            prevention=["Plant staking", "Organic straw mulch", "Crop rotation with non-solanaceous crops"],
            prevention_hi=["पौधों को डंडों का सहारा दें", "पुआल की मल्चिंग करें", "फसल चक्र अपनाएं"],
            management=["Spray Mancozeb 75% WP @ 2g/L", "Apply bio-fungicide Trichoderma harzianum @ 5g/L"],
            management_hi=["मैंकोजेब 75% WP (2 ग्राम/लीटर) का छिड़काव करें", "ट्राइकोडर्मा हरजिएनम का जैविक प्रयोग करें"],
            similar_diseases=["Septoria Leaf Spot", "Late Blight", "Bacterial Canker"],
            image_url="/assets/demo/leaf_tomato.jpg",
            sources=[{"title": "ICAR-IIVR Tomato Advisory", "organization": "ICAR", "url": "https://iivr.icar.gov.in"}]
        ),
        Disease(
            crop="Potato",
            name="Late Blight",
            name_hi="पछेती झुलसा (लेट ब्लाइट)",
            pathogen_type="Oomycete / Fungus",
            scientific_name="Phytophthora infestans",
            severity_level="Severe",
            symptoms=[
                "Water-soaked dark lesions rapidly expanding from leaf tips",
                "Faint whitish downy mildew on leaf underside in morning dew",
                "Stem rot leading to complete canopy collapse"
            ],
            symptoms_hi=[
                "पत्ती के किनारों पर पानी से भीगे गहरे भूरे धब्बे",
                "सुबह की ओस में पत्ती के नीचे सफेद फफूंद",
                "तने का सड़ना और पूरे पौधे का गिरना"
            ],
            possible_causes=["Foggy cloudy weather", "Temperatures 10-20°C with RH >90%", "Infected seed tubers"],
            prevention=["Use certified seed tubers", "Ensure good drainage", "Cut haulms 10 days before digging"],
            prevention_hi=["प्रमाणित रोगमुक्त बीज लगाएं", "खेत में जल निकासी रखें", "खुदाई से पहले पत्तियां काटें"],
            management=["Spray Cymoxanil 8% + Mancozeb 64% WP @ 3g/L", "Copper Oxychloride @ 2.5g/L"],
            management_hi=["साइमोक्सानिल + मैंकोजेब (3 ग्राम/लीटर) का छिड़काव करें"],
            similar_diseases=["Early Blight", "Frost Necrosis", "Stem Canker"],
            image_url="/assets/demo/leaf_potato.jpg",
            sources=[{"title": "ICAR-CPRI Potato Guidelines", "organization": "ICAR CPRI", "url": "https://cpri.icar.gov.in"}]
        ),
        Disease(
            crop="Rice",
            name="Rice Blast",
            name_hi="धान का झोंका रोग (ब्लास्ट)",
            pathogen_type="Fungus",
            scientific_name="Magnaporthe oryzae",
            severity_level="Moderate",
            symptoms=[
                "Diamond or spindle-shaped lesions with gray center and reddish margin",
                "Infection at neck of panicle causing chaffy unfilled grains",
                "Seedling damping-off in nursery beds"
            ],
            symptoms_hi=[
                "पत्तियों पर नाव या आँख के आकार के धब्बे (केंद्र में राख रंग, किनारे भूरे)",
                "बाली की गर्दन का काला पड़ना और दाने न भरना",
                "नर्सरी में पौधों का सूखना"
            ],
            possible_causes=["Excess nitrogen fertilizer", "Prolonged leaf wetness", "Cloudy skies with high humidity"],
            prevention=["Balanced potassium application", "Avoid excess urea top-dressing", "Seed treatment with Pseudomonas"],
            prevention_hi=["यूरिया की संतुलित मात्रा दें", "पोटाश का समय पर उपयोग करें", "सूडोमोनास से बीज शोधन करें"],
            management=["Spray Tricyclazole 75% WP @ 0.6g/L", "Apply Kasugamycin 3% SL @ 2ml/L"],
            management_hi=["ट्राइसाइक्लाजोल 75% WP (0.6 ग्राम/लीटर) का छिड़काव करें"],
            similar_diseases=["Brown Spot", "Bacterial Leaf Blight", "Sheath Rot"],
            image_url="/assets/demo/leaf_rice.jpg",
            sources=[{"title": "ICAR-NRRI Rice Blast Advisory", "organization": "ICAR NRRI", "url": "https://nrri.icar.gov.in"}]
        ),
        Disease(
            crop="Cotton",
            name="Pink Bollworm Damage",
            name_hi="गुलाबी सुंडी क्षति",
            pathogen_type="Insect Pest",
            scientific_name="Pectinophora gossypiella",
            severity_level="Moderate",
            symptoms=[
                "Rosetted flowers that fail to flare open normally",
                "Small entrance holes plugged with insect excreta on developing bolls",
                "Discolored stained lint and hollowed seeds inside bolls"
            ],
            symptoms_hi=[
                "फूलों का गुलाब की तरह बंद रहना (रोसेट फूल)",
                "हरी डोडियों पर छोटे छेद और कीट का मल",
                "कपास के रेशे का रंग खराब होना और बीज खोखला होना"
            ],
            possible_causes=["Continuous cotton mono-cropping", "Off-season ratoon cotton crops"],
            prevention=["Install pheromone traps (8/acre)", "Destroy crop residues promptly after picking"],
            prevention_hi=["फेरोमोन ट्रैप (8 प्रति एकड़) लगाएं", "चुगाई के बाद अवशेषों को नष्ट करें"],
            management=["Spray Spinosad 45% SC @ 0.3ml/L", "Apply Neem Seed Kernel Extract (NSKE 5%)"],
            management_hi=["स्पिनोसैड 45% SC (0.3 मिली/लीटर) या नीम का काढ़ा 5% का छिड़काव करें"],
            similar_diseases=["American Bollworm", "Spotted Bollworm", "Boll Rot"],
            image_url="/assets/demo/leaf_cotton.jpg",
            sources=[{"title": "ICAR-CICR Cotton IPM", "organization": "ICAR CICR", "url": "https://cicr.icar.gov.in"}]
        ),
        Disease(
            crop="Chilli",
            name="Chilli Leaf Curl (Murda Complex)",
            name_hi="मिर्च का पर्ण कुंचन रोग (मुरड़ा रोग)",
            pathogen_type="Virus / Vector Vector",
            scientific_name="Begomovirus (transmitted by Bemisia tabaci)",
            severity_level="Severe",
            symptoms=[
                "Upward curling and puckering of leaf margins",
                "Severe stunting of young shoots and bushy appearance",
                "Reduced flowering and small malformed fruit"
            ],
            symptoms_hi=[
                "पत्तियों का ऊपर की ओर मुड़ना और सिकुड़ना",
                "पौधे की बढ़वार रुकना और झाड़ीनुमा होना",
                "फूल कम आना और मिर्च का आकार टेढ़ा होना"
            ],
            possible_causes=["Whitefly vector population explosion", "Hot dry weather promoting thrips and mites"],
            prevention=["Grow maize border barrier crops", "Use yellow sticky cards", "Uproot early infected virus plants"],
            prevention_hi=["खेत की मेड़ पर 2 लाइन मक्का लगाएं", "पीले चिपचिपे कार्ड लगाएं", "शुरुआती रोगी पौधों को उखाड़कर नष्ट करें"],
            management=["Spray Diafenthiuron 50% WP @ 1.2g/L", "Apply Neem Oil 10,000 ppm @ 3ml/L"],
            management_hi=["डायफेन्थियुरॉन (1.2 ग्राम/लीटर) या नीम तेल का छिड़काव करें"],
            similar_diseases=["Thrips damage", "Broad mite infestation", "Powdery Mildew"],
            image_url="/assets/demo/leaf_chilli.jpg",
            sources=[{"title": "ICAR-IIHR Chilli Protection Bulletin", "organization": "ICAR IIHR", "url": "https://iihr.res.in"}]
        ),
        Disease(
            crop="Wheat",
            name="Yellow Rust (Stripe Rust)",
            name_hi="गेहूं का पीला रतुआ (स्ट्राइप रस्ट)",
            pathogen_type="Fungus",
            scientific_name="Puccinia striiformis",
            severity_level="Severe",
            symptoms=[
                "Yellow pustules arranged in parallel straight stripes along leaf veins",
                "Yellow powder rubs off on fingers upon touching leaves",
                "Premature drying of flag leaves causing shrivelled grain"
            ],
            symptoms_hi=[
                "पत्ती की नसों के समानांतर पीले रंग की धारियां",
                "पत्तियों को छूने पर उंगलियों पर पीला पाउडर लगना",
                "झंडा पत्ती का जल्दी सूखना और दानों का कमजोर होना"
            ],
            possible_causes=["Cool humid temperatures (10-15°C)", "Morning dew during winter", "Susceptible varieties"],
            prevention=["Sow recommended rust-resistant varieties (HD 3086, DBW 187)", "Avoid late sowing"],
            prevention_hi=["रोगरोधी किस्मों की समय पर बुवाई करें"],
            management=["Spray Propiconazole 25% EC @ 1ml/L in 200L water per acre upon first symptom appearance"],
            management_hi=["प्रोपीकोनाजोल 25% EC (1 मिली/लीटर) का तुरंत छिड़काव करें"],
            similar_diseases=["Brown Rust", "Stem Rust", "Powdery Mildew"],
            image_url="/assets/demo/leaf_wheat.jpg",
            sources=[{"title": "ICAR-IIWBR Wheat Rust Advisory", "organization": "ICAR IIWBR", "url": "https://iiwbr.icar.gov.in"}]
        ),
        Disease(
            crop="Maize",
            name="Fall Armyworm (FAW)",
            name_hi="मक्का का फॉल आर्मीवर्म",
            pathogen_type="Insect Pest",
            scientific_name="Spodoptera frugiperda",
            severity_level="Severe",
            symptoms=[
                "Window-pane feeding marks and ragged holes in leaf whorl",
                "Heavy sawdust-like faecal frass inside the central plant whorl",
                "Destruction of the growing tip (tassel damage)"
            ],
            symptoms_hi=[
                "पत्तियों पर छेद और जालीनुमा कटे निशान",
                "पौधे के बीच (पोंग) में चूरेदार बुरादे जैसा मल",
                "केंद्रीय तने का कटना"
            ],
            possible_causes=["Continuous maize cultivation", "Warm humid weather"],
            prevention=["Deep summer ploughing", "Intercropping with pulses or cowpea", "Pheromone traps"],
            prevention_hi=["गर्मी में गहरी जुताई करें", "दलहन के साथ सह-फसली खेती करें"],
            management=["Apply sand + neem cake (9:1 ratio) in plant whorl", "Spray Chlorantraniliprole 18.5% SC @ 0.4ml/L"],
            management_hi=["पौधे के पोंग में सूखी बालू या नीम खली डालें", "कोराजन (0.4 मिली/लीटर) का छिड़काव करें"],
            similar_diseases=["Stem Borer (Chilo partellus)", "Armyworm"],
            image_url="/assets/demo/leaf_maize.jpg",
            sources=[{"title": "ICAR-IIMR Maize Protection", "organization": "ICAR IIMR", "url": "https://iimr.icar.gov.in"}]
        ),
        Disease(
            crop="Soybean",
            name="Yellow Mosaic Virus (YMV)",
            name_hi="सोयाबीन का पीला मोज़ेक वायरस",
            pathogen_type="Virus",
            scientific_name="Mungbean Yellow Mosaic India Virus (MYMIV)",
            severity_level="Moderate",
            symptoms=[
                "Alternating bright yellow and green patches on leaves",
                "Stunted plant stature and reduced pod formation",
                "Immature pods remain flat without grain filling"
            ],
            symptoms_hi=[
                "पत्तियों पर चटख पीले और हरे रंग के चितकबरे धब्बे",
                "पौधे का कद छोटा रहना",
                "फलियां खाली या चपटी रहना"
            ],
            possible_causes=["Whitefly vector transmission during warm rainy breaks"],
            prevention=["Grow YMV-tolerant varieties (JS 20-34, NRC 86)", "Yellow sticky traps"],
            prevention_hi=["प्रतिरोधी किस्में लगाएं", "पीले स्टिकी कार्ड लगाएं"],
            management=["Spray Thiamethoxam 25% WG @ 0.3g/L or Acetamiprid 20% SP @ 0.2g/L to control vector whiteflies"],
            management_hi=["सफेद मक्खी नियंत्रण के लिए थायमेथॉक्सम (0.3 ग्राम/लीटर) का छिड़काव करें"],
            similar_diseases=["Soybean Rust", "Charcoal Rot"],
            image_url="/assets/demo/leaf_soybean.jpg",
            sources=[{"title": "ICAR-IISR Soybean Disease Advisory", "organization": "ICAR IISR", "url": "https://iisrindore.icar.gov.in"}]
        ),
        Disease(
            crop="Soybean",
            name="Powdery Mildew",
            name_hi="चूर्णिल आसिता (पाउडरी मिल्ड्यू)",
            pathogen_type="Fungus",
            scientific_name="Erysiphe diffusa",
            severity_level="Moderate",
            symptoms=[
                "White to grayish talcum-powder like fungal coating on upper leaf surface and veins",
                "Leaf chlorosis, drying, and downward curling",
                "Spread to petioles, stems, and pods in severe infections"
            ],
            symptoms_hi=[
                "पत्तियों की ऊपरी सतह और नसों पर सफेद चूर्ण जैसी फफूंद",
                "पत्तियों का पीला पड़ना और नीचे की ओर मुड़ना",
                "तनों और फलियों पर सफेद पाउडर का फैलना"
            ],
            possible_causes=["Dry sunny days followed by cool humid nights"],
            prevention=["Recommended spacing (45 x 10 cm)", "Balanced N-P-K fertilization without excess urea"],
            prevention_hi=["उचित दूरी पर बुवाई करें", "यूरिया की अधिक मात्रा न दें"],
            management=["Spray Wettable Sulphur 80% WP @ 3g/L or Hexaconazole 5% EC @ 1ml/L"],
            management_hi=["घुलनशील गंधक 80% WP (3 ग्राम/लीटर) या हेक्साकोनाजोल (1 मिली/लीटर) का छिड़काव करें"],
            similar_diseases=["Downy Mildew", "Foliar Dust"],
            image_url="/assets/demo/leaf_soybean_powdery_mildew.jpg",
            sources=[{"title": "ICAR-IISR Powdery Mildew Management", "organization": "ICAR IISR", "url": "https://iisrindore.icar.gov.in"}]
        ),
        Disease(
            crop="Soybean",
            name="Frogeye Leaf Spot",
            name_hi="मेंढक आँख जैसा धब्बा रोग",
            pathogen_type="Fungus",
            scientific_name="Cercospora sojina",
            severity_level="Moderate",
            symptoms=[
                "Circular to angular spots with tan/gray centers and dark reddish-brown to purple borders",
                "Shot-hole appearance with center tissue dropping out",
                "Lesion coalescence causing leaf blighting"
            ],
            symptoms_hi=[
                "भूरे-लाल किनारों वाले गोल धब्बे जिनका केंद्र राख जैसा हल्का होता है",
                "धब्बों के बीच से कागज जैसी पत्ती का झड़ना (छेद होना)",
                "पत्तियों का झुलस कर गिरना"
            ],
            possible_causes=["Warm humid weather (25-30°C, RH >80%)"],
            prevention=["Seed treatment with Carboxin + Thiram", "2-year crop rotation with maize/sorghum"],
            prevention_hi=["कार्बोक्सिन + थीरम से बीज उपचार करें", "मक्का के साथ फसल चक्र अपनाएं"],
            management=["Spray Pyraclostrobin 20% WG @ 1g/L or Azoxystrobin + Difenoconazole @ 1ml/L"],
            management_hi=["पायराक्लोस्ट्रोबिन (1 ग्राम/लीटर) या एजॉक्सीस्ट्रोबिन + डाइफेनोकोनाजोल (1 मिली/लीटर) का छिड़काव करें"],
            similar_diseases=["Septoria Brown Spot", "Target Spot"],
            image_url="/assets/demo/leaf_soybean_frogeye_spot.jpg",
            sources=[{"title": "ICAR-IISR Frogeye Management", "organization": "ICAR IISR", "url": "https://iisrindore.icar.gov.in"}]
        ),
        Disease(
            crop="Soybean",
            name="Target Spot & Leaf Blight",
            name_hi="टारगेट स्पॉट एवं पर्ण अंगमारी",
            pathogen_type="Fungus",
            scientific_name="Corynespora cassiicola",
            severity_level="Moderate",
            symptoms=[
                "Large irregular dark brown concentric circular rings resembling a target board",
                "Chlorotic yellow halos surrounding necrotic spots with tissue perforations",
                "Premature defoliation during prolonged rainy spells"
            ],
            symptoms_hi=[
                "टारगेट बोर्ड जैसे संकेंद्री छल्लों वाले बड़े गहरे भूरे धब्बे",
                "धब्बों के चारों ओर पीला घेरा और पत्तियों में छेद",
                "बारिश के मौसम में पत्तियों का तेजी से झड़ना"
            ],
            possible_causes=["High humidity (>85%) and temperature 25-32°C"],
            prevention=["Avoid late evening irrigation", "Deep summer ploughing"],
            prevention_hi=["शाम की सिंचाई से बचें", "गहरी जुताई करें"],
            management=["Spray Fluxapyroxad + Pyraclostrobin @ 120ml/acre or Carbendazim + Mancozeb @ 2.5g/L"],
            management_hi=["फ्लक्सापायरोक्साड + पायराक्लोस्ट्रोबिन (120 मिली/एकड़) या कार्बेन्डाजिम + मैंकोजेब का छिड़काव करें"],
            similar_diseases=["Anthracnose Blight", "Frogeye Leaf Spot"],
            image_url="/assets/demo/leaf_soybean_target_spot.jpg",
            sources=[{"title": "ICAR-IISR Target Spot Advisory", "organization": "ICAR IISR", "url": "https://iisrindore.icar.gov.in"}]
        ),
        Disease(
            crop="Soybean",
            name="Septoria Brown Spot",
            name_hi="सेप्टोरिया भूरा धब्बा रोग",
            pathogen_type="Fungus",
            scientific_name="Septoria glycines",
            severity_level="Moderate",
            symptoms=[
                "Numerous small dark brown to black specks starting on lower leaves",
                "Prominent irregular bright yellow chlorotic halos around lesions",
                "Upward disease spread with rain splash"
            ],
            symptoms_hi=[
                "निचली पत्तियों पर छोटे काले-भूरे धब्बे",
                "प्रत्येक धब्बे के चारों ओर स्पष्ट पीला घेरा",
                "बारिश की छींटों से बीमारी का ऊपर की पत्तियों में फैलना"
            ],
            possible_causes=["Continuous wet weather and rain splashing"],
            prevention=["Crop residue incorporation after harvest", "Rotate with non-legume crops"],
            prevention_hi=["फसल अवशेषों को मिट्टी में दबाएं", "फसल चक्र अपनाएं"],
            management=["Spray Mancozeb 75% WP @ 2.5g/L or Tebuconazole 10% + Sulphur 65% WG @ 2.5g/L"],
            management_hi=["मैंकोजेब (2.5 ग्राम/लीटर) या टेबुकोनाजोल + सल्फर (2.5 ग्राम/लीटर) का छिड़काव करें"],
            similar_diseases=["Bacterial Pustule", "Soybean Rust"],
            image_url="/assets/demo/leaf_soybean_septoria_brown_spot.jpg",
            sources=[{"title": "ICAR-IISR Brown Spot Guide", "organization": "ICAR IISR", "url": "https://iisrindore.icar.gov.in"}]
        )
    ]
    db.add_all(diseases)
    db.commit()

    # 4. Pre-populated Diagnoses
    diag1 = Diagnosis(
        user_id=user.id,
        farm_id=farm1.id,
        crop="Tomato",
        possible_disease="Early Blight",
        disease_name_hi="अगेती झुलसा (अर्ली ब्लाइट)",
        confidence=0.91,
        severity="Moderate",
        summary="Analysis indicates symptoms characteristic of Early Blight (Alternaria solani).",
        summary_hi="विश्लेषण से पता चलता है कि यह अगेती झुलसा (Alternaria solani) के लक्षण हैं।",
        observed_symptoms=[
            "Target-board concentric dark brown rings on lower leaves",
            "Chlorotic yellow halo surrounding necrotic leaf spots",
            "Early foliage curling with localized stem lesions"
        ],
        evidence_reason="Concentric dark brown circular spots with yellow borders observed primarily on lower canopy foliage.",
        immediate_actions=[
            "Hand-prune heavily spotted lower leaves and dispose away from the plot.",
            "Switch to drip irrigation to keep leaf canopies dry.",
            "Apply organic bio-fungicide (Trichoderma harzianum @ 5g/L) or Mancozeb 75% WP (2g/L)."
        ],
        immediate_actions_hi=[
            "गंभीर रूप से प्रभावित निचली पत्तियों को तुरंत काटकर खेत से दूर नष्ट करें।",
            "ड्रिप सिंचाई अपनाएं ताकि पत्तियां सूखी रहें।",
            "ट्राइकोडर्मा हरजिएनम (5 ग्राम/लीटर) या मैंकोजेब 75% WP (2 ग्राम/लीटर) का छिड़काव करें।"
        ],
        prevention=[
            "Stake plants to keep foliage off bare ground.",
            "Apply 2-inch organic straw mulch around plant base.",
            "Rotate solanaceous crops with legumes or maize every season."
        ],
        prevention_hi=[
            "पौधों को डंडों से सहारा दें ताकि पत्तियां जमीन से ऊपर रहें।",
            "पौधों के आधार पर पुआल की 2 इंच मल्चिंग करें।"
        ],
        monitoring=[
            "Inspect leaf undersides every 3 days after rain or heavy morning dew.",
            "Check neighboring tomato rows for spot expansion."
        ],
        monitoring_hi=[
            "बारिश या ओस के बाद हर 3 दिन में निचली पत्तियों की जांच करें।"
        ],
        differential_diagnosis=[
            {"disease": "Early Blight", "disease_hi": "अर्ली ब्लाइट", "probability": 78},
            {"disease": "Septoria Leaf Spot", "disease_hi": "सेप्टोरिया लीफ स्पॉट", "probability": 14},
            {"disease": "Nutrient / Nitrogen Stress", "disease_hi": "नाइट्रोजन की कमी", "probability": 8}
        ],
        warnings=[
            "Do not compost pruned infected leaves as fungal spores survive in compost.",
            "Avoid spraying chemical fungicides during full noon sunlight."
        ],
        sources=[
            {
                "title": "Tomato Early Blight Diagnostic Bulletin",
                "organization": "ICAR - Indian Institute of Vegetable Research (IIVR)",
                "url": "https://iivr.icar.gov.in/crop-protection/tomato-early-blight"
            }
        ],
        weather_context={
            "temperature": 28.5,
            "humidity": 82.0,
            "rain_probability": 65.0,
            "risk_note": "Recent rainfall + high humidity may increase the risk of fungal disease."
        },
        expert_reviewed=True,
        expert_status="reviewed"
    )
    db.add(diag1)
    db.commit()
    db.refresh(diag1)

    # Primary and Day 7 comparison images
    img1 = DiagnosisImage(
        diagnosis_id=diag1.id,
        image_url="/assets/demo/leaf_tomato.jpg",
        image_type="day_1",
        quality_score=0.98,
        is_clear=True
    )
    img1_followup = DiagnosisImage(
        diagnosis_id=diag1.id,
        image_url="/assets/demo/leaf_tomato_healed.jpg",
        image_type="day_7",
        quality_score=0.97,
        is_clear=True
    )
    db.add_all([img1, img1_followup])

    review1 = ExpertReview(
        diagnosis_id=diag1.id,
        expert_name="Dr. Arvind Sharma (Senior Plant Pathologist)",
        expert_organization="Krishi Vigyan Kendra (KVK)",
        status="confirmed",
        confirmed_disease="Early Blight",
        expert_notes="Confirmed Alternaria solani based on concentric rings. Follow-up treatment with Trichoderma shows clear containment after 7 days.",
        recommended_prescription="Continue drip irrigation. Repeat Trichoderma bio-spray after 10 days if high humidity persists."
    )
    db.add(review1)

    # Pre-populate Potato Late Blight Diagnosis
    diag2 = Diagnosis(
        user_id=user.id,
        farm_id=farm1.id,
        crop="Potato",
        possible_disease="Late Blight",
        disease_name_hi="पछेती झुलसा (लेट ब्लाइट)",
        confidence=0.88,
        severity="Severe",
        summary="Urgent: Water-soaked lesions indicate Phytophthora infestans.",
        summary_hi="अति आवश्यक: पानी से भीगे धब्बे पछेती झुलसा का संकेत देते हैं।",
        observed_symptoms=["Dark brown water-soaked leaf margins", "White downy fungal growth on underside"],
        evidence_reason="Rapidly advancing marginal water-soaked lesions under high humidity.",
        immediate_actions=[
            "Halt all overhead watering immediately.",
            "Ensure trench drainage.",
            "Apply Cymoxanil 8% + Mancozeb 64% WP @ 3g/L."
        ],
        immediate_actions_hi=[
            "सिंचाई रोकें और खेत से पानी निकालें।",
            "साइमोक्सानिल + मैंकोजेब का सुरक्षात्मक छिड़काव करें।"
        ],
        prevention=["Use certified clean tubers"],
        prevention_hi=["प्रमाणित रोगमुक्त बीज लगाएं"],
        monitoring=["Monitor morning dew and persistent fog"],
        monitoring_hi=["सुबह के कोहरे और ओस पर नजर रखें"],
        differential_diagnosis=[
            {"disease": "Late Blight", "disease_hi": "पछेती झुलसा", "probability": 82},
            {"disease": "Early Blight", "disease_hi": "अगेती झुलसा", "probability": 11},
            {"disease": "Frost Damage", "disease_hi": "पाला लगना", "probability": 7}
        ],
        warnings=["Late blight can destroy the entire crop within a week if unchecked."],
        sources=[{"title": "Late Blight Bulletin", "organization": "ICAR-CPRI", "url": "https://cpri.icar.gov.in"}],
        weather_context={"temperature": 22.0, "humidity": 89.0, "rain_probability": 75.0},
        expert_status="none"
    )
    db.add(diag2)
    db.commit()
    db.refresh(diag2)

    img2 = DiagnosisImage(
        diagnosis_id=diag2.id,
        image_url="/assets/demo/leaf_potato.jpg",
        image_type="primary",
        quality_score=0.96,
        is_clear=True
    )
    db.add(img2)

    # Pre-populate Rice Blast (Pending Expert Review)
    diag3 = Diagnosis(
        user_id=user.id,
        farm_id=farm2.id,
        crop="Rice",
        possible_disease="Rice Blast",
        disease_name_hi="धान का झोंका रोग (ब्लास्ट)",
        confidence=0.85,
        severity="Moderate",
        summary="Spindle-shaped foliar blast lesions detected.",
        summary_hi="धान की पत्तियों पर झोंका (ब्लास्ट) रोग के लक्षण पाए गए।",
        observed_symptoms=["Spindle-shaped lesions with gray center and reddish margin"],
        evidence_reason="Diamond-shaped foliar lesions with grayish center and brown margins.",
        immediate_actions=[
            "Stop top-dressing urea or nitrogen fertilizer immediately.",
            "Maintain 2-3 cm standing water film in paddy.",
            "Spray Tricyclazole 75% WP @ 0.6g/L."
        ],
        immediate_actions_hi=[
            "यूरिया का छिड़काव तुरंत बंद करें।",
            "खेत में 2-3 सेमी पानी बनाए रखें।",
            "ट्राइसाइक्लाजोल 75% WP (0.6 ग्राम/लीटर) का छिड़काव करें।"
        ],
        prevention=["Balanced potassium application"],
        prevention_hi=["पोटाश की संतुलित मात्रा दें"],
        monitoring=["Check boot leaf nodes daily"],
        monitoring_hi=["बाली निकलने वाली पत्तियों की रोजाना जांच करें"],
        differential_diagnosis=[
            {"disease": "Rice Blast", "disease_hi": "धान ब्लास्ट", "probability": 76},
            {"disease": "Brown Spot", "disease_hi": "भूरा धब्बा", "probability": 18},
            {"disease": "Bacterial Blight", "disease_hi": "जीवाणु झुलसा", "probability": 6}
        ],
        warnings=["Excess nitrogen creates succulent leaves vulnerable to fungal penetration."],
        sources=[{"title": "Rice Blast Management", "organization": "ICAR-NRRI", "url": "https://nrri.icar.gov.in"}],
        weather_context={"temperature": 27.0, "humidity": 84.0, "rain_probability": 60.0},
        expert_status="pending"
    )
    db.add(diag3)
    db.commit()
    db.refresh(diag3)

    img3 = DiagnosisImage(
        diagnosis_id=diag3.id,
        image_url="/assets/demo/leaf_rice.jpg",
        image_type="primary",
        quality_score=0.95,
        is_clear=True
    )
    db.add(img3)

    db.commit()
    print("Database seeding completed successfully!")
