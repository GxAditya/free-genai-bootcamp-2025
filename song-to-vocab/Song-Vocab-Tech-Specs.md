# Tech Specs

## Business Goal
Develop a program to retrieve song lyrics from the internet in a specified language and generate vocabulary for database import.

## Technical Stack
- **FastAPI**: For API development.
- **Ollama Python SDK**: Using Gemma 2B for language processing.
- **Instructor**: For generating structured JSON output.
- **SQLite3**: For database storage.
- **duckduckgo-search**: For web-based lyrics search.

## API Endpoints

### POST /api/agent - GetLyrics

#### Functionality
- Uses the reAct framework to search the internet for multiple versions of song lyrics.
- Extracts and validates the correct lyrics.
- Converts lyrics into vocabulary.

#### Tools Utilized
- `tools/extract_vocabulary.py`: Extracts vocabulary from lyrics.
- `tools/get_page_content.py`: Retrieves content from web pages.
- `tools/search_web.py`: Searches the web for lyrics.

#### Request Parameters
- `message_request` (str): Description of the song and/or artist to fetch lyrics.

#### Response Format
- `lyrics` (str): Retrieved song lyrics.
- `vocabulary` (list): Extracted vocabulary words.