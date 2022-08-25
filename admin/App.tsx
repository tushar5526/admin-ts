import * as React from "react";
import {Admin, Resource, combineDataProviders, ListGuesser} from 'react-admin';
import {useEffect, useState} from "react";
import getDataProvider from "./customDataProviders";
import student from "./resources/student";
import location from "./resources/location";
import gradeAssessment from "./resources/gradeAssessment";

import jsonServerProvider from 'ra-data-json-server';
import school from "./resources/student";
import {Esamwaad} from "./resources/user";
import authProvider from "./authProvider";
import Login from "./Login";
import {EsamwaadUserDataProvider} from "./customDataProviders/userDataProviders";
import ShikshaSaathi from "./resources/user/shikshaSaathi";
import {lightTheme} from "./components/layout/themes";
import {Layout} from "./components/layout";
import MenuOptions from "./components/layout/MenuOptions";
//
const JSONDp = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App = () => {
    const [dataProvider, setDataProvider] = useState(null as any);
    const session: any = {
        "user": {
            "name": null,
            "email": null,
            "image": null
        },
        "expires": "2022-09-23T04:48:50.273Z",
        "jwt": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlVVdzVZdVFWNnd2R29PdmZYNHBxWTdwS18zbyJ9.eyJhdWQiOiJmMGRkYjNmNi0wOTFiLTQ1ZTQtOGMwZi04ODlmODlkNGY1ZGEiLCJleHAiOjE2NjQ5MTY1MTgsImlhdCI6MTY2MTMxNjUxOCwiaXNzIjoiYWNtZS5jb20iLCJzdWIiOiIxNTgyOWVhNC1kNTdhLTRjNTItODU5ZS0wNTkwMDFjNjFiZmIiLCJqdGkiOiIwMmRlZTY2NS0zYjhjLTQ5Y2QtOTc5My1kNTc4MTAwNzYzMzUiLCJhdXRoZW50aWNhdGlvblR5cGUiOiJQQVNTV09SRCIsImVtYWlsIjoic2FtYXJ0aC1hZG1pbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoic2FtYXJ0aC1hZG1pbiIsImFwcGxpY2F0aW9uSWQiOiJmMGRkYjNmNi0wOTFiLTQ1ZTQtOGMwZi04ODlmODlkNGY1ZGEiLCJyb2xlcyI6WyJBZG1pbiIsIkNvbW11bmljYXRpb25zIl0sInVzZXJEYXRhIjp7Ijc3NjM4ODQ3LWRiMzQtNDMzMS1iMzY5LTU3NjhmZGZlZGVkZCI6eyJyb2xlSWQiOiI1Zjk1NTQ4NTFlNmUzMzRkYjJlMTcyZjMifSwiZjBkZGIzZjYtMDkxYi00NWU0LThjMGYtODg5Zjg5ZDRmNWRhIjp7InJvbGVJZCI6IjVlZTlkN2U2ZTY4MDZlNzZhODU1MTk0OCJ9LCJyb2xlRGF0YSI6eyJkaXN0cmljdCI6IkFMTCIsImdlb2dyYXBoaWNfbGV2ZWwiOiJTdGF0ZSJ9LCJyb2xlSWQiOiI1ZWUxZjI2OThlZTQwMTZiNTM4MDljYjQifSwiaHR0cHM6Ly9oYXN1cmEuaW8vand0L2NsYWltcyI6eyJ4LWhhc3VyYS1hbGxvd2VkLXJvbGVzIjpbIkFkbWluIiwiQ29tbXVuaWNhdGlvbnMiXSwieC1oYXN1cmEtZGVmYXVsdC1yb2xlIjoiQWRtaW4iLCJYLUhhc3VyYS1Vc2VyLUlkIjoic2FtYXJ0aC1hZG1pbiIsIlgtSGFzdXJhLUxvZ2luLUlkIjoiMTU4MjllYTQtZDU3YS00YzUyLTg1OWUtMDU5MDAxYzYxYmZiIiwiWC1IYXN1cmEtU2Nob29sLUlkIjoidW5kZWZpbmVkIiwiWC1IYXN1cmEtVWRpc2UtSWQiOiJ1bmRlZmluZWQiLCJYLUhhc3VyYS1MZXZlbCI6IlN0YXRlIiwiWC1IYXN1cmEtRGlzdHJpY3QiOiJBTEwifSwicG9saWN5IjoiZXNhbXdhZCJ9.BpBd8K-o6tyrpfURJucslKRD5usLOSdBmEd2SF7KE_q9byPyb203dBDZnfsBnS7pbGt8G-12tx_oUmNhtBuJozhyaFKJPdmEHsfOC4vQkmBc_1fdn6btoGFf1MT1k_m5Mnleduzwa0gd_cH7ss1HtU02Z0CVZO4bZvrY-IQlad_dbkZmKKKSu9bsrjE5DhSLzXLIqC7mzme4HK1P9IfffTOR9U7wDDmh4s7gU49a7XvhvZIQnNwXaA4CbHcPzoUMkuXXybJcS5geD3VkLhvM4fmhYV9Yi8W5q-pry-AI4ww7jdW2Bt7ek-AwP_hjccf4R6SbQuEidMBCr0LuWOEJ1w",
        "role": "Admin",
        "fullName": "Samarth-Admin",
        "username": "samarth-admin",
        "applicationId": "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da"
    }
    const JSONDataProvider = {
        ...JSONDp,
        updateSamarthUser: (...r: any) => {
            console.log(r)
        }
    }
    const prepareDataProviders = async () => {
        try {
            const hasuraDp = await getDataProvider(session);
            const _dataProvider = combineDataProviders((resource) => {
                switch (resource) {
                    case 'teacher':
                    case 'school':
                    case 'student':
                        return hasuraDp;
                    case 'location':
                        return hasuraDp;
                    case 'grade_assessment':
                        return hasuraDp;
                    case 'users':
                        return JSONDataProvider;
                    case 'e_samwaad_user':
                        return EsamwaadUserDataProvider;
                    case 'shiksha_saathi_user':
                        return EsamwaadUserDataProvider;
                    default:
                        throw new Error(`Unknown resource: ${resource}`);
                }
            });
            setDataProvider(_dataProvider);
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        prepareDataProviders();
    }, []);

    if (!dataProvider) return <p>Loading...</p>;
    return (<Admin
            dataProvider={dataProvider}
            theme={lightTheme}
            layout={Layout}
            authProvider={authProvider}
            loginPage={Login}
        >
            {
                MenuOptions.map((option, index)=>{
                    return <Resource key={index} name={option.resource} {...option.props}/>
                })
            }
        </Admin>
    );
};
export default App;
