import React from 'react';
import { InputBase } from '@mui/material';

type BaseTextFieldProps = {
  autoComplete: string;
  id: string;
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const BaseTextField = ({ autoComplete, id, placeholder, value, onChange }: BaseTextFieldProps) => {
  return (
    <InputBase
      autoComplete={autoComplete}
      id={id}
      placeholder={placeholder}
      type="text"
      fullWidth
      sx={{
        px: 1.5,
        py: 1,
        fontSize: '0.875rem',
        border: '1px solid rgba(0, 0, 0, 0.23)',
        borderRadius: 1,
      }}
      onChange={onChange}
      value={value}
    />
  );
};

export default BaseTextField;
