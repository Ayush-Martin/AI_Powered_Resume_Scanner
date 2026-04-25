import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, FileSearch, History, LogOut } from "lucide-react";
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
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 flex flex-col bg-zinc-950 border-r border-zinc-900">
        <div className="p-6">
          <h1 className="text-xl font-bold text-white tracking-tight">AI Resume Scanner</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-900"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-900">
          <button
            onClick={() => logout()}
            className="flex items-center gap-3 px-3 py-3 w-full rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto bg-black">
        <Outlet />
      </main>
    </div>
  );
};
