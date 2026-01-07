import { useEffect } from 'react';
import { Meta } from '@/components/seo/Meta';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  Mail, 
  Calendar, 
  FileText,
  Phone,
  Clock,
  ArrowRight,
  BookOpen,
  ClipboardCheck,
  Scale
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';
import { motion } from 'framer-motion';

export const ThankYouSubsidiary = () => {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('thank_you_page_view_global_nrro', {
      page_type: 'subsidiary',
      source: 'spanish-subsidiary-compliance'
    });
  }, [trackEvent]);

  const handleBookCallClick = () => {
    trackEvent('thank_you_book_call_click_global_nrro', {
      page_type: 'subsidiary'
    });
  };

  const handleResourceClick = (resourceName: string, url: string) => {
    trackEvent('thank_you_resource_click_global_nrro', {
      page_type: 'subsidiary',
      resource_name: resourceName,
      destination_url: url
    });
  };

  const nextSteps = [
    {
      icon: Mail,
      title: 'Check Your Inbox',
      description: 'We\'ve sent you a confirmation email with details about your compliance assessment.'
    },
    {
      icon: Calendar,
      title: 'Book a Consultation',
      description: 'Schedule a call to discuss your subsidiary\'s specific compliance requirements.',
      action: true
    },
    {
      icon: ClipboardCheck,
      title: 'Review Your Status',
      description: 'Gather information about your current filings, deadlines, and any overdue obligations.'
    }
  ];

  const resources = [
    {
      title: 'Spain Company Setup Playbook',
      description: 'Complete guide to establishing and maintaining your Spanish entity',
      url: '/spain-company-setup-playbook',
      icon: BookOpen
    },
    {
      title: 'Document Checklist',
      description: 'Essential documentation for Spanish corporate compliance',
      url: '/spain-document-checklist',
      icon: ClipboardCheck
    },
    {
      title: 'Legal Structures Spain',
      description: 'Understanding SL, SA, and branch office requirements',
      url: '/legal-structures-spain',
      icon: Scale
    }
  ];

  return (
    <>
      <Meta
        title="Thank You | Your Compliance Request Has Been Received | NRRO"
        description="Thank you for your interest in our Spanish subsidiary compliance services. A specialist will contact you within 1 business day."
        canonicalUrl="https://global.nrro.es/thank-you/subsidiary"
      />

      {/* Hero Section */}
      <section className="bg-black text-white pt-40 pb-20 md:pt-48 md:pb-28" data-dark="true">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8"
            >
              <CheckCircle className="h-10 w-10 text-primary" />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="hero-title mb-6"
            >
              Thank You!
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lead text-white/80"
            >
              We've received your request. A compliance specialist will contact you within 1 business day.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
                What Happens Next
              </p>
              <h2 className="text-3xl md:text-4xl font-normal">
                Next Steps
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {nextSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-medium text-lg mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
                      {step.action && (
                        <Button asChild onClick={handleBookCallClick}>
                          <Link to="/contact?book=true">
                            <Calendar className="mr-2 h-4 w-4" />
                            Schedule Now
                          </Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Resources */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70 mb-4">
                While You Wait
              </p>
              <h2 className="text-3xl md:text-4xl font-normal mb-4">
                Explore Our Resources
              </h2>
              <p className="text-lg text-muted-foreground">
                Learn more about Spanish subsidiary compliance requirements.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {resources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <Link 
                    key={index} 
                    to={resource.url}
                    onClick={() => handleResourceClick(resource.title, resource.url)}
                    className="group"
                  >
                    <Card className="h-full transition-all hover:border-primary/50 hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">{resource.description}</p>
                        <div className="flex items-center gap-1 mt-4 text-primary text-sm font-medium">
                          Explore <ArrowRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Card */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-normal mb-2">Need Immediate Assistance?</h2>
                  <p className="text-muted-foreground">Our team is available during business hours.</p>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Call us</p>
                      <a href="tel:+34934593600" className="font-medium hover:text-primary transition-colors">
                        +34 934 593 600
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email us</p>
                      <a href="mailto:info@nrro.es" className="font-medium hover:text-primary transition-colors">
                        info@nrro.es
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Mon-Fri: 9:00 - 18:00 CET</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Card className="border-0 bg-background">
              <CardContent className="p-8 md:p-12">
                <blockquote className="text-xl md:text-2xl font-normal italic text-foreground/80 mb-6">
                  "Managing our Spanish subsidiary from London was becoming a nightmare. NRRO took over all compliance—accounting, VAT, annual accounts—and now we never worry about missing a deadline. Their monthly reports integrate perfectly with our group reporting."
                </blockquote>
                <div>
                  <p className="font-medium">James Henderson</p>
                  <p className="text-sm text-muted-foreground">Group Finance Director, Meridian Holdings</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <p className="text-3xl font-bold text-primary">150+</p>
                <p className="text-sm text-muted-foreground">Subsidiaries Managed</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">25+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-sm text-muted-foreground">Missed Deadlines</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ThankYouSubsidiary;
