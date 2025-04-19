"use client"

import PageWithBackButton from "@/components/page-with-back-button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const LoginFormSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(5)
})

const LoginPage = () => {
    const form = useForm<z.infer<typeof LoginFormSchema>>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            email: "",
            username: "",
            password: ""
        },
    });

    function onSubmit(values: z.infer<typeof LoginFormSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                        <Button type="submit" size={"lg"} variant={"glow"} disabled={!form.formState.isValid}>Login</Button>
                    </form>
                </Form>
            </div>
        </PageWithBackButton>
    )
}

export default LoginPage