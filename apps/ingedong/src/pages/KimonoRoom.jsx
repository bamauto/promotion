import React from 'react';
import { Helmet } from 'react-helmet-async';
import SchemaJsonLd, { generateServiceSchema, generateFAQSchema } from '../components/SchemaJsonLd';
import RelatedServices from '../components/RelatedServices';
import TableOfContents from '../components/TableOfContents';
import { Sparkles, CheckCircle, Phone, MapPin, DollarSign, CloudRain, Star, HelpCircle, Utensils, Flower2 } from 'lucide-react';

const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-red-500/10 rounded-full blur-2xl"></div>
        <span className="text-amber-400 font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-3 animate-fade-in-up block">{subtitle}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-red-100 to-red-300 relative z-10 animate-fade-in-up delay-100 drop-shadow-sm">{title}</h1>
        <div className="w-1 h-12 bg-gradient-to-b from-red-500 to-transparent mx-auto mt-6"></div>
    </div>
);

const ContentBlock = ({ title, children, id }) => (
    <div id={id} className="mb-12 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 backdrop-blur-sm hover:border-red-500/20 transition-colors">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-red-500 rounded-full"></div>
            {title}
        </h2>
        <div className="text-slate-300 leading-relaxed text-lg font-light space-y-4">
            {children}
        </div>
    </div>
);

const VenueCard = ({ venue }) => (
    <article className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-700/50 rounded-2xl overflow-hidden hover:border-red-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] hover:-translate-y-2 flex flex-col h-full">
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
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-red-600 to-red-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase shadow-lg tracking-wider">
                {venue.type}
            </div>
        </div>

        <div className="p-8 relative flex flex-col flex-grow">
            <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">{venue.name}</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed bg-slate-950/50 p-4 rounded-lg border border-slate-800">{venue.desc}</p>

            <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <MapPin className="text-red-500 w-4 h-4" /> {venue.location}
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300">
                    <DollarSign className="text-red-500 w-4 h-4" /> {venue.price}
                </div>
            </div>

            <div className="mb-6 space-y-2 flex-grow">
                <div className="flex flex-wrap gap-2">
                    {venue.features.map((feat, idx) => (
                        <span key={idx} className="text-xs font-medium bg-slate-800/50 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                            <CheckCircle size={10} className="text-red-500" /> {feat}
                        </span>
                    ))}
                </div>
            </div>

            <button
                onClick={() => window.location.href = 'tel:01026264833'}
                className="w-full bg-slate-800 hover:bg-red-600 text-white hover:text-white py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
                <Phone size={18} className="group-hover/btn:animate-bounce" />
                <span className="tracking-widest text-sm">코스튬 예약 문의</span>
            </button>
        </div>
    </article>
);

import venueImg1 from '../assets/venue-img-6.webp';
import venueImg2 from '../assets/venue-img-12.webp';

const venues = {
    kimonoRoom: [
        {
            id: 'km-1',
            name: '인계동 프리미엄 기모노룸',
            type: 'Kimono Costume',
            location: '인계동 권선동역 2번 출구',
            price: '코스 요리 포함',
            desc: '화려한 기모노와 유카타를 입은 매니저들의 이색적인 서비스를 경험할 수 있는 테마 룸살롱. 정갈한 사케와 함께 기억에 남는 특별한 시간을 선사합니다.',
            features: ['기모노 의상', '사케 소믈리에', '프리미엄 안주', '의전 서비스'],
            img: venueImg1,
            imgAlt: '인계동 프리미엄 기모노룸 인테리어'
        },
        {
            id: 'km-2',
            name: '인계동 퓨전 기모노룸',
            type: 'Modern Fusion',
            location: '인계동 영통역 5번 출구',
            price: '사케 무제한',
            desc: '현대적인 감각으로 재해석한 퓨전 기모노 바. 트렌디한 인테리어와 개량 기모노를 입은 매니저들의 활기찬 서비스를 즐길 수 있습니다. 젊은 층에게 인기가 높습니다.',
            features: ['퓨전 인테리어', '이자카야 안주', '개량 기모노', '네온 사인 포토존'],
            img: venueImg2,
            imgAlt: '인계동 퓨전 기모노룸 인테리어'
        }
    ]
};

