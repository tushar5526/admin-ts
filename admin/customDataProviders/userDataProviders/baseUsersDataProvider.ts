import {client} from "../../api-clients/users-client";

const Applications: any = {
    "e_samwaad_user": "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da",
    "shiksha_saathi_user": "1ae074db-32f3-4714-a150-cc8a370eafd1",
}
const dataProvider = {
    getList: async (resource: any, {pagination: {page, perPage}, filter}: any): Promise<any> => {
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
    getOne: async (resource: any, {id}: any): Promise<any> => {
        const params = {
            "queryString": id,
        }
        const response = await client.get('/admin/searchUser', {params})

        if (response?.data?.result) {
            return response?.data?.result?.users[0]
        }
        return response;
    },
}
export default dataProvider;