import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChevronLeft,
  ChevronRight,
  History as HistoryIcon,
  Loader2,
  FileSearch,
  Calendar,
  TrendingUp,
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
const ScoreBar = ({ percentage }: { percentage: number }) => {
  const color =
    percentage >= 75
      ? "bg-green-500"
      : percentage >= 50
        ? "bg-amber-500"
        : "bg-red-500";

  const textColor =
    percentage >= 75
      ? "text-green-400"
      : percentage >= 50
        ? "text-amber-400"
        : "text-red-400";

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`text-sm font-bold tabular-nums w-10 text-right ${textColor}`}>
        {percentage}%
      </span>
    </div>
  );
};

// Empty state
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 px-8 text-center">
    <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4">
      <FileSearch className="w-7 h-7 text-zinc-600" />
    </div>
    <h3 className="text-base font-semibold text-zinc-300 mb-2">No scans yet</h3>
    <p className="text-sm text-zinc-600 max-w-xs">
      Go to the Scan page to analyze your first resume against a job role.
    </p>
  </div>
);

// Skeleton row
const SkeletonRow = () => (
  <div className="flex items-center gap-4 px-5 py-4 border-b border-zinc-900 animate-pulse">
    <div className="w-9 h-9 rounded-xl bg-zinc-800 flex-shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="h-3 bg-zinc-800 rounded w-24" />
      <div className="h-2 bg-zinc-800/70 rounded w-36" />
    </div>
    <div className="w-32 space-y-1.5">
      <div className="h-1.5 bg-zinc-800 rounded-full" />
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

  // Fetch paginated data from the server
  const fetchData = async ({ page, size }: { page: number; size: number }) => {
    setLoading(true);
    const result = await getScanReportsService(page, size);
    if (result) {
      setScanReports(result.scanReports, result.page, result.noOfPages);
    }
    setLoading(false);
  };

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

  const formatTime = (date: Date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="dark flex flex-col h-full bg-black text-white overflow-hidden">
      {/* Page Header */}
      <div className="px-8 pt-8 pb-4 border-b border-zinc-900 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-zinc-800 flex items-center justify-center">
                <HistoryIcon className="w-4 h-4 text-white/70" />
              </div>
              <h1 className="text-xl font-semibold text-white">Scan History</h1>
            </div>
            <p className="text-sm text-zinc-500 ml-11">
              View and revisit all your previous resume scans.
            </p>
          </div>
          {/* Summary badge */}
          {!loading && scanReports.length > 0 && (
            <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2">
              <TrendingUp className="w-4 h-4 text-zinc-500" />
              <span className="text-sm text-zinc-400">
                Page{" "}
                <span className="text-white font-semibold">{currentPage}</span>
                {" "}of{" "}
                <span className="text-white font-semibold">{noOfPages}</span>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1">
          {loading ? (
            <div>
              {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          ) : scanReports.length === 0 ? (
            <EmptyState />
          ) : (
            <div>
              {/* Table header */}
              <div className="grid grid-cols-[auto_1fr_200px_100px] items-center gap-4 px-5 py-3 border-b border-zinc-900 bg-zinc-950/80">
                <span className="w-9" />
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Date & Time
                </span>
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Match Score
                </span>
                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider text-right">
                  Action
                </span>
              </div>

              {/* Rows */}
              {scanReports.map((report, index) => (
                <div
                  key={report.id}
                  className="grid grid-cols-[auto_1fr_200px_100px] items-center gap-4 px-5 py-4 border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors group"
                >
                  {/* Rank number */}
                  <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-zinc-500">
                      #{(currentPage - 1) * PAGE_SIZE + index + 1}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-zinc-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-zinc-200">
                        {formatDate(report.createdAt)}
                      </span>
                    </div>
                    <span className="text-xs text-zinc-600 ml-5.5 block mt-0.5">
                      {formatTime(report.createdAt)}
                    </span>
                  </div>

                  {/* Score bar */}
                  <ScoreBar percentage={report.matchPercentage} />

                  {/* View button */}
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      id={`view-report-${report.id}`}
                      onClick={() => handleOpenReport(report)}
                      disabled={fetchingReport}
                      className="h-8 px-3 text-xs border-zinc-700 bg-transparent text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 transition-all rounded-lg"
                    >
                      {fetchingReport ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        "View"
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Pagination footer */}
        {!loading && scanReports.length > 0 && (
          <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-t border-zinc-900 bg-zinc-950/80">
            <Button
              variant="outline"
              size="sm"
              onClick={previousPage}
              disabled={currentPage <= 1}
              className="h-9 px-4 border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-900 disabled:opacity-30 transition-all rounded-xl"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>

            {/* Page numbers */}
            <div className="flex items-center gap-1.5">
              {Array.from({ length: noOfPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    changePage(page);
                    fetchData({ page, size: PAGE_SIZE });
                  }}
                  className={`w-8 h-8 rounded-lg text-xs font-medium transition-colors ${
                    page === currentPage
                      ? "bg-white text-black"
                      : "text-zinc-500 hover:text-white hover:bg-zinc-900"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => nextPage(noOfPages)}
              disabled={currentPage >= noOfPages}
              className="h-9 px-4 border-zinc-800 bg-transparent text-zinc-400 hover:text-white hover:border-zinc-600 hover:bg-zinc-900 disabled:opacity-30 transition-all rounded-xl"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      {/* Scan Report Modal */}
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
