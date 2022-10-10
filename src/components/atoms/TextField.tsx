import React from 'react';
import { TextField as MuiTextFiled, TextFieldProps as MuiTextFieldProps } from '@mui/material';

export type TextFieldProps = MuiTextFieldProps;

const TextField = (props: TextFieldProps) => <MuiTextFiled {...props} />;

export default TextField;

// こうやって書くとclassに現れる
// class="MuiFormControl-root MuiTextField-root red !important red-alert-1u3bzj6-MuiFormControl-root-MuiTextField-root"
// <MuiTextFiled
//   {...props}
//   classes={{
//     root: 'red !important'
//   }}
// />
