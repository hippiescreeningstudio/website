"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
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
        <main>
            <Container>
                <Intro />
                <section className="mb-64 pt-16">
                    <h1 className="text-lg md:text-lg font-bold tracking-tighter leading-tight mb-8">
                        About Us
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-base leading-relaxed mb-6">
                            Founded in 2022, Hippie Screening Studio e.V. is a registered non-profit organization dedicated
                            to screening independent Singophone and Asian films in Munich. We partner with arthouse cinemas,
                            film organizations, and festivals in Munich and throughout Germany to curate a monthly selection
                            of high-quality, creative, and thought-provoking films from the Sinophone and broader Asian world.
                        </p>

                        <p className="text-base leading-relaxed mb-6">
                            Join us in exploring the vibrant world of Asian cinema—
                            and discover stories that resonate long after the credits roll.
                        </p>
                    </div>
                </section>
            </Container>
            <Footer />
        </main>
    );
} 