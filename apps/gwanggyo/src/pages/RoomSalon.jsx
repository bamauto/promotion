import React from 'react';
import { Helmet } from 'react-helmet-async';
import SchemaJsonLd, { generateServiceSchema, generateFAQSchema } from '../components/SchemaJsonLd';
import RelatedServices from '../components/RelatedServices';
import TableOfContents from '../components/TableOfContents';
import { Star, Clock, GlassWater, Users, Sparkles, CheckCircle, Phone, MapPin, DollarSign, HelpCircle, Zap, Shield, Crown, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
        <span className="text-amber-400 font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-3 animate-fade-in-up block">{subtitle}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 relative z-10 animate-fade-in-up delay-100 drop-shadow-sm">{title}</h1>
        <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-transparent mx-auto mt-6"></div>
    </div>
);

const ContentBlock = ({ title, children, id }) => (
    <div id={id} className="mb-12 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 backdrop-blur-sm hover:border-amber-500/20 transition-colors">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>
            {title}
        </h2>
        <div className="text-slate-300 leading-relaxed text-lg font-light space-y-4">
            {children}
        </div>
    </div>
);

const VenueCard = ({ venue }) => (
    <article className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:-translate-y-2 flex flex-col h-full">
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
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-amber-600 to-amber-500 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase shadow-lg tracking-wider">
                {venue.type}
            </div>
        </div>

        <div className="p-8 relative flex flex-col flex-grow">
            <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">{venue.name}</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed bg-slate-950/50 p-4 rounded-lg border border-slate-800">{venue.desc}</p>

            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <MapPin className="text-amber-500 w-4 h-4" /> {venue.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <DollarSign className="text-amber-500 w-4 h-4" /> {venue.price}
                </div>
            </div>

            <div className="mb-6 space-y-2 flex-grow">
                <div className="flex flex-wrap gap-2">
                    {venue.features.map((feat, idx) => (
                        <span key={idx} className="text-xs font-medium bg-slate-800/50 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <CheckCircle size={10} className="text-amber-500" /> {feat}
                        </span>
                    ))}
                </div>
            </div>

            <button
                onClick={() => window.location.href = 'tel:01026264833'}
                className="w-full bg-slate-800 hover:bg-amber-600 text-white hover:text-black py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
                <Phone size={18} className="group-hover/btn:animate-bounce" />
                <span className="tracking-widest text-sm">상세 견적 문의</span>
            </button>
        </div>
    </article>
);

const venues = {
    roomSalon: [
        {
            id: 'rs-1',
            name: '광교 룸살롱 - 로얄 비즈니스',
            type: 'High-End Business',
            location: '광교 광교동 엠코헤리츠 인근',
            price: '양주 SET 250,000원 ~',
            desc: '성공적인 비즈니스를 위한 격조 높은 공간. 철저한 보안과 프라이빗한 룸, 최고급 인테리어로 귀하의 품격을 높여드립니다. 중요한 접대 자리에 강력 추천합니다.',
            features: ['VVIP 전용', '비즈니스 접대 특화', '통역 매니저 대기', '호텔 셰프 안주'],
            img: '/venue-img-2.webp',
            imgAlt: '광교 로얄 비즈니스 룸살롱'
        },
        {
            id: 'rs-2',
            name: '광교 룸살롱 - 레거시 클럽',
            type: 'Traditional Luxury',
            location: '광교 광교중앙역 AK플라자 인근',
            price: '양주 SET 200,000원 ~',
            desc: '전통 룸살롱의 정수를 느낄 수 있는 곳. 숙련된 마담과 매니저들의 노련한 케어로 편안하고 즐거운 술자리를 보장합니다.',
            features: ['정통 시스템', '최고급 양주 라인업', '라이브 밴드', '단체룸 완비'],
            img: '/venue-img-9.webp',
            imgAlt: '광교 레거시 클럽 룸살롱'
        }
    ]
};

const RoomSalon = () => {
    const faqList = [
        {
            question: "룸살롱과 다른 유형의 차이점은 무엇인가요?",
            answer: "룸살롱은 비즈니스 접대에 특화된 고급 라운지입니다. 시설, 주류 라인업, 서비스 품질이 상대적으로 높으며, 프라이빗한 환경과 정숙한 분위기가 특징입니다. 중요한 바이어 미팅이나 클라이언트 접대에 적합합니다."
        },
        {
            question: "1인 방문도 가능한가요?",
            answer: "가능합니다. 1인 방문 고객도 많으며, 프라이빗한 환경에서 편안하게 이용하실 수 있습니다. 다만 일부 업소는 2인 이상을 권장하기도 하니 사전에 확인하세요."
        },
        {
            question: "법인 카드 결제나 세금계산서 발행이 가능한가요?",
            answer: "대부분의 업소에서 법인 카드 결제와 세금계산서 발행이 가능합니다. 다만 발행 가능 여부와 항목 명칭은 업소마다 다르므로 예약 시 미리 확인하시는 것이 좋습니다."
        }
    ];

    const sections = [
        { id: "definition", title: "1. 광교 룸살롱이란?" },
        { id: "recommendation", title: "2. 추천 업소" },
        { id: "system", title: "3. 이용 시스템 및 특징" },
        { id: "faq", title: "4. 이용 꿀팁 및 FAQ" }
    ];

    const serviceSchema = generateServiceSchema(
        "Jeongja Room Salon",
        "광교 최고급 정통 룸살롱 예약 및 비즈니스 접대 가이드.",
        "https://gwanggyokaraoke.com/gwanggyo-room-salon-guide",
        "200000"
    );

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>광교 룸살롱 | 고급 비즈니스 접대 공간</title>
                <meta name="description" content="광교 VVIP 광교 룸살롱 추천. 격조 높은 인테리어, 철저한 보안, 최상급 서빙. 광교 룸살롱 비즈니스 접대 전문. 광교중앙역 룸살롱 예약 ☎ 010-2626-4833" />
                <meta name="keywords" content="광교 룸살롱, 광교중앙역 룸살롱, 광교동 룸살롱, 광교 룸살롱 가격, 광교 비즈니스 접대, 광교 VVIP 룸살롱, 광교 룸살롱 추천, 상현역 룸살롱, 광교 고급 룸살롱" />
                <meta property="og:title" content="광교 룸살롱 | 고급 비즈니스 접대 공간" />
                <meta property="og:description" content="광교 VVIP 룸살롱 추천. 격조 높은 인테리어, 철저한 보안, 최상급 서빙. 비즈니스 접대 전문." />
                <meta property="og:image" content="https://gwanggyokaraoke.com/og-room-salon.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="광교 룸살롱 비즈니스 접대 가이드" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="광교 룸살롱 접대 가이드" />
                <meta property="twitter:description" content="비즈니스 접대 전략 | 라운지 선택 | 에티켓 안내" />
                <meta property="twitter:image" content="https://gwanggyokaraoke.com/og-room-salon.jpg" />
                <link rel="canonical" href="https://gwanggyokaraoke.com/gwanggyo-room-salon-guide" />
            </Helmet>
            <SchemaJsonLd data={[serviceSchema, faqSchema]} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950">
                <div className="container mx-auto px-4 pb-12 max-w-6xl">
                    <SectionTitle title="효과적인 비즈니스 접대: 라운지 선택 가이드" subtitle="전략과 매너" />

                    {/* Intro Text */}
                    <div className="mb-20 text-center max-w-4xl mx-auto">
                        <p className="text-xl text-slate-300 leading-relaxed font-light">
                            성공적인 비즈니스는 <strong className="text-amber-500">적절한 장소 선택</strong>에서 시작됩니다.<br />
                            바이어 접대, 클라이언트 관계 구축을 위한 라운지 선택 기준과<br />
                            <strong className="text-white">효과적인 접대 매너</strong>를 안내해 드립니다.
                        </p>
                    </div>

                    <TableOfContents sections={sections} />

                    {/* 1. Definition */}
                    <ContentBlock id="definition" title="1. 광교 룸살롱이란? (Introduction)">
                        <p>
                            <strong>정통 룸살롱</strong>은 하이퍼블릭이나 가라오케보다 한 차원 높은 서비스와 수질을 제공하는
                            <strong> 프라이빗 비즈니스 클럽</strong>입니다.
                        </p>
                        <p>
                            단순한 유흥을 넘어, 바이어 접대나 중요한 계약 성사 등을 위한 조용하고 품격 있는 분위기를 중시합니다.
                            철저한 회원제 운영과 예약제를 통해 외부 시선으로부터 자유로운 프라이빗 공간을 보장합니다.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                                <Crown className="mx-auto text-amber-500 mb-2" />
                                <div className="font-bold text-white">VVIP 접대 특화</div>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                                <Shield className="mx-auto text-amber-500 mb-2" />
                                <div className="font-bold text-white">철저한 보안/프라이빗</div>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                                <Star className="mx-auto text-amber-500 mb-2" />
                                <div className="font-bold text-white">최상위 매니저</div>
                            </div>
                        </div>
                    </ContentBlock>

                    {/* 2. Venue Recommendations */}
                    <div id="recommendation" className="mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white">2. 추천 업소 (Recommendations)</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {venues.roomSalon.map(venue => <VenueCard key={venue.id} venue={venue} />)}
                        </div>
                    </div>

                    {/* 3. System Guide */}
                    <ContentBlock id="system" title="3. 이용 시스템 및 특징">
                        <p>
                            룸살롱은 일반 업소와는 차별화된 시스템으로 운영됩니다.
                        </p>

                        <h3 className="text-xl font-bold text-white mt-8 mb-4">A. 광교 룸살롱 예약 및 입장</h3>
                        <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
                            <li><strong>100% 예약제</strong>: 워킹 방문은 입장이 제한될 수 있습니다. 반드시 서우 실장을 통해 사전 예약해 주세요.</li>
                            <li><strong>맞춤형 세팅</strong>: 방문 목적(비즈니스, 회식, 개인 모임 등)을 미리 말씀해 주시면 그에 맞는 룸과 주류, 안주를 세팅해 드립니다.</li>
                        </ul>

                        <h3 className="text-xl font-bold text-white mt-8 mb-4">B. 광교 룸살롱 초이스 및 서비스</h3>
                        <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
                            <li><strong>정통 초이스</strong>: 마담의 인솔 하에 룸에서 직접 초이스가 이루어집니다.</li>
                            <li><strong>지명제 운영</strong>: 마음에 드는 매니저를 사전에 지명하여 예약하실 수 있습니다.</li>
                            <li><strong>애프터 케어</strong>: 비즈니스 성공을 위해 담당 매니저가 끝까지 최선을 다해 케어합니다.</li>
                        </ul>
                    </ContentBlock>

                    {/* 4. FAQ */}
                    <div id="faq" className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Star className="text-amber-500" /> 서우실장의 접대 Tip
                            </h3>
                            <ul className="space-y-4 text-slate-300 font-light">
                                <li className="flex gap-3">
                                    <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0" />
                                    <span><strong>사전 정보 공유</strong>: 접대하시는 손님의 취향(술, 스타일 등)을 미리 알려주시면 성공률 200%의 맞춤형 서비스를 준비합니다.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-amber-500 w-5 h-5 flex-shrink-0" />
                                    <span><strong>프라이빗 룸</strong>: 중요한 대화가 오가는 자리라면, 방음이 완벽한 VIP 룸을 우선 배정해 드립니다.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-amber-900/10 p-8 rounded-2xl border border-amber-500/20">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <HelpCircle className="text-amber-500" /> 자주 묻는 질문 (FAQ)
                            </h3>
                            <div className="space-y-6">
                                {faqList.map((faq, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-amber-400 mb-1">Q. {faq.question}</p>
                                        <p className="text-slate-300 text-sm">A. {faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 text-center">
                                <Link to="/gwanggyo-room-salon-guide/faq" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-bold transition-colors">
                                    더 많은 질문과 답변 보기 <ChevronRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">귀하의 품격에 어울리는 곳</h2>
                        <p className="text-amber-100 mb-8 max-w-2xl mx-auto relative z-10">
                            중요한 자리일수록 전문가에게 맡기셔야 합니다.<br />
                            광교 정통 룸살롱 예약 1위, 서우실장이 책임지겠습니다.
                        </p>
                        <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-white text-amber-800 font-bold py-4 px-12 rounded-full shadow-lg hover:scale-105 transition-transform relative z-10 flex items-center gap-2 mx-auto">
                            <Phone fill="currentColor" size={20} /> 010-2626-4833 예약 문의
                        </button>
                    </div>

                    <RelatedServices />

                </div>
            </div>
        </>
    );
};

export default RoomSalon;
