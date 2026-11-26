
"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type PredictionForm = {
  age: string;
  job: string;
  marital: string;
  education: string;
  default: string;
  housing: string;
  loan: string;
  contact: string;
  month: string;
  day_of_week: string;
  campaign: string;
  pdays: string;
  previous: string;
  poutcome: string;
  emp_var_rate: string;
  cons_price_idx: string;
  cons_conf_idx: string;
  euribor3m: string;
  nr_employed: string;
};

type Option = {
  label: string;
  value: string;
};

type PredictionResponse = {
  predicted_subscription: string | boolean;
  subscription_probability: number;
  decision_threshold: number;
};

const initialForm: PredictionForm = {
  age: "",
  job: "",
  marital: "",
  education: "",
  default: "",
  housing: "",
  loan: "",
  contact: "",
  month: "",
  day_of_week: "",
  campaign: "",
  pdays: "999",
  previous: "",
  poutcome: "",
  emp_var_rate: "",
  cons_price_idx: "",
  cons_conf_idx: "",
  euribor3m: "",
  nr_employed: "",
};

const jobOptions: Option[] = [
  { label: "Admin", value: "admin." },
  { label: "Blue Collar", value: "blue-collar" },
  { label: "Entrepreneur", value: "entrepreneur" },
  { label: "Housemaid", value: "housemaid" },
  { label: "Management", value: "management" },
  { label: "Retired", value: "retired" },
  { label: "Self Employed", value: "self-employed" },
  { label: "Services", value: "services" },
  { label: "Student", value: "student" },
  { label: "Technician", value: "technician" },
  { label: "Unemployed", value: "unemployed" },
  { label: "Unknown", value: "unknown" },
];

const educationOptions: Option[] = [
  { label: "Basic (4 years)", value: "basic.4y" },
  { label: "Basic (6 years)", value: "basic.6y" },
  { label: "Basic (9 years)", value: "basic.9y" },
  { label: "High School", value: "high.school" },
  { label: "Illiterate", value: "illiterate" },
  { label: "Professional Course", value: "professional.course" },
  { label: "University Degree", value: "university.degree" },
  { label: "Unknown", value: "unknown" },
];

const yesNoUnknown: Option[] = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Unknown", value: "unknown" },
];

const monthOptions: Option[] = [
  { label: "January", value: "jan" },
  { label: "February", value: "feb" },
  { label: "March", value: "mar" },
  { label: "April", value: "apr" },
  { label: "May", value: "may" },
  { label: "June", value: "jun" },
  { label: "July", value: "jul" },
  { label: "August", value: "aug" },
  { label: "September", value: "sep" },
  { label: "October", value: "oct" },
  { label: "November", value: "nov" },
  { label: "December", value: "dec" },
];

const dayOptions: Option[] = [
  { label: "Monday", value: "mon" },
  { label: "Tuesday", value: "tue" },
  { label: "Wednesday", value: "wed" },
  { label: "Thursday", value: "thu" },
  { label: "Friday", value: "fri" },
];

