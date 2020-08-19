import NextApp from "next/app"
import { ThemeProvider, ColorModeProvider, CSSReset } from "@chakra-ui/core"

import theme from "../themes/chakra-ui"

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider value="light">
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    )
  }
}
