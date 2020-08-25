import fs from "fs"
import path from "path"
import Head from "next/head"
import matter from "gray-matter"
import Disqus from "disqus-react"
import { GetStaticProps, GetStaticPaths } from "next"
import { Box, Heading, Image, Flex, Text, Stack } from "@chakra-ui/core"

import { INFO } from "../../config"
import unified from "../../lib/unified"
import { PostMetadata } from "../../types"
import { Layout } from "../../shared/Layout"
import { MarkdownRender } from "../../shared/MarkdownRender"
import { useColorModeValue } from "../../hooks/useColorModeValue"

interface Props {
  slug: string
  data: PostMetadata
  html: string
}

export default function PostPage({ data, html, slug }: Props) {
  const { colorMode } = useColorModeValue()

  const disqusShortName = "josestg"
  const disqusConfig = {
    url: `${INFO.host}/posts/${slug}`,
    identifier: slug,
    title: data.title,
  }

  return (
    <Box>
      <Head>
        {data.latex && (
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css"
            integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X"
            crossOrigin="anonymous"
          ></link>
        )}
        <title>{data.title}</title>
      </Head>
      <Flex direction="column" mt={[8, 12]}>
        <Layout>
          <Heading
            as="h1"
            size="2xl"
            lineHeight="1.2"
            letterSpacing="tight"
            wordBreak="break-word"
            overflowWrap="break-word"
          >
            {data.title}
          </Heading>
          <Flex
            justifyContent="space-between"
            align="center"
            mt={[2, 4]}
            mb={[8, 10]}
          >
            <Flex>
              <Box
                mr="3"
                padding="2px"
                rounded="full"
                background="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
              >
                <Image
                  w="40px"
                  rounded="full"
                  height="40px"
                  src="/images/me.jpg"
                  borderColor="blue.500"
                />
              </Box>
              <Flex direction="column" justifyContent="center">
                <Text fontWeight="bold" fontSize="sm">
                  Jose Sitanggang
                </Text>
                <Text fontSize="xs">{data.date}</Text>
              </Flex>
            </Flex>

            <Text fontWeight="bold">100 Views</Text>
          </Flex>
        </Layout>
        <Layout maxW="64rem" mb={[6, 8]}>
          <Image
            src={data.image}
            borderRadius="5px"
            boxShadow="0 16px 40px rgba(214, 188, 250, 0.1)"
          />
        </Layout>
      </Flex>

      <Layout>
        <MarkdownRender
          id="markdown-view"
          colorMode={colorMode}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {typeof window !== undefined && (
          <Stack mt="10">
            <Disqus.DiscussionEmbed
              shortname={disqusShortName}
              config={disqusConfig}
            />
          </Stack>
        )}
      </Layout>
    </Box>
  )
}

type Param = { slug: string }

export const getStaticPaths: GetStaticPaths<Param> = async () => {
  const basePath = path.join(process.cwd(), "__posts__")
  const paths = fs
    .readdirSync(basePath)
    .map((e) => ({ params: { slug: e.replace(".md", "") } }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Param> = async (ctx) => {
  const slug = ctx.params!.slug
  const location = path.join(process.cwd(), "__posts__", slug + ".md")
  const text = fs.readFileSync(location, "utf8")
  const buf = matter(text)
  const data = buf.data as PostMetadata

  return {
    props: {
      slug,
      data,
      html: unified(buf.content),
    },
  }
}
