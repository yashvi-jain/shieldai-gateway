from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.routes.scan import router as scan_router

from app.routes.analytics import (
    router as analytics_router
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="shieldAI Gateway"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scan_router, prefix="/api")

app.include_router(analytics_router, prefix="/analytics")

@app.get("/")
def root():

    return {
        "message": "shieldAI Backend Running"
    }