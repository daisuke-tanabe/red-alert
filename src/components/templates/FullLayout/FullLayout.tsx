import React from 'react';

type FullLayoutProps = {
  children?: React.ReactNode;
};

const FullLayout = (props: FullLayoutProps) => {
  const { children } = props;

  return (
    <div
      css={{
        alignItems: 'center',
        background: '#bd1333',
        // backgroundImage: 'linear-gradient(to bottom,#ad0a30,#c00f39,#c40f3a,#c90e3c,#ce0d3e,#d2193c,#d62339,#da2b37)',
        display: 'flex',
        height: '100vh',
      }}
    >
      {children}
    </div>
  );
};

export default FullLayout;
