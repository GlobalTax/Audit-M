import { useEffect } from "react";
import { X, User } from "lucide-react";
import { useSocialProofNotifications } from "@/hooks/useSocialProofNotifications";
import { useAnalytics } from "@/hooks/useAnalytics";

export const SocialProofToast = () => {
  const { notification, dismissNotification } = useSocialProofNotifications();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    if (notification) {
      trackEvent("social_proof_shown_global_nrro", {
        action: notification.action,
        page: window.location.pathname,
      });
    }
  }, [notification, trackEvent]);

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm animate-in slide-in-from-left-full duration-300">
      <div className="flex items-start gap-3 rounded-lg border bg-background p-4 shadow-lg">
        {/* Avatar */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
          <User className="h-5 w-5 text-muted-foreground" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground">
            <span className="font-medium">{notification.name}</span>
            <span className="text-muted-foreground"> from </span>
            <span className="font-medium">{notification.country}</span>
          </p>
          <p className="text-sm text-muted-foreground truncate">
            {notification.action}
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            {notification.timeAgo}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={dismissNotification}
          className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Dismiss notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
