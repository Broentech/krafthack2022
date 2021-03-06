__author__ = 'Luca'

'''/////////////////////////////////////////////////////////////////////////////
//  name      main.py
//
//  brief     main entry point for the application
//
//  author    Luca Petricca @ broentech solutions 
//
//  date      07.03.2022
//
//  Note: tested with python 3.9 
//
//h-////////////////////////////////////////////////////////////////////////// '''


# Hosted on europe-north1-docker.pkg.dev/ai-host-341618/krabroentech/krafthack2022:latest
from urllib import parse
import datetime
import socketio
from aiohttp import web
from aiohttp_middlewares import cors_middleware
from aiohttp_middlewares.cors import DEFAULT_ALLOW_HEADERS

import jwt
import requests
from cryptography.hazmat.backends import default_backend
from cryptography import x509

import asyncio , random
# local imports
from modelhandler import PREDICTOR
from datahandler import DATAHANDLER
import definitions as d

started = datetime.datetime.now()

sio = socketio.AsyncServer(
    async_mode='aiohttp' ,

    # Warning : https://1library.net/article/cross-origin-controls-python-socketio-documentation.y4wo6d75
    cors_allowed_origins='*'
)

# Unsecure configuration to allow all CORS requests
app = web.Application(
    middlewares=[cors_middleware(allow_all=True)]
)
sio.attach(app)
routes = web.RouteTableDef()

subscribers : dict = {}


def check_token(token):
    n_decoded = jwt.get_unverified_header(token)
    kid_claim = n_decoded["kid"]

    response = requests.get("https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com")
    x509_key = response.json()[kid_claim]
    key = x509.load_pem_x509_certificate(x509_key.encode('utf-8'),  backend=default_backend())
    public_key = key.public_key()

    decoded_token = jwt.decode(token, public_key, ["RS256"], options=None, audience=d.AUDIENCE)
    print(f"Decoded token : {decoded_token}")
    username=decoded_token.get("preferred_username", "" )
    email=decoded_token.get("email", "" )
    roles=decoded_token.get("realm_access", {} ).get("roles")
    return username, email, roles, token


@routes.get('/')
async def read_root(request):
    access_token = request.headers.get('Authorization', "").encode('utf-8')
    check_token(access_token)
    return web.json_response({"ServiceName": "krafthack2022_predictor", "service started": str(started) , "info": "lucap@broentech.no" })


@routes.get('/getmodels')
def get_models(request):
    access_token = request.headers.get('Authorization', "").encode('utf-8')
    check_token(access_token)
    return web.json_response(PREDICTOR.get_models())

@routes.get('/getmodelfiles')
def get_model_files(request):
    access_token = request.headers.get('Authorization', "").encode('utf-8')
    check_token(access_token)
    return web.json_response(PREDICTOR.get_model_files())

@routes.post('/predict')
async def predict(request):
    access_token = request.headers.get('Authorization', "").encode('utf-8')
    check_token(access_token)
    inputjson= await request.json()
    return web.json_response(PREDICTOR.get_predictions(inputjson))

@sio.event
async def getTimeseries(sid, data = None):
    print('New subscriber : ' , sid)
    while sid in subscribers:
        inp= DATAHANDLER.get_data(subscribers.get(sid))
        subscribers[sid]+=1
        data= PREDICTOR.get_predictions(inp)

        ############### Just making up some data here ^^^^^^

        await sio.emit('getTimeseries', data, room=sid)
        await asyncio.sleep(1)

    print('Unsubscribed : ', sid)

@sio.event
def connect(sid, environ, auth : dict):
    check_token(auth.get('token' , ''))
    query= environ.get("QUERY_STRING")
    query= dict(parse.parse_qsl(query))
    mytimestamp= float(query.get("timestamp"))
    mytimestamp = datetime.datetime.fromtimestamp(mytimestamp)
    print('connect : ' , sid)
    if not sid in subscribers :
        subscribers[sid] = DATAHANDLER.get_closedts(mytimestamp)

@sio.event
def disconnect(sid):
    print('disconnect ', sid)
    if sid in subscribers :
        del subscribers[sid]

app.add_routes(routes)
if __name__ == "__main__":
    web.run_app(app , port=5000)
