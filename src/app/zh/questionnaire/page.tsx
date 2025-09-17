"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/navigation";
import { Footer } from "@/app/_components/footer";
import { useLanguage } from "@/contexts/language-context";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ChineseQuestionnaire() {
    const { setLanguage } = useLanguage();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [countdown, setCountdown] = useState(3);

    // Set language to Chinese when component mounts
    useEffect(() => {
        setLanguage("zh");
    }, [setLanguage]);

    // Redirect to main page after countdown when submitted
    useEffect(() => {
        if (isSubmitted) {
            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        router.push('/zh');
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
                    language: 'Chinese'
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                throw new Error('Failed to submit form');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('提交表单时出错，请重试。');
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
                                谢谢您！
                            </h1>
                            <p className="text-lg leading-relaxed mb-6">
                                您的回复已成功提交。感谢您的反馈！
                            </p>
                            <div className="flex items-center justify-center gap-2 text-gray-400 text-lg">
                                <span>将在</span>
                                <span>{countdown}</span>
                                <span>秒后跳转到主页</span>
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
                        放映调查
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-base leading-relaxed mb-8">
                            请通过分享您的偏好和反馈来帮助我们改善电影放映体验。
                            <br />
                            Use the navigation bar at the top right to switch to English survey.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Question 1 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    1. 您怎么了解到我们的?
                                </label>
                                <div className="space-y-2">
                                    {[
                                        '慕尼黑影迷群',
                                        '小红书',
                                        'Instagram',
                                        '朋友推荐',
                                        '线下海报/传单',
                                        '影院官网',
                                        '慕尼黑本地活动网站',
                                        '其他'
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
                                {(formData.question1 || []).includes('其他') && (
                                    <input
                                        type="text"
                                        value={formData.question1_other || ''}
                                        onChange={(e) => handleInputChange('question1_other', e.target.value)}
                                        className="mt-2 w-full p-2 border border-white rounded bg-black text-white"
                                        placeholder="请说明其他途径..."
                                    />
                                )}
                            </div>

                            {/* Question 2 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    2. 对于我们每月在小红书发布的「慕尼黑月度影讯」和「影展推荐」，您是否感兴趣？
                                </label>
                                <div className="space-y-2">
                                    {[
                                        '看过，感兴趣',
                                        '看过，但不感兴趣',
                                        '没看过，感兴趣',
                                        '没看过，不感兴趣'
                                    ].map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={(formData.question2 || []).includes(option)}
                                                onChange={() => handleCheckboxChange('question2', option)}
                                                className="mr-2 accent-white"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Question 3 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    3. 您希望我们未来放映什么样的电影？（题材/国家/导演/主题等）或哪部电影？
                                </label>
                                <textarea
                                    value={formData.question3 || ''}
                                    onChange={(e) => handleInputChange('question3', e.target.value)}
                                    className="w-full p-3 border border-white rounded bg-black text-white"
                                    rows={3}
                                    placeholder="建议您希望在我们未来放映中看到的电影..."
                                />
                            </div>

                            {/* Question 4 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    4. 电影放映之外，期待我们组织什么活动？
                                </label>
                                <div className="space-y-2">
                                    {[
                                        '映后讨论',
                                        '导演Q&A',
                                        '系列回顾展',
                                        '无需要，看电影即可',
                                        '其他'
                                    ].map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={(formData.question4 || []).includes(option)}
                                                onChange={() => handleCheckboxChange('question4', option)}
                                                className="mr-2 accent-white"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                                {(formData.question4 || []).includes('其他') && (
                                    <input
                                        type="text"
                                        value={formData.question4_other || ''}
                                        onChange={(e) => handleInputChange('question4_other', e.target.value)}
                                        className="mt-2 w-full p-2 border border-white rounded bg-black text-white"
                                        placeholder="请说明其他活动..."
                                    />
                                )}
                            </div>

                            {/* Question 5 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    5. 对过往电影放映的建议和意见
                                </label>
                                <textarea
                                    value={formData.question5 || ''}
                                    onChange={(e) => handleInputChange('question5', e.target.value)}
                                    className="w-full p-3 border border-white rounded bg-black text-white"
                                    rows={3}
                                    placeholder="告诉我们您对过往电影放映的建议..."
                                />
                            </div>


                            {/* Question 6 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    6. 请留下您的姓名或联系方式（非必填）
                                </label>
                                <textarea
                                    value={formData.question6 || ''}
                                    onChange={(e) => handleInputChange('question6', e.target.value)}
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
                                    {isSubmitting ? '提交中...' : '提交问卷'}
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