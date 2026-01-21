import React from 'react';
import { Helmet } from 'react-helmet-async';
import SchemaJsonLd, { generateServiceSchema, generateFAQSchema } from '../components/SchemaJsonLd';
import RelatedServices from '../components/RelatedServices';
import TableOfContents from '../components/TableOfContents';
import { Star, Clock, GlassWater, Users, Sparkles, CheckCircle, Phone, MapPin, DollarSign, HelpCircle, Heart, Gift } from 'lucide-react';

const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl"></div>
        <span className="text-amber-400 font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-3 animate-fade-in-up block">{subtitle}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-300 relative z-10 animate-fade-in-up delay-100 drop-shadow-sm">{title}</h1>
        <div className="w-1 h-12 bg-gradient-to-b from-rose-500 to-transparent mx-auto mt-6"></div>
    </div>
);

const ContentBlock = ({ title, children, id }) => (
    <div id={id} className="mb-12 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 backdrop-blur-sm hover:border-rose-500/20 transition-colors">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-rose-500 rounded-full"></div>
            {title}
        </h2>
        <div className="text-slate-300 leading-relaxed text-lg font-light space-y-4">
            {children}
        </div>
    </div>
);

const VenueCard = ({ venue }) => (
    <article className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden hover:border-rose-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] hover:-translate-y-2 flex flex-col h-full">
        <div className="h-64 bg-slate-900 relative overflow-hidden flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
            <img
                src={venue.img}
                alt={venue.imgAlt}
                loading="lazy"
                width="400"
                height="256"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out"
            />
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-rose-600 to-rose-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase shadow-lg tracking-wider">
                {venue.type}
            </div>
        </div>

        <div className="p-8 relative flex flex-col flex-grow">
            <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-rose-400 transition-colors">{venue.name}</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed bg-slate-950/50 p-4 rounded-lg border border-slate-800">{venue.desc}</p>

            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <MapPin className="text-rose-500 w-4 h-4" /> {venue.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <DollarSign className="text-rose-500 w-4 h-4" /> {venue.price}
                </div>
            </div>

            <div className="mb-6 space-y-2 flex-grow">
                <div className="flex flex-wrap gap-2">
                    {venue.features.map((feat, idx) => (
                        <span key={idx} className="text-xs font-medium bg-slate-800/50 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <CheckCircle size={10} className="text-rose-500" /> {feat}
                        </span>
                    ))}
                </div>
            </div>

            <button
                onClick={() => window.location.href = 'tel:01026264833'}
                className="w-full bg-slate-800 hover:bg-rose-600 text-white hover:text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
                <Phone size={18} className="group-hover/btn:animate-bounce" />
                <span className="tracking-widest text-sm">선수 프로필 문의</span>
            </button>
        </div>
    </article>
);

import venueImg1 from '../assets/yeongtong-hostbar-1.webp';
import venueImg2 from '../assets/ingye-hostbar-2.webp';

const venues = {
    hostbar: [
        {
            id: 'hb-1',
            name: '영통 프리미엄 호빠',
            type: 'Wild & Sexy',
            location: '영통 수원역 AK플라자 6번 게이트',
            price: '여성전용 특가',
            desc: '야성을 깨우는 짐승남들의 핫한 퍼포먼스. 수원역 메인 상권에 위치하여 접근성이 좋으며, 파워풀하고 에너지 넘치는 선수들이 스트레스를 확실하게 풀어드립니다.',
            features: ['근육질 선수', '퍼포먼스 쇼', '생일 샴페인', '픽업 서비스'],
            img: venueImg1,
            imgAlt: '영통 프리미엄 호빠 인테리어'
        },
        {
            id: 'hb-2',
            name: '영통동 로맨틱 호빠',
            type: 'Flower Boys',
            location: '영통 영통동 엠코헤리츠',
            price: '풀코스 180,000원 ~',
            desc: '순정만화에서 튀어나온 듯한 꽃미남 선수들의 달콤한 속삭임. 로맨틱한 분위기에서 공주님이 된 듯한 기분을 만끽하세요. 섬세하고 자상한 매너가 특징입니다.',
            features: ['아이돌급 외모', '로맨틱 이벤트', '대화형 선수', '프러포즈룸'],
            img: venueImg2,
            imgAlt: '영통동 로맨틱 호빠 인테리어'
        }
    ]
};

