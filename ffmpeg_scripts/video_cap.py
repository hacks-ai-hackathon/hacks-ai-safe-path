from __future__ import annotations

from asyncio.log import logger
from pathlib import Path
from typing import Generator

import cv2
import numpy as np

from ffmpeg_scripts.model.resolution import Resolution
from ffmpeg_scripts.video_load_manager import VideoSaveLoadManager


class VideoCap:
    def __init__(self, video_name: str | Path, filter_fps: int):
        self.frame_cap: Generator = self._create_frame_cap_generator(video_name, filter_fps)

    def read(self) -> tuple[bool, np.ndarray | None]:
        try:
            return True, self.frame_cap.__next__()
        except StopIteration:
            return False, None

    @staticmethod
    def _create_frame_cap_generator(video_name: str | Path, filter_fps: int) -> Generator:
        frames_count = 0
        try:
            width, height = VideoSaveLoadManager.get_video_resolution(video_name)
        except StopIteration:
            logger.warning(f'Error while decoding - {video_name}, probably, it is a broken file')
            raise RuntimeError(f'Broken video - video_name')
        read_process = VideoSaveLoadManager.create_read_process(video_name, filter_fps)
        while True:
            frames_count += 1
            raw_frame = VideoSaveLoadManager.read_frame(read_process, Resolution(width, height))
            if raw_frame is None:
                break
            yield raw_frame


