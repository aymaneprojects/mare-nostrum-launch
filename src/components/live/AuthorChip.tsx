import { cn } from "@/lib/utils";

interface AuthorChipProps {
  name: string;
  emoji: string;
  className?: string;
}

const AuthorChip = ({ name, emoji, className }: AuthorChipProps) => (
  <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium", className)}>
    <span aria-hidden className="text-lg leading-none">{emoji}</span>
    {name}
  </span>
);

export default AuthorChip;
