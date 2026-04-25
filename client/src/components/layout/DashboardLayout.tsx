import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileSearch, History, LogOut, Sparkles } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";

export const DashboardLayout = () => {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Scan", path: "/dashboard/scan", icon: FileSearch },
    { name: "History", path: "/dashboard/history", icon: History },
  ];

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden flex-col md:flex-row animate-in fade-in duration-700">
      
      {/* Sidebar - Desktop Only */}
      <aside className="hidden md:flex w-64 flex-col bg-black border-r border-zinc-900 h-full">
        {/* Brand */}
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-black text-white tracking-tight leading-none uppercase">Scanner</h1>
            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em] mt-0.5">Intelligence</span>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <div className="text-[9px] font-black text-zinc-800 uppercase tracking-[0.2em] ml-2 mb-2">Main Menu</div>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? "bg-zinc-900 text-white border border-zinc-800" 
                    : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isActive ? "bg-white text-black shadow-lg" : "bg-zinc-900/50 group-hover:bg-zinc-900"
                }`}>
                    <Icon className="w-4 h-4" />
                </div>
                <span className="font-bold uppercase tracking-widest text-[10px]">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User / Logout */}
        <div className="p-4 mt-auto">
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-2xl bg-zinc-900/20 border border-zinc-900/50 text-zinc-500 hover:text-red-400 hover:border-red-500/20 hover:bg-red-500/[0.02] transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center group-hover:bg-red-500/10 transition-colors">
                <LogOut className="w-4 h-4" />
            </div>
            <span className="font-bold uppercase tracking-widest text-[10px]">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-5 bg-black border-b border-zinc-900 z-50">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-white" />
          <h1 className="text-lg font-black text-white uppercase tracking-tighter">Scanner AI</h1>
        </div>
        <button onClick={() => logout()} className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-500">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-black pb-24 md:pb-0 scroll-smooth custom-scrollbar">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-6 left-6 right-6 h-20 bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/50 rounded-[2rem] flex justify-around items-center px-4 z-[100] shadow-2xl">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
                isActive ? "bg-white text-black scale-110 shadow-xl" : "text-zinc-600"
              }`}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
