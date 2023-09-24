import cv2
from pytube import YouTube


def get_frames(video_path):

    video_cap = cv2.VideoCapture(video_path)
    fps = video_cap.get(cv2.CAP_PROP_FPS)
    first_frame = video_cap.read()[1]

    # case for empty video
    if first_frame is None:
        return

    frames = []
    frames_count = 1
    while video_cap.grab():
        if frames_count % fps == 0:
            frames.append(video_cap.retrieve()[1])
        frames_count += 1

    return frames


def download_youtube_vid(link):
    youtube_object = YouTube(link)
    youtube_object = youtube_object.streams.get_highest_resolution()
    try:
        youtube_object.download()
    except:
        print("An error has occurred")

    return youtube_object.title + ".mp4"