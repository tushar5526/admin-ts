import React from "react";
import { Show, SimpleShowLayout } from "react-admin";

const ShowWrapper = ({ children }: any) => {
  return (
    <div className="show_wapper">
      <Show>
        <div className="show_wrapper_layout">
          <SimpleShowLayout className="show_layout">
            {children}
          </SimpleShowLayout>
        </div>
      </Show>
    </div>
  );
};

export default ShowWrapper;
