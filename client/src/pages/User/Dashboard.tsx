import { useState, useEffect } from "react";
import { 
  FileText, 
  TrendingUp, 
  LayoutDashboard, 
  ArrowUpRight, 
  Loader2,
  History as HistoryIcon,
  Sparkles,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDashboardStatsService, getScanReportService } from "@/services/scanReport.service";
import useScanReportStore from "@/store/useScanReportStore";
import ScanReportModal from "@/components/scanReport/ScanReportModal";
import type { IDashboardStats, IScanReport, IScanReportListItem } from "@/types/scanReport.types";

const Dashboard = () => {
  const [stats, setStats] = useState<IDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [fetchingReport, setFetchingReport] = useState(false);
  
  const { activeScanReport, setActiveScanReport } = useScanReportStore();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      const data = await getDashboardStatsService();
      if (data) {
        setStats(data);
      }
      setLoading(false);
    };

    fetchDashboardData();
  }, []);

  const handleOpenReport = async (item: IScanReportListItem) => {
    setFetchingReport(true);
    const report = await getScanReportService(item.id);
    setFetchingReport(false);
    if (report) {
      setActiveScanReport(report as IScanReport);
      setModalOpen(true);
    }
  };

  const formatDate = (date: Date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-zinc-800 animate-spin" />
            <span className="text-[10px] font-black text-zinc-800 uppercase tracking-widest animate-pulse">Initializing Dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="dark h-full bg-black text-white overflow-y-auto animate-in fade-in duration-700 custom-scrollbar">
      <div className="px-6 md:px-10 pt-8 pb-12 space-y-8">
        
        {/* Hero Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none">Dashboard</h1>
            </div>
            <p className="text-zinc-500 text-xs md:text-sm font-medium md:ml-12 max-w-md">
              Overview of your recent resume analysis performance.
            </p>
          </div>

          <Button 
            onClick={() => window.location.href = '/dashboard/scan'}
            className="bg-white text-black hover:bg-zinc-200 rounded-xl px-6 h-11 font-black uppercase tracking-widest text-[10px] transition-transform active:scale-95 shadow-xl md:ml-auto"
          >
            <Sparkles className="w-3.5 h-3.5 mr-2" /> New Scan
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Total Scans Card */}
           <div className="p-6 md:p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 flex flex-col justify-between h-48 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.02] blur-[60px] rounded-full group-hover:bg-white/[0.05] transition-all duration-700"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                   <FileText className="w-5 h-5 text-zinc-500" />
                </div>
                <div className="px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                  Performance
                </div>
              </div>
              <div className="relative z-10">
                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-0.5">Total Scans</div>
                <div className="text-4xl font-black text-white tracking-tighter">{stats?.totalScans || 0}</div>
              </div>
           </div>

           {/* Avg Score Card */}
           <div className="p-6 md:p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 flex flex-col justify-between h-48 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full group-hover:bg-primary/10 transition-all duration-700"></div>
              <div className="flex items-center justify-between relative z-10">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                   <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-widest">
                  Intelligence
                </div>
              </div>
              <div className="relative z-10">
                <div className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-0.5">Avg Match Rate</div>
                <div className="text-4xl font-black text-white tracking-tighter">{stats?.averageMatchPercentage || 0}<span className="text-xl text-zinc-800 ml-0.5">%</span></div>
              </div>
           </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <Zap className="w-4 h-4 text-zinc-500" />
                 <h2 className="text-lg font-black text-white uppercase tracking-widest">Recent Activity</h2>
              </div>
              <Button 
                variant="ghost" 
                onClick={() => window.location.href = '/dashboard/history'}
                className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.15em] hover:text-white transition-colors"
              >
                View History <ArrowUpRight className="ml-1.5 w-3.5 h-3.5" />
              </Button>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {stats?.latestScans && stats.latestScans.length > 0 ? (
                stats.latestScans.map((scan, index) => (
                  <div
                    key={scan.id}
                    onClick={() => handleOpenReport(scan)}
                    className="group relative p-6 rounded-[2rem] bg-zinc-950 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/30 transition-all duration-500 cursor-pointer overflow-hidden animate-in fade-in slide-in-from-bottom-6"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative z-10 flex flex-col justify-between h-full min-h-[100px] space-y-4">
                       <div className="flex items-start justify-between">
                          <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                             <FileText className="w-5 h-5 text-zinc-500" />
                          </div>
                          <div className={`text-xl font-black tabular-nums tracking-tighter ${
                            scan.matchPercentage >= 75 ? 'text-green-400' : 
                            scan.matchPercentage >= 50 ? 'text-amber-400' : 'text-red-400'
                          }`}>
                            {scan.matchPercentage}%
                          </div>
                       </div>
                       
                       <div className="space-y-0.5">
                          <h3 className="text-base font-black text-white tracking-tight leading-none group-hover:text-primary transition-colors line-clamp-1">
                            {scan.jobRoleTitle || "General Scan"}
                          </h3>
                          <div className="flex items-center gap-1.5 text-zinc-700 text-[8px] font-black uppercase tracking-widest">
                            {formatDate(scan.createdAt)}
                          </div>
                       </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-20 bg-zinc-950 border border-zinc-900 rounded-[3rem] flex flex-col items-center justify-center text-center space-y-4">
                   <div className="w-16 h-16 rounded-[1.5rem] bg-zinc-900 flex items-center justify-center">
                      <HistoryIcon className="w-8 h-8 text-zinc-700" />
                   </div>
                   <div className="space-y-1">
                      <h4 className="font-bold text-zinc-400 uppercase tracking-widest text-xs">No Recent Activity</h4>
                      <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Start scanning to see results here</p>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>

      <ScanReportModal 
        report={activeScanReport}
        open={modalOpen} 
        onClose={() => {
          setModalOpen(false);
          setActiveScanReport(null);
        }} 
      />

      {fetchingReport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
                <span className="text-xs font-black text-white uppercase tracking-widest animate-pulse">Retrieving Analysis...</span>
            </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
