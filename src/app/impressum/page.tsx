"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/navigation";
import { Footer } from "@/app/_components/footer";

export default function Impressum() {
    return (
        <main style={{ marginTop: '150px' }}>
            <Container>
                <Intro />
                <section className="mb-64 pt-16">
                    <h1 className="text-lg md:text-lg font-bold tracking-tighter leading-tight mb-8 ">
                        Impressum
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-base leading-relaxed mb-6">
                            <strong>Hippie Screening Studio e.V.</strong>
                        </p>

                        <p className="text-base leading-relaxed mb-6">
                            Postanschrift: Postfach 950322, 81519 München<br />
                            Email: info@hss-munich.com
                        </p>

                        <p className="text-base leading-relaxed mb-6">
                            Vertretungsberechtigter Vorstand: Yiwen Miao
                        </p>

                        <p className="text-base leading-relaxed mb-6">
                            Eingetragen am Amtsgericht München VR 210451
                        </p>
                    </div>
                </section>
            </Container>
            <Footer />
        </main>
    );
} 