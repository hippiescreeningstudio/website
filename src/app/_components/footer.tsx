import Container from "@/app/_components/container";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-black">
      <Container>
        <div className="py-16 lg:py-28 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:gap-20 gap-12">
          <div className="flex flex-col items-center w-full lg:w-auto">
            <h3 className="text-2xl font-normal tracking-tighter leading-tight mb-6">
              Follow us on
            </h3>
            <div className="flex flex-row gap-6 items-center justify-center">
              <a
                href="https://www.instagram.com/hippie_screening_studio"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-75 transition-opacity"
              >
                <Image
                  src="/favicon/Instagram_logo_2016.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://www.xiaohongshu.com/user/profile/610628aa0000000001014017"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-75 transition-opacity"
              >
                <Image
                  src="/favicon/XiaohongshuLOGO.svg"
                  alt="Xiaohongshu"
                  width={24}
                  height={24}
                />
              </a>
              <a
                href="https://hippiescreeningstudio.substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-75 transition-opacity"
              >
                <Image
                  src="/favicon/substack-icon.svg"
                  alt="Substack"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center w-full lg:w-auto">
            <h3 className="text-2xl font-normal tracking-tighter leading-tight mb-6">
              Contact
            </h3>
            <div className="flex items-center justify-center">
              <p className="text-lg">info@hss-munich.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-800 py-6 mt-8 lg:mt-16">
          <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} Hippie Screening Studio. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
