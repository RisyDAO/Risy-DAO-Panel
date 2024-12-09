import { type ConnectButtonProps } from "thirdweb/react";

export interface NavLink {
  href: string;
  label: string;
  active?: boolean;
}

export interface NavLinkProps {
  href: string;
  label: string;
  active?: boolean;
}

export interface NavigationProps {
  className?: string;
}

export interface LogoProps {
  src: string;
  alt: string;
  size?: number;
}

export interface NavLinksProps {
  links: NavLink[];
} 