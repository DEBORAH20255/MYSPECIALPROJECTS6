"use client";

import React from "react";

type File = {
  name: string;
  type: string;
  size: string;
  date: string;
  protected: boolean;
};

interface FileGridProps {
  files: File[];
}

const iconByType: Record<string, JSX.Element> = {
  pdf: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="8" fill="#FB0000"/>
      <path d="M22 10H10v12h12V10z" fill="#fff"/>
      <path d="M15 14h2v4h-2z" fill="#FB0000"/>
    </svg>
  ),
  docx: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="8" fill="#2156F7"/>
      <rect x="8" y="10" width="16" height="12" rx="2" fill="#fff"/>
      <rect x="12" y="14" width="8" height="1.5" rx="0.75" fill="#2156F7"/>
      <rect x="12" y="17" width="8" height="1.5" rx="0.75" fill="#2156F7"/>
    </svg>
  ),
  xisx: (
    <svg width="32" height="32" viewBox="0 0 32 32">
      <rect width="32" height="32" rx="8" fill="#2ABF57"/>
      <rect x="8" y="10" width="16" height="12" rx="2" fill="#fff"/>
      <rect x="12" y="14" width="8" height="1.5" rx="0.75" fill="#2ABF57"/>
      <rect x="12" y="17" width="8" height="1.5" rx="0.75" fill="#2ABF57"/>
    </svg>
  ),
};

export default function FileGrid({ files }: FileGridProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {files.map((file, i) => (
        <div key={i} className="bg-white rounded-xl shadow-sm p-5 flex flex-col">
          <div className="flex items-center mb-4">
            <div className="mr-3">{iconByType[file.type]}</div>
            <div>
              <div className="font-bold text-lg">{file.name}</div>
              <div className="text-xs text-gray-400">
                {file.size} · {file.date}
              </div>
            </div>
          </div>
          <span className="inline-block bg-[#FFE7E7] text-[#FB0000] text-xs font-semibold px-2 py-1 rounded mb-4 w-max">
            Protected
          </span>
          <div className="flex space-x-2 mt-auto">
            <button className="bg-[#2156F7] text-white px-4 py-2 rounded-lg font-semibold">View</button>
            <button className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 font-semibold">Download</button>
          </div>
        </div>
      ))}
    </div>
  );
}
