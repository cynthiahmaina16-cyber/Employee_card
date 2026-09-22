/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  User,
  MapPin,
  Briefcase,
  DollarSign,
  Hash,
  Sparkles,
  RotateCcw,
  Binary,
} from "lucide-react";
import { EmployeeFormState, PRESET_EMPLOYEES, DEFAULT_EMPLOYEE } from "../types";

interface EmployeeFormProps {
  form: EmployeeFormState;
  onChange: (updated: EmployeeFormState) => void;
  onReset: () => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  form,
  onChange,
  onReset,
}) => {
  const updateField = (field: keyof EmployeeFormState, value: string | number) => {
    onChange({
      ...form,
      [field]: value,
    });
  };

  const codeChars = form.employeeCode.split("");

  return (
    <div id="employee-form-container" className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 lg:p-7 space-y-6">
      {/* Header & Quick Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
        <div>
          <h2 id="form-heading" className="text-xl font-bold text-stone-900 tracking-tight">
            Employee Data Input
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Configure employee attributes to generate the profile card
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="reset-form-btn"
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            title="Reset to default data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Preset Pills */}
      <div>
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-2">
          Sample Profiles
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_EMPLOYEES.map((preset) => {
            const isSelected =
              preset.data.firstName === form.firstName &&
              preset.data.lastName === form.lastName;
            return (
              <button
                key={preset.label}
                id={`preset-btn-${preset.label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                type="button"
                onClick={() => onChange({ ...preset.data })}
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-stone-900 text-stone-50 border-stone-900 shadow-xs"
                    : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label htmlFor="input-first-name" className="block text-xs font-semibold text-stone-700 mb-1.5">
              First Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="input-first-name"
                type="text"
                value={form.firstName}
                onChange={(e) => updateField("firstName", e.target.value)}
                placeholder="e.g. Jane"
                className="w-full pl-9 pr-3 py-2 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="input-last-name" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Last Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="input-last-name"
                type="text"
                value={form.lastName}
                onChange={(e) => updateField("lastName", e.target.value)}
                placeholder="e.g. Doe"
                className="w-full pl-9 pr-3 py-2 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Address & Apartment */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="sm:col-span-2">
            <label htmlFor="input-street-address" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Street Address
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="input-street-address"
                type="text"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="e.g. 742 Evergreen Terrace"
                className="w-full pl-9 pr-3 py-2 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="input-apartment-number" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Apartment Number
            </label>
            <input
              id="input-apartment-number"
              type="text"
              value={form.apartment}
              onChange={(e) => updateField("apartment", e.target.value)}
              placeholder="e.g. Apartment D4"
              className="w-full px-3 py-2 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Position & Salary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label htmlFor="input-job-title" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Job Title / Position
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="input-job-title"
                type="text"
                value={form.position}
                onChange={(e) => updateField("position", e.target.value)}
                placeholder="e.g. Senior Systems Engineer"
                className="w-full pl-9 pr-3 py-2 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="input-monthly-salary" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Monthly Salary ($)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="input-monthly-salary"
                type="number"
                min="0"
                value={form.salary}
                onChange={(e) => updateField("salary", e.target.value)}
                placeholder="e.g. 8750"
                className="w-full pl-9 pr-3 py-2 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Age & Experience Years */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label htmlFor="input-employee-age" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Employee Age (Years)
            </label>
            <input
              id="input-employee-age"
              type="number"
              min="16"
              max="100"
              value={form.employeeAge}
              onChange={(e) => updateField("employeeAge", e.target.value)}
              placeholder="e.g. 29"
              className="w-full px-3 py-2 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label htmlFor="input-experience-years" className="block text-xs font-semibold text-stone-700 mb-1.5">
              Years of Experience
            </label>
            <input
              id="input-experience-years"
              type="number"
              min="0"
              max="60"
              value={form.experienceYears}
              onChange={(e) => updateField("experienceYears", e.target.value)}
              placeholder="e.g. 6"
              className="w-full px-3 py-2 text-sm text-stone-900 bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Structural System Code */}
        <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="input-system-code" className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
              <Hash className="w-3.5 h-3.5 text-stone-500" />
              Structural System Code (e.g. DEV-2026-JD-001)
            </label>
            <span className="text-[11px] font-mono text-stone-500">
              Length: {form.employeeCode.length}
            </span>
          </div>

          <input
            id="input-system-code"
            type="text"
            value={form.employeeCode}
            onChange={(e) => updateField("employeeCode", e.target.value.toUpperCase())}
            placeholder="DEV-2026-JD-001"
            className="w-full px-3.5 py-2 font-mono text-sm tracking-wide text-stone-900 bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-400 transition-all uppercase"
          />

          {/* Slicing Visualizer */}
          <div className="pt-2 border-t border-stone-200/70">
            <div className="flex items-center gap-1 text-[11px] font-medium text-stone-600 mb-1.5">
              <Binary className="w-3.5 h-3.5 text-stone-400" />
              <span>Python Slice Decoder:</span>
            </div>

            <div className="flex flex-wrap gap-1 font-mono text-xs">
              {codeChars.map((char, index) => {
                const isDept = index >= 0 && index < 3;
                const isInitials = index >= 9 && index < 11;
                return (
                  <div
                    key={index}
                    className={`flex flex-col items-center px-1.5 py-0.5 rounded border transition-colors ${
                      isDept
                        ? "bg-amber-100/70 border-amber-300 text-amber-900 font-bold"
                        : isInitials
                        ? "bg-emerald-100/70 border-emerald-300 text-emerald-900 font-bold"
                        : "bg-white border-stone-200 text-stone-500"
                    }`}
                  >
                    <span>{char === " " ? "␣" : char}</span>
                    <span className="text-[9px] text-stone-400 font-normal">{index}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-2.5 text-[11px]">
              <div className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span className="text-stone-700">
                  <strong className="font-mono">[0:3]</strong> Department:{" "}
                  <code className="font-bold text-amber-800 bg-amber-50 px-1 py-0.5 rounded border border-amber-200">
                    {form.employeeCode.slice(0, 3) || "—"}
                  </code>
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span className="text-stone-700">
                  <strong className="font-mono">[9:11]</strong> Initials:{" "}
                  <code className="font-bold text-emerald-800 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">
                    {form.employeeCode.slice(9, 11) || "—"}
                  </code>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
