import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { registerService } from "../../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
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
import { AuthLayout } from "../../components/layout/AuthLayout";

const formSchema = z.object({
    username: userValidationRules.Username,
    email: userValidationRules.Email,
    password: userValidationRules.Password,
});

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        const success = await registerService(values.username, values.email, values.password);
        setIsLoading(false);
        if (success) {
            navigate("/auth/login");
        }
    }

    return (
        <AuthLayout>
            <div className="mb-10">
                <h2 className="text-3xl font-bold tracking-tight text-foreground mb-2">
                    Create your account
                </h2>
                <p className="text-muted-foreground">
                    Get started with AI Powered Resume Scanner
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-foreground font-medium">Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="johndoe"
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
                                        placeholder="Create a strong password"
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
                        {isLoading ? "Creating account..." : "Sign Up"}
                    </Button>
                </form>
            </Form>

            <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/auth/login" className="font-semibold text-primary hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Register;