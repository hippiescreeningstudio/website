import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";

export default function Team() {
    return (
        <main>
            <Container>
                <Intro />
                <section className="mb-32">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight mb-8">
                        Our Team
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-lg leading-relaxed mb-8">
                            Meet the passionate individuals behind Hippie Screening Studio who work
                            tirelessly to bring exceptional Asian cinema to Munich.
                        </p>

                        <div className="grid md:grid-cols-2 gap-8 not-prose">
                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">Founder & Curator</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    With over a decade of experience in film curation and a deep passion
                                    for Asian cinema, our founder brings unique insights to every screening.
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">Technical Director</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Ensuring every film is presented in the highest quality, our technical
                                    director manages all aspects of projection and sound.
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">Community Manager</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Building connections between filmmakers, audiences, and the local
                                    community to create meaningful dialogue around cinema.
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                                <h3 className="text-xl font-bold mb-2">Program Coordinator</h3>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    Organizing our screening schedule and special events to provide
                                    the best possible experience for our audience.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </main>
    );
} 