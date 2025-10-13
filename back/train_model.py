# import pandas as pd
# from sklearn.ensemble import RandomForestRegressor
# import joblib

# # Sample data
# data = pd.DataFrame({
#     'area_sqft': [1200, 1500, 2000, 1800],
#     'num_floors': [1, 2, 2, 3],
#     'location_index': [0, 1, 2, 1],
#     'material_quality': [3, 2, 4, 3],
#     'estimated_cost': [1500000, 2200000, 3000000, 2800000]
# })

# X = data[['area_sqft', 'num_floors', 'location_index', 'material_quality']]
# y = data['estimated_cost']

# model = RandomForestRegressor()
# model.fit(X, y)

# joblib.dump(model, 'estimate_model.pkl')
# print("✅ Model trained and saved as estimate_model.pkl")


import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

# Load data from CSV file
data = pd.read_csv('construction_data.csv') 

# Define features (X) and target (y)
X = data[['area_sqft', 'num_floors', 'location_index', 'material_quality']]
y = data['estimated_cost']

# Train the model
model = RandomForestRegressor()
model.fit(X, y)

# Save the model to disk
joblib.dump(model, 'estimate_model.pkl')
print("✅ Model trained from CSV and saved as estimate_model.pkl")

