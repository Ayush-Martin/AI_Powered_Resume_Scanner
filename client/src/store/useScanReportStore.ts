import { create } from "zustand";
import type {
  IScanReport,
  IScanReportListItem,
} from "@/types/scanReport.types";

interface IScanReportState {
  // Paginated history list
  scanReports: IScanReportListItem[];
  currentPage: number;
  noOfPages: number;

  // Currently viewed / active report (for modal)
  activeScanReport: IScanReport | null;

  // Actions
  setScanReports: (
    scanReports: IScanReportListItem[],
    page: number,
    noOfPages: number,
  ) => void;
  setActiveScanReport: (report: IScanReport | null) => void;
  changePage: (page: number) => void;
}

/**
 * Zustand store for scan report state.
 * Manages the paginated list of scan reports and the currently active report modal.
 */
const useScanReportStore = create<IScanReportState>()((set) => ({
  scanReports: [],
  currentPage: 1,
  noOfPages: 1,
  activeScanReport: null,

  setScanReports: (scanReports, page, noOfPages) =>
    set({ scanReports, currentPage: page, noOfPages }),

  setActiveScanReport: (report) => set({ activeScanReport: report }),

  changePage: (page) => set({ currentPage: page }),
}));

export default useScanReportStore;
