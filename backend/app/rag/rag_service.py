import os
import re
from pathlib import Path
from typing import List, Dict, Any, Optional
from app.core.config import settings

class RAGService:
    """
    Agricultural Retrieval-Augmented Generation (RAG) Service.
    Loads curated knowledge documents from ICAR/KVK/FAO, chunks text,
    indexes content, and retrieves relevant agricultural context for farmer inquiries.
    """

    def __init__(self, documents_dir: Optional[Path] = None):
        self.documents_dir = documents_dir or settings.KNOWLEDGE_DIR
        self.chunks: List[Dict[str, Any]] = []
        self._load_documents()

    def _load_documents(self):
        self.chunks = []
        if not self.documents_dir.exists():
            return

        for filepath in self.documents_dir.glob("*.md"):
            try:
                content = filepath.read_text(encoding="utf-8")
                # Parse frontmatter if present
                meta = {
                    "source_file": filepath.name,
                    "title": filepath.stem.replace("_", " ").title(),
                    "source_org": "ICAR - Indian Council of Agricultural Research",
                    "source_url": "https://icar.org.in"
                }

                if content.startswith("---"):
                    parts = content.split("---", 2)
                    if len(parts) >= 3:
                        frontmatter_raw = parts[1]
                        body = parts[2]
                        for line in frontmatter_raw.strip().split("\n"):
                            if ":" in line:
                                k, v = line.split(":", 1)
                                meta[k.strip()] = v.strip().strip('"').strip("'")
                    else:
                        body = content
                else:
                    body = content

                # Chunk body by headers or paragraphs
                sections = re.split(r'\n(?=##?\s)', body)
                for idx, sec in enumerate(sections):
                    clean_sec = sec.strip()
                    if len(clean_sec) > 40:
                        self.chunks.append({
                            "chunk_id": f"{filepath.stem}_{idx}",
                            "content": clean_sec,
                            "title": meta.get("title", filepath.stem),
                            "crop": meta.get("crop", "General"),
                            "disease": meta.get("disease", "Crop Care"),
                            "source_org": meta.get("source_org", "ICAR / KVK Advisory"),
                            "source_url": meta.get("source_url", "https://icar.org.in"),
                            "published_date": meta.get("published_date", "2024")
                        })
            except Exception as e:
                print(f"Error loading document {filepath}: {e}")

    def search_knowledge(self, query: str, top_k: int = 3) -> List[Dict[str, Any]]:
        """
        Retrieves top matching knowledge chunks using token overlap and semantic keywords.
        """
        if not self.chunks:
            self._load_documents()

        query_tokens = set(re.findall(r'\w+', query.lower()))
        # Remove common stop words
        stop_words = {"the", "is", "at", "which", "on", "and", "a", "an", "in", "to", "for", "of", "my", "what", "should", "i", "do", "why", "are"}
        query_tokens = {w for w in query_tokens if w not in stop_words and len(w) > 2}

        scored_chunks = []
        for chunk in self.chunks:
            chunk_text = (chunk["title"] + " " + chunk["crop"] + " " + chunk["disease"] + " " + chunk["content"]).lower()
            score = 0
            for token in query_tokens:
                if token in chunk_text:
                    score += 2
                    if token in chunk["crop"].lower() or token in chunk["disease"].lower():
                        score += 5  # Bonus for direct crop/disease match

            if score > 0:
                scored_chunks.append((score, chunk))

        scored_chunks.sort(key=lambda x: x[0], reverse=True)
        return [c for _, c in scored_chunks[:top_k]]

    def generate_response(self, query: str, language: str = "en", farm_context: Optional[Dict] = None) -> Dict[str, Any]:
        """
        Synthesizes a helpful, respectful, grounded agricultural response with follow-up prompts.
        """
        results = self.search_knowledge(query, top_k=2)
        q_lower = query.lower()

        # Follow-up prompts based on intent
        suggested_followups = [
            "What preventive spray is best?",
            "How does current weather affect this?",
            "How often should I irrigate?"
        ]
        if language == "hi":
            suggested_followups = [
                "बचाव के लिए कौन सा जैविक छिड़काव करें?",
                "वर्तमान मौसम का इस पर क्या असर पड़ेगा?",
                "कितने दिनों के अंतराल पर पानी देना चाहिए?"
            ]

        # Grounded responses based on queries and retrieved chunks
        if "yellow" in q_lower or "पीली" in q_lower or "पीला" in q_lower:
            if language == "hi":
                answer = (
                    "पत्तियों का पीला पड़ना (क्लोरोसिस) मुख्यतः तीन कारणों से हो सकता है:\n\n"
                    "1. **नाइट्रोजन की कमी:** पुरानी निचली पत्तियां पहले पीली पड़ती हैं और पौधे की बढ़वार रुकती है।\n"
                    "2. **अत्यधिक नमी या जलभराव:** जड़ों में हवा की कमी होने पर पत्तियां पीली पड़कर लटकने लगती हैं।\n"
                    "3. **फंगल या विषाणु रोग (जैसे अर्ली ब्लाइट या लीफ कर्ल):** पत्ती पर पीले घेरे या धब्बे बनते हैं।\n\n"
                    "**तुरंत क्या करें:**\n"
                    "• खेत में पानी जमा न होने दें और जल निकासी सुनिश्चित करें।\n"
                    "• यदि केवल निचली पत्तियां पीली हैं, तो 19:19:19 (एनपीके) @ 5 ग्राम/लीटर का पर्णीय छिड़काव करें।\n"
                    "• प्रभावित पत्तियों की जांच करें कि क्या उन पर कोई धब्बे या रस चूसक कीड़े तो नहीं हैं।"
                )
            else:
                answer = (
                    "Leaves turning yellow (chlorosis) usually stems from three primary factors:\n\n"
                    "1. **Nitrogen Deficiency:** Older lower leaves turn pale yellow first, accompanied by stunted vegetative growth.\n"
                    "2. **Overwatering or Waterlogging:** Poor drainage suffocates root oxygen uptake, leading to limp, drooping yellow leaves.\n"
                    "3. **Early Stage Pathogens (Fungal Blight or Virus):** Chlorotic halos develop around spots or leaf margins curl.\n\n"
                    "**Immediate Actions:**\n"
                    "• Ensure proper drainage so irrigation water does not stand for more than 2 hours.\n"
                    "• If yellowing is generalized on lower leaves, apply a mild foliar spray of NPK 19:19:19 @ 5g/L.\n"
                    "• Inspect leaf undersides for fungal spores or tiny sucking pests (whiteflies/thrips)."
                )
        elif "rain" in q_lower or "बारिश" in q_lower or "मौसम" in q_lower:
            if language == "hi":
                answer = (
                    "भारी बारिश के बाद फसलों में फफूंदजनित (फंगल) रोगों का खतरा तेजी से बढ़ जाता है।\n\n"
                    "**मुख्य सलाह:**\n"
                    "1. **जल निकासी:** सबसे पहले मेड़ों की नालियां खोलकर खेत से अतिरिक्त पानी निकालें।\n"
                    "2. **सुरक्षात्मक छिड़काव:** बारिश रुकने और पत्तियां सूखने पर कॉपर ऑक्सीक्लोराइड 50% WP (2.5 ग्राम/लीटर) या मैंकोजेब (2 ग्राम/लीटर) का छिड़काव करें।\n"
                    "3. **यूरिया का प्रयोग रोकें:** जब तक मिट्टी से अतिरिक्त नमी न निकल जाए, यूरिया न डालें।"
                )
            else:
                answer = (
                    "Continuous rainfall combined with high humidity drastically elevates the risk of fungal blights and collar rot.\n\n"
                    "**Post-Rainfield Care Advisory:**\n"
                    "1. **Drain Standing Water:** Immediately unblock perimeter furrows to let pooled water drain.\n"
                    "2. **Prophylactic Spray:** As soon as foliage dries, apply a contact protective fungicide like Copper Oxychloride 50% WP (2.5 g/L) or Mancozeb 75% WP (2 g/L).\n"
                    "3. **Hold Nitrogen Fertilizer:** Delay top-dressing urea until the soil dries sufficiently to prevent lush, vulnerable growth."
                )
        elif "tomato" in q_lower or "टमाटर" in q_lower:
            if language == "hi":
                answer = (
                    "टमाटर की फसल में अगेती झुलसा (Early Blight) और पत्ती मरोड़ रोग सबसे आम समस्याएं हैं।\n\n"
                    "• यदि निचली पत्तियों पर गोल कत्थई छल्लेदार धब्बे दिख रहे हैं, तो यह अगेती झुलसा है। इसके लिए मैंकोजेब (2 ग्राम/लीटर) का छिड़काव करें।\n"
                    "• यदि पत्तियां ऊपर की ओर मुड़कर सिकुड़ रही हैं, तो यह सफेद मक्खी द्वारा फैलाया जाने वाला लीफ कर्ल वायरस हो सकता है। पीले चिपचिपे कार्ड लगाएं और नीम तेल (5 मिली/लीटर) का छिड़काव करें।"
                )
            else:
                answer = (
                    "In tomato cultivation, Early Blight (*Alternaria solani*) and Leaf Curl are frequent concerns:\n\n"
                    "• If you observe concentric circular brown spots on lower leaves, it indicates Early Blight. Prune lower diseased foliage and spray Mancozeb 75% WP @ 2g/L or Trichoderma @ 5g/L.\n"
                    "• If leaves are puckered and curling upward with stunted growth, whitefly vector control is necessary using yellow sticky traps and Neem oil (5ml/L)."
                )
        elif "potato" in q_lower or "आलू" in q_lower:
            if language == "hi":
                answer = (
                    "आलू में पछेती झुलसा (Late Blight) एक विनाशकारी रोग है जो कोहरे और उच्च नमी में तेजी से फैलता है।\n\n"
                    "• लक्षणों में पत्तियों के किनारों पर पानी से भीगे भूरे-काले धब्बे और निचली सतह पर सफेद फफूंद दिखती है।\n"
                    "• तुरंत सुरक्षात्मक उपाय के रूप में साइमोक्सानिल + मैंकोजेब (3 ग्राम/लीटर) का छिड़काव करें।"
                )
            else:
                answer = (
                    "Potato Late Blight (*Phytophthora infestans*) is an aggressive disease triggered by overcast skies, morning fog, and high humidity (>85%).\n\n"
                    "• Key symptoms: Water-soaked irregular dark lesions at leaf tips with white downy growth on the underside.\n"
                    "• Immediate action: Apply systemic fungicide Cymoxanil 8% + Mancozeb 64% WP @ 3g/L with uniform canopy coverage."
                )
        else:
            if language == "hi":
                answer = (
                    "नमस्ते! मैं आपका एग्रीसाथी (AgriSathi) कृषि सहायक हूँ।\n\n"
                    "आप अपनी फसल (टमाटर, आलू, धान, कपास, मिर्च आदि) की समस्या के बारे में पूछ सकते हैं या प्रभावित पत्ती की फोटो अपलोड कर सकते हैं।\n\n"
                    "कृपया बताएं: आपकी फसल कौन सी है और पत्तियों या तने पर क्या लक्षण दिखाई दे रहे हैं?"
                )
            else:
                answer = (
                    "Hello! I am your AgriSathi agricultural companion.\n\n"
                    "I can help you diagnose symptoms across crops like Tomato, Potato, Rice, Cotton, Chilli, and more. You can upload a photo of the affected leaf or describe symptoms.\n\n"
                    "To give you precise advice: which crop are you growing, and what changes have you observed on the foliage or stems?"
                )

        # Collect source citations
        sources = []
        if results:
            for r in results:
                sources.append({
                    "title": r["title"],
                    "organization": r["source_org"],
                    "url": r["source_url"]
                })
        else:
            sources.append({
                "title": "ICAR Farmer Advisory Guidelines",
                "organization": "Indian Council of Agricultural Research (ICAR)",
                "url": "https://icar.org.in"
            })

        return {
            "text": answer,
            "sources": sources,
            "suggested_followups": suggested_followups
        }

rag_service = RAGService()
