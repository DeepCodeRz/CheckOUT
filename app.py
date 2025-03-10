import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

def get_data(timeseries, target_time):
    entry = next((ts for ts in timeseries if ts['time'] == target_time), None)
    if entry:
        details = entry['data']['instant']['details']
        return {
            'temperature': details.get('air_temperature'),
            'wind_speed': details.get('wind_speed'),
            'precipitation': entry['data']['next_6_hours']['details'].get('precipitation_amount')
        }
    return None
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/options', methods=['POST'])
def options():
    data = request.json
    lat = data['lat']
    lng = data['lng']
    time = data['time']
    date = data['date']
    minTemp = int(data['minTemp'])
    maxTemp = int(data['maxTemp'])
    minPrecipitation = float(data['minPrecipitation'])
    maxPrecipitation = float(data['maxPrecipitation'])
    minWind = int(data['minWind'])
    maxWind = int(data['maxWind'])

    if minTemp > maxTemp:
        return jsonify({"error0": "Invalid options!"})
    elif minPrecipitation > maxPrecipitation:
        return jsonify({"error0": "Invalid options!"})
    elif minWind > maxWind:
        return jsonify({"error0": "Invalid options!"})
    else:

        url = f"https://api.met.no/weatherapi/locationforecast/2.0/complete?lat={lat}&lon={lng}"

        headers = {
            'User-Agent': 'CheckOUT!/1.0 (bedirhan_kurt_@outlook.com)'
        }

        data = requests.get(url, headers=headers).json()
        print(data)

        print(date)
        if time == "morning":
            time = date + "T11:00:00Z"
        elif time == "afternoon":
            time = date + "T14:00:00Z"
        elif time == "evening":
            time = date + "T20:00:00Z"
        elif time == "night":
            time = date + "T23:00:00Z"


        timeseries = data['properties']['timeseries']
        weather_data = get_data(timeseries, time)

        if weather_data:
            print(f"Temperature: {weather_data['temperature']}°C")
            print(f"Precipitation: {weather_data['precipitation']} mm")
            print(f"Wind Speed: {weather_data['wind_speed']} km/h")
            print(minTemp, maxTemp, minPrecipitation, maxPrecipitation, minWind, maxWind)
            if (minTemp <= weather_data['temperature'] <= maxTemp) and (
                    weather_data['precipitation'] >= minPrecipitation and weather_data[
                'precipitation'] <= maxPrecipitation) and (
                    minWind <= weather_data['wind_speed'] <= maxWind):
                return jsonify({"true": "true"})
            else:
                return jsonify({"false": "false"})
        else:
            print(time)

            if time == (date + "T23:00:00Z"):
                time = date + "T00:00:00Z"
            elif time == (date + "T11:00:00Z"):
                time = date + "T06:00:00Z"
            elif time == (date + "T14:00:00Z"):
                time = date + "T12:00:00Z"
            elif time == (date + "T20:00:00Z"):
                time = date + "T18:00:00Z"

            weather_data = get_data(timeseries, time)
            print(get_data(timeseries, time))

            if weather_data:
                print(f"Temperature: {weather_data['temperature']}°C")
                print(f"Precipitation: {weather_data['precipitation']} mm")
                print(f"Wind Speed: {weather_data['wind_speed']} km/h")

                if (minTemp <= weather_data['temperature'] <= maxTemp) and (
                        weather_data['precipitation'] >= minPrecipitation and weather_data[
                    'precipitation'] <= maxPrecipitation) and (
                        minWind <= weather_data['wind_speed'] <= maxWind):
                    return jsonify({"true": "true"})
                else:
                    return jsonify({"false": "false"})
            else:
                return jsonify({"error3": "error3"})


if __name__ == '__main__':
    app.run(debug=True, port=5004)