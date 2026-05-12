import { Trophy } from "lucide-react";

export interface NavItemType{
  label: string;
  href: string;
  icon?: React.ElementType;
} 

const navItems: NavItemType[] = [
  { label: "All Leagues", href: "/", icon: Trophy },
  {label: "Blogs", href: "/blogs"}
];

export default navItems;
