/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Terminal, Copy, Check, Play, CornerDownLeft } from "lucide-react";
import { ParsedProfile, EmployeeFormState } from "../types";

interface ConsoleOutputViewProps {
  profile: ParsedProfile;
  form: EmployeeFormState;
}

export const ConsoleOutputView: React.FC<ConsoleOutputViewProps> = ({
  profile,
  form,
}) => {
  const [copied, setCopied] = useState(false);

  const copyFullTerminal = () => {
    navigator.clipboard.writeText(profile.terminalOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="console-output-container" className="bg-stone-900 rounded-2xl border border-stone-800 shadow-lg overflow-hidden text-stone-200">
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-stone-950/80 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <div className="flex items-center gap-2 ml-2 text-xs font-mono text-stone-400">
            <Terminal className="w-3.5 h-3.5 text-stone-400" />
            <span>python3 employee_card.py</span>
          </div>
        </div>

        <button
          id="copy-terminal-output-btn"
          type="button"
          onClick={copyFullTerminal}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-md bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-stone-400" />
              <span>Copy Output</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Body */}
      <div className="p-5 font-mono text-xs sm:text-sm space-y-4 overflow-x-auto leading-relaxed">
        {/* Python Input Prompts Simulation */}
        <div className="space-y-1 text-stone-400 pb-3 border-b border-stone-800/80">
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-stone-500">Enter employee's first name:</span>
            <span className="text-emerald-400 font-semibold">{form.firstName || "Jane"}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-stone-500">Enter employee's last name:</span>
            <span className="text-emerald-400 font-semibold">{form.lastName || "Doe"}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-stone-500">Enter street address:</span>
            <span className="text-emerald-400 font-semibold">{form.address || "742 Evergreen Terrace"}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-stone-500">Enter apartment number:</span>
            <span className="text-emerald-400 font-semibold">{form.apartment || "Apartment D4"}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-stone-500">Enter employee age:</span>
            <span className="text-cyan-300 font-semibold">{form.employeeAge || 29}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-stone-500">Enter years of experience:</span>
            <span className="text-cyan-300 font-semibold">{form.experienceYears || 6}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-stone-500">Enter job title:</span>
            <span className="text-emerald-400 font-semibold">{form.position || "Senior Systems Engineer"}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-stone-500">Enter monthly salary ($):</span>
            <span className="text-cyan-300 font-semibold">{form.salary || 8750}</span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className="text-stone-500">Enter structural system code:</span>
            <span className="text-amber-300 font-semibold">{form.employeeCode || "DEV-2026-JD-001"}</span>
          </div>
        </div>

        {/* The Exact Python Formatted Output */}
        <div className="space-y-1 bg-stone-950 p-4 rounded-xl border border-stone-800">
          <div className="text-stone-500 select-none">========================================</div>
          <div className="text-white font-bold flex items-center gap-1">
            <span>---</span>
            <span className="text-red-400">{profile.heartSymbol}</span>
            <span>Employee Profile Card</span>
            <span className="text-red-400">{profile.heartSymbol}</span>
            <span>---</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-3">
            <span className="text-stone-400 w-28 shrink-0">Department & initials:</span>
            <span className="text-amber-300 font-bold">{profile.details}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-3">
            <span className="text-stone-400 w-28 shrink-0">Bio Summary:</span>
            <span className="text-stone-200">{profile.employeeInfo}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-3">
            <span className="text-stone-400 w-28 shrink-0">Address Details:</span>
            <span className="text-stone-200">{profile.fullAddress}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-3">
            <span className="text-stone-400 w-28 shrink-0">Work Experience:</span>
            <span className="text-stone-200">{profile.experienceInfo}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-x-3">
            <span className="text-stone-400 w-28 shrink-0">System Digital Card:</span>
            <span className="text-emerald-300 break-all">{profile.employeeCard}</span>
          </div>
          <div className="text-stone-500 select-none">========================================</div>
        </div>

        {/* Exit Prompt */}
        <div className="flex items-center gap-2 text-stone-500 pt-1 text-xs">
          <CornerDownLeft className="w-3.5 h-3.5 text-stone-600" />
          <span>Press Enter to close the application... [Finished with exit code 0]</span>
        </div>
      </div>
    </div>
  );
};
