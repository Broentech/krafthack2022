import pickle
import os
import numpy as np
import joblib
import xgboost as xgb
import pandas as pd

def predict(input_data, tensile_number, model_type="xgboost"):
    scaler_name = "Bolt_" + str(tensile_number) + "_" + "Tensile_" + "scaler" + ".pkl"
    model_name = "Bolt_" + str(tensile_number) + "_" + "Tensile_" + model_type + ".pkl"

    scaler = pickle.load(open(scaler_name, 'rb'))

    if model_type == "xgboost":
        model_name = "Bolt_" + str(tensile_number) + "_" + "Tensile_" + model_type + ".json"
        model = xgb.XGBRegressor()
        model.load_model(model_name)
    else:
        try:
            model = joblib.load(open(model_name, 'rb'))
        except:
            model = pickle.load(open(model_name, 'rb'))

    scalered_values = scaler.transform(input_data[:, :6])
    input_scalered = np.concatenate((scalered_values, input_data[:, 6:]), axis=1)

    prediction = model.predict(input_scalered)
    return prediction

