import * as React from "react";
import { Admin, Resource, combineDataProviders } from "react-admin";
import { useEffect, useState } from "react";
import getDataProvider from "./customDataProviders";
import jsonServerProvider from "ra-data-json-server";
import authProvider from "./authProvider";
import Login from "./Login/Login";
import { EsamwaadUserDataProvider } from "./customDataProviders/userDataProviders";
import { lightTheme } from "./components/layout/themes";
import { Layout } from "./components/layout";
import { MenuItemsWithPermissionResolver } from "./components/layout/MenuOptions";

import * as MuiIcons from "@mui/icons-material"


//
const JSONDp = jsonServerProvider("https://jsonplaceholder.typicode.com");

const fixBlankPage = () => {
  // temporary fix
  if (
    !window.location.href.includes("#/login") &&
    !window.location.href.includes("student")
  ) {
    window.location.href += "#/login";
  }
};

const App = () => {
  const [dataProvider, setDataProvider] = useState(null as any);
  const session: any = {
    user: {
      name: null,
      email: null,
      image: null,
    },
    expires: "2022-09-23T04:48:50.273Z",
    jwt: localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData") || "").user.token
      : "",
    role: "Admin",
    fullName: "Samarth-Admin",
    username: "samarth-admin",
    applicationId: "f0ddb3f6-091b-45e4-8c0f-889f89d4f5da",
  };
  const JSONDataProvider = {
    ...JSONDp,
    updateSamarthUser: (...r: any) => {},
  };
  const prepareDataProviders = async () => {
    try {
      const hasuraDP = await getDataProvider(session);
      const _dataProvider = combineDataProviders((resource) => {
        switch (resource) {
          case "teacher":
          case "school":
          case "student":
          case "deadline":
          case "submission_type":
          case "location":
          case "ss_school_allocation_data":
          case "ss_school_allocation_quarter":
          case "grade_assessment":
          case "assessment":
          case "stream":
            return hasuraDP;
          case "users":
            return JSONDataProvider;
          case "e_samwaad_user":
            return EsamwaadUserDataProvider;
          case "shiksha_saathi_user":
            return EsamwaadUserDataProvider;
          default:
            throw new Error(`Unknown resource: ${resource}`);
        }
      });
      setDataProvider(_dataProvider);
    } catch (e) {}
  };
  useEffect(() => {
    prepareDataProviders();
    fixBlankPage();
  }, []);

  if (!dataProvider) return <p>Loading...</p>;

  return (
    <Admin
      dataProvider={dataProvider}
      theme={lightTheme}
      layout={Layout}
      authProvider={authProvider}
      loginPage={Login}
    >
      {(permissions) =>
        MenuItemsWithPermissionResolver(permissions).map((option, index) => {
          // Need to fix type errors with Icon.
          // const IconComponent = () => {
          //   const Icon = null;
          //   return <Icon />
          // }
          return (
            <Resource
              key={index}
              name={option?.resource}
              {...option?.props}
            />
          );
        })
      }
    </Admin>
  );
};
export default App;
