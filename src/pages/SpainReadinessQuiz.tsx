import { useState } from "react";
import { Meta } from "@/components/seo/Meta";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeHero } from "@/components/ui/badge-hero";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizLeadForm } from "@/components/quiz/QuizLeadForm";
import { QuizResult } from "@/components/quiz/QuizResult";
import { quizQuestions, calculateResult, getScorePercentage, ResultTier } from "@/components/quiz/quizData";
import { 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Target,
  CheckCircle,
  Building2
} from "lucide-react";

type QuizStep = "intro" | "questions" | "lead-form" | "results";

const SpainReadinessQuiz = () => {
  const [step, setStep] = useState<QuizStep>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ResultTier | null>(null);

  // Track quiz start
  const handleStart = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "quiz_start_global_nrro",
        quiz_name: "spain_readiness_quiz",
      });
    }
    setStep("questions");
  };

  // Handle answer selection
  const handleAnswer = (answerId: string) => {
    const question = quizQuestions[currentQuestion];
    
    // Track answer
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "quiz_answer_global_nrro",
        question_id: question.id,
        question_number: currentQuestion + 1,
        answer_id: answerId,
      });
    }

    setAnswers((prev) => ({
      ...prev,
      [question.id]: answerId,
    }));
  };

  // Handle next question
  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      // Quiz complete - show lead form
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "quiz_complete_global_nrro",
          total_questions: quizQuestions.length,
        });
      }
      setStep("lead-form");
    }
  };

  // Handle previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  // Handle lead form completion
  const handleLeadFormComplete = () => {
    const calculatedResult = calculateResult(answers);
    setResult(calculatedResult);
    setStep("results");
  };

  // Handle book call CTA
  const handleBookCall = () => {
    if (typeof window !== "undefined" && window.dataLayer) {
      window.dataLayer.push({
        event: "quiz_cta_click_global_nrro",
        cta_type: "book_call",
        result_tier: result?.id,
      });
    }
    window.location.href = "/contact";
  };

  const currentQuestionData = quizQuestions[currentQuestion];
  const isAnswered = currentQuestionData && answers[currentQuestionData.id];
  const scorePercentage = getScorePercentage(answers);

  return (
    <>
      <Meta
        title="Spain Business Setup Readiness Score | Free Assessment | NRRO"
        description="Take our free 2-minute quiz to assess your readiness for establishing a business in Spain. Get personalized recommendations and next steps."
        canonicalUrl="https://global.nrro.es/spain-readiness-quiz"
      />

      <div className="min-h-screen bg-background">
        {/* Intro Screen */}
        {step === "intro" && (
          <section className="relative bg-black text-white pt-40 pb-32 md:pt-48 md:pb-40 lg:pt-56 lg:pb-48" data-dark="true">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl mx-auto text-center space-y-8">
                <BadgeHero>
                  <Target className="w-3 h-3 mr-1" />
                  Free Assessment
                </BadgeHero>
                
                <h1 className="hero-title">
                  Spain Business Setup{" "}
                  <span className="text-primary">Readiness Score</span>
                </h1>
                
                <p className="text-lead text-white/70">
                  Discover how prepared you are to establish your business presence in Spain. 
                  Get personalized recommendations based on your specific situation.
                </p>

                <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>2 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>10 questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span>Personalized results</span>
                  </div>
                </div>

                <Button size="lg" onClick={handleStart} className="gap-2 text-lg px-8">
                  Start Assessment
                  <ArrowRight className="w-5 h-5" />
                </Button>

                {/* What You'll Learn */}
                <Card className="mt-12 text-left border-white/10 bg-white/5 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <h2 className="text-xl font-semibold text-white mb-6 text-center">
                      What You'll Discover
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Target className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-medium text-white">Readiness Score</h3>
                        <p className="text-sm text-white/60">
                          Your overall preparedness level for Spain company formation
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-medium text-white">Key Gaps</h3>
                        <p className="text-sm text-white/60">
                          Areas that need attention before proceeding
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <ArrowRight className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="font-medium text-white">Next Steps</h3>
                        <p className="text-sm text-white/60">
                          Tailored recommendations for your situation
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Questions Screen */}
        {step === "questions" && currentQuestionData && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <div className="max-w-2xl mx-auto space-y-8">
              <QuizProgress 
                currentStep={currentQuestion + 1} 
                totalSteps={quizQuestions.length} 
              />
              
              <QuizQuestion
                question={currentQuestionData}
                selectedAnswer={answers[currentQuestionData.id]}
                onAnswer={handleAnswer}
              />

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Previous
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="gap-2"
                >
                  {currentQuestion === quizQuestions.length - 1 ? "See Results" : "Next"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Lead Form Screen */}
        {step === "lead-form" && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <QuizLeadForm
              quizAnswers={answers}
              scorePercentage={scorePercentage}
              onComplete={handleLeadFormComplete}
            />
          </div>
        )}

        {/* Results Screen */}
        {step === "results" && result && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            <QuizResult
              result={result}
              scorePercentage={scorePercentage}
              onBookCall={handleBookCall}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SpainReadinessQuiz;
