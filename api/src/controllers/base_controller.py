from flask import Blueprint, jsonify, request

base_blueprint = Blueprint('base', __name__)

@base_blueprint.route('/', methods=['GET'])
def get_home():
    user = request.user
    user_info = {
        'uid': user['uid'],
        'email': user['email'],
        'name': user.get('name', 'User'),
        'picture': user.get('picture', None),
        'email_verified': user['email_verified']
    }
    return jsonify({
        'message': 'success',
        'user': user_info
    }), 200
