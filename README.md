# 🚗 Automatic License Plate Recognition (ALPR) System

An end-to-end Machine Learning pipeline that detects vehicle license plates and extracts their text using a custom-trained object detection model and Optical Character Recognition (OCR).

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, Tailwind CSS v4, Framer Motion
* **Backend:** FastAPI, Python, Uvicorn
* **Object Detection:** YOLOv8 Nano (Ultralytics)
* **OCR:** EasyOCR (PyTorch-based)
* **Image Processing:** OpenCV

## ✨ Features
* **Interactive Web UI:** A sleek, modern React dashboard built with Tailwind v4 and Framer Motion for a seamless user experience.
* **Custom Object Detection:** Utilizes a custom-trained YOLOv8 Nano model (`best.pt`) achieving ~0.97 mAP@50 to pinpoint license plate bounding boxes.
* **High-Accuracy OCR:** Implements GPU-accelerated EasyOCR to extract alphanumeric text from cropped plate regions in real-time.
* **REST API:** Fast and robust backend built with FastAPI to handle image uploads and inference routing.
* **Hardware Acceleration:** Native support for NVIDIA CUDA (RTX Series) for blazing-fast edge inference.

## 📂 Project Structure
```text
alpr-ml-model/
├── frontend/                 # Vite/React UI files (Tailwind v4, Framer Motion)
├── backend/                  # FastAPI server and ML pipeline
│   ├── main.py               # API endpoints and Inference logic
│   ├── requirements.txt      # Python dependencies
│   └── runs/.../best.pt      # The trained YOLOv8 model weights
├── test-img/                 # Sample images for quick testing
└── README.md
```

# 🚀 Getting Started

## -- Prerequisites --
Ensure you have Python 3.8+ installed. If you have an NVIDIA GPU, it is highly recommended to install the CUDA-enabled version of PyTorch for significantly faster processing.

## 1. Install the repository
Install the repository in your desired location by using the following git clone command:
```bash
git clone https://github.com/samarthshukla20/CodeNakshatra-AlprAiModel.git
```

## 2. Start the Backend API
Ensure you have Python 3.8+ installed. Navigate to the ```backend``` folder, install the required packages, and start the server:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## 3. Launch the Frontend UI
Open a new terminal window, navigate to the ```frontend``` folder, install the Node packages, and start the Vite development server:
```bash
cd frontend
npm install
npm run dev
```

## 4. Test the Pipeline
Open the frontend URL in your browser. Scroll down to the Predictor section and drag and drop any vehicle image (feel free to use the samples provided in the ```test-img/``` folder) into the upload zone to see the real-time YOLOv8 detection and EasyOCR extraction!
