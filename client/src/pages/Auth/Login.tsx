import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginService } from "../../services/auth.service";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";
import userValidationRules from "@/validation/validationRule/userValidationRules";
import { jwtDecode } from "jwt-decode";
import { AuthLayout } from "../../components/layout/AuthLayout";
import useAuthStore from "@/store/useAuthStore";

const formSchema = z.object({
  email: userValidationRules.Email,
  password: userValidationRules.Password,
});

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const accessToken = await loginService(values.email, values.password);
    setIsLoading(false);
    if (accessToken) {
      login(accessToken);
      const decoded = jwtDecode(accessToken) as { role?: string };
      
      const from = location.state?.from?.pathname || (decoded.role === "Admin" ? "/admin" : "/dashboard");
      navigate(from, { replace: true });
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-1 mb-6">
        <h2 className="text-xl font-black text-white tracking-tight uppercase">Login</h2>
        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
          Enter credentials to access
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@company.com"
                    className="h-12 bg-zinc-900 border-zinc-800 rounded-xl px-5 text-sm font-bold focus:border-zinc-600 focus:ring-0 transition-all placeholder:text-zinc-800"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-1">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 bg-zinc-900 border-zinc-800 rounded-xl px-5 text-sm font-bold focus:border-zinc-600 focus:ring-0 transition-all placeholder:text-zinc-800"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[9px] font-bold text-red-500 uppercase tracking-widest ml-1" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className={`w-full h-14 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-500 mt-2 ${
                isLoading 
                ? "bg-zinc-800 text-zinc-700" 
                : "bg-white text-black hover:bg-zinc-200 shadow-lg active:scale-95"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
                <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Checking...
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Secure Login
                </div>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-8 pt-6 border-t border-zinc-900/50 text-center">
        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
          New?{" "}
          <Link to="/auth/register" className="text-white hover:text-primary transition-colors inline-flex items-center gap-1.5 ml-1 group">
            Create <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;