import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Upload,
  FileText,
  X,
  Loader2,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { createScanReportService } from "@/services/scanReport.service";
import { getJobRolesService } from "@/services/jobRole.service";
import useScanReportStore from "@/store/useScanReportStore";
import ScanReportModal from "@/components/scanReport/ScanReportModal";
import type { IJobRole } from "@/types/scanReport.types";

const Scan = () => {
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [jobRoleId, setJobRoleId] = useState<string>("");
  const [jobRoles, setJobRoles] = useState<IJobRole[]>([]);
  const [loadingJobRoles, setLoadingJobRoles] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { activeScanReport, setActiveScanReport } = useScanReportStore();

  // Fetch job roles on mount
  useEffect(() => {
    const fetchJobRoles = async () => {
      setLoadingJobRoles(true);
      const roles = await getJobRolesService();
      if (roles) setJobRoles(roles);
      setLoadingJobRoles(false);
    };
    fetchJobRoles();
  }, []);

  const handleFile = useCallback((incoming: File) => {
    if (incoming.type !== "application/pdf") {
      toast.error("Only PDF files are accepted.");
      return;
    }
    if (incoming.size > 5 * 1024 * 1024) {
      toast.error("File size must be under 5 MB.");
      return;
    }
    setFile(incoming);
  }, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAnalyze = async () => {
    if (!file) return toast.error("Please upload your resume PDF.");
    if (!jobRoleId) return toast.error("Please select a job role.");

    setAnalyzing(true);
    try {
      const result = await createScanReportService(Number(jobRoleId), file);
      if (result) {
        setActiveScanReport(result);
        setModalOpen(true);
      }
    } finally {
      setAnalyzing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="dark flex flex-col h-full bg-black text-white overflow-auto">
      {/* Page header */}
      <div className="px-8 pt-8 pb-4 border-b border-zinc-900">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-zinc-800 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white/70" />
          </div>
          <h1 className="text-xl font-semibold text-white">Resume Scanner</h1>
        </div>
        <p className="text-sm text-zinc-500 ml-11">
          Upload your resume and select a job role to get an AI-powered match analysis.
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-start justify-center px-6 py-10">
        <div className="w-full max-w-2xl space-y-6">

          {/* PDF Upload Zone */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Resume (PDF)
            </label>

            {!file ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200
                  flex flex-col items-center justify-center py-16 px-8 text-center
                  ${dragOver
                    ? "border-white/40 bg-white/5"
                    : "border-zinc-800 bg-zinc-950 hover:border-zinc-600 hover:bg-zinc-900/50"
                  }
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={handleInputChange}
                />
                <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-4 group-hover:border-zinc-700 transition-colors">
                  <Upload className="w-7 h-7 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                </div>
                <p className="text-sm font-medium text-zinc-300 mb-1">
                  Drop your PDF here, or{" "}
                  <span className="text-white underline underline-offset-2">browse</span>
                </p>
                <p className="text-xs text-zinc-600">PDF only · Max 5 MB</p>
              </div>
            ) : (
              /* File Preview Card */
              <div className="flex items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 px-5 py-4">
                {/* PDF icon */}
                <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-red-400" />
                </div>
                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{file.name}</p>
                  <p className="text-xs text-zinc-500 mt-0.5">{formatFileSize(file.size)}</p>
                </div>
                {/* Remove */}
                <button
                  onClick={handleRemoveFile}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Job Role Dropdown */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider">
              Target Job Role
            </label>
            <Select
              value={jobRoleId}
              onValueChange={setJobRoleId}
              disabled={loadingJobRoles}
            >
              <SelectTrigger className="w-full bg-zinc-950 border-zinc-800 text-white rounded-xl h-12 hover:border-zinc-600 transition-colors focus:ring-1 focus:ring-zinc-600">
                {loadingJobRoles ? (
                  <span className="flex items-center gap-2 text-zinc-500">
                    <Loader2 className="w-4 h-4 animate-spin" /> Loading roles…
                  </span>
                ) : (
                  <SelectValue placeholder="Select a job role" />
                )}
                <ChevronDown className="w-4 h-4 text-zinc-500 ml-auto" />
              </SelectTrigger>
              <SelectContent className="dark bg-zinc-900 border-zinc-800 text-white rounded-xl">
                {jobRoles.map((role) => (
                  <SelectItem
                    key={role.id}
                    value={String(role.id)}
                    className="focus:bg-zinc-800 focus:text-white cursor-pointer rounded-lg"
                  >
                    {role.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Analyze Button */}
          <Button
            id="analyze-btn"
            onClick={handleAnalyze}
            disabled={analyzing || !file || !jobRoleId}
            className="w-full h-12 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {analyzing ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing Resume…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Analyze Resume
              </span>
            )}
          </Button>

          {/* Helper hint */}
          {analyzing && (
            <p className="text-center text-xs text-zinc-600 animate-pulse">
              This may take a moment — our AI is reading your resume…
            </p>
          )}
        </div>
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

export default Scan;
