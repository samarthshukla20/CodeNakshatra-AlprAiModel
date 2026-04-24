import cv2
import numpy as np
from fastapi import FastAPI, UploadFile, File
from ultralytics import YOLO
import easyocr
import base64

app = FastAPI()

# Load model using the path from your main.py
model = YOLO(r'runs/detect/ALPR_Project/plate_detector/weights/best.pt')
# Use gpu=True as verified in your test.py
reader = easyocr.Reader(['en'], gpu=True)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read image
    contents = await file.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    results = model.predict(source=img, conf=0.5)
    detections = []

    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            plate_crop = img[y1:y2, x1:x2]
            
            ocr_result = reader.readtext(plate_crop)
            text = ocr_result[0][1] if ocr_result else "Unknown"
            
            # Draw on image for the frontend display
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(img, text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)
            
            detections.append({"plate": text, "confidence": float(box.conf[0])})

    # Encode processed image to base64
    _, buffer = cv2.imencode('.jpg', img)
    img_base64 = base64.b64encode(buffer).decode('utf-8')

    return {"image": img_base64, "results": detections}