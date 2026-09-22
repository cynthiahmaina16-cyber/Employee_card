/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import {
  Copy,
  Check,
  Printer,
  ShieldCheck,
  Building2,
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  QrCode,
  Share2,
} from "lucide-react";
import { ParsedProfile, EmployeeFormState } from "../types";

interface EmployeeCardViewProps {
  profile: ParsedProfile;
  form: EmployeeFormState;
}

export const EmployeeCardView: React.FC<EmployeeCardViewProps> = ({
  profile,
  form,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="employee-card-wrapper" className="space-y-4">
      {/* Action Bar */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Digital ID Credential
        </span>
        <div className="flex items-center gap-2">
          <button
            id="copy-system-card-btn"
            type="button"
            onClick={() => copyToClipboard(profile.employeeCard, "system-card")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg shadow-xs transition-colors cursor-pointer"
            title="Copy System Digital Card string"
          >
            {copiedKey === "system-card" ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Copied Line!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-stone-500" />
                <span>Copy System Card</span>
              </>
            )}
          </button>

          <button
            id="print-card-btn"
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-lg shadow-xs transition-colors cursor-pointer"
            title="Print employee credential"
          >
            <Printer className="w-3.5 h-3.5 text-stone-500" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* The Physical Card Container */}
      <div
        id="physical-id-card"
        className="relative bg-white rounded-2xl border border-stone-300/80 shadow-md overflow-hidden transition-all print:border print:shadow-none"
      >
        {/* Lanyard Slot Cutout Accent */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-14 h-2.5 rounded-full bg-stone-200/90 border border-stone-300 flex items-center justify-center">
            <div className="w-8 h-1 rounded-full bg-stone-100"></div>
          </div>
        </div>

        {/* Card Header */}
        <div className="px-6 py-4 bg-stone-900 text-stone-50 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2">
            <span className="text-red-400 text-base select-none">{profile.heartSymbol}</span>
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-stone-200">
              Employee Profile Card
            </span>
            <span className="text-red-400 text-base select-none">{profile.heartSymbol}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-stone-800/90 px-2.5 py-1 rounded-full border border-stone-700 text-[11px] font-mono text-stone-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>VERIFIED</span>
          </div>
        </div>

        {/* Main Card Body */}
        <div className="p-6 space-y-5">
          {/* Avatar & Key Identification */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
            <div className="flex items-center gap-4">
              {/* Initials Avatar */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-950 text-white font-bold text-xl flex items-center justify-center shadow-inner ring-4 ring-stone-100 shrink-0">
                <span>{profile.initials || "??"}</span>
              </div>

              <div>
                <h3 id="card-employee-fullname" className="text-xl font-bold text-stone-900 tracking-tight">
                  {profile.fullName}
                </h3>
                <p id="card-employee-position" className="text-sm font-medium text-stone-600 mt-0.5">
                  {form.position || "Position not specified"}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium border border-stone-200">
                    <Building2 className="w-3 h-3 text-stone-500" />
                    Dept: {profile.department}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium border border-stone-200">
                    Initials: {profile.initials}
                  </span>
                </div>
              </div>
            </div>

            {/* Department and Initials Badge Box */}
            <div className="sm:text-right bg-stone-50 p-3 rounded-xl border border-stone-200/80 sm:min-w-[140px]">
              <div className="text-[10px] uppercase font-bold text-stone-500 tracking-wider">
                Dept & Initials
              </div>
              <div id="card-details-display" className="font-mono text-lg font-bold text-stone-900 tracking-wide mt-0.5">
                {profile.details || "—"}
              </div>
              <div className="text-[10px] text-stone-400 font-mono">
                [0:3] + [9:11]
              </div>
            </div>
          </div>

          {/* Script Computed Fields Data List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Bio Summary */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Bio Summary
              </span>
              <p id="card-bio-summary" className="text-sm font-semibold text-stone-900">
                {profile.employeeInfo}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-stone-500">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-stone-400" />
                  Age: {form.employeeAge || 0}
                </span>
                <span className="inline-flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-stone-400" />
                  ${Number(form.salary || 0).toLocaleString()}/mo
                </span>
              </div>
            </div>

            {/* Work Experience */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Work Experience
              </span>
              <p id="card-work-experience" className="text-sm font-semibold text-stone-900 capitalize">
                {profile.experienceInfo}
              </p>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-stone-500">
                <Clock className="w-3 h-3 text-stone-400" />
                <span>Professional background recorded</span>
              </div>
            </div>

            {/* Address Details (Full Width) */}
            <div className="md:col-span-2 p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Address Details
              </span>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <p id="card-address-details" className="text-sm font-medium text-stone-800 leading-snug">
                  {profile.fullAddress}
                </p>
              </div>
            </div>
          </div>

          {/* System Digital Card Section */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
                System Digital Card
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(profile.employeeCard, "inline-card")}
                className="text-[11px] font-medium text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                {copiedKey === "inline-card" ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                {copiedKey === "inline-card" ? "Copied" : "Copy"}
              </button>
            </div>
            <p
              id="card-system-digital-string"
              className="font-mono text-xs font-medium text-amber-950 break-all leading-relaxed bg-white/80 p-2.5 rounded-lg border border-amber-200/60"
            >
              {profile.employeeCard}
            </p>
          </div>

          {/* Card Footer with System Code & Barcode representation */}
          <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-[10px] text-stone-400 uppercase font-mono tracking-wider block">
                Structural System Code
              </span>
              <span id="card-footer-system-code" className="font-mono font-bold text-stone-800 text-xs tracking-wider">
                {form.employeeCode || "N/A"}
              </span>
            </div>

            {/* Aesthetic Barcode */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto py-1 px-2.5 bg-stone-100 rounded-lg">
              <QrCode className="w-4 h-4 text-stone-600" />
              <div className="flex items-center gap-[2px] h-4">
                <div className="w-[1px] h-full bg-stone-800"></div>
                <div className="w-[3px] h-full bg-stone-800"></div>
                <div className="w-[1px] h-full bg-stone-800"></div>
                <div className="w-[2px] h-full bg-stone-800"></div>
                <div className="w-[1px] h-full bg-stone-800"></div>
                <div className="w-[4px] h-full bg-stone-800"></div>
                <div className="w-[2px] h-full bg-stone-800"></div>
                <div className="w-[1px] h-full bg-stone-800"></div>
                <div className="w-[3px] h-full bg-stone-800"></div>
              </div>
              <span className="font-mono text-[10px] text-stone-600 font-semibold ml-1">
                SEC-ID
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
