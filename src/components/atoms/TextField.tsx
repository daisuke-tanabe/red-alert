import React from 'react';
import { TextField as MuiTextFiled, TextFieldProps as MuiTextFieldProps } from '@mui/material';

export type TextFieldProps = MuiTextFieldProps;

const TextField = (props: TextFieldProps) => <MuiTextFiled {...props} />;

export default TextField;
