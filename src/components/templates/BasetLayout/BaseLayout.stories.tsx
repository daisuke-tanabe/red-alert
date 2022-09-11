import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BaseLayout from './BaseLayout';

export default {
  title: 'templates/BaseLayout',
  component: BaseLayout,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof BaseLayout>;

const Template: ComponentStory<typeof BaseLayout> = () => <BaseLayout />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
