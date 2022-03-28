import { HStack, Stack, Image } from "@chakra-ui/react";
import { useGetTechnologiesByUser } from "@services/hooks/technologies/useGetTechnologiesByUser";
import { RiComputerLine, RiContactsLine, RiDashboardLine } from "react-icons/ri";
import { Can } from "../Can";

import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {

  const { data: technologies, isLoading } =
    useGetTechnologiesByUser();

  console.log(technologies);

  return (
    <Stack spacing="12" align="flex-start" bg="gray.800" p={4} w="260px">
      <NavSection title="GERAL">
        <Can roles={['administrator']}>
          <NavLink icon={RiDashboardLine} href="/dashboard">
            Dashboard
          </NavLink>
          <NavLink icon={RiContactsLine} href="/content-creators">
            Criadores de conteúdo
          </NavLink>
          <NavLink icon={RiComputerLine} href="/technologies">
            Tecnologias
          </NavLink>
        </Can>
        <Can roles={['content_creator']}>
          <NavLink icon={RiComputerLine} href="/construction/technologies">
            Tecnologias responsáveis
          </NavLink>
          {technologies.map((technology) => (
            <HStack key={technology.id}>
              <Image objectFit="cover" ml="14px" boxSize="6" src={technology.technology_image} alt="Technology image" />
              <NavLink
                key={technology.id}
                href={`/construction/technologies/${technology.id}/topics`}
              >
                {technology.name}
              </NavLink>
            </HStack>
          ))}
        </Can>
      </NavSection>
    </Stack>
  );
}
