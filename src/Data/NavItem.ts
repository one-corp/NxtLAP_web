import { Trophy, BookMarked } from "lucide-react";

const navItems: Array<{ label: string; href: string; icon?: React.ElementType; }> = [
  { label: "All Leagues", href: "/", icon: Trophy },
  { label: "My Leagues", href: "/my-leagues", icon: BookMarked },
  { label: "FAQs", href: "/faqs", },
  { label: "About", href: "/about" },
  {label: "Blogs", href: "/blogs"}
];

export default navItems;
