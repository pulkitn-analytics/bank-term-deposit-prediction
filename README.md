<!-- ==================== HEADER ==================== -->

<div align="center">

# BankSight

### Bank Term Deposit Intelligence

**An End-to-End Machine Learning Application for Predicting Customer Term Deposit Subscriptions**

<br/>

<a href="https://bank-term-deposit-prediction-tau.vercel.app">
  <img src="https://img.shields.io/badge/LIVE%20APPLICATION-Visit%20Demo-16A34A?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Application"/>
</a>
<a href="https://bank-term-deposit-api-z7b5.onrender.com">
  <img src="https://img.shields.io/badge/BACKEND-API-2563EB?style=for-the-badge&logo=fastapi&logoColor=white" alt="Backend API"/>
</a>
<a href="https://bank-term-deposit-api-z7b5.onrender.com/docs">
  <img src="https://img.shields.io/badge/API-DOCUMENTATION-7C3AED?style=for-the-badge&logo=swagger&logoColor=white" alt="API Documentation"/>
</a>

<br/><br/>

<img src="https://img.shields.io/badge/Python-3.12-3776AB?style=flat&logo=python&logoColor=white" alt="Python"/>
<img src="https://img.shields.io/badge/Scikit--learn-ML-F7931E?style=flat&logo=scikitlearn&logoColor=white" alt="Scikit-learn"/>
<img src="https://img.shields.io/badge/FastAPI-Backend-009688?style=flat&logo=fastapi&logoColor=white" alt="FastAPI"/>
<img src="https://img.shields.io/badge/Next.js-Frontend-000000?style=flat&logo=nextdotjs&logoColor=white" alt="Next.js"/>
<img src="https://img.shields.io/badge/React-UI-61DAFB?style=flat&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/TypeScript-Language-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript"/>
<img src="https://img.shields.io/badge/Render-Deployment-46E3B7?style=flat&logo=render&logoColor=black" alt="Render"/>
<img src="https://img.shields.io/badge/Vercel-Deployment-000000?style=flat&logo=vercel&logoColor=white" alt="Vercel"/>

</div>

---

## Contents

