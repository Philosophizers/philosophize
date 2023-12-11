# # import os


# # class Config:
# #     SECRET_KEY = os.environ.get('SECRET_KEY')
# #     SQLALCHEMY_TRACK_MODIFICATIONS = False
# #     # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
# #     # (only 'postgresql') but heroku's postgres add-on automatically sets the
# #     # url in the hidden config vars to start with postgres.
# #     # so the connection uri must be updated here (for production)
# #     SQLALCHEMY_DATABASE_URI = os.environ.get(
# #         'DATABASE_URL').replace('postgres://', 'postgresql://')
# #     SQLALCHEMY_ECHO = True


# import os
# from dotenv import load_dotenv

# load_dotenv()

# class Config:
#     SECRET_KEY = os.environ.get('SECRET_KEY') or 'india1234'
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
#     SQLALCHEMY_ECHO = True
#     DATABASE_URL = os.environ.get('DATABASE_URL') or 'sqlite:///dev.db'
#     SQLALCHEMY_DATABASE_URI = DATABASE_URL
#     if SQLALCHEMY_DATABASE_URI and SQLALCHEMY_DATABASE_URI.startswith('postgres://'):
#         SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace('postgres://', 'postgresql://', 1)


# class DevelopmentConfig(Config):
#     DEBUG = True
#     SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or 'sqlite:///dev.db'

# class ProductionConfig(Config):
#     DEBUG = False
#     SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
#     if SQLALCHEMY_DATABASE_URI.startswith('postgres://'):
#         SQLALCHEMY_DATABASE_URI = SQLALCHEMY_DATABASE_URI.replace('postgres://', 'postgresql://', 1)
#     # Additional production-specific settings like logging

# class TestingConfig(Config):
#     TESTING = True
#     SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'  # or a path to a test database
#     # Additional testing-specific settings

# # You might have a dict to easily fetch the config class based on an environment variable
# config = {
#     'development': DevelopmentConfig,
#     'production': ProductionConfig,
#     'testing': TestingConfig,
#     'default': DevelopmentConfig
# }


import os


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_ECHO = True
