import { FC } from "react"

import {
  Stack,
  Image,
  Heading,
  Text,
  StackProps,
  Box,
  PseudoBox,
} from "@chakra-ui/core"

import { Link } from "./Link"
import { pWithLineClamp } from "../helpers/pWithLineClamp"

interface Props extends StackProps {
  image: string
  title: string
  subtitle: string
  slug: string
}

export const Project: FC<Props> = ({
  image,
  subtitle,
  title,
  slug,
  ...rest
}) => {
  return (
    <PseudoBox
      transition="all 0.2s ease-out"
      mb="8"
      _hover={{ transform: "translateY(-10px)" }}
    >
      <Link href="/projects/[slug]" as={"/projects/" + slug}>
        <Stack
          boxShadow="0 16px 40px rgba(112, 144, 176, 0.2)"
          borderRadius="12px"
          overflow="hidden"
          h="400px"
          pb="3"
          {...rest}
        >
          <Image height="65%" objectFit="cover" src={image} />
          <Box py="2" px={["3", "4"]}>
            <Heading as="h2" fontSize="lg">
              {title}
            </Heading>

            <Text
              as={pWithLineClamp(3)}
              mt="2"
              lineHeight="1.2rem"
              fontSize="sm"
            >
              {subtitle}
            </Text>
          </Box>
        </Stack>
      </Link>
    </PseudoBox>
  )
}
