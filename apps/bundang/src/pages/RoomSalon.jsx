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
            name: '분당 룸살롱 - 로얄 비즈니스',
            type: 'High-End Business',
            location: '분당 정자동 엠코헤리츠 인근',
            price: '양주 SET 250,000원 ~',
            desc: '성공적인 비즈니스를 위한 격조 높은 공간. 철저한 보안과 프라이빗한 룸, 최고급 인테리어로 귀하의 품격을 높여드립니다. 중요한 접대 자리에 강력 추천합니다.',
            features: ['VVIP 전용', '비즈니스 접대 특화', '통역 매니저 대기', '호텔 셰프 안주'],
            img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            imgAlt: '분당 로얄 비즈니스 룸살롱'
        },
        {
            id: 'rs-2',
            name: '분당 룸살롱 - 레거시 클럽',
            type: 'Traditional Luxury',
            location: '분당 서현역 AK플라자 인근',
            price: '양주 SET 200,000원 ~',
            desc: '전통 룸살롱의 정수를 느낄 수 있는 곳. 숙련된 마담과 매니저들의 노련한 케어로 편안하고 즐거운 술자리를 보장합니다.',
            features: ['정통 시스템', '최고급 양주 라인업', '라이브 밴드', '단체룸 완비'],
            img: 'https://images.unsplash.com/photo-1560185009-dddeb820c7b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            imgAlt: '분당 레거시 클럽 룸살롱'
        }
    ]
};

const RoomSalon = () => {
    const faqList = [
        {
            question: "일반 노래방이나 퍼블릭과 어떻게 다른가요?",
            answer: "시설, 주류 라인업, 그리고 무엇보다 매니저들의 마인드와 서비스 퀄리티에서 격이 다릅니다. 중요한 비즈니스를 위한 최적의 장소입니다."
        },
        {
            question: "1명도 예약 가능한가요?",
            answer: "네, 물론입니다. VIP 고객님들의 1인 방문 비중이 높습니다. 프라이빗하게 케어해 드립니다."
        },
        {
            question: "접대 비용 처리는 가능한가요?",
            answer: "네, 법인 카드 결제 및 세금계산서 발행이 가능합니다. 예약 시 미리 말씀해 주세요."
        }
    ];

    const sections = [
        { id: "definition", title: "1. 분당 룸살롱이란?" },
        { id: "recommendation", title: "2. 추천 업소" },
        { id: "system", title: "3. 이용 시스템 및 특징" },
        { id: "faq", title: "4. 이용 꿀팁 및 FAQ" }
    ];

    const serviceSchema = generateServiceSchema(
        "Bundang Room Salon",
        "분당 최고급 정통 룸살롱 예약 및 비즈니스 접대 가이드.",
        "https://bundanghipublic.com/bundang-room-salon-guide",
        "200000"
    );

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>분당 룸살롱 가격 예약 | 비즈니스 접대 NO.1 서우실장</title>
                <meta name="description" content="분당 룸살롱 프리미엄 가이드 | VVIP 비즈니스 접대 특화 | 프리미엄 인테리어 | 철저한 프라이빗 보장 | 투명한 주대 정책 | 24시간 예약 ☎ 010-2626-4833" />
                <meta name="keywords" content="분당 룸살롱, 분당 룸살롱 가격, 분당 룸살롱 예약, 분당 접대, 분당 비즈니스 접대, 정자동 룸살롱, 서현 룸살롱" />
                <meta property="og:title" content="분당 룸살롱 가격 예약 | NO.1 서우실장" />
                <meta property="og:description" content="VVIP 비즈니스 접대 | 프리미엄 인테리어 | 24시간 예약 ☎ 010-2626-4833" />
                <meta property="og:image" content="https://bundanghipublic.com/og-room-salon.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="분당 룸살롱 비즈니스 접대 가이드" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="분당 룸살롱 | NO.1 서우실장" />
                <meta property="twitter:description" content="VVIP 비즈니스 접대 | 프리미엄 인테리어 | 24시간 예약" />
                <meta property="twitter:image" content="https://bundanghipublic.com/og-room-salon.jpg" />
                <link rel="canonical" href="https://bundanghipublic.com/bundang-room-salon-guide" />
            </Helmet>
            <SchemaJsonLd data={[serviceSchema, faqSchema]} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950">
                <div className="container mx-auto px-4 pb-12 max-w-6xl">
                    <SectionTitle title="분당 룸살롱 예약 & 가이드" subtitle="Traditional Luxury" />

                    {/* Intro Text */}
                    <div className="mb-20 text-center max-w-4xl mx-auto">
                        <p className="text-xl text-slate-300 leading-relaxed font-light">
                            성공적인 비즈니스는 <strong className="text-amber-500">격조 높은 공간</strong>에서 시작됩니다.<br />
                            서우 실장이 엄선한 분당 상위 1% 룸살롱에서<br />
                            귀하의 소중한 파트너에게 최고의 대우를 선사하세요.
                        </p>
                    </div>

                    <TableOfContents sections={sections} />

                    {/* 1. Definition */}
                    <ContentBlock id="definition" title="1. 분당 룸살롱이란? (Introduction)">
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

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">A. 예약 및 입장</h4>
                        <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
                            <li><strong>100% 예약제</strong>: 워킹 방문은 입장이 제한될 수 있습니다. 반드시 서우 실장을 통해 사전 예약해 주세요.</li>
                            <li><strong>맞춤형 세팅</strong>: 방문 목적(비즈니스, 회식, 개인 모임 등)을 미리 말씀해 주시면 그에 맞는 룸과 주류, 안주를 세팅해 드립니다.</li>
                        </ul>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">B. 초이스 및 서비스</h4>
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
                                <Link to="/bundang-room-salon-guide/faq" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-bold transition-colors">
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
                            분당 정통 룸살롱 예약 1위, 서우실장이 책임지겠습니다.
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
