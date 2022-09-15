import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Header from './Header';

export default {
  title: 'organisms/Header',
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = (props) => <Header {...props} />;

export const FirstStory = Template.bind({});

FirstStory.args = { userPhoto: '' };
