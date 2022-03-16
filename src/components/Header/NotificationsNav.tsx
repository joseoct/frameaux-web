import { HStack, Icon, Link } from "@chakra-ui/react";
import { useContext } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";

import { AuthContext } from "../../contexts/AuthContext";

export function NotificationsNav () {
  const { signOut } = useContext(AuthContext);

  return (
    <HStack
      spacing={["6","8"]}
      mx={["6","8"]}
      pr={["6","8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >
      <Link onClick={() => signOut()}>
        <Icon as={RiLogoutBoxRLine} fontSize="20" />
      </Link>
    </HStack>
  );
}
