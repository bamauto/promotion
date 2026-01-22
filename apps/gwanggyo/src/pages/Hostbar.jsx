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

import venueImg1 from '../assets/jeongja-hostbar-1.webp';
import venueImg2 from '../assets/ingye-hostbar-2.webp';

const venues = {
    hostbar: [
        {
            id: 'hb-1',
            name: '광교 프리미엄 호빠',
            type: 'Wild & Sexy',
            location: '광교중앙역 인근',
            price: '주대 18만원 이상, TC 10만원 이상 (코스별 상이)',
            desc: '광교중앙역 인근 여성 전용 호빠. 프라이빗하게 즐기는 라운지.',
            features: ['여성 전용', '프라이빗 라운지', '광교중앙역 접근', '안정적 분위기'],
            img: venueImg1,
            imgAlt: '광교 호빠 광교중앙역 추천',
        },
        {
            id: 'hb-2',
            name: '광교동 로맨틱 호빠',
            type: 'Flower Boys',
            location: '광교호수공원 인근',
            price: '주대 18만원 이상, TC 10만원 이상 (코스별 상이)',
            desc: '광교호수공원 중심 감각적인 호빠. 클래식한 분위기와 포토존.',
            features: ['포토존', '감각적인 무드', '광교호수공원 중심', '트렌디'],
            img: venueImg2,
            imgAlt: '광교 호빠 광교호수공원 추천',
        }
    ]
};

const Hostbar = () => {
    const faqList = [
    {
        question: "광교 호빠 1인 방문도 가능한가요?",
        answer: "네, 가능합니다. 광교 상권은 컨벤션·연구 직군 이용이 많아 클래식한 응대로 1:1 시작도 부담 없이 안내합니다."
    },
    {
        question: "광교 호빠 픽업은 어디까지 지원되나요?",
        answer: "픽업은 광교중앙역, 광교호수공원, 수원컨벤션센터, 갤러리아 광교 중심으로 운영됩니다. 정확한 동선은 예약 시 조율해 드립니다."
    },
    {
        question: "광교 호빠 주대/TC 기준이 궁금해요.",
        answer: "주대 18만원 이상, TC 10만원 이상 기준이며 시간·코스·인원에 따라 달라질 수 있습니다. 상세는 문의 부탁드립니다."
    }
];

    const sections = [
        { id: "definition", title: "1. 광교 호빠 시스템" },
        { id: "recommendation", title: "2. 추천 업소" },
        { id: "system", title: "3. 이용 시스템 및 가이드" },
        { id: "faq", title: "4. 이용 꿀팁 및 FAQ" }
    ];

    const serviceSchema = generateServiceSchema(
        "Host Bar",
        "광교 호빠 예약 안내. 광교호수공원·수원컨벤션센터 여성전용 라운지, 주대 18만원 이상/TC 10만원 이상.",
        "https://gwanggyokaraoke.com/gwanggyo-hostbar-guide",
        "180000"
    );

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>광교 호빠 예약 | 광교호수공원·수원컨벤션센터 여성전용</title>
                <meta name="description" content="광교 호빠(호스트바) 안내. 광교호수공원·수원컨벤션센터 중심 프라이빗 라운지, 여성 고객 맞춤. 주대 18만원 이상, TC 10만원 이상, 상세 문의." />
                <meta name="keywords" content="광교 호빠, 광교 호스트바, 광교 호빠 예약, 광교 가라오케" />
                <meta property="og:title" content="광교 호빠 예약 | 광교호수공원·수원컨벤션센터 여성전용" />
                <meta property="og:description" content="광교 호빠(호스트바) 안내. 광교호수공원·수원컨벤션센터 중심 프라이빗 라운지, 여성 고객 맞춤. 주대 18만원 이상, TC 10만원 이상, 상세 문의." />
                <meta property="og:image" content="https://gwanggyokaraoke.com/og-hostbar.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="광교 호빠 예약 | 광교호수공원·수원컨벤션센터 여성전용" />
                <meta property="twitter:description" content="광교 호빠(호스트바) 안내. 광교호수공원·수원컨벤션센터 중심 프라이빗 라운지, 여성 고객 맞춤. 주대 18만원 이상, TC 10만원 이상, 상세 문의." />
                <meta property="twitter:image" content="https://gwanggyokaraoke.com/og-hostbar.jpg" />
                <link rel="canonical" href="https://gwanggyokaraoke.com/gwanggyo-hostbar-guide" />
            </Helmet>
            <SchemaJsonLd data={[serviceSchema, faqSchema]} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950">
                <div className="container mx-auto px-4 pb-12 max-w-6xl">
                    <SectionTitle title="호스트바 문화 입문: 여성 라운지 선택 가이드" subtitle="이해와 선택" />

                    {/* Intro Text */}
                    <div className="mb-20 text-center max-w-4xl mx-auto">
                        <p className="text-xl text-slate-300 leading-relaxed font-light">광교 호빠(호스트바)는 광교호수공원·수원컨벤션센터 중심 여성 고객 라운지로 운영됩니다.<br />프라이빗 코스와 맞춤 대화 중심으로 안내합니다.<br />주대 18만원 이상·TC 10만원 이상 기준이며 상세 견적은 문의 부탁드립니다.</p>
                    </div>

                    <TableOfContents sections={sections} />

                    {/* 1. Definition */}
                    <ContentBlock id="definition" title="1. 광교 호빠 시스템">
                        <p>
                            광교 호스트바는 오직 여성 고객님들만을 위한 프라이빗 유흥 공간입니다.
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
                            <h2 className="text-3xl font-bold text-white">2. 광교 호빠 추천 업소</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {venues.hostbar.map(venue => <VenueCard key={venue.id} venue={venue} />)}
                        </div>
                    </div>

                    {/* 3. System Guide */}
                    <ContentBlock id="system" title="3. 이용 시스템 및 초이스 가이드">
                        <h3 className="text-xl font-bold text-white mb-4">A. 광교 호빠 초이스 시스템</h3>
                        <p className="mb-4">
                            룸에 입장하시면 담당 실장이 5~10조의 선수들을 차례로 보여드립니다.
                            마음에 드는 선수가 있다면 주저말고 <strong>"초이스"</strong> 해주세요.
                            <br />만약 마음에 드는 선수가 없다면 <strong>"패스"</strong> 하셔도 전혀 무방합니다. 고객님의 이상형을 찾을 때까지 최선을 다해 보여드립니다.
                        </p>

                        <h3 className="text-xl font-bold text-white mt-8 mb-4">B. 광교 호빠 타임 및 연장</h3>
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
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">광교에서 당신만을 위한 왕자님이 기다립니다</h2>
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
