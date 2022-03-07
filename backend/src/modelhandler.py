'''/////////////////////////////////////////////////////////////////////////////
//  name      modelhandler.py
//
//  brief     handles model
//
//  author    Luca Petricca @ broentech solutions
//
//  date      07.03.2022
//
//  Note: tested with python 3.9
//
//h-////////////////////////////////////////////////////////////////////////// '''
import random

import definitions as d
import os
import pickle
import numpy as np
import xgboost as xgb
import pandas as pd

class modelHandler():
    def __init__(self):
        self.activemodels=[]
        self.modelfiles = []
        self.boltmodels = {}
        self.load_models()

    def load_models(self):
        print("Reloading models")
        for modelname in d.MODEL_NAMES:
            try:
                filenamescaler= modelname+"_scaler.pkl"
                filenamexgboost= modelname+"_xgboost.json"
                fullpathscaler= os.path.join(d.MODEL_FOLDER, filenamescaler)
                fullpathxgboost= os.path.join(d.MODEL_FOLDER, filenamexgboost)

                #lets load the xgboost
                if os.path.isfile(fullpathxgboost):
                    self.modelfiles.append(filenamexgboost)
                    print(f"loading model {filenamexgboost} as {modelname}")
                    xgboost = xgb.XGBRegressor()
                    xgboost.load_model(fullpathxgboost)
                else:
                    continue


                #lets load the scaler
                if os.path.isfile(fullpathscaler):
                    self.modelfiles.append(filenamescaler)
                    print(f"loading scalar {fullpathscaler} as {modelname}")
                    scaler = pickle.load(open(fullpathscaler, 'rb'))
                else:
                    continue

                self.boltmodels[modelname]= {"scaler": scaler, "model": xgboost}
                self.activemodels.append(modelname)

            except Exception as e:
                print(f"failed loading {modelname} because {e}")



    def get_models(self):
        return {"activeModels": sorted(self.activemodels)}

    def get_model_files(self):
        return {"modelFiles": sorted(self.modelfiles)}

    def predict(self, inputs):
        newinputs= self.convert_inputs(inputs)
        inputs= np.array(newinputs).reshape(1, -1)
        predictions={}
        for model_bolts in d.MODEL_NAMES:

            scalered_values=self.boltmodels[model_bolts]["scaler"].transform(inputs[:, :6])
            input_scalered = np.concatenate((scalered_values, inputs[:, 6:]), axis=1)
            array= self.boltmodels[model_bolts]["model"].predict(input_scalered)
            predict_array = array[0]
            predictions[model_bolts] = predict_array.item()

        return [{'modelName': 'bolt_1', 'value': predictions["Bolt_1_Tensile"]},
                {'modelName': 'bolt_2', 'value': predictions["Bolt_2_Tensile"]},
                {'modelName': 'bolt_3', 'value': predictions["Bolt_3_Tensile"]},
                {'modelName': 'bolt_4', 'value': predictions["Bolt_4_Tensile"]},
                {'modelName': 'bolt_5', 'value': predictions["Bolt_5_Tensile"]},
                {'modelName': 'bolt_6', 'value': predictions["Bolt_6_Tensile"]}]


    def convert_inputs(self,inputs):
        toret=[]
        toret.append(inputs["Unit_4_Power"])
        toret.append(inputs["Unit_4_Reactive Power"])
        toret.append(inputs["Turbine_Guide Vane Opening"])
        toret.append(inputs["Turbine_Pressure Drafttube"])
        toret.append(inputs["Turbine_Pressure Spiral Casing"])
        toret.append(inputs["Turbine_Rotational Speed"])
        if inputs["mode"]=="operation":
            toret.append(1)
            toret.append(0)
        else:
            toret.append(0)
            toret.append(1)
        return toret

    def get_predictions(self, inputs):
        modeloutput=  self.predict(inputs)
        return self.format_output(inputs, modeloutput)

    def format_output(self, inputs, modelpredictions):
        modelinputs=[]
        for k, v in inputs.items():
            if k=="timestamp":
                continue
            modelinputs.append({"sensorname":k, "value": v})
        data = {
            'timestamp': inputs["timestamp"],
            'modelInput': modelinputs,
            'modelOutput': modelpredictions,
            'mode': inputs["mode"]
        }
        return data

PREDICTOR = modelHandler()