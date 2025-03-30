from duckduckgo_search import ddg
from typing import List
import re

def translate_common_terms(query: str) -> str:
    """Replace common English terms with Hindi equivalents for better search"""
    replacements = {
        "lyrics": "गाने के बोल",
        "song": "गाना",
        "by": "द्वारा",
        "from movie": "फिल्म से",
        "translation": "अनुवाद"
    }
    
    enhanced_query = query
    for eng, hindi in replacements.items():
        enhanced_query = f"{enhanced_query} {hindi}"
    return enhanced_query

def search_lyrics(query: str) -> List[str]:
    """Search for Hindi lyrics using English input"""
    # Clean and enhance the query
    enhanced_query = translate_common_terms(query)
    search_query = f"{query} {enhanced_query} hindi lyrics"
    
    results = ddg(search_query, max_results=5)
    
    # Prioritize known Hindi lyrics websites
    hindi_lyrics_domains = [
        "lyricsindia.net",
        "hindilyrics.net",
        "bollywoodlyrics.com",
        "lyricsmint.com",
        "glamsham.com",
        "hindilyrics.in",
        "filmylyrics.com",
        "hindilyricsbox.com"
    ]
    
    filtered_results = [
        result["href"] for result in results 
        if any(domain in result["href"].lower() for domain in hindi_lyrics_domains)
    ]
    
    return filtered_results or [result["href"] for result in results[:2]]
