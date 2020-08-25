import { Flex, IconButton, Stack } from "@chakra-ui/core"

import { Layout } from "./Layout"
import { NavLink } from "./NavLink"
import { BrandLogo } from "./BrandLogo"
import { useColorModeValue } from "../hooks/useColorModeValue"

export const Nav: React.FC = () => {
  const { pickValue, toggleColorMode } = useColorModeValue()

  return (
    <Flex
      as="nav"
      mb="8"
      top="0"
      minH="60px"
      zIndex={100}
      boxShadow="sm"
      position="sticky"
      bg={pickValue("white", "gray.800")}
    >
      <Layout justifyContent="center">
        <Flex justifyContent="space-between" alignItems="center">
          <BrandLogo />

          <Stack isInline spacing="2">
            <NavLink to="/posts">Posts</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/about">About</NavLink>

            <IconButton
              ml="2"
              size="sm"
              aria-label="toggle theme"
              variant="ghost"
              onClick={toggleColorMode}
              icon={pickValue("moon", "sun")}
              _focus={{ outline: "none" }}
            />
          </Stack>
        </Flex>
      </Layout>
    </Flex>
  )
}
