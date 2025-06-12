"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { useLanguage } from "@/contexts/language-context";
import { useEffect } from "react";

export default function ChineseAbout() {
    const { setLanguage } = useLanguage();

    // Set language to Chinese when component mounts
    useEffect(() => {
        setLanguage("zh");
    }, [setLanguage]);

    return (
        <main>
            <Container>
                <Intro />
                <section className="mb-32">
                    <h1 className="text-lg md:text-lg font-bold tracking-tighter leading-tight mb-8">
                        关于我们
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-base leading-relaxed mb-6">
                            嬉皮放映室协会 (Hippie Screening Studio e.V.) 是一个在慕尼黑注册的非营利组织，自2022年起独立策划华语及亚洲电影放映活动。
                            我们在慕尼黑定期举办电影放映，致力于为影迷朋友提供高质量的观影和交流体验，促进中德电影爱好者之间的文化交流。
                        </p>
                        <p className="text-base leading-relaxed mb-6">
                            欢迎加入我们。
                        </p>
                    </div>
                </section>
            </Container>
        </main>
    );
} 