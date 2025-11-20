interface SectionHeaderProps {
  title: string;
  gradient: string;
  tooltip?: React.ReactNode;
}

export default function SectionHeader({ title, gradient, tooltip }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-1 h-8 ${gradient} rounded-full`}></div>
      <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{title}</h3>
      {tooltip}
    </div>
  );
}
