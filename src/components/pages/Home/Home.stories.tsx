import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Home from './Home';

export default {
  title: 'pages/Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = () => <Home />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
