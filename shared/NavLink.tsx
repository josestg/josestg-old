import { useRouter } from "next/router"
import { Button, ButtonProps } from "@chakra-ui/core"

export const NavLink: React.FC<Props> = ({ children, to, ...rest }) => {
  const router = useRouter()

  const handleClick = () => router.push(to)

  return (
    <Button
      size="sm"
      variant="ghost"
      isActive={router.pathname === to}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Button>
  )
}

interface Props extends ButtonProps {
  to: string
}
