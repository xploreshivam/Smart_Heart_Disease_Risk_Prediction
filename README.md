# Smart Heart Disease Risk Prediction

A machine learning based web application that estimates the risk of cardiovascular disease using clinical patient parameters. The application uses a Random Forest Classifier trained on the Cleveland Heart Disease dataset and serves predictions through a Flask web interface.

## Overview

The system collects clinical indicators through a form, preprocesses and scales the inputs, and runs inference using a trained model. It outputs:
- Disease presence detection (Detected / Not Detected)
- Risk percentage score (0% - 100%)
- Risk level classification (Very Low, Low, Moderate, High, Very High)
- Clinical indicator breakdown

## Project Structure

```text
Smart_Heart_Disease_Risk_Prediction/
|-- data/
|   `-- raw/
|       `-- heart.csv
|-- models/
|   |-- heart_model.pkl
|   |-- scaler.pkl
|   `-- model_metrics.json
|-- src/
|   |-- config.py
|   |-- data_processing.py
|   |-- train.py
|   `-- predict.py
|-- static/
|-- templates/
|   |-- home.html
|   `-- result.html
|-- app.py
|-- requirements.txt
`-- README.md
```

## Features Used for Prediction

The model uses 13 clinical features:
1. age: Age of the patient in years
2. sex: Sex (Male, Female)
3. cp: Chest pain type (Typical Angina, Atypical Angina, Non-anginal Pain, Asymptomatic)
4. trestbps: Resting blood pressure (in mm Hg)
5. chol: Serum cholesterol (in mg/dl)
6. fbs: Fasting blood sugar > 120 mg/dl (Yes, No)
7. restecg: Resting electrocardiographic results
8. thalach: Maximum heart rate achieved
9. exang: Exercise-induced angina (Yes, No)
10. oldpeak: ST depression induced by exercise relative to rest
11. slope: Slope of peak exercise ST segment
12. ca: Number of major vessels colored by fluoroscopy (0-3)
13. thal: Thalassemia status (Normal, Fixed Defect, Reversible Defect)

## Requirements

- Python 3.10 or higher
- Dependencies listed in requirements.txt

## Installation and Setup

1. Open a terminal and navigate to the project directory:

```bash
cd Smart_Heart_Disease_Risk_Prediction
```

2. Create a virtual environment:

```bash
python -m venv .venv
```

3. Activate the virtual environment:

- On Windows (PowerShell):
```powershell
.\.venv\Scripts\Activate.ps1
```

- On Windows (Command Prompt):
```cmd
.\.venv\Scripts\activate.bat
```

- On Linux / macOS:
```bash
source .venv/bin/activate
```

4. Install required packages:

```bash
pip install -r requirements.txt
```

## Training the Model (Optional)

Pre-trained model artifacts are included in the models directory. To retrain the model on the dataset:

```bash
python -m src.train
```

This will retrain the classifier, generate `heart_model.pkl`, `scaler.pkl`, and update evaluation metrics in `model_metrics.json`.

## Running the Application

Start the Flask server:

```bash
python app.py
```

Open your browser and visit:
```text
http://localhost:5000
```

## API Endpoints

- GET / : Home page with the patient diagnosis form
- POST /predict/ : Processes form inputs and returns prediction results
- GET /api/metrics : Returns model evaluation metrics in JSON format
