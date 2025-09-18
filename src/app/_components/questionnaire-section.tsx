"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export function QuestionnaireSection() {
  const { language } = useLanguage();

  return (
    <div className="h-full">
      <div className="bg-black rounded-lg p-6 md:p-4 text-center h-full flex flex-col">
        {/* SVG Logo */}
        <div className="mb-4 flex justify-center">
          <img 
            src="/assets/survey.svg" 
            alt="Survey Icon" 
            width="200" 
            height="200"
          />
        </div>
        {/* CTA Button */}
        <div>
          <Link
            href={language === "zh" ? "/zh/questionnaire" : "/questionnaire"}
            className="inline-block bg-white text-black font-medium py-3 px-4 md:px-5 rounded-full hover:bg-gray-400 transition-colors duration-300 text-sm md:text-base active:bg-black active:border-white active:text-white"
          >
            {language === "en" ? "Take Our Survey" : "问卷调查"}
          </Link>
        </div>
      </div>
    </div>
  );
} 