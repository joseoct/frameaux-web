import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface ActiveLinkProps extends LinkProps {
  children: ReactElement;
}

export function ActiveLink({ children, ...rest } : ActiveLinkProps) {

  const { asPath } = useRouter()

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: asPath.startsWith(rest.href.toString())
          ? 'purple.400'
          : 'gray.400',
      })}
    </Link>
  );
}
