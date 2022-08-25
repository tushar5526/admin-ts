import {useQuery} from "react-query";
import {useDataProvider} from "react-admin";
import {useMemo} from "react";
import * as _ from 'lodash';

const WithMyClusters = ({children, block}: { children: any, block?: string }) => {
    const dataProvider = useDataProvider();
    const {data: _districtData, isLoading, error} = useQuery(
        ['location', 'getList', {}],
        () => dataProvider.getList('location', {
            pagination: {perPage: 10000, page: 1},
            sort: {field: 'id', order: 'asc'},
            filter: {}
        })
    );
    const districtData = useMemo(() => {
        return _districtData?.data;
    }, [_districtData]);

    const clusters = useMemo(() => {
        if (!districtData) {
            return [];
        }
        return _.uniqBy(
            districtData.filter((d) => d.block === block || !block),
            "cluster"
        ).map((a) => {
            return {
                id: a.cluster,
                name: a.cluster,
            };
        });
    }, [block, districtData]);

    if (isLoading) {
        return <>
            Loading... </>
    }
    return children(clusters)

}
export default WithMyClusters;