# Hacks AI 2023: Проект команды "Двоеточие скобочка"
 <a href="https://github.com/itmo-bootcamp/itmo-bootcamp-2023/blob/master/LICENSE">![GitHub license](https://img.shields.io/github/license/hacks-ai-hackathon/hacks-ai-safe-path?color=purple)</a>
### Live-демо - https://hacks-ai.kladnitsky.ru/
<br>

## Стек технологий
### Frontend: React, Typescript, Vite, Mantine UI
### Backend: Python, FastAPI
### ML & CV: Yola, PAN, EfficientNet, OpenCV, ffmpeg
### DevOps: Docker, Registy, Github Actions
<br>

## Frontend
Приложение представляет собой Single Page Application, доступ к которому осуществляется через Nginx. Для развертывания на своей локальной машине можно воспользоваться следующими командами:
```
cd frontend
npm i
npm run dev
```

Также приложение собирается в Docker-образ, доступный для скачивания по адресу:
https://hub.docker.com/repository/docker/danyakladnitsky/hacks-ai-2023.frontend

Для развертывания фронтенда можно воспользоваться более удобной командой, если на целевой машине установлен Docker, порт 80:
```
docker compose -f docker-compose.frontend.yml up --build
```


<br>


## CI/CD
В ходе разработки приложения был настроен процесс непрерывной поставки кода на два сервера. Один для обслуживания запросов к фронтенд-части, другой - для развертывания CV-сервисов и API Gateway-сервиса, который также доступен в Docker-регистре:
https://hub.docker.com/repository/docker/danyakladnitsky/hacks-ai-2023.backend

