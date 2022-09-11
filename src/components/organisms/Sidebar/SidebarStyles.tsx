import { css } from '@emotion/react';

export const sidebarStyles = css`
  background-image: linear-gradient(
    to bottom,
    #bb1037,
    #c00f39,
    #c40f3a,
    #c90e3c,
    #ce0d3e,
    #d2193c,
    #d62339,
    #da2b37,
    #dc3c2f,
    #dd4a27,
    #dd571e,
    #dc6414
  );
  box-shadow: -1px 1px 10px rgb(0 0 0 / 20%) inset;
  height: 100vh;
  white-space: nowrap;
`;

export const sidebarHeadStyle = css`
  align-items: center;
  display: flex;
  padding: 0 20px;
  height: 62px;
`;

export const sidebarHeadTextStyle = css`
  font-weight: bold;
  color: white;
  font-size: 20px;
`;

export const listItemButtonStyle = css`
  padding: 16px 23px;
`;

export const listItemTextStyle = css`
  font-size: 14px;
  color: white;
`;

export const listItemIcon = css`
  min-width: 20px;
`;

export const listItemIconSome = css`
  font-size: 18px;
  fill: white;
`;

export const dividerStyle = css`
  border-color: rgba(255, 255, 255, 0.4);
`;
