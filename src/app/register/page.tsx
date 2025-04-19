"use client";

import PageWithBackButton from "@/components/page-with-back-button";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const RegisterFormSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(5),
  confirmPassword: z.string().min(5)
});

const RegisterPage = () => {
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: ""
    },
  });

  function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <PageWithBackButton backHref="/" className="justify-center items-center">
      <div className="flex flex-col gap-8 w-[90%]">
        <h1 className="px-4 font-bold text-3xl transition-colors">
          Register
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="none">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Enter Email" {...field} autoComplete="none" />
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
                    <Input placeholder="Enter Username" {...field} autoComplete="none" />
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
                    <Input placeholder="Enter Password" {...field} type="password" autoComplete="none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Confirm Password" {...field} type="password" autoComplete="none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size={"lg"} variant={"glow"} disabled={!form.formState.isValid}>Register</Button>
          </form>
        </Form>
      </div>
    </PageWithBackButton>
  )
}

export default RegisterPage