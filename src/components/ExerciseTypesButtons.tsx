import { HStack, Button } from "@chakra-ui/react";
import { Dispatch } from "react";

type ExerciseTypesButtonsProps = {
  setExerciseType: Dispatch<string>; 
  exerciseType: string;
}

export function ExerciseTypesButtons ({ exerciseType, setExerciseType }: ExerciseTypesButtonsProps) {
  return (
    <HStack spacing={2}>
      <Button
        variant={exerciseType === 'alternative' ? 'solid' : 'outline'}
        colorScheme="purple"
        onClick={() => setExerciseType('alternative')}
      >
        Alternativas
      </Button>
      <Button
        variant={exerciseType === 'sequency' ? 'solid' : 'outline'}
        colorScheme="purple"
        onClick={() => setExerciseType('sequency')}
      >
        Sequência
      </Button>
    </HStack>
  );
}
