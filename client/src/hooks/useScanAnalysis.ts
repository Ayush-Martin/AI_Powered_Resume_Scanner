import { useState } from "react";
import { toast } from "sonner";
import { createScanReportService } from "@/services/scanReport.service";
import useScanReportStore from "@/store/useScanReportStore";

export const useScanAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { activeScanReport, setActiveScanReport } = useScanReportStore();

  const runAnalysis = async (jobRoleId: string, file: File | null) => {
    if (!file) {
      toast.error("Please upload your resume PDF.");
      return;
    }
    if (file.type !== "application/pdf") {
      toast.error("Invalid file format. Please upload a PDF.");
      return;
    }
    if (!jobRoleId) {
      toast.error("Please select a job role.");
      return;
    }

    setAnalyzing(true);
    try {
      const result = await createScanReportService(Number(jobRoleId), file);
      if (result) {
        setActiveScanReport(result);
        setModalOpen(true);
        toast.success("Analysis complete!");
      }
    } catch (error) {
      toast.error("Analysis failed. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveScanReport(null);
  };

  return {
    analyzing,
    modalOpen,
    activeScanReport,
    runAnalysis,
    closeModal
  };
};
