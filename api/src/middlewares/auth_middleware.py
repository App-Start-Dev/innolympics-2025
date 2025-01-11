from flask import request, jsonify
from firebase_admin import auth

def authenticate_token():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'error': 'No token provided'}), 401
    
    try:
        token = token.split(' ')[1]
        decoded_token = auth.verify_id_token(token)
        request.user = decoded_token
        return None  # Allow the request to continue

    except Exception as e:
        return jsonify({"error": f"Token verification failed: {str(e)}"}), 401
