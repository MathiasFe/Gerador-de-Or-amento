import React, { ChangeEvent, InputHTMLAttributes } from 'react';
import { TextField } from "@material-ui/core";

interface PropsForm extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
  multiline: boolean,
  rows: number,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Forms: React.FC<PropsForm> = (props) => {
  return (
    <>
      <TextField
        type={props.type}
        name={props.name}
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        multiline={props.multiline}
        rows={props.rows}
        style={{ width: '100%' }}
        variant="outlined"
        disabled={props.disabled}
        required
      />
    </>
  );
}

export default Forms;