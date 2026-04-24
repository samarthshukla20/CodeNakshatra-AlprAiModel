from ultralytics import YOLO

if __name__ == '__main__':
    # Load a pre-trained YOLOv8 Nano model
    model = YOLO('yolov8n.pt')

    # Start the training process
    results = model.train(
        data=r'C:\Users\samar\Documents\num-plt-detection-ml-model\dataset.yaml', 
        epochs=50,           
        imgsz=640,           
        batch=16,            
        device='0',          
        project='ALPR_Project', 
        name='plate_detector'
    )