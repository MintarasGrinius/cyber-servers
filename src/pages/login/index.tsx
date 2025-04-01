import illustration from "@/assets/illustration.svg";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { isObjectWithMessage } from "@/lib/utils";
import { loginRequest } from "@/services/auth/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { LoginFormInputs, loginSchema } from "./validations";

const LoginPage = () => {
  const { login } = useAuth();
  const [serverError, setServerError] = useState("");

  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "tesonet",
      password: "partyanimal",
    },
  });
  const { control, handleSubmit } = form;

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      const { token } = await loginRequest(data);

      login(token);
    } catch (error: unknown) {
      if (isObjectWithMessage(error)) {
        setServerError(error.message);
      } else {
        // TODO: Sentry or other error tracking
        console.error(error);
        setServerError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-background">
      <img
        src={illustration}
        alt="Login Background"
        className="w-full h-full object-fill opacity-20 absolute top-0 left-0"
      />
      <Card
        className="max-w-md w-full backdrop-blur-sm"
        variant="no-background"
      >
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Login to continue to your account</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <CardContent className="space-y-4">
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
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
