from src.repositories.note_repository import NoteRepository

class NoteService:
    def __init__(self):
        self.note_repository = NoteRepository()

    def get_note_by_id(self, note_id: str):
        return self.note_repository.get_note_by_id(note_id)

    def create_note(self, note_data: dict):
        self.note_repository.create_note(note_data)

    def delete_note(self, note_id: str):
        self.note_repository.delete_note(note_id)

    def list_notes(self):
        return self.note_repository.list_notes()

    def find_notes_by_title(self, title: str):
        return self.note_repository.find_notes_by_title(title)
    
    