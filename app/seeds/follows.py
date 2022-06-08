from app.models import db, Follow

def seed_follows():
    follow1 = Follow(follower_id=1, following_id=2)
    follow2 = Follow(follower_id=2, following_id=1)

    db.session.add(follow1)
    db.session.add(follow2)

    db.session.commit()

def undo_follows():
    db.session.execute('TRUNCATE follows RESTART IDENTITY CASCADE;')
    db.session.commit()
