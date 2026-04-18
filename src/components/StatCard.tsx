interface StatCardProps {
  value: string;
  label: string;
  description?: string;
}

const StatCard = ({ value, label, description }: StatCardProps) => {
  return (
    <div className="text-center p-4 md:p-6 bg-secondary/50 shape-cut border-l-2 border-accent">
      <div className="text-3xl md:text-5xl font-bold text-primary mb-2">{value}</div>
      <div className="text-base md:text-lg font-semibold text-foreground mb-1">{label}</div>
      {description && (
        <div className="text-xs md:text-sm text-muted-foreground">{description}</div>
      )}
    </div>
  );
};

export default StatCard;
