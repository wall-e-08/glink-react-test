type InlineInfoProps = {
  label: string
  value: number
}

const InlineInfo = ({label, value}: InlineInfoProps) => {
  return (
    <div className="inline-flex items-center gap-1 text-xs">
      <span className="text-secondary">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

export default InlineInfo;