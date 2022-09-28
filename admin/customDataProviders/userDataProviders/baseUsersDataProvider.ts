import { client, clientGQL } from "../../api-clients/users-client";

const Applications: any = {
  e_samwaad_user: "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da",
  shiksha_saathi_user: "1ae074db-32f3-4714-a150-cc8a370eafd1",
};

export const UPDATE_USER_BY_ID_QUERY = `
mutation($object:teacher_set_input!, $id:uuid!){
  update_teacher(where:{user_id:{_eq:$id}}, _set:$object){
    returning{
      id
    }
  }
}`;
const dataProvider = {
  getList: async (
    resource: any,
    { pagination: { page, perPage }, filter }: any
  ): Promise<any> => {
    const queryString = [
      `registrations.applicationId:${Applications[resource]}`,
    ];
    if (filter?.udise) {
      queryString.push(`${filter?.udise}`);
    }

    if (filter?.role) {
      queryString.push(`registrations.roles :${filter?.role}`);
    }
    if (filter?.username) {
      queryString.push(`,username=${filter?.username}`);
    }
    const params = {
      startRow: (page - 1) * perPage,
      numberOfResults: perPage,
      queryString: `(${queryString.join(") AND (")})`,
      applicationId: Applications[resource],
    };
    const response = await client.get("/admin/searchUser", { params });
    if (response?.data?.result) {
      return {
        total: response?.data?.result?.total,
        data: response?.data?.result?.users || [],
      };
    } else {
      return {
        total: 0,
        data: [],
      };
    }
  },
  getOne: async (resource: any, { id }: any): Promise<any> => {
    const params = {
      queryString: id,
    };
    const response = await client.get("/admin/searchUser", { params });

    if (response?.data?.result) {
      return {
        data: response?.data?.result?.users[0],
      };
    }
    return response;
  },
  changePassword: async (resource: any, payload: any): Promise<any> => {
    const response = await client.post("/admin/changePassword", payload);
    if (response?.data?.msg) {
      return {
        data: response?.data?.msg,
      };
    }
    throw new Error("Unable to update");
  },
  updateUser: async (resource: any, data: any): Promise<any> => {
    const d = data.gql ? JSON.parse(JSON.stringify(data.gql)) : null;
    const id = data.id;
    delete data["designation"];
    delete data["employment"];
    delete data["account_status"];
    delete data["gql"];
    delete data["id"];
    try {
      const response = await client.patch("/admin/updateUser/" + id, data);
      if (d) {
        await clientGQL(UPDATE_USER_BY_ID_QUERY, { object: d, id: id });
      }
      if (response?.data?.result) {
        return {
          data: response?.data?.result,
        };
      }
    } catch (e) {
      console.log(e);
    }
    throw new Error("Unable to update");
  },
};
export default dataProvider;
