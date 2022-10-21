import { client } from "../../api-clients/users-client";
import { DataProvider } from "ra-core";
import { default as BaseDataProvider } from "./baseUsersDataProvider";

const dataProvider: DataProvider = {
  ...BaseDataProvider,
  getMany: async (...params: any): Promise<any> => {
    const response = await client.get("/admin/searchUser");
  },
  getManyReference: async (...params: any): Promise<any> => {
    const response = await client.get("/admin/searchUser");
  },
  update: async (...params: any): Promise<any> => {
    const response = await client.get("/admin/searchUser");
  },
  updateMany: async (...params: any): Promise<any> => {
    const response = await client.get("/admin/searchUser");
  },
  create: async (...params: any): Promise<any> => {
    console.log(params);
    const response = await client.get("/admin/searchUser");
  },
  delete: async (...params: any): Promise<any> => {
    console.log(params);
    const response = await client.get("/admin/searchUser");
  },
  deleteMany: async (...params: any): Promise<any> => {
    console.log(params);
    const response = await client.get("/admin/searchUser");
  },
};
export default dataProvider;
