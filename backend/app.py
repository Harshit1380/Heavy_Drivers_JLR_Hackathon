from flask import Flask, request, jsonify
import pandas as pd
from flask_cors import CORS # CORS for handling Cross-Origin Resource Sharing
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from keras.models import load_model
import numpy as np
import pickle 
import warnings
warnings.filterwarnings('ignore')
import joblib

# Create a Flask application instance
app = Flask(__name__)

# Enable CORS for all routes, allowing requests from any origin
CORS(app,resources={r"/*":{"origins":"*"}})

# model = pickle.load(open('ensemble_model.pkl', 'rb'))
def convert(x):
    if x=='UK':
        return 0
    elif x=='SVK':
        return 1
    else:
        return -1
def predict__(input):
  print(input)
  inp = input.to_numpy()
  print("input :::::::",inp)
  scalar_input = joblib.load('./scaler_input.pkl')
  scalar_output = joblib.load('./scaler_output.pkl')
  scaled_input = scalar_input.transform(inp)
  model = load_model('./heavy_drivers_01 1.keras')
  preds = model.predict(scaled_input).flatten()
  inverse_preds = scalar_output.inverse_transform([preds])
  return inverse_preds[0]

# Define a route for handling HTTP GET requests to the root URL
@app.route('/', methods=['GET'])
def get_data():
    data = {
        "message":"API is Running"
    }
    return jsonify(data)
  
# Define a route for making predictions
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # print(data)
        if(data['totalMass']==""):
            data['totalMass'] = "-1"
        if(data['paintedBodyColour']==""):
            data['paintedBodyColour'] = "-1"
        if(data['paintedGlossBlack']==""):
            data['paintedGlossBlack'] = "-1"
        if(data['grainedPlastic']==""):
            data['grainedPlastic'] = "-1"
        if(data['year']==""):
            data['year'] = "-1"
        if(data['countryOfProduction']==""):
            data['countryOfProduction'] = "-1"
        if(data['vehicleVolume']==""):
            data['vehicleVolume'] = "-1"
        if(data['numberOfParts']==""):
            data['numberOfParts'] = "-1"
        query_df = pd.DataFrame([data])
        # print("Heyyy====>>" ,(query_df['totalMass']==""))
        # if bool(query_df['totalMass']==""):
        #     print("Here=====>")
        #     # query_df['totalMass'].apply(lambda x: "-1")
        # print("Here",query_df['totalMass'])
        # if(query_df['paintedBodyColour'].any==False):
        #     query_df['paintedBodyColour'] = "-1"
        # if(query_df['paintedGlossBlack'].any==False):
        #     query_df['paintedGlossBlack'] = "-1"
        # if(query_df['grainedPlastic'].any==False):
        #     query_df['grainedPlastic'] = "-1"
        # if(query_df['year'].any==False):
        #     query_df['year'] = "-1"
        # if(query_df['countryOfProduction'].any==False):
        #     query_df['countryOfProduction'] = "-1"
        # if(query_df['vehicleVolume'].any==False):
        #     query_df['vehicleVolume'] = "-1"
        # if(query_df['numberOfParts'].any==False):
        #     query_df['numberOfParts'] = "-1"
        query_df['totalMass'] = query_df['totalMass'].apply(lambda x: float(x))
        query_df['paintedBodyColour'] = query_df['paintedBodyColour'].apply(lambda x: float(x))
        query_df['paintedGlossBlack'] = query_df['paintedGlossBlack'].apply(lambda x: float(x))
        query_df['grainedPlastic'] = query_df['grainedPlastic'].apply(lambda x: float(x))
        query_df['year'] = query_df['year'].apply(lambda x: int(x))
        query_df['countryOfProduction'] = query_df['countryOfProduction'].apply(lambda x: convert(x))
        query_df['vehicleVolume']= query_df['vehicleVolume'].apply(lambda x: int(x))
        query_df['numberOfParts']= query_df['numberOfParts'].apply(lambda x: int(x))
        print(query_df)
        prediction = predict__(input=query_df)
        print("The predicted value is : ",str(np.round(prediction,3)[0]))
        return jsonify({'Prediction': str(np.round(prediction,3)[0])})
    except Exception as e:
        print("Here is the error" ,e)
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
