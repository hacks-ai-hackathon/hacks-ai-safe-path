from typing import List

import numpy as np
import torch

class DetectionModel:

    def __init__(self, model_name: str = "yolov5m", class_names: List[str] = ["person"], confidence: float = 0.35):
        self.model = torch.hub.load(f'ultralytics/{model_name[:-1]}', model_name)
        self.class_names = class_names
        self.confidence = confidence

    def predict(self, imgs):
        result = self.model(imgs)
        result = result.pandas().xyxy
        for (id, results_df) in enumerate(result):
            results_df = results_df[results_df["name"].isin(self.class_names)]
            results_df = results_df[results_df["confidence"] >= self.confidence]

            results_df["xmin"] = results_df["xmin"].astype('int')
            results_df["xmax"] = results_df["xmax"].astype('int')
            results_df["ymin"] = results_df["ymin"].astype('int')
            results_df["ymax"] = results_df["ymax"].astype('int')

            result[id] = results_df

        return result

    def get_det_masks(self, imgs):

        h, w = imgs[0].shape[:2]
        result = self.predict(imgs)

        det_masks = []

        for result_per_image_df in result:
            cur_mask = np.zeros((h, w))

            for _, row in result_per_image_df.iterrows():
                height = slice(row['ymin'], row['ymax'])
                width = slice(row['xmin'], row['xmax'])
                cur_mask[height, width] = np.ones((row['ymax'] - row['ymin'],
                                                   row['xmax'] - row['xmin']))

            det_masks.append(cur_mask)

        return det_masks
