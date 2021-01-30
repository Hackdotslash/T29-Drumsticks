from flask import Flask
from config import Config
from routes import main, bcrypt, mongo

app = Flask(__name__)
app.config.from_object(Config)
bcrypt.init_app(app)
mongo.init_app(app)
app.register_blueprint(main)




if __name__ == "__main__":
	app.run(debug=True, port=8000)