import React from "react";
import { Edit, SimpleForm } from "react-admin";

const EditWrapper = (props: any) => {
  return (
    <div>
      <Edit className="edit_wrapper" mutationMode={"pessimistic"}>
        <div className="edit_wrapper_layout">
          <SimpleForm>
            {props.children}
          </SimpleForm>
        </div>
      </Edit>
    </div>
  );
};

export default EditWrapper;
