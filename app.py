"""
CardioPulse - Smart Heart Disease Risk Prediction (Flask Web App)
Driven 100% by Machine Learning model inference (RandomForestClassifier + StandardScaler).
"""

import os
from pathlib import Path
# pyrefly: ignore [missing-import]
from flask import Flask, render_template, request, redirect, url_for, jsonify
from src.predict import predictor_service
from src.config import BASE_DIR, METRICS_PATH
import json

app = Flask(
    __name__,
    static_folder=str(BASE_DIR / "static"),
    static_url_path="/static",
    template_folder=str(BASE_DIR / "templates")
)


@app.route("/")
def home():
    """Render home page with clinical diagnosis form."""
    return render_template("home.html")


@app.route("/predict", methods=["GET", "POST"])
@app.route("/predict/", methods=["GET", "POST"])
def predict():
    """
    100% ML-Powered Risk Stratification Endpoint.
    Passes form data to ML inference service, calculates posterior risk probability,
    and returns comprehensive medical report view.
    """
    if request.method == "GET":
        return redirect(url_for("home"))

    try:
        form_data = request.form

        # 1. Run 100% ML Inference Pipeline
        ml_result = predictor_service.predict(form_data)

        # 2. Extract Patient Info for Report Presentation
        name = form_data.get("name", "Patient").strip()
        trestbps = float(form_data.get("bp", 120))
        chol = float(form_data.get("chol", 200))
        smoke = form_data.get("smoke", "Never")
        exang = form_data.get("exang", "No")

        # 3. Patient Clinical Progress Scores (Normalized 0-100% for UI meter visuals)
        bp_score = min(100, max(10, int(((trestbps - 90) / 100) * 100)))
        chol_score = min(100, max(10, int(((chol - 130) / 200) * 100)))
        smoke_score = 90 if smoke == "Current" else (50 if smoke == "Former" else 15)
        exang_score = 85 if exang == "Yes" else 15

        context = {
            "name": name,
            "prediction": ml_result["prediction_text"],
            "predictionKey": ml_result["prediction_key"],
            "risk": ml_result["risk_score"],
            "level": ml_result["risk_level"],
            "levelKey": ml_result["risk_level_key"],
            "bpValue": int(trestbps),
            "bpScore": bp_score,
            "cholValue": int(chol),
            "cholScore": chol_score,
            "smokeValue": smoke,
            "smokeScore": smoke_score,
            "exangValue": exang,
            "exangScore": exang_score,
        }

        return render_template("result.html", **context)

    except Exception as e:
        return f"<div style='color:red;padding:2rem;font-family:sans-serif;'><h3>Error in ML Inference</h3><p>{str(e)}</p><a href='/'>Go Back</a></div>", 400


@app.route("/api/metrics")
def api_metrics():
    """API endpoint to view real ML model evaluation metrics."""
    if METRICS_PATH.exists():
        with open(METRICS_PATH, "r") as f:
            return jsonify(json.load(f))
    return jsonify({"error": "Metrics file not found"}), 404


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting CardioPulse ML Flask Server on http://localhost:{port}")
    app.run(host="0.0.0.0", port=port, debug=True)
