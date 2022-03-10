import { Flex, Icon, IconButton, useBreakpointValue, useDisclosure } from '@chakra-ui/react';

import { Profile } from './Profile';
import { NotificationsNav } from './NotificationsNav';
import { Searchbox } from './Searchbox';
import { Logo } from './Logo';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { RiMenuLine } from 'react-icons/ri';
import { Sidebar } from '../Sidebar';

export function Header () {

  const { onOpen } = useSidebarDrawer();

  const isLg = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      maxWidth={1480}
      w="100%"
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isLg && (
        <IconButton
          aria-label="Open Navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="36"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}

      <Logo />

      {isLg && <Searchbox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isLg} />
      </Flex>
    </Flex>
  );
}
