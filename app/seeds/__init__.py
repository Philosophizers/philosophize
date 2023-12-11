


# # Creates a seed group to hold our commands
# # So we can type `flask seed --help`
# seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
# @seed_commands.command('all')
# def seed():
#     if environment == 'production':
#         # Before seeding in production, you want to run the seed undo 
#         # command, which will  truncate all tables prefixed with 
#         # the schema name (see comment in users.py undo_users function).
#         # Make sure to add all your other model's undo functions below
#         undo_users()
#     seed_users()
    # Add other seed functions here


# Creates the `flask seed undo` command
# @seed_commands.command('undo')
# def undo():
#     undo_users()
    # Add other undo functions here


from flask.cli import AppGroup
from .users import seed_users, undo_users
from .topics import seed_topics, undo_topics
from .comments import seed_comments, undo_comments
from .resources import seed_resources, undo_resources
from .votes import seed_votes, undo_votes

from app.models import db, environment, SCHEMA

seed_commands = AppGroup("seed")

@seed_commands.command("all")
def seed():
    if environment == 'production':
        # Before seeding in production, you might want to run the seed undo
        # command, which will truncate all tables prefixed with
        # the schema name (similar to the comment in the new example).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_topics()
        undo_comments()
        undo_resources()
        undo_votes()

    seed_users()
    seed_topics()
    seed_comments()
    seed_resources()
    seed_votes()
    print("SEEDED COMPLETE")

@seed_commands.command("undo")
def undo():
    undo_users()
    undo_topics()
    undo_comments()
    undo_resources()
    undo_votes()
    print("UNSEEDED")
