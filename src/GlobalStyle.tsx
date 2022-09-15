import React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';

const GlobalStyle = () => (
  <GlobalStyles
    styles={{
      html: {
        // background: '#F4F8F9',
        // backgroundImage: 'linear-gradient(to right bottom, #830012, #8d0218, #98041f, #a20726, #ad0b2d, #b61534, #c01e3a, #c92541, #d43149, #de3c51, #e94759, #f45161)',
        // background: 'linear-gradient(45deg, #BB1037, #D1253D)'
        // backgroundImage: 'linear-gradient(to bottom, #bb1037, #c00f39, #c40f3a, #c90e3c, #ce0d3e, #d2193c, #d62339, #da2b37, #dc3c2f, #dd4a27, #dd571e, #dc6414)',
        // backgroundImage: 'linear-gradient(to bottom, #bb1037, #c00f39, #c40f3a, #c90e3c, #ce0d3e, #d1113f, #d41541, #d71842, #d91f43, #db2444, #dc2946, #de2e47)',
      },
      body: {
        background: '#F4F8F9',
      },

      // body: {
      //   background: 'linear-gradient(45deg, #BB1037, #F45161, #D1253D)',
      //   backgroundSize: '600% 600%',
      //   animation: 'GradientBackground 10s ease infinite',
      // },
      //
      // '@keyframes GradientBackground': {
      //   '0%': {
      //     'backgroundPosition': '0% 50%',
      //   },
      //
      //   '50%': {
      //     'backgroundPosition': '100% 50%',
      //   },
      //
      //   '100%': {
      //     'backgroundPosition': '0% 50%',
      //   }
      // },

      // html: {
      //   height: '-webkit-fill-available'
      // },
      // body: {
      //   minHeight: '100vh',
      //   // @ts-ignore
      //   // iOSのsafariで
      //   minHeight: '-webkit-fill-available'
      // }
    }}
  />
);

export default GlobalStyle;
