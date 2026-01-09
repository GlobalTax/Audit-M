import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { comparisonQuestions, calculateRecommendation, legalStructures } from '@/lib/legalStructuresData';
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAnalytics } from '@/hooks/useAnalytics';

interface RecommendationQuizProps {
  onComplete: (recommendation: string, secondChoice: string) => void;
}

export function RecommendationQuiz({ onComplete }: RecommendationQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const { trackEvent } = useAnalytics();

  const question = comparisonQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / comparisonQuestions.length) * 100;

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
    trackEvent('comparator_answer_selected', {
      question_id: question.id,
      answer: value
    });
  };

  const handleNext = () => {
    if (currentQuestion < comparisonQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const result = calculateRecommendation(answers);
      trackEvent('comparator_quiz_completed', {
        recommendation: result.recommendation,
        scores: result.scores
      });
      setShowResult(true);
      onComplete(result.recommendation, result.secondChoice);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (showResult) {
    const result = calculateRecommendation(answers);
    const recommended = legalStructures.find(s => s.id === result.recommendation);
    const second = legalStructures.find(s => s.id === result.secondChoice);

    return (
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-normal">
            <Sparkles className="h-5 w-5 text-accent" />
            Your Recommended Structure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-background rounded-lg">
            <CheckCircle className="h-10 w-10 text-primary" />
            <div>
              <p className="text-2xl font-medium">{recommended?.shortName}</p>
              <p className="text-muted-foreground">{recommended?.name}</p>
            </div>
          </div>
          
          <p className="text-muted-foreground">
            Based on your answers, the <strong>{recommended?.shortName}</strong> structure 
            best fits your needs. Consider <strong>{second?.shortName}</strong> as an alternative.
          </p>

          <Button 
            onClick={() => {
              setShowResult(false);
              setCurrentQuestion(0);
              setAnswers({});
            }}
            variant="outline"
            className="w-full"
          >
            Retake Quiz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {comparisonQuestions.length}
          </span>
          <span className="text-sm font-medium text-primary">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <CardTitle className="text-lg font-normal pt-4">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={answers[question.id] || ''}
          onValueChange={handleAnswer}
          className="space-y-3"
        >
          {question.options.map(option => (
            <div key={option.value}>
              <Label
                htmlFor={option.value}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors",
                  answers[question.id] === option.value
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <span>{option.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex items-center justify-between pt-4">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!answers[question.id]}
          >
            {currentQuestion === comparisonQuestions.length - 1 ? 'Get Recommendation' : 'Next'}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
