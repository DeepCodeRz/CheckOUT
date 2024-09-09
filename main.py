from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/options', methods=['POST'])
def options():
    data = request.json
    lat = data['lat']
    lng = data['lng']
    date = data['date']
    minTemp = int(data['minTemp'])
    maxTemp = int(data['maxTemp'])
    minPrecipitation = float(data['minPrecipitation'])
    maxPrecipitation = float(data['maxPrecipitation'])
    minWind = int(data['minWind'])
    maxWind = int(data['maxWind'])

    print(minWind, maxWind)
    if minTemp > maxTemp:
        print(minTemp, maxTemp)
        return jsonify({"error0": "Invalid options!"})
    elif minPrecipitation > maxPrecipitation:
        print(minPrecipitation, maxPrecipitation)
        return jsonify({"error0": "Invalid options!"})
    elif minWind > maxWind:
        print(minWind, maxWind)
        return jsonify({"error0": "Invalid options!"})
    else:
        return jsonify({"ok": "ok!"})


    print(lat, lng, date, minTemp, maxTemp, minPrecipitation, maxPrecipitation)

    url = f"https://api.met.no/weatherapi/locationforecast/2.0/mini.json?lat={lat}&lon={lng}"

    headers = {
        'User-Agent': 'CheckOUT!/1.0 (bedirhan_kurt_@outlook.com)'
    }

    data = requests.get(url, headers=headers).json()
    print(data)

    def get_weather_data(data, date, time):
        for item in data.get('forecast', []):
            if item['date'] == date and item['time'] == time:
                return {
                    'temperature': item['temperature'],
                    'wind_speed': item['wind']['speed'],
                    'wind_direction': item['wind']['direction'],
                    'rain': item['precipitation']['rain']
                }
        return 0

    date = '2024-09-08'
    time = '12:00:00'
    weather_data = get_weather_data(data, date, time)

    if weather_data:
        print(f"Temperature: {weather_data['temperature']}°C")
        print(f"Wind Speed: {weather_data['wind_speed']} km/h")
        print(f"Wind Direction: {weather_data['wind_direction']}")
        print(f"Rain: {weather_data['rain']} mm")
    else:
        print("No data found for the specified date and time.")


if __name__ == '__main__':
    app.run(debug=True, port=5005)