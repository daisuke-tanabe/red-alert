import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProjectPage from './ProjectPage';

export default {
  title: 'pages/ProjectPage',
  component: ProjectPage,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ProjectPage>;

const Template: ComponentStory<typeof ProjectPage> = () => <ProjectPage />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
