import MarqueeText from "./MarqueeText";
import Image from "next/image";

function Footer() {
  return (
    <div className="bg-gradient-to-br from-card to-background py-6">
      <MarqueeText />
      <div className="p-4">
        <div className="text-gradient text-6xl md:text-[250px]">
          <h1>Motorsports</h1>
          <h1>AI</h1>
        </div>

        <div className="block md:flex justify-between space-y-6 pl-20">
          <div className="flex justify-between  items-center gap-10">
            <div>
              <h6>Home</h6>
              <h6>FAQs</h6>
              <h6>About</h6>
            </div>
            <div>
              <h6>Instagram</h6>
              <h6>LinkedIn</h6>
            </div>
          </div>
          <div className="md:text-center p-2 space-y-2">
            <Image
              src="/logo.png"
              width={100}
              height={100}
              alt="Motorsports AI Logo"
              className="rounded-full w-20 md:w-32"
            />
            <span className="text-sm font-semibold text-muted-foreground">© {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
