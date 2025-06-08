import Container from "@/app/_components/container";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-black">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center justify-center lg:gap-20">
          <div className="flex flex-col items-center mb-10 lg:mb-0">
            <h3 className="text-2xl font-normal tracking-tighter leading-tight mb-6">
              Follow us on
            </h3>
            <div className="flex flex-col lg:flex-row gap-6 mb-6 items-center lg:items-start">
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
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-normal tracking-tighter leading-tight mb-4">
              Contact
            </h3>
            <a
              href="mailto:contact@example.com"
              className="text-lg hover:underline"
            >
              contact@example.com
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
