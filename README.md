# 🚗 Automatic License Plate Recognition (ALPR) System

An end-to-end Machine Learning pipeline that detects vehicle license plates and extracts their text using a custom-trained object detection model and Optical Character Recognition (OCR).

## 🛠️ Tech Stack
* **Language:** Python
* **Object Detection:** YOLOv8 (Ultralytics)
* **OCR:** EasyOCR (PyTorch-based)
* **Image Processing:** OpenCV

## ✨ Features
* **Custom Object Detection:** Utilizes a YOLOv8 Nano model (`best.pt`) custom-trained on a dataset of 1,700 images to specifically identify bounding boxes for license plates.
* **High-Accuracy OCR:** Implements EasyOCR to extract alphanumeric text from the cropped license plate regions.
* **Dynamic Pathing:** Built with Python's `os` module for true cross-platform portability.
* **Hardware Acceleration:** Supports NVIDIA CUDA for blazing-fast inference and training.

## 📂 Project Structure
```text
alpr-ml-model/
├── test-img/                 # Folder containing test images (e.g., test_car.jpg)
├── main.py                   # The inference script (Detects & Reads)
├── train.py                  # The training script used to build the model
├── test.py                   # To check if you GPU is being recognized or not
├── dataset.yaml              # Configuration file for YOLOv8 training
├── .gitignore                # Ignores large datasets and cache files
├── runs/detect/ALPR_Project/ # Contains results of the trained model and the main trained model
└── README.md
```

# 🚀 Getting Started

## 1. Prerequisites
Ensure you have Python 3.8+ installed. If you have an NVIDIA GPU, it is highly recommended to install the CUDA-enabled version of PyTorch for significantly faster processing.

## 2. Installation
Clone this repository and install the required computer vision libraries:
```bash
git clone https://github.com/samarthshukla20/alpr-ml-model.git

cd alpr-ml-model

pip install ultralytics easyocr opencv-python
```

## 3. Usage: Running Inference
To test the model on a new image, place your picture inside the test-img folder and update the filename in (`main.py`). Then, run the script:
```bash
python main.py
```
*Output:* The script will print the extracted text to the terminal and display (or save) the image with a bounding box drawn around the detected license plate.

## 4. Usage: Retraining the Model
If you wish to train the model on your own custom dataset:
1)- Download a YOLO-formatted dataset (images and (`.txt`) bounding box labels).
2)- Update (`dataset.yaml`) with the paths to your new data.
3)- Run the training script:
```bash
python train.py
```