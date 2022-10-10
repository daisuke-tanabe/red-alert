import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { ComponentStory } from '@storybook/react';
import TextField from './TextField';

export default {
  title: 'atoms/TextField',
  component: TextField,
};

// TODO また見直す
const Template: ComponentStory<typeof TextField> = (args) => {
  const [value, setValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return <TextField {...args} value={value} onChange={handleChange} />;
};

// TODO また見直す
export const BaseTextField = Template.bind({});
BaseTextField.args = {
  autoComplete: 'off',
  id: 'keyword',
  type: 'text"',
  placeholder: 'PLACE_HOLDER',
  onChange: action('onChange'),
  value: '',
};
