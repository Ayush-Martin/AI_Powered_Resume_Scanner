import { useState } from "react";
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
  Target,
  Zap
} from "lucide-react";
import ScanReportModal from "@/components/scanReport/ScanReportModal";
import { useJobRoles } from "@/hooks/useJobRoles";
import { useFileSelect } from "@/hooks/useFileSelect";
import { useScanAnalysis } from "@/hooks/useScanAnalysis";

const Scan = () => {
  const [jobRoleId, setJobRoleId] = useState<string>("");
  const { jobRoles, loading: loadingJobRoles } = useJobRoles();
  const { file, dragOver, fileInputRef, handleDrop, handleInputChange, removeFile, onDragOver, onDragLeave } = useFileSelect();
  const { analyzing, modalOpen, activeScanReport, runAnalysis, closeModal } = useScanAnalysis();

  const handleAnalyze = () => runAnalysis(jobRoleId, file);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="dark h-full bg-black text-white overflow-y-auto animate-in fade-in duration-700 custom-scrollbar">
      <div className="px-6 md:px-10 pt-8 pb-12 space-y-10">
        
        {/* Dynamic Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase leading-none">Analysis</h1>
            </div>
            <p className="text-zinc-500 text-xs md:text-sm font-medium md:ml-12 max-w-md">
              AI-powered resume analysis against job requirements.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col xl:flex-row gap-8 items-start">
            
            {/* Upload Area */}
            <div className="flex-1 w-full space-y-6 animate-in slide-in-from-bottom-6 duration-700 delay-100">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 ml-4">
                        <Upload className="w-3.5 h-3.5 text-zinc-600" />
                        <h3 className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.2em]">Source Material</h3>
                    </div>
                    
                    {!file ? (
                        <div
                            onDragOver={onDragOver}
                            onDragLeave={onDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`
                                relative p-10 md:p-16 rounded-[2rem] border-2 border-dashed transition-all duration-500
                                flex flex-col items-center justify-center text-center group cursor-pointer
                                ${dragOver
                                    ? "border-white bg-white/[0.02] shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                                    : "border-zinc-900 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/20"
                                }
                            `}
                        >
                            <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={handleInputChange} />
                            <div className="w-16 h-16 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-black transition-all duration-500 shadow-2xl">
                                <Upload className="w-7 h-7 text-zinc-500 group-hover:text-white transition-colors" />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-lg font-black text-white tracking-tight">Drop Resume PDF</h4>
                                <p className="text-zinc-600 text-xs font-medium">Secure local processing · Max 5MB</p>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-800 flex items-center justify-between group relative overflow-hidden animate-in zoom-in-95 duration-500">
                            <div className="flex items-center gap-5 relative z-10">
                                <div className="w-14 h-14 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shadow-lg">
                                    <FileText className="w-7 h-7 text-red-400" />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-lg font-black text-white tracking-tight truncate max-w-[150px] md:max-w-xs">{file.name}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{formatFileSize(file.size)}</span>
                                        <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
                                        <span className="text-[9px] font-black text-red-500 uppercase tracking-widest">PDF Ready</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={removeFile} className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all active:scale-90 relative z-10">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Target Role & Execution */}
            <div className="w-full xl:w-96 space-y-8 animate-in slide-in-from-right-6 duration-700 delay-200">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 ml-4">
                        <Target className="w-4 h-4 text-zinc-600" />
                        <h3 className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.3em]">Target Metrics</h3>
                    </div>
                    
                    <div className="p-8 rounded-[3rem] bg-zinc-950 border border-zinc-900 space-y-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-zinc-700 uppercase tracking-widest ml-1">Select Job Role</label>
                            <Select value={jobRoleId} onValueChange={setJobRoleId} disabled={loadingJobRoles}>
                                <SelectTrigger className="w-full h-14 bg-zinc-900 border-zinc-800 rounded-2xl px-6 focus:ring-0 focus:border-zinc-600 text-sm font-bold uppercase tracking-widest">
                                    <SelectValue placeholder="Target Role..." />
                                    <ChevronDown className="w-4 h-4 text-zinc-500 opacity-50" />
                                </SelectTrigger>
                                <SelectContent className="dark bg-zinc-900 border-zinc-800 rounded-2xl p-2 shadow-2xl">
                                    {jobRoles.map((role) => (
                                        <SelectItem key={role.id} value={String(role.id)} className="rounded-xl h-12 font-bold uppercase tracking-widest text-[10px] focus:bg-zinc-800 focus:text-white transition-colors cursor-pointer">
                                            {role.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button 
                            onClick={handleAnalyze} 
                            disabled={analyzing || !file || !jobRoleId}
                            className={`
                                w-full h-16 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs transition-all duration-500
                                ${analyzing || !file || !jobRoleId
                                    ? "bg-zinc-900 text-zinc-700 border border-zinc-800"
                                    : "bg-white text-black hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                                }
                            `}
                        >
                            {analyzing ? (
                                <div className="flex items-center gap-3">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Scanning...
                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
                                    <Zap className="w-5 h-5" />
                                    Launch Analysis
                                </div>
                            )}
                        </Button>
                    </div>
                </div>

                <div className="p-8 rounded-[2.5rem] bg-zinc-950/40 border border-zinc-900/50">
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-loose text-center">
                        Your data is processed using <span className="text-zinc-400">Deep-Learning Models</span> to ensure accurate match probability.
                    </p>
                </div>
            </div>

        </div>
      </div>

      <ScanReportModal
        report={activeScanReport}
        open={modalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default Scan;
