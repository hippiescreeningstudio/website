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
                        <div className="flex items-center justify-center text-white mb-4">
                            <span className="font-bold text-3xl md:text-3xl">404</span>
                            <div className="h-10 w-px bg-white mx-4"></div>
                            <span className="text-lg md:text-lg">{"Page Not Found"}</span>
                        </div>
                    </div>

                    {/* Countdown and redirect message */}
                    <div className="bg-transparent">
                        <div className="flex items-center justify-center gap-2 text-white text-lg md:text-lg">
                            <span>
                                {"Redirecting to homepage in"}
                            </span>
                            <span>{countdown}</span>
                            <span>{"seconds"}</span>
                        </div>
                    </div>


                </div>
            </Container>
        </main >
    );
} 