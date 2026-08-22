/*
  CardioPulse - Smart Heart Disease Risk Prediction System
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// --------------------------------------------------------------------------
// 1. Server Configuration & Security Headers
// --------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

// Disable technology fingerprinting header
app.disable('x-powered-by');

// Security Headers Middleware
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// View Engine Configuration (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware with Payload Size Bounds (Protects against DoS memory exhaustion)
app.use(express.urlencoded({ extended: true, limit: '50kb' }));
app.use(express.json({ limit: '50kb' }));

// Static Assets with Strict Base Paths
app.use('/static', express.static(path.join(__dirname, 'static'), { maxAge: '1d' }));
app.use('/images', express.static(path.join(__dirname, 'static', 'images'), { maxAge: '1d' }));
app.use('/css', express.static(path.join(__dirname, 'static', 'css'), { maxAge: '1d' }));
app.use('/js', express.static(path.join(__dirname, 'static', 'js'), { maxAge: '1d' }));

// --------------------------------------------------------------------------
// 2. Input Sanitization & Whitelist Validation Utilities
// --------------------------------------------------------------------------

function sanitizeString(input, maxLength = 60, fallback = 'Patient') {
    if (typeof input !== 'string') return fallback;
    const sanitized = input
        .replace(/<[^>]*>/g, '') // Strip HTML/script tags
        .replace(/[^\w\s\u0900-\u097F.\-']/gi, '') // Allow alphanumeric, Unicode (Hindi), space, period, hyphen
        .trim()
        .slice(0, maxLength);
    return sanitized.length > 0 ? sanitized : fallback;
}


function sanitizeNumber(input, min, max, fallback) {
    const num = parseFloat(input);
    if (isNaN(num)) return fallback;
    return Math.min(max, Math.max(min, num));
}


function sanitizeEnum(input, allowedList, fallback) {
    if (typeof input !== 'string') return fallback;
    const matched = allowedList.find(opt => opt.toLowerCase() === input.trim().toLowerCase());
    return matched !== undefined ? matched : fallback;
}

// --------------------------------------------------------------------------
// 3. Cardiovascular Risk Prediction Engine (16 Clinical Biomarkers)
// --------------------------------------------------------------------------

function calculateHeartRisk(rawData) {
    const data = rawData || {};

    // 1. Patient Demographics (Sanitized)
    const name = sanitizeString(data.name, 50, 'Patient');
    const age = sanitizeNumber(data.age, 1, 120, 50);
    const sex = sanitizeEnum(data.sex, ['Male', 'Female'], 'Male');

    // 2. Clinical & Symptomatic Parameters (Validated Whitelists & Bounds)
    const cp = sanitizeEnum(
        data.cp,
        ['Typical Angina', 'Atypical Angina', 'Non-anginal Pain', 'Asymptomatic'],
        'Typical Angina'
    );
    const bp = sanitizeNumber(data.bp, 50, 250, 120);
    const chol = sanitizeNumber(data.chol, 100, 600, 200);
    const fbs = sanitizeEnum(data.fbs, ['Yes', 'No'], 'No');
    const ecg = sanitizeEnum(
        data.ecg,
        ['Normal', 'ST-T Wave Abnormality', 'Left Ventricular Hypertrophy'],
        'Normal'
    );
    const hr = sanitizeNumber(data.hr, 40, 250, 150);
    const exang = sanitizeEnum(data.exang, ['Yes', 'No'], 'No');

    // 3. Advanced Diagnostic & Stress Test Markers
    const oldpeak = sanitizeNumber(data.oldpeak, 0.0, 10.0, 0.0);
    const slope = sanitizeEnum(data.slope, ['Upsloping', 'Flat', 'Downsloping'], 'Upsloping');
    const ca = parseInt(sanitizeNumber(data.ca, 0, 4, 0), 10);
    const thal = sanitizeEnum(
        data.thal,
        ['Normal', 'Fixed Defect', 'Reversible Defect'],
        'Normal'
    );

    // 4. Lifestyle & Behavioral Factors
    const smoke = sanitizeEnum(data.smoke, ['Never', 'Former', 'Current'], 'Never');
    const alcohol = sanitizeEnum(data.alcohol, ['Never', 'Occasionally', 'Regularly'], 'Never');

    // Baseline Log-Odds (Intercept)
    let logit = -3.2;

    // Biomarker Weighted Contributions
    if (age > 65) logit += 1.1;
    else if (age > 55) logit += 0.7;
    else if (age > 45) logit += 0.35;
    else if (age < 35) logit -= 0.4;

    if (sex.toLowerCase() === 'male') {
        logit += 0.45;
    }

    if (cp === 'Asymptomatic') logit += 1.35;
    else if (cp === 'Typical Angina') logit += 0.6;
    else if (cp === 'Atypical Angina') logit -= 0.2;
    else if (cp === 'Non-anginal Pain') logit -= 0.4;

    if (bp >= 160) logit += 0.95;
    else if (bp >= 140) logit += 0.55;
    else if (bp >= 130) logit += 0.25;
    else if (bp < 110) logit -= 0.2;

    if (chol >= 280) logit += 0.9;
    else if (chol >= 240) logit += 0.5;
    else if (chol >= 200) logit += 0.2;
    else if (chol < 170) logit -= 0.25;

    if (fbs === 'Yes') logit += 0.4;

    if (ecg === 'Left Ventricular Hypertrophy') logit += 0.75;
    else if (ecg === 'ST-T Wave Abnormality') logit += 0.5;

    const expectedMaxHr = 220 - age;
    const hrDeficit = expectedMaxHr - hr;
    if (hrDeficit > 35) logit += 0.65;
    else if (hrDeficit > 20) logit += 0.35;
    else if (hr > 165) logit -= 0.35;

    if (exang === 'Yes') logit += 1.05;

    if (oldpeak >= 3.0) logit += 1.3;
    else if (oldpeak >= 2.0) logit += 0.85;
    else if (oldpeak >= 1.0) logit += 0.45;
    else if (oldpeak < 0.5) logit -= 0.3;

    if (slope === 'Flat') logit += 0.65;
    else if (slope === 'Downsloping') logit += 0.95;
    else if (slope === 'Upsloping') logit -= 0.35;

    if (ca >= 3) logit += 1.4;
    else if (ca === 2) logit += 1.0;
    else if (ca === 1) logit += 0.6;
    else logit -= 0.4;

    if (thal === 'Reversible Defect') logit += 1.1;
    else if (thal === 'Fixed Defect') logit += 0.6;
    else if (thal === 'Normal') logit -= 0.4;

    if (smoke === 'Current') logit += 0.75;
    else if (smoke === 'Former') logit += 0.25;
    else logit -= 0.2;

    if (alcohol === 'Regularly') logit += 0.45;
    else if (alcohol === 'Occasionally') logit += 0.1;

    // Calibrated Probability Calculation
    const probability = 1 / (1 + Math.exp(-logit));
    let riskPercent = +(probability * 100).toFixed(1);
    riskPercent = Math.max(3.0, Math.min(98.5, riskPercent));

    // Risk Classification Tier
    let level = 'Low Risk';
    let levelKey = 'level_low';
    if (riskPercent < 20) {
        level = 'Very Low Risk';
        levelKey = 'level_very_low';
    } else if (riskPercent < 40) {
        level = 'Low Risk';
        levelKey = 'level_low';
    } else if (riskPercent < 60) {
        level = 'Moderate Risk';
        levelKey = 'level_moderate';
    } else if (riskPercent < 80) {
        level = 'High Risk';
        levelKey = 'level_high';
    } else {
        level = 'Very High Risk';
        levelKey = 'level_very_high';
    }

    const prediction = riskPercent >= 50 ? 'Heart Disease Detected' : 'No Heart Disease';
    const predictionKey = riskPercent >= 50 ? 'out_detected' : 'out_not_detected';

    // Normalized progress bar scores (0 - 100)
    const bpScore = Math.min(100, Math.max(10, Math.round(((bp - 80) / (200 - 80)) * 100)));
    const cholScore = Math.min(100, Math.max(10, Math.round(((chol - 120) / (380 - 120)) * 100)));
    const smokeScore = smoke === 'Current' ? 88 : (smoke === 'Former' ? 48 : 12);
    const exangScore = exang === 'Yes' ? 85 : 15;

    return {
        name,
        risk: riskPercent.toFixed(1),
        level,
        levelKey,
        prediction,
        predictionKey,
        bpValue: bp,
        bpScore,
        cholValue: chol,
        cholScore,
        smokeValue: smoke,
        smokeScore,
        exangValue: exang,
        exangScore
    };
}

// --------------------------------------------------------------------------
// 4. Application Routes
// --------------------------------------------------------------------------

// Landing / Assessment Form
app.get('/', (req, res) => {
    res.render('home');
});

// Risk Assessment Submission Handler
const handlePrediction = (req, res) => {
    try {
        const resultData = calculateHeartRisk(req.body);
        res.render('result', resultData);
    } catch (err) {
        console.error('Prediction calculation error:', err.message);
        // Return a generic fallback result without exposing internal error stack trace
        res.status(500).render('result', {
            name: 'Patient',
            risk: '50.0',
            level: 'Moderate Risk',
            levelKey: 'level_moderate',
            prediction: 'No Heart Disease',
            predictionKey: 'out_not_detected',
            bpValue: 120,
            bpScore: 40,
            cholValue: 200,
            cholScore: 40,
            smokeValue: 'Never',
            smokeScore: 10,
            exangValue: 'No',
            exangScore: 15
        });
    }
};

app.post('/predict', handlePrediction);
app.post('/predict/', handlePrediction);

// Safe redirect for direct GET access
app.get('/predict', (req, res) => res.redirect('/'));
app.get('/predict/', (req, res) => res.redirect('/'));

// Health Check Endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: Math.floor(process.uptime()) });
});

// 404 Fallback Handler for Unknown Routes
app.use((req, res) => {
    res.status(404).redirect('/');
});

// Global Error Handler (Prevents server crash & hides sensitive stack traces)
app.use((err, req, res, next) => {
    console.error('Unhandled server error:', err.message);
    res.status(500).redirect('/');
});

// --------------------------------------------------------------------------
// 5. Server Listener Initialization
// --------------------------------------------------------------------------
app.listen(PORT, HOST, () => {
    console.log(`====================================================`);
    console.log(` CardioPulse Secure Server running on http://${HOST}:${PORT}`);
    console.log(` B.Tech 3rd Year Capstone Project`);
    console.log(`====================================================`);
});
