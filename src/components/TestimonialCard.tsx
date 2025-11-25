import { Quote } from "lucide-react";

interface TestimonialCardProps {
  text: string;
  author: string;
  role: string;
  organization?: string;
}

const TestimonialCard = ({ text, author, role, organization }: TestimonialCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow text-center">
      <Quote className="h-6 w-6 md:h-8 md:w-8 text-accent mb-3 md:mb-4 mx-auto" />
      <p className="text-sm md:text-base text-foreground/90 mb-3 md:mb-4 italic">"{text}"</p>
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
