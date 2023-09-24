import os.path
from sys import stdout

from fastapi import FastAPI, BackgroundTasks
import numpy as np
import time
import subprocess
import json

from model.train_alert_system import TrainAlertSystem
from model.utils import download_youtube_vid

app = FastAPI()
# Указать нужный путь до файла запуска бэка
backend_path = 'backend_video_processing.py'
TIMEOUT_SECONDS = 180



# Функция для обработки видео и возврата np.array
def process_video(video_url: str) -> np.array:
    alert_sys = TrainAlertSystem(railway_seg_model=os.path.join(os.getcwd(), "model", "railway_segmentation", "weights", "efficientnetb4.pth.tar"))
    video_name = download_youtube_vid(video_url)
    processed_video_data = alert_sys.get_video_results(video_name)

    # Предполагаем, что скрипт возвращает np.array в формате JSON
    processed_video_data = json.loads(processed_video_data.decode('utf-8'))
    return processed_video_data


# Эндпоинт для обработки видео
@app.post("/process_video/")
async def process_video_endpoint(video_url: str, background_tasks: BackgroundTasks):
    # Запускаем обработку видео в фоновом режиме
    # Обработка видео может занять долгое время, используем TIMEOUT_SECONDS 
    time.sleep(TIMEOUT_SECONDS)
    background_tasks.add_task(process_video, video_url)
    return {"message": "Video processing started."}
