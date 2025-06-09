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
                                    Hippie Screening Studio e.V. works with a variety of arthouse cinemas, film organizations,
                                    and film festivals in Munich and around Germany to curate high-quality,
                                    independent, and creative films for our monthly schedule.
                                    We host film screenings and retrospectives in Munich as well as other film-related
                                    activities like film salons and cinema visits. Our goal is to provide high-quality
                                    film screenings and conversations for the Munich audience while also promoting cultural
                                    interchange between the Chinese and German cinephiles.
                                </p>
                                <p className="text-lg leading-relaxed mb-6">
                                    Our mission is to curate exceptional films that showcase the diversity,
                                    creativity, and artistic vision of Asian filmmakers. From intimate character
                                    studies to bold experimental works, we present films that challenge, inspire,
                                    and entertain.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    Join us in exploring the rich landscape of Asian cinema and discover stories
                                    that will stay with you long after the credits roll.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-lg leading-relaxed mb-6">
                                    嬉皮放映室协会与慕尼黑及德国各地的艺术电影院、电影组织和电影节合作，
                                    为我们的月度放映计划策划高质量、独立和创意电影。
                                    我们在慕尼黑举办电影放映和回顾展，以及其他与电影相关的活动，
                                    如电影沙龙和影院参观。我们的目标是为慕尼黑观众提供高质量的电影放映和对话，
                                    同时促进中德电影爱好者之间的文化交流。
                                </p>
                                <p className="text-lg leading-relaxed mb-6">
                                    我们的使命是策划展现亚洲电影制作人多样性、创造力和艺术视野的优秀电影。
                                    从私密的人物研究到大胆的实验作品，我们呈现的电影具有挑战性、启发性和娱乐性。
                                </p>
                                <p className="text-lg leading-relaxed">
                                    加入我们，探索丰富的亚洲电影景观，发现那些在片尾字幕滚动后仍会伴随您许久的故事。
                                </p>
                            </>
                        )}
                    </div>
                </section>
            </Container>
        </main>
    );
} 