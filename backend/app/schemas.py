from pydantic import BaseModel, ConfigDict


class CustomerInput(BaseModel):

    model_config = ConfigDict(extra="forbid")

    age: int

    job: str
    marital: str
    education: str
    default: str
    housing: str
    loan: str
    contact: str
    month: str
    day_of_week: str
    poutcome: str

    campaign: int
    pdays: float
    previous: int

    emp_var_rate: float
    cons_price_idx: float
    cons_conf_idx: float
    euribor3m: float
    nr_employed: float