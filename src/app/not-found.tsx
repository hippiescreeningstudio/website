"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { useLanguage } from "@/contexts/language-context";

export default function NotFound() {
    const router = useRouter();
    const { language } = useLanguage();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    // Redirect to homepage when countdown reaches 0
                    router.push("/");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Cleanup timer on component unmount
        return () => clearInterval(timer);
    }, [router]);

    return (
        <main>
            <Container>
                <Intro />
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
                    <div className="mb-4">
                        <div className="flex items-center justify-center text-black dark:text-white mb-4">
                            <span className="font-bold text-3xl md:text-3xl">404</span>
                            <div className="h-10 w-px bg-black dark:bg-white mx-4"></div>
                            <span className="text-lg md:text-lg">{language === "en" ? "Page Not Found" : "页面未找到"}</span>
                        </div>
                    </div>

                    {/* Countdown and redirect message */}
                    <div className="bg-transparent">
                        <div className="flex items-center justify-center gap-2 text-black dark:text-white text-lg md:text-lg">
                            <span>
                                {language === "en"
                                    ? "Redirecting to homepage in"
                                    : "将在以下时间后跳转到首页"
                                }
                            </span>
                            <span>{countdown}</span>
                            <span>{language === "en" ? "seconds" : "秒"}</span>
                        </div>
                    </div>


                </div>
            </Container>
        </main >
    );
} 