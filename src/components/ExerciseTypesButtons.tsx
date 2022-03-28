import { VStack, Button } from "@chakra-ui/react";
import { Dispatch } from "react";

type ExerciseTypesButtonsProps = {
  setExerciseType: Dispatch<string>; 
  exerciseType: string;
}

export function ExerciseTypesButtons ({ exerciseType, setExerciseType }: ExerciseTypesButtonsProps) {
  return (
    <VStack>
      <Button
        variant={exerciseType === 'alternative' ? 'solid' : 'outline'}
        colorScheme="purple"
        onClick={() => setExerciseType('alternative')}
      >
        Alternativas
      </Button>
      <Button
        variant={exerciseType === 'complete' ? 'solid' : 'outline'}
        colorScheme="purple"
        onClick={() => setExerciseType('complete')}
      >
        Completar
      </Button>
    </VStack>
  );
}
