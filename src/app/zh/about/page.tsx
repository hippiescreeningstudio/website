"use client";

import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/navigation";
import { Footer } from "@/app/_components/footer";
import { useLanguage } from "@/contexts/language-context";
import { useEffect } from "react";

export default function ChineseAbout() {
    const { setLanguage } = useLanguage();

    // Set language to Chinese when component mounts
    useEffect(() => {
        setLanguage("zh");
    }, [setLanguage]);

    return (
        <main style={{ marginTop: '150px' }}>
            <Container>
                <Intro />
                <section className="mb-64 ml-3">
                    <h1 className="text-lg md:text-lg font-bold tracking-tighter leading-tight mb-8">
                        关于我们
                    </h1>
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-base leading-relaxed mb-6">
                        嬉皮放映室（Hippie Screening Studio e.V.，简称 HSS） 是一个自 2022 年起在慕尼黑独立策划和放映华语及亚洲电影的非营利组织。
                        </p>
                        <p className="text-base leading-relaxed mb-6">
                        HSS最初作为“706慕尼黑嬉皮”社区的一个子单位，于2022年底在慕尼黑启动电影放映活动。
                        此后，HSS发展成为一个独立的电影策展与放映组织，并于2024年1月正式在慕尼黑注册为非营利协会。
                        </p>
                        <p className="text-base leading-relaxed mb-6">
                        HSS由一群在慕尼黑的中国青年学生与影迷运营，主要聚焦于华语及亚洲地区的艺术电影。协会的宗旨是为慕尼黑观众带来更多元的观影选择，
                        并促进不同国家与地区之间的文化交流。截至2025年6月，HSS已与多家艺术影院（如 Neues Rottmann Kino、Werkstattkino 和 Astor Kino）
                        和电影节（如 Filmkunstwochen 与慕尼黑华语电影节）合作，成功举办了33场电影放映活动。同时，协会也通过映后问答环节，推动亚洲电影创作者与在德影迷间的互动与联结。
                        </p>
                        <p className="text-base leading-relaxed mb-6">
                        此外，HSS还运营多个线上平台，包括本网站，一个拥有近500名影迷的活跃微信群、
                        以及 Instagram 和小红书账号。HSS定期在这些平台上发布由青年影评人、电影专业学生和影迷撰写的影讯与影评，
                        旨在加强慕尼黑地区本地影迷之间的知识分享与社群建设。
                        </p>
                    </div>
                </section>
            </Container>
            <Footer />
        </main>
    );
} 