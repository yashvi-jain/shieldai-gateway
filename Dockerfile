FROM python:3.9

WORKDIR /code

COPY . .

RUN pip install --no-cache-dir --upgrade -r backend/requirements.txt

ENV PYTHONPATH=/code

CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]