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
          ? 'pink.500'
          : 'gray.500',
      })}
    </Link>
  );
}
