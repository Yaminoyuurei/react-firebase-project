import {
  Box,
  Modal,
  Typography,
} from "@mui/material";


import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { MenuContext } from "../../contexts/MenuContext";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};



const ModalName = () => {
  const {modalState , toggleModals} = useContext(MenuContext)

  const handleClose = () => toggleModals("");



  return (
    <Modal
      open={modalState.modalTypeName}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          id="modal-modal-title"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography variant="h5" component="h2">
            S'enregistrer
          </Typography>
          <IconButton color="error" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box id="modal-modal-decription">
          <h3>Description</h3>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalName;
