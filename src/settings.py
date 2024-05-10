class DataBase:
    USER = 'db_user'
    PASSWORD = 'db_user'
    PORT = '5432'
    HOST = '192.168.1.59'
    NAME = 'maindb'
    SCHEMA = 'main'
    URL = f'postgresql://{USER}:{PASSWORD}@{HOST}:{PORT}/{NAME}'