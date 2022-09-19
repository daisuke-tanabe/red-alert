import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Projects from './Projects';

export default {
  title: 'pages/ProjectPage',
  component: Projects,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Projects>;

const Template: ComponentStory<typeof Projects> = () => <Projects />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
