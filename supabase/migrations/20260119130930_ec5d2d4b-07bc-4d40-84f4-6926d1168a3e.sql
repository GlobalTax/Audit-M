-- Create email nurture sequences table
CREATE TABLE public.email_nurture_sequences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_type TEXT NOT NULL, -- 'playbook', 'calculator', 'quiz', 'consultation'
  sequence_order INTEGER NOT NULL DEFAULT 1,
  delay_days INTEGER NOT NULL DEFAULT 1,
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(lead_type, sequence_order)
);

-- Create nurture email log to track sent emails
CREATE TABLE public.nurture_email_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL,
  lead_type TEXT NOT NULL,
  lead_email TEXT NOT NULL,
  sequence_id UUID REFERENCES public.email_nurture_sequences(id),
  sequence_order INTEGER NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT now(),
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  status TEXT DEFAULT 'sent' -- 'sent', 'opened', 'clicked', 'bounced', 'unsubscribed'
);

-- Create index for faster lookups
CREATE INDEX idx_nurture_email_log_lead ON public.nurture_email_log(lead_id, lead_type);
CREATE INDEX idx_nurture_email_log_status ON public.nurture_email_log(status, sent_at);

-- Enable RLS
ALTER TABLE public.email_nurture_sequences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nurture_email_log ENABLE ROW LEVEL SECURITY;

-- Policies for sequences (admin only via service role)
CREATE POLICY "Service role full access to sequences"
ON public.email_nurture_sequences FOR ALL USING (true);

-- Policies for log (admin only via service role)
CREATE POLICY "Service role full access to nurture log"
ON public.nurture_email_log FOR ALL USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_email_nurture_sequences_updated_at
BEFORE UPDATE ON public.email_nurture_sequences
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default sequences for Playbook leads
INSERT INTO public.email_nurture_sequences (lead_type, sequence_order, delay_days, subject, html_content) VALUES
('spain-company-setup', 1, 1, 'Welcome! Your Spain Company Setup Playbook', '<h1>Welcome to NRRO International</h1><p>Thank you for downloading our Spain Company Setup Playbook. We hope you find it valuable as you plan your business expansion.</p><p><strong>Quick Start Tips:</strong></p><ul><li>Review Section 1: Legal Structures to understand your options</li><li>Use the timeline in Section 3 to plan your setup</li><li>Check the cost breakdown in Section 4</li></ul><p>Need personalized guidance? <a href="https://global.nrro.es/contact">Book a free consultation</a> with our experts.</p><p>Best regards,<br>The NRRO International Team</p>'),
('spain-company-setup', 2, 3, '3 Common Mistakes When Setting Up in Spain', '<h1>Avoid These 3 Costly Mistakes</h1><p>After helping 500+ international companies establish in Spain, we''ve seen the same mistakes repeatedly:</p><ol><li><strong>Choosing the wrong legal structure</strong> - An SL isn''t always the best choice. Sometimes a branch or SA makes more sense.</li><li><strong>Underestimating timeline</strong> - NIE processing alone can take 4-6 weeks for non-EU nationals.</li><li><strong>Missing tax optimization opportunities</strong> - The Beckham Law can save executives up to 50% on income tax.</li></ol><p>Want to ensure you''re on the right track? <a href="https://global.nrro.es/spain-setup-calculator">Use our free calculator</a> to get accurate estimates.</p><p>Best regards,<br>The NRRO International Team</p>'),
('spain-company-setup', 3, 7, 'Ready to Start Your Spain Setup?', '<h1>Let''s Make It Happen</h1><p>You downloaded our Spain Company Setup Playbook a week ago. If you''re still planning your expansion, we''d love to help.</p><p><strong>What We Can Do For You:</strong></p><ul><li>Complete company formation (SL, SA, Branch)</li><li>NIE and visa processing</li><li>Tax optimization and Beckham Law applications</li><li>Payroll setup and HR compliance</li></ul><p><strong>Special Offer:</strong> Book a consultation this week and receive a complimentary document checklist review.</p><p><a href="https://global.nrro.es/contact" style="background:#000;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;">Schedule Your Free Consultation</a></p><p>Best regards,<br>The NRRO International Team</p>'),

