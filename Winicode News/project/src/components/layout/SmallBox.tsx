interface SmallBoxProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  iconBgColor?: string;
}

const SmallBox: React.FC<SmallBoxProps> = ({
  icon,
  title,
  value,
  iconBgColor = 'bg-gray-200',
}) => {
  return (
    <div className="bg-white shadow rounded-2xl p-4 flex items-center space-x-4 w-full">
      <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${iconBgColor}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="font-semibold text-lg">{title}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
};

export default SmallBox;
