from datetime import datetime, timedelta
from typing import Dict, Any, List

class WeatherService:
    """
    Weather advisory service providing localized agricultural microclimate data,
    5-day forecasts, and proactive fungal/pest disease risk alerts.
    """

    def get_current_weather(self, location: str = "Madhya Pradesh, India") -> Dict[str, Any]:
        base_temp = 28.5
        humidity = 82.0
        rain_prob = 65.0
        wind = 12.4

        # Risk heuristic
        disease_risk = "Elevated Fungal Spore Spread Risk"
        disease_risk_hi = "उच्च नमी के कारण फफूंदजनित (फंगल) रोगों का खतरा अधिक"
        if humidity > 80:
            risk_detail = (
                "High relative humidity (82%) and warm temperatures (28.5°C) create an ideal microclimate "
                "for foliar fungal pathogens (Early Blight, Downy Mildew). Ensure rapid field drainage."
            )
            risk_detail_hi = (
                "82% उच्च आर्द्रता और 28.5°C तापमान फफूंद बीजाणुओं (अगेती झुलसा, डाउनी मिल्ड्यू) के लिए अनुकूल है। "
                "खेत में जलजमाव न होने दें और फव्वारा सिंचाई से बचें।"
            )
        else:
            risk_detail = "Moderate disease risk under current weather conditions."
            risk_detail_hi = "वर्तमान मौसम में रोग का मध्यम जोखिम है।"

        today = datetime.now()
        forecast: List[Dict[str, Any]] = []
        days_offset = ["Today", "Tomorrow", "Thu", "Fri", "Sat"]
        conditions = ["Scattered Showers", "Overcast Rain", "Partly Cloudy", "Sunny Intervals", "Thunderstorms"]
        temps = [28.5, 27.0, 29.2, 31.0, 26.5]
        humidities = [82, 88, 75, 68, 85]
        rains = [65, 80, 35, 15, 70]

        for i in range(5):
            d = today + timedelta(days=i)
            forecast.append({
                "day": days_offset[i] if i < len(days_offset) else d.strftime("%a"),
                "date": d.strftime("%d %b"),
                "temp": temps[i],
                "humidity": humidities[i],
                "rain_prob": rains[i],
                "condition": conditions[i]
            })

        return {
            "location": location,
            "temperature": base_temp,
            "humidity": humidity,
            "rain_probability": rain_prob,
            "wind_speed": wind,
            "condition": "Scattered Showers & High Humidity",
            "forecast_data": forecast,
            "disease_risk_alert": risk_detail,
            "disease_risk_alert_hi": risk_detail_hi
        }

weather_service = WeatherService()
