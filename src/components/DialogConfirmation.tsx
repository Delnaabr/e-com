import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import '../components/Checkout/checkout.css'

// const useStyles = makeStyles((theme:any) => ({
//     dialogComponent: {
//         boxShadow: 'none !important'
//     },
//     dialogContent: {
//         padding: '2rem 2.5rem 0.5rem !important'
//     },
//     dialogPaperWidthSm: {
//         maxWidth: '60%'
//     },
//     title: {
//         fontFamily: 'Helvetica Neue',
//         marginBottom: '1.5rem',
//         fontSize: '1.6rem',
//         fontWeight: 500,
//         letterSpacing: '.005em'
//     },
//     message: {
//         fontSize: '1.2rem',
//         marginBottom: '1rem'
//     }
// }));

const ConfirmationDialog = (props: any) => {

    return (
        <>
            <Box className="dailog-outer-box">
                <Dialog open={props.open} onClose={props.onClose} >
                    <DialogContent className=''>
                        {/* <Typography className=''>{props.title}</Typography> */}
                        <Typography className=''>{props.confirmationMessage}</Typography>
                    </DialogContent>
                    <Box className="ok-button-box">
                        <Button onClick={props.onClose} variant="text" className="button-cancel">
                            cancel
                        </Button>
                        <Button onClick={props.onConfirm} variant="contained" className="button-conform">
                            yes
                        </Button>
                    </Box>
                </Dialog>
            </Box>
        </>
    );
};

export default ConfirmationDialog;
