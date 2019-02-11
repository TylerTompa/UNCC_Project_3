from flask import Flask, request, jsonify, render_template
# from sklearn.externals import joblib

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)