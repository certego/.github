FROM python:3.9-alpine AS base

COPY requirements.txt requirements.txt
COPY .cache/pip/ .cache/pip
RUN pip install --compile --no-cache-dir -r requirements.txt