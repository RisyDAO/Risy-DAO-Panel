import { type InputLabelProps } from "../../../types/shared";

export function InputLabel({ label }: InputLabelProps) {
  if (!label) return null;
  
  return (
    <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
      {label}
    </label>
  );
} 