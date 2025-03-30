import sqlite3

def init_db():
    conn = sqlite3.connect('songs.db')
    c = conn.cursor()
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            artist TEXT,
            lyrics TEXT,
            language TEXT
        )
    ''')
    
    c.execute('''
        CREATE TABLE IF NOT EXISTS vocabulary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            word TEXT,
            song_id INTEGER,
            FOREIGN KEY (song_id) REFERENCES songs (id)
        )
    ''')
    
    conn.commit()
    conn.close()
