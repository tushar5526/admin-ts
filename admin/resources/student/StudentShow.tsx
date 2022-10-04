import {
  TextField,
  BooleanField,
  NumberField,
  ReferenceField,
  SimpleShowLayout,
  Show,
  FunctionField,
} from "react-admin";
import DownLabledInput from "../../components/utilities/DownLabledInput/DownLabledInput";
import ShowWrapper from "../../StyleWrappers/ShowWrapper/ShowWrapper";
import { useRecordContext } from "react-admin";
import InputFlexWrapper from "../../StyleWrappers/InputFlexWrapper/InputFlexWrapper";

const StudentShow = () => {
  const record = useRecordContext();

  return (
    <ShowWrapper
      show={{
        val: "",
      }}
      simpleShowProp={{
        val: "",
      }}
    >
      <FunctionField
        render={(record: any) => {
          return (
            <>
              <InputFlexWrapper>
                {" "}
                <DownLabledInput i={record?.id} label={"ID"} />
                <DownLabledInput i={record?.name} label={"Name"} />
                <ReferenceField
                  label={"Udise"}
                  source="school_id"
                  reference="school"
                >
                  <FunctionField
                    render={(record: any) => {
                      return (
                        <DownLabledInput i={record?.name} label={"School"} />
                      );
                    }}
                  />
                </ReferenceField>
                <ReferenceField
                  label={"Udise"}
                  source="school_id"
                  reference="school"
                >
                  <FunctionField
                    render={(record: any) => {
                      return (
                        <DownLabledInput i={record?.udise} label={"Udise"} />
                      );
                    }}
                  />
                </ReferenceField>
                <DownLabledInput i={record?.father_name} label={"Father"} />
                <DownLabledInput i={record?.mother_name} label={"Mother"} />
                <DownLabledInput i={record?.gender} label={"Gender"} />
                <DownLabledInput
                  i={record?.grade_number}
                  label={"Grade number"}
                />
                <DownLabledInput i={record?.stream_tag} label={"Stream tag"} />{" "}
                <DownLabledInput i={record?.category} label={"Category"} />
                <BooleanField source="is_cwsn" />
                <BooleanField source="is_enabled" />
              </InputFlexWrapper>
            </>
          );
        }}
      />
    </ShowWrapper>
  );
};

export default StudentShow;
