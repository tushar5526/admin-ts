import { useDataProvider } from 'react-admin';
import { useQuery } from "react-query";
import * as _ from "lodash";


export const getLocationDetails = () => {
    const dataProvider = useDataProvider();
    const { data: _districtData, isLoading, error } = useQuery(
        ['location', 'getList', {}],
        () => dataProvider.getList('location', {
            pagination: { perPage: 10000, page: 1 },
            sort: { field: 'id', order: 'asc' },
            filter: {}
        })
    );
    const districts = _.uniqBy(_districtData?.data, "district").map(el => { return { id: el.district, name: el.district } });
    const blocks = _.uniqBy(_districtData?.data, "block").map(el => { return { id: el.block, name: el.block } });
    const clusters = _.uniqBy(_districtData?.data, "cluster").map(el => { return { id: el.cluster, name: el.cluster } });

    return { districts, blocks, clusters }
}
