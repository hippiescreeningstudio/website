"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { useLanguage } from "@/contexts/language-context";

export default function Team() {
    const { language } = useLanguage();

    return (
        <main>
            <Container>
                <Intro />
                <section className="mb-32">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                        {language === "en" ? "Our Team" : "我们的团队"}
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed mb-8">
                            {language === "en"
                                ? "Meet the passionate individuals behind Hippie Screening Studio who work tirelessly to bring exceptional Asian cinema to Munich."
                                : "认识嬉皮放映室背后的热情个人，他们不懈努力为慕尼黑带来卓越的亚洲电影。"
                            }
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 not-prose">
                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">
                                    {language === "en" ? "Founder & Curator" : "创始人兼策展人"}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {language === "en"
                                        ? "With over a decade of experience in film curation and a deep passion for Asian cinema, our founder brings unique insights to every screening."
                                        : "拥有十多年电影策展经验和对亚洲电影的深度热爱，我们的创始人为每次放映带来独特的见解。"
                                    }
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">
                                    {language === "en" ? "Technical Director" : "技术总监"}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {language === "en"
                                        ? "Ensuring every film is presented in the highest quality, our technical director manages all aspects of projection and sound."
                                        : "确保每部电影都以最高质量呈现，我们的技术总监管理投影和音响的各个方面。"
                                    }
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">
                                    {language === "en" ? "Community Manager" : "社区经理"}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {language === "en"
                                        ? "Building connections between filmmakers, audiences, and the local community to create meaningful dialogue around cinema."
                                        : "在电影制作人、观众和当地社区之间建立联系，围绕电影创造有意义的对话。"
                                    }
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">
                                    {language === "en" ? "Program Coordinator" : "项目协调员"}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {language === "en"
                                        ? "Organizing our screening schedule and special events to provide the best possible experience for our audience."
                                        : "组织我们的放映计划和特别活动，为观众提供最佳体验。"
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </main>
    );
} 