- [Project Overview](#-project-overview)
- [Business Problem](#-business-problem)
- [Dataset](#-dataset)
- [Exploratory Data Analysis](#-exploratory-data-analysis)
- [Machine Learning Workflow](#-machine-learning-workflow)
- [Model Development](#-model-development)
- [Model Performance](#-model-performance)
- [Application Architecture](#-application-architecture)
- [API Endpoints](#-api-endpoints)
- [Technology Stack](#-technology-stack)
- [Project Structure](#-project-structure)
- [Local Setup](#-local-setup)
- [Testing](#-testing)
- [Limitations](#-limitations)
- [Author](#-author)

---

## 🎯 Project Overview

**BankSight** is an end-to-end machine learning project designed to predict whether a bank customer is likely to subscribe to a term deposit following a marketing campaign.

The project brings together data analysis, feature engineering, machine learning, model evaluation, backend API development, and an interactive web application.

Rather than stopping at model training in a notebook, the selected model is integrated into a deployed application where users can submit customer information and obtain a prediction.

## 💡 Business Problem

Banks conduct marketing campaigns to encourage customers to subscribe to term deposits. However, contacting every customer can be resource-intensive.

The objective is to build a classification model that identifies customers with a higher likelihood of subscribing, helping make campaign targeting more informed.

The model focuses on identifying positive subscription cases while considering the trade-off between precision and recall.

## 📊 Dataset

The project uses the **Bank Marketing dataset** from the UCI Machine Learning Repository.

| Dataset Attribute | Details |
|---|---|
| Source | UCI Machine Learning Repository |
| File | `bank-additional-full.csv` |
| Original records | 41,188 |
| Records after duplicate removal | 41,176 |
| Input features | 19 |
| Target variable | `y` |
| Problem type | Binary Classification |

**Target distribution:**

- `no` — 88.73%
- `yes` — 11.27%

The dataset is imbalanced, making recall, precision, F1-score, and PR-AUC important evaluation measures alongside accuracy.

The raw dataset is intentionally not included in this repository. It should be placed inside `data/raw/` before running the notebooks.

## 🔎 Exploratory Data Analysis

The exploratory analysis examines customer demographics, campaign characteristics, previous contact history, and subscription patterns.

Key areas include:

- Distribution of customer and campaign attributes.
- Subscription patterns across categorical and numerical features.
- Class imbalance in the target variable.
- Relationships between previous campaign contacts and subscription outcomes.
- Special handling of `pdays = 999`, which represents customers who were not previously contacted.

**Target leakage consideration:** The `duration` feature was excluded from the primary model because call duration is only known after the call has taken place. Using it would introduce information that would not be available at the time of pre-call targeting.

## ⚙️ Machine Learning Workflow

<div align="center">

| Stage | Process |
|:---:|---|
| **01** | Data Understanding |
| **02** | Exploratory Data Analysis |
| **03** | Data Cleaning & Preprocessing |
| **04** | Feature Engineering |
| **05** | Model Training & Cross-Validation |
| **06** | Threshold Evaluation & Selection |
| **07** | Model Serialization |
| **08** | API Integration & Deployment |

</div>

### Data Preprocessing & Feature Engineering

- Removed 12 exact duplicate records.
- Used stratified train-test splitting with an 80:20 ratio.
- Applied median imputation and standard scaling to numerical features.
- Applied most-frequent imputation and one-hot encoding to categorical features.
- Engineered `pdays_contact_recorded` to capture previous contact history.
- Replaced the special `pdays = 999` marker with a missing value for preprocessing.
- Used a scikit-learn pipeline to combine preprocessing and classification.

## 🤖 Model Development

The following classification algorithms were evaluated:

| Model | Evaluation |
|---|---|
| Dummy Classifier | Baseline |
| Logistic Regression | Standard and class-weight balanced |
| Decision Tree | Standard and class-weight balanced |
| Random Forest | Standard and class-weight balanced |
| Gradient Boosting | Standard |

Class-weight balancing was explored to address the imbalanced target distribution.

**Selected classifier: Balanced Logistic Regression**

A decision threshold of **0.55** was selected as a recall-oriented precision-recall compromise. It retained recall above 60% while improving the F1-score compared with the default 0.50 threshold.

The threshold was selected based on model evaluation rather than a validated business-profit optimization.

## 📈 Model Performance

The final selected pipeline was evaluated on the held-out test set using a decision threshold of 0.55.

<div align="center">

| Metric | Test Score |
|:---:|:---:|
| **Accuracy** | **84.65%** |
| **Precision (Yes)** | **38.87%** |
| **Recall (Yes)** | **63.25%** |
| **F1-score (Yes)** | **48.15%** |
| **ROC-AUC** | **0.8001** |
| **PR-AUC** | **0.4459** |

</div>

### Confusion Matrix

| Actual / Predicted | No | Yes |
|:---:|---:|---:|
| **No** | 6,385 | 923 |
| **Yes** | 341 | 587 |

**Interpretation:** The model identifies approximately 63% of actual subscribers in the test set. Its lower positive-class precision indicates that some customers predicted as subscribers do not ultimately subscribe.

The selected threshold therefore reflects a recall-oriented trade-off, not a guarantee of campaign profitability.

## 🏗️ Application Architecture

The trained machine learning pipeline is integrated into a web application through a FastAPI backend.

<div align="center">

**User Input**

⬇

**Next.js + React Frontend**

⬇

**FastAPI REST API**

⬇

**Feature Processing & Scikit-learn Pipeline**

⬇

**Subscription Prediction & Probability**

⬇

**Prediction Result in Web Interface**

</div>

### Application Components

**1. Machine Learning Pipeline**

- Serialized using Joblib.
- Includes preprocessing and the selected classifier.
- Applies the engineered feature logic and selected decision threshold.

**2. Backend — FastAPI**

- Loads the trained pipeline.
- Validates incoming customer and campaign data.
- Exposes prediction and health-check endpoints.
- Returns prediction results through a REST API.

**3. Frontend — BankSight**

- Built using Next.js, React, TypeScript, and Tailwind CSS.
- Provides an interface for entering customer and campaign information.
- Communicates with the backend API.
- Displays the resulting subscription prediction.

**Deployment:** Frontend hosted on Vercel; backend hosted on Render.

## 🔌 API Endpoints

| Method | Endpoint | Description |
|:---:|---|---|
| GET | `/` | API welcome message |
| GET | `/health` | API and model health check |
| POST | `/predict` | Generate a subscription prediction |

Interactive API documentation is available through the deployed [Swagger UI](https://bank-term-deposit-api-z7b5.onrender.com/docs).

## 🧰 Technology Stack

<div align="center">

**Data Analysis & Machine Learning**

<img src="https://skillicons.dev/icons?i=python" alt="Python" height="42"/>
<img src="https://skillicons.dev/icons?i=pandas" alt="Pandas" height="42"/>
<img src="https://skillicons.dev/icons?i=sklearn" alt="Scikit-learn" height="42"/>
<img src="https://skillicons.dev/icons?i=jupyter" alt="Jupyter" height="42"/>

**Backend Development**

<img src="https://skillicons.dev/icons?i=fastapi" alt="FastAPI" height="42"/>
<img src="https://skillicons.dev/icons?i=python" alt="Python" height="42"/>

**Frontend Development**

<img src="https://skillicons.dev/icons?i=nextjs,react,typescript,tailwind" alt="Frontend technologies" height="42"/>

**Deployment & Version Control**

<img src="https://skillicons.dev/icons?i=vercel,git,github" alt="Deployment and version control" height="42"/>

</div>

## 📁 Project Structure

```text
bank-term-deposit-prediction/
│
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   └── schemas.py
│   └── requirements.txt
│
├── data/
│   ├── raw/
│   └── processed/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   └── app/
│   ├── package.json
│   └── package-lock.json
│
├── models/
│   └── bank_term_deposit_pipeline.joblib
│
├── notebooks/
│   ├── 01_data_understanding.ipynb
│   ├── 02_eda.ipynb
│   ├── 03_preprocessing.ipynb
│   └── 04_model_training.ipynb
│
├── reports/
│   └── figures/
│
├── src/
│   └── bank_marketing/
│
├── tests/
│   └── test_api.py
│
├── .gitignore
├── .python-version
├── requirements.txt
└── README.md
```

## 🚀 Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/pulkitn-analytics/bank-term-deposit-prediction.git
cd bank-term-deposit-prediction
```

### 2. Create and activate a virtual environment

```bash
python -m venv .venv
```

**Windows PowerShell:**

```powershell
.\.venv\Scripts\Activate.ps1
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Add the dataset

Place `bank-additional-full.csv` inside:

```text
data/raw/
```

### 5. Start the backend

From the project root:

```bash
uvicorn backend.app.main:app --reload
```

Backend runs at `http://127.0.0.1:8000`.

API documentation: `http://127.0.0.1:8000/docs`

### 6. Start the frontend

Open a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

Configure the frontend's backend API URL according to the application's environment configuration before running it locally.

## 🧪 Testing

Backend API tests are implemented using Pytest and FastAPI TestClient.

Run from the project root:

```bash
pytest -v
```

The API test suite covers valid predictions, missing required fields, and optional macroeconomic inputs.

## ⚠️ Limitations & Considerations

- The model is trained on historical bank marketing data and may not generalize to different customer populations or campaign conditions.
- The target variable is imbalanced; accuracy alone does not adequately represent positive-class performance.
- The selected decision threshold is an evaluation-based trade-off, not a validated business decision rule.
- Predictions are probabilistic estimates and should not be interpreted as guaranteed customer behavior.
- This is a portfolio project, not a production banking decision system.

---

<div align="center">

### Built by Pulkit Narang

**Data Science | Machine Learning | AI Applications**

[GitHub Profile](https://github.com/pulkitn-analytics) · [Project Repository](https://github.com/pulkitn-analytics/bank-term-deposit-prediction)

</div>