import React from 'react';
import { Controls, ControlButton } from 'reactflow';
import 'reactflow/dist/style.css';

export type CustomControlsProps = {
    showUploadDialog: boolean;
    onEditorClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onUploadClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export function CustomControls(props: CustomControlsProps) {
  return (
    <Controls>
      {props.showUploadDialog ? <><ControlButton onClick={props.onEditorClick}>
        <svg width="800px" height="800px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none">
          <path d="M16 4C14 4 11 5 11 9C11 13 11 15 11 18C11 21 6 23 6 23C6 23 11 25 11 28C11 31 11 35 11 39C11 43 14 44 16 44"
            stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M32 4C34 4 37 5 37 9C37 13 37 15 37 18C37 21 42 23 42 23C42 23 37 25 37 28C37 31 37 35 37 39C37 43 34 44 32 44"
            stroke="#000000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </ControlButton><ControlButton onClick={props.onUploadClick}>
        <svg width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
            <path fill="#000000" d="M544 864V672h128L512 480 352 672h128v192H320v-1.6c-5.376.32-10.496 1.6-16 1.6A240 240 0 0 1 64
            624c0-123.136 93.12-223.488 212.608-237.248A239.808 239.808 0 0 1 512 192a239.872 239.872 0 0 1 235.456
            194.752c119.488 13.76 212.48 114.112 212.48 237.248a240 240 0 0 1-240 240c-5.376 0-10.56-1.28-16-1.6v1.6H544z" />
        </svg>
      </ControlButton></> : null}
    </Controls>
  );
}
