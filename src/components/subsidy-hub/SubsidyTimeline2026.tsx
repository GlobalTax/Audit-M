import { useLanguage } from "@/contexts/LanguageContext";
import { Overline } from "@/components/ui/typography";
import { AlertTriangle, Calendar, Clock, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  dateKey: string;
  titleKey: string;
  descriptionKey: string;
  type: "critical" | "important" | "opportunity" | "info";
}

const timelineEvents: TimelineEvent[] = [
  {
    dateKey: "subsidyHub.timeline.events.prtr.date",
    titleKey: "subsidyHub.timeline.events.prtr.title",
    descriptionKey: "subsidyHub.timeline.events.prtr.description",
    type: "critical",
  },
  {
    dateKey: "subsidyHub.timeline.events.cdti.date",
    titleKey: "subsidyHub.timeline.events.cdti.title",
    descriptionKey: "subsidyHub.timeline.events.cdti.description",
    type: "important",
  },
  {
    dateKey: "subsidyHub.timeline.events.feder.date",
    titleKey: "subsidyHub.timeline.events.feder.title",
    descriptionKey: "subsidyHub.timeline.events.feder.description",
    type: "opportunity",
  },
  {
    dateKey: "subsidyHub.timeline.events.nextgen.date",
    titleKey: "subsidyHub.timeline.events.nextgen.title",
    descriptionKey: "subsidyHub.timeline.events.nextgen.description",
    type: "critical",
  },
  {
    dateKey: "subsidyHub.timeline.events.idae.date",
    titleKey: "subsidyHub.timeline.events.idae.title",
    descriptionKey: "subsidyHub.timeline.events.idae.description",
    type: "info",
  },
];

const typeStyles = {
  critical: {
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-400 dark:border-red-600",
    icon: AlertTriangle,
    iconColor: "text-red-600 dark:text-red-400",
    badge: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    badgeText: "subsidyHub.timeline.types.critical",
  },
  important: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-400 dark:border-amber-600",
    icon: Clock,
    iconColor: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    badgeText: "subsidyHub.timeline.types.important",
  },
  opportunity: {
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-400 dark:border-green-600",
    icon: CheckCircle,
    iconColor: "text-green-600 dark:text-green-400",
    badge: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    badgeText: "subsidyHub.timeline.types.opportunity",
  },
  info: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-400 dark:border-blue-600",
    icon: Info,
    iconColor: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    badgeText: "subsidyHub.timeline.types.info",
  },
};

export const SubsidyTimeline2026 = () => {
  const { t } = useLanguage();

  return (
    <section id="timeline-2026" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Overline className="mb-3">{t('subsidyHub.timeline.overline')}</Overline>
          <h2 className="text-3xl md:text-4xl font-normal text-foreground mb-4">
            {t('subsidyHub.timeline.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subsidyHub.timeline.subtitle')}
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {Object.entries(typeStyles).map(([key, style]) => (
            <div key={key} className="flex items-center gap-2">
              <span className={cn("text-xs px-2 py-1 rounded-full", style.badge)}>
                {t(style.badgeText)}
              </span>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

            {/* Events */}
            <div className="space-y-6">
              {timelineEvents.map((event, index) => {
                const style = typeStyles[event.type];
                const Icon = style.icon;

                return (
                  <div key={index} className="relative flex gap-6">
                    {/* Icon */}
                    <div className={cn(
                      "relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 bg-background",
                      style.border
                    )}>
                      <Icon className={cn("h-6 w-6", style.iconColor)} />
                    </div>

                    {/* Content */}
                    <div className={cn(
                      "flex-1 rounded-xl border p-5",
                      style.bg,
                      style.border
                    )}>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          {t(event.dateKey)}
                        </div>
                        <span className={cn("text-xs px-2 py-0.5 rounded-full", style.badge)}>
                          {t(style.badgeText)}
                        </span>
                      </div>
                      <h3 className="text-lg font-medium text-foreground mb-1">
                        {t(event.titleKey)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(event.descriptionKey)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
