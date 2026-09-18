# CardioPulse - Smart Heart Disease Risk Prediction System
> **Domain**: Healthcare Informatics & Predictive Modeling  

---

## Project Overview

**CardioPulse** is an automated clinical risk assessment web application designed to stratify cardiovascular disease (CVD) risk in individuals. By evaluating **16 clinical biomarkers and lifestyle factors**, the system computes a calibrated disease probability score, classifies the patient into distinct risk tiers, and outputs personalized lifestyle and clinical recommendations.

---

## Project Directory Structure

```text
├── .env.example            # Environment variable configuration template
├── package.json            # Node.js project manifest & dependencies
├── server.js               # Express.js backend server & risk calculation engine
├── views/
│   ├── home.ejs            # Diagnostic input form & landing presentation
│   └── result.ejs          # Clinical assessment report & gauge visualization
└── static/
    ├── css/
    │   └── style.css       # Responsive custom styling & glassmorphism theme
    ├── js/
    │   └── script.js       # Client interaction, i18n localization, & gauge animation
    └── images/
        └── heart.webp      # Visual assets
```

---

## Clinical Parameters & Biomarkers (16 Inputs)

The system leverages diagnostic metrics based on the **Cleveland Heart Disease Dataset** and **Framingham Risk Score criteria**:

| # | Parameter | Medical Relevance | Normal Range / Values |
|---|---|---|---|
| 1 | **Age** | Major non-modifiable risk factor | Years (1 - 120) |
| 2 | **Gender / Sex** | Biological risk variance | Male / Female |
| 3 | **Chest Pain Type (CP)** | Symptomatic angina grading | Typical Angina, Atypical Angina, Non-Anginal, Asymptomatic |
| 4 | **Resting Blood Pressure (BP)** | Hypertension indicator | mmHg (Normal: 90 - 120) |
| 5 | **Serum Cholesterol** | Hyperlipidemia assessment | mg/dL (Desirable: < 200) |
| 6 | **Fasting Blood Sugar (FBS)** | Diabetic cardiovascular risk | Normal (<=120 mg/dL) vs Elevated (>120 mg/dL) |
| 7 | **Resting ECG** | Cardiac conduction & hypertrophy | Normal, ST-T Abnormality, LV Hypertrophy |
| 8 | **Maximum Heart Rate (HR)** | Chronotropic cardiovascular reserve | bpm (Max: ~220 - Age) |
| 9 | **Exercise-Induced Angina (Exang)** | Coronary ischemia during exertion | Yes / No |
| 10 | **ST Depression (Oldpeak)** | Myocardial ischemia under stress | mm (0.0 to 6.0+ mm) |
| 11 | **ST Slope** | ST segment peak exertion slope | Upsloping, Flat, Downsloping |
| 12 | **Major Vessels (CA)** | Fluoroscopy coronary calcification | 0 to 4 vessels |
| 13 | **Thalassemia Status (Thal)** | Blood flow defect scintigraphy | Normal, Fixed Defect, Reversible Defect |
| 14 | **Smoking Habit** | Endothelial damage & atherosclerosis | Never, Former, Current |
| 15 | **Alcohol Consumption** | Hypertension & cardiomyopathy | Never, Occasionally, Regularly |
| 16 | **Patient Name** | Report identification | Text string |

---

## Technology Stack

- **Backend Runtime**: Node.js 22 (ES Modules)
- **Web Framework**: Express.js
- **Templating Engine**: EJS (Embedded JavaScript)
- **Styling**: Bootstrap 5.3 + Custom Responsive Glassmorphism CSS
- **Icons & Animations**: Bootstrap Icons, AOS (Animate on Scroll)
- **Localization (i18n)**: Multi-language support (English, Hindi, Hinglish)

---

## Evaluation & Triage Tiers

| Risk Score (%) | Classification Tier | Action Recommended |
|---|---|---|
| **0.0% – 19.9%** | Very Low Risk | Routine wellness & healthy habits |
| **20.0% – 39.9%** | Low Risk | Annual screening & balanced diet |
| **40.0% – 59.9%** | Moderate Risk | Lifestyle adjustments & monitoring |
| **60.0% – 79.9%** | High Risk | Physician consultation & diagnostic review |
| **80.0% – 100.0%** | Very High Risk | Immediate specialist triage & cardiology referral |

---

## License & Academic Note

Created for my skill evaluation and engineering demonstration. Not intended as a substitute for professional medical advice.
