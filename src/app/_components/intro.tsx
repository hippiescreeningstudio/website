import Image from "next/image";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="flex items-center">
        {/* Logo for light mode (black logo on white background) */}
        <Image
          src="/assets/logo-white-bg.svg"
          alt="HSS Logo"
          width={80}
          height={80}
          className="mr-4 block dark:hidden"
        />
        {/* Logo for dark mode (white logo on black background) */}
        <Image
          src="/assets/logo-black-bg.svg"
          alt="HSS Logo"
          width={80}
          height={80}
          className="mr-4 hidden dark:block"
        />
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
          HSS.
        </h1>
      </div>
      <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
        A statically generated blog example using{" "}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-blue-600 duration-200 transition-colors"
        >
          Next.js
        </a>{" "}
        and Markdown.
      </h4>
    </section>
  );
}
