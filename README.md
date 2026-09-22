#  Employee Profile Card Generator

An interactive command-line Python application that captures comprehensive employee onboarding metrics and generates a dynamically structured corporate digital profile badge.

##  Features
* **Interactive Data Capturing:** Prompts users for essential personal details, workplace address, career metrics, and salary data.
* **String Slicing Architecture:** Parses complex structured system codes (e.g., `DEV-2026-JD-001`) automatically to extract the **Department** and employee **Initials**.
* **Visual Card Layout:** Consolidates multi-type variables using Python f-strings and incorporates Unicode styling (`\u2665`) for a clean terminal interface.
* **Address Modification:** Automatically appends apartment designations to the core street information seamlessly.

##  How It Works
1. Run the script in your terminal environment.
2. Complete the onboarding prompts regarding the employee's name, age, experience, and structural system code.
3. The system slices data attributes from the system code and generates a standardized, boxed visual summary terminal profile card.

## Terminal Output Structure
The application generates a cleanly structured profile component identical to this layout:
```text
========================================
--- ♥ Employee Profile Card ♥ ---
Department and initials: DEV JD
Bio Summary: Jane Doe is 28 years old
Address Details: 123 Main St, Apartment D4
Work Experience: experience: 5 years
System Digital Card: employee: Jane Doe | Age: 28 | Position: Developer | Salary \$5000
========================================
```

##  Built With
* **Python 3** (Standard internal libraries)

##  Installation & Running Locally
To test this program on your machine, clone your repository and fire up the python terminal file:

```bash
# Clone the repository
git clone https://github.com

# Navigate into the project folder
cd employee-card-generator

# Run the card generator script
python employee_generator.py
```
