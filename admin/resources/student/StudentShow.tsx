import {
  ReferenceField,
  FunctionField,
  Show,
  TextInput
} from "react-admin";
import ShowWrapper from "../../components/styleWrappers/ShowWrapper";
import InputFlexWrapper from "../../components/styleWrappers/InputFlexWrapper";
import CustomTextField from "../../components/styleWrappers/CustomTextField";

const StudentShow = () => {
  return (
    <Show      
    >
    {/* <ShowWrapper
      show={{
        val: "",
      }}
      simpleShowProp={{
        val: "",
      }}
    > */}
      <FunctionField
        render={(record: any) => {
          
          return (
            <>
              <InputFlexWrapper flex >
                {" "}
                <CustomTextField i={record?.id} label={"ID"} />
                <CustomTextField i={record?.name} label={"Name"} />
                <ReferenceField
                  label={"Udise"}
                  source="school_id"
                  reference="school"
                >
                  <FunctionField
                    render={(record: any) => {
                      return (
                        <CustomTextField i={record?.name} label={"School"} />
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
                        <CustomTextField i={record?.udise} label={"Udise"} />
                      );
                    }}
                  />
                </ReferenceField>
                <CustomTextField i={record?.father_name} label={"Father"} />
                <CustomTextField i={record?.mother_name} label={"Mother"} />
                <CustomTextField i={record?.gender} label={"Gender"} />
                <CustomTextField
                  i={record?.grade_number}
                  label={"Grade number"}
                />
                <CustomTextField i={record?.stream_tag} label={"Stream tag"} />{" "}
                <CustomTextField i={record?.category} label={"Category"} />
                <CustomTextField i={record.is_cwsn ? "True" : "False"} label={"CWSN"} />{" "}
                <CustomTextField i={record.is_enabled ? "True" : "False"} label={"ENABLED"} />
              </InputFlexWrapper>
            </>
          );
        }}
      />
    {/* </ShowWrapper> */}
    </Show>
  );

  
};

export default StudentShow;
