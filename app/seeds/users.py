from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', image_url='https://t4.ftcdn.net/jpg/02/59/68/53/240_F_259685304_GU2G9fZ4qWXiWgJbcOrlagnJmTBVQ32X.jpg', description='I am Demo')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', image_url='https://t3.ftcdn.net/jpg/00/74/70/92/240_F_74709230_Oi0LDDGMOL4uZjgnVvhHMHSf9hoszFmD.jpg', description="Hi, I am Noah's Mom")
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password',image_url='https://t4.ftcdn.net/jpg/01/40/82/83/240_F_140828351_P2MjJoNTrPJzDwhlbsXLxPxBE8Dm9mJO.jpg', description="Smith Family")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
