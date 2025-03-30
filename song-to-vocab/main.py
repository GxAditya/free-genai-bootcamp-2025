from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import re
from tools import search_web, get_page_content, extract_vocabulary, llm_processor
from database.schema import init_db
from database.db_manager import DatabaseManager

app = FastAPI()
llm = llm_processor.LLMProcessor()
db = DatabaseManager()

class MessageRequest(BaseModel):
    message_request: str = Field(
        ..., 
        min_length=3, 
        max_length=200,
        regex="^[A-Za-z0-9 .,'-]+$"  # Only allow English characters
    )
    language: str = Field(default="hi", pattern="^(hi|hindi)$")

    class Config:
        schema_extra = {
            "example": {
                "message_request": "Tum Hi Ho by Arijit Singh",
                "language": "hi"
            }
        }

@app.on_event("startup")
async def startup_event():
    init_db()

@app.post("/api/agent")
async def get_lyrics(request: MessageRequest):
    try:
        if not re.match("^[A-Za-z0-9 .,'-]+$", request.message_request):
            raise HTTPException(
                status_code=400, 
                detail="Please enter the song name and artist in English only"
            )
        
        if request.language.lower() not in ["hi", "hindi"]:
            raise HTTPException(status_code=400, detail="Only Hindi lyrics are supported")
            
        # Search for lyrics
        search_results = search_web.search_lyrics(request.message_request)
        if not search_results:
            raise HTTPException(status_code=404, detail="No lyrics found")
        
        lyrics = get_page_content.extract_lyrics(search_results)
        if lyrics == "Lyrics not found.":
            raise HTTPException(status_code=404, detail="Could not extract lyrics")
        
        analysis = await llm.analyze_lyrics(lyrics)
        
        # Store in database using the manager
        song_id = db.store_song_analysis(lyrics, analysis)
        
        return {
            "lyrics": lyrics,
            "analysis": analysis.dict(),
            "song_id": song_id,
            "reasoning_process": analysis.reasoning
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {str(e)}"
        )
