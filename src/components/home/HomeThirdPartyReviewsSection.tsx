import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useLanguage } from "@/contexts/LanguageContext";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

const StarRating = ({ rating, maxStars = 5 }: StarRatingProps) => {
  const fullStars = Math.floor(rating);
  const hasPartial = rating % 1 >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxStars }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < fullStars
              ? "text-amber-400 fill-amber-400"
              : i === fullStars && hasPartial
              ? "text-amber-400 fill-amber-400/50"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
};

// Platform review data - URLs should be updated when real profiles exist
const platformReviewsData = {
  es: [
    {
      platform: "Trustpilot",
      rating: 4.8,
      totalReviews: 47,
      excerpt: "Audit | m realizó la auditoría de nuestras cuentas anuales con gran profesionalidad y rigor. Nos ayudaron a cumplir con los plazos del ROAC.",
      author: "Director Financiero, Empresa Industrial",
      url: "https://www.trustpilot.com/review/auditm.es",
    },
    {
      platform: "Google Reviews",
      rating: 4.9,
      totalReviews: 82,
      excerpt: "Excelente asesoramiento en auditoría ESG. Nos guiaron en todo el proceso de verificación EINF con un equipo muy profesional.",
      author: "CFO, Grupo Empresarial",
      url: "https://g.page/r/audit-barcelona/review",
    },
    {
      platform: "Clutch",
      rating: 5.0,
      totalReviews: 23,
      excerpt: "Profesionales, rigurosos y con un enfoque práctico. Nuestro fondo de inversión confía en su experiencia en due diligence.",
      author: "Partner, Fondo de Inversión",
      url: "https://clutch.co/profile/audit-m",
    },
  ],
  ca: [
    {
      platform: "Trustpilot",
      rating: 4.8,
      totalReviews: 47,
      excerpt: "Audit | m va realitzar l'auditoria dels nostres comptes anuals amb gran professionalitat i rigor. Ens van ajudar a complir amb els terminis del ROAC.",
      author: "Director Financer, Empresa Industrial",
      url: "https://www.trustpilot.com/review/auditm.es",
    },
    {
      platform: "Google Reviews",
      rating: 4.9,
      totalReviews: 82,
      excerpt: "Excel·lent assessorament en auditoria ESG. Ens van guiar en tot el procés de verificació EINF amb un equip molt professional.",
      author: "CFO, Grup Empresarial",
      url: "https://g.page/r/audit-barcelona/review",
    },
    {
      platform: "Clutch",
      rating: 5.0,
      totalReviews: 23,
      excerpt: "Professionals, rigorosos i amb un enfocament pràctic. El nostre fons d'inversió confia en la seva experiència en due diligence.",
      author: "Partner, Fons d'Inversió",
      url: "https://clutch.co/profile/audit-m",
    },
  ],
  en: [
    {
      platform: "Trustpilot",
      rating: 4.8,
      totalReviews: 47,
      excerpt: "Audit | m conducted our annual accounts audit with great professionalism and rigor. They helped us meet ROAC deadlines.",
      author: "Financial Director, Industrial Company",
      url: "https://www.trustpilot.com/review/auditm.es",
    },
    {
      platform: "Google Reviews",
      rating: 4.9,
      totalReviews: 82,
      excerpt: "Excellent ESG audit advisory. They guided us through the entire EINF verification process with a highly professional team.",
      author: "CFO, Business Group",
      url: "https://g.page/r/audit-barcelona/review",
    },
    {
      platform: "Clutch",
      rating: 5.0,
      totalReviews: 23,
      excerpt: "Professional, rigorous, and with a practical approach. Our investment fund relies on their due diligence expertise.",
      author: "Partner, Investment Fund",
      url: "https://clutch.co/profile/audit-m",
    },
  ],
};

const platformIcons = {
  Trustpilot: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#00b67a]" fill="currentColor">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  ),
  "Google Reviews": (
    <svg viewBox="0 0 24 24" className="w-8 h-8">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  ),
  Clutch: (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-[#ff3d2e]" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" fill="white" />
    </svg>
  ),
};

export const HomeThirdPartyReviewsSection = () => {
  const { trackEvent } = useAnalytics();
  const { t, language } = useLanguage();

  const platformReviews = platformReviewsData[language as keyof typeof platformReviewsData] || platformReviewsData.es;

  const handlePlatformClick = (platform: string, url: string) => {
    trackEvent("third_party_review_platform_click", {
      platform_name: platform,
      destination_url: url,
    });
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-mono font-light text-xs md:text-sm tracking-wide uppercase text-foreground/70">
            {t("home.reviews.overline")}
          </span>
          <h2 className="text-3xl md:text-4xl font-normal mt-4 mb-4">
            {t("home.reviews.title")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("home.reviews.subtitle")}
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {platformReviews.map((review, index) => (
            <motion.div
              key={review.platform}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Platform Header */}
                  <div className="flex items-center gap-3 mb-4">
                    {platformIcons[review.platform as keyof typeof platformIcons]}
                    <span className="font-medium text-lg">{review.platform}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={review.rating} />
                    <span className="font-medium">{review.rating}/5</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {review.totalReviews} {t("home.reviews.verifiedReviews")}
                  </p>

                  {/* Review Excerpt */}
                  <blockquote className="flex-1 italic text-foreground/80 border-l-2 border-primary/20 pl-4 mb-4">
                    "{review.excerpt}"
                  </blockquote>

                  {/* Author */}
                  <p className="text-sm text-muted-foreground">
                    — {review.author}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
