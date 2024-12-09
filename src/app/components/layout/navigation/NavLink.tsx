import { type NavLinkProps } from "../../../types/navigation";

export function NavLink({ href, label, active = false }: NavLinkProps) {
  return (
    <a
      href={href}
      className={`
        px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
        ${active 
          ? 'bg-[#374151] text-white' 
          : 'text-[#9CA3AF] hover:bg-[#374151] hover:text-white'
        }
      `}
    >
      {label}
    </a>
  );
} 