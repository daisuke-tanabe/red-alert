import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Login from './Login';

export default {
  title: 'pages/Login',
  component: Login,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = () => <Login />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
