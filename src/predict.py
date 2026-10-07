"""
ML Prediction and Inference Pipeline
Loads trained artifacts and exposes robust prediction methods.
"""

import joblib
import pandas as pd
import numpy as np
from src.config import (
    MODEL_PATH,
    SCALER_PATH,
    FEATURE_COLUMNS,
    CP_MAPPING,
    RESTECG_MAPPING,
    SLOPE_MAPPING,
    THAL_MAPPING
)


class HeartDiseasePredictor:
    """Production ML Inference Service for Heart Disease Risk Stratification."""

    def __init__(self):
        if not MODEL_PATH.exists() or not SCALER_PATH.exists():
            raise FileNotFoundError(
                f"Trained artifacts not found. Please run training pipeline first (`python -m src.train`)."
            )
        self.model = joblib.load(MODEL_PATH)
        self.scaler = joblib.load(SCALER_PATH)
        self.feature_columns = FEATURE_COLUMNS

    def preprocess_input(self, data: dict) -> pd.DataFrame:
        """
        Validate, map clinical inputs, and construct feature vector DataFrame.
        """
        # Map categorical inputs to numeric values used during training
        sex_val = 1.0 if str(data.get("sex", "Male")).strip().lower() in ["male", "1"] else 0.0
        cp_val = CP_MAPPING.get(data.get("cp"), 4.0)
        fbs_val = 1.0 if str(data.get("fbs", "No")).strip().lower() in ["yes", "1", "true"] else 0.0
        restecg_val = RESTECG_MAPPING.get(data.get("ecg"), 0.0)
        exang_val = 1.0 if str(data.get("exang", "No")).strip().lower() in ["yes", "1", "true"] else 0.0
        slope_val = SLOPE_MAPPING.get(data.get("slope"), 2.0)
        thal_val = THAL_MAPPING.get(data.get("thal"), 3.0)

        # Numerical fields with validation
        age = float(data.get("age", 45))
        trestbps = float(data.get("bp", 120))
        chol = float(data.get("chol", 200))
        thalach = float(data.get("hr", 140))
        oldpeak = float(data.get("oldpeak", 0.0))
        ca = float(data.get("ca", 0))

        features_dict = {
            "age": age,
            "sex": sex_val,
            "cp": cp_val,
            "trestbps": trestbps,
            "chol": chol,
            "fbs": fbs_val,
            "restecg": restecg_val,
            "thalach": thalach,
            "exang": exang_val,
            "oldpeak": oldpeak,
            "slope": slope_val,
            "ca": ca,
            "thal": thal_val
        }

        # Ensure exact feature order as in training
        df_input = pd.DataFrame([features_dict])[self.feature_columns]
        return df_input

    def predict(self, raw_input_dict: dict) -> dict:
        """
        Perform 100% ML-based inference:
        - Scales input using fitted StandardScaler
        - Computes class prediction using RandomForest
        - Computes true posterior probability (predict_proba)
        """
        df_input = self.preprocess_input(raw_input_dict)
        scaled_input = self.scaler.transform(df_input)

        prediction_class = int(self.model.predict(scaled_input)[0])
        probabilities = self.model.predict_proba(scaled_input)[0]

        # Actual machine-learned probability of class 1 (Heart Disease)
        disease_probability = float(probabilities[1])
        risk_score = round(disease_probability * 100, 2)

        # Stratified Risk Levels based on ML probability
        if risk_score < 20:
            level = "Very Low"
            level_key = "level_very_low"
        elif risk_score < 40:
            level = "Low"
            level_key = "level_low"
        elif risk_score < 60:
            level = "Moderate"
            level_key = "level_moderate"
        elif risk_score < 80:
            level = "High"
            level_key = "level_high"
        else:
            level = "Very High"
            level_key = "level_very_high"

        is_detected = (prediction_class == 1)

        return {
            "prediction_class": prediction_class,
            "is_detected": is_detected,
            "prediction_text": "Heart Disease Detected" if is_detected else "No Heart Disease Detected",
            "prediction_key": "out_detected" if is_detected else "out_not_detected",
            "risk_score": risk_score,
            "probability": disease_probability,
            "risk_level": level,
            "risk_level_key": level_key
        }


# Global singleton instance for high-performance serving
predictor_service = HeartDiseasePredictor()
