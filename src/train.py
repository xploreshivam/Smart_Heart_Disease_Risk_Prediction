"""
ML Model Training and Evaluation Pipeline
Trains Random Forest Classifier, evaluates performance, and serializes artifacts.
"""

import os
import json
import joblib
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, classification_report

from src.config import (
    MODELS_DIR,
    MODEL_PATH,
    SCALER_PATH,
    METRICS_PATH,
    FEATURE_COLUMNS
)
from src.data_processing import load_dataset, clean_and_prepare_data, split_data


def train_model():
    """Execute end-to-end ML model training pipeline."""
    print("=" * 60)
    print("HEART DISEASE RISK PREDICTION - 100% ML TRAINING PIPELINE")
    print("=" * 60)

    # 1. Load Data
    print("\n[1/5] Loading dataset...")
    df = load_dataset()
    print(f"      Loaded {df.shape[0]} rows, {df.shape[1]} columns.")

    # 2. Clean & Preprocess Data
    print("\n[2/5] Cleaning and imputing missing data...")
    X, y = clean_and_prepare_data(df)

    # 3. Stratified Train-Test Split
    print("\n[3/5] Splitting data (80% Train, 20% Test)...")
    X_train, X_test, y_train, y_test = split_data(X, y)
    print(f"      Train samples: {len(X_train)}, Test samples: {len(X_test)}")

    # 4. Standard Scaling
    print("\n[4/5] Fitting StandardScaler...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # 5. Train Random Forest Model
    print("\n[5/5] Training RandomForestClassifier...")
    model = RandomForestClassifier(
        n_estimators=200,
        max_depth=6,
        random_state=42,
        class_weight="balanced"
    )
    model.fit(X_train_scaled, y_train)

    # 6. Evaluation
    y_pred = model.predict(X_test_scaled)
    y_proba = model.predict_proba(X_test_scaled)[:, 1]

    acc = float(accuracy_score(y_test, y_pred))
    prec = float(precision_score(y_test, y_pred))
    rec = float(recall_score(y_test, y_pred))
    f1 = float(f1_score(y_test, y_pred))
    roc_auc = float(roc_auc_score(y_test, y_proba))

    print("\n" + "-" * 40)
    print(f"TEST ACCURACY  : {acc * 100:.2f}%")
    print(f"PRECISION      : {prec * 100:.2f}%")
    print(f"RECALL         : {rec * 100:.2f}%")
    print(f"F1-SCORE       : {f1 * 100:.2f}%")
    print(f"ROC-AUC        : {roc_auc * 100:.2f}%")
    print("-" * 40)
    print("\nClassification Report:\n", classification_report(y_test, y_pred))

    # 7. Save Artifacts
    MODELS_DIR.mkdir(parents=True, exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    joblib.dump(scaler, SCALER_PATH)

    metrics = {
        "model_type": "RandomForestClassifier",
        "n_estimators": 200,
        "max_depth": 6,
        "accuracy": round(acc, 4),
        "precision": round(prec, 4),
        "recall": round(rec, 4),
        "f1_score": round(f1, 4),
        "roc_auc": round(roc_auc, 4),
        "features": FEATURE_COLUMNS
    }
    with open(METRICS_PATH, "w") as f:
        json.dump(metrics, f, indent=4)

    print("\nSuccessfully saved ML artifacts:")
    print(f"  -> Model   : {MODEL_PATH}")
    print(f"  -> Scaler  : {SCALER_PATH}")
    print(f"  -> Metrics : {METRICS_PATH}")
    print("=" * 60)


if __name__ == "__main__":
    train_model()
