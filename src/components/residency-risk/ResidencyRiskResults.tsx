import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ResidencyRiskResults as RiskResults, RISK_LEVEL_CONFIG } from '@/lib/residencyRiskLogic';
import { AlertTriangle, CheckCircle, XCircle, Calendar, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ResidencyRiskResultsProps {
  results: RiskResults;
}

export function ResidencyRiskResults({ results }: ResidencyRiskResultsProps) {
  const config = RISK_LEVEL_CONFIG[results.riskLevel];
  
  const getRiskIcon = () => {
    switch (results.riskLevel) {
      case 'LOW': return <CheckCircle className="h-8 w-8 text-green-600" />;
      case 'MEDIUM': return <AlertTriangle className="h-8 w-8 text-yellow-600" />;
      case 'HIGH': return <AlertTriangle className="h-8 w-8 text-orange-600" />;
      case 'VERY_HIGH': return <XCircle className="h-8 w-8 text-red-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Risk Score Card */}
      <Card className={`border-2 ${config.bgColor}`}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="inline-flex p-4 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
              {getRiskIcon()}
            </div>
            
            <div>
              <Badge className={`${config.bgColor} ${config.color} text-lg px-4 py-2 border-none`}>
                {config.label}
              </Badge>
              <p className={`mt-3 ${config.color} font-medium`}>
                {config.description}
              </p>
            </div>

            {/* Score Progress */}
            <div className="max-w-xs mx-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Risk Score</span>
                <span className="font-bold">{results.score}/100</span>
              </div>
              <Progress 
                value={results.score} 
                className="h-3"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Days Remaining Alert */}
      {!results.automaticResident && results.daysRemaining > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Days Remaining Before 183 Threshold</p>
                <p className="text-2xl font-bold text-primary">{results.daysRemaining} days</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Track your time in Spain carefully to maintain non-resident status
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Automatic Resident Warning */}
      {results.automaticResident && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-4">
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-red-800">183-Day Threshold Exceeded</p>
                <p className="text-sm text-red-700 mt-1">
                  You have exceeded the 183-day threshold, which automatically qualifies you as a 
                  Spanish tax resident under Article 9 of the Personal Income Tax Law.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Key Findings */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-normal flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Key Factors Identified
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {results.keyFindings.map((finding, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Criteria Triggers */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-normal">Official Residency Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span>183 Days Rule</span>
              <Badge variant={results.criteriaTriggered.days183 ? 'destructive' : 'secondary'}>
                {results.criteriaTriggered.days183 ? 'Triggered' : 'Not Triggered'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span>Economic Center of Interests</span>
              <Badge variant={results.criteriaTriggered.economicCenter ? 'destructive' : 'secondary'}>
                {results.criteriaTriggered.economicCenter ? 'Likely' : 'Unlikely'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span>Vital Interests (Family)</span>
              <Badge variant={results.criteriaTriggered.vitalInterests ? 'destructive' : 'secondary'}>
                {results.criteriaTriggered.vitalInterests ? 'Likely' : 'Unlikely'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-normal">Our Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {results.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium">
                  {index + 1}
                </span>
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Beckham Law CTA */}
      {(results.riskLevel === 'HIGH' || results.riskLevel === 'VERY_HIGH') && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-medium">Considering Spanish Tax Residency?</h3>
              <p className="text-muted-foreground text-sm">
                If you qualify, the Beckham Law can reduce your tax rate to just 24% on Spanish income.
              </p>
              <Button asChild>
                <Link to="/beckham-law-calculator">
                  Calculate Beckham Law Savings
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <p className="text-xs text-muted-foreground text-center px-4">
        This assessment is for informational purposes only and does not constitute legal or tax advice. 
        Tax residency determination involves complex factors and should be reviewed by a qualified professional. 
        Laws and regulations may change.
      </p>
    </div>
  );
}
