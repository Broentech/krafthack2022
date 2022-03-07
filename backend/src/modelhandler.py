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

class modelHandler():
    def __init__(self):
        self.activemodels=[]
        self.modelfiles = []
        self.load_models()

    def load_models(self):
        self.mymodels = {}
        print("Reloading models")
        for modelnames in d.MODEL_NAMES:
            filenamepkl= modelnames

        for filename in os.listdir(d.MODEL_FOLDER):
            f = os.path.join(d.MODEL_FOLDER, filename)
            # checking if it is a file
            if os.path.isfile(f) and f.endswith(".json"):
                try:
                    self.modelfiles.append(f.split("/")[-1].strip())
                    name = f.split("/")[-1].replace(".json", "")
                    print(f"loading {f} as {name}")
                    self.activemodels.append(name)
                    #self.mymodels[name] = xgb.XGBRegressor()
                    #self.mymodels[name].load_model(f)
                except Exception as e:
                    print(f"failed loading {f} because {e}")


    def get_models(self):
        return {"activeModels": sorted(self.activemodels)}

    def get_model_files(self):
        return {"modelFiles": sorted(self.modelfiles)}

    def predict(self, inputs):
        return [{'modelName': 'bolt_1', 'value': random.randint(10, 1000)},
                {'modelName': 'bolt_2', 'value': random.randint(10, 1000)},
                {'modelName': 'bolt_3', 'value': random.randint(10, 1000)},
                {'modelName': 'bolt_4', 'value': random.randint(10, 1000)},
                {'modelName': 'bolt_5', 'value': random.randint(10, 1000)},
                {'modelName': 'bolt_6', 'value': random.randint(10, 1000)}]

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