const KimonoRoom = () => {
    const faqList = [
        {
            question: "옷이 불편해서 잘 못 놀지 않나요?",
            answer: "걱정하지 마세요. 개량된 퓨전 기모노라 활동성이 좋으며, 오히려 살짝 노출된 라인이 더욱 매혹적입니다."
        },
        {
            question: "일본어를 해야 하나요?",
            answer: "아닙니다. (웃음) 컨셉만 일본풍일 뿐, 전원 한국인 매니저이며 의사소통에 전혀 문제 없습니다."
        },
        {
            question: "안주는 일식만 나오나요?",
            answer: "기본 과일안주 외에도 튀김, 탕 등 간단한 안주가 준비되어 있으며, 배달 음식도 허용됩니다."
        }
    ];

    const sections = [
        { id: "definition", title: "1. 기모노룸의 매력" },
        { id: "recommendation", title: "2. 추천 업소" },
        { id: "system", title: "3. 이용 시스템 및 서비스" },
        { id: "faq", title: "4. 이용 꿀팁 및 FAQ" }
    ];

    const serviceSchema = generateServiceSchema(
        "Kimono Room",
        "인계동 기모노룸 예약 및 가격. 기모노 의상 테마의 이색 프리미엄 룸살롱.",
        "https://ingedongkaraoke.com/ingedong-kimono-room-guide",
        "160000"
    );

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>기모노 라운지 문화 탐색 | 인계동 테마 경험 가이드</title>
                <meta name="description" content="기모노 테마 라운지 경험 완벽 가이드 | 컨셉 이해·분위기·가격·이용 방법 비교 | 테마 라운지 문화 탐색 | 색다른 경험을 위한 선택 팁" />
                <meta name="keywords" content="인계동 기모노룸, 테마 라운지, 문화 경험, 특색 있는 바, 이색 체험, 라운지 컨셉, 테마별 라운지, 새로운 경험, 라운지 선택, 특별한 밤" />
                <meta property="og:title" content="인계동 기모노 라운지 문화 가이드 | 테마 경험" />
                <meta property="og:description" content="테마 라운지 문화 이해 | 컨셉 비교 | 이용 가이드" />
                <meta property="og:image" content="https://ingedongkaraoke.com/og-kimono-room.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="인계동 기모노 라운지 문화 가이드" />
                <meta property="twitter:description" content="테마 라운지 경험 | 컨셉 이해 | 이용 팁" />
                <meta property="twitter:image" content="https://ingedongkaraoke.com/og-kimono-room.jpg" />
                <link rel="canonical" href="https://ingedongkaraoke.com/ingedong-kimono-room-guide" />
            </Helmet>
            <SchemaJsonLd data={[serviceSchema, faqSchema]} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950">
                <div className="container mx-auto px-4 pb-12 max-w-6xl">
                    <SectionTitle title="인계동 기모노룸 가이드" subtitle="Exotic Atmosphere" />

                    {/* Intro Text */}
                    <div className="mb-20 text-center max-w-4xl mx-auto">
                        <p className="text-xl text-slate-300 leading-relaxed font-light">
                            인계동 도심 속에서 만나는 <strong className="text-rose-400">작은 일본</strong>.<br />
                            화려한 기모노와 유카타를 입은 매니저들이 선사하는<br />
                            이색적인 서비스로 특별한 추억을 만들어 보세요.
                        </p>
                    </div>

                    <TableOfContents sections={sections} />

                    {/* 1. Definition */}
                    <ContentBlock id="definition" title="1. 기모노룸의 매력">
                        <p>
                            기모노룸은 <span className="text-rose-400 font-bold">일본 전통 의상</span>을 테마로 한 이색 룸살롱입니다.
                            매니저들이 화려한 기모노와 유카타를 착용하고 서비스를 제공하여, 일상에서 벗어난 특별한 분위기를 연출합니다.
                        </p>
                        <p>
                            가장 큰 차별점은 역시 <strong>의상(Costume)</strong>입니다. 매니저들이 화려한 색감의 기모노나 유카타를 입고 의전 서비스를 제공하며,
                            마치 일본 여행을 온 듯한 착각을 불러일으킵니다. 중요 바이어 접대나 기억에 남는 파티 장소로 강력 추천하는 <strong>인계동의 히든 플레이스</strong>입니다.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-center gap-3">
                                <span className="text-rose-500 font-bold text-lg">Theme</span>
                                <span className="text-slate-300">기모노 & 유카타 의상</span>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-center gap-3">
                                <span className="text-rose-500 font-bold text-lg">Costume</span>
                                <span className="text-slate-300">기모노 & 유카타 착용</span>
                            </div>
                        </div>
                    </ContentBlock>

                    {/* 2. Recommendations */}
                    <div id="recommendation" className="mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-8 bg-rose-500 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white">2. 인계동 기모노룸 추천 목록</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                            {venues.kimonoRoom.map(venue => <VenueCard key={venue.id} venue={venue} />)}
                        </div>
                    </div>

                    {/* 3. System & Pricing */}
                    <ContentBlock id="system" title="3. 이용 시스템 및 서비스">
                        <p>
                            기본적인 시스템은 퍼블릭과 유사하나, <strong>'의전 서비스'</strong>에 더욱 특화되어 있습니다.
                            술을 따르는 예법이나 대화를 이끌어가는 매너 등에서 일본 특유의 섬세한 접대 문화를 느끼실 수 있습니다.
                        </p>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">A. 주대 안내 (Pricing)</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse mt-2">
                                <thead>
                                    <tr className="border-b border-slate-700 text-red-400">
                                        <th className="py-3 px-4">항목</th>
                                        <th className="py-3 px-4">가격</th>
                                        <th className="py-3 px-4">내용</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">기본 양주 SET</td>
                                        <td className="py-3 px-4">160,000원 ~</td>
                                        <td className="py-3 px-4">임페리얼/골든블루 + 과일안주 + 음료</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">사케 SET</td>
                                        <td className="py-3 px-4">별도 문의</td>
                                        <td className="py-3 px-4">준마이, 다이긴죠 등 고급 사케 구비</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">TC (매니저)</td>
                                        <td className="py-3 px-4">130,000원 (80분)</td>
                                        <td className="py-3 px-4">기모노 착용 및 스타일링 비용 포함</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">B. 특별 서비스</h4>
                        <ul className="list-disc pl-5 space-y-2 marker:text-red-500">
                            <li><strong>기모노 쇼</strong>: 중간 타임에 간단한 인사 및 포토 타임이 진행될 수 있습니다. (업소 상황에 따라 다름)</li>
                            <li><strong>러브샷 이벤트</strong>: 분위기를 띄우기 위한 기모노룸만의 특별한 술자리 게임이 준비되어 있습니다.</li>
                        </ul>
                    </ContentBlock>

                    {/* 4. FAQ */}
                    <div id="faq" className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <Star className="text-red-500" /> 서우실장의 이용 Tip
                            </h3>
                            <ul className="space-y-4 text-slate-300 font-light">
                                <li className="flex gap-3">
                                    <CheckCircle className="text-red-500 w-5 h-5 flex-shrink-0" />
                                    <span><strong>접대 장소로 추천</strong>: 이색적인 분위기 덕분에 접대 성공률이 매우 높습니다. 뻔한 곳이 지겨운 바이어 분들에게 강력 추천합니다.</span>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-red-500 w-5 h-5 flex-shrink-0" />
                                    <span><strong>예약 필수</strong>: 기모노 복장 특성상 환복 및 준비 시간이 필요하므로, 최소 1시간 전 예약을 해주시면 더욱 완벽하게 모실 수 있습니다.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-red-900/10 p-8 rounded-2xl border border-red-500/20">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <HelpCircle className="text-red-500" /> 자주 묻는 질문 (FAQ)
                            </h3>
                            <div className="space-y-6">
                                {faqList.map((faq, index) => (
                                    <div key={index}>
                                        <p className="font-bold text-red-400 mb-1">Q. {faq.question}</p>
                                        <p className="text-slate-300 text-sm">A. {faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-red-800 to-orange-900 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/shattered-island.png')] opacity-30"></div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">지루한 일상에 색다른 파격을</h2>
                        <p className="text-red-100 mb-8 max-w-2xl mx-auto relative z-10">
                            경험해보지 못한 새로운 즐거움.<br />
                            인계동 기모노룸에서 잊지 못할 추억을 만들어 드립니다.
                        </p>
                        <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-white text-red-900 font-bold py-4 px-12 rounded-full shadow-lg hover:scale-105 transition-transform relative z-10 flex items-center gap-2 mx-auto">
                            <Phone fill="currentColor" size={20} /> 010-2626-4833 테마 룸 예약
                        </button>
                    </div>

                    <RelatedServices />

                </div>
            </div>
        </>
    );
};

export default KimonoRoom;
