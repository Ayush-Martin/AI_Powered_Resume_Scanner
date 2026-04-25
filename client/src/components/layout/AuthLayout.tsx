import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="dark min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.01] blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/[0.01] blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="w-full max-w-md space-y-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Brand Logo - More Compact */}
        <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-left">
                <h1 className="text-xl font-black text-white tracking-tighter uppercase leading-none">Scanner AI</h1>
                <p className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.3em]">Intelligence</p>
            </div>
        </div>

        {/* Content Card - Reduced Padding */}
        <div className="p-6 md:p-8 rounded-[2.5rem] bg-zinc-950 border border-zinc-900 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] blur-[40px] rounded-full group-hover:bg-white/[0.02] transition-all duration-700"></div>
           {children}
        </div>

        {/* Footer Info - Compact */}
        <div className="text-center opacity-40">
            <p className="text-[8px] font-black text-zinc-700 uppercase tracking-widest leading-loose">
                Secure LLM Analysis · Enterprise Grade
            </p>
        </div>
      </div>
    </div>
  );
};
