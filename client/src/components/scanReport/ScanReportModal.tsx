import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle2,
  AlertCircle,
  FileText,
  Calendar,
  Target,
} from "lucide-react";
import type { IScanReport } from "@/types/scanReport.types";
import { Button } from "@/components/ui/button";

interface ScanReportModalProps {
  report: IScanReport | null;
  open: boolean;
  onClose: () => void;
}

const ScanReportModal = ({ report, open, onClose }: ScanReportModalProps) => {
  if (!report) return null;

  const scoreColor = report.matchPercentage >= 75 ? "text-green-400" : report.matchPercentage >= 50 ? "text-amber-400" : "text-red-400";
  const barColor = report.matchPercentage >= 75 ? "bg-green-500" : report.matchPercentage >= 50 ? "bg-amber-500" : "bg-red-500";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="dark bg-black border-zinc-900 text-white !max-w-[1000px] w-[95vw] h-[85vh] overflow-hidden p-0 rounded-[2rem] gap-0 shadow-[0_0_100px_-20px_rgba(0,0,0,1)] border-t border-zinc-800/50">
        <div className="flex flex-col h-full max-h-[85vh]">
          {/* Top Header Bar */}
          <div className="px-6 py-4 border-b border-zinc-900 flex items-center justify-between bg-zinc-950/50 backdrop-blur-xl flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                <FileText className="w-5 h-5 text-zinc-400" />
              </div>
              <div>
                <DialogTitle className="text-sm font-bold text-zinc-100 uppercase tracking-widest leading-none">
                  AI Match Analysis
                </DialogTitle>
                <div className="flex items-center gap-2 text-[10px] text-zinc-500 mt-1.5 font-medium">
                  <Calendar className="w-3 h-3" />
                  {new Date(report.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
              </div>
            </div>

          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-6 md:p-10 space-y-10">
              
              {/* Hero Section: Role & Score */}
              <div className="relative p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-zinc-900 to-black border border-zinc-800/50 overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-1000"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-zinc-500/5 blur-[100px] rounded-full"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                  <div className="space-y-6 max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      <Target className="w-3 h-3" /> Targeted Role
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                      {report.jobRoleTitle || "Unspecified Role"}
                    </h2>
                    <p className="text-zinc-400 text-sm md:text-lg leading-relaxed font-medium">
                      {report.analysisResult.summary}
                    </p>
                  </div>

                  <div className="flex-shrink-0 text-right space-y-3">
                    <div className={`text-6xl md:text-8xl font-black tracking-tighter ${scoreColor} tabular-nums animate-in zoom-in duration-700`}>
                      {report.matchPercentage}<span className="text-2xl md:text-4xl ml-1 opacity-50">%</span>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                       <div className="w-full md:w-48 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div className={`h-full ${barColor} transition-all duration-1000 delay-300`} style={{ width: `${report.matchPercentage}%` }}></div>
                       </div>
                       <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Match probability score</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Found Skills */}
                <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                      <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">Core Strengths</h3>
                    </div>
                    <span className="text-xs font-bold text-zinc-600 tabular-nums bg-zinc-900 px-2 py-1 rounded-lg">
                      {report.analysisResult.skillsFound.length} Matches
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {report.analysisResult.skillsFound.map((skill, i) => (
                      <div 
                        key={i} 
                        className="px-4 py-2.5 bg-zinc-900/50 border border-zinc-800 text-zinc-200 text-xs rounded-xl font-bold hover:border-green-500/30 hover:bg-green-500/[0.02] transition-all cursor-default"
                      >
                        {skill}
                      </div>
                    ))}
                    {report.analysisResult.skillsFound.length === 0 && (
                      <p className="text-zinc-600 text-xs italic">No matching skills identified.</p>
                    )}
                  </div>
                </div>

                {/* Missing Skills */}
                <div className="p-8 rounded-[2rem] bg-zinc-950 border border-zinc-900 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                      </div>
                      <h3 className="text-sm font-bold text-zinc-100 uppercase tracking-widest">Growth Areas</h3>
                    </div>
                    <span className="text-xs font-bold text-zinc-600 tabular-nums bg-zinc-900 px-2 py-1 rounded-lg">
                      {report.analysisResult.missingSkills.length} Missing
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {report.analysisResult.missingSkills.map((skill, i) => (
                      <div 
                        key={i} 
                        className="px-4 py-2.5 bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-xs rounded-xl font-bold hover:border-amber-500/30 transition-all cursor-default"
                      >
                        {skill}
                      </div>
                    ))}
                    {report.analysisResult.missingSkills.length === 0 && (
                      <p className="text-zinc-600 text-xs italic">Perfect match! No missing skills found.</p>
                    )}
                  </div>
                </div>

              </div>



            </div>
          </div>

          {/* Footer Bar */}
          <div className="p-6 border-t border-zinc-900 bg-zinc-950/80 backdrop-blur-xl flex items-center justify-end flex-shrink-0">
             <Button 
                onClick={onClose} 
                className="bg-white text-black hover:bg-zinc-200 rounded-2xl px-10 h-12 font-black uppercase tracking-widest text-xs transition-transform active:scale-95 shadow-xl"
             >
               Close Analysis
             </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScanReportModal;
