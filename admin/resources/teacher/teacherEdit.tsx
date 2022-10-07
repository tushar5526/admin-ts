import {
  TextInput,
  ReferenceInput,
  SelectInput,
  ReferenceField,
  useDataProvider,
  useNotify,
  useResourceContext,
  Button,
  TextField,
} from "react-admin";
import { useMutation, useQuery } from "react-query";
import EditWrapper from "../../components/styleWrappers/EditWrapper";
const ChangePasswordButton = ({ record }: any) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const resource = useResourceContext();
  console.log(record); // Not Coming.

  const { mutate, isLoading } = useMutation(
    ["changePassword", record.id],

    () =>
      dataProvider.changePassword(resource, {
        loginId: record.record.username,
        password: resource === "e_samwaad_user" ? "himachal12345" : "1234abcd",
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
      variant={"contained"}
      sx={{ marginTop: "10px" }}
      // onClick={() => mutate()}
      // disabled={isLoading}
    >
      <>Change Password</>
    </Button>
  );
};

const TeacherEdit = ({ record }: any) => {
  const statusChoices = [
    {
      id: "PENDING",
      name: "Pending", //No Action Taken
      icon: "warning",
      color: "#FEC400",
    },
    {
      id: "REJECTED",
      name: "Rejected",
      icon: "pending_actions",
      color: "#F12B2C",
      templateId: "1007409368881000345",
      template:
        "Your registration request for e-Samvad has been rejected. Please contact your school head regarding this matter.\n\nSamagra Shiksha, Himachal Pradesh",
    },
    {
      id: "ACTIVE",
      name: "Active",
      icon: "inventory",
      color: "#29CC97",
      templateId: "1007578130357765332",
      template:
        "Your registration on e-Samvad has been approved. You can login to the app to access all the features.\n\nSamagra Shiksha, Himachal Pradesh",
    },
    {
      id: "DEACTIVATED",
      name: "Deactivated",
      icon: "real_estate_agent",
      color: "#cbcbcb",
    },
  ];
  return (
    <EditWrapper>
      <TextInput disabled source="id" />
      <ReferenceField label="SCHOOL" source="school_id" reference="school">
        <TextInput source="name" />
      </ReferenceField>
      <ReferenceField label="UDISE" source="school_id" reference="school">
        <TextInput source="udise" />
      </ReferenceField>
      <TextInput label="Mode of employment" source="employment" />
      <TextInput label="Designation" source="designation" />
      <SelectInput label="Account Status" source="account_status" choices={statusChoices}/>
    </EditWrapper>
  );
};
export default TeacherEdit;