function Section({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#e1e8ec] bg-white p-6 shadow-sm md:p-8">
      <div className="mb-7 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f5f3] font-bold text-[#087f78]">
          {number}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#102b3f]">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  required = false,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#294354]">
        {label}
        {required && <span className="ml-1 text-[#159b91]">*</span>}
      </label>
      {children}
      {hint && (
        <p className="mt-1.5 text-xs leading-5 text-slate-500">{hint}</p>
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
  required = true,
  hint,
}: {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  required?: boolean;
  hint?: string;
}) {
  return (
    <Field label={label} required={required} hint={hint}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-[#dce5e9] bg-white px-4 py-3 text-sm text-[#294354] outline-none transition focus:border-[#159b91] focus:ring-2 focus:ring-[#159b91]/15"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}

function NumberField({
  label,
  value,
  onChange,
  hint,
  required = true,
  min,
  step = "1",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
  min?: number;
  step?: string;
}) {
  return (
    <Field label={label} required={required} hint={hint}>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        min={min}
        step={step}
        className="w-full rounded-xl border border-[#dce5e9] bg-white px-4 py-3 text-sm text-[#294354] outline-none transition focus:border-[#159b91] focus:ring-2 focus:ring-[#159b91]/15"
      />
    </Field>
  );
}

export default function Home() {
  const [form, setForm] = useState<PredictionForm>(initialForm);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField(field: keyof PredictionForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setPrediction(null);
    setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setError("");
    setPrediction(null);

    const numeric = (value: string) =>
      value.trim() === "" ? null : Number(value);

    const requestData = {
      age: Number(form.age),
      job: form.job,
      marital: form.marital,
      education: form.education,
      default: form.default,
      housing: form.housing,
      loan: form.loan,
      contact: form.contact,
      month: form.month,
      day_of_week: form.day_of_week,
      campaign: Number(form.campaign),
      pdays: Number(form.pdays),
      previous: Number(form.previous),
      poutcome: form.poutcome,
      emp_var_rate: numeric(form.emp_var_rate),
      cons_price_idx: numeric(form.cons_price_idx),
      cons_conf_idx: numeric(form.cons_conf_idx),
      euribor3m: numeric(form.euribor3m),
      nr_employed: numeric(form.nr_employed),
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "API URL is not configured. Please check frontend/.env.local."
        );
      }

      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const detail = responseData.detail;

        const message =
          typeof detail === "string"
            ? detail
            : "The prediction request was rejected. Please check the submitted information.";

        throw new Error(message);
      }

      if (
        typeof responseData.subscription_probability !== "number" ||
        typeof responseData.decision_threshold !== "number" ||
        !("predicted_subscription" in responseData)
      ) {
        throw new Error("The API returned an unexpected prediction response.");
      }

      setPrediction(responseData as PredictionResponse);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to connect to the prediction server."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function resetForm() {
    setForm(initialForm);
    setPrediction(null);
    setError("");
  }

  const isPositivePrediction =
    prediction !== null &&
    ["yes", "true"].includes(
      String(prediction.predicted_subscription).toLowerCase()
    );

  return (
    <main className="min-h-screen">
      <header className="bg-[#102b3f] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#159b91] text-xl font-bold">
              B
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-wide">BankSight</h1>
              <p className="text-xs tracking-wider text-slate-300">
                TERM DEPOSIT INTELLIGENCE
              </p>
            </div>
          </div>
          <span className="hidden rounded-full border border-white/20 px-4 py-2 text-xs text-slate-200 sm:block">
            MACHINE LEARNING APPLICATION
          </span>
        </div>
      </header>

      <div className="bg-[#102b3f] px-6 pb-14 pt-8 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#d4ad68]">
            CUSTOMER SUBSCRIPTION ANALYSIS
          </p>
          <h2 className="max-w-3xl text-3xl font-bold leading-tight md:text-4xl">
            Predict the likelihood of a term deposit subscription.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            Enter customer profile and campaign details to generate a
            machine learning prediction.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 md:px-6">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#102b3f]">
              Customer information
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Complete the required details to generate a prediction.
            </p>
          </div>
          <p className="text-xs text-slate-500">
            <span className="font-bold text-[#159b91]">*</span> Required fields
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Section
            number="01"
            title="Customer profile"
            description="Basic demographic and financial information."
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <NumberField
                label="Age"
                value={form.age}
                onChange={(v) => updateField("age", v)}
                min={18}
                hint="Customer's age in years."
              />
              <SelectField
                label="Job"
                value={form.job}
                onChange={(v) => updateField("job", v)}
                options={jobOptions}
              />
              <SelectField
                label="Marital status"
                value={form.marital}
                onChange={(v) => updateField("marital", v)}
                options={[
                  { label: "Married", value: "married" },
                  { label: "Single", value: "single" },
                  { label: "Divorced", value: "divorced" },
                  { label: "Unknown", value: "unknown" },
                ]}
              />
              <SelectField
                label="Education"
                value={form.education}
                onChange={(v) => updateField("education", v)}
                options={educationOptions}
              />
              <SelectField
                label="Credit in default"
                value={form.default}
                onChange={(v) => updateField("default", v)}
                options={yesNoUnknown}
                hint="Whether the customer has credit in default."
              />
              <SelectField
                label="Housing loan"
                value={form.housing}
                onChange={(v) => updateField("housing", v)}
                options={yesNoUnknown}
              />
              <SelectField
                label="Personal loan"
                value={form.loan}
                onChange={(v) => updateField("loan", v)}
                options={yesNoUnknown}
              />
            </div>
          </Section>

          <Section
            number="02"
            title="Campaign information"
            description="Details about the current and previous marketing campaigns."
          >
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <SelectField
                label="Contact method"
                value={form.contact}
                onChange={(v) => updateField("contact", v)}
                options={[
                  { label: "Cellular", value: "cellular" },
                  { label: "Telephone", value: "telephone" },
                ]}
              />
              <SelectField
                label="Last contact month"
                value={form.month}
                onChange={(v) => updateField("month", v)}
                options={monthOptions}
              />
              <SelectField
                label="Last contact day"
                value={form.day_of_week}
                onChange={(v) => updateField("day_of_week", v)}
                options={dayOptions}
              />
              <NumberField
                label="Campaign contacts"
                value={form.campaign}
                onChange={(v) => updateField("campaign", v)}
                min={1}
                hint="Number of contacts during the current campaign, including this contact."
              />
              <NumberField
                label="Days since previous contact"
                value={form.pdays}
                onChange={(v) => updateField("pdays", v)}
                min={0}
                hint="Enter 999 if the customer was not previously contacted."
              />
              <NumberField
                label="Previous campaign contacts"
                value={form.previous}
                onChange={(v) => updateField("previous", v)}
                min={0}
                hint="Number of contacts before the current campaign."
              />
              <SelectField
                label="Previous campaign outcome"
                value={form.poutcome}
                onChange={(v) => updateField("poutcome", v)}
                options={[
                  { label: "Success", value: "success" },
                  { label: "Failure", value: "failure" },
                  { label: "Nonexistent", value: "nonexistent" },
                ]}
              />
            </div>
          </Section>

          <Section
            number="03"
            title="Economic indicators"
            description="Optional macroeconomic information associated with the campaign."
          >
            <div className="mb-6 rounded-xl border border-[#d8ebe8] bg-[#f0f8f7] p-4">
              <p className="text-sm font-semibold text-[#087f78]">
                These five fields are optional
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                You can leave them blank. The prediction pipeline will handle
                missing values using its trained imputation process. Do not
                enter zero just to fill an empty field.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <NumberField
                label="Employment variation rate"
                value={form.emp_var_rate}
                onChange={(v) => updateField("emp_var_rate", v)}
                required={false}
                step="any"
                hint="Employment variation rate."
              />
              <NumberField
                label="Consumer price index"
                value={form.cons_price_idx}
                onChange={(v) => updateField("cons_price_idx", v)}
                required={false}
                step="any"
              />
              <NumberField
                label="Consumer confidence index"
                value={form.cons_conf_idx}
                onChange={(v) => updateField("cons_conf_idx", v)}
                required={false}
                step="any"
              />
              <NumberField
                label="Euribor 3-month rate"
                value={form.euribor3m}
                onChange={(v) => updateField("euribor3m", v)}
                required={false}
                step="any"
                hint="Three-month Euribor interest rate."
              />
              <NumberField
                label="Number of employees"
                value={form.nr_employed}
                onChange={(v) => updateField("nr_employed", v)}
                required={false}
                step="any"
                hint="Number of employees (as recorded in the dataset)."
              />
            </div>
          </Section>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={resetForm}
              disabled={isLoading}
              className="rounded-xl border border-[#dce5e9] bg-white px-6 py-3 text-sm font-semibold text-[#294354] transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Reset form
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-[#087f78] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#066b65] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Analyzing customer..." : "Generate prediction"}
              {!isLoading && <span className="ml-2">→</span>}
            </button>
          </div>
        </form>

        {isLoading && (
          <div className="mt-8 rounded-xl border border-[#dce5e9] bg-white p-6 text-center">
            <p className="font-semibold text-[#102b3f]">
              Analyzing customer information
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Your information is being processed by the machine learning model.
            </p>
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
            <h3 className="font-semibold text-red-800">
              Prediction failed
            </h3>
            <p className="mt-2 text-sm leading-6 text-red-700">{error}</p>
          </div>
        )}

        {prediction && (
          <section className="mt-8 rounded-2xl border border-[#dce5e9] bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-semibold tracking-[0.18em] text-[#087f78]">
              MODEL PREDICTION
            </p>

            <h3 className="mt-2 text-2xl font-bold text-[#102b3f]">
              Prediction result
            </h3>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div
                className={`rounded-xl border p-6 ${
                  isPositivePrediction
                    ? "border-[#b9ded8] bg-[#f0f8f7]"
                    : "border-[#e1e8ec] bg-[#f5f7f9]"
                }`}
              >
                <p className="text-sm text-slate-500">Predicted outcome</p>

                <h4 className="mt-3 text-2xl font-bold text-[#102b3f]">
                  {isPositivePrediction
                    ? "Likely to subscribe"
                    : "Unlikely to subscribe"}
                </h4>

                <p className="mt-2 text-xs text-slate-500">
                  Model classification at the configured decision threshold.
                </p>
              </div>

              <div className="rounded-xl border border-[#e1e8ec] bg-[#f8fafb] p-6">
                <p className="text-sm text-slate-500">
                  Subscription probability
                </p>

                <h4 className="mt-3 text-3xl font-bold text-[#159b91]">
                  {(prediction.subscription_probability * 100).toFixed(1)}%
                </h4>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-[#159b91]"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(
                          0,
                          prediction.subscription_probability * 100
                        )
                      )}%`,
                    }}
                  />
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Estimated probability of subscribing to a term deposit.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-[#f5f7f9] p-4">
              <p className="text-sm text-slate-600">
                Decision threshold:{" "}
                <strong className="text-[#102b3f]">
                  {(prediction.decision_threshold * 100).toFixed(0)}%
                </strong>
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                The model classifies a customer as likely to subscribe when
                the predicted probability meets or exceeds this threshold.
              </p>
            </div>

            <button
              type="button"
              onClick={resetForm}
              className="mt-6 rounded-xl border border-[#dce5e9] px-5 py-3 text-sm font-semibold text-[#294354] transition hover:bg-slate-50"
            >
              Make another prediction
            </button>
          </section>
        )}
      </div>

      <footer className="border-t border-[#e1e8ec] bg-white px-6 py-6 text-center text-xs text-slate-500">
        BankSight · Machine Learning Project · Bank Marketing Dataset
      </footer>
    </main>
  );
}
