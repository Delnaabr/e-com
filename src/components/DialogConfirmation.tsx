import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import "../components/Checkout/checkout.css";

const ConfirmationDialog = (props: any) => {
  return (
    <>
      <Box className="dailog-outer-box">
        <Dialog open={props.open} onClose={props.onClose}>
          <DialogContent className="">
            <Typography className="">{props.confirmationMessage}</Typography>
          </DialogContent>
          <Box className="ok-button-box">
            <Button
              onClick={props.onClose}
              variant="text"
              className="button-cancel"
            >
              cancel
            </Button>
            <Button
              onClick={props.onConfirm}
              variant="contained"
              className="button-conform"
            >
              yes
            </Button>
          </Box>
        </Dialog>
      </Box>
    </>
  );
};

export default ConfirmationDialog;
