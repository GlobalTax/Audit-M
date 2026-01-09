import { useState, useEffect, useCallback } from "react";

interface Notification {
  id: number;
  name: string;
  country: string;
  action: string;
  timeAgo: string;
}

const names = [
  "John", "Sarah", "Michael", "Emma", "David", "Lisa", "James", "Maria",
  "Robert", "Anna", "William", "Sophie", "Thomas", "Laura", "Daniel", "Elena"
];

const countries = [
  "USA", "UK", "Germany", "France", "Netherlands", "Sweden", "Canada",
  "Australia", "Switzerland", "Italy", "Belgium", "Ireland", "Singapore"
];

const actions = [
  "downloaded the Spain Company Setup Playbook",
  "requested a consultation",
  "used the Setup Calculator",
  "completed the Readiness Quiz",
  "downloaded the Document Checklist"
];

const timeAgos = [
  "just now", "2 minutes ago", "5 minutes ago", "8 minutes ago", "12 minutes ago"
];

const generateNotification = (id: number): Notification => ({
  id,
  name: names[Math.floor(Math.random() * names.length)],
  country: countries[Math.floor(Math.random() * countries.length)],
  action: actions[Math.floor(Math.random() * actions.length)],
  timeAgo: timeAgos[Math.floor(Math.random() * timeAgos.length)],
});

export const useSocialProofNotifications = (interval = 35000) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [notificationId, setNotificationId] = useState(0);

  const showNotification = useCallback(() => {
    const newNotification = generateNotification(notificationId);
    setNotification(newNotification);
    setNotificationId((prev) => prev + 1);

    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  }, [notificationId]);

  const dismissNotification = useCallback(() => {
    setNotification(null);
  }, []);

  useEffect(() => {
    // Show first notification after initial delay
    const initialTimeout = setTimeout(showNotification, 8000);

    // Set up recurring interval
    const intervalId = setInterval(showNotification, interval);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(intervalId);
    };
  }, [interval, showNotification]);

  return { notification, dismissNotification };
};
