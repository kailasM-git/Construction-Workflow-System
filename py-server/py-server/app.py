from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from dateutil.relativedelta import relativedelta
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)
CORS(app)

@app.route('/api/payment/predict', methods=['POST'])
def predict_revenue():
    data = request.get_json()
    monthly_data = data.get('monthlyData', [])

    if not monthly_data:
        return jsonify({"error": "No data provided"}), 400

    # Convert month strings to numbers (e.g., "2025-03" → 0, "2025-04" → 1, etc.)
    base_date = datetime.strptime(monthly_data[0]['month'], "%Y-%m")
    X = []
    y = []

    for entry in monthly_data:
        month_str = entry['month']
        month_date = datetime.strptime(month_str, "%Y-%m")
        months_diff = (month_date.year - base_date.year) * 12 + (month_date.month - base_date.month)
        X.append([months_diff])
        y.append(entry['revenue'])

    # Train model
    model = LinearRegression()
    model.fit(X, y)

    # Predict next 3 months
    last_month_index = X[-1][0]
    predictions = []
    for i in range(1, 4):
        future_month_index = last_month_index + i
        future_date = base_date + relativedelta(months=future_month_index)
        predicted = model.predict([[future_month_index]])[0]
        predictions.append({
            "month": future_date.strftime("%Y-%m"),
            "predicted_revenue": round(predicted, 2)
        })

    return jsonify(predictions)
if __name__ == '__main__':
    app.run(debug=True)