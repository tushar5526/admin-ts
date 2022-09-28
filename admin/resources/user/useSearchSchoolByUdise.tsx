import { useState } from "react";
import { clientGQL } from "../../api-clients/users-client";

type ReturnType = {
  school: any;
  isLoading: boolean;
  refresh: any;
};

export const SCHOOL_BY_UDISE = `query($udise: Int!){
  school(limit:10, where:{udise:{_eq:$udise}}){
     name
     udise
     id
  }
}`;

//@ts-ignore

export const Applications: { [key: any]: string } = {
  esamvaad: "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da",
  "shiksha-saathi": "1ae074db-32f3-4714-a150-cc8a370eafd1",
};

export type FilterType = {
  numberOfResults?: number;
  page?: number;
};

export const useSearchSchoolByUDISE = (): ReturnType => {
  const [isLoading, setIsLoading] = useState(false);
  const [school, setSchool] = useState(null as any);
  const refresh = async (udise: string) => {
    try {
      setIsLoading(true);
      const response = await clientGQL(SCHOOL_BY_UDISE, {
        udise,
      });
      const d = await response.json();
      if (d.data?.school?.[0]) {
        setSchool(d.data?.school?.[0]);
      } else {
        setSchool(null);
      }
    } catch (e) {
      setSchool(null);
    }
    setIsLoading(false);
  };

  return {
    school,
    isLoading,
    refresh,
  };
};
