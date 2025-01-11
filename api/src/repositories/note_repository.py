from src.repositories.repository import Repository

class NoteRepository(Repository):
    def __init__(self):
        super().__init__('notes')

    def get_note_by_id(self, note_id: str):
        return self.get(note_id)
    
    def create_note(self, note_data: dict):
        self.create(note_data)

    def delete_note(self, note_id: str):
        self.delete(note_id)

    def list_notes(self):
        return self.list()
    
    def find_notes_by_title(self, title: str):
        return self.query('title', '==', title)
    