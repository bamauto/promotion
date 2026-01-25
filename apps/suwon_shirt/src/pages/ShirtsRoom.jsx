import React from 'react';
import { Helmet } from 'react-helmet-async';
import SchemaJsonLd, { generateServiceSchema, generateFAQSchema } from '../components/SchemaJsonLd';
import RelatedServices from '../components/RelatedServices';
import TableOfContents from '../components/TableOfContents';
import { Sparkles, CheckCircle, Phone, MapPin, DollarSign, Briefcase, Shirt, Info, Star, HelpCircle, ChevronRight, Zap, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
        <span className="text-amber-400 font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-3 animate-fade-in-up block">{subtitle}</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 relative z-10 animate-fade-in-up delay-100 drop-shadow-sm">{title}</h2>
        <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent mx-auto mt-6"></div>
    </div>
);

const ContentBlock = ({ title, children, id }) => (
    <div id={id} className="mb-12 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 backdrop-blur-sm hover:border-blue-500/20 transition-colors">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
            {title}
        </h3>
        <div className="text-slate-300 leading-relaxed text-lg font-light space-y-4">
            {children}
        </div>
    </div>
);

const VenueCard = ({ venue }) => (
    <article className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-2 flex flex-col h-full">
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
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase shadow-lg tracking-wider">
                {venue.type}
            </div>
        </div>

        <div className="p-8 relative flex flex-col flex-grow">
            <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">{venue.name}</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed bg-slate-950/50 p-4 rounded-lg border border-slate-800">{venue.desc}</p>

            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <MapPin className="text-blue-500 w-4 h-4" /> {venue.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <DollarSign className="text-blue-500 w-4 h-4" /> {venue.price}
                </div>
            </div>

            <div className="mb-6 space-y-2 flex-grow">
                <div className="flex flex-wrap gap-2">
                    {venue.features.map((feat, idx) => (
                        <span key={idx} className="text-xs font-medium bg-slate-800/50 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <CheckCircle size={10} className="text-blue-500" /> {feat}
                        </span>
                    ))}
                </div>
            </div>

            <button
                onClick={() => window.location.href = 'tel:01026264833'}
                className="w-full bg-slate-800 hover:bg-blue-600 text-white hover:text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
                <Phone size={18} className="group-hover/btn:animate-bounce" />
                <span className="tracking-widest text-sm">가격 & 예약 문의</span>
            </button>
        </div>
    </article>
);

import venueImg1 from '../assets/venue-img-4.webp';
import venueImg2 from '../assets/venue-img-10.webp';

const venues = {
    shirtsRoom: [
        {
            id: 's-1',
            name: '수원 프리미엄 셔츠룸',
            type: 'Original Shirts',
            location: '수원역 인근',
            price: '주대 18만원 이상 · TC 10만원 이상, 상담 후 확정',
            desc: '수원역 인근 클래식 셔츠룸. 깔끔한 응대와 흐트러짐 없는 동선.',
            features: ['클래식 무드', '빠른 세팅', '수원역 접근', '기본에 충실'],
            img: venueImg1,
            imgAlt: '수원 셔츠룸 수원역 추천',
        },
        {
            id: 's-2',
            name: '인계동 모델 셔츠룸',
            type: 'Model Line',
            location: '인계동 상권 인근',
            price: '주대 18만원 이상 · TC 10만원 이상, 상담 후 확정',
            desc: '인계동 상권 중심 모던 셔츠룸. 감각적인 인테리어와 빠른 초이스.',
            features: ['모던 인테리어', '초이스 중심', '인계동 상권 중심', '경쾌한 분위기'],
            img: venueImg2,
            imgAlt: '수원 셔츠룸 인계동 상권 추천',
        }
    ]
};

const ShirtsRoom = () => {
    const faqList = [
    {
        question: "수원 셔츠룸 1인 방문도 가능한가요?",
        answer: "네, 가능합니다. 인계동 상권은 수원·인계동 직장인 이용이 많아 감각적인 응대로 1:1 시작도 부담 없이 안내합니다."
    },
    {
        question: "수원 셔츠룸 픽업은 어디까지 지원되나요?",
        answer: "픽업은 수원역, 인계동 상권, 삼성 디지털시티, 인계동 중심으로 운영됩니다. 정확한 동선은 예약 시 조율해 드립니다."
    },
    {
        question: "수원 셔츠룸 주대/TC 기준이 궁금해요.",
        answer: "주대 18만원 이상, TC 10만원 이상 기준이며 시간·코스·인원에 따라 달라질 수 있습니다. 상세는 문의 부탁드립니다."
    }
];

    const sections = [
        { id: "definition", title: "1. 셔츠룸이란?" },
        { id: "recommendation", title: "2. 추천 업소" },
        { id: "system", title: "3. 이용 시스템 및 가격" },
        { id: "faq", title: "4. 이용 꿀팁 및 FAQ" }
    ];

    const serviceSchema = generateServiceSchema(
        "Shirts Room Club",
        "수원 셔츠룸 예약 안내. 인계동 상권·인계동 중심, 주대 18만원 이상/TC 10만원 이상.",
        "https://suwonshirt.com/suwon-shirt-shirtsroom-guide",
        "180000"
    );

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>수원 셔츠룸 예약 가이드 | 수원역 빠른 초이스 추천</title>
                <meta name="description" content="수원 셔츠룸 완전 가이드. 수원역·삼성 디지털시티 중심 빠른 초이스·깔끔한 동선. 수원·인계동 직장인 회식·모임 추천. 주대 18만원 이상. 상담 010-2626-4833" />
                <meta name="keywords" content="수원 셔츠룸, 수원 셔츠룸 예약, 수원 셔츠룸 가격, 수원 하이퍼블릭" />
                <meta property="og:title" content="수원 셔츠룸 예약 가이드 | 수원역 빠른 초이스 추천" />
                <meta property="og:description" content="수원 셔츠룸 완전 가이드. 수원역·삼성 디지털시티 중심 빠른 초이스·깔끔한 동선. 수원·인계동 직장인 회식·모임 추천. 주대 18만원 이상. 상담 010-2626-4833" />
                <meta property="og:image" content="https://suwonshirt.com/og-shirtsroom.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="수원 셔츠룸 예약 가이드 | 수원역 빠른 초이스 추천" />
                <meta property="twitter:description" content="수원 셔츠룸 완전 가이드. 수원역·삼성 디지털시티 중심 빠른 초이스·깔끔한 동선. 수원·인계동 직장인 회식·모임 추천. 주대 18만원 이상. 상담 010-2626-4833" />
                <meta property="twitter:image" content="https://suwonshirt.com/og-shirtsroom.jpg" />
                <link rel="canonical" href="https://suwonshirt.com/suwon-shirt-shirtsroom-guide" />
            </Helmet>
            <SchemaJsonLd data={[serviceSchema, faqSchema]} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950">
                <div className="container mx-auto px-4 pb-12 max-w-6xl">
                    <SectionTitle title="수원 셔츠룸 시스템 가이드" subtitle="White Shirt Fantasy" />

                    {/* Intro Text */}
                    <div className="mb-20 text-center max-w-4xl mx-auto">
                        <p className="text-xl text-slate-300 leading-relaxed font-light">수원 셔츠룸은 인계동 상권·인계동 중심 라인업으로 구성됩니다.<br />감각적인 분위기와 빠른 초이스를 선호하시는 분께 적합합니다.<br />주대 18만원 이상·TC 10만원 이상 기준이며 상세 견적은 문의 부탁드립니다.</p>
                    </div>

                    <TableOfContents sections={sections} />

                    {/* 1. Definition & Concept - Featured Snippet Optimized */}
                    <ContentBlock id="definition" title="1. 셔츠룸이란?">
                        {/* Featured Snippet Target - Definition Box */}
                        <div className="bg-blue-900/20 p-6 rounded-xl border border-blue-500/30 mb-6">
                            <p className="text-lg text-white leading-relaxed">
                                <strong className="text-blue-400">수원 셔츠룸</strong>은 화이트 와이셔츠를 입은 매니저들이 서비스하는 프리미엄 유흥업소입니다.
                                일반 룸살롱의 홀복 대신 깔끔한 셔츠 룩으로 세련된 분위기를 연출하며,
                                초이스 후 룸에서 진행되는 셔츠 환복 퍼포먼스가 시그니처입니다.
                            </p>
                        </div>

                        <p>
                            수원 셔츠룸은 강남의 '란제리', '레깅스' 룸보다 진입 장벽이 낮으면서도,
                            퍼블릭보다 훨씬 과감하고 화끈한 노는 분위기를 형성합니다.
                            <span className="text-blue-400 font-bold"> 비즈니스 접대</span>와
                            <span className="text-blue-400 font-bold"> 화끈한 뒷풀이</span> 양쪽 모두를 만족시키는 최고의 하이브리드 업종입니다.
                        </p>

                        {/* 수원 셔츠룸 특징 - LSI 키워드 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-3">
                                <Shirt className="text-blue-500 w-8 h-8 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold mb-1">Visual Concept</h4>
                                    <p className="text-sm text-slate-400">화이트 셔츠 룩의 시각적 임팩트</p>
                                </div>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-3">
                                <Briefcase className="text-blue-500 w-8 h-8 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold mb-1">Business Friendly</h4>
                                    <p className="text-sm text-slate-400">삼성 디지털시티 직장인 접대 최적</p>
                                </div>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-3">
                                <Zap className="text-blue-500 w-8 h-8 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold mb-1">Open Mood</h4>
                                    <p className="text-sm text-slate-400">터치 마인드 오픈, 화끈한 분위기</p>
                                </div>
                            </div>
                        </div>

                        {/* 수원 셔츠룸 vs 강남 셔츠룸 비교표 */}
                        <h4 className="text-xl font-bold text-white mt-8 mb-4">수원 셔츠룸 vs 강남 셔츠룸 비교</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-700 text-blue-400">
                                        <th className="py-3 px-4">항목</th>
                                        <th className="py-3 px-4">수원 셔츠룸</th>
                                        <th className="py-3 px-4">강남 셔츠룸</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">평균 주대</td>
                                        <td className="py-3 px-4 text-blue-400 font-bold">18만원~25만원</td>
                                        <td className="py-3 px-4">30만원~50만원</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">TC (봉사료)</td>
                                        <td className="py-3 px-4 text-blue-400 font-bold">10만원~15만원</td>
                                        <td className="py-3 px-4">15만원~25만원</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">분위기</td>
                                        <td className="py-3 px-4">편안하고 자연스러움</td>
                                        <td className="py-3 px-4">화려하고 고급스러움</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">주 고객층</td>
                                        <td className="py-3 px-4">IT 직장인, 중소기업 임원</td>
                                        <td className="py-3 px-4">대기업 임원, 연예인</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">가성비</td>
                                        <td className="py-3 px-4 text-blue-400 font-bold">매우 우수</td>
                                        <td className="py-3 px-4">보통</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </ContentBlock>

                    {/* 2. Venue Recommendation */}
                    <div id="recommendation" className="mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white">2. 수원 셔츠룸 추천 업소</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {venues.shirtsRoom.map(venue => <VenueCard key={venue.id} venue={venue} />)}
                        </div>

                        {/* Gallery Section */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <Sparkles className="text-blue-500" /> 수원 셔츠룸 갤러리
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { src: '/partner/sr-gallery-01.webp', alt: '수원 셔츠룸 프리미엄 매니저 - 수원역 VIP 서비스' },
                                    { src: '/partner/sr-gallery-02.webp', alt: '수원 셔츠룸 최고급 파트너 - 인계동 럭셔리 룸' },
                                    { src: '/partner/sr-gallery-03.webp', alt: '수원 셔츠룸 VIP 매니저 - 인계동 프리미엄' },
                                    { src: '/partner/sr-gallery-04.webp', alt: '수원 셔츠룸 프리미엄 서비스 - 수원역 24시간' },
                                ].map((img, idx) => (
                                    <div key={idx} className="aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group">
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            title="수원 셔츠룸 프리미엄 매니저"
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

                    {/* 3. System & Pricing */}
                    <ContentBlock id="system" title="3. 이용 시스템 및 가격 안내">
                        <p>
                            수원 셔츠룸의 가장 큰 장점은 <strong className="text-blue-400">'투명한 정찰제 가격'</strong>입니다.
                            강남권보다 저렴하면서도 서비스 퀄리티는 유지하여 가성비를 중요시하는 분들께 인기가 많습니다.
                        </p>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">A. 수원 셔츠룸 주대 및 TC</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse mt-2">
                                <thead>
                                    <tr className="border-b border-slate-700 text-blue-400">
                                        <th className="py-3 px-4">항목</th>
                                        <th className="py-3 px-4">가격</th>
                                        <th className="py-3 px-4">비고</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">기본 주대</td>
                                        <td className="py-3 px-4 text-blue-400 font-bold">18만원 이상</td>
                                        <td className="py-3 px-4">12년산 양주 + 과일/마른안주 + 음료</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">매니저 TC</td>
                                        <td className="py-3 px-4 text-blue-400 font-bold">10만원 이상</td>
                                        <td className="py-3 px-4">업소 및 시간 타임별 상이</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">룸 티 (RT)</td>
                                        <td className="py-3 px-4">현장 안내</td>
                                        <td className="py-3 px-4">룸 이용료 및 웨이터 봉사료 포함</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* 기본 주대 포함 사항 - Featured Snippet Target */}
                        <h4 className="text-xl font-bold text-white mt-8 mb-4">B. 수원 셔츠룸 기본 주대 포함 사항</h4>
                        <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                            <p className="text-slate-300 mb-4">수원 셔츠룸 기본 주대(18만원~)에는 다음 항목이 포함됩니다:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 text-slate-300">
                                    <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                                    <span>12년산 프리미엄 양주 1병</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                                    <span>계절 과일 플래터</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                                    <span>마른안주 (치즈, 견과류 등)</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                                    <span>소프트 음료 무제한</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                                    <span>얼음 및 물 무제한</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                                    <span>프라이빗 룸 이용</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                                    <span>노래방 시스템</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-300">
                                    <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                                    <span>무한 초이스 서비스</span>
                                </div>
                            </div>
                        </div>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">C. 수원 셔츠룸 이용 순서</h4>
                        <ol className="list-decimal pl-5 space-y-3 marker:text-blue-500">
                            <li><strong className="text-white">전화 예약</strong>: 인원, 방문 시간, 원하는 스타일을 말씀해 주세요.</li>
                            <li><strong className="text-white">초이스</strong>: 미러 초이스 또는 룸 초이스로 파트너를 선택합니다.</li>
                            <li><strong className="text-white">인사 (Greeting)</strong>: 파트너가 룸에 입장하여 셔츠로 환복하며 인사 시간을 갖습니다. (셔츠룸의 하이라이트)</li>
                            <li><strong className="text-white">음주가무</strong>: 파트너 옆에 착석하여 80분~90분 동안 즐거운 술자리를 갖습니다. 터치 마인드가 매우 오픈되어 있습니다.</li>
                            <li><strong className="text-white">연장 또는 마무리</strong>: TC 추가로 연장하거나, 계산 후 마무리합니다.</li>
                        </ol>
                    </ContentBlock>

                    {/* 4. FAQ */}
                    <div id="faq" className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Star className="text-blue-500" /> 서우실장의 이용 Tip
                            </h3>
                            <ul className="space-y-4 text-slate-300 font-light">
                                <li className="flex gap-3">
                                    <CheckCircle className="text-blue-500 w-5 h-5 flex-shrink-0" />
                                    <span><strong>이른 시간 방문</strong>: 저녁 7시~9시 사이에 방문하시면 '주대 할인 이벤트'가 적용되는 경우가 많습니다. 가성비를 노리신다면 일찍 오세요!</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-blue-500 w-5 h-5 flex-shrink-0" />
                                    <span><strong>비즈니스 접대</strong>: 미리 "중요한 손님이다"라고 언질만 주시면, 에이스급 매니저들을 최우선으로 배정하여 분위기를 확실하게 띄워드립니다.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-blue-900/10 p-8 rounded-2xl border border-blue-500/20">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <HelpCircle className="text-blue-500" /> 자주 묻는 질문 (FAQ)
                            </h3>
                            <div className="space-y-6">
                                {faqList.map((faq, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-blue-400 mb-1">Q. {faq.question}</p>
                                        <p className="text-slate-300 text-sm">A. {faq.answer}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 text-center">
                                <Link to="/suwon-shirt-shirtsroom-guide/faq" className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 font-bold transition-colors">
                                    수원 셔츠룸 FAQ 더 보기 <ChevronRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-blue-800 to-cyan-900 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">수원 비즈니스의 확실한 파트너</h2>
                        <p className="text-blue-100 mb-8 max-w-2xl mx-auto relative z-10">
                            접대 자리 때문에 고민하지 마세요.<br />
                            서우실장이 센스 있게 준비해 놓겠습니다.
                        </p>
                        <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-white text-blue-900 font-bold py-4 px-12 rounded-full shadow-lg hover:scale-105 transition-transform relative z-10 flex items-center gap-2 mx-auto">
                            <Phone fill="currentColor" size={20} /> 010-2626-4833 VIP 접대 예약
                        </button>
                    </div>

                    <RelatedServices />

                </div>
            </div>
        </>
    );
};

export default ShirtsRoom;
