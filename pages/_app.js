 
import NextApp from 'next/app'
import React from 'react'
import theme from '../constants/Theme';
import styled, { ThemeProvider } from "styled-components";
import Header from '../Components/Header/Header';

const PageContainer = styled.div`
  position:absolute;
  left:0px;
  top:0px;
  width:100%;
  height:100%;
`;
const Body = styled.div`
  overflow-x:scroll;
  height:90%;
`;export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
          <PageContainer>
            <Header />
            <Body>
              <Component {...pageProps} />
            </Body>
          </PageContainer>
      </ThemeProvider>
    )
  }
}