from fastapi import FastAPI, BackgroundTasks
import numpy as np
import time
import subprocess
import json

app = FastAPI()
# Указать нужный путь до файла запуска бэка
backend_path = 'backend_video_processing.py'
TIMEOUT_SECONDS = 180 

# Функция для обработки видео и возврата np.array
def process_video(video_url: str) -> np.array:
# Вызываем скрипт бэкэнда для обработки видео
    command = f"python {backend_path} {video_url}"
    process = subprocess.Popen(command, stdout=subprocess.PIPE, shell=True)
    stdout, _ = process.communicate()

    # Предполагаем, что скрипт возвращает np.array в формате JSON
    processed_video_data = json.loads(stdout.decode('utf-8')) 
    return processed_video_data

# Эндпоинт для обработки видео
@app.post("/process_video/")
async def process_video_endpoint(video_url: str, background_tasks: BackgroundTasks):
    # Запускаем обработку видео в фоновом режиме
    # Обработка видео может занять долгое время, используем TIMEOUT_SECONDS 
    time.sleep(TIMEOUT_SECONDS)
    background_tasks.add_task(process_video, video_url)
    return {"message": "Video processing started."}
