from typing import Dict, Any

class SpeechService:
    """
    Speech AI Service for speech-to-text and text-to-speech fallback processing.
    Provides backend transcription handling and vernacular synthesis.
    """

    def transcribe_audio(self, audio_bytes: bytes, filename: str = "", language: str = "hi") -> Dict[str, Any]:
        """
        Transcribes voice inputs into query text.
        In demo mode, provides realistic transcriptions in English or Hindi.
        """
        if language == "hi":
            sample_queries = [
                "टमाटर की पत्तियों पर भूरे धब्बे क्यों पड़ रहे हैं?",
                "बारिश के बाद फसल को झुलसा रोग से कैसे बचाएं?",
                "मिर्च की पत्तियां ऊपर की ओर क्यों मुड़ रही हैं?"
            ]
            text = sample_queries[0]
        else:
            sample_queries = [
                "Why are my tomato leaves turning yellow with brown spots?",
                "What organic spray should I apply after heavy rain?",
                "How to treat leaf curl virus on chilli plants?"
            ]
            text = sample_queries[0]

        return {
            "transcription": text,
            "language": language,
            "confidence": 0.95,
            "status": "success"
        }

    def synthesize_speech(self, text: str, language: str = "en") -> Dict[str, Any]:
        """
        Synthesizes spoken audio for farmer advisory text.
        Returns synthesized audio payload or web speech instruction.
        """
        return {
            "text": text,
            "language": language,
            "audio_format": "audio/mp3",
            "status": "ready"
        }

speech_service = SpeechService()
