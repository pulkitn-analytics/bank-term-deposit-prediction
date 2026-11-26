# Bank Term Deposit Prediction - Backend

## Overview

The backend is built using FastAPI and serves predictions through the trained machine learning pipeline.

## Model Integration

- Loads the serialized Scikit-learn pipeline using Joblib.
- Applies the same feature engineering used during model training.
- Uses balanced Logistic Regression as the selected classifier.
- Applies a decision threshold of 0.55.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | API welcome message |
| GET | `/health` | Check API and model status |
| POST | `/predict` | Generate a subscription prediction |

## Input Processing

The API accepts 19 customer and campaign features.

It automatically creates the engineered `pdays_contact_recorded` feature and handles the special `pdays = 999` value.

## Testing

API tests are implemented using Pytest and FastAPI TestClient.

Run the tests from the project root:

```bash
pytest -v
```

## Local Development

Start the API from the project root:

```bash
uvicorn backend.app.main:app --reload
```

Swagger documentation is available at `/docs` while the local server is running.
