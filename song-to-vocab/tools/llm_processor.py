from typing import List, Dict
import instructor
from pydantic import BaseModel
import ollama
import json
import asyncio
from tenacity import retry, stop_after_attempt, wait_exponential

class SongInfo(BaseModel):
    title: str
    artist: str
    language: str

class LyricsAnalysis(BaseModel):
    song_info: SongInfo
    vocabulary: List[str]
    difficulty_level: str
    reasoning: List[Dict[str, str]]  # Store the reACT process steps

class LLMProcessor:
    def __init__(self):
        self.client = instructor.patch(ollama)
    
    @retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=4, max=10))
    async def _try_llm_call(self, prompt: str, response_model=None):
        try:
            if response_model:
                return await self.client.chat(
                    model="gemma:2b",
                    messages=[{"role": "user", "content": prompt}],
                    response_model=response_model,
                    timeout=30
                )
            return await self.client.chat(
                model="gemma:2b",
                messages=[{"role": "user", "content": prompt}],
                timeout=30
            )
        except Exception as e:
            print(f"LLM call failed: {str(e)}")
            raise

    async def analyze_lyrics(self, lyrics: str) -> LyricsAnalysis:
        react_prompt = f"""
        Follow the reACT framework to analyze these Hindi lyrics step by step:
        
        TASK: Analyze Hindi song lyrics and provide information in both English and Hindi where appropriate.
        LYRICS: {lyrics}

        Follow this format for each step:
        Thought: What are you thinking about doing?
        Action: What specific action will you take?
        Observation: What did you observe from the action?
        
        Required steps:
        1. Identify song metadata:
           - Title (in both Hindi and English transliteration)
           - Artist name (in both Hindi and English)
        2. Analyze language complexity considering Hindi vocabulary
        3. Extract key Hindi vocabulary words with English meanings
        4. Determine difficulty level for Hindi language learners
        
        Note: Ensure vocabulary includes:
        - Word in Hindi script
        - Transliteration in English
        - English meaning
        """
        
        try:
            reasoning_response = await self._try_llm_call(react_prompt)
            reasoning_steps = self._parse_react_steps(reasoning_response.content)
            
            final_prompt = f"""
            Based on the analysis:
            {reasoning_response.content}
            
            Provide a structured response with:
            - Song title (Hindi script and English transliteration)
            - Artist name (Hindi script and English)
            - Language (pure Hindi or Hinglish)
            - Key Hindi vocabulary words with:
              * Hindi script
              * English transliteration
              * English meaning
            - Overall difficulty level for Hindi language learners
            """
            
            analysis = await self._try_llm_call(final_prompt, LyricsAnalysis)
            analysis.reasoning = reasoning_steps
            
            return analysis
        except Exception as e:
            raise HTTPException(
                status_code=500,
                detail=f"Failed to analyze lyrics: {str(e)}"
            )
    
    def _parse_react_steps(self, response: str) -> List[Dict[str, str]]:
        steps = []
        current_step = {}
        
        for line in response.split('\n'):
            line = line.strip()
            if line.startswith('Thought:'):
                if current_step:
                    steps.append(current_step)
                current_step = {'thought': line[8:].strip()}
            elif line.startswith('Action:'):
                current_step['action'] = line[7:].strip()
            elif line.startswith('Observation:'):
                current_step['observation'] = line[12:].strip()
                
        if current_step:
            steps.append(current_step)
            
        return steps
