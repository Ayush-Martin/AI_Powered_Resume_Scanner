import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="dark flex min-h-screen bg-background text-foreground">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-black/90 border-r border-border">
        <div className="relative z-10 flex flex-col justify-center px-16 py-12">
          <div className="mb-12">
            <h1 className="text-5xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              AI Powered
              <br />
              <span className="text-primary">Resume Scanner</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Streamline your recruitment process with powerful AI-driven resume parsing and insights.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:px-8">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};
