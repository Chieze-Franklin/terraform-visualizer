import React, { useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useDropzone} from 'react-dropzone';
import { Button } from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const uploadStyle = {
    border: '2px dashed #00f',
    padding: '20px',
    textAlign: 'center',
};

type DropZoneModalProps = {
    open: boolean;
    onClose?: () => void;
    onUpload?: (text: string) => void;
}

export default function DropZoneModal(props: DropZoneModalProps) {
    const [combinedText, setCombinedText] = React.useState('');
    const [error, setError] = React.useState('');

    const onDrop = useCallback((acceptedFiles: File[]) => {
        let nextCombinedText = '';
        let combinedSize = 0;

        acceptedFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onabort = () => setError('File reading was aborted');
            reader.onerror = () => setError('File reading has failed');
            reader.onload = () => {
                // Do whatever you want with the file contents
                const binaryStr = reader.result
                nextCombinedText += '\n\n' + binaryStr?.toString();
                setCombinedText(nextCombinedText);
                combinedSize += file.size;

                if (index === acceptedFiles.length - 1) {
                    if (combinedSize > 45000) {
                        setError('Combined file size may be too large. Please upload files smaller than 45KB.');
                        return;
                    }
                    if (props.onUpload) {
                        props.onUpload(nextCombinedText);
                        if (props.onClose) props.onClose();
                    }
                }
            };
            // reader.readAsArrayBuffer(file);
            reader.readAsText(file);
        });
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

    const handleCloseModal = () => {
        setCombinedText('');
        setError('');
        if (props.onClose) props.onClose();
    }
    const handleLuckyButton = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (props.onUpload) {
            props.onUpload(combinedText);
            if (props.onClose) props.onClose();
        }
    }

    return (
        <Modal
            open={props.open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Visualize Terraform Files
                </Typography>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Box sx={uploadStyle}>
                        {
                            isDragActive ?
                            <Typography id="modal-modal-description" fontSize="0.8rem">
                                Drop the files here ...
                            </Typography> :
                            <Typography id="modal-modal-description" fontSize="0.8rem">
                                Drag and drop some files here, or click to select files
                            </Typography>
                        }
                        {error && <>
                            <Typography
                                id="modal-modal-error"
                                sx={{ mt: 2 }}
                                fontSize="0.6rem"
                                color="red">
                                    {error}
                            </Typography>
                            <Button
                                size="small"
                                sx={{ fontSize: '0.6rem' }}
                                variant='outlined'
                                onClick={handleLuckyButton}>
                                    I'm feeling lucky!
                            </Button>
                        </>}
                    </Box>
                </div>
            </Box>
        </Modal>
    );
}
