interface LabelProps {
  text: string;
}

const Label = ({ text }: LabelProps) => (
  <label className="text-sm font-medium text-gray-700">{text}</label>
);

export default Label;
