import { Quote } from "lucide-react";

interface TestimonialCardProps {
  text: string;
  author: string;
  role: string;
  organization?: string;
}

const TestimonialCard = ({ text, author, role, organization }: TestimonialCardProps) => {
  return (
    <div className="relative bg-card border-[1.5px] border-primary/15 rounded-[14px] p-6 md:p-8 transition-all hover:border-accent hover:-translate-y-0.5 text-center">
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent w-10 h-10 rounded-full flex items-center justify-center shadow-soft">
        <Quote className="h-4 w-4 text-accent-foreground" />
      </div>
      <p className="text-sm md:text-base text-foreground/85 mb-4 mt-3 leading-relaxed font-editorial italic">
        « {text} »
      </p>
      <div className="mn-hairline pt-4 mt-4">
        <p className="font-semibold text-primary text-sm md:text-base">{author}</p>
        <p className="mn-eyebrow-muted mt-1">
          {role}
          {organization && ` · ${organization}`}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
