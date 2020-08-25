import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { Flex, Text } from "@chakra-ui/core"

export const BrandLogo: React.FC = () => {
  const router = useRouter()

  const handleClick = () => router.push("/")

  return (
    <Flex alignItems="flex-end" cursor="pointer" onClick={handleClick}>
      <Text fontSize="lg" fontWeight="bold">
        <Text as="span" fontWeight="bold" mr="2">
          {">"}
        </Text>
        jose
      </Text>
      <UnderscoreCursor />
    </Flex>
  )
}

const UnderscoreCursor = styled.div`
  margin-left: 4px;
  margin-bottom: 2px;
  width: 15px;
  height: 4px;

  animation: bashBlinking 1.2s infinite;

  @keyframes bashBlinking {
    0% {
      background-color: #9f7aea;
    }
    49% {
      background-color: #9f7aea;
    }
    60% {
      background-color: transparent;
    }
    99% {
      background-color: transparent;
    }
    100% {
      background-color: #9f7aea;
    }
  }
`
