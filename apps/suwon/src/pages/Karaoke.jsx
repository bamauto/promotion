import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SchemaJsonLd, { generateServiceSchema, generateFAQSchema } from '../components/SchemaJsonLd';
import RelatedServices from '../components/RelatedServices';
import TableOfContents from '../components/TableOfContents';
import { Music, Clock, GlassWater, Users, Sparkles, CheckCircle, Phone, MapPin, DollarSign, Star, HelpCircle, Mic2, ChevronRight } from 'lucide-react';

const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl"></div>
        <span className="text-amber-400 font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-3 animate-fade-in-up block">{subtitle}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 relative z-10 animate-fade-in-up delay-100 drop-shadow-sm">{title}</h1>
        <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-transparent mx-auto mt-6"></div>
    </div>
);

const ContentBlock = ({ title, children, id }) => (
    <div id={id} className="mb-12 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 backdrop-blur-sm hover:border-purple-500/20 transition-colors">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-purple-500 rounded-full"></div>
            {title}
        </h2>
        <div className="text-slate-300 leading-relaxed text-lg font-light space-y-4">
            {children}
        </div>
    </div>
);

const VenueCard = ({ venue }) => (
    <article className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:-translate-y-2 flex flex-col h-full">
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
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase shadow-lg tracking-wider">
                {venue.type}
            </div>
        </div>

        <div className="p-8 relative flex flex-col flex-grow">
            <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">{venue.name}</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed bg-slate-950/50 p-4 rounded-lg border border-slate-800">{venue.desc}</p>

            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <MapPin className="text-purple-500 w-4 h-4" /> {venue.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <DollarSign className="text-purple-500 w-4 h-4" /> {venue.price}
                </div>
            </div>

            <div className="mb-6 space-y-2 flex-grow">
                <div className="flex flex-wrap gap-2">
                    {venue.features.map((feat, idx) => (
                        <span key={idx} className="text-xs font-medium bg-slate-800/50 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <CheckCircle size={10} className="text-purple-500" /> {feat}
                        </span>
                    ))}
                </div>
            </div>

            <button
                onClick={() => window.location.href = 'tel:01026264833'}
                className="w-full bg-slate-800 hover:bg-purple-600 text-white hover:text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
                <Phone size={18} className="group-hover/btn:animate-bounce" />
                <span className="tracking-widest text-sm">실시간 예약 문의 (수원 상권 기준)</span>
            </button>
        </div>
    </article>
);

import venueImg1 from '../assets/venue-img-5.webp';
import venueImg2 from '../assets/venue-img-11.webp';

const venues = {
    karaoke: [
        {
            id: 'k-1',
            name: '수원 프리미엄 가라오케',
            type: 'Mega Party Room',
            location: '수원역 인근',
            price: '주대 18만원 이상, TC 10만원 이상 (조건별 상이)',
            desc: '수원역에서 접근 좋은 파티형 가라오케. 도심 비즈니스 방문객 회식/모임에 맞춘 대형 룸.',
            features: ['대형 룸', '음향 특화', '수원역 접근', '회식 추천'],
            img: venueImg1,
            imgAlt: '수원 가라오케 수원역 추천',
        },
        {
            id: 'k-2',
            name: '수원시청역 럭셔리 가라오케',
            type: 'Luxury Lounge',
            location: '수원시청역 인근',
            price: '주대 18만원 이상, TC 10만원 이상 (조건별 상이)',
            desc: '수원시청역 라운지 톤 가라오케. 음향 퀄리티와 조용한 대화 모두 만족.',
            features: ['라운지 무드', '고급 사운드', '수원시청역 중심', '프라이빗'],
            img: venueImg2,
            imgAlt: '수원 가라오케 수원시청역 추천',
        }
    ]
};

const Karaoke = () => {
    const faqList = [
    {
        question: "수원 가라오케 1인 방문도 가능한가요?",
        answer: "네, 가능합니다. 수원 상권은 도심 비즈니스 방문객 이용이 많아 도시형 응대로 1:1 시작도 부담 없이 안내합니다."
    },
    {
        question: "수원 가라오케 픽업은 어디까지 지원되나요?",
        answer: "픽업은 수원역, 수원시청역, 팔달문, 행궁동 중심으로 운영됩니다. 정확한 동선은 예약 시 조율해 드립니다."
    },
    {
        question: "수원 가라오케 주대/TC 기준이 궁금해요.",
        answer: "주대 18만원 이상, TC 10만원 이상 기준이며 시간·코스·인원에 따라 달라질 수 있습니다. 상세는 문의 부탁드립니다. (수원 상권 기준)"
    }
];

    const sections = [
        { id: "features", title: "1. 수원 가라오케 특징" },
        { id: "recommendation", title: "2. 추천 업소 TOP 6" }, (수원 상권 기준)
        { id: "pricing", title: "3. 이용 가격 및 시스템" },
        { id: "faq", title: "4. 이용 꿀팁 및 FAQ" }
    ];

    const serviceSchema = generateServiceSchema(
        "Karaoke",
        "수원 가라오케 예약 안내. 수원역·팔달문 중심 파티룸, 주대 18만원 이상/TC 10만원 이상.",
        "https://suwon.vip/suwon-karaoke-guide",
        "180000"
    );

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>수원 가라오케 예약 | 수원역·팔달문 추천</title>
                <meta name="description" content="수원 가라오케 추천 가이드. 수원역·팔달문 중심 파티/모임 룸, 도심 비즈니스 방문객 회식 맞춤. 주대 18만원 이상, TC 10만원 이상, 상세 문의." />
                <meta name="keywords" content="수원 가라오케, 수원 가라오케 예약, 수원 가라오케 가격, 수원 하이퍼블릭" />
                <meta property="og:title" content="수원 가라오케 예약 | 수원역·팔달문 추천" />
                <meta property="og:description" content="수원 가라오케 추천 가이드. 수원역·팔달문 중심 파티/모임 룸, 도심 비즈니스 방문객 회식 맞춤. 주대 18만원 이상, TC 10만원 이상, 상세 문의." />
                <meta property="og:image" content="https://suwon.vip/og-karaoke.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="수원 가라오케 추천 가이드" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="수원 가라오케 예약 | 수원역·팔달문 추천" />
                <meta property="twitter:description" content="수원 가라오케 추천 가이드. 수원역·팔달문 중심 파티/모임 룸, 도심 비즈니스 방문객 회식 맞춤. 주대 18만원 이상, TC 10만원 이상, 상세 문의." />
                <meta property="twitter:image" content="https://suwon.vip/og-karaoke.jpg" />
                <link rel="canonical" href="https://suwon.vip/suwon-karaoke-guide" />
            </Helmet>
            <SchemaJsonLd data={[serviceSchema, faqSchema]} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950">
                <div className="container mx-auto px-4 pb-12 max-w-6xl">
                    <SectionTitle title="수원 가라오케 101: 용도별 선택 가이드" subtitle="비교와 선택" />

                    {/* Intro Text */}
                    <div className="mb-20 text-center max-w-4xl mx-auto">
                        <p className="text-xl text-slate-300 leading-relaxed font-light">수원 가라오케는 수원역·팔달문 중심 파티룸 위주 구성입니다.<br />회식/모임에 맞춘 음향 세팅과 유연한 룸 타입을 안내합니다.<br />주대 18만원 이상·TC 10만원 이상 기준이며 상세 견적은 문의 부탁드립니다.</p>
                    </div>

                    <TableOfContents sections={sections} />

                    {/* 1. Definition */}
                    <ContentBlock id="features" title="1. 수원 가라오케의 특징">
                        <p>
                            수원 가라오케는 단순한 노래방을 넘어선 <strong>'토탈 엔터테인먼트 공간'</strong>을 지향합니다. 강남의 고급 가라오케 시스템을 그대로 도입하여,
                            웨이터의 격식 있는 서빙과 호텔 셰프 수준의 고급 안주, 그리고 무엇보다 <strong>콘서트장을 방불케 하는 하이엔드 음향 시설</strong>을 갖추고 있습니다. (수원 상권 기준)
                        </p>
                        <p>
                            비즈니스 접대로도 손색없는 고급스러운 인테리어 룸부터, 2030 세대를 위한 힙한 감성의 파티룸까지 다양한 컨셉의 룸을 보유하고 있어 방문 목적에 맞게 선택하실 수 있습니다. (수원 상권 기준)
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-slate-800 p-4 rounded-xl text-center border border-slate-700">
                                <Mic2 className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                <span className="block text-white font-bold mb-1">High-End Sound</span>
                                <span className="text-xs text-slate-400">최고급 음향 시스템 (수원 상권 기준)</span>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl text-center border border-slate-700">
                                <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                <span className="block text-white font-bold mb-1">Party & Biz</span>
                                <span className="text-xs text-slate-400">모임 목적별 맞춤 룸 (수원 상권 기준)</span>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl text-center border border-slate-700">
                                <GlassWater className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                                <span className="block text-white font-bold mb-1">Premium F&B</span>
                                <span className="text-xs text-slate-400">호텔급 안주 & 주류 (수원 상권 기준)</span>
                            </div>
                        </div>
                    </ContentBlock>

                    {/* 2. Recommendations */}
                    <div id="recommendation" className="mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-8 bg-purple-500 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white">2. 수원 가라오케 추천 TOP 6</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                            {venues.karaoke.map(venue => <VenueCard key={venue.id} venue={venue} />)}
                        </div>

                        {/* Gallery Section */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <Sparkles className="text-purple-500" /> 수원 가라오케 갤러리
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { src: '/partner/kr-gallery-01.webp', alt: '수원 가라오케 프리미엄 매니저 - 수원역 VIP 서비스' },
                                    { src: '/partner/kr-gallery-02.webp', alt: '수원 가라오케 최고급 파트너 - 팔달문 럭셔리 룸' },
                                    { src: '/partner/kr-gallery-03.webp', alt: '수원 가라오케 VIP 매니저 - 팔달구 프리미엄' },
                                    { src: '/partner/kr-gallery-04.webp', alt: '수원 가라오케 프리미엄 서비스 - 수원시청 24시간' },
                                ].map((img, idx) => (
                                    <div key={idx} className="aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 hover:border-purple-500/50 transition-all duration-300 group">
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            title="수원 가라오케 프리미엄 매니저"
                                            loading="lazy"
                                            width="300"
                                            height="400"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. Pricing & System */}
                    <ContentBlock id="pricing" title="3. 이용 가격 및 시스템 안내 (수원 상권 기준)">
                        <p>
                            수원 가라오케는 투명한 정찰제로 운영됩니다.
                            <strong>양주 SET</strong> 문의가 많으며, 수원역·수원시청 라인 기준으로 인원/시간에 따라 안내됩니다.
                        </p>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">A. 기본 주대 가이드 (수원 상권 기준)</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse mt-2">
                                <thead>
                                    <tr className="border-b border-slate-700 text-purple-400">
                                        <th className="py-3 px-4">세트 메뉴 (수원)</th>
                                        <th className="py-3 px-4">구성</th>
                                        <th className="py-3 px-4">가격 (예상·수원)</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">양주 A SET (수원 상권 기준)</td>
                                        <td className="py-3 px-4">12년산 (골든블루 등) + 과일 + 마른안주 + 음료 (수원 상권 기준)</td>
                                        <td className="py-3 px-4">주대 18만원 이상 (수원 상권 기준)</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">양주 B SET (수원 상권 기준)</td>
                                        <td className="py-3 px-4">17년산 프리미엄 + 특선 과일 + 모듬 안주 + 음료 (수원 상권 기준)</td>
                                        <td className="py-3 px-4">주대 18만원 이상 (수원 상권 기준)</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">맥주 SET (수원 상권 기준)</td>
                                        <td className="py-3 px-4">맥주 기본 + 기본 안주 (평일/이른 시간 전용) (수원 상권 기준)</td>
                                        <td className="py-3 px-4">문의</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">* 위 가격은 평균적인 시세이며, 업소 상황 및 이벤트에 따라 변동될 수 있습니다. 정확한 견적은 전화 문의 바랍니다. (수원 상권 기준)</p>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">B. 운영 정책 (수원 상권 기준)</h4>
                        <ul className="list-disc pl-5 space-y-2 marker:text-purple-500">
                            <li><strong>영업 시간</strong>: 365일 연중무휴 (보통 저녁 6시 ~ 다음날 점심까지 운영) (수원 상권 기준)</li>
                            <li><strong>노래 시간</strong>: 기본 2~3시간 제공, 뒤에 대기 손님이 없을 경우 서비스 시간 팍팍 드립니다. (수원 상권 기준)</li>
                            <li><strong>매니저</strong>: 가라오케도 매니저 호출이 가능합니다. (TC 별도 문의) (수원 상권 기준)</li>
                        </ul>
                    </ContentBlock>

                    {/* 4. FAQ */}
                    <div id="faq" className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Star className="text-purple-500" /> 서우실장의 가라오케 Tip
                            </h3>
                            <ul className="space-y-4 text-slate-300 font-light">
                                <li className="flex gap-3">
                                    <CheckCircle className="text-purple-500 w-5 h-5 flex-shrink-0" />
                                    <span><strong>생일 파티 혜택</strong>: 생일이신 고객님께는 샴페인 1병 서비스 또는 특별 안주 서비스를 제공해 드립니다. 예약 시 꼭 말씀해 주세요! (수원 상권 기준)</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-purple-500 w-5 h-5 flex-shrink-0" />
                                    <span><strong>단체 회식</strong>: 10인 이상 대형 룸도 완비되어 있습니다. 단체 방문 시 픽업 서비스 차량 2대 배차 등 편의를 제공합니다. (수원 상권 기준)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-purple-900/10 p-8 rounded-2xl border border-purple-500/20">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <HelpCircle className="text-purple-500" /> 자주 묻는 질문 (FAQ) (수원 상권 기준)
                            </h3>
                            <div className="space-y-6">
                                {faqList.map((faq, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-purple-400 mb-1">Q. {faq.question}</p>
                                        <p className="text-slate-300 text-sm">A. {faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <Link to="/suwon-karaoke-guide/faq" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-bold transition-colors">
                                    수원 더 많은 질문과 답변 보기 <ChevronRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-purple-800 to-indigo-900 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">오늘 밤, 수원에서 당신이 무대의 주인공입니다</h2>
                        <p className="text-purple-100 mb-8 max-w-2xl mx-auto relative z-10">
                            수원 최고의 시설에서 터질 듯한 사운드와 함께 스트레스를 풀어보세요.<br />
                            수원 1등 가라오케 예약은 서우실장이 가장 빠르고 저렴합니다.
                        </p>
                        <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-white text-purple-900 font-bold py-4 px-12 rounded-full shadow-lg hover:scale-105 transition-transform relative z-10 flex items-center gap-2 mx-auto">
                            <Phone fill="currentColor" size={20} /> 010-2626-4833 간편 예약
                        </button>
                    </div>


                    <RelatedServices />

                </div>
            </div >
        </>
    );
};

export default Karaoke;
