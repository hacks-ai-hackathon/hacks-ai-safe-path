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

    def __init__(self):
        self.railway_seg_model = [torch.load(rf'hacks-ai-safe-path\model\railway_segmentation\weights\efficientnetb4.pth.tar',
                                             map_location=torch.device('cpu'))]
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
        print()
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

        return output


    def get_video_results(self, video_path):
        frames = get_frames(video_path)
        return self.predict_images(frames)