/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EmployeeFormState {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  employeeAge: number | string;
  experienceYears: number | string;
  position: string;
  salary: number | string;
  employeeCode: string;
}

export interface ParsedProfile {
  fullName: string;
  fullAddress: string;
  employeeInfo: string;
  experienceInfo: string;
  department: string;
  initials: string;
  details: string;
  heartSymbol: string;
  employeeCard: string;
  terminalOutput: string;
}

export const DEFAULT_EMPLOYEE: EmployeeFormState = {
  firstName: "Jane",
  lastName: "Doe",
  address: "742 Evergreen Terrace",
  apartment: "Apartment D4",
  employeeAge: 29,
  experienceYears: 6,
  position: "Senior Systems Engineer",
  salary: 8750,
  employeeCode: "DEV-2026-JD-001",
};

export const PRESET_EMPLOYEES: { label: string; data: EmployeeFormState }[] = [
  {
    label: "Jane Doe (Dev)",
    data: {
      firstName: "Jane",
      lastName: "Doe",
      address: "742 Evergreen Terrace",
      apartment: "Apartment D4",
      employeeAge: 29,
      experienceYears: 6,
      position: "Senior Systems Engineer",
      salary: 8750,
      employeeCode: "DEV-2026-JD-001",
    },
  },
  {
    label: "Alex Smith (Eng)",
    data: {
      firstName: "Alex",
      lastName: "Smith",
      address: "10880 Wilshire Boulevard",
      apartment: "Suite 1400",
      employeeAge: 34,
      experienceYears: 10,
      position: "Infrastructure Architect",
      salary: 11200,
      employeeCode: "ENG-2026-AS-042",
    },
  },
  {
    label: "Elena Watson (Mkt)",
    data: {
      firstName: "Elena",
      lastName: "Watson",
      address: "450 Lexington Avenue",
      apartment: "Floor 9B",
      employeeAge: 27,
      experienceYears: 4,
      position: "Product Marketing Lead",
      salary: 7400,
      employeeCode: "MKT-2026-EW-015",
    },
  },
  {
    label: "Brian Lee (HRM)",
    data: {
      firstName: "Brian",
      lastName: "Lee",
      address: "350 5th Avenue",
      apartment: "Apt 22C",
      employeeAge: 31,
      experienceYears: 7,
      position: "People Operations Manager",
      salary: 6900,
      employeeCode: "HRM-2026-BL-007",
    },
  },
];

export function computeProfile(form: EmployeeFormState): ParsedProfile {
  const firstName = form.firstName.trim();
  const lastName = form.lastName.trim();
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Unnamed Employee";

  const rawAddress = form.address.trim();
  const rawApartment = form.apartment.trim();
  let fullAddress = rawAddress;
  if (rawApartment) {
    fullAddress = rawAddress ? `${rawAddress}, ${rawApartment}` : rawApartment;
  }
  if (!fullAddress) {
    fullAddress = "Address not specified";
  }

  const age = form.employeeAge !== "" ? Number(form.employeeAge) : 0;
  const expYears = form.experienceYears !== "" ? Number(form.experienceYears) : 0;
  const position = form.position.trim() || "Unassigned Position";
  const salary = form.salary !== "" ? Number(form.salary) : 0;

  const employeeInfo = `${fullName} is ${age} years old`;
  const experienceInfo = `experience: ${expYears} years`;

  // Python equivalent slicing:
  // department = employee_code[0:3]
  // initials = employee_code[9:11]
  const code = form.employeeCode.trim();
  const department = code.length >= 3 ? code.slice(0, 3) : code || "N/A";
  const initials = code.length >= 11 ? code.slice(9, 11) : code.length > 9 ? code.slice(9) : "??";
  const details = `${department} ${initials}`.trim();

  const heartSymbol = "\u2665"; // ♥
  const employeeCard = `employee: ${fullName} | Age: ${age} | Position: ${position} | Salary $${salary}`;

  // Exact Python print output recreation:
  const divider = "=".repeat(40);
  const terminalOutput = `${divider}
--- ${heartSymbol} Employee Profile Card ${heartSymbol} ---
Department and initials: ${details}
Bio Summary:             ${employeeInfo}
Address Details:         ${fullAddress}
Work Experience:         ${experienceInfo}
System Digital Card:     ${employeeCard}
${divider}`;

  return {
    fullName,
    fullAddress,
    employeeInfo,
    experienceInfo,
    department,
    initials,
    details,
    heartSymbol,
    employeeCard,
    terminalOutput,
  };
}
