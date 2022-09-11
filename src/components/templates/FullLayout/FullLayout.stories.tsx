import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FullLayout from './FullLayout';

export default {
  title: 'templates/FullLayout',
  component: FullLayout,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof FullLayout>;

const Template: ComponentStory<typeof FullLayout> = () => <FullLayout />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
