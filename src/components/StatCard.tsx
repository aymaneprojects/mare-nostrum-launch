interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

const StatCard = ({ value, label, description }: StatCardProps) => {
  return (
    <div className="text-center p-5 md:p-8 bg-card rounded-lg border border-border hover-lift">
      <div className="text-3xl md:text-5xl font-bold text-primary mb-3">{value}</div>
      <div className="mn-eyebrow-muted mb-1">{label}</div>
      {description && (
        <div className="text-xs md:text-sm text-muted-foreground mt-2 leading-relaxed">{description}</div>
      )}
    </div>
  );
};

export default StatCard;
