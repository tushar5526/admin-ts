import {client} from "../../api-clients/users-client";
import {DataProvider} from "ra-core";

const Applications: any = {
    "e_samwaad_user": "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da",
    "shiksha-saathi": "1ae074db-32f3-4714-a150-cc8a370eafd1",
}
const dataProvider: DataProvider = {
    getList: async (resource, {pagination: {page, perPage}, filter}: any): Promise<any> => {
        const queryString = [
            `registrations.applicationId:${Applications[resource]}`
        ]
        if (filter?.udise) {
            queryString.push(`${filter?.udise}`)
        }
        if (filter?.role) {
            queryString.push(`registrations.roles :${filter?.role}`)
        }
        const params = {
            startRow: (page - 1) * perPage,
            numberOfResults: perPage,
            "queryString": `(${queryString.join(') AND (')})`,
            "applicationId": Applications[resource],
        }
        const response = await client.get('/admin/searchUser', {params})
        if (response?.data?.result) {
            return {
                total: response?.data?.result?.total,
                data: response?.data?.result?.users,
            }
        }
        return response;
    },
    getOne: async (resource, { id}: any): Promise<any> => {
        const params = {
            "queryString": id,
        }
        const response = await client.get('/admin/searchUser', {params})

        if (response?.data?.result) {
            return response?.data?.result?.users[0]
        }
        return response;
    },
    getMany: async (...params: any): Promise<any> => {
        console.log(params)
        const response = await client.get('admin/searchUser')
    },
    getManyReference: async (...params: any): Promise<any> => {
        console.log(params)
        const response = await client.get('admin/searchUser')
    },
    update: async (...params: any): Promise<any> => {
        console.log(params)
        const response = await client.get('admin/searchUser')
    },
    updateMany: async (...params: any): Promise<any> => {
        console.log(params)
        const response = await client.get('admin/searchUser')
    },
    create: async (...params: any): Promise<any> => {
        console.log(params)
        const response = await client.get('admin/searchUser')
    },
    delete: async (...params: any): Promise<any> => {
        console.log(params)
        const response = await client.get('admin/searchUser')
    },
    deleteMany: async (...params: any): Promise<any> => {
        console.log(params)
        const response = await client.get('admin/searchUser')
    }
}
export default dataProvider;