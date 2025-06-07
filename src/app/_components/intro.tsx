import Image from "next/image";
import Link from "next/link";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-start md:items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex items-start">
        {/* Logo for light mode (black logo on white background) */}
        <Link href="/" className="mr-4 block dark:hidden hover:opacity-80 transition-opacity">
          <Image
            src="/assets/logo-white-bg.svg"
            alt="HSS Logo"
            width={80}
            height={80}
          />
        </Link>
        {/* Logo for dark mode (white logo on black background) */}
        <Link href="/" className="mr-4 hidden dark:block hover:opacity-80 transition-opacity">
          <Image
            src="/assets/logo-black-bg.svg"
            alt="HSS Logo"
            width={80}
            height={80}
          />
        </Link>
        <div className="flex flex-col mt-3">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-3xl md:text-3xl font-bold tracking-tighter leading-tight">
              Hippie Screnning Studio
            </h1>
          </Link>
          <h4 className="text-left md:text-left text-base mt-1">
            bring Asian arthouse films to you in Munich
          </h4>
        </div>
      </div>
    </section>
  );
}
