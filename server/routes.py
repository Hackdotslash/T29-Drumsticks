from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo

main = Blueprint('main', __name__)
bcrypt = Bcrypt()
mongo = PyMongo()


@main.route('/')
def home():
	return "API for Online Secure Test Platform"



@main.route('/login', methods=['POST'])
def login():
	data = request.get_json()
	user = mongo.db.users.find_one({"email": data['email']})
	if user and bcrypt.check_password_hash(user['password'], data['password']):
		return jsonify({"msg":"login", "name":user['name'], "email":user['email']})
	else:
		return jsonify({"msg":"error"})



@main.route('/register', methods=['POST'])
def register():
	data = request.get_json()
	found = mongo.db.users.find_one({"email": data['email']})
	if found: return jsonify({"msg": "exists"})
	try:
		hashpass = bcrypt.generate_password_hash(data['password'])
		user = mongo.db.users.insert_one({"name":data['name'], "email": data['email'], "password": hashpass, "tests":[]})
	except:
		return jsonify({"msg": "error"})
	return jsonify({"msg":"registered"})

@main.route('/dashboard')
def dashboard():
	pass

@main.route('/tests/create', methods=['POST'])
def create():
	data = request.get_json()
	user = mongo.db.users.find_one({"email":data['email']})
	tests = user['tests']
	arr={}
	for i in range(len(data)//2):
		arr["q"+str(i+1)] = data['q'+str(i+1)]
		arr["a"+str(i+1)] = data['a'+str(i+1)]
	tests.append(arr)
	mongo.db.users.update_one({"email":data['email']}, { "$set": {"tests": tests}})
	return jsonify({'msg':'posted'})