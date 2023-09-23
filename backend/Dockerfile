# 
FROM python:3.9-alpine

# 
WORKDIR /backend

# 
COPY ./requirements.txt /backend/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

RUN export PYTHONPATH=$PWD

# 
COPY ./ /backend

# 
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
