interface TestimonialCardProps {
  text: string;
  author: string;
  role: string;
  organization?: string;
}

const TestimonialCard = ({ text, author, role, organization }: TestimonialCardProps) => {
  return (
    <div className="mn-quote-mark relative h-full overflow-hidden bg-card border border-border border-t-2 border-t-accent rounded-lg p-6 md:p-10 shadow-soft text-left">
      <p className="relative text-[17px] md:text-xl text-foreground/90 mb-4 leading-[1.6] font-editorial italic">
        « {text} »
      </p>
      <div className="mn-hairline pt-5 mt-6">
        <p className="font-semibold text-primary text-base">{author}</p>
        <p className="mn-eyebrow-muted mt-1">
          {role}
          {organization && ` · ${organization}`}
        </p>
      </div>
    </div>
  );
};

export default TestimonialCard;
