import { useColorMode } from "@chakra-ui/core"

export const useColorModeValue = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  // Pick one of the given arguments ​​based on the colorMode value.
  const pickValue = (onLight: any, onDark: any) =>
    colorMode === "light" ? onLight : onDark

  return {
    colorMode,
    isLight: colorMode === "light",
    toggleColorMode,
    pickValue,
  }
}
