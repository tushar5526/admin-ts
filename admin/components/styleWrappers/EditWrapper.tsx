import React from "react";
import { Edit, SaveButton, SimpleForm, Toolbar } from "react-admin";

const EditToolbar = (props: any) => (
  <Toolbar  {...props}>
      <SaveButton />
  </Toolbar>
);
const EditWrapper = (props: any) => {
  return (
    <div>
      <Edit className="edit_wrapper" {...props}>
        <div className="edit_wrapper_layout">
          <SimpleForm toolbar={<EditToolbar/>}>
            {props.children}
          </SimpleForm>
        </div>
      </Edit>
    </div>
  );
};

export default EditWrapper;
