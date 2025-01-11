import uuid
from firebase_admin import firestore

class Repository:
    def __init__(self, collection_name: str):
        self.db = firestore.Client()
        self.collection_name = collection_name
        self.collection = self.db.collection(collection_name)

    def get(self, doc_id: str):
        doc_ref = self.collection.document(doc_id)
        doc = doc_ref.get()
        if doc.exists:
            doc_data = doc.to_dict()
            doc_data['id'] = doc.id 
            return doc_data
        return None
    
    def create(self, data: dict):
        doc_ref = self.collection.document(str(uuid.uuid4()))
        doc_ref.set(data)

    def delete(self, doc_id: str):
        doc_ref = self.collection.document(doc_id)
        doc_ref.delete()

    def list(self):
        docs = self.collection.stream()
        return [{'id': doc.id, **doc.to_dict()} for doc in docs]
    
    def query(self, field, operator, value):
        docs = self.collection.where(field, operator, value).stream()
        return [doc.to_dict() for doc in docs]

