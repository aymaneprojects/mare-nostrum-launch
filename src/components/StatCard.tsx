interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

const StatCard = ({ value, label, description }: StatCardProps) => {
  return (
    <div className="text-center p-5 md:p-7 bg-card rounded-[14px] border-[1.5px] border-primary/15 transition-all hover:border-accent hover:-translate-y-0.5">
      <div className="text-3xl md:text-5xl font-bold text-primary mb-2 tracking-tight">{value}</div>
      <div className="mn-eyebrow-muted mb-1">{label}</div>
      {description && (
        <div className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed">{description}</div>
      )}
    </div>
  );
};

export default StatCard;
