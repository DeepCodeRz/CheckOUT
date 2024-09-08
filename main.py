from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/options', methods=['POST'])
def options():
    data = request.json
    date = data['date']
    minTemp = data['minTemp']
    maxTemp = data['maxTemp']
    minRain = data['minRain']
    maxRain = data['maxRain']
    minWind = data['minWind']
    maxWind = data['maxWind']

    print(minTemp, maxTemp, minRain, maxRain)

    url = "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=59.91&lon=10.75"

    headers = {
        'User-Agent': 'CheckOUT!/1.0 (bedirhan_kurt_@outlook.com)'
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        print(data)
    else:
        print(f"Failed to fetch data: {response.status_code}")


if __name__ == '__main__':
    app.run(debug=True, port=5005)