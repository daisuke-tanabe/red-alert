import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Register from './Register';

export default {
  title: 'pages/Register',
  component: Register,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Register>;

const Template: ComponentStory<typeof Register> = () => <Register />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
