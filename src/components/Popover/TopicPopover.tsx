import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useDeleteTopic } from '@services/hooks/topics/useDeleteTopic';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useRef } from 'react';

type Topic = {
  id: string;
  name: string;
  layer: number;
  explanation: string;
}

type PopoverTopicProps = {
  topic: Topic;
  technology_id: string;
  setTopic: Dispatch<SetStateAction<Topic | undefined>>;
}

export function TopicPopover({ topic, technology_id, setTopic }: PopoverTopicProps) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
  const router = useRouter();

  const deleteTopic = useDeleteTopic();

  const handleDeleteTopic = () => {
    deleteTopic.mutateAsync({
      topic_id: topic.id,
      technology_id,
    });

    onClose();
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Flex
          key={topic.id}
          justifyContent="center"
          alignItems="center"
          bg="gray.800"
          boxSize="110px"
          borderRadius="50%"
          cursor="pointer"
          transition="0.2s"
          border='3px solid #1F2029'
          p="8px"
          _hover={{
            borderColor: 'purple.500',
          }}
        >
          <Text align="center" fontWeight="bold" fontSize="sm">{topic.name}</Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent bg="gray.800" p="16px">
        <PopoverHeader mb="4" fontWeight="bold">
          {topic.name}
        </PopoverHeader>
        <PopoverArrow bg="gray.800" />
        <Stack>
          <Button onClick={() => router.push(`/construction/technologies/${technology_id}/topics/${topic.id}/levels`)} size="lg" colorScheme="purple">
            Ir para níveis
          </Button>
          <HStack>
            <Button onClick={() => setTopic(topic)} w="100%" colorScheme="green">
              Editar
            </Button>
            <Button onClick={onOpen} w="100%" colorScheme="red">
              Deletar
            </Button>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent bg="gray.800">
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    <HStack>
                      <Text>Deletar o tópico:</Text>
                      <Text color="purple.400">{topic.name}</Text>
                    </HStack>
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Você tem certeza que deseja deletar o tópico?
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button color="black" ref={cancelRef} onClick={onClose}>
                      Cancelar
                    </Button>
                    <Button colorScheme="red" onClick={() => handleDeleteTopic()} ml={3}>
                      Deletar
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </HStack>
        </Stack>
      </PopoverContent>
    </Popover>
  );
}
