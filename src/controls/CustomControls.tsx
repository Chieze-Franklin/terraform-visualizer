import React from 'react';
import { Controls, ControlButton } from 'reactflow';
import 'reactflow/dist/style.css';

export type CustomControlsProps = {
    showUploadDialog: boolean;
    onTextClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onUploadClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export function CustomControls(props: CustomControlsProps) {
  return (
    <Controls>
      {props.showUploadDialog ? <><ControlButton onClick={props.onTextClick}>
        <svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
          <g fill="#000000">
            <path d="M1 0v5.05l4.349 2.527V2.526L1 0zM10.175 5.344l-4.35-2.525v5.05l4.35 2.527V5.344zM10.651 10.396V5.344L15
            2.819v5.05l-4.349 2.527zM10.174 16l-4.349-2.526v-5.05l4.349 2.525V16z"/>
          </g>
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
