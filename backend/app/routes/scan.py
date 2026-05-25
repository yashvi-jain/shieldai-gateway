from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schema.schema import ScanRequest

from app.detectors.prompt_injections import (
    detect_prompt_injection
)

from app.detectors.sql_injections import (
    detect_sql_injection
)

from app.detectors.sensitive_data import (
    detect_sensitive_data
)

from app.detectors.risk_engine import (
    calculate_risk
)

from app.ml.inference import classify_prompt

from app.database import SessionLocal

from app.models.attack_log import AttackLog

from app.services.llm_service import query_llm

router = APIRouter()

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

@router.post("/scan")
def scan_prompt(
    request: ScanRequest,
    db: Session = Depends(get_db)
):

    text = request.prompt

    prompt_hits = detect_prompt_injection(text)

    sql_hits = detect_sql_injection(text)

    sensitive_hits = detect_sensitive_data(text)

    ml_result = classify_prompt(text)

    threats = []

    if prompt_hits:
        threats.append("Rule-Based Prompt Injection")

    if sql_hits:
        threats.append("SQL Injection")

    if sensitive_hits:
        threats.append("Sensitive Data Leak")

    if ml_result["is_attack"]:
        threats.append("AI Prompt Injection")

    risk_score, action = calculate_risk(
        prompt_hits,
        sql_hits,
        sensitive_hits,
        ml_result
    )

    log = AttackLog(
        prompt=text,
        threats=", ".join(threats),
        risk_score=risk_score,
        action=action
    )

    db.add(log)

    db.commit()

    if action == "BLOCKED":

        return {

            "status": "blocked",

            #"threats": threats,

            #"risk_score": risk_score,

            "action": action,

            #"ai_confidence":
            #    ml_result["score"],

            "response":
                "Prompt blocked by ShieldAI Gateway"
        }

    llm_response = query_llm(text)

    return {

        "status": "safe",

        #"threats": threats,

        #"risk_score": risk_score,

        "action": action,

        #"ai_confidence":
        #    ml_result["score"],

        "response": llm_response
    }