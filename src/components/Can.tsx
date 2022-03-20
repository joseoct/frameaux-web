import { ReactNode } from "react";
import { useCan } from "../hooks/useCan";

interface CanProps {
  children: ReactNode;
  roles?: string[];
}

export function Can({ children, roles }: CanProps) {
  const userCanSeeComponent = useCan({
    roles,
  });

  if (!userCanSeeComponent) {
    return null;
  }

  return (
    <>
      {children}
    </>
  )
}
