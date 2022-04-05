import AlternativeExercise from "./AlternativeExercise";
import SequencyExercise from "./SequencyExercise";

type ExerciseProps = {
  levelId: string;
  exerciseType: string;
}

export default function Exercise({ exerciseType, levelId }: ExerciseProps) {

  switch (exerciseType) {
    case "alternative":
      return <AlternativeExercise levelId={levelId} />;
    case "sequency":
      return <SequencyExercise levelId={levelId} />;
    default:
      break;

  }
}
