"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { useLanguage } from "@/contexts/language-context";

export default function About() {
    const { language } = useLanguage();

    return (
        <main>
            <Container>
                <Intro />
                <section className="mb-32">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                        {language === "en" ? "About Us" : "关于我们"}
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {language === "en" ? (
                            <>
                                <p className="text-lg leading-relaxed mb-6">
                                    Hippie Screening Studio e.V. is a registered non-profit organization that works with a variety of arthouse cinemas, film organizations,
                                    and film festivals in Munich and around Germany to curate high-quality, independent, and creative Asian films for our monthly schedule.
                                    We host film screenings and retrospectives in Munich as well as other film-related  activities like film salons and cinema visits. Our goal is to provide high-quality
                                    film screenings and conversations for the Munich audience while also promoting cultural
                                    interchange between the Chinese and German cinephiles.
                                </p>

                                <p className="text-lg leading-relaxed mb-6">
                                    Join us in exploring the rich landscape of Asian cinema and discover stories
                                    that will stay with you long after the credits roll.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-lg leading-relaxed mb-6">
                                    嬉皮放映室协会 (Hippie Screening Studio e.V.) 是一个在慕尼黑注册的非营利组织，在慕尼黑定期举办亚洲电影放映、“焦点影人”回顾展等各类电影相关的交流活动，致力
                                    于为影迷朋友提供高质量的观影和交流体验，促进中德电影爱好者之间的文化交流。

                                </p>
                                <p className="text-lg leading-relaxed mb-6">
                                    加入我们，发现那些在片尾字幕滚动后仍会伴随您许久的故事。
                                </p>
                            </>
                        )}
                    </div>
                </section>
            </Container>
        </main>
    );
} 