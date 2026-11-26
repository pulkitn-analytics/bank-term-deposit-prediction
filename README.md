# BankSight — Bank Term Deposit Subscription Prediction

An end-to-end machine learning application that predicts whether a bank customer is likely to subscribe to a term deposit. The project combines data analysis, model development, a REST API, and an interactive web interface.

**Live Application:** https://bank-term-deposit-prediction-tau.vercel.app  
**Backend API:** https://bank-term-deposit-api-z7b5.onrender.com  
**API Documentation:** https://bank-term-deposit-api-z7b5.onrender.com/docs

## Project Overview

The objective is to identify customers who are more likely to subscribe to a bank term deposit following a marketing campaign. The application accepts customer and campaign information and returns a prediction with the estimated subscription probability.

The project covers the complete workflow, from data understanding and exploratory analysis to model training, API development, and deployment.

## Dataset

The project uses the **Bank Marketing dataset** from the UCI Machine Learning Repository.

- Original dataset: `bank-additional-full.csv`
- Original records: 41,188
- Records after removing 12 exact duplicates: 41,176
- Input features: 20, including the target variable
- Target: `y` (whether the customer subscribed: yes/no)

The dataset is not included in this repository. Place the raw dataset inside `data/raw/` before running the notebooks.

## Exploratory Data Analysis

The analysis examines customer demographics, campaign characteristics, previous contact history, and subscription patterns.

Key considerations include:
- Class imbalance in the subscription target.
- Relationships between customer and campaign attributes and subscription outcomes.
- The special `pdays = 999` value, representing customers who were not previously contacted.
- Excluding `duration` from the primary model because it is only known after the call and can introduce target leakage.

## Data Preprocessing and Feature Engineering

- Removed 12 exact duplicate records.
- Used stratified train-test splitting.
- Applied median imputation and standard scaling to numerical features.
- Applied most-frequent imputation and one-hot encoding to categorical features.
- Engineered `pdays_contact_recorded` to distinguish customers with a previous contact record.
- Replaced the special `pdays = 999` marker with a missing value for preprocessing.
- Used a scikit-learn preprocessing and modeling pipeline.

## Model Development

The following classifiers were evaluated:

- Dummy Classifier (baseline)
- Logistic Regression
- Decision Tree
- Random Forest
- Gradient Boosting

Class-weight balancing was also evaluated to address the imbalanced target.

**Selected model:** Balanced Logistic Regression

A decision threshold of **0.55** was selected as a recall-oriented precision-recall compromise. It was not treated as a universal business optimum.

## Model Evaluation

Final held-out test-set results at the selected threshold:

| Metric | Score |
|---|---:|
| Accuracy | 84.65% |
| Precision (Yes) | 38.87% |
| Recall (Yes) | 63.25% |
| F1-score (Yes) | 48.15% |
| ROC-AUC | 0.8001 |
| PR-AUC | 0.4459 |

The model identifies approximately 63% of actual subscribers in the test set, while its precision indicates that a proportion of positive predictions are false positives. The threshold reflects a recall-oriented trade-off rather than a claim of optimal campaign profitability.

## Application Architecture

The project has three main components:

1. **Machine Learning Pipeline:** A serialized scikit-learn pipeline handles preprocessing and prediction.
2. **Backend API:** FastAPI loads the trained model and exposes prediction and health-check endpoints.
3. **Frontend:** A Next.js application provides an interactive interface for entering customer information and viewing predictions.

### Technology Stack

**Data Science and Machine Learning**
- Python, Pandas, NumPy
- Matplotlib, Seaborn
- Scikit-learn, Statsmodels
- Jupyter Notebook, Joblib

**Backend**
- FastAPI
- Pydantic
- Uvicorn
- Pytest

**Frontend**
- Next.js
- React
- TypeScript
- Tailwind CSS

**Deployment**
- Vercel (frontend)
- Render (backend)

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API welcome message |
| GET | `/health` | API and model health check |
| POST | `/predict` | Generate a subscription prediction |

## Project Structure

```text
bank-term-deposit-prediction/
├── backend/
│   └── app/
├── data/
│   ├── raw/
│   └── processed/
├── frontend/
├── models/
│   └── bank_term_deposit_pipeline.joblib
├── notebooks/
│   ├── 01_data_understanding.ipynb
│   ├── 02_eda.ipynb
│   ├── 03_preprocessing.ipynb
│   └── 04_model_training.ipynb
├── reports/
│   └── figures/
├── screenshots/
├── src/
│   └── bank_marketing/
├── tests/
├── requirements.txt
└── README.md
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/pulkitn-analytics/bank-term-deposit-prediction.git
cd bank-term-deposit-prediction
```

### 2. Create and activate a virtual environment

```bash
python -m venv .venv
```

Windows PowerShell:

```powershell
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Add the dataset

Place `bank-additional-full.csv` inside `data/raw/`.

### 5. Run the backend

```bash
uvicorn backend.app.main:app --reload
```

The API will be available at `http://127.0.0.1:8000`, with interactive documentation at `http://127.0.0.1:8000/docs`.

### 6. Run the frontend

Open a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

## Testing

Run backend API tests from the project root:

```bash
pytest -v
```

## Limitations

- Predictions are based on historical campaign data and may not generalize to every bank or customer population.
- The dataset is imbalanced, so accuracy alone is not sufficient to evaluate performance.
- The selected threshold represents a model evaluation trade-off, not a validated financial decision rule.
- The application is a portfolio project and should not be treated as a production banking decision system.

## Author

**Pulkit Narang**

[GitHub](https://github.com/pulkitn-analytics)