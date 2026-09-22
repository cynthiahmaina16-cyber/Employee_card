/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import {
  IdCard,
  Terminal,
  Columns3,
  Heart,
  FileCode2,
  Check,
  Copy,
  Info,
} from "lucide-react";
import {
  EmployeeFormState,
  DEFAULT_EMPLOYEE,
  computeProfile,
} from "./types";
import { EmployeeForm } from "./components/EmployeeForm";
import { EmployeeCardView } from "./components/EmployeeCardView";
import { ConsoleOutputView } from "./components/ConsoleOutputView";

type ActiveTab = "card" | "terminal" | "split";

export default function App() {
  const [form, setForm] = useState<EmployeeFormState>(DEFAULT_EMPLOYEE);
  const [activeTab, setActiveTab] = useState<ActiveTab>("card");
  const [showScriptModal, setShowScriptModal] = useState<boolean>(false);
  const [copiedScript, setCopiedScript] = useState<boolean>(false);

  const profile = useMemo(() => computeProfile(form), [form]);

  const handleReset = () => {
    setForm(DEFAULT_EMPLOYEE);
  };

  const pythonSourceCode = `first_name = input("Enter employee's first name: ")
last_name = input("Enter employee's last name: ")
full_name = first_name + ' ' + last_name

address = input("Enter street address: ")
apartment = input("Enter apartment number (e.g., Apartment D4): ")
address += ', ' + apartment

employee_age = int(input("Enter employee age: "))
experience_years = int(input("Enter years of experience: "))
position = input("Enter job title: ")
salary = int(input("Enter monthly salary ($): "))

employee_info = full_name + ' is ' + str(employee_age) + ' years old'
experience_info = 'experience: ' + str(experience_years) + ' years'

employee_code = input("Enter structural system code (e.g., DEV-2026-JD-001): ")
department = employee_code[0:3]
initials = employee_code[9:11]
details = department + ' ' + initials

heart_symbol = '\\u2665' 
employee_card = f'employee: {full_name} | Age: {employee_age} | Position: {position} | Salary \${salary}'

print("\\n" + "="*40)
print(f'--- {heart_symbol} Employee Profile Card {heart_symbol} ---')
print(f'Department and initials: {details}')
print(f'Bio Summary:             {employee_info}')
print(f'Address Details:         {address}')
print(f'Work Experience:         {experience_info}')
print(f'System Digital Card:     {employee_card}')
print("="*40 + "\\n")

input("Press Enter to close the application...")`;

  const copyScript = () => {
    navigator.clipboard.writeText(pythonSourceCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-stone-900 pb-16">
      {/* Top Header */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center shadow-xs">
              <IdCard className="w-5 h-5 text-stone-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-bold text-stone-900 tracking-tight">
                  Employee Profile Card
                </h1>
                <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                Interactive Profile Generator & System Code Parser
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="view-python-script-btn"
              type="button"
              onClick={() => setShowScriptModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            >
              <FileCode2 className="w-3.5 h-3.5 text-stone-600" />
              <span className="hidden sm:inline">Source Python Logic</span>
              <span className="sm:hidden">Script</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Sub-bar with View Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h2 className="text-lg font-bold text-stone-900 tracking-tight">
              Profile Workspace
            </h2>
            <p className="text-xs text-stone-500">
              Live updates reflect directly on both the physical digital credential and terminal console
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="inline-flex p-1 bg-stone-200/80 rounded-xl self-start sm:self-auto border border-stone-300/60">
            <button
              id="tab-card-view-btn"
              type="button"
              onClick={() => setActiveTab("card")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "card"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <IdCard className="w-3.5 h-3.5" />
              <span>Digital Card</span>
            </button>

            <button
              id="tab-terminal-view-btn"
              type="button"
              onClick={() => setActiveTab("terminal")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "terminal"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal Output</span>
            </button>

            <button
              id="tab-split-view-btn"
              type="button"
              onClick={() => setActiveTab("split")}
              className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "split"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span>Split Preview</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Input (5 cols on large) */}
          <div className="lg:col-span-5">
            <EmployeeForm
              form={form}
              onChange={setForm}
              onReset={handleReset}
            />
          </div>

          {/* Right Column: Dynamic Preview based on Active Tab (7 cols on large) */}
          <div className="lg:col-span-7 space-y-6">
            {activeTab === "card" && (
              <EmployeeCardView profile={profile} form={form} />
            )}

            {activeTab === "terminal" && (
              <ConsoleOutputView profile={profile} form={form} />
            )}

            {activeTab === "split" && (
              <div className="space-y-6">
                <EmployeeCardView profile={profile} form={form} />
                <ConsoleOutputView profile={profile} form={form} />
              </div>
            )}

            {/* Quick Slicing Summary Callout */}
            <div className="p-4 bg-white rounded-xl border border-stone-200/80 text-xs text-stone-600 flex items-start gap-3 shadow-xs">
              <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-semibold text-stone-800">
                  Code Logic Mapping:
                </span>
                <p className="leading-relaxed text-stone-600">
                  <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-800">
                    employee_code[0:3]
                  </code>{" "}
                  extracts <strong>"{profile.department}"</strong> and{" "}
                  <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-800">
                    employee_code[9:11]
                  </code>{" "}
                  extracts initials <strong>"{profile.initials}"</strong>, producing{" "}
                  <strong>"{profile.details}"</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Source Python Code Modal */}
      {showScriptModal && (
        <div
          id="python-code-modal-backdrop"
          className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowScriptModal(false)}
        >
          <div
            id="python-code-modal"
            className="bg-stone-950 border border-stone-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-800 bg-stone-900">
              <div className="flex items-center gap-2 text-stone-200 text-sm font-semibold font-mono">
                <FileCode2 className="w-4 h-4 text-amber-400" />
                <span>Original Python Script</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyScript}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copiedScript ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-400" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowScriptModal(false)}
                  className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded hover:bg-stone-800 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>

            <pre className="p-5 font-mono text-xs text-stone-300 overflow-y-auto leading-relaxed whitespace-pre">
              {pythonSourceCode}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
