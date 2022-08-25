import {useQuery} from "react-query";
import {useDataProvider} from "react-admin";
import {useMemo} from "react";
import * as _ from 'lodash';

const WithMyBlocks = ({children, district}: { children: any, district?: string }) => {
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

    const blocks = useMemo(() => {
        if (!districtData) {
            return [];
        }
        return _.uniqBy(
            districtData.filter((d) => d.district === district || !district),
            "block"
        ).map((a) => {
            return {
                id: a.block,
                name: a.block,
            };
        });
    }, [district, districtData]);

    if (isLoading) {
        return <>
            Loading... </>
    }
    return children(blocks)

}
export default WithMyBlocks;