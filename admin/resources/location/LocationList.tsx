import {Datagrid, List, SelectInput, TextField, TextInput, useDataProvider, useListContext} from "react-admin";
import {useLocation} from "react-router-dom";
import {useMemo, useState} from "react";
import {useQuery} from "react-query";
import * as _ from "lodash";

const LocationList = () => {
    const location = useLocation();
    const params: any = new Proxy(new URLSearchParams(location.search), {
        get: (searchParams, prop) => searchParams.get(prop as string),
    });
    const initialFilters = params.filter ? JSON.parse(params.filter) : null;
    const [selectedDistrict, setSelectedDistrict] = useState(
        initialFilters?.district || ""
    );
    const [selectedBlock, setSelectedBlock] = useState(
        initialFilters?.block || ""
    );
    const [selectedCluster, setSelectedCluster] = useState(
        initialFilters?.cluster || ""
    );

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
    const blocks = useMemo(() => {
        if (!selectedDistrict || !districtData) {
            return [];
        }
        return _.uniqBy(
            districtData.filter((d) => d.district === selectedDistrict),
            "block"
        ).map((a) => {
            return {
                id: a.block,
                name: a.block,
            };
        });
    }, [selectedDistrict, districtData]);

    const clusters = useMemo(() => {
        if (!selectedBlock || !districtData) {
            return [];
        }
        return _.uniqBy(
            districtData.filter((d) => d.block === selectedBlock),
            "cluster"
        ).map((a) => {
            return {
                id: a.cluster,
                name: a.cluster,
            };
        });
    }, [selectedBlock, districtData]);

    const Filters = [
        <TextInput label="ID" source="id" alwaysOn key={'search'}/>,
        <SelectInput
            label="District"
            key={'district'}
            onChange={(e: any) => setSelectedDistrict(e.target.value)}
            value={selectedDistrict}
            source="district"
            choices={districts}
        />,
        selectedDistrict ? (
            <SelectInput
                label="Block"
                onChange={(e) => setSelectedBlock(e.target.value)}
                value={selectedBlock}
                source="block"
                choices={blocks}
            />
        ) : (
            <></>
        ),
        selectedBlock ? (
            <SelectInput
                label="Cluster"
                onChange={(e) => setSelectedCluster(e.target.value)}
                value={selectedCluster}
                source="cluster"
                choices={clusters}
            />
        ) : (
            <></>
        ),
    ];
    return (
        <List
            sx={{paddingTop: '20px'}}
            filters={Filters}>
            <Datagrid rowClick={"edit"}>
                <TextField source="id"/>
                <TextField source="district"/>
                <TextField source="block"/>
                <TextField source="cluster"/>
            </Datagrid>
        </List>
    );
};
export default LocationList;
