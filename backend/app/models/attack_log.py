from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database import Base

class AttackLog(Base):
    __tablename__ = "attack_logs"

    id = Column(Integer, primary_key=True, index=True)

    prompt = Column(String)

    threats = Column(String)

    risk_score = Column(Integer)

    action = Column(String)

    created_at = Column(DateTime, default=datetime.utcnow)