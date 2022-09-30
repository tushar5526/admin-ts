import { client } from "../api-clients/users-client";

const AuthApplicationID = "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da";

export const getToken = async (userName: string, password: string) => {
  const body: any = {
    password: `${password}`,
    loginId: `${userName}`,
    applicationId: AuthApplicationID,
  };
  const response = await client.post("/user/login", body);
  if (response?.data?.result?.data) {
    localStorage.setItem(
      "userData",
      JSON.stringify(response?.data?.result?.data)
    );
  }
  return response;
};

export const loginPreCheck = async (userName: string, password: string) => {
  const body: any = {
    password: `${password}`,
    loginId: `${userName}`,
    applicationId: AuthApplicationID,
  };
  const response = await client.post("/user/login", body);

  if (response?.data.responseCode === "OK") return true;
  return false;
};
