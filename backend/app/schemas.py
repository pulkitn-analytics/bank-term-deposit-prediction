from pydantic import BaseModel, ConfigDict, Field


class CustomerInput(BaseModel):
    model_config = ConfigDict(extra="forbid")

    # Required customer information
    age: int = Field(description="Customer age in years")

    job: str = Field(
        description="Occupation: e.g. admin., technician, management, student"
    )

    marital: str = Field(
        description="Marital status: married, single, divorced, or unknown"
    )

    education: str = Field(
        description="Education level: e.g. university.degree, high.school, basic.9y"
    )

    default: str = Field(
        description="Whether the customer has credit in default: yes, no, or unknown"
    )

    housing: str = Field(
        description="Whether the customer has a housing loan: yes, no, or unknown"
    )

    loan: str = Field(
        description="Whether the customer has a personal loan: yes, no, or unknown"
    )

    contact: str = Field(
        description="Communication method: cellular or telephone"
    )

    month: str = Field(
        description="Month of the current campaign contact: jan to dec"
    )

    day_of_week: str = Field(
        description="Day of the current campaign contact: mon to fri"
    )

    campaign: int = Field(
        ge=1,
        description="Number of contacts during this campaign, including the current contact"
    )

    pdays: float = Field(
        ge=0,
        description="Days since the previous campaign contact; enter 999 if not previously contacted"
    )

    previous: int = Field(
        ge=0,
        description="Number of contacts made before the current campaign"
    )

    poutcome: str = Field(
        description="Previous campaign outcome: success, failure, or nonexistent"
    )

    # Optional macroeconomic indicators
    emp_var_rate: float | None = Field(
        default=None,
        description="Optional employment variation rate"
    )

    cons_price_idx: float | None = Field(
        default=None,
        description="Optional consumer price index"
    )

    cons_conf_idx: float | None = Field(
        default=None,
        description="Optional consumer confidence index"
    )

    euribor3m: float | None = Field(
        default=None,
        description="Optional Euribor 3-month interest rate"
    )

    nr_employed: float | None = Field(
        default=None,
        description="Optional number of employees"
    )