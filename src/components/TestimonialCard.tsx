import { Quote } from "lucide-react";

interface TestimonialCardProps {
  text: string;
  author: string;
  role: string;
  organization?: string;
}

const TestimonialCard = ({ text, author, role, organization }: TestimonialCardProps) => {
  return (
    <div className="relative bg-card border border-border shape-diagonal p-5 md:p-7 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 text-center">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent w-10 h-10 shape-hex flex items-center justify-center">
        <Quote className="h-4 w-4 text-accent-foreground" />
      </div>
      <p className="text-sm md:text-base text-foreground/90 mb-3 md:mb-4 italic mt-4">"{text}"</p>
      <div>
        <p className="font-semibold text-foreground text-sm md:text-base">{author}</p>
        <p className="text-xs md:text-sm text-muted-foreground">
          {role}
          {organization && ` · ${organization}`}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
