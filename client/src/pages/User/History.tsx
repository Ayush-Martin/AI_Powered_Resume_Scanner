import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  History as HistoryIcon,
  Loader2,
  FileSearch,
  FileText,
  Calendar,
  Search,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import useScanReportStore from "@/store/useScanReportStore";
import usePaginatedData from "@/hooks/usePaginatedData";
import {
  getScanReportsService,
  getScanReportService,
} from "@/services/scanReport.service";
import ScanReportModal from "@/components/scanReport/ScanReportModal";
import type { IScanReport, IScanReportListItem } from "@/types/scanReport.types";

const PAGE_SIZE = 8;

// Score indicator component
const ScoreBadge = ({ percentage }: { percentage: number }) => {
  const config = useMemo(() => {
    if (percentage >= 75) return { color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20", label: "Strong Fit" };
    if (percentage >= 50) return { color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", label: "Potential" };
    return { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", label: "Low Fit" };
  }, [percentage]);

  return (
    <div className="flex flex-col items-end gap-1">
      <div className={`px-2 py-0.5 rounded-md border ${config.bg} ${config.border} ${config.color} text-[9px] font-black uppercase tracking-widest`}>
        {config.label}
      </div>
      <span className={`text-2xl font-black tabular-nums tracking-tighter ${config.color}`}>
        {percentage}%
      </span>
    </div>
  );
};

// Empty state
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-32 px-8 text-center animate-in fade-in duration-700">
    <div className="w-20 h-20 rounded-[2rem] bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-2xl">
      <FileSearch className="w-10 h-10 text-zinc-700" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">No analysis history found</h3>
    <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
      You haven't scanned any resumes yet. Start your first analysis to see your history here.
    </p>
    <Button 
      className="mt-8 bg-white text-black hover:bg-zinc-200 rounded-2xl font-bold px-8 h-12 active:scale-95 transition-transform"
      onClick={() => window.location.href = '/dashboard/scan'}
    >
      Start New Analysis
    </Button>
  </div>
);

// Skeleton Card
const SkeletonCard = () => (
  <div className="p-8 rounded-[2.5rem] bg-zinc-900/20 border border-zinc-900 animate-pulse space-y-6">
    <div className="flex justify-between items-start">
      <div className="w-12 h-12 rounded-2xl bg-zinc-800" />
      <div className="space-y-2 flex flex-col items-end">
        <div className="w-16 h-4 bg-zinc-800 rounded" />
        <div className="w-12 h-6 bg-zinc-800 rounded" />
      </div>
    </div>
    <div className="space-y-3">
      <div className="w-3/4 h-5 bg-zinc-800 rounded" />
      <div className="w-1/2 h-3 bg-zinc-800 rounded" />
    </div>
    <div className="pt-6 border-t border-zinc-900 flex justify-between">
      <div className="w-20 h-3 bg-zinc-800 rounded" />
      <div className="w-24 h-3 bg-zinc-800 rounded" />
    </div>
  </div>
);

const History = () => {
  const {
    scanReports,
    currentPage,
    noOfPages,
    setScanReports,
    changePage,
    activeScanReport,
    setActiveScanReport,
  } = useScanReportStore();

  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [fetchingReport, setFetchingReport] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch paginated data from the server
  const fetchData = async ({ page, size }: { page: number; size: number }) => {
    setLoading(true);
    try {
        const result = await getScanReportsService(page, size);
        if (result) {
          setScanReports(result.scanReports, result.page, result.noOfPages);
        }
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData({ page: currentPage, size: PAGE_SIZE });
  }, []);

  const { previousPage, nextPage } = usePaginatedData({
    currentPage,
    getData: fetchData,
    changePage,
    size: PAGE_SIZE,
  });

  // Open modal for a specific scan report
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

  const filteredReports = useMemo(() => {
    if (!searchQuery) return scanReports;
    return scanReports.filter(r => 
      r.jobRoleTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [scanReports, searchQuery]);

  return (
    <div className="dark flex flex-col h-full bg-black text-white overflow-hidden animate-in fade-in duration-700">
      
      {/* Dynamic Header */}
      <div className="px-6 md:px-10 pt-8 pb-6 space-y-6 flex-shrink-0 bg-gradient-to-b from-zinc-950/50 to-transparent">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <HistoryIcon className="w-5 h-5" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none">History</h1>
            </div>
            <p className="text-zinc-500 text-xs md:text-sm font-medium md:ml-12 max-w-md">
              Logs of your AI resume analysis performance.
            </p>
          </div>

          {!loading && scanReports.length > 0 && (
             <div className="flex items-center gap-4 md:ml-auto">
                <div className="text-right">
                  <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Total Reports</div>
                  <div className="text-xl font-black text-white tabular-nums">{scanReports.length}</div>
                </div>
                <div className="w-px h-6 bg-zinc-900" />
                <div className="text-right">
                  <div className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Page</div>
                  <div className="text-xl font-black text-white tabular-nums">{currentPage}<span className="text-zinc-800 text-sm">/{noOfPages}</span></div>
                </div>
             </div>
          )}
        </div>
      </div>

      {/* Results Grid */}
      <div className="flex-1 overflow-hidden px-6 md:px-10 pb-4">
        <ScrollArea className="h-full pr-2 custom-scrollbar">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredReports.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 pb-12">
              {filteredReports.map((report, index) => (
                <div
                  key={report.id}
                  onClick={() => handleOpenReport(report)}
                  className="group relative p-6 rounded-[2rem] bg-zinc-950 border border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900/30 transition-all duration-500 cursor-pointer overflow-hidden animate-in fade-in slide-in-from-bottom-6"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative z-10 flex flex-col justify-between h-full min-h-[120px] space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:scale-110 group-hover:bg-black transition-all duration-500">
                          <FileText className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                        </div>
                        <ScoreBadge percentage={report.matchPercentage} />
                      </div>
                      
                      <div className="space-y-0.5">
                        <h3 className="text-lg font-black text-white tracking-tight leading-tight group-hover:text-primary transition-colors line-clamp-1">
                          {report.jobRoleTitle || "General Scan"}
                        </h3>
                        <div className="flex items-center gap-1.5 text-zinc-700 text-[8px] font-black uppercase tracking-widest">
                          {formatDate(report.createdAt)}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-900/80 flex items-center justify-between">
                       <span className="text-[8px] font-black text-zinc-800 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">
                         Ref: {report.id}
                       </span>
                       <div className="flex items-center gap-1.5 text-zinc-500 group-hover:text-white transition-all transform group-hover:translate-x-1">
                          <span className="text-[8px] font-black uppercase tracking-widest">Explore</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Premium Pagination */}
      {!loading && scanReports.length > 0 && (
        <div className="px-6 md:px-10 py-6 border-t border-zinc-900 bg-black flex items-center justify-between flex-shrink-0 z-20">
          <div className="flex items-center gap-4">
             <Button
                variant="ghost"
                size="icon"
                onClick={previousPage}
                disabled={currentPage <= 1}
                className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-10 transition-all active:scale-90"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: noOfPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      changePage(page);
                      fetchData({ page, size: PAGE_SIZE });
                    }}
                    className={`w-8 h-8 rounded-xl text-[10px] font-black transition-all ${
                      page === currentPage
                        ? "bg-white text-black shadow-lg"
                        : "text-zinc-700 hover:text-zinc-300 hover:bg-zinc-900"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => nextPage(noOfPages)}
                disabled={currentPage >= noOfPages}
                className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white hover:bg-zinc-800 disabled:opacity-10 transition-all active:scale-90"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
          </div>

          <div className="hidden lg:flex flex-col items-end">
            <span className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.3em]">Browsing Results</span>
            <span className="text-sm font-bold text-zinc-500">
              Showing page <span className="text-white">{currentPage}</span> of <span className="text-white">{noOfPages}</span>
            </span>
          </div>
        </div>
      )}

      {/* Scan Report Modal Integration */}
      {fetchingReport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
                <span className="text-xs font-black text-white uppercase tracking-widest animate-pulse">Retrieving Analysis...</span>
            </div>
        </div>
      )}

      <ScanReportModal
        report={activeScanReport}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setActiveScanReport(null);
        }}
      />
    </div>
  );
};

export default History;
