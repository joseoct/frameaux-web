import { Stack } from "@chakra-ui/react";
import { RiComputerFill, RiComputerLine, RiContactsLine, RiDashboardLine } from "react-icons/ri";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
        <NavLink icon={RiContactsLine} href="/content-creators">Criadores de conteúdo</NavLink>
        <NavLink icon={RiComputerLine} href="/tecnologies">Tecnologias</NavLink>
      </NavSection>
    </Stack>
  );
}
