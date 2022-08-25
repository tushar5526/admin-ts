import {useQuery} from "react-query";
import {useDataProvider} from "react-admin";
import {useMemo} from "react";
import * as _ from 'lodash';

const WithMyDistricts = ({children}: { children: any }) => {
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
    const districts = useMemo(() => {
        if (!districtData) {
            return [];
        }
        return _.uniqBy(districtData, "district").map((a) => {
            return {
                id: a.district,
                name: a.district,
            };
        });
    }, [districtData]);
    if (isLoading) {
        return <>
            Loading... </>
    }
    return children(districts)

}
export default WithMyDistricts;