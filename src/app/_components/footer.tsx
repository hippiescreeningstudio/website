"use client";

import Container from "@/app/_components/container";
import Image from "next/image";
import { useLanguage } from "@/contexts/language-context";
import { usePost } from "@/contexts/post-context";
import { generateColorPalette } from "@/lib/color-utils";

export function Footer() {
  const { t } = useLanguage();
  const { backgroundColor } = usePost();

  // Generate color palette based on post background color
  const colorPalette = backgroundColor ? generateColorPalette(backgroundColor) : null;
  const footerBgColor = colorPalette ? colorPalette.footer : '#181818';

  return (
    <footer
      className="border-t border-transparent"
      style={{ backgroundColor: footerBgColor }}
    >
      <Container>
        <div className="py-8 lg:py-12 flex flex-col lg:flex-row items-center lg:items-start justify-center lg:gap-40 gap-12">
          <div className="flex flex-col items-center w-full lg:w-auto">
            <h3 className="text-base lg:text-xl font-normal tracking-tighter leading-tight mb-3 text-white">
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
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-75 transition-opacity"
              >
                <Image
                  src="/favicon/rss_logo.svg"
                  alt="RSS Feed"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center w-full lg:w-auto">
            <h3 className="text-base lg:text-xl font-normal tracking-tighter leading-tight mb-3 text-white">
              {t("footer.contact")}
            </h3>
            <div className="flex items-center justify-center">
              <p className="text-xs lg:text-base text-white">info@hss-munich.com</p>
            </div>
          </div>
        </div>
        <div className="py-3 mt-2">
          <div className="text-center text-xs text-neutral-400">
            © {new Date().getFullYear()} {t("footer.copyright")}
          </div>
        </div>
      </Container>
    </footer>
  );
}