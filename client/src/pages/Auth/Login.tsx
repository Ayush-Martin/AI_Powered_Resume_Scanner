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
import { Loader2 } from "lucide-react";
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
      <div className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
          Welcome back
        </h2>
        <p className="text-muted-foreground">
          Sign in to access your dashboard
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="name@company.com"
                    className="h-12 bg-card border-border focus:border-primary focus:ring-primary/20 transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-medium">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="h-12 bg-card border-border focus:border-primary focus:ring-primary/20 transition-all"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <Link to="/auth/register" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;