"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/navigation";
import { Footer } from "@/app/_components/footer";
import { useLanguage } from "@/contexts/language-context";
import { useEffect } from "react";

export default function About() {
    const { setLanguage } = useLanguage();

    // Set language to English when component mounts
    useEffect(() => {
        setLanguage("en");
    }, [setLanguage]);

    return (
        <main style={{ marginTop: '150px' }}>
            <Container>
                <Intro />
                <section className="mb-64 pt-16">
                    <h1 className="text-lg md:text-lg font-bold tracking-tighter leading-tight mb-8 ">
                        About Us
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-base leading-relaxed mb-6 text-justify">
                        Hippie Screening Studio e.V. (HSS) is a non-profit organization dedicated to curating and 
                        screening Chinese-language and Asian films in Munich since 2022.
                        </p>

                        <p className="text-base leading-relaxed mb-6 text-justify">
                        Originally founded as a film screening subgroup of the community “706 Munich Hippies,” 
                        HSS began organizing screenings in late 2022. It has since evolved into an independent 
                        curatorial and screening organization and was officially registered as a non-profit association in Munich in January 2024.
                        </p>

                        <p className="text-base leading-relaxed mb-6 text-justify">
                        Run by a collective of young Chinese students and cinephiles, HSS focuses on arthouse films from Chinese-speaking 
                        regions and across Asia. The association's mission is to enrich Munich’s cinematic landscape with diverse 
                        Asian voices while fostering cultural exchange and dialogue. As of June 2025, HSS has hosted 33 film screenings 
                        in collaboration with arthouse cinemas  such as Neues Rottmann Kino, Werkstattkino, and Astor Kino,
                         as well as film festivals including Filmkunstwochen and the Chinese Film Festival Munich.
                          Through post-screening Q&A sessions, we actively facilitate conversations between Asian filmmakers and Munich audiences.
                        </p>

                        <p className="text-base leading-relaxed mb-6 text-justify">
                        In addition, HSS maintains an active online presence through this website,
                         a WeChat group of nearly 500 film enthusiasts, as well as Instagram and Rednote accounts. 
                         On these platforms, HSS regularly publishes film news, essays and reviews by young critics, 
                         film students, and cinephiles, aiming to strengthen knowledge exchange and community-building among Munich’s film lovers.
                        </p>
                    </div>
                </section>
            </Container>
            <Footer />
        </main>
    );
} 