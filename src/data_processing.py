"""
Data Preprocessing & Ingestion Module
Handles loading, missing value imputation, and train-test splits.
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from src.config import RAW_DATA_PATH, FEATURE_COLUMNS, TARGET_COLUMN


def load_dataset(data_path=RAW_DATA_PATH):
    """Load heart disease dataset from CSV."""
    if not data_path.exists():
        raise FileNotFoundError(f"Dataset file not found at: {data_path}")
    
    df = pd.read_csv(data_path)
    return df


def clean_and_prepare_data(df):
    """
    Handle missing values and separate features and target.
    Imputes NaN values (found in ca and thal) using column median.
    """
    df_clean = df.copy()

    # Fill missing values with median
    if df_clean.isnull().sum().sum() > 0:
        df_clean = df_clean.fillna(df_clean.median(numeric_only=True))

    X = df_clean[FEATURE_COLUMNS]
    y = df_clean[TARGET_COLUMN].astype(int)

    return X, y


def split_data(X, y, test_size=0.2, random_state=42):
    """Split data into train and test sets with stratification."""
    return train_test_split(
        X, y, test_size=test_size, random_state=random_state, stratify=y
    )
