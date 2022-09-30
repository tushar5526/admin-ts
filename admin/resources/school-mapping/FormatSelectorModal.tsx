import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MdChips from "../../components/utilities/MdChips/MdChips";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const FormatSelectorModal = ({ open, handleOpen }: any) => {
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 16,
    p: 4,
    borderRadius: "20px",
  };
  const closeButtonStyle = {
    display: "flex",
    justifyContent: "flex-end",
    cursor: "pointer",
  };
  const option = ["PDF", "XLSX", "CSV"];
  const [val, setVal] = useState("");

  return (
    //@ts-ignore
    <Modal
      open={open}
      onClose={handleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={closeButtonStyle}>
          <CloseIcon onClick={handleOpen} />
        </div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Please Select Format to be exported
        </Typography>
        <br />
        <MdChips handleValueChange={setVal} chipData={option} />
      </Box>
    </Modal>
  );
};

export default FormatSelectorModal;
