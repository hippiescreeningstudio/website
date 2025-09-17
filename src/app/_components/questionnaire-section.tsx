"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";

export function QuestionnaireSection() {
  const { language } = useLanguage();

  return (
    <div className="h-full">
      <div className="bg-black rounded-lg p-6 md:p-8 text-center h-full flex flex-col">
        {/* SVG Logo */}
        <div className="mb-6 flex justify-center">
          <img 
            src="/assets/survey.svg" 
            alt="Survey Icon" 
            width="160" 
            height="160"
            className="w-30 h-30 md:w-50 md:h-50"
          />
        </div>
        {/* CTA Button */}
        <div className="mt-auto">
          <Link
            href={language === "zh" ? "/zh/questionnaire" : "/questionnaire"}
            className="inline-block bg-white text-black font-medium py-3 px-6 md:px-8 rounded-full hover:bg-gray-400 transition-colors duration-300 text-base md:text-lg active:bg-black active:border-white active:text-white"
          >
            {language === "en" ? "Take Our Survey" : "参与问卷调查"}
          </Link>
        </div>
      </div>
    </div>
  );
} 