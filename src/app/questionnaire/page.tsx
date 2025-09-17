"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/navigation";
import { Footer } from "@/app/_components/footer";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Questionnaire() {
    const { setLanguage } = useLanguage();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [countdown, setCountdown] = useState(3);

    // Set language to English when component mounts
    useEffect(() => {
        setLanguage("en");
    }, [setLanguage]);

    // Redirect to main page after countdown when submitted
    useEffect(() => {
        if (isSubmitted) {
            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        router.push('/');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isSubmitted, router]);

    const handleCheckboxChange = (questionKey: string, value: string) => {
        setFormData(prev => {
            const currentValues = prev[questionKey] || [];
            return {
                ...prev,
                [questionKey]: currentValues.includes(value)
                    ? currentValues.filter((item: string) => item !== value)
                    : [...currentValues, value]
            };
        });
    };

    const handleInputChange = (questionKey: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [questionKey]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('https://formspree.io/f/xyzdqlrr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    language: 'English'
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <main style={{ marginTop: '150px' }}>
                <Container>
                    <Intro />
                    <section className="mb-64 pt-16">
                        <div className="text-center">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter leading-tight mb-8">
                                Thank You!
                            </h1>
                            <p className="text-lg leading-relaxed mb-6">
                                Your response has been submitted successfully. Thank you for your feedback!
                            </p>
                            <div className="flex items-center justify-center gap-2 text-gray-400 text-lg">
                                <span>Redirecting to main page in</span>
                                <span>{countdown}</span>
                                <span>seconds</span>
                            </div>
                        </div>
                    </section>
                </Container>
                <Footer />
            </main>
        );
    }

    return (
        <main style={{ marginTop: '150px' }}>
            <Container>
                <Intro />
                <section className="mb-64 pt-16">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tighter leading-tight mb-8">
                        Film Screening Survey
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-base leading-relaxed mb-8">
                            Help us improve our film screening experience by sharing your preferences and feedback.
                            <br />
                            右上角可以切换到中文问卷。
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Question 1 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    1. How did you learn about us?
                                </label>
                                <div className="space-y-2">
                                    {[
                                        'Xiaohongshu (Red Note)',
                                        'Instagram',
                                        'Friends',
                                        'Posters/flyers',
                                        'Cinema website',
                                        'Local event websites',
                                        'Other'
                                    ].map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={(formData.question1 || []).includes(option)}
                                                onChange={() => handleCheckboxChange('question1', option)}
                                                className="mr-2 accent-white"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                                {(formData.question1 || []).includes('Other') && (
                                    <input
                                        type="text"
                                        value={formData.question1_other || ''}
                                        onChange={(e) => handleInputChange('question1_other', e.target.value)}
                                        className="mt-2 w-full p-2 border border-white rounded bg-black text-white"
                                        placeholder="Please specify other sources..."
                                    />
                                )}
                            </div>

                            
                            {/* Question 2 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    2. What kind of films would you like us to screen in the future? (genre/country/director/theme, etc.) Or which specific film?
                                </label>
                                <textarea
                                    value={formData.question9 || ''}
                                    onChange={(e) => handleInputChange('question9', e.target.value)}
                                    className="w-full p-3 border border-white rounded bg-black text-white"
                                    rows={3}
                                    placeholder="Suggest films you'd like to see in our future screenings..."
                                />
                            </div>

                            {/* Question 3 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    3. Beyond film screenings, what activities would you like us to organize?
                                </label>
                                <div className="space-y-2">
                                    {[
                                        'Post-screening discussions',
                                        'Director Q&A',
                                        'Retrospective series',
                                        'Just watching films is fine',
                                        'Other'
                                    ].map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={(formData.question3 || []).includes(option)}
                                                onChange={() => handleCheckboxChange('question3', option)}
                                                className="mr-2 accent-white"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                                {(formData.question3 || []).includes('Other') && (
                                    <input
                                        type="text"
                                        value={formData.question3_other || ''}
                                        onChange={(e) => handleInputChange('question3_other', e.target.value)}
                                        className="mt-2 w-full p-2 border border-white rounded bg-black text-white"
                                        placeholder="Please specify other activities..."
                                    />
                                )}
                            </div>

                            {/* Question 4 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    4. Suggestions and feedback on our past film screenings
                                </label>
                                <textarea
                                    value={formData.question4 || ''}
                                    onChange={(e) => handleInputChange('question4', e.target.value)}
                                    className="w-full p-3 border border-white rounded bg-black text-white"
                                    rows={3}
                                    placeholder="Tell us your suggestions about our past film screenings..."
                                />
                            </div>
                                {/* Question 5 */}
                                <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    5. Please leave your name and contact (Optional)
                                </label>
                                <textarea
                                    value={formData.question5 || ''}
                                    onChange={(e) => handleInputChange('question5', e.target.value)}
                                    className="w-full p-3 border border-white rounded bg-black text-white"
                                    rows={3}
                                />
                            </div>
                            <div className="text-right">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-white text-black py-3 px-6 rounded-full font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </Container>
            <Footer />
        </main>
    );
} 