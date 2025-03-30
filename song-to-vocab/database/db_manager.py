import sqlite3
from contextlib import contextmanager
from typing import Generator

class DatabaseManager:
    def __init__(self, db_path: str = 'songs.db'):
        self.db_path = db_path

    @contextmanager
    def get_connection(self) -> Generator[sqlite3.Connection, None, None]:
        conn = sqlite3.connect(self.db_path)
        try:
            yield conn
        finally:
            conn.close()

    def store_song_analysis(self, lyrics: str, analysis: dict) -> int:
        with self.get_connection() as conn:
            cursor = conn.cursor()
            try:
                cursor.execute("""
                    INSERT INTO songs (title, artist, lyrics, language)
                    VALUES (?, ?, ?, ?)
                """, (
                    analysis.song_info.title,
                    analysis.song_info.artist,
                    lyrics,
                    analysis.song_info.language
                ))
                
                song_id = cursor.lastrowid
                
                for word in analysis.vocabulary:
                    cursor.execute("""
                        INSERT INTO vocabulary (word, song_id)
                        VALUES (?, ?)
                    """, (word, song_id))
                
                conn.commit()
                return song_id
            except Exception as e:
                conn.rollback()
                raise
