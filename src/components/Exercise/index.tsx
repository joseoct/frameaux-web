import AlternativeExercise from "./AlternativeExercise";

type ExerciseProps = {
  levelId: string;
  exerciseType: string;
}

export default function Exercise({ exerciseType, levelId }: ExerciseProps) {

  switch (exerciseType) {
    case "alternative":
      return <AlternativeExercise levelId={levelId} />;
    default:
      break;

  }
}
