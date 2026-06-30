---
title: shieldAI Gateway
sdk: docker
app_port: 8000
---

# shieldAI Gateway

Full-stack AI-powered security gateway to protect LLM applications from possible prompt injection, SQL injection and jailbreaking attacks.
Use our test chatbot for testing with an actual LLM API.

## Features
- Prompt Injection Detection
- SQL Injection Detection
- Sensitive Data Leak Detection
- Transformer-Based NLP Classification
- Real-time risk scoring
- Threat Analytics Dashboard for the Admin
- Frontend - AI Chatbot to test the working of the gateway

## Tech Stack
- Frontend:
  - React, Vite, CSS, Axios
- Backend:
  - FastAPI, Python
- Database:
  - PostgreSQL
- DevOps
  - Vercel(Frontend), Hugging Face Spaces(Backend, ML interface), Supabase(Database), Docker(Containerization)

## Run Frontend
cd frontend
npm run dev

## Run Backend
cd backend
uvicorn app.main:app --reload

## View the project here: https://shieldai-gateway.vercel.app/

## Images:
<img width="1350" height="600" alt="image" src="https://github.com/user-attachments/assets/848750a1-23da-4294-bba3-bba41913adf8" />
<img width="1352" height="596" alt="image" src="https://github.com/user-attachments/assets/1db70157-6a96-408a-8714-130000f7c1cb" />
<img width="1350" height="597" alt="image" src="https://github.com/user-attachments/assets/62ab048f-d97b-4c13-8e68-1e19b385c63c" />
<img width="1350" height="599" alt="image" src="https://github.com/user-attachments/assets/4e5a51c2-728e-45fb-ad7b-740e0f810168" />
<img width="1350" height="154" alt="image" src="https://github.com/user-attachments/assets/92d2e187-7152-41b5-aeb1-1d514b34e683" />
