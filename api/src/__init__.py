import os
from flask import Flask 
from flask_cors import CORS 
import firebase_admin
from firebase_admin import credentials 

from src.config import Config 
from src.middlewares.auth_middleware import authenticate_token
from src.controllers.note_controller import note_blueprint
from src.controllers.base_controller import base_blueprint
from src.controllers.ai_controller import ai_blueprint
from src.utils import register_blueprints

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    cred_path = os.path.join(os.path.dirname(__file__), Config.FIREBASE_CREDENTIALS)
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)

    CORS(app, origins=app.config['CORS_ORIGINS'], credentials=True)
    base_blueprint.before_request(authenticate_token)  
    note_blueprint.before_request(authenticate_token)  


    blueprints =[note_blueprint, base_blueprint, ai_blueprint]
    register_blueprints(app, blueprints, url_prefix='/api')
    

    return app