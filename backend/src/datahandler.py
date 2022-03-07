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
import socket
import definitions as d
import pandas as pd
import datetime
import bisect

class datahandler():
    def __init__(self):
        self.timestamps=[]
        self.dataset = {}
        self.loaddataset()

    def loaddataset(self):
        mydf = pd.read_csv(d.DATASET_PATH, index_col=0)
        for index, row in mydf.iterrows():
            self.dataset[index] = row.to_dict()
            self.dataset[index]["timestamp"]=index
            conve = datetime.datetime.strptime(index, "%Y-%m-%d %H:%M:%S")
            self.timestamps.append(conve)
        self.timestamps.sort()


    def get_closedts(self, timest):
        try:
            return bisect.bisect_right(self.timestamps, timest)
        # if we except, it means, we exceed, so we restart from 0
        except Exception as e:
            return 0

    def get_data(self, ind):
        timestampstr= str(self.timestamps[(ind) % len(self.timestamps)])
        return self.dataset.get(timestampstr, None)

DATAHANDLER = datahandler()

