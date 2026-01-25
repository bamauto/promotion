import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SchemaJsonLd, { generateServiceSchema, generateFAQSchema } from '../components/SchemaJsonLd';
import RelatedServices from '../components/RelatedServices';
import TableOfContents from '../components/TableOfContents';
import { Star, Clock, GlassWater, Users, Sparkles, CheckCircle, Phone, MapPin, DollarSign, HelpCircle, Zap, ChevronRight } from 'lucide-react';

const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
        <span className="text-amber-400 font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-3 animate-fade-in-up block">{subtitle}</span>
        <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 relative z-10 animate-fade-in-up delay-100 drop-shadow-sm">{title}</h2>
        <div className="w-1 h-12 bg-gradient-to-b from-amber-500 to-transparent mx-auto mt-6"></div>
    </div>
);

const ContentBlock = ({ title, children, id }) => (
    <div id={id} className="mb-12 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 backdrop-blur-sm hover:border-amber-500/20 transition-colors">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>
            {title}
        </h3>
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

import venueImg1 from '../assets/venue-img-7.webp';
import venueImg2 from '../assets/venue-img-3.webp';

const venues = {
    hyperPublic: [
        {
            id: 'hp-1',
            name: '수원 하이퍼블릭 프리미엄',
            type: 'Premium High-End',
            location: '수원역 인근',
            price: '주대 18만원 이상 · TC 10만원 이상, 상담 후 확정',
            desc: '수원역 중심의 감각적인 하이퍼블릭. 수원·인계동 직장인의 조용한 접대/술자리에 맞춘 프라이빗 라운지.',
            features: ['프라이빗 예약', '조용한 라운지', '수원역 접근', '비즈니스 동선'],
            img: venueImg1,
            imgAlt: '수원 하이퍼블릭 수원역 추천',
        },
        {
            id: 'hp-2',
            name: '인계동 하이퍼블릭 라운지',
            type: 'Mega Size',
            location: '인계동 상권 인근',
            price: '주대 18만원 이상 · TC 10만원 이상, 상담 후 확정',
            desc: '인계동 상권 인근 대형 구성. 카페거리 무드 분위기와 파티형 세팅으로 단체 모임에 적합.',
            features: ['대형 룸', '파티 조명', '인계동 상권 중심', '단체 환영'],
            img: venueImg2,
            imgAlt: '수원 하이퍼블릭 인계동 상권 추천',
        }
    ]
};

const HyperPublic = () => {
    const faqList = [
    {
        question: "수원 하이퍼블릭 1인 방문도 가능한가요?",
        answer: "네, 가능합니다. 인계동 상권은 수원·인계동 직장인 이용이 많아 감각적인 응대로 1:1 시작도 부담 없이 안내합니다."
    },
    {
        question: "수원 하이퍼블릭 픽업은 어디까지 지원되나요?",
        answer: "픽업은 수원역, 인계동 상권, 삼성 디지털시티, 인계동 중심으로 운영됩니다. 정확한 동선은 예약 시 조율해 드립니다."
    },
    {
        question: "수원 하이퍼블릭 주대/TC 기준이 궁금해요.",
        answer: "주대 18만원 이상, TC 10만원 이상 기준이며 시간·코스·인원에 따라 달라질 수 있습니다. 상세는 문의 부탁드립니다."
    }
];

    const sections = [
        { id: "definition", title: "1. 하이퍼블릭이란?" },
        { id: "recommendation", title: "2. 추천 업소 TOP 2" },
        { id: "system", title: "3. 이용 시스템 및 가이드" },
        { id: "faq", title: "4. 이용 꿀팁 및 FAQ" }
    ];

    const serviceSchema = generateServiceSchema(
        "HyperPublic Club",
        "수원 하이퍼블릭 예약 안내. 수원역·인계동 상권 중심 픽업, 주대 18만원 이상/TC 10만원 이상.",
        "https://suwonshirt.com/suwon-shirt-highpub-guide",
        "180000"
    );

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>수원 하이퍼블릭 | 수원역 프라이빗 라운지 완벽 가이드</title>
                <meta name="description" content="수원 하이퍼블릭 완전 가이드. 수원역 중심 프라이빗 프리미엄 라운지. 수원·인계동 직장인 조용한 접대·비즈니스 술자리 맞춤. 상담 010-2626-4833" />
                <meta name="keywords" content="수원 하이퍼블릭, 수원 하이퍼블릭 예약, 수원 하이퍼블릭 가격, 수원 가라오케, 수원 룸살롱" />
                <meta property="og:title" content="수원 하이퍼블릭 | 수원역 프라이빗 라운지 완벽 가이드" />
                <meta property="og:description" content="수원 하이퍼블릭 완전 가이드. 수원역 중심 프라이빗 프리미엄 라운지. 수원·인계동 직장인 조용한 접대·비즈니스 술자리 맞춤. 상담 010-2626-4833" />
                <meta property="og:image" content="https://suwonshirt.com/og-highpub.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="수원 하이퍼블릭 예약 가이드" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="수원 하이퍼블릭 | 수원역 프라이빗 라운지 완벽 가이드" />
                <meta property="twitter:description" content="수원 하이퍼블릭 완전 가이드. 수원역 중심 프라이빗 프리미엄 라운지. 수원·인계동 직장인 조용한 접대·비즈니스 술자리 맞춤. 상담 010-2626-4833" />
                <meta property="twitter:image" content="https://suwonshirt.com/og-highpub.jpg" />
                <link rel="canonical" href="https://suwonshirt.com/suwon-shirt-highpub-guide" />
            </Helmet>
            <SchemaJsonLd data={[serviceSchema, faqSchema]} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950">
                <div className="container mx-auto px-4 pb-12 max-w-6xl">
                    <SectionTitle title="수원 프라이빗 펍 완벽 가이드" subtitle="선택과 이해" />

                    {/* Intro Text */}
                    <div className="mb-20 text-center max-w-4xl mx-auto">
                        <p className="text-xl text-slate-300 leading-relaxed font-light">수원 하이퍼블릭은 수원역·인계동 상권 중심으로 수원·인계동 직장인 맞춤 코스를 제공합니다.<br />감각적인 무드의 프라이빗 룸과 안정적인 동선, 주대 18만원 이상·TC 10만원 이상 기준으로 안내합니다.<br />상세 견적은 문의 부탁드립니다.</p>
                    </div>

                    <TableOfContents sections={sections} />

                    {/* 1. Definition & Features */}
                    <ContentBlock id="definition" title="1. 프라이빗 펍 문화 이해하기">
                        <p>
                            <strong>프라이빗 펍(Private Pub)</strong> 또는 하이퍼블릭은 2010년대 중반 강남에서 시작된
                            새로운 유형의 <strong>프라이빗 라운지 문화</strong>를 지칭합니다.
                        </p>
                        <p>
                            기존 펍(Pub)이 오픈된 바 카운터 중심이었다면, 프라이빗 펍은 독립된 룸 문화를 도입한 것이 특징입니다.
                            모던한 인테리어와 선택형 시스템을 결합하여, 수원 지역에서는 2015년경부터 급성장했으며
                            현재 수원역권과 카페거리 일대에 다양한 업소가 운영 중입니다.
                        </p>
                        <p>
                            더 화끈한 분위기를 원하신다면 <Link to="/suwon-shirt-karaoke-guide" className="text-amber-400 hover:text-amber-300 underline">수원 가라오케</Link>를, 비즈니스 접대가 목적이라면 <Link to="/suwon-shirt-room-salon-guide" className="text-amber-400 hover:text-amber-300 underline">수원 룸살롱</Link>을 추천드립니다.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                                <Sparkles className="mx-auto text-amber-500 mb-2" />
                                <div className="font-bold text-white">다양한 스타일</div>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                                <DollarSign className="mx-auto text-amber-500 mb-2" />
                                <div className="font-bold text-white">투명한 가격 구조</div>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 text-center">
                                <Users className="mx-auto text-amber-500 mb-2" />
                                <div className="font-bold text-white">취향 기반 선택</div>
                            </div>
                        </div>
                    </ContentBlock>

                    {/* 2. Venue Recommendations */}
                    <div id="recommendation" className="mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white">2. 수원 하이퍼블릭 추천 TOP 2</h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                            {venues.hyperPublic.map(venue => <VenueCard key={venue.id} venue={venue} />)}
                        </div>

                        {/* Gallery Section */}
                        <div className="mt-16">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <Sparkles className="text-amber-500" /> 수원 하이퍼블릭 갤러리
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { src: '/partner/hp-gallery-01.webp', alt: '수원 하이퍼블릭 프리미엄 인테리어 - 인계동 럭셔리 룸' },
                                    { src: '/partner/hp-gallery-02.webp', alt: '수원 하이퍼블릭 VIP 매니저 - 수원 서우실장 추천' },
                                    { src: '/partner/hp-gallery-03.webp', alt: '수원 하이퍼블릭 최고급 파트너 - 수원역권 인근' },
                                    { src: '/partner/hp-gallery-04.webp', alt: '수원 하이퍼블릭 프리미엄 서비스 - 인계동 24시간' },
                                ].map((img, idx) => (
                                    <div key={idx} className="aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 hover:border-amber-500/50 transition-all duration-300 group">
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            title="수원 하이퍼블릭 프리미엄 매니저"
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

                    {/* 3. System Guide */}
                    <ContentBlock id="system" title="3. 이용 시스템 및 가이드">
                        <p>
                            수원 하이퍼블릭을 처음 방문하시나요? 투명한 이용을 위해 기본적인 시스템을 안내해 드립니다. 대부분의 업소가 비슷한 룰을 따르고 있으나, <strong>서우실장</strong>을 통해 예약하시면 더욱 특별한 혜택을 받으실 수 있습니다.
                        </p>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">A. 초이스 시스템 (Choice)</h4>
                        <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
                            <li><strong>매직미러 초이스</strong>: 룸 안에서 유리를 통해 밖의 매니저들을 보며 초이스하는 시스템이 대세입니다. 매니저들은 고객을 볼 수 없어, 고객님은 더욱 편안하게 이상형을 고르실 수 있습니다.</li>
                            <li><strong>조별 초이스</strong>: 5~10명씩 조를 이루어 룸으로 입장하여 인사를 드립니다. 마음에 드는 매니저가 있다면 그 자리에서 바로 앉히시면 됩니다.</li>
                            <li><strong>무한 초이스</strong>: 마음에 드는 매니저가 있을 때까지, 횟수 제한 없이 초이스를 보여드립니다. 서우실장의 능력은 여기서 발휘됩니다.</li>
                        </ul>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">B. 타임 및 로테이션</h4>
                        <ul className="list-disc pl-5 space-y-2 marker:text-amber-500">
                            <li>기본 타임은 <strong>80분 ~ 90분</strong> 기준입니다.</li>
                            <li>연장(T/C) 시 1시간 단위로 추가됩니다.</li>
                            <li>하이퍼블릭은 <strong>고정(묶음)</strong>이 가능하여, 파트너가 중간에 방을 옮기지 않고 끝까지 고객님만 케어하도록 할 수 있습니다. (예약 시 문의 필수)</li>
                        </ul>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">C. 주대 및 가격 (Pricing)</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse mt-2">
                                <thead>
                                    <tr className="border-b border-slate-700 text-amber-500">
                                        <th className="py-3 px-4">항목</th>
                                        <th className="py-3 px-4">내용</th>
                                        <th className="py-3 px-4">비고</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold">기본 주대</td>
                                        <td className="py-3 px-4">12년산 위스키 + 과일안주 + 맥주/음료</td>
                                        <td className="py-3 px-4">현금가 기준 할인 가능, 시간대별 상이</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold">봉사료 (T/C)</td>
                                        <td className="py-3 px-4">매니저 1인당 타임비</td>
                                        <td className="py-3 px-4">주대 18만원 이상 (업소별 상이)</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold">웨이터 팁 (W/T)</td>
                                        <td className="py-3 px-4">룸 담당 서빙 봉사료</td>
                                        <td className="py-3 px-4">현장 안내</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </ContentBlock>

                    {/* 4. Tips & FAQ */}
                    <div id="faq" className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Star className="text-amber-500" /> 서우실장의 이용 꿀팁
                            </h3>
                            <ol className="list-decimal pl-5 space-y-4 text-slate-300 marker:text-amber-500 font-light">
                                <li><strong className="text-white">피크타임 피하기</strong>: 밤 10시~12시는 가장 붐비는 시간입니다. 8~9시 일찍 오시거나, 1시 이후 늦은 시간에 오시면 훨씬 좋은 수질의 매니저들을 여유롭게 보실 수 있습니다.</li>
                                <li><strong className="text-white">예약은 필수</strong>: 워킹(예약 없이 방문) 방문 시 대기 시간이 길어지거나, 좋은 방을 배정받기 어렵습니다. 출발 전 전화 한 통으로 룸과 매니저 현황을 체크하세요.</li>
                                <li><strong className="text-white">취향 확실히 말하기</strong>: "알아서 해주세요" 보다는 "청순한 스타일", "대화가 잘 통하는 스타일", "술 잘 마시는 스타일" 등 구체적으로 말씀해 주시면 내상 확률이 0%가 됩니다.</li>
                            </ol>
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
                                <Link to="/suwon-shirt-highpub-guide/faq" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 font-bold transition-colors">
                                    수원 더 많은 질문과 답변 보기 <ChevronRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">오늘 밤, 수원에서 최고의 주인공이 되어보세요</h2>
                        <p className="text-amber-100 mb-8 max-w-2xl mx-auto relative z-10">
                            고민은 즐거움만 늦출 뿐입니다. 지금 바로 전화주세요.<br />
                            수원 No.1 서우실장이 책임지고 모시겠습니다.
                        </p>
                        <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-white text-amber-800 font-bold py-4 px-12 rounded-full shadow-lg hover:scale-105 transition-transform relative z-10 flex items-center gap-2 mx-auto">
                            <Phone fill="currentColor" size={20} /> 010-2626-4833 예약하기
                        </button>
                    </div>

                    <RelatedServices />

                </div>
            </div >
        </>
    );
};

export default HyperPublic;
