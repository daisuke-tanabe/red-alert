import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import BaseButton from './BaseButton';

export default {
  title: 'atoms/BaseButton',
  component: BaseButton,
} as ComponentMeta<typeof BaseButton>;

const Template: ComponentStory<typeof BaseButton> = () => <BaseButton />;

export const FirstStory = Template.bind({});

FirstStory.args = {};
