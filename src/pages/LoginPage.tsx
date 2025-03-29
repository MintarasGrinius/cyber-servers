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
import { isObjectWithMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const { control, handleSubmit } = form;

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      const response = await fetch("https://playground.tesonet.lt/v1/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const responseData = await response.json();
      login(responseData.token);
    } catch (error: unknown) {
      if (isObjectWithMessage(error)) {
        setServerError(error.message);
      } else {
        console.error(error);
        setServerError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      <div className="max-w-md w-full space-y-4">
        <h2 className="text-2xl font-semibold">Login</h2>
        <Form {...form}>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <FormField
              control={control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {serverError && <div className="text-red-500">{serverError}</div>}
            <Button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
