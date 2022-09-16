import React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

const Main = styled.div`
  display: flex;
  padding: 40px;
`;

type BaseLayoutProps = { children?: React.ReactNode };

const BaseLayout = (props: BaseLayoutProps) => {
  const { children } = props;

  return (
    <Box>
      <Main>{children}</Main>
    </Box>
  );
};

export default BaseLayout;
