
# 💊 Drug Safety Checker

An AI agent built on the **Model Context Protocol (MCP)** that helps catch counterfeit medicines and dangerous drug interactions — before they reach the patient.

Built for ** Agentic AI Hackathon 2026 — HealthTech & Life Sciences Track**

---

## 🚩 The Problem

Two everyday risks in healthcare rarely get checked in real time:

1. **Counterfeit or mislabeled drugs.** Medicines are sometimes sold under legitimate brand names but with altered or incorrect active ingredient compositions — a risk that's difficult for patients (and even pharmacists) to catch by eye.
2. **Dangerous drug interactions.** Patients often take multiple medicines prescribed by different doctors, and no single person always checks whether those combinations are safe together.

**Drug Safety Checker** is an MCP-powered agent that automates both checks and explains the result in plain, friendly language.

---

## ✅ What It Does

Given one or more drugs (by active ingredient and strength), the agent:

1. **Verifies authenticity** — checks the drug's composition against a dataset of approved formulations. If no match is found, it flags the product as a possible counterfeit or unapproved formulation and recommends pharmacist verification.
2. **Checks interactions** — cross-checks all active ingredients against a dataset of known dangerous drug pairs, flagging any risky combinations with a severity level and recommendation.
3. **Summarizes safety** — combines both results into a single, clear, human-readable safety report.

### Example

**Input:** `Ibuprofen 400mg + Paracetamol 325mg`, checked alongside `Aspirin`

**Output:**
> ⚠️ **Not Authentic** — This formulation was not found in our approved drug registry. This could indicate a counterfeit or unapproved product.
>
> 🚨 **High-Severity Interaction Found** — Ibuprofen and Aspirin should not be used together. Combined use significantly increases the risk of gastrointestinal bleeding and ulcers.
>
> **Recommendation:** Consult a healthcare provider before use.

---

## 🛠️ How It Works

Built as an MCP server with the following tools:

| Tool | Function |
|---|---|
| `check-authenticity` | Compares a drug's active ingredients + strength against an approved formulations dataset |
| `get-drug-details` | Returns full formulation details for a matched drug |
| `check-interactions` | Checks all ingredient pairs from a given drug list against a known interactions dataset |
| `summarize-safety` | Combines authenticity + interaction results into one clear safety report |

**Tech stack:** MCP server (TypeScript), built and orchestrated using [NitroStudio](https://nitrostack.dev), with an AI agent layer (Claude) handling natural-language reasoning over tool outputs.

---

## ⚠️ Important Disclaimers

- **This is a hackathon prototype, not a medical device.** It does not diagnose, prescribe, or replace professional medical advice.
- **The drug and interaction data used here is a mocked/sample dataset**, built to demonstrate the concept. In a production version, the authenticity dataset would connect to an official regulatory registry (e.g. India's CDSCO), and the interaction dataset would draw from a verified clinical drug-interaction database.
- All outputs are intended as a **flag for review**, not a final medical determination — every warning explicitly recommends consulting a doctor or pharmacist.

---

## 🚀 Future Scope

- **Image/OCR input** — allow users to photograph medicine packaging instead of typing ingredients, improving accessibility for users less comfortable with text input.
- **Live registry integration** — connect to real government drug-approval databases instead of a static mock dataset.
- **Expanded interaction database** — scale beyond the current sample pairs to a comprehensive, clinically-sourced interaction set.
- **Batch/report upload** — allow users to check an entire prescription at once.

---

## 👥 Team

| Name | Role |
|---|---|
| [ Kusuma Sasapu ] | Authenticity Checker — tool logic & dataset |
| [ Thanmai Mathi ] | Interaction Checker — tool logic & dataset |
| [ Chathurya Singuru ] | Safety Summary & Report Widget |
| [ Neekshitha Cheevuru ] | Testing, QA & Documentation |

---

## 🎯 Track

**HealthTech & Life Sciences** — this project directly addresses patient safety through automated, agentic drug verification and interaction screening.
