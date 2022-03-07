FROM python:3.9-slim-buster
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

## Specific to Kra
WORKDIR /home/krafthack2022

COPY ./requirements.txt .
RUN pip install --upgrade pip

RUN pip install -r /home/krafthack2022/requirements.txt

COPY ./src/   ./

RUN ls -la .
RUN ls -la ./data
CMD python3 ./main.py
