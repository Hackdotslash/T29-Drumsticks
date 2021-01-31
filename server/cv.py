import os
import cv2
import numpy as np
import time

def subtraction(first_frame,img,cond1=False):
    white=0
    #resized = cv2.resize(img, (500,500))
    gray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray,(21,21),0)
    diff_frame = cv2.absdiff(gray,first_frame)
    thresh_frame = cv2.threshold(diff_frame,70,255,cv2.THRESH_BINARY)[1]
    cv2.imwrite('sample.png',thresh_frame)
    shape_x=np.shape(thresh_frame)[0]
    shape_y=np.shape(thresh_frame)[1]
    for i in range(int(.3*shape_x),int(.7*shape_x)):
        for j in range(shape_y):
            if thresh_frame[i][j]==255:
                white+=1
    for i in range(shape_x):
        for j in range(int(0.3*shape_y),int(0.7*shape_y)):
            if thresh_frame[i][j]==255:
                white+=1
    if cond1:
        time.sleep(5)
        if white>=20000:
            return "good boi"
        else:
            return "bc neeche kr"
    else:
        if white>=20000:
            return "kahan bhaag gya bc"

def face_detection(image):
    base_dir = os.path.dirname(__file__)
    prototxt_path = os.path.join(base_dir + '\model_data\deploy.prototxt')
    caffemodel_path = os.path.join(base_dir + '\model_data\weights.caffemodel')

    # Read the model
    model = cv2.dnn.readNetFromCaffe(prototxt_path, caffemodel_path)
    (h, w) = image.shape[:2]
    blob = cv2.dnn.blobFromImage(cv2.resize(image, (300, 300)), 1.0, (300, 300), (104.0, 177.0, 123.0))
    model.setInput(blob)
    detections = model.forward()
    var = False
    for i in range(0, detections.shape[2]):
        var = True
        #box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
        #(startX, startY, endX, endY) = box.astype("int")

        confidence = detections[0, 0, i, 2]

        # If confidence > 0.5, show box around face
        if (confidence > 0.25):
            return "brown munda"
        else:
            return "mundi upr kr lowdu"
    if var==False:
        return "mundi upr kr lowdu"
