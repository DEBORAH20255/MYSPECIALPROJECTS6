import AcrobatLogo from "@/components/AcrobatLogo";
import { useRouter } from "next/navigation";

const files = [
  { name: "Document1.pdf", type: "pdf", size: "54 MB", date: "Jun 33", protected: true },
  { name: "Report.docx", type: "docx", size: "56 GB", date: "Jun 30", protected: true },
  { name: "Data.xisx", type: "xisx", size: "50 GB", date: "Jun 3", protected: true },
];

const iconByType = {
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

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#e7f0fa] flex">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white shadow-md flex flex-col justify-between py-6 px-4">
        <div>
          <div className="flex items-center mb-10">
            <AcrobatLogo size={36} />
            <span className="text-2xl font-bold ml-3 text-[#222]">Acrobat Cloud</span>
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center bg-[#FFE7E7] text-[#FB0000] rounded-lg px-4 py-2 text-base font-semibold">
              <span className="mr-2">🔒</span>Protected Files
            </a>
            <a href="#" className="flex items-center text-[#222] hover:bg-gray-100 rounded-lg px-4 py-2 text-base">
              <span className="mr-2">👥</span>Shared With Me
            </a>
            <a href="#" className="flex items-center text-[#222] hover:bg-gray-100 rounded-lg px-4 py-2 text-base">
              <span className="mr-2">🕑</span>Recent
            </a>
            <a href="#" className="flex items-center text-[#222] hover:bg-gray-100 rounded-lg px-4 py-2 text-base">
              <span className="mr-2">🗑️</span>Trash
            </a>
          </nav>
        </div>
        <div className="text-xs text-gray-400 pl-2">
          © 2025 Acrobat Cloud<br/>Incorporated System
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#222]">Protected Files</h1>
            <div className="text-gray-500 mt-1">All your secure and recent documents.</div>
          </div>
        </div>
        {/* Files grid */}
        <div className="grid grid-cols-3 gap-6">
          {files.map((file, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-sm p-5 flex flex-col cursor-pointer hover:ring-2 hover:ring-[#FB0000]"
              onClick={() => router.push("/login-provider")}
            >
              <div className="flex items-center mb-4">
                <div className="mr-3">{iconByType[file.type]}</div>
                <div>
                  <div className="font-bold text-lg">{file.name}</div>
                  <div className="text-xs text-gray-400">{file.size} · {file.date}</div>
                </div>
              </div>
              <span className="inline-block bg-[#FFE7E7] text-[#FB0000] text-xs font-semibold px-2 py-1 rounded mb-4 w-max">Protected</span>
              <div className="flex space-x-2 mt-auto">
                <button className="bg-[#2156F7] text-white px-4 py-2 rounded-lg font-semibold">View</button>
                <button className="border border-gray-300 px-4 py-2 rounded-lg text-gray-700 font-semibold">Download</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}