import datetime
import os
from pathlib import Path

import pandas as pd
import torch
import numpy as np
import cv2

from model.obstacle_detection.src.yolov5_detection import DetectionModel
from model.railway_segmentation.src.data import get_transforms, SegmentationDataset
from model.railway_segmentation.src.inference import get_batch_predictions, upscale_mask, \
    convert_bool_mask_to_submission
from model.utils import get_frames


class TrainAlertSystem:
    transforms_960x544 = get_transforms(image_width=960, image_height=544, add_augmentations=False)

    def __init__(self, railway_seg_model: str):
        self.railway_seg_model = [torch.load(railway_seg_model, map_location=torch.device('cpu'))]
        self.detection_model = DetectionModel()
        self.device = torch.device('cpu')

    def _add_risk_zone_mask(self, mask: np.ndarray):
        h, w = mask.shape[:2]

        bottom_zone = [slice(int(0.75 * h), h), slice(0, w)]
        middle_zone = [slice(int(0.50 * h), int(0.75 * h)), slice(0, w)]
        upper_zone = [slice(int(0.45 * h), int(0.50 * h)), slice(0, w)]

        kernel = np.ones((5, 5), np.uint8)

        mask[bottom_zone[0], bottom_zone[1]] = cv2.erode(mask[bottom_zone[0], bottom_zone[1], :], kernel,
                                                         iterations=100)
        mask[middle_zone[0], middle_zone[1]] = cv2.erode(mask[middle_zone[0], middle_zone[1], :], kernel,
                                                         iterations=25)
        mask[upper_zone[0], upper_zone[1]] = cv2.erode(mask[upper_zone[0], upper_zone[1], :], kernel, iterations=1)

        return mask

    def predict_images(self, images):

        original_height, original_width = images[0].shape[:2]
        seg_masks = []
        for image in images:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image = image.astype('float32')
            image /= 255.

            image_960x544 = self.transforms_960x544(image=image)['image'].unsqueeze(0)
            mask_pred = get_batch_predictions(self.railway_seg_model, image_960x544, self.device)
            mask_pred = mask_pred.squeeze(0).permute(1, 2, 0).cpu().numpy()
            mask_pred = upscale_mask(mask_pred, original_height, original_width)
            mask = convert_bool_mask_to_submission(mask_pred, threshold=0.5)
            mask = self._add_risk_zone_mask(mask)
            mask = mask[:, :, 1] != 255

            seg_masks.append(mask)

        det_masks = self.detection_model.get_det_masks(images)

        output = []
        for det_m, seg_m in zip(seg_masks, det_masks):
            sum_mask = det_m + seg_m
            res = sum_mask[sum_mask > 1]
            output.append(int(len(res) > 0))

        return np.array(output)

    def get_video_results(self, video_path):
        frames = get_frames(video_path)
        return self.predict_images(frames)

    def get_submission(self, test_video_folder: Path, output_path: Path, threshold: int = 2):
        def timestamp2submission_time(time: datetime.timedelta):
            return ":".join(str(time).split(":")[1:])

        submission_dict = {"filename": [], "cases": [], "timestamps": []}
        for file in sorted(test_video_folder.glob("*.mp4")):
            predictions = self.get_video_results(str(file))
            cases_occur = np.where(predictions == 1)[0]
            cases = []
            for index in range(len(cases_occur) - 1):
                if abs(cases_occur[index] - cases_occur[index + 1]) > threshold:
                    cases.append(cases_occur[index + 1].item())
            cases = [timestamp2submission_time(datetime.timedelta(seconds=case)) for case in cases]
            submission_dict["filename"].append(file.name)
            submission_dict["cases"].append(len(cases))
            submission_dict["timestamps"].append(cases)

        submission_df = pd.DataFrame.from_dict(submission_dict)
        submission_df.to_csv(os.path.join(output_path, "submission.csv"), sep=";", index=False)


alert_sys = TrainAlertSystem(railway_seg_model=r"C:\Users\Professional\PycharmProjects\hackaton_ai\hacks-ai-safe-path\model\railway_segmentation\weights\efficientnetb4.pth.tar")
path = Path(r"C:\Users\Professional\PycharmProjects\hackaton_ai\hacks-ai-safe-path\data")
out = Path(r"C:\Users\Professional\PycharmProjects\hackaton_ai\hacks-ai-safe-path\submissions")
alert_sys.get_submission(test_video_folder=path, output_path=out)
