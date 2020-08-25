import { Box } from "@chakra-ui/core"

import { Layout } from "../../shared/Layout"
import { PostMetadata } from "../../types"

interface Props {
  contents: {
    slug: string
    data: PostMetadata
    html: string
  }[]
}

export default function PostsPage({}: Props) {
  return (
    <Box>
      <Layout></Layout>
    </Box>
  )
}