-- Calculator leads
('spain-setup-calculator', 1, 1, 'Your Spain Setup Cost Estimate', '<h1>Your Personalized Estimate</h1><p>Thank you for using our Spain Setup Cost & Timeline Calculator. Based on your inputs, you now have a clearer picture of what to expect.</p><p><strong>Next Steps:</strong></p><ol><li>Download our <a href="https://global.nrro.es/spain-document-checklist">Document Checklist</a> to prepare your paperwork</li><li>Take our <a href="https://global.nrro.es/spain-readiness-quiz">Readiness Quiz</a> to assess your preparation level</li><li>Book a consultation to get a fixed-fee proposal</li></ol><p>Best regards,<br>The NRRO International Team</p>'),
('spain-setup-calculator', 2, 3, 'Case Study: How Meridian Technologies Set Up in 6 Weeks', '<h1>Real Results, Real Timeline</h1><p>Meridian Technologies, a UK software company, wanted to expand to Spain quickly. Here''s how we helped:</p><ul><li><strong>Challenge:</strong> CEO needed to relocate within 2 months</li><li><strong>Solution:</strong> Expedited SL formation + Beckham Law application</li><li><strong>Result:</strong> Company operational in 6 weeks, 47% tax savings</li></ul><p>"NRRO made what seemed impossible completely manageable." - Sarah Chen, CEO</p><p>Ready to discuss your situation? <a href="https://global.nrro.es/contact">Let''s talk</a>.</p><p>Best regards,<br>The NRRO International Team</p>'),
('spain-setup-calculator', 3, 7, 'Your Fixed-Fee Proposal Awaits', '<h1>Get Your Personalized Quote</h1><p>You used our calculator a week ago to estimate your Spain setup costs. Now let''s get you an exact figure.</p><p><strong>Our Fixed-Fee Advantage:</strong></p><ul><li>No surprises - know exactly what you''ll pay</li><li>All-inclusive service from start to finish</li><li>Dedicated advisor throughout the process</li></ul><p><a href="https://global.nrro.es/contact" style="background:#000;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;">Request Your Custom Quote</a></p><p>Best regards,<br>The NRRO International Team</p>'),

-- Quiz leads
('spain-readiness-quiz', 1, 1, 'Your Readiness Score Explained', '<h1>Understanding Your Score</h1><p>Thank you for taking our Spain Business Setup Readiness Quiz. Your score indicates where you stand in your preparation journey.</p><p><strong>Improve Your Readiness:</strong></p><ul><li>Download our <a href="https://global.nrro.es/spain-company-setup-playbook">Complete Playbook</a></li><li>Use our <a href="https://global.nrro.es/spain-setup-calculator">Cost Calculator</a></li><li>Review our <a href="https://global.nrro.es/spain-document-checklist">Document Checklist</a></li></ul><p>Questions about your score? <a href="https://global.nrro.es/contact">We''re here to help</a>.</p><p>Best regards,<br>The NRRO International Team</p>'),
('spain-readiness-quiz', 2, 4, 'Your Personalized Action Plan', '<h1>Next Steps Based on Your Quiz Results</h1><p>Based on your readiness assessment, here''s what we recommend:</p><ol><li><strong>Documentation:</strong> Start gathering corporate documents now</li><li><strong>Timeline:</strong> Plan for 6-10 weeks from decision to operation</li><li><strong>Tax Planning:</strong> Evaluate Beckham Law eligibility before moving</li></ol><p>Want a detailed roadmap? <a href="https://global.nrro.es/contact">Schedule a strategy call</a> with our team.</p><p>Best regards,<br>The NRRO International Team</p>'),
('spain-readiness-quiz', 3, 7, 'Turn Your Plans Into Action', '<h1>From Planning to Reality</h1><p>You took our readiness quiz a week ago. If Spain expansion is still on your agenda, let''s make it happen.</p><p><strong>Free Strategy Session Includes:</strong></p><ul><li>Review of your specific situation</li><li>Optimal structure recommendation</li><li>Realistic timeline and budget</li><li>Tax optimization opportunities</li></ul><p><a href="https://global.nrro.es/contact" style="background:#000;color:#fff;padding:12px 24px;text-decoration:none;border-radius:6px;">Book Your Free Session</a></p><p>Best regards,<br>The NRRO International Team</p>');