import requests
from bs4 import BeautifulSoup
import re

def clean_lyrics(text: str) -> str:
    # Remove square brackets and their contents
    text = re.sub(r'\[.*?\]', '', text)
    # Remove parentheses and their contents
    text = re.sub(r'\(.*?\)', '', text)
    # Remove English translations typically in brackets
    text = re.sub(r'\{.*?\}', '', text)
    # Remove extra whitespace
    text = ' '.join(text.split())
    return text

def extract_lyrics(urls: list):
    hindi_lyrics_selectors = [
        "div.lyrics-content",
        "div.entry-content",
        "div.lyric-content",
        "div.song-lyrics",
        "div[class*='lyrics']",
        "pre.lyrics",
        "#lyrics_text",
        ".hindi_lyrics"
    ]
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
    
    for url in urls:
        try:
            response = requests.get(url, timeout=10, headers=headers)
            response.encoding = 'utf-8'  # Ensure proper encoding for Hindi text
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, "html.parser")
                
                for selector in hindi_lyrics_selectors:
                    lyrics_div = soup.select_one(selector)
                    if lyrics_div:
                        lyrics = clean_lyrics(lyrics_div.get_text())
                        # Verify the text contains Devanagari script
                        if re.search(r'[\u0900-\u097F]', lyrics) and len(lyrics) > 100:
                            return lyrics
                            
        except requests.RequestException:
            continue
            
    return "Lyrics not found."
