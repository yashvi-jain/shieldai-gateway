from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal

from app.models.attack_log import AttackLog

router = APIRouter()

def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

@router.get("/logs")
def get_logs(db: Session = Depends(get_db)):

    logs = db.query(AttackLog).all()

    return logs