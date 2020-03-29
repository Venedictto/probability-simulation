 
import NextApp from 'next/app'
import React from 'react'
import theme from '../constants/Theme';
import { ThemeProvider } from "styled-components";
import Header from '../Components/Header/Header';

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ThemeProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}