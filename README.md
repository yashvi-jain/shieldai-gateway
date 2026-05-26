---
title: shieldAI Gateway
sdk: docker
app_port: 8000
---

# shieldAI Gateway

Full-stack AI-powered security gateway to protect LLM applications from possible prompt injection, SQL injection and jailbreaking attacks.

## Features

- Prompt Injection Detection
- SQL Injection Detection
- Sensitive Data Leak Detection
- Transformer-Based NLP Classification
- Real-time risk scoring
- Threat Analytics Dashboard for the Admin
- Test Chatbot to

## Tech Stack

- Frontend:
  - React, Vite, CSS, Axios
- Backend:
  - FastAPI, Python
- Database:
  - SQLite
- DevOps
  - Vercel(Frontend), Hugging Face Spaces(Backend, ML interface), Docker(Containerization)

View the project here: https://shieldai-gateway.vercel.app/

## Run Backend

cd backend

uvicorn app.main:app --reload

## Run Frontend

cd frontend

npm run dev
