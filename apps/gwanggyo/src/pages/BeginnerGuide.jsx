import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SchemaJsonLd, { generateServiceSchema } from '../components/SchemaJsonLd'; // HowTo schema logic will be inline for now as it's unique
import { Phone, Users, GlassWater, Wallet, CheckCircle, ArrowRight } from 'lucide-react';

const BeginnerGuide = () => {
    // Basic HowTo Schema Construction
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "광교 유흥업소(룸) 처음 이용하는 방법 가이드",
        "description": "광교 하이퍼블릭, 룸살롱 등 유흥업소를 처음 방문하는 초보자를 위한 단계별 이용 가이드입니다. 예약부터 결제까지 상세 과정을 안내합니다.",
        "step": [
            {
                "@type": "HowToStep",
                "name": "전화 예약 및 견적 문의",
                "text": "방문 전 담당 실장에게 전화를 걸어 인원수, 방문 시간, 원하는 스타일(업종)을 말하고 견적을 확인합니다.", (광교 상권 기준)
                "image": "https://gwanggyokaraoke.com/step1-call.jpg",
                "url": "https://gwanggyokaraoke.com/gwanggyo-entertainment-beginner-guide#step1"
            },
            {
                "@type": "HowToStep",
                "name": "업소 방문 및 룸 배정",
                "text": "약속된 시간에 업소에 도착하여 담당 실장을 찾습니다. 인원에 맞는 룸으로 안내받습니다.", (광교 상권 기준)
                "image": "https://gwanggyokaraoke.com/step2-room.jpg",
                "url": "https://gwanggyokaraoke.com/gwanggyo-entertainment-beginner-guide#step2"
            },
            {
                "@type": "HowToStep",
                "name": "초이스(Choice) 진행",
                "text": "담당 실장이 매니저들을 보여드립니다(매직미러 또는 조별 입장). 마음에 드는 파트너를 선택합니다.", (광교 상권 기준)
                "image": "https://gwanggyokaraoke.com/step3-choice.jpg",
                "url": "https://gwanggyokaraoke.com/gwanggyo-entertainment-beginner-guide#step3"
            },
            {
                "@type": "HowToStep",
                "name": "음주가무 및 파트너 케어",
                "text": "정해진 시간 동안 술과 노래를 즐기며 파트너와 즐거운 시간을 보냅니다.", (광교 상권 기준)
                "image": "https://gwanggyokaraoke.com/step4-party.jpg",
                "url": "https://gwanggyokaraoke.com/gwanggyo-entertainment-beginner-guide#step4"
            },
            {
                "@type": "HowToStep",
                "name": "계산 및 귀가",
                "text": "시간이 종료되면 계산서를 확인하고 결제합니다. 대리운전이나 픽업 차량을 요청하여 안전하게 귀가합니다.", (광교 상권 기준)
                "image": "https://gwanggyokaraoke.com/step5-pay.jpg",
                "url": "https://gwanggyokaraoke.com/gwanggyo-entertainment-beginner-guide#step5"
            }
        ]
    };

    return (
        <>
            <Helmet>
                <title>광교 가라오케·하이퍼블릭 초보 가이드</title>
                <meta name="description" content="광교 초보 고객을 위한 예약·픽업·예산 가이드. 광교중앙역·광교호수공원 중심 이용 팁, 주대 18만원 이상, TC 10만원 이상 기준으로 안내합니다." />
                <meta name="keywords" content="광교 가라오케 초보, 광교 하이퍼블릭 가이드, 광교 유흥 이용법" />
                <meta property="og:title" content="광교 가라오케·하이퍼블릭 초보 가이드" />
                <meta property="og:description" content="광교 초보 고객을 위한 예약·픽업·예산 가이드. 광교중앙역·광교호수공원 중심 이용 팁, 주대 18만원 이상, TC 10만원 이상 기준으로 안내합니다." />
                <meta property="og:image" content="https://gwanggyokaraoke.com/og-beginner.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="광교 초보 이용 가이드" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="광교 가라오케·하이퍼블릭 초보 가이드" />
                <meta property="twitter:description" content="광교 초보 고객을 위한 예약·픽업·예산 가이드. 광교중앙역·광교호수공원 중심 이용 팁, 주대 18만원 이상, TC 10만원 이상 기준으로 안내합니다." />
                <meta property="twitter:image" content="https://gwanggyokaraoke.com/og-beginner.jpg" />
                <link rel="canonical" href="https://gwanggyokaraoke.com/gwanggyo-entertainment-beginner-guide" />
            </Helmet>
            <SchemaJsonLd data={howToSchema} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950 px-4 pb-20">
                <div className="container mx-auto max-w-4xl">

                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-6">
                            유흥 초보 탈출 가이드
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">광교 초보 고객을 위한 시작 가이드입니다. 광교중앙역·광교호수공원 기준 동선/예약 팁과 주대 18만원 이상·TC 10만원 이상 기준을 안내합니다.</p>
                    </div>

                    {/* Steps Container */}
                    <div className="relative border-l-2 border-slate-800 ml-4 md:ml-10 space-y-16">

                        {/* Step 1 */}
                        <div className="relative pl-8 md:pl-12" id="step1">
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="text-cyan-400">Step 01.</span> 예약 및 문의 (광교 상권 기준)
                                </h2>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="bg-slate-800 p-4 rounded-xl text-cyan-400">
                                        <Phone size={32} />
                                    </div>
                                    <div>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            가장 중요한 단계입니다. 무작정 찾아가기(워킹) 보다는 전화를 하세요. (광교 상권 기준)
                                            "오늘 2명 가려는데 견적 얼마인가요?" 라고 솔직하게 물어보는 게 좋습니다.
                                        </p>
                                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-700 text-sm md:text-base">
                                            <p className="text-slate-500 mb-2 font-bold">💡 실전 멘트: (광교 상권 기준)</p>
                                            <p className="text-white">"서우실장님 계신가요? 인터넷 보고 연락드렸는데요. 오늘 10시쯤 3명 갈 건데 하이퍼블릭 룸 있나요?"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative pl-8 md:pl-12" id="step2">
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="text-cyan-400">Step 02.</span> 입장 및 초이스 (광교 상권 기준)
                                </h2>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="bg-slate-800 p-4 rounded-xl text-cyan-400">
                                        <Users size={32} />
                                    </div>
                                    <div>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            룸에 안내받으면 매니저들이 들어옵니다. 내 스타일인 친구를 고르세요. (광교 상권 기준)
                                            너무 고민되면 담당 실장에게 "청순한 스타일 추천해주세요"라고 도움을 요청하세요. (광교 상권 기준)
                                        </p>
                                        <ul className="space-y-2 text-sm text-slate-400">
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500" /> 마음에 들면 번호를 부르거나 손을 드세요. (광교 상권 기준)</li>
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500" /> 마음에 드는 아가씨가 없다면 "다음 조 볼게"라고 하세요. (광교 상권 기준)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative pl-8 md:pl-12" id="step3">
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="text-cyan-400">Step 03.</span> 즐기기 (Table Time) (광교 상권 기준)
                                </h2>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="bg-slate-800 p-4 rounded-xl text-cyan-400">
                                        <GlassWater size={32} />
                                    </div>
                                    <div>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            파트너가 옆에 앉으면 가볍게 인사하고 술을 한 잔 권하세요.
                                            <br />매너 있는 손님이 대우받습니다. 기본적인 스킨십은 자연스럽게 가능하지만, 무리한 요구는 분위기를 망칩니다. (광교 상권 기준)
                                        </p>
                                        <div className="bg-amber-900/20 p-3 rounded border border-amber-600/30 text-amber-200 text-sm">
                                            ⚠️ <strong>주의:</strong> 담당 실장 몰래 '2차' 등을 제안하는 것은 금물입니다. 문제 발생 시 책임지지 않습니다. (광교 상권 기준)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="relative pl-8 md:pl-12" id="step4">
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="text-cyan-400">Step 04.</span> 계산 및 마무리 (광교 상권 기준)
                                </h2>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="bg-slate-800 p-4 rounded-xl text-cyan-400">
                                        <Wallet size={32} />
                                    </div>
                                    <div>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            시간이 끝나가면 웨이터나 실장이 알려줍니다. 광교 상권 기준에 맞춰 연장할지 마무리할지 결정하세요.
                                            계산서는 꼼꼼히 확인하시고, 술 취해서 지갑이나 휴대폰을 두고 가지 않도록 챙기세요. (광교 상권 기준)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-20 text-center">
                        <h2 className="text-2xl font-bold text-white mb-8">이제 실전입니다! (광교 상권 기준)</h2>
                        <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-white text-slate-900 hover:bg-slate-200 font-bold py-5 px-16 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center gap-3 mx-auto text-xl animate-pulse">
                            <Phone fill="currentColor" size={24} /> 서우실장에게 전화하기
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default BeginnerGuide;
