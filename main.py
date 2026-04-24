import cv2
from ultralytics import YOLO
import easyocr

if __name__ == '__main__':
    # 1. Load your newly trained YOLO model
    # This points directly to the 'best' brain from your training session
    model_path = r'C:\Users\samar\Documents\num-plt-detection-ml-model\runs\detect\ALPR_Project\plate_detector\weights\best.pt'
    model = YOLO(model_path)

    # 2. Initialize the OCR Reader
    # Setting gpu=True will utilize your RTX 3050 for blazing-fast text reading
    reader = easyocr.Reader(['en'], gpu=True)

    # 3. Load the test image
    image_path = r'C:\Users\samar\Documents\num-plt-detection-ml-model\test-img\test_car3.jpg' 
    img = cv2.imread(image_path)

    # 4. Run the plate detection
    results = model.predict(source=img, conf=0.5)

    # 5. Process the results
    for result in results:
        boxes = result.boxes
        for box in boxes:
            # Get the exact X and Y coordinates of the bounding box
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            
            # Crop the license plate out of the main image
            plate_crop = img[y1:y2, x1:x2]
            
            # Pass the cropped image to EasyOCR to extract the text
            ocr_result = reader.readtext(plate_crop)
            
            # If text is found, print it and draw it on the image
            if ocr_result:
                # EasyOCR returns a list; we grab the text from the first detection
                text = ocr_result[0][1]
                print(f"\n--- SUCCESS! Detected Plate Text: {text} ---\n")
                
                # Draw a green box around the plate
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
                # Write the read text above the box
                cv2.putText(img, text, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (36, 255, 12), 2)

    # 6. Display the final image on your screen
    cv2.imshow("ALPR System", img)
    cv2.waitKey(0) # Press any key to close the window
    cv2.destroyAllWindows()