// components/Sidebar.tsx
import AcrobatLogo from "@/components/AcrobatLogo";

export default function Sidebar() {
  return (
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
  );
}
