import { type InputMessageProps } from "../../../types/shared";

export function InputMessage({ error, helperText }: InputMessageProps) {
  if (!error && !helperText) return null;

  return (
    <div className="mt-2 text-sm">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : helperText ? (
        <p className="text-[#9CA3AF]">{helperText}</p>
      ) : null}
    </div>
  );
} 