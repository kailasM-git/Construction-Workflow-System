import sys
import json
import joblib

# Load trained model
model = joblib.load('estimate_model.pkl')

# Input from command-line
input_data = sys.argv[1]
features = json.loads(input_data)  # Expecting [area_sqft, num_floors, location_index, material_quality]

# Predict and return result
prediction = model.predict([features])
print(prediction[0])
