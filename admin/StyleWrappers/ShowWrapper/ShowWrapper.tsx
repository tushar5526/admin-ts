import React from "react";
import { Show, SimpleShowLayout } from "react-admin";
import { useState } from "react";

const ShowWrapper = ({ children }: any) => {
  const [active, setActive] = useState(1);
  return (
    <div className="show_wapper">
      <Show>
        <div className="show_wrapper_layout">
          <SimpleShowLayout>{children}</SimpleShowLayout>
        </div>
        <div className="cta_buttons">
          <button
            //@ts-ignore
            className={active === 1 && "cta_btn_active"}
            onClick={() => setActive(1)}
          >
            CTA1
          </button>
          <button
            //@ts-ignore
            className={active === 2 && "cta_btn_active"}
            onClick={() => setActive(2)}
          >
            CTA2
          </button>
        </div>
      </Show>
    </div>
  );
};

export default ShowWrapper;
