from app.models import db, Comment
from datetime import datetime

def seed_comments():
    comment1 = Comment(user_id=1, post_id=1, description="I love you so much...", created_at=datetime.now())
    comment2 = Comment(user_id=2, post_id=1, description="Congratulations!", created_at=datetime.now())
    comment3 = Comment(user_id=1, post_id=3, description="What a sweety baby", created_at=datetime.now())

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
