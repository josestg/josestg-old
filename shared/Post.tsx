import { FC, memo } from "react"
import { Flex, Heading, Text, FlexProps, Image } from "@chakra-ui/core"

import { Link } from "./Link"
import { Content } from "../types"
import { pWithLineClamp } from "../helpers/pWithLineClamp"
import { useColorModeValue } from "../hooks/useColorModeValue"

interface Props extends FlexProps {
  content: Content
}

export const Post: FC<Props> = memo(({ content, ...rest }) => {
  const { pickValue } = useColorModeValue()
  const textColor = pickValue("gray.600", "gray.300")

  return (
    <Flex mb="6" {...rest}>
      <Flex direction="column">
        <Link href="/posts/[slug]" as={`/posts/${content.slug}`}>
          <Heading fontSize="lg">{content.title}</Heading>
        </Link>
        <Text mt="2" as={pWithLineClamp(2)} color={textColor}>
          {content.summary}
        </Text>
        <Text mt="2" fontSize="xs" color={textColor}>
          {content.date} &bull; {content.readTime}.
        </Text>
      </Flex>
      {content.image && (
        <Image
          ml={[6, 7]}
          w="100px"
          h="100px"
          rounded="10px"
          boxShadow="0 16px 40px rgba(112, 144, 176, 0.2)"
          objectFit="cover"
          alt={content.slug}
          src={content.image}
        />
      )}
    </Flex>
  )
})
