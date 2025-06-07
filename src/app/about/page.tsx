import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";

export default function About() {
    return (
        <main>
            <Container>
                <Intro />
                <section className="mb-32">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                        About Us
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed mb-6">
                            Hippie Screening Studio e.V. works with a variety of arthouse cinemas, film organizations,
                            and film festivals in Munich and around Germany to curate high-quality,
                            independent, and creative films for our monthly schedule.
                            We host film screenings and retrospectives in Munich as well as other film-related
                            activities like film salons and cinema visits. Our goal is to provide high-quality
                            film screenings and conversations for the Munich audience while also promoting cultural \
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
                    </div>
                </section>
            </Container>
        </main>
    );
} 