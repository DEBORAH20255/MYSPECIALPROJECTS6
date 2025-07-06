'use client';

import React from 'react';

type FileType = 'pdf' | 'docx' | 'xlsx' | string;

interface CloudFile {
  id: string | number;
  name: string;
  type: FileType;
  size: string;
  protected: boolean;
}

const demoFiles: CloudFile[] = [
  {
    id: 1,
    name: 'Protected-Document.pdf',
    type: 'pdf',
    size: '1.2 MB',
    protected: true,
  },
  {
    id: 2,
    name: 'Invoice-July2025.pdf',
    type: 'pdf',
    size: '750 KB',
    protected: true,
  },
  {
    id: 3,
    name: 'Team-Plan.docx',
    type: 'docx',
    size: '500 KB',
    protected: false,
  },
  {
    id: 4,
    name: 'Project-Report.xlsx',
    type: 'xlsx',
    size: '1.8 MB',
    protected: false,
  },
];

function SidebarLink({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left font-medium text-sm transition
        ${active ? 'bg-red-50 text-red-600' : 'text-gray-700 hover:bg-gray-100'}`}
    >
      {label}
    </button>
  );
}

function FileCard({ file }: { file: CloudFile }) {
  const todayStr = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const iconMap: Record<string, React.ReactNode> = {
    pdf: (
      <span className="inline-flex items-center justify-center bg-red-100 rounded-lg" style={{ width: 40, height: 40 }}>
        {/* Acrobat-like Red PDF Logo */}
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#fff"/>
          <path d="M12 36L24 12L36 36H32L28 28H20L16 36H12Z" fill="#E53E3E"/>
        </svg>
      </span>
    ),
    docx: (
      <span className="inline-flex items-center justify-center bg-blue-100 rounded-lg" style={{ width: 40, height: 40 }}>
        {/* Blue Docx Icon */}
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#fff"/>
          <path d="M15 36V12H33V36H15Z" fill="#2563EB"/>
        </svg>
      </span>
    ),
    xlsx: (
      <span className="inline-flex items-center justify-center bg-green-100 rounded-lg" style={{ width: 40, height: 40 }}>
        {/* Green Excel Icon */}
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
          <rect width="48" height="48" rx="10" fill="#fff"/>
          <path d="M15 36V12H33V36H15Z" fill="#059669"/>
        </svg>
      </span>
    ),
  };
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg p-6 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {iconMap[file.type] || iconMap['pdf']}
        <div>
          <div className="font-semibold text-gray-900 truncate w-52">{file.name}</div>
          <div className="text-xs text-gray-500">{file.size} &middot; {todayStr}</div>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        {file.protected && (
          <span className="inline-flex items-center px-2 py-1 text-xs font-semibold bg-red-50 text-red-600 rounded-lg">
            Protected
          </span>
        )}
        <button className="ml-auto px-3 py-1 rounded-lg text-xs font-medium bg-indigo-50 text-indigo-700 hover:bg-indigo-100">
          View
        </button>
        <button className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-50 text-gray-700 hover:bg-gray-100">
          Download
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white/80 p-8 border-r border-gray-100">
        <div className="flex items-center gap-3 mb-10">
          {/* Acrobat Adobe Logo */}
          <span className="inline-flex items-center justify-center rounded-lg bg-white" style={{ width: 44, height: 44 }}>
            <svg viewBox="0 0 48 48" width="36" height="36">
              <rect width="48" height="48" rx="12" fill="#FA0F00"/>
              <g>
                <path fill="#fff" d="M27.3 34.6c-.7-.2-1.5-.4-2.3-.6.9-2.2 1.7-4.3 2.4-6.4 2.9.3 5.6.4 8.1.2.6 0 1.1.3 1.3.8.3.5.2 1.1-.2 1.5-1.6 1.5-4.1 2.9-7.4 4.5zm-3.7-1.1c-2.8-.8-5.1-1.8-6.9-2.9-1.4-.8-1.9-2.4-1.4-3.7.3-.7.9-1.3 1.6-1.5 2.1-.8 4.6-1.4 7.2-1.8.7 2.3 1.5 4.6 2.3 6.7-1 .5-1.9 1-2.8 1.5zm-9.1-4.7c-.2-.6-.1-1.3.4-1.7s1.1-.5 1.6-.2c2.5 1.5 6.7 3.1 12.3 4.6-2.2.5-4.3 1-6.4 1.6-1.2.3-2.2-.4-2.6-1.5s-.7-2.1-1.3-3zm8.1-15.5c.2-.5.7-.8 1.2-.7.5.1.8.5.8 1 0 4.8-2.2 10.9-7 18.3-.3.4-1 .5-1.4.1-.4-.3-.5-1-.1-1.4 4.6-7 6.7-12.8 6.5-17.3zm2.8 16.3c3.5-.8 6.5-1.2 8.9-1.3.5 0 1 .3 1.1.8.1.5-.2 1-.7 1.1-2.9.7-6.8 1.2-11.5 1.5.6-1.2 1.3-2.6 2.2-4.1zm2-16.3c0-.5.3-.9.8-1 .5-.1 1 .2 1.2.7.2.6.1 1.3-.3 1.7-2.6 2.8-6.8 7.1-9.7 12.9-.3.4-.1 1.1.3 1.4.4.3 1.1.2 1.4-.3 2.7-5.4 6.8-9.7 9.5-12.3zm11.3 13.3c.5.1.8.5.8 1 0 .5-.3.9-.8 1-3.2.5-8.7 1.5-15.9 2.6.7-1 1.4-2.2 2-3.5 6.9-1 12.2-1.7 13.7-2.1zm-4.1 6.5c.6.3.8 1 .4 1.5-.4.5-1 .6-1.5.3-3.6-2.3-9.4-5.4-14.1-7.9-.5-.2-.8-.8-.5-1.3.2-.5.8-.8 1.3-.5 4.7 2.5 10.6 5.6 14.4 8.1z"/>
              </g>
            </svg>
          </span>
          <span className="font-bold text-xl text-gray-900">Adobe Cloud</span>
        </div>
        <nav className="flex flex-col gap-2">
          <SidebarLink label="Protected Files" active />
          <SidebarLink label="Shared With Me" />
          <SidebarLink label="Recent" />
          <SidebarLink label="Trash" />
        </nav>
        <div className="mt-auto pt-10 text-xs text-gray-400 text-center">
          <span>
            &copy; 2025 Adobe Cloud Incorporated System
          </span>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-start p-10">
        <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Protected Files</h1>
            <p className="text-gray-600 text-base">All your secure and recent documents.</p>
          </div>
        </div>
        {/* File List */}
        <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {demoFiles.map(file => (
            <FileCard key={file.id} file={file} />
          ))}
        </section>
      </main>
    </div>
  );
}