from fastapi.testclient import TestClient

from backend.app.main import app


client = TestClient(app)


sample_customer = {
    "age": 35,
    "job": "admin.",
    "marital": "married",
    "education": "university.degree",
    "default": "no",
    "housing": "yes",
    "loan": "no",
    "contact": "cellular",
    "month": "may",
    "day_of_week": "mon",
    "poutcome": "nonexistent",
    "campaign": 1,
    "pdays": 999,
    "previous": 0,
    "emp_var_rate": 1.1,
    "cons_price_idx": 93.994,
    "cons_conf_idx": -36.4,
    "euribor3m": 4.857,
    "nr_employed": 5191.0
}


def test_valid_prediction():

    response = client.post("/predict", json=sample_customer)

    assert response.status_code == 200

    result = response.json()

    assert result["predicted_subscription"] in ["yes", "no"]
    assert 0 <= result["subscription_probability"] <= 1
    assert result["decision_threshold"] == 0.55


def test_missing_required_field():

    invalid_customer = sample_customer.copy()
    invalid_customer.pop("age")

    response = client.post("/predict", json=invalid_customer)

    assert response.status_code == 422
    