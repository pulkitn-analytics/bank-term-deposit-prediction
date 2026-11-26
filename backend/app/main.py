from pathlib import Path

import os
import joblib
import pandas as pd

from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from backend.app.schemas import CustomerInput


# Project and model paths
PROJECT_ROOT = Path(__file__).resolve().parents[2]

MODEL_PATH = (
    PROJECT_ROOT
    / "models"
    / "bank_term_deposit_pipeline.joblib"
)


# Load saved model artifact
saved_artifact = joblib.load(MODEL_PATH)

model = saved_artifact["model"]
threshold = saved_artifact["threshold"]


# Initialize FastAPI
app = FastAPI(
    title="Bank Term Deposit Prediction API",
    description="API for predicting bank term deposit subscriptions",
    version="1.0.0"
)
frontend_url = os.getenv("FRONTEND_URL")

allowed_origins=[
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://bank-term-deposit-prediction-tau.vercel.app",
]

if frontend_url:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Bank Term Deposit Prediction API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "model_loaded": True
    }

@app.post("/predict")
def predict_subscription(customer: CustomerInput):

    # Convert validated input into a dictionary
    input_data = customer.model_dump()

    # Convert API field names to original dataset column names
    input_data["emp.var.rate"] = input_data.pop("emp_var_rate")
    input_data["cons.price.idx"] = input_data.pop("cons_price_idx")
    input_data["cons.conf.idx"] = input_data.pop("cons_conf_idx")
    input_data["nr.employed"] = input_data.pop("nr_employed")
    
    # Create DataFrame
    input_df = pd.DataFrame([input_data])

    # Reproduce feature engineering from preprocessing
    input_df["pdays_contact_recorded"] = (
        input_df["pdays"] != 999
    ).astype(int)

    input_df["pdays"] = input_df["pdays"].replace(999, float("nan"))

    # Generate subscription probability
    probabilities = model.predict_proba(input_df)

    positive_index = list(model.classes_).index("yes")

    yes_probability = probabilities[0, positive_index]

    # Apply the selected decision threshold
    prediction = (
        "yes" if yes_probability >= threshold else "no"
    )

    return {
        "predicted_subscription": prediction,
        "subscription_probability": round(float(yes_probability), 4),
        "decision_threshold": threshold
    }