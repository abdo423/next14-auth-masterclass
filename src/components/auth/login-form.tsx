"use client";

import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { login } from "../../../actions/login";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";

// Extended schema to include OTP
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
  code: z.string().optional(),
});

export const LoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ;
  console.log(callbackUrl);
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email is used with different provider"
      : "";
  const [isSubmitting, setIsSubmitting] = useTransition();
  const [status, setStatus] = useState({
    error: "",
    success: "",
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setStatus({ error: "", success: "" });
    setIsSubmitting(() => {
      login({ ...values, code: form.getValues("code") })
        .then((response) => {
          if (response?.error) {
            setStatus({ error: response.error, success: "" });
          } else if (response?.success) {
            setStatus({ error: "", success: response.success });
            // Redirect to the default login page after successful login
            window.location.href = callbackUrl || DEFAULT_LOGIN_REDIRECT;
          } else if (response?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch((e) => {
          console.error("Login error:", e);
          setStatus({ error: "Something went wrong", success: "" });
        });
    });
  };

  const handleOTPChange = (value: string) => {
    form.setValue("code", value);
    if (value.length === 6) {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <CardWrapper
      headerLabel="Welcome back!"
      backButtonLabel="don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div
            className={`space-y-6 ${
              showTwoFactor ? "flex flex-col justify-center items-center" : ""
            }`}
          >
            {showTwoFactor ? (
              <div className="grid gap-4 w-full">
                <FormField
                  control={form.control}
                  name="code"
                  render={() => (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel className="text-center mb-4">
                        Enter the 6-digit code sent to your email
                      </FormLabel>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                          value={form.getValues("code")}
                          onChange={handleOTPChange}
                          disabled={isSubmitting}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          placeholder="john.doe@example.com"
                          type="email"
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="********"
                          type="password"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <FormSuccess message={status.success} />
            <FormError message={status.error || urlError} />
            <Button
              disabled={isSubmitting}
              type="submit"
              className={!showTwoFactor ? "w-full" : "w-1/2"}
            >
              {showTwoFactor ? "Confirm" : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
