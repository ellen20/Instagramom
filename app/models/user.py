from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    fullname = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    image_url = db.Column(db.String(300), nullable=False)
    description = db.Column(db.String(400), nullable=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'fullname': self.fullname,
            'email': self.email,
            'image_url': self.image_url,
            'description': self.description
        }

    post = db.relationship('Post', back_populates='user', cascade='all,delete-orphan')
    like = db.relationship('Like', back_populates='user', cascade='all,delete-orphan')
    comment = db.relationship('Comment', back_populates='user', cascade='all,delete-orphan')
    follower = db.relationship("Follow", back_populates="user_follower", foreign_keys="Follow.follower_id", cascade="all,delete-orphan")
    following = db.relationship("Follow", back_populates="user_following", foreign_keys="Follow.following_id", cascade="all,delete-orphan")
    # user_likes = db.relationship('Post', secondary=like, back_populates='post_likes')
