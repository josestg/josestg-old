import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { GetStaticProps } from "next"
import {
  Box,
  Heading,
  InputGroup,
  Input,
  InputRightElement,
  Icon,
  Text,
  Flex,
  Image,
} from "@chakra-ui/core"
import countReadingTime from "reading-time"
import { useState, ChangeEvent } from "react"

import { Layout } from "../../shared/Layout"
import { Post } from "../../shared/Post"
import { Content } from "../../types"
import { useColorModeValue } from "../../hooks/useColorModeValue"

interface Props {
  contents: Content[]
}

export default function PostsPage({ contents }: Props) {
  const [keyword, setkeyword] = useState("")
  const { pickValue } = useColorModeValue()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setkeyword(e.currentTarget.value)
  }

  // Menfilter contents berdarkan keyword
  // Jika setiap kosong maka nilai dari searchResult
  // sama dengan contents jika tikak maka akan difilter
  // dengan mencari apakah ada setidaknya satu kata dari keyword
  // yang cocok dengan title atau summary.
  let searchResult: Content[] = contents

  if (keyword.length !== 0) {
    const words = keyword.toLowerCase().split(/\s+/g)

    searchResult = searchResult.reduce<Content[]>((result, e) => {
      for (const word of words) {
        if (
          e.title.toLowerCase().includes(word) ||
          e.summary.toLowerCase().includes(word)
        ) {
          result.push(e)
          break
        }
      }

      return result
    }, [])
  }

  return (
    <Box as="main">
      <Layout mb="10">
        <Heading size="2xl">Post</Heading>
        <Text mt="2" pr="8" color={pickValue("gray.600", "gray.300")}>
          Temukan artikel yang menarik buat anda. Gunakan pencarian dibawah ini
          untuk menemukan artikel lebih cepat.
        </Text>

        <InputGroup mt="6" display={["block", "flex"]} w={["100%", "70%"]}>
          <Input
            value={keyword}
            variant="filled"
            onChange={handleSearch}
            placeholder="Tulis keyword disini..."
            _focus={{
              borderColor: "blue.500",
            }}
          />
          <InputRightElement
            children={<Icon name="search" color="blue.500" />}
          />
        </InputGroup>
      </Layout>

      {searchResult.length === 0 ? (
        <Flex
          mt="10"
          justifyContent="center"
          alignItems="center"
          direction="column"
        >
          <Image my="4" height="140px" src="/images/not-found.svg"></Image>
          <Text fontSize="xl">
            <Text as="span" fontWeight="bold">
              {keyword}
            </Text>
            {" tidak ditemukan."}
          </Text>
        </Flex>
      ) : (
        <Layout mb="16">
          {searchResult.map((content) => (
            <Post content={content} key={content.slug} />
          ))}
        </Layout>
      )}
    </Box>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const basePath = path.join(process.cwd(), "__posts__")
  const filemames = fs.readdirSync(basePath)
  const contents = filemames.map((filename) => {
    const markdown = fs.readFileSync(path.join(basePath, filename)).toString()
    const slug = filename.replace(".md", "")
    const { data, content } = matter(markdown)
    const readTime = countReadingTime(content).text
    return { ...data, slug, readTime } as Content
  })

  return {
    props: {
      contents,
    },
  }
}
