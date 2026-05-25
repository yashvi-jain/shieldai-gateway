from pydantic import BaseModel

class ScanRequest(BaseModel):
    prompt: str

class ScanResponse(BaseModel):
    threats: list
    risk_score: int
    action: str