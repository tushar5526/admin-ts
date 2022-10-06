import { client, clientGQL } from "../../api-clients/users-client";
import { DataProvider } from "ra-core";
import { default as BaseDataProvider } from "./baseUsersDataProvider";

export const SCHOOL_BY_UDISE = `query($udise: Int!){
  school(limit:10, where:{udise:{_eq:$udise}}){
     name
     udise
     id
  }
}`;
const dataProvider: DataProvider = {
  ...BaseDataProvider,
  getSchoolByUDISE: async (resource: string, udise: string): Promise<any> => {
    if (!udise) {
      return {
        data: "",
      };
    }
    const r = await clientGQL(SCHOOL_BY_UDISE, {
      udise,
    });
    if (r) {
      const response = await r.json();
      return {
        data: response?.data?.school?.[0],
      };
    }
    return {
      data: "",
    };
  },
  getMany: async (...params: any): Promise<any> => {
    const response = await client.get("admin/searchUser");
  },
  getManyReference: async (...params: any): Promise<any> => {
    const response = await client.get("admin/searchUser");
  },
  update: async (...params: any): Promise<any> => {
    const response = await client.get("admin/searchUser");
  },
  updateMany: async (...params: any): Promise<any> => {
    const response = await client.get("admin/searchUser");
  },
  create: async (...params: any): Promise<any> => {
    const response = await client.get("admin/searchUser");
  },
  delete: async (...params: any): Promise<any> => {
    const response = await client.get("admin/searchUser");
  },
  deleteMany: async (...params: any): Promise<any> => {
    const response = await client.get("admin/searchUser");
  },
};
export default dataProvider;
