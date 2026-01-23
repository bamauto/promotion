import React from 'react';
import { Helmet } from 'react-helmet-async';
import SchemaJsonLd, { generateServiceSchema, generateFAQSchema } from '../components/SchemaJsonLd';
import RelatedServices from '../components/RelatedServices';
import TableOfContents from '../components/TableOfContents';
import { Sparkles, CheckCircle, Phone, MapPin, DollarSign, Briefcase, Shirt, Info, Star, HelpCircle } from 'lucide-react';

const SectionTitle = ({ title, subtitle }) => (
    <div className="text-center mb-16 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl"></div>
        <span className="text-amber-400 font-bold tracking-[0.2em] text-sm md:text-base uppercase mb-3 animate-fade-in-up block">{subtitle}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 relative z-10 animate-fade-in-up delay-100 drop-shadow-sm">{title}</h1>
        <div className="w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent mx-auto mt-6"></div>
    </div>
);

const ContentBlock = ({ title, children, id }) => (
    <div id={id} className="mb-12 bg-slate-900/30 p-8 rounded-2xl border border-slate-800/50 backdrop-blur-sm hover:border-blue-500/20 transition-colors">
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
            {title}
        </h2>
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

const venues = {
    shirtsRoom: [
        {
            id: 's-1',
            name: '평촌 셔츠룸 A점',
            type: 'Original Shirts',
            location: '범계역 인근',
            price: '주대 18만원 이상 · TC 10만원 이상 (자세한 상담)',
            desc: '범계역 인근 클래식 셔츠룸. 깔끔한 응대와 흐트러짐 없는 동선.',
            features: ['클래식 무드', '빠른 세팅', '범계역 접근', '기본에 충실'],
            img: '/partner/sr-gallery-01.webp',
            imgAlt: '평촌 셔츠룸 범계역 추천',
        },
        {
            id: 's-2',
            name: '평촌 셔츠룸 B점',
            type: 'Model Line',
            location: '평촌역 인근',
            price: '주대 18만원 이상 · TC 10만원 이상 (자세한 상담)',
            desc: '평촌역 중심 모던 셔츠룸. 정돈된 인테리어와 빠른 초이스.',
            features: ['모던 인테리어', '초이스 중심', '평촌역 중심', '경쾌한 분위기'],
            img: '/partner/sr-gallery-02.webp',
            imgAlt: '평촌 셔츠룸 평촌역 추천',
        },
        {
            id: 's-3',
            name: '평촌 셔츠룸 C점',
            type: 'Business Casual',
            location: '인덕원역 인근',
            price: '주대 18만원 이상 · TC 10만원 이상 (자세한 상담)',
            desc: '인덕원역 주변 프라이빗 타입. 대화 중심으로 차분하게 즐기는 코스.',
            features: ['프라이빗 룸', '대화 중심', '인덕원역 인근', '차분한 코스'],
            img: '/partner/sr-gallery-03.webp',
            imgAlt: '평촌 셔츠룸 인덕원역 추천',
        },
        {
            id: 's-4',
            name: '평촌 셔츠룸 D점',
            type: 'Hard Core',
            location: '평촌역·평촌1번가 인근',
            price: '주대 18만원 이상 · TC 10만원 이상 (자세한 상담)',
            desc: '평촌역·평촌1번가 근처 캐주얼 라인. 가볍게 시작하고 싶은 분께 추천.',
            features: ['캐주얼 라인', '유연한 타임', '평촌역·평촌1번가 근처', '가벼운 시작'],
            img: '/partner/sr-gallery-01.webp',
            imgAlt: '평촌 셔츠룸 평촌역·평촌1번가 추천',
        }
    ]
};

const ShirtsRoom = () => {
    const faqList = [
    {
        question: "범계 로데오 셔츠룸, 강남과 수질 차이 있나요?",
        answer: "강남 업소 출신 매니저들이 범계로 많이 이동했습니다. 동일 수질에 가격은 30% 저렴하니 강남 대신 범계 로데오를 추천드립니다."
    },
    {
        question: "여자친구 생일에 커플로 방문해도 되나요?",
        answer: "평촌 셔츠룸은 여성 고객 40% 증가 추세입니다. 커플 동반·여성 모임 예약이 급증 중이며, '남자친구 생일 서프라이즈' 명소로 입소문 중입니다. 예약 시 '커플 방문'이라고 말씀해 주세요."
    },
    {
        question: "평촌역과 범계역 중 어디가 셔츠룸 많나요?",
        answer: "범계역 3~4번 출구 일대(로데오거리)에 집중되어 있습니다. 평촌역은 1번가 쪽에 조용한 라인 위주로 분포합니다. 목적에 따라 추천드리니 문의 주세요."
    },
    {
        question: "인덕원 IT회사 야근 후 늦은 시간 방문 가능한가요?",
        answer: "새벽 5시까지 영업하는 업소가 있습니다. 새벽 2시 이후 방문 시 '새벽 할인' 20%가 적용되며, 인덕원역까지 귀가 픽업도 제공합니다."
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
        "평촌 셔츠룸 예약 안내. 평촌역·평촌역·평촌1번가 중심, 주대 18만원 이상/TC 10만원 이상.",
        "https://pc-karaoke.com/pyeongchon-shirtsroom-guide",
        "180000"
    );

    const faqSchema = generateFAQSchema(faqList);

    return (
        <>
            <Helmet>
                <title>평촌 셔츠룸 예약 | 평촌역·평촌역·평촌1번가 추천</title>
                <meta name="description" content="평촌 셔츠룸 가이드. 평촌역·평촌역·평촌1번가 중심 정돈된 분위기, 프라이빗 룸 안내. 주대 18만원 이상, TC 10만원 이상, 상세 문의." />
                <meta name="keywords" content="평촌 셔츠룸, 평촌 셔츠룸 예약, 평촌 셔츠룸 가격, 평촌 하이퍼블릭" />
                <meta property="og:title" content="평촌 셔츠룸 예약 | 평촌역·평촌역·평촌1번가 추천" />
                <meta property="og:description" content="평촌 셔츠룸 가이드. 평촌역·평촌역·평촌1번가 중심 정돈된 분위기, 프라이빗 룸 안내. 주대 18만원 이상, TC 10만원 이상, 상세 문의." />
                <meta property="og:image" content="https://pc-karaoke.com/og-shirtsroom.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="평촌 셔츠룸 예약 | 평촌역·평촌역·평촌1번가 추천" />
                <meta property="twitter:description" content="평촌 셔츠룸 가이드. 평촌역·평촌역·평촌1번가 중심 정돈된 분위기, 프라이빗 룸 안내. 주대 18만원 이상, TC 10만원 이상, 상세 문의." />
                <meta property="twitter:image" content="https://pc-karaoke.com/og-shirtsroom.jpg" />
                <link rel="canonical" href="https://pc-karaoke.com/pyeongchon-shirtsroom-guide" />
            </Helmet>
            <SchemaJsonLd data={[serviceSchema, faqSchema]} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950">
                <div className="container mx-auto px-4 pb-12 max-w-6xl">
                    <SectionTitle title="평촌 셔츠룸 시스템 가이드" subtitle="White Shirt Fantasy" />

                    {/* Intro Text */}
                    <div className="mb-20 text-center max-w-4xl mx-auto">
                        <p className="text-xl text-slate-300 leading-relaxed font-light">평촌 셔츠룸은 평촌역·평촌역·평촌1번가 중심 라인업으로 구성됩니다.<br />정돈된 분위기와 빠른 초이스를 선호하시는 분께 적합합니다.<br />주대 18만원 이상·TC 10만원 이상 기준이며 상세 견적은 문의 부탁드립니다.</p>
                    </div>

                    <TableOfContents sections={sections} />

                    {/* 1. Definition & Concept */}
                    <ContentBlock id="definition" title="1. 평촌 셔츠룸의 트렌드">
                        <p>
                            셔츠룸은 일반적인 룸싸롱의 홀복 대신, <strong>흰색 와이셔츠</strong>만을 입은 매니저들이 서빙하는 컨셉 룸입니다.
                            초이스 후 룸 안에서 셔츠로 환복하는 퍼포먼스(인사 타임)가 시그니처이며, 핏된 셔츠 라인이 주는 시각적인 즐거움이 특징입니다.
                        </p>
                        <p>
                            <strong className="text-blue-400">평촌 셔츠룸 특이점</strong>: 최근 <strong className="text-white">여성 고객 40% 증가</strong> 추세!
                            범계 로데오거리의 트렌디한 분위기 덕분에 커플 동반·여성 모임 예약이 급증하고 있습니다.
                            강남 대비 30% 저렴한 가격에 동일 수질로, MZ세대 여성들의 "남자친구 생일 서프라이즈" 명소로 입소문 중.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-3">
                                <Shirt className="text-blue-500 w-8 h-8 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold mb-1">범계 로데오 트렌디</h4>
                                    <p className="text-sm text-slate-400">MZ세대 취향 저격 네온 인테리어</p>
                                </div>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-3">
                                <Briefcase className="text-blue-500 w-8 h-8 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-bold mb-1">여성 고객 40% 증가</h4>
                                    <p className="text-sm text-slate-400">커플·여성모임 서프라이즈 명소</p>
                                </div>
                            </div>
                        </div>
                    </ContentBlock>

                    {/* 2. Venue Recommendation */}
                    <div id="recommendation" className="mb-24">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1.5 h-8 bg-blue-500 rounded-full"></div>
                            <h2 className="text-3xl font-bold text-white">2. 평촌 셔츠룸 추천 업소</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {venues.shirtsRoom.map(venue => <VenueCard key={venue.id} venue={venue} />)}
                        </div>
                    </div>

                    {/* Gallery Section */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <Sparkles className="text-blue-500" /> 평촌 셔츠룸 갤러리
                        </h3>
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { src: '/partner/sr-gallery-01.webp', alt: '평촌 셔츠룸 프리미엄 매니저 - 평촌역·범계역 VIP 서비스' },
                                { src: '/partner/sr-gallery-02.webp', alt: '평촌 셔츠룸 최고급 파트너 - 평촌학원가 럭셔리 룸' },
                                { src: '/partner/sr-gallery-03.webp', alt: '평촌 셔츠룸 VIP 매니저 - 평촌 신도시 프리미엄' },
                            ].map((img, idx) => (
                                <div key={idx} className="aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group">
                                    <img src={img.src} alt={img.alt} title="평촌 셔츠룸 프리미엄 매니저" loading="lazy" width="300" height="400"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 3. System & Pricing */}
                    <ContentBlock id="system" title="3. 이용 시스템 및 가격 안내">
                        <p>
                            셔츠룸의 가장 큰 장점은 **'투명한 정찰제 가격'**입니다.
                            강남권보다 저렴하면서도 서비스 퀄리티는 유지하여 가성비를 중요시하는 분들께 인기가 많습니다.
                        </p>

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">A. 주대 및 TC (예상)</h4>
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
                                        <td className="py-3 px-4">주대 18만원 이상</td>
                                        <td className="py-3 px-4">12년산 양주 + 과일/마른안주 + 음료</td>
                                    </tr>
                                    <tr className="border-b border-slate-800">
                                        <td className="py-3 px-4 font-bold text-white">매니저 TC</td>
                                        <td className="py-3 px-4">TC 10만원 이상</td>
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

                        <h4 className="text-xl font-bold text-white mt-8 mb-4">B. 진행 순서</h4>
                        <ol className="list-decimal pl-5 space-y-2 marker:text-blue-500">
                            <li><strong>초이스</strong>: 미러 초이스 또는 룸 초이스로 파트너를 선택합니다.</li>
                            <li><strong>인사 (Greeting)</strong>: 파트너가 룸에 입장하여 셔츠로 환복하며 인사 시간을 갖습니다. (셔츠룸의 하이라이트)</li>
                            <li><strong>음주가무</strong>: 파트너 옆에 착석하여 1시간~1시간 30분 동안 즐거운 술자리를 갖습니다. 터치 마인드가 매우 오픈되어 있습니다.</li>
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
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="bg-gradient-to-r from-blue-800 to-cyan-900 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30"></div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10">평촌 비즈니스의 확실한 파트너</h2>
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
