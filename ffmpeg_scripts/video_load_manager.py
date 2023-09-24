from __future__ import annotations

import subprocess
from pathlib import Path

import ffmpeg
import numpy as np

from ffmpeg_scripts.model.resolution import Resolution


class VideoSaveLoadManager:
    @staticmethod
    def get_video_resolution(filename: str | Path) -> tuple:
        probe = ffmpeg.probe(filename)
        video_info = next(s for s in probe['streams'] if s['codec_type'] == 'video')
        width = int(video_info['width'])
        height = int(video_info['height'])
        return width, height

    @staticmethod
    def create_read_process(in_filename: str | Path, filter_fps: int,
                            output_format: str = 'rawvideo') -> subprocess.Popen:
        args = (
            ffmpeg
            .input(in_filename)
            .filter('fps', fps=str(filter_fps), round='up')
            .output('pipe:', format=output_format, pix_fmt='rgb24')
            .global_args('-loglevel', 'fatal')
            .compile()
        )
        return subprocess.Popen(args, stdout=subprocess.PIPE)


    @staticmethod
    def read_frame(read_process: subprocess.Popen, resolution: Resolution) -> np.ndarray:
        width = resolution.width
        height = resolution.height
        # RGB24 == 3 bytes per pixel
        frame_size = width * height * 3
        in_bytes = read_process.stdout.read(frame_size)
        if len(in_bytes) == 0:
            frame = None
        else:
            assert len(in_bytes) == frame_size
            frame = (
                np
                .frombuffer(in_bytes, np.uint8)
                .reshape([height, width, 3])
            )
        return frame
