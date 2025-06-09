"use client";

import Container from "@/app/_components/container";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-neutral-800 dark:border-neutral-700">
      <Container>
        <div className="py-8 lg:py-12 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:gap-40 gap-12">
          <div className="flex flex-col items-center w-full lg:w-auto">
            <h3 className="text-lg lg:text-2xl font-normal tracking-tighter leading-tight mb-3">
              {t("footer.follow")}
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
            <h3 className="text-lg lg:text-2xl font-normal tracking-tighter leading-tight mb-3">
              {t("footer.contact")}
            </h3>
            <div className="flex items-center justify-center">
              <p className="text-sm lg:text-lg">info@hss-munich.com</p>
            </div>
          </div>
        </div>
        <div className="border-t border-neutral-200 dark:border-neutral-700 py-3 mt-2">
          <div className="text-center text-sm text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
