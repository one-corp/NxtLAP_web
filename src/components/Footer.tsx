import MarqueeText from "./MarqueeText";
import Image from "next/image";
import navItems from "@/Data/NavItem";
import socialHandles from "@/Data/SocialHandles";
import Link from "next/link";

function Footer() {
  const navLinks = navItems.reduce((acc, item) => {
    if (item.label === "All Leagues") {
      acc.push({ ...item, label: "Home" });
    } else {
      acc.push(item);
    }

    return acc;
  }, [] as typeof navItems);

  return (
    <footer
      className="relative overflow-hidden bg-gradient-to-br from-background via-accent/50 to-background"
      role="contentinfo"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-r from-green-500 to-teal-500 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Racing stripe decoration */}
      <div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500"
        aria-hidden="true"
      ></div>

      <MarqueeText />

      <div className="relative z-10 p-6 md:p-8 space-y-8">
        {/* Hero Branding Section */}
        <div className="space-y-4">
          <div className="relative">
            {/* Glowing effect behind text */}
            <div
              className="absolute inset-0 text-center text-gradient font-bold text-5xl md:text-[200px] blur-sm opacity-30 select-none"
              aria-hidden="true"
            >
              <h2 className="leading-none">NxtLAP</h2>
            </div>

            {/* Main text */}
            <div className="relative text-center text-gradient font-bold text-5xl md:text-[200px] tracking-normal">
              <h2 className="leading-none">NxtLAP</h2>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Navigation Links */}
          <nav className="space-y-8" aria-label="Footer navigation">
            <div className="group">
              <h3 className="font-bold text-accent-foreground text-lg mb-4 border-b pb-2">
                Navigation
              </h3>

              <ul className="flex flex-col space-y-2" role="list">
                {navLinks.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={item.href}
                      className="hover:text-primary cursor-pointer font-medium focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 rounded transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="group">
              <h3 className="font-bold text-accent-foreground text-lg mb-4 border-b pb-2">
                Connect
              </h3>
              <ul className="flex flex-col space-y-2" role="list">
                {socialHandles.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      target="_blank"
                      className="hover:text-primary cursor-pointer font-medium focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 rounded transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* App Download & Copyright Section */}
          <div className="flex flex-col items-center space-y-6">
            <div className="text-center space-y-4">
              <Link
                href="https://apps.apple.com/in/app/nxtlap-race-scores-widgets/id6754256034"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4 rounded-lg"
                aria-label="Download on the App Store"
              >
                <Image
                  src="/app-store-badge.svg"
                  width={135}
                  height={40}
                  alt="Download on the App Store"
                  className="h-10 w-auto"
                />
              </Link>
              <div>
                <p
                  className="text-slate-400 text-sm font-medium"
                  role="contentinfo"
                >{`© ${new Date().getFullYear()} NxtLAP`}
                </p>
                <p className="text-slate-500 text-xs mt-1">All rights reserved</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom racing stripes */}
        <div className="relative mt-12" aria-hidden="true">
          <div className="flex space-x-1 opacity-20">
            <div className="h-1 bg-red-500 flex-1"></div>
            <div className="h-1 bg-orange-500 flex-1"></div>
            <div className="h-1 bg-yellow-500 flex-1"></div>
            <div className="h-1 bg-green-500 flex-1"></div>
            <div className="h-1 bg-blue-500 flex-1"></div>
            <div className="h-1 bg-indigo-500 flex-1"></div>
            <div className="h-1 bg-purple-500 flex-1"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
