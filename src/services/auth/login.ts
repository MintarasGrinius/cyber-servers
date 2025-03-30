import { LoginFormInputs } from "@/pages/login/validations";

export const loginRequest = async (data: LoginFormInputs) => {
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

  if (!responseData.token) {
    // TODO: Sentry or other error tracking
    console.error("Token not found in response", responseData);
    throw new Error("An unexpected error occurred");
  }

  return responseData;
};
