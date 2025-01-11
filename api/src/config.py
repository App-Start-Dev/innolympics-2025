import os 
from dotenv import load_dotenv

load_dotenv()

class Config:
    FIREBASE_CREDENTIALS = os.getenv("FIREBASE_CREDENTIALS", './firebase-credentials.json')
    FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID")
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")