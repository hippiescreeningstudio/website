"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { useLanguage } from "@/contexts/language-context";
import { useEffect } from "react";
import Image from "next/image";

export default function Team() {
    const { setLanguage } = useLanguage();

    // Set language to English when component mounts
    useEffect(() => {
        setLanguage("en");
    }, [setLanguage]);

    const teamMembers = [
        {
            name: "Yiwen Miao",
            nameZh: "Yiwen Miao",
            photo: "/assets/team/member1.jpg", // Placeholder - replace with actual photos
        },
        {
            name: "Luca",
            nameZh: "Luca",
            photo: "/assets/team/member2.jpg", // Placeholder - replace with actual photos
        },
        {
            name: "Wenlan Shen",
            nameZh: "Wenlan Shen",
            photo: "/assets/team/member3.jpg", // Placeholder - replace with actual photos
        },
        {
            name: "Jianyu Zhao",
            nameZh: "Jianyu Zhao",
            photo: "/assets/team/member4.jpg", // Placeholder - replace with actual photos
        },
        {
            name: "Tina",
            nameZh: "Tina",
            photo: "/assets/team/member4.jpg", // Placeholder - replace with actual photos
        },
        {
            name: "Zhuolun Zhou",
            nameZh: "Zhuolun Zhou",
            photo: "/assets/team/member4.jpg", // Placeholder - replace with actual photos
        },
        {
            name: "Tong Liu",
            nameZh: "Tong Liu",
            photo: "/assets/team/member4.jpg", // Placeholder - replace with actual photos
        },
        {
            name: "и",
            nameZh: "и",
            photo: "/assets/team/member4.jpg", // Placeholder - replace with actual photos
        },
        {
            name: "Ze Huang",
            nameZh: "Ze Huang",
            photo: "/assets/team/member4.jpg", // Placeholder - replace with actual photos
        },
    ];

    return (
        <main>
            <Container>
                <Intro />
                <section className="mb-32">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                        Our Team
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed mb-12">
                            Meet the passionate individuals behind Hippie Screening Studio.
                        </p>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 not-prose">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="text-center">
                                    <div className="relative w-32 h-32 mx-auto mb-4">
                                        <div className="w-full h-full rounded-full bg-white p-1">
                                            <div className="w-full h-full rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                {/* Placeholder for when actual photos are added */}
                                                <div className="text-2xl font-bold text-gray-500 dark:text-gray-400">
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                {/* Uncomment this when actual photos are available:
                                                <Image
                                                    src={member.photo}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                                */}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold mb-1">
                                        {member.name}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </Container>
        </main>
    );
} 