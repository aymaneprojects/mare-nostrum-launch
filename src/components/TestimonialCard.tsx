import { Quote } from "lucide-react";

interface TestimonialCardProps {
  text: string;
  author: string;
  role: string;
  organization?: string;
}

const TestimonialCard = ({ text, author, role, organization }: TestimonialCardProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <Quote className="h-8 w-8 text-accent mb-4" />
      <p className="text-foreground/90 mb-4 italic">"{text}"</p>
      <div>
        <p className="font-semibold text-foreground">{author}</p>
        <p className="text-sm text-muted-foreground">
          {role}
          {organization && ` · ${organization}`}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
