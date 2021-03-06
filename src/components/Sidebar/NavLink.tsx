import { Icon, Link as ChakraLink, Text, LinkProps as ChakraLinkProps } from "@chakra-ui/react";
import { ElementType } from 'react';
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  icon?: ElementType;
  children: string;
  href: string;
}

export function NavLink ({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink passHref href={href}>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        {icon && <Icon mr="2" as={icon} fontSize="20" />}
        <Text fontWeight="medium">
          {children}
        </Text>
      </ChakraLink>
    </ActiveLink>
  );
}
