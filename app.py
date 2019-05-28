from flask import Flask, render_template, request
from api.controller import exec_command
import json

app = Flask(__name__)

@app.route("/")
def root():
    return render_template("index.html")

@app.route("/issue", methods=['POST'])
def issue():
    print("Running command...")
    data = json.loads(request.data.decode('utf-8'))
    out = exec_command(data['command'])
    print(out)
    return out