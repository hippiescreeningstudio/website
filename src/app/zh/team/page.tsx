"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/navigation";
import { useLanguage } from "@/contexts/language-context";
import { useEffect } from "react";
import { Footer } from "@/app/_components/footer";
import Image from "next/image";
import { teamMembers } from "@/lib/team";

export default function ChineseTeam() {
    const { setLanguage } = useLanguage();

    // Set language to Chinese when component mounts
    useEffect(() => {
        setLanguage("zh");
    }, [setLanguage]);

    return (
        <main style={{ marginTop: '80px' }}>
            <Container>
                <Intro />
                <section className="mb-32 pt-16 ">
                    <h1 className="text-lg md:text-lg font-bold tracking-tighter leading-tight mb-8">
                        我们的团队
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-base leading-relaxed mb-12">
                            认识放映室背后的每个成员。
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 not-prose">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="text-center">
                                    <div className="relative w-48 h-48 md:w-44 md:h-44 mx-auto mb-4">
                                        <div className="w-full h-full rounded-full p-1">
                                            <div className="w-full h-full rounded-full overflow-hidden ">
                                                <Image
                                                    src={member.photo}
                                                    alt={member.nameZh}
                                                    fill
                                                    className="object-cover rounded-full"
                                                    style={{ objectPosition: 'center' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold mb-1">
                                        {member.nameZh}
                                    </h3>
                                    <p className="text-base text-gray-400 italic">
                                        {member.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </Container>
            <Footer />
        </main>
    );
} 