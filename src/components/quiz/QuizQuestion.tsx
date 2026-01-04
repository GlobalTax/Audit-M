import { QuizQuestion as QuizQuestionType } from "./quizData";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer?: string;
  onAnswer: (answerId: string) => void;
}

export const QuizQuestion = ({ question, selectedAnswer, onAnswer }: QuizQuestionProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-foreground">
          {question.question}
        </h2>
        {question.description && (
          <p className="text-muted-foreground">
            {question.description}
          </p>
        )}
      </div>

      <RadioGroup
        value={selectedAnswer}
        onValueChange={onAnswer}
        className="space-y-3"
      >
        {question.options.map((option) => (
          <Card
            key={option.id}
            className={cn(
              "cursor-pointer transition-all duration-200 hover:border-primary/50",
              selectedAnswer === option.id && "border-primary bg-primary/5"
            )}
            onClick={() => onAnswer(option.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <RadioGroupItem value={option.id} id={option.id} />
                <Label
                  htmlFor={option.id}
                  className="flex-1 cursor-pointer text-base font-normal"
                >
                  {option.label}
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
};
