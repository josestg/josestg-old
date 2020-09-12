import { FC } from "react"
import { IconType } from "react-icons"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { Flex, Box, Stack, Link, PseudoBox, Text } from "@chakra-ui/core"

import { useColorModeValue } from "../hooks/useColorModeValue"

export const Footer: FC = () => {
  const { pickValue } = useColorModeValue()
  return (
    <Flex
      as="footer"
      height="140px"
      marginTop="10"
      direction="column"
      alignItems="center"
      position="relative"
      justifyContent="center"
    >
      <Stack isInline spacing="6">
        <Cta icon={FaGithub} link="https://github.com/josestg" />
        <Cta
          color="blue.500"
          icon={FaLinkedin}
          link="https://www.linkedin.com/in/josestg/"
        />
        <Cta
          color="blue.300"
          icon={FaTwitter}
          link="https://twitter.com/josestg_"
        />
      </Stack>
      <Text my="6" fontSize="xs" color={pickValue("gray.600", "gray.400")}>
        Copyright 2020 &#169; Jose Sitanggang
      </Text>
    </Flex>
  )
}

interface CtaProps {
  icon: IconType
  link: string
  size?: string
  color?: string
}

const Cta: FC<CtaProps> = ({ icon, link, size, color, ...rest }) => {
  return (
    <PseudoBox
      {...rest}
      as="footer"
      transition="all 0.2s ease-out"
      _hover={{ transform: "translateY(-8px)" }}
    >
      <Link isExternal href={link}>
        <Box as={icon} size={size || "28px"} cursor="pointer" color={color} />
      </Link>
    </PseudoBox>
  )
}
