"use client";

import PageWithBackButton from "@/components/page-with-back-button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { LoginFormSchema } from "@/zod/auth-schemas";
import { loginAction } from "@/server-actions/auth-actions";
import ButtonLink from "@/components/button-link";

const LoginPage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        },
    });

    async function onSubmit(values: z.infer<typeof LoginFormSchema>) {
        try {
            const res = await loginAction(values);
            if (res.status) router.push("/about");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <PageWithBackButton backHref="/" className="justify-center items-center">
            <div className="flex flex-col gap-8 w-[90%]">
                <h1 className="px-4 font-bold text-3xl transition-colors">
                    Login
                </h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Enter Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="Enter Username" {...field} />
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
                                    <FormControl>
                                        <Input placeholder="Enter Password" {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" size={"lg"} variant={"glow"} disabled={!form.formState.isValid}>
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="flex items-center gap-1 mt-6">
                <p>No account?</p> <ButtonLink href="/register">Register here</ButtonLink>
            </div>
        </PageWithBackButton>
    );
};

export default LoginPage;