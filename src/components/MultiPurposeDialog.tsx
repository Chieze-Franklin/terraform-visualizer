import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import type { MouseEventHandler } from "react";

export interface MultiPurposeDialogProps {
  actions: {
    text: string;
    onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  }[];
  children?: any;
  open: boolean;
  title?: string;
  onClose: () => void;
}

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const MultiPurposeDialog = (props: MultiPurposeDialogProps) => {
  const { actions, children, open, title, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={true}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle>{title || "Dialog"}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {actions.map((action, index) => (
          <Button key={index} onClick={action.onClick}>
            {action.text}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
};

export default MultiPurposeDialog;
