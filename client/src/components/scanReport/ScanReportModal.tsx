import { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, FileText, Calendar, Cpu } from "lucide-react";
import type { IScanReport } from "@/types/scanReport.types";

interface ScanReportModalProps {
  report: IScanReport | null;
  open: boolean;
  onClose: () => void;
}

// Circular SVG score ring
const ScoreRing = ({ percentage }: { percentage: number }) => {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const color = useMemo(() => {
    if (percentage >= 75) return "#22c55e"; // green-500
    if (percentage >= 50) return "#f59e0b"; // amber-500
    return "#ef4444"; // red-500
  }, [percentage]);

  const label = useMemo(() => {
    if (percentage >= 75) return "Excellent Match";
    if (percentage >= 50) return "Good Match";
    return "Needs Improvement";
  }, [percentage]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <svg height={radius * 2} width={radius * 2}>
          {/* Background track */}
          <circle
            stroke="oklch(1 0 0 / 8%)"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Score arc */}
          <circle
            stroke={color}
            fill="transparent"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${circumference} ${circumference}`}
            style={{
              strokeDashoffset,
              transform: "rotate(-90deg)",
              transformOrigin: "50% 50%",
              transition: "stroke-dashoffset 1s ease",
              filter: `drop-shadow(0 0 6px ${color}88)`,
            }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-3xl font-bold tabular-nums"
            style={{ color }}
          >
            {percentage}%
          </span>
          <span className="text-xs text-zinc-400 mt-0.5">match</span>
        </div>
      </div>
      <span
        className="text-sm font-semibold px-3 py-1 rounded-full"
        style={{ backgroundColor: `${color}22`, color }}
      >
        {label}
      </span>
    </div>
  );
};

const ScanReportModal = ({ report, open, onClose }: ScanReportModalProps) => {
  if (!report) return null;

  const formattedDate = new Date(report.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="dark max-w-2xl bg-zinc-950 border border-zinc-800 text-foreground p-0 overflow-hidden shadow-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <DialogTitle className="text-lg font-semibold text-white">
              Scan Report
            </DialogTitle>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 mt-1 ml-10">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
            <span className="text-zinc-700">•</span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5" />
              Report #{report.id}
            </span>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="px-6 py-6 space-y-6">
            {/* Score Ring */}
            <div className="flex justify-center">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl px-10 py-6">
                <ScoreRing percentage={report.matchPercentage} />
              </div>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Summary */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                AI Summary
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-3">
                {report.analysisResult.summary}
              </p>
            </div>

            <Separator className="bg-zinc-800" />

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Skills Found */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <h3 className="text-sm font-semibold text-zinc-300">
                    Skills Matched{" "}
                    <span className="text-green-500">
                      ({report.analysisResult.skillsFound.length})
                    </span>
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {report.analysisResult.skillsFound.length > 0 ? (
                    report.analysisResult.skillsFound.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-colors text-xs"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-zinc-600 italic">
                      No matching skills found
                    </span>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <h3 className="text-sm font-semibold text-zinc-300">
                    Missing Skills{" "}
                    <span className="text-red-500">
                      ({report.analysisResult.missingSkills.length})
                    </span>
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {report.analysisResult.missingSkills.length > 0 ? (
                    report.analysisResult.missingSkills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors text-xs"
                      >
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-zinc-600 italic">
                      All required skills matched!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ScanReportModal;
