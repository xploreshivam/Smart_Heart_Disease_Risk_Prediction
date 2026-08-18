/**
 * ==========================================================================
 * CardioPulse - Smart Heart Disease Risk Prediction System
 * Client-Side Script: UI Logic, Localization (i18n), Gauge & Form Handling
 * ==========================================================================
 */

// --------------------------------------------------------------------------
// 1. Multi-Language Dictionaries (English, Hindi, Hinglish)
// --------------------------------------------------------------------------
const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_predict: "Predict",
        hero_title: "AI-Driven <span class='highlight-text'>Heart Disease</span> Risk Prediction",
        hero_desc: "Accurately assess your cardiovascular risk in seconds using 16 essential clinical biomarkers.",
        hero_cta: "Check Heart Disease",
        hero_secondary: "How It Works",
        about_title: "About CardioPulse",
        about_subtitle: "Advanced cardiovascular disease risk stratification algorithm",
        about_feat1_title: "16 Clinical Factors",
        about_feat1_desc: "Analyzes ECG, blood pressure, cholesterol, oldpeak ST depression, and lifestyle metrics.",
        about_feat2_title: "Instant Risk Score",
        about_feat2_desc: "Computes calibrated probability percentage and risk classification tier in milliseconds.",
        about_feat3_title: "Printable Report",
        about_feat3_desc: "Generates comprehensive patient summary with customized lifestyle recommendations.",
        form_title: "Patient Information",
        form_subtitle: "Enter the patient's medical details below.",
        label_name: "Patient Name",
        label_age: "Age",
        label_gender: "Gender",
        opt_select_gender: "Select Gender",
        opt_male: "Male",
        opt_female: "Female",
        label_cp: "Chest Pain Type",
        opt_select_cp: "Select Chest Pain Type",
        opt_typical_angina: "Typical Angina",
        opt_atypical_angina: "Atypical Angina",
        opt_non_anginal: "Non-anginal Pain",
        opt_asymptomatic: "Asymptomatic",
        label_bp: "Resting Blood Pressure",
        label_chol: "Serum Cholesterol",
        label_fbs: "Fasting Blood Sugar",
        opt_select_fbs: "Select Blood Sugar",
        opt_yes: "Elevated (> 120 mg/dl)",
        opt_no: "Normal (<= 120 mg/dl)",
        label_ecg: "Resting ECG",
        opt_select_ecg: "Select ECG Result",
        opt_ecg_normal: "Normal",
        opt_ecg_st: "ST-T Wave Abnormality",
        opt_ecg_lvh: "Left Ventricular Hypertrophy",
        label_hr: "Maximum Heart Rate",
        label_exang: "Exercise Induced Angina",
        opt_select_exang: "Select Angina Status",
        label_oldpeak: "ST Depression (Oldpeak)",
        label_slope: "ST Slope",
        opt_select_slope: "Select ST Slope",
        opt_upsloping: "Upsloping",
        opt_flat: "Flat",
        opt_downsloping: "Downsloping",
        label_ca: "Major Vessels",
        opt_select_ca: "Select Major Vessels",
        label_thal: "Thalassemia Status",
        opt_select_thal: "Select Thalassemia Status",
        opt_thal_normal: "Normal",
        opt_thal_fixed: "Fixed Defect",
        opt_thal_reversible: "Reversible Defect",
        label_smoke: "Smoking Status",
        opt_select_smoke: "Select Smoking Status",
        opt_smoke_never: "Never",
        opt_smoke_former: "Former",
        opt_smoke_current: "Current",
        label_alcohol: "Alcohol Consumption",
        opt_select_alcohol: "Select Alcohol Consumption",
        opt_alc_never: "Never",
        opt_alc_occasionally: "Occasionally",
        opt_alc_regularly: "Regularly",
        btn_predict: "Check Heart Disease",
        footer_subtitle: "Next-Gen AI Cardiovascular Disease Risk Stratification System",
        // Result Page keys
        res_btn_new: "New Prediction",
        res_badge: "AI Risk Assessment Result",
        res_title: "Cardiovascular Health Report",
        res_subtitle: "Generated using AI Clinical Risk Stratification Engine",
        res_gauge_label: "Risk Score",
        res_outcome_title: "Prediction Outcome",
        res_patient_details: "Patient Summary",
        res_probability_label: "AI Probability / Risk",
        res_category_label: "Risk Category",
        res_ai_analysis_title: "AI Clinical Analysis",
        res_ai_analysis_desc: "The prediction has been computed using a trained cardiovascular risk assessment engine. The risk percentage represents calibrated disease probability based on 16 clinical factors including resting BP, cholesterol levels, ECG dynamics, exercise ST depression, and lifestyle metrics.",
        res_indicators_title: "Key Clinical Indicators",
        res_recommendations_title: "Clinical & Lifestyle Recommendations",
        rec1_title: "Physical Activity",
        rec1_desc: "Engage in moderate-intensity aerobic exercise (e.g. brisk walking) for at least 30 minutes daily, 5 days a week.",
        rec2_title: "Heart-Healthy Diet",
        rec2_desc: "Adopt a Mediterranean-style diet low in saturated fats, sodium (<2,300mg/day), and refined sugars.",
        rec3_title: "Smoking & Alcohol Cessation",
        rec3_desc: "Eliminate tobacco usage and limit alcohol consumption to minimize cardiovascular wall stress.",
        rec4_title: "Cardiologist Follow-up",
        rec4_desc: "Follow up with a healthcare professional or cardiologist for diagnostic echocardiogram and lipid profile review.",
        btn_print: "Print / Save PDF Report",
        btn_predict_another: "Predict Another Patient",
        // Levels and Outcomes
        level_very_low: "Very Low Risk",
        level_low: "Low Risk",
        level_moderate: "Moderate Risk",
        level_high: "High Risk",
        level_very_high: "Very High Risk",
        out_detected: "Heart Disease Detected",
        out_not_detected: "No Heart Disease"
    },
    hi: {
        nav_home: "होम",
        nav_about: "विवरण",
        nav_predict: "जाँच करें",
        hero_title: "एआई-संचालित <span class='highlight-text'>हृदय रोग</span> जोखिम का सटीक पूर्वानुमान",
        hero_desc: "16 आवश्यक क्लिनिकल मानकों के आधार पर कुछ ही सेकंड में अपने हृदय रोग के जोखिम की सटीक जाँच करें।",
        hero_cta: "जाँच शुरू करें",
        hero_secondary: "प्रणाली कैसे काम करती है",
        about_title: "CardioPulse के बारे में",
        about_subtitle: "उन्नत कार्डियोवैस्कुलर रोग जोखिम विश्लेषण और भविष्यवाणी प्रणाली",
        about_feat1_title: "16 क्लिनिकल मानक",
        about_feat1_desc: "ईसीजी, ब्लड प्रेशर, कोलेस्ट्रॉल, एसटी डिप्रेशन और जीवनशैली का गहन विश्लेषण।",
        about_feat2_title: "तत्काल जोखिम स्कोर",
        about_feat2_desc: "मिलीसेकंड में सटीक संभावना प्रतिशत और रिस्क श्रेणी निर्धारित करता है।",
        about_feat3_title: "प्रिंट करने योग्य मेडिकल रिपोर्ट",
        about_feat3_desc: "व्यक्तिगत जीवनशैली सलाह और विस्तृत रोगी सारांश के साथ रिपोर्ट तैयार करता है।",
        form_title: "मरीज की स्वास्थ्य जानकारी",
        form_subtitle: "कृपया नीचे मरीज के क्लिनिकल पैरामीटर दर्ज करें",
        label_name: "मरीज का नाम",
        label_age: "उम्र",
        label_gender: "लिंग",
        opt_select_gender: "लिंग चुनें",
        opt_male: "पुरुष",
        opt_female: "महिला",
        label_cp: "सीने में दर्द का प्रकार",
        opt_select_cp: "सीने में दर्द का प्रकार चुनें",
        opt_typical_angina: "टिपिकल एनजाइना",
        opt_atypical_angina: "एटिपिकल एनजाइना",
        opt_non_anginal: "गैर-एनजाइनल दर्द",
        opt_asymptomatic: "एसिम्प्टोमैटिक",
        label_bp: "विश्राम रक्तचाप",
        label_chol: "सीरम कोलेस्ट्रॉल",
        label_fbs: "फास्टिंग ब्लड शुगर",
        opt_select_fbs: "ब्लड शुगर स्थिति चुनें",
        opt_yes: "अधिक (> 120 mg/dl)",
        opt_no: "सामान्य (<= 120 mg/dl)",
        label_ecg: "विश्राम ईसीजी",
        opt_select_ecg: "ईसीजी परिणाम चुनें",
        opt_ecg_normal: "सामान्य",
        opt_ecg_st: "ST-T तरंग असामान्यता",
        opt_ecg_lvh: "लेफ्ट वेंट्रिकुलर हाइपरट्रॉफी",
        label_hr: "अधिकतम हृदय गति",
        label_exang: "व्यायाम के दौरान एनजाइना",
        opt_select_exang: "एनजाइना स्थिति चुनें",
        label_oldpeak: "एसटी डिप्रेशन (Oldpeak)",
        label_slope: "एसटी सेगमेंट स्लोप",
        opt_select_slope: "एसटी स्लोप चुनें",
        opt_upsloping: "अपस्लोपिंग",
        opt_flat: "सपाट",
        opt_downsloping: "डाउनस्लोपिंग",
        label_ca: "प्रमुख रक्त वाहिकाएं",
        opt_select_ca: "रक्त वाहिकाओं की संख्या चुनें",
        label_thal: "थैलेसीमिया स्थिति",
        opt_select_thal: "थैलेसीमिया प्रकार चुनें",
        opt_thal_normal: "सामान्य",
        opt_thal_fixed: "स्थायी दोष",
        opt_thal_reversible: "प्रतिवर्ती दोष",
        label_smoke: "धूम्रपान की आदत",
        opt_select_smoke: "धूम्रपान स्थिति चुनें",
        opt_smoke_never: "कभी नहीं",
        opt_smoke_former: "पूर्व धूम्रपानकर्ता",
        opt_smoke_current: "वर्तमान में नियमित",
        label_alcohol: "शराब का सेवन",
        opt_select_alcohol: "शराब सेवन चुनें",
        opt_alc_never: "कभी नहीं",
        opt_alc_occasionally: "कभी-कभार",
        opt_alc_regularly: "नियमित",
        btn_predict: "हृदय रोग जोखिम की जाँच करें",
        footer_subtitle: "उन्नत एआई कार्डियोवैस्कुलर स्वास्थ्य और जोखिम विश्लेषण प्रणाली",
        // Result Page
        res_btn_new: "नई जाँच करें",
        res_badge: "एआई जोखिम मूल्यांकन परिणाम",
        res_title: "कार्डियोवैस्कुलर स्वास्थ्य रिपोर्ट",
        res_subtitle: "एआई क्लिनिकल रिस्क स्ट्रेटिफिकेशन इंजन द्वारा तैयार",
        res_gauge_label: "जोखिम स्कोर",
        res_outcome_title: "जाँच परिणाम",
        res_patient_details: "रोगी विवरण सारांश",
        res_probability_label: "एआई संभावना / जोखिम दर",
        res_category_label: "जोखिम श्रेणी",
        res_ai_analysis_title: "एआई क्लिनिकल विश्लेषण",
        res_ai_analysis_desc: "यह भविष्यवाणी प्रशिक्षित कार्डियोवैस्कुलर जोखिम मूल्यांकन मॉडल द्वारा की गई है। जोखिम प्रतिशत मरीज के 16 नैदानिक कारकों (जैसे ब्लड प्रेशर, कोलेस्ट्रॉल, ईसीजी और जीवनशैली) पर आधारित है।",
        res_indicators_title: "प्रमुख नैदानिक संकेतक",
        res_recommendations_title: "क्लिनिकल और जीवनशैली परामर्श",
        rec1_title: "नियमित शारीरिक व्यायाम",
        rec1_desc: "प्रतिदिन कम से कम 30 मिनट तेज गति से पैदल चलें या मध्यम एरोबिक व्यायाम सप्ताह में 5 दिन करें।",
        rec2_title: "हृदय के लिए पौष्टिक आहार",
        rec2_desc: "संतृप्त वसा, अतिरिक्त नमक और परिष्कृत चीनी से दूर रहें। ताजे फल और हरी सब्जियां अपनाएं।",
        rec3_title: "धूम्रपान एवं शराब से परहेज",
        rec3_desc: "तंबाकू का सेवन तुरंत बंद करें और अल्कोहल सीमित करें ताकि हृदय की रक्त वाहिकाओं पर दबाव न पड़े।",
        rec4_title: "हृदय रोग विशेषज्ञ से परामर्श",
        rec4_desc: "आगे की पुष्टि के लिए इकोकार्डियोग्राम और लिपिड प्रोफाइल की विस्तृत जाँच हेतु डॉक्टर से संपर्क करें।",
        btn_print: "रिपोर्ट प्रिंट करें / PDF सहेजें",
        btn_predict_another: "अन्य मरीज की जाँच करें",
        // Levels and Outcomes
        level_very_low: "बहुत कम जोखिम (Very Low)",
        level_low: "कम जोखिम (Low Risk)",
        level_moderate: "मध्यम जोखिम (Moderate Risk)",
        level_high: "उच्च जोखिम (High Risk)",
        level_very_high: "अत्यधिक जोखिम (Very High)",
        out_detected: "हृदय रोग की संभावना पाई गई",
        out_not_detected: "हृदय रोग का कोई लक्षण नहीं"
    },
    hn: {
        nav_home: "Home",
        nav_about: "About",
        nav_predict: "Risk Check",
        hero_title: "AI-Powered <span class='highlight-text'>Heart Disease</span> Risk Prediction",
        hero_desc: "16 clinical biomarkers ke basis par kuch hi seconds me apna heart disease risk accurately check karein.",
        hero_cta: "Heart Risk Check Karein",
        hero_secondary: "Kaise Kaam Karta Hai",
        about_title: "CardioPulse ke baare mein",
        about_subtitle: "Advanced AI-powered heart risk evaluation system",
        about_feat1_title: "16 Clinical Factors",
        about_feat1_desc: "ECG, Blood Pressure, Cholesterol, ST depression aur lifestyle data ka deep analysis.",
        about_feat2_title: "Instant Risk Score",
        about_feat2_desc: "Seconds mein accurate probability percentage aur risk level batata hai.",
        about_feat3_title: "Medical Report",
        about_feat3_desc: "Detailed patient summary aur customized healthy heart advice ke saath report.",
        form_title: "Patient Medical Details",
        form_subtitle: "Neeche patient ki medical details fill karein",
        label_name: "Patient Name",
        label_age: "Age",
        label_gender: "Gender",
        opt_select_gender: "Gender Select Karein",
        opt_male: "Male",
        opt_female: "Female",
        label_cp: "Chest Pain Type",
        opt_select_cp: "Chest Pain Type Select Karein",
        opt_typical_angina: "Typical Angina",
        opt_atypical_angina: "Atypical Angina",
        opt_non_anginal: "Non-Anginal Pain",
        opt_asymptomatic: "Asymptomatic",
        label_bp: "Resting Blood Pressure",
        label_chol: "Serum Cholesterol",
        label_fbs: "Fasting Blood Sugar",
        opt_select_fbs: "Blood Sugar Select Karein",
        opt_yes: "High (> 120 mg/dl)",
        opt_no: "Normal (<= 120 mg/dl)",
        label_ecg: "Resting ECG",
        opt_select_ecg: "ECG Result Select Karein",
        opt_ecg_normal: "Normal ECG",
        opt_ecg_st: "ST-T Wave Abnormality",
        opt_ecg_lvh: "Left Ventricular Hypertrophy",
        label_hr: "Max Heart Rate",
        label_exang: "Exercise Induced Angina",
        opt_select_exang: "Angina Status Select Karein",
        label_oldpeak: "ST Depression (Oldpeak)",
        label_slope: "ST Slope",
        opt_select_slope: "ST Slope Select Karein",
        opt_upsloping: "Upsloping",
        opt_flat: "Flat",
        opt_downsloping: "Downsloping",
        label_ca: "Major Blood Vessels",
        opt_select_ca: "Vessels Count Select Karein",
        label_thal: "Thalassemia Condition",
        opt_select_thal: "Thalassemia Select Karein",
        opt_thal_normal: "Normal",
        opt_thal_fixed: "Fixed Defect",
        opt_thal_reversible: "Reversible Defect",
        label_smoke: "Smoking Habit",
        opt_select_smoke: "Smoking Status Select Karein",
        opt_smoke_never: "Never",
        opt_smoke_former: "Former",
        opt_smoke_current: "Current",
        label_alcohol: "Alcohol Consumption",
        opt_select_alcohol: "Alcohol Habit Select Karein",
        opt_alc_never: "Never",
        opt_alc_occasionally: "Occasionally",
        opt_alc_regularly: "Regularly",
        btn_predict: "Predict Heart Risk Now",
        footer_subtitle: "AI Cardiovascular Disease Risk Stratification System",
        // Result Page
        res_btn_new: "Nayi Prediction Karein",
        res_badge: "AI Risk Assessment Result",
        res_title: "Cardiovascular Health Report",
        res_subtitle: "AI Machine Learning Engine dwara generated report",
        res_gauge_label: "Risk Score",
        res_outcome_title: "Prediction Outcome",
        res_patient_details: "Patient Summary",
        res_probability_label: "AI Risk Percentage",
        res_category_label: "Risk Category",
        res_ai_analysis_title: "AI Clinical Analysis",
        res_ai_analysis_desc: "Yeh prediction AI model se calculate kiya gaya hai. Risk percentage patient ke 16 clinical parameters ke base par calibrated probability show karta hai.",
        res_indicators_title: "Important Clinical Indicators",
        res_recommendations_title: "Healthy Heart & Lifestyle Advice",
        rec1_title: "Daily Physical Exercise",
        rec1_desc: "Daily kam se kam 30 minutes brisk walking ya light cardio exercise zaroor karein.",
        rec2_title: "Healthy Heart Diet",
        rec2_desc: "Low-sodium, kam tel-masala aur high-fiber fruits aur vegetables ko diet mein shamil karein.",
        rec3_title: "Smoking aur Alcohol Band Karein",
        rec3_desc: "Tobacco aur excessive alcohol consumption avoid karein taaki blood vessels healthy rahein.",
        rec4_title: "Cardiologist Consultation",
        rec4_desc: "Doctor ya Cardiologist se consult karke further tests karwayein.",
        btn_print: "Report Print Karein / Save PDF",
        btn_predict_another: "Doosre Patient ka Check Karein",
        // Levels and Outcomes
        level_very_low: "Very Low Risk",
        level_low: "Low Risk",
        level_moderate: "Moderate Risk",
        level_high: "High Risk",
        level_very_high: "Very High Risk",
        out_detected: "Heart Disease Detected",
        out_not_detected: "No Heart Disease"
    }
};

