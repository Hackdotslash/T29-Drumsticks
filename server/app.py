from flask import Flask
from config import Config
from routes import main, bcrypt, mongo
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import io, base64, cv2
import numpy as np
import os.path
import time
from cv import *

app = Flask(__name__)
app.config.from_object(Config)
bcrypt.init_app(app)
mongo.init_app(app)
app.register_blueprint(main)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")



@socketio.on('image')
def image(data_image):
    img_test = data_image.split(",")[1]
    img_test = bytes(img_test, 'utf-8')
    # sbuf = io.StringIO()
    # sbuf.write(data_image)
    # decode and convert into image
    while not os.path.isfile("image_12.png"):
        time.sleep(5)
        with open("image_12.png", "wb") as fh:
            fh.write(base64.decodebytes(img_test))

    first_frame=cv2.imread('image_12.png')
    first_frame = cv2.cvtColor(first_frame,cv2.COLOR_BGR2GRAY)
    with open("image_13.png", "wb") as fh:
        fh.write(base64.decodebytes(img_test))
    img = cv2.imread('image_13.png')
    string1 = face_detection(img)
    string2 = subtraction(first_frame,img,True)
    print(string1)
    print(string2)

    cv2.waitKey(100)
    # cv2.destroyAllWindows()

    # pimg = Image.open(b)
    # cv2.imwrite('./image-test2.png', img_test)
    ## converting RGB to BGR, as opencv standards
    # frame = cv2.cvtColor(np.array(pimg), cv2.COLOR_RGB2BGR)
    # frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    # Process the image frame
    # frame = imutils.resize(frame, width=700)
    #frame = cv2.flip(frame, 1)
    imgencode = cv2.imencode('.png', img)[1]

    # base64 encode
    stringData = base64.b64encode(imgencode).decode('utf-8')
    b64_src = 'data:image/jpg;base64,'
    stringData = b64_src + stringData

    # emit the frame back
    emit('response_back', stringData)
socketio.run(app, debug=True)

