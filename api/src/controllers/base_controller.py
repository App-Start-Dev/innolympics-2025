from flask import Blueprint, jsonify
import json

base_blueprint = Blueprint('base', __name__)

@base_blueprint.route('/', methods=['GET'])
def get_home():
    return jsonify({'message': 'Server is running'}), 200

