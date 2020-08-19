import { FC } from "react"
import { Flex, FlexProps } from "@chakra-ui/core"

export const Layout: FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex direction="column" mx="auto" maxW="54rem" w="100%" px={4} {...rest}>
      {children}
    </Flex>
  )
}
