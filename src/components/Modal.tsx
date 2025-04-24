import {
  Box,
  BoxProps,
  Button,
  Modal as MuiModal,
  ModalProps as MuiModalProps,
} from "@mui/material";
import { forwardRef, ForwardRefRenderFunction } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps extends MuiModalProps {
  onClose: () => void;
  isIconClose?: boolean;
  fixedModal?: boolean;
  boxProps?: BoxProps;
}

const ModalBase: ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (
  { onClose, isIconClose, fixedModal, boxProps, ...rest },
  ref
) => {
  return (
    <MuiModal
      keepMounted
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      onClose={() => (!fixedModal ? onClose() : () => {})}
      {...rest}
      ref={ref}
    >
      <Box
        {...boxProps}
        sx={{
          padding: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: boxProps?.maxWidth ?? 600,
          bgcolor: "background.paper",
          boxShadow: "24",
          borderRadius: "5px",
          ...boxProps?.sx,
        }}
      >
        {isIconClose && (
          <Box
            sx={{
              margin: ".3rem .5rem 0 0",
              position: "absolute",
              top: "0",
              right: "0",
            }}
          >
            <Button sx={{ padding: 0, minWidth: 0 }} onClick={() => onClose()}>
              <CloseIcon fontSize="small" />
            </Button>
          </Box>
        )}
        {rest.children}
      </Box>
    </MuiModal>
  );
};
export const Modal = forwardRef(ModalBase);
