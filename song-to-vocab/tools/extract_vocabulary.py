import re

def from_lyrics(lyrics: str):
    words = re.findall(r'\b\w+\b', lyrics.lower())
    unique_words = sorted(set(words))
    return unique_words
