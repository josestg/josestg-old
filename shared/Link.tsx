import { FC } from "react"
import NextLink from "next/link"
import { Link as ChakraLink } from "@chakra-ui/core"

import { useColorModeValue } from "../hooks/useColorModeValue"

interface Props {
  href: string
  as: string
}

export const Link: FC<Props> = ({ children, ...props }) => {
  const { pickValue } = useColorModeValue()
  return (
    <NextLink href={props.href} as={props.as}>
      <ChakraLink
        _hover={{
          textDecoration: "none",
          color: pickValue("blue.500", "blue.300"),
        }}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
