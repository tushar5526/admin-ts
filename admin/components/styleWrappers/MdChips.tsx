import React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const MdChips = ({ chipData, handleValueChange }: any) => {
  const [active, setActive] = useState(0);

  const handleClick = (i: any, j: any) => {
    handleValueChange(i);
    setActive(j);
  };
  return (
    <Stack direction="row" spacing={1}>
      {chipData.map((txt: any, idx: any) => (
        <Chip
          //@ts-ignore
          className={active === idx && "active_chip"}
          key={(idx * Math.random()) / 0.1}
          label={txt}
          onClick={() => handleClick(txt, idx)}
          variant="outlined"
        />
      ))}
    </Stack>
  );
};

export default MdChips;
