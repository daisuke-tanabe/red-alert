import React from 'react';
import { Box } from '@mui/material';
import styled from '@emotion/styled';
import Header from '../../organisms/Header/Header';
import Sidebar from '../../organisms/Sidebar/Sidebar';

const Main = styled.div`
  display: flex;
  padding: 40px;
`;

type BaseLayoutProps = { children?: React.ReactNode };

const BaseLayout = (props: BaseLayoutProps) => {
  const { children } = props;

  return (
    <Box css={{ display: 'flex' }}>
      <Sidebar />
      <Box css={{ flexGrow: 1 }}>
        <Header />
        <Main>{children}</Main>
      </Box>
    </Box>
  );
};

export default BaseLayout;
