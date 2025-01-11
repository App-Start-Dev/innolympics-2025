from flask import Blueprint, request, jsonify
from src.services.note_service import NoteService

note_blueprint = Blueprint('note', __name__)
note_service = NoteService()

@note_blueprint.route('/notes', methods=['GET'])
def get_notes():
    notes = note_service.list_notes()
    return jsonify(notes), 200

@note_blueprint.route('/notes', methods=['POST'])
def create_note():
    note_data = request.json['note_data']
    note_service.create_note(note_data)
    return jsonify({'message': 'Note created successfully'}), 201

@note_blueprint.route('/notes/<note_id>', methods=['GET'])
def get_note_by_id(note_id):
    note = note_service.get_note_by_id(note_id)
    return jsonify(note), 200

@note_blueprint.route('/notes/<note_id>', methods=['DELETE'])
def delete_note(note_id):
    note_service.delete_note(note_id)
    return jsonify({'message': 'Note deleted successfully'}), 200
