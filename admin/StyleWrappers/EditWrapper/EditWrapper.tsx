import React from "react";
import { EditButton, Edit, SimpleForm } from "react-admin";

const EditWrapper = (props: any) => {
  return (
    <div>
      <Edit className="show_wrapper" mutationMode={"pessimistic"}>
        <div className="show_wrapper_layout">
          <SimpleForm>
            {props.children}
            <EditButton className="edit_button" />
          </SimpleForm>
        </div>
      </Edit>
    </div>
  );
};

export default EditWrapper;
