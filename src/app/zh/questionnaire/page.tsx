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
                        欢迎参加嬉皮放映室的观影调查！我们是一家位于慕尼黑的非营利电影放映组织，致力于为本地华语观众带来优质的影片与观影体验。我们的选片主要集中在华语及亚洲地区的文艺片、纪录片和艺术片，由组织成员共同讨论决定。为了更好地了解大家的观影兴趣和喜好，我们特此发起本次调查，诚邀您分享喜欢的影片类型或主题，与我们一起探索电影的独特魅力。若您有其他建议或想法，也欢迎随时通过我们网站的意见栏反馈。感谢您的支持与参与！
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Question 1 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    1. 您通常是通过什么途径了解电影的放映信息呢(多选)
                                </label>
                                <div className="space-y-2">
                                    {[
                                        '小红书',
                                        'Instagram',
                                        '相关影讯网站',
                                        '影院海报/杂志手册',
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
                                    2. 您对华语电影的语言偏好（单选）
                                </label>
                                <div className="space-y-2">
                                    {[
                                        '普通话',
                                        '方言',
                                        '无所谓，有字幕即可',
                                    ].map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="question2"
                                                value={option}
                                                checked={formData.question2 === option}
                                                onChange={() => handleInputChange('question2', option)}
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
                                    3. 电影选择的考量因素(多选)
                                </label>
                                <div className="space-y-2">
                                    {[
                                        '导演/主创阵容',
                                        '剧情题材',
                                        '电影口碑/奖项',
                                        '类型/风格',
                                        '推荐/朋友分享',
                                        '其他'
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
                                {(formData.question3 || []).includes('其他') && (
                                    <input
                                        type="text"
                                        value={formData.question3_other || ''}
                                        onChange={(e) => handleInputChange('question3_other', e.target.value)}
                                        className="mt-2 w-full p-2 border border-white rounded bg-black text-white"
                                        placeholder="请说明其他因素..."
                                    />
                                )}
                            </div>

                            {/* Question 4 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    4. 感兴趣的电影主题/类型(多选)
                                </label>
                                <div className="space-y-2">
                                    {[
                                        '知名导演的经典佳作',
                                        '艺术气息浓厚的文艺片',
                                        '现实向纪录片',
                                        'QUEER群体',
                                        '超现实主义、奇幻类',
                                        '实验电影/先锋主义',
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
                                        placeholder="请说明其他主题/类型..."
                                    />
                                )}
                            </div>

                            {/* Question 5 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    5. 您更愿意到电影院影院观看电影的原因(多选)
                                </label>
                                <div className="space-y-2">
                                    {[
                                        '影院设备（音效画质等）',
                                        '影院氛围',
                                        '与朋友/家人的娱乐活动',
                                        '结识交流电影的同好',
                                        '支持电影创作者和电影票房'
                                    ].map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={(formData.question5 || []).includes(option)}
                                                onChange={() => handleCheckboxChange('question5', option)}
                                                className="mr-2 accent-white"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Question 6 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    6. 在电影院更倾向看（多选）
                                </label>
                                <div className="space-y-2">
                                    {[
                                        '名作的经典回放',
                                        '视角独特的小众佳片',
                                        '国内无法上映或删减过多的电影'
                                    ].map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={(formData.question6 || []).includes(option)}
                                                onChange={() => handleCheckboxChange('question6', option)}
                                                className="mr-2 accent-white"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Question 7 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    7. 您可能会对放映之外的哪些活动感兴趣呢？(多选)
                                </label>
                                <div className="space-y-2">
                                    {[
                                        '映后讨论',
                                        '导演Q&A',
                                        '电影影展',
                                        '无需要，看电影即可',
                                        '其他'
                                    ].map(option => (
                                        <label key={option} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={(formData.question7 || []).includes(option)}
                                                onChange={() => handleCheckboxChange('question7', option)}
                                                className="mr-2 accent-white"
                                            />
                                            {option}
                                        </label>
                                    ))}
                                </div>
                                {(formData.question7 || []).includes('其他') && (
                                    <input
                                        type="text"
                                        value={formData.question7_other || ''}
                                        onChange={(e) => handleInputChange('question7_other', e.target.value)}
                                        className="mt-2 w-full p-2 border border-white rounded bg-black text-white"
                                        placeholder="请说明其他活动..."
                                    />
                                )}
                            </div>

                            {/* Question 8 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    8. 印象最深刻的华语或亚洲电影
                                </label>
                                <textarea
                                    value={formData.question8 || ''}
                                    onChange={(e) => handleInputChange('question8', e.target.value)}
                                    className="w-full p-3 border border-white rounded bg-black text-white"
                                    rows={3}
                                    placeholder="请分享您印象最深刻的华语或亚洲电影..."
                                />
                            </div>

                            {/* Question 9 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    9. 喜欢的导演和电影类型
                                </label>
                                <textarea
                                    value={formData.question9 || ''}
                                    onChange={(e) => handleInputChange('question9', e.target.value)}
                                    className="w-full p-3 border border-white rounded bg-black text-white"
                                    rows={3}
                                    placeholder="请分享您喜欢的导演和电影类型..."
                                />
                            </div>

                            {/* Question 10 */}
                            <div className="mb-6">
                                <label className="block text-base font-medium mb-3">
                                    10. 希望我们将来放映哪部影片
                                </label>
                                <textarea
                                    value={formData.question10 || ''}
                                    onChange={(e) => handleInputChange('question10', e.target.value)}
                                    className="w-full p-3 border border-white rounded bg-black text-white"
                                    rows={3}
                                    placeholder="请告诉我们您希望我们将来放映的影片..."
                                />
                            </div>



                            <div className="text-right">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-white text-black py-3 px-6 rounded-full font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? '提交中...' : '提交'}
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