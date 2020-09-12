import { Box, Grid } from "@chakra-ui/core"

import { Layout } from "../../shared/Layout"
import { Project } from "../../shared/Project"

interface Props {}

export default function ProjectsPage({}: Props) {
  return (
    <Box>
      <Layout>
        <Grid
          mt="8"
          gap={[4, 16]}
          templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        >
          {/* Example */}
          {Array.from(new Array(10)).map((_, index) => (
            <Project
              key={index}
              slug="telegram-bot"
              title="Telegram Bot"
              subtitle="Bot Telegram untuk membantu manajemen tugas."
              image="/images/example.png"
            />
          ))}
        </Grid>
      </Layout>
    </Box>
  )
}
