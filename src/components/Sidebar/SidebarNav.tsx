import { Stack } from "@chakra-ui/react";
import { RiComputerLine, RiContactsLine, RiDashboardLine } from "react-icons/ri";
import { Can } from "../Can";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {

  return (
    <Stack spacing="12" align="flex-start" bg="gray.800" p={4} w="260px">
      <NavSection title="GERAL">
        <Can roles={['administrator']}>
          <NavLink icon={RiDashboardLine} href="/dashboard">Dashboard</NavLink>
          <NavLink icon={RiContactsLine} href="/content-creators">Criadores de conteúdo</NavLink>
          <NavLink icon={RiComputerLine} href="/technologies">Tecnologias</NavLink>
        </Can>
        <Can roles={['content_creator']}>
          <NavLink icon={RiComputerLine} href="/technologies/construction">Tecnologias responsáveis</NavLink>
        </Can>
      </NavSection>
    </Stack>
  );
}
