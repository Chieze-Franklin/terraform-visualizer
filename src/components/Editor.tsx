/*
https://ohdarling88.medium.com/4-steps-to-add-custom-language-support-to-monaco-editor-5075eafa156d
https://github.com/microsoft/monaco-languages/pull/109/files
*/

import React from 'react';
import MonacoEditor from '@monaco-editor/react';

export interface EditorProps {
  value: string | undefined;
  schemas?: any[];
  onChange?: (value: string | undefined, event?: any) => void;
  onValidationError?: (errors: any[]) => void;
}

const Editor = ({ value, onChange, onValidationError }: EditorProps) => {
  const handleEditorValidation = (markers: any) => {
    if (onValidationError) {
      onValidationError(markers);
    }
  };

  return (
    <MonacoEditor
      defaultLanguage="hcl"
      defaultValue={value}
      language="hcl"
      value={value}
      theme="vs-dark"
      height="400px"
      width="100%"
      onChange={onChange}
      onValidate={handleEditorValidation}
    />
  );
};

export default Editor;
