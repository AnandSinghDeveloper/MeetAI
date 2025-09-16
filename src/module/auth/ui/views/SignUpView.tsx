"use client";
import { Card, CardContent } from "@/components/ui/card";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Funnel_Display } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlertIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";
import { useRouter } from "next/navigation";

const funnelDisplay = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const formSchema = z
  .object({
    name: z.string().min(3, {
      message: "Name is required and must be at least 3 characters",
    }),
    email: z.string().email(),
    password: z.string().min(3, {
      message: "Password is required and must be at least 3 characters",
    }),
    confirmPassword: z.string().min(3, { message: "Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const from = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push(`/`);
        },
        onError: (error) => {
          setError(error.error.message);
          setPending(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className=" overflow-hidden p-0">
        <CardContent className=" grid p-0 md:grid-cols-2">
          <Form {...from}>
            <form onSubmit={from.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6 ">
                <div className="flex flex-col items-center text-center">
                  <h1 className=" text-2xl font-bold">
                    Let's started with
                    <span
                      className={`${funnelDisplay.className} text-green-700`}
                    >
                      &nbsp;MeetAi
                    </span>
                  </h1>
                  <p className="text-balance text-muted-foreground">
                    Create your account
                  </p>
                </div>
                <div className="grid gap-4">
                  <FormField
                    control={from.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4">
                  <FormField
                    control={from.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ma7Iv@example.com"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4">
                  <FormField
                    control={from.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="**********"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4">
                  <FormField
                    control={from.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="**********"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className=" !text-destructive h-4 w-4" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button disabled={pending} type="submit">
                  <span>Sign Up</span>
                </Button>
                <div className=" after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0  after:flex after:items-center after:border-t   ">
                  <span className="relative z-10 px-2 bg-card  text-muted-foreground">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() =>
                      authClient.signIn.social({
                        provider: "google",
                      })
                    }
                    variant={"outline"}
                    type="button"
                    className="w-full"
                  >
                    <FcGoogle className="mr-2 h-5 w-5" />
                    Google
                  </Button>
                  <Button
                    onClick={() =>
                      authClient.signIn.social({
                        provider: "github",
                      })
                    }
                    variant={"outline"}
                    type="button"
                    className="w-full"
                  >
                    <FaGithub className="mr-2 h-5 w-5" />
                    Github
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account{" "}
                  <Link
                    className=" underline underline-offset-4"
                    href="/SignUp"
                  >
                    Sign In
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className=" bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">
            <img src=" /logo.svg" alt="Image" className="h-[92px] w-[92px]" />
            {/* <p
              className={` ${funnelDisplay.className} text-2xl font-bold text-emerald-950`}
            >
              MeetAi
            </p> */}
          </div>
        </CardContent>
      </Card>

      <div className=" text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline-offset-4 *:[a]:underline">
        By clicking Sign In, you agree to our <a href="#">Terms of Service</a>{" "}
        and acknowledge you have read our <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};

export default SignUpView;
