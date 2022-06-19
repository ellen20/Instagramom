from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', fullname='Demo Kim', email='demo@aa.io', password='password', image_url='https://t4.ftcdn.net/jpg/02/59/68/53/240_F_259685304_GU2G9fZ4qWXiWgJbcOrlagnJmTBVQ32X.jpg', description='I am Demo')
    marnie = User(
        username='Marnie', fullname='Marnie Williams', email='marnie@aa.io', password='password', image_url='https://t3.ftcdn.net/jpg/00/74/70/92/240_F_74709230_Oi0LDDGMOL4uZjgnVvhHMHSf9hoszFmD.jpg', description="Hi, I am Noah's Mom")
    bobbie = User(
        username='Bobbie', fullname='Bobbie Smith',email='bobbie@aa.io', password='password',image_url='https://t4.ftcdn.net/jpg/01/40/82/83/240_F_140828351_P2MjJoNTrPJzDwhlbsXLxPxBE8Dm9mJO.jpg', description="Smith Family")
    sophia = User(
        username='sophia', fullname='Sophia Smith', email='sophia@aa.io', password='password', image_url='https://images.pexels.com/photos/159767/baby-cute-moe-brilliant-159767.jpeg', description='I am Demo')
    linda = User(
        username='linda', fullname='Linda Williams', email='linda@aa.io', password='password', image_url='https://images.pexels.com/photos/3934002/pexels-photo-3934002.jpeg', description="Hi, I am Eva's Mom")
    hanna = User(
        username='hanna', fullname='Hanna Smith',email='hanna@aa.io', password='password',image_url='https://images.pexels.com/photos/36039/baby-twins-brother-and-sister-one-hundred-days.jpg', description="Smith Family")
    emma = User(
        username='emma', fullname='Emma Smith',email='emma@aa.io', password='password',image_url='https://images.pexels.com/photos/459957/pexels-photo-459957.jpeg', description="Emilly's Mom")
    chloe = User(
        username='chloe', fullname='Chloe Smith',email='chloe@aa.io', password='password',image_url='https://images.pexels.com/photos/459905/pexels-photo-459905.jpeg', description="Smith Family")
    frances = User(
        username='frances', fullname='Frances Smith',email='frances@aa.io', password='password',image_url='https://images.pexels.com/photos/1133721/pexels-photo-1133721.jpeg', description="Happy Family")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(sophia)
    db.session.add(linda)
    db.session.add(hanna)
    db.session.add(emma)
    db.session.add(chloe)
    db.session.add(frances)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
