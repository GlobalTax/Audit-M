import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogAuthorCardProps {
  name: string;
  avatarUrl?: string;
  className?: string;
}

export const BlogAuthorCard = ({ name, avatarUrl, className = "" }: BlogAuthorCardProps) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Avatar className="h-6 w-6">
        {avatarUrl && <AvatarImage src={avatarUrl} alt={name} />}
        <AvatarFallback className="text-xs bg-muted">{initials}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium text-foreground">{name}</span>
    </div>
  );
};