const Hostbar = () => {
    const faqList = [
        {
            question: "2차(애프터)에 대해 알고 싶습니다",
            answer: "2차는 선수 개인의 의사에 따라 결정됩니다. 업소에서 공식적으로 강요하거나 관여하지 않습니다. 상호 합의가 중요하며, 무리한 요구는 삼가시는 것이 좋습니다."
        },
        {
            question: "1인 방문해도 괜찮을까요?",
            answer: "전혀 문제없습니다. 오히려 혼자 방문하여 편안하게 대화를 나누고 힐링하는 고객이 많습니다. 부담 갖지 않으셔도 됩니다."
        },
        {
            question: "호스트의 스타일은 다양한가요?",
            answer: "네, 다양한 스타일의 호스트가 있습니다. 예약 시 선호하는 스타일(외모, 대화 스타일, 분위기 등)을 미리 말씀해 주시면 맞춤 추천을 받으실 수 있습니다."
        }
    ];

    const sections = [
        { id: "definition", title: "1. 영통 호빠 시스템" },
        { id: "recommendation", title: "2. 추천 업소" },
        { id: "system", title: "3. 이용 시스템 및 가이드" },
        { id: "faq", title: "4. 이용 꿀팁 및 FAQ" }
    ];

    const serviceSchema = generateServiceSchema(
        "Host Bar",
        "영통 호스트바 추천 및 가격. 여성 전용 프라이빗 룸 및 픽업 서비스.",
        "https://yeongtongkaraoke.com/yeongtong-hostbar-guide",
        "150000"
    );

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>영통 호빠·호스트바 | 여성전용 프리미엄 라운지</title>
                <meta name="description" content="영통역·영통동 여성 고객을 위한 프리미엄 라운지 문화 이해 | 서비스 형식·분위기·비용·장점 완벽 정복 | 호스트바 이용 에티켓과 팁 | 안전하고 즐거운 경험을 위한 체크리스트" />
                <meta name="keywords" content="영통역 호스트바, 영통역 호빠, 영통 호스트바 가이드, 여성 라운지 문화, 호스트바 이해, 라운지 경험, 여성 친화 클럽, 호스트바 매너, 안전한 라운지, 라운지 에티켓, 비용 기준, 선택 가이드" />
                <meta property="og:title" content="영통 호스트바 | 영통역 여성 맞춤형 라운지 완벽 가이드" />
                <meta property="og:description" content="호스트바 문화 이해 | 안전한 이용 가이드 | 에티켓과 팁" />
                <meta property="og:image" content="https://yeongtongkaraoke.com/og-hostbar.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="영통 호스트바 문화 가이드" />
                <meta property="twitter:description" content="여성 라운지 선택 | 안전 이용 | 에티켓 안내" />
                <meta property="twitter:image" content="https://yeongtongkaraoke.com/og-hostbar.jpg" />
                <link rel="canonical" href="https://yeongtongkaraoke.com/yeongtong-hostbar-guide" />
            </Helmet>
            <SchemaJsonLd data={[serviceSchema, faqSchema]} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950">
                <div className="container mx-auto px-4 pb-12 max-w-6xl">
                    <SectionTitle title="호스트바 문화 입문: 여성 라운지 선택 가이드" subtitle="이해와 선택" />

                    {/* Intro Text */}
                    <div className="mb-20 text-center max-w-4xl mx-auto">
                        <p className="text-xl text-slate-300 leading-relaxed font-light">
                            호스트바 문화가 처음이신가요? <strong className="text-rose-400">안전하고 즐거운 경험</strong>을 위해<br />
                            서비스 형식, 분위기, 비용, 에티켓까지<br />
                            <strong className="text-white">꼭 알아야 할 정보</strong>를 정리해 드립니다.
                        </p>
                    </div>

                    <TableOfContents sections={sections} />

                    {/* 1. Definition */}
                    <ContentBlock id="definition" title="1. 영통 호빠 시스템">
                        <p>
                            영통 호스트바는 오직 여성 고객님들만을 위한 프라이빗 유흥 공간입니다.
                            서울 강남의 '정빠', '퍼블릭' 퀄리티를 유지하면서도 주대는 훨씬 합리적인 것이 장점입니다.
                        </p>
                        <p>
                            다양한 스타일의 선수(모델, 아이돌, 짐승남, 연하남 등)들이 항시 대기 중이며,
                            고객님의 취향에 맞는 파트너를 찾을 때까지 <strong>무한 초이스</strong>가 가능합니다.
                            단순한 술자리를 넘어 친구, 연인 같은 감성적인 교감을 중요하게 생각합니다.
                        </p>
                    </ContentBlock>

                    {/* 2. Venue Recommendation */}
                    <div id="recommendation" className="mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-8 bg-rose-500 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white">2. 영통 호빠 추천 업소</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {venues.hostbar.map(venue => <VenueCard key={venue.id} venue={venue} />)}
                        </div>
                    </div>

                    {/* 3. System Guide */}
                    <ContentBlock id="system" title="3. 이용 시스템 및 초이스 가이드">
                        <h4 className="text-xl font-bold text-white mb-4">A. 초이스 (Choice)</h4>
                        <p className="mb-4">
                            룸에 입장하시면 담당 실장이 5~10조의 선수들을 차례로 보여드립니다.
                            마음에 드는 선수가 있다면 주저말고 <strong>"초이스"</strong> 해주세요.
                            <br />만약 마음에 드는 선수가 없다면 <strong>"패스"</strong> 하셔도 전혀 무방합니다. 고객님의 이상형을 찾을 때까지 최선을 다해 보여드립니다.
                        </p>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">B. 타임(Time) & 연장</h4>
                        <ul className="list-disc pl-5 space-y-2 marker:text-rose-500">
                            <li>기본 타임은 <strong>1시간 ~ 1시간 30분</strong> 기준입니다. (업소별 상이)</li>
                            <li>타임 종료 10분 전, 연장 여부를 여쭤봅니다. 즐거우셨다면 연장하여 계속 즐기시면 됩니다.</li>
                            <li><strong>풀티(Full-T)</strong>: 오늘 하루 이 선수를 지정하여 마감 때까지 함께 노는 시스템입니다. (별도 문의)</li>
                        </ul>
                    </ContentBlock>

                    {/* 4. FAQ */}
                    <div id="faq" className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Gift className="text-rose-500" /> 특별한 날을 위한 팁
                            </h3>
                            <ul className="space-y-4 text-slate-300 font-light">
                                <li className="flex gap-3">
                                    <CheckCircle className="text-rose-500 w-5 h-5 flex-shrink-0" />
                                    <span><strong>생일 파티</strong>: 미리 예약하시면 룸 데코레이션 및 축하 공연 이벤트를 준비해 드립니다. 인생샷을 남겨보세요.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-rose-500 w-5 h-5 flex-shrink-0" />
                                    <span><strong>스트레스 해소</strong>: 조용히 대화만 나누고 싶은 날, 미친듯이 춤추고 놀고 싶은 날. 예약 시 '오늘의 기분'을 말씀해 주시면 딱 맞는 선수를 추천해 드립니다.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-rose-900/10 p-8 rounded-2xl border border-rose-500/20">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <HelpCircle className="text-rose-500" /> 자주 묻는 질문 (FAQ)
                            </h3>
                            <div className="space-y-6">
                                {faqList.map((faq, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-rose-400 mb-1">Q. {faq.question}</p>
                                        <p className="text-slate-300 text-sm">A. {faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-rose-800 to-pink-900 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30"></div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">당신만을 위한 왕자님이 기다립니다</h2>
                        <p className="text-rose-100 mb-8 max-w-2xl mx-auto relative z-10">
                            망설이지 말고 연락주세요. <br />
                            철저한 비밀 보장과 완벽한 서비스로 모시겠습니다.
                        </p>
                        <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-white text-rose-900 font-bold py-4 px-12 rounded-full shadow-lg hover:scale-105 transition-transform relative z-10 flex items-center gap-2 mx-auto">
                            <Phone fill="currentColor" size={20} /> 010-2626-4833 비밀 예약
                        </button>
                    </div>

                    <RelatedServices />

                </div>
            </div>
        </>
    );
};

export default Hostbar;