const langMeta = {
    en: { name: "English", code: "EN" },
    hi: { name: "हिन्दी", code: "HI" },
    hn: { name: "Hinglish", code: "HN" }
};

// --------------------------------------------------------------------------
// 2. Main Initialization on DOM Ready
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    // A. Navbar scrollspy and active state listener
    initNavigationScrollspy();

    // B. Multi-language i18n switcher
    initLanguageSystem();

    // C. Animated circular probability gauge (Result Page)
    initializeGauge();

    // D. Form submission validation & UI spinner feedback
    initFormHandling();
});

// --------------------------------------------------------------------------
// 3. Navigation Active State & Scrollspy
// --------------------------------------------------------------------------
function initNavigationScrollspy() {
    const navButtons = document.querySelectorAll(".nav-glass-btn");
    const sections = document.querySelectorAll("section[id]");
    const navMenu = document.getElementById("menu");

    if (navButtons.length === 0) return;

    // Handle Click Selection & Mobile Navbar Auto-Collapse
    navButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            navButtons.forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            if (navMenu && navMenu.classList.contains("show")) {
                const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    if (sections.length === 0) return;

    // Window scroll position tracker
    function onScroll() {
        const scrollPosition = window.scrollY + 220;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPosition >= top && scrollPosition < top + height) {
                navButtons.forEach(btn => {
                    btn.classList.remove("active");
                    const target = btn.getAttribute("data-nav") || btn.getAttribute("href")?.replace("#", "");
                    if (target === id) {
                        btn.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

// --------------------------------------------------------------------------
// 4. Multi-Language Switcher (Local Storage Persistence)
// --------------------------------------------------------------------------
function initLanguageSystem() {
    const savedLang = localStorage.getItem("cardiopulse_lang") || "en";
    applyLanguage(savedLang);

    const langOptions = document.querySelectorAll(".lang-option");
    langOptions.forEach(option => {
        option.addEventListener("click", function () {
            const lang = this.getAttribute("data-lang");
            if (lang && translations[lang]) {
                localStorage.setItem("cardiopulse_lang", lang);
                applyLanguage(lang);
            }
        });
    });
}

function applyLanguage(lang) {
    if (!translations[lang]) return;
    const currentDict = translations[lang];
    const meta = langMeta[lang] || { name: "English", code: "EN" };

    // Update Dropdown UI Badge
    const codeEl = document.getElementById("current-lang-code");
    const textEl = document.getElementById("current-lang-text");
    if (codeEl) codeEl.textContent = meta.code;
    if (textEl) textEl.textContent = meta.name;

    // Update Dropdown Option Active States
    document.querySelectorAll(".lang-option").forEach(opt => {
        if (opt.getAttribute("data-lang") === lang) {
            opt.classList.add("active");
        } else {
            opt.classList.remove("active");
        }
    });

    // Translate DOM elements marked with data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (currentDict[key]) {
            if (currentDict[key].includes("<span") || currentDict[key].includes("<small")) {
                el.innerHTML = currentDict[key];
            } else if (el.tagName === "OPTION") {
                el.textContent = currentDict[key];
            } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.placeholder = currentDict[key];
            } else {
                const innerSpan = el.querySelector(":scope > span");
                if (innerSpan && !innerSpan.classList.contains("badge-ai-dot") && !innerSpan.classList.contains("lang-code-pill")) {
                    innerSpan.textContent = currentDict[key];
                } else {
                    el.textContent = currentDict[key];
                }
            }
        }
    });

    // Dynamic placeholders based on selected locale
    const nameInput = document.getElementById("input-name");
    if (nameInput) {
        if (lang === "hi") nameInput.placeholder = "उदा. राहुल शर्मा";
        else if (lang === "hn") nameInput.placeholder = "e.g. Rahul Sharma";
        else nameInput.placeholder = "e.g. John Doe";
    }
}

// --------------------------------------------------------------------------
// 5. Circular Risk Probability Gauge Animation
// --------------------------------------------------------------------------
function initializeGauge() {
    const riskInput = document.getElementById("risk-value");
    const counter = document.getElementById("counter");
    const outerCircle = document.querySelector(".outer-circle");
    if (!riskInput || !counter) return;

    const targetRisk = Math.max(0, Math.min(100, parseFloat(riskInput.value) || 0));
    let current = 0;
    const duration = 1200; // ms
    const steps = 40;
    const step = targetRisk / steps;
    const intervalTime = duration / steps;

    // Color gradient based on triage tier
    let gaugeColor = "#10b981"; // Low / Normal
    if (targetRisk >= 75) gaugeColor = "#f43f5e";
    else if (targetRisk >= 50) gaugeColor = "#f59e0b";
    else if (targetRisk >= 25) gaugeColor = "#34d399";

    if (outerCircle) {
        outerCircle.style.background = `conic-gradient(${gaugeColor} 0%, ${gaugeColor} ${targetRisk}%, rgba(255, 255, 255, 0.08) ${targetRisk}%, rgba(255, 255, 255, 0.08) 100%)`;
        outerCircle.style.boxShadow = `0 10px 40px ${targetRisk >= 50 ? 'rgba(244, 63, 94, 0.4)' : 'rgba(16, 185, 129, 0.4)'}`;
    }

    if (targetRisk <= 0) {
        counter.innerText = "0.0%";
        return;
    }

    const timer = setInterval(() => {
        current += step;
        if (current >= targetRisk) {
            current = targetRisk;
            clearInterval(timer);
        }
        counter.innerText = current.toFixed(1) + "%";
    }, intervalTime);
}

// --------------------------------------------------------------------------
// 6. Form Submission & Loading Feedback
// --------------------------------------------------------------------------
function initFormHandling() {
    const form = document.getElementById("cardio-form");
    const submitBtn = document.getElementById("btn-submit-predict");

    if (!form || !submitBtn) return;

    form.addEventListener("submit", function () {
        if (!form.checkValidity()) {
            return;
        }
        setTimeout(() => {
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Calculating Risk Score...`;
            submitBtn.style.opacity = "0.85";
        }, 10);
    });
}

// --------------------------------------------------------------------------
// 7. Robust Print & Direct PDF Download Export Engine
// --------------------------------------------------------------------------
function exportOrPrintReport() {
    const btn = document.getElementById("btn-print-report");
    const reportEl = document.getElementById("printable-report");
    const patientNameRaw = document.getElementById("patient-name-val")?.value || "Patient";
    const patientName = patientNameRaw.replace(/[^a-zA-Z0-9_-]/g, "_");

    const originalHtml = btn ? btn.innerHTML : "";
    if (btn) {
        btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Exporting Report...`;
        btn.style.pointerEvents = "none";
    }

    // Direct PDF Generation using html2pdf if loaded
    if (typeof html2pdf !== "undefined" && reportEl) {
        const opt = {
            margin: [10, 10, 10, 10],
            filename: `CardioPulse_Report_${patientName}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, backgroundColor: "#061109" },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        };

        const actionSection = reportEl.querySelector(".no-print-section");
        if (actionSection) actionSection.style.visibility = "hidden";

        html2pdf()
            .set(opt)
            .from(reportEl)
            .save()
            .then(() => {
                if (actionSection) actionSection.style.visibility = "visible";
                if (btn) {
                    btn.innerHTML = `<i class="bi bi-check-circle-fill me-2 text-white"></i> PDF Saved Successfully!`;
                    setTimeout(() => {
                        btn.innerHTML = originalHtml;
                        btn.style.pointerEvents = "auto";
                    }, 2400);
                }
            })
            .catch(err => {
                console.warn("Direct PDF render warning, falling back to browser print:", err);
                if (actionSection) actionSection.style.visibility = "visible";
                if (btn) {
                    btn.innerHTML = originalHtml;
                    btn.style.pointerEvents = "auto";
                }
                triggerBrowserPrint();
            });
    } else {
        if (btn) {
            btn.innerHTML = originalHtml;
            btn.style.pointerEvents = "auto";
        }
        triggerBrowserPrint();
    }
}

function triggerBrowserPrint() {
    try {
        window.print();
    } catch (e) {
        console.error("Window print error:", e);
    }
}

// Expose globally to window
window.exportOrPrintReport = exportOrPrintReport;

