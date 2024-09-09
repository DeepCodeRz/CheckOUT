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
    minTemp = data['minTemp']
    maxTemp = data['maxTemp']
    minPrecipitation = data['minPrecipitation']
    maxPrecipitation = data['maxPrecipitation']
    minWind = data['minWind']
    maxWind = data['maxWind']

    print(lat, lng, date, minTemp, maxTemp, minPrecipitation, maxPrecipitation)

    url = "https://api.met.no/weatherapi/locationforecast/2.0/mini.json?lat=53&lon=1"

    headers = {
        'User-Agent': 'CheckOUT!/1.0 (bedirhan_kurt_@outlook.com)'
    }

    data = requests.get(url, headers=headers).json()

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