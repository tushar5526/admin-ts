import { useDataProvider, useNotify, useResourceContext } from "react-admin";
import { useMutation } from "react-query";

import { Button } from "@mui/material";

export const ChangePasswordButton = ({ record }: any) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const resource = useResourceContext();
  const { mutate, isLoading } = useMutation(
    ["changePassword", record.id],

    () =>
      dataProvider.changePassword(resource, {
        loginId: record?.username,
        password: resource == "shiksha_saathi_user" ? "1234abcd" : resource == "e_samwaad_user" ? "himachal12345" : null
      }),

    {
      onSuccess: (data: any) => {
        notify(data?.data, { type: "success" });
      },
      onError: (error: any) => {
        notify(error.toString(), { type: "error" });
      },
    }
  );
  return (
    <Button
      variant={"outlined"}
      sx={{ marginTop: "10px", color: "green", borderColor: "green" }}
      onClick={() => {
        mutate();
      }}
      disabled={isLoading}
    >
      Change Password
    </Button>
  );
};
