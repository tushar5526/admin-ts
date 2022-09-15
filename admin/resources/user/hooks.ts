import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Applications = [
  {
    name: "E-Samvaad Users",
    id: "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da",
    key: "/users/esamvaad",
  },
  {
    name: "Shiksha Saathi Users",
    id: "1ae074db-32f3-4714-a150-cc8a370eafd1",
    key: "/users/shiksha-saathi",
  },
];
type ReturnType = {
  user: any;
  userType: any;
};
export const useLogin = (): ReturnType => {
  const [user, setUser] = useState(null as any);
  const [userType, setUserType] = useState("ADMIN" as "ADMIN" | "SCHOOL");

  useEffect(() => {
    if (localStorage.getItem("userData")) {
      let userData = JSON.parse(localStorage.getItem("userData") as string);
      setUser(userData["user"]);
      setUserType(localStorage.getItem("userType") as any);
    }
  }, []);

  return {
    user,
    userType,
  };
};
