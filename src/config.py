import os
from pathlib import Path

# Base Paths
BASE_DIR = Path(__file__).resolve().parent.parent

# Data Paths
DATA_DIR = BASE_DIR / "data"
RAW_DATA_PATH = DATA_DIR / "raw" / "heart.csv"

# Model Artifacts Paths
MODELS_DIR = BASE_DIR / "models"
MODEL_PATH = MODELS_DIR / "heart_model.pkl"
SCALER_PATH = MODELS_DIR / "scaler.pkl"
METRICS_PATH = MODELS_DIR / "model_metrics.json"

# Feature Definitions
FEATURE_COLUMNS = [
    "age", "sex", "cp", "trestbps", "chol", "fbs",
    "restecg", "thalach", "exang", "oldpeak", "slope", "ca", "thal"
]

TARGET_COLUMN = "target"

# Clinical Categorical Value Mappings to Cleveland Dataset Encoding
CP_MAPPING = {
    "Typical Angina": 1.0,
    "Atypical Angina": 2.0,
    "Non-anginal Pain": 3.0,
    "Asymptomatic": 4.0
}

RESTECG_MAPPING = {
    "Normal": 0.0,
    "ST-T Wave Abnormality": 1.0,
    "Left Ventricular Hypertrophy": 2.0
}

SLOPE_MAPPING = {
    "Upsloping": 1.0,
    "Flat": 2.0,
    "Downsloping": 3.0
}

THAL_MAPPING = {
    "Normal": 3.0,
    "Fixed Defect": 6.0,
    "Reversible Defect": 7.0
}
