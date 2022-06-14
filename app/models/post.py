from .db import db

class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    media_url = db.Column(db.String(300), nullable=False)
    description = db.Column(db.String(400), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'media_url': self.media_url,
            'description': self.description,
            'created_at': self.created_at,
            # 'user': self.user.to_dict()
            "username": self.user.username,

        }

    user = db.relationship("User", back_populates='post')
    like = db.relationship("Like", back_populates='post', cascade='all,delete-orphan')
    comment = db.relationship("Comment", back_populates='post', cascade='all,delete-orphan')
