import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import SchemaJsonLd, { generateServiceSchema } from '../components/SchemaJsonLd'; // HowTo schema logic will be inline for now as it's unique
import { Phone, Users, GlassWater, Wallet, CheckCircle, ArrowRight, Car, Sparkles, Clock, Shield } from 'lucide-react';

const BeginnerGuide = () => {
    // Enhanced HowTo Schema - 7 Steps for Better Coverage
    const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "수원 셔츠룸·하이퍼블릭 처음 이용하는 방법 완벽 가이드",
        "description": "수원 셔츠룸, 하이퍼블릭 등 유흥업소를 처음 방문하는 초보자를 위한 7단계 상세 가이드입니다. 예약부터 안전한 귀가까지 모든 과정을 안내합니다.",
        "totalTime": "PT3H",
        "estimatedCost": {
            "@type": "MonetaryAmount",
            "currency": "KRW",
            "value": "280000"
        },
        "step": [
            {
                "@type": "HowToStep",
                "name": "전화 예약 및 견적 문의",
                "text": "방문 전 담당 실장(서우실장 010-2626-4833)에게 전화하여 인원수, 방문 시간, 원하는 업종(셔츠룸/하이퍼블릭)을 말하고 견적을 확인합니다.",
                "image": "https://suwonshirt.com/step1-call.jpg",
                "url": "https://suwonshirt.com/suwon-shirt-beginner-guide#step1"
            },
            {
                "@type": "HowToStep",
                "name": "픽업 요청 및 이동",
                "text": "수원역, 인계동, 삼성 디지털시티 등에서 무료 픽업 서비스를 요청합니다. 픽업 차량이 약속 장소로 마중 나갑니다.",
                "image": "https://suwonshirt.com/step2-pickup.jpg",
                "url": "https://suwonshirt.com/suwon-shirt-beginner-guide#step2"
            },
            {
                "@type": "HowToStep",
                "name": "업소 도착 및 룸 배정",
                "text": "업소에 도착하면 담당 실장이 맞이합니다. 인원과 분위기에 맞는 프라이빗 룸으로 안내받습니다.",
                "image": "https://suwonshirt.com/step3-room.jpg",
                "url": "https://suwonshirt.com/suwon-shirt-beginner-guide#step3"
            },
            {
                "@type": "HowToStep",
                "name": "초이스(Choice) 진행",
                "text": "매직미러 초이스 또는 조별 초이스로 매니저들을 보고 마음에 드는 파트너를 선택합니다. 스타일 취향을 말하면 추천도 받을 수 있습니다.",
                "image": "https://suwonshirt.com/step4-choice.jpg",
                "url": "https://suwonshirt.com/suwon-shirt-beginner-guide#step4"
            },
            {
                "@type": "HowToStep",
                "name": "음주가무 및 파트너 케어",
                "text": "80분~90분 동안 술과 노래를 즐기며 파트너와 즐거운 시간을 보냅니다. 셔츠룸의 경우 셔츠 환복 퍼포먼스가 진행됩니다.",
                "image": "https://suwonshirt.com/step5-party.jpg",
                "url": "https://suwonshirt.com/suwon-shirt-beginner-guide#step5"
            },
            {
                "@type": "HowToStep",
                "name": "연장 결정 또는 마무리",
                "text": "시간이 끝나면 TC를 추가하여 연장하거나 마무리를 결정합니다. 웨이터가 타임 종료 안내를 해드립니다.",
                "image": "https://suwonshirt.com/step6-extend.jpg",
                "url": "https://suwonshirt.com/suwon-shirt-beginner-guide#step6"
            },
            {
                "@type": "HowToStep",
                "name": "계산 및 안전한 귀가",
                "text": "계산서를 확인하고 현금 또는 카드로 결제합니다. 대리운전이나 택시를 요청하여 안전하게 귀가합니다.",
                "image": "https://suwonshirt.com/step7-pay.jpg",
                "url": "https://suwonshirt.com/suwon-shirt-beginner-guide#step7"
            }
        ]
    };

    return (
        <>
            <Helmet>
                <title>수원 가라오케·하이퍼블릭 초보 가이드</title>
                <meta name="description" content="수원 셔츠룸·하이퍼블릭 초보자를 위한 7단계 완벽 가이드. 예약, 픽업, 초이스, 음주가무, 연장, 계산, 귀가까지 상세 안내. 주대 18만원~, TC 10만원~" />
                <meta name="keywords" content="수원 가라오케 초보, 수원 하이퍼블릭 가이드, 수원 유흥 이용법" />
                <meta property="og:title" content="수원 가라오케·하이퍼블릭 초보 가이드" />
                <meta property="og:description" content="수원 셔츠룸·하이퍼블릭 초보자를 위한 7단계 완벽 가이드. 예약, 픽업, 초이스, 음주가무, 연장, 계산, 귀가까지 상세 안내." />
                <meta property="og:image" content="https://suwonshirt.com/og-beginner.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="수원 초보 이용 가이드" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="수원 가라오케·하이퍼블릭 초보 가이드" />
                <meta property="twitter:description" content="수원 셔츠룸·하이퍼블릭 초보자를 위한 7단계 완벽 가이드. 예약, 픽업, 초이스, 음주가무, 연장, 계산, 귀가까지 상세 안내." />
                <meta property="twitter:image" content="https://suwonshirt.com/og-beginner.jpg" />
                <link rel="canonical" href="https://suwonshirt.com/suwon-shirt-beginner-guide" />
            </Helmet>
            <SchemaJsonLd data={howToSchema} />

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950 px-4 pb-20">
                <div className="container mx-auto max-w-4xl">

                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500 mb-6">
                            유흥 초보 탈출 가이드
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">수원 셔츠룸·하이퍼블릭 초보 고객을 위한 7단계 완벽 가이드입니다. 예약부터 픽업, 초이스, 음주가무, 안전한 귀가까지 모든 과정을 상세히 안내합니다.</p>
                    </div>

                    {/* Steps Container - 7 Steps for HowTo Schema */}
                    <div className="relative border-l-2 border-slate-800 ml-4 md:ml-10 space-y-12">

                        {/* Step 1 - 예약 */}
                        <div className="relative pl-8 md:pl-12" id="step1">
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="text-cyan-400">Step 01.</span> 전화 예약 및 견적 문의
                                </h2>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="bg-slate-800 p-4 rounded-xl text-cyan-400">
                                        <Phone size={32} />
                                    </div>
                                    <div>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            가장 중요한 단계입니다. 무작정 찾아가기(워킹) 보다는 전화를 하세요.
                                            "오늘 2명 가려는데 셔츠룸 견적 얼마인가요?" 라고 솔직하게 물어보는 게 좋습니다.
                                        </p>
                                        <div className="bg-slate-950 p-4 rounded-lg border border-slate-700 text-sm md:text-base">
                                            <p className="text-slate-500 mb-2 font-bold">💡 실전 멘트:</p>
                                            <p className="text-white">"서우실장님 계신가요? 인터넷 보고 연락드렸는데요. 오늘 10시쯤 3명 갈 건데 수원 셔츠룸 룸 있나요?"</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 - 픽업 */}
                        <div className="relative pl-8 md:pl-12" id="step2">
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="text-cyan-400">Step 02.</span> 픽업 요청 및 이동
                                </h2>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="bg-slate-800 p-4 rounded-xl text-cyan-400">
                                        <Car size={32} />
                                    </div>
                                    <div>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            수원역, 인계동 상권, 삼성 디지털시티 등에서 무료 픽업 서비스를 이용할 수 있습니다.
                                            예약 시 픽업 위치를 말씀하시면 약속 장소로 차량이 마중 나갑니다.
                                        </p>
                                        <ul className="space-y-2 text-sm text-slate-400">
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500" /> 수원역 출구 번호를 정확히 말하세요.</li>
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500" /> 삼성 디지털시티 근무자는 퇴근 시간 조율 가능.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 - 룸 배정 */}
                        <div className="relative pl-8 md:pl-12" id="step3">
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="text-cyan-400">Step 03.</span> 업소 도착 및 룸 배정
                                </h2>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="bg-slate-800 p-4 rounded-xl text-cyan-400">
                                        <Sparkles size={32} />
                                    </div>
                                    <div>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            업소에 도착하면 담당 실장이 맞이합니다. 인원수와 원하는 분위기에 맞는 프라이빗 룸으로 안내받습니다.
                                            룸에는 기본 주대(양주, 과일, 안주)가 미리 세팅되어 있습니다.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 4 - 초이스 */}
                        <div className="relative pl-8 md:pl-12" id="step4">
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="text-cyan-400">Step 04.</span> 초이스 (Choice) 진행
                                </h2>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="bg-slate-800 p-4 rounded-xl text-cyan-400">
                                        <Users size={32} />
                                    </div>
                                    <div>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            매직미러 초이스 또는 조별 초이스로 매니저들을 보여드립니다.
                                            마음에 드는 파트너를 고르세요. 스타일 취향을 말씀하시면 추천도 해드립니다.
                                        </p>
                                        <ul className="space-y-2 text-sm text-slate-400">
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500" /> 마음에 들면 번호를 부르거나 손을 드세요.</li>
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500" /> 마음에 드는 분이 없다면 "다음 조 볼게요"라고 하세요.</li>
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500" /> "청순한 스타일", "술 잘 마시는 스타일" 등 구체적으로 요청하세요.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 5 - 음주가무 */}
                        <div className="relative pl-8 md:pl-12" id="step5">
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="text-cyan-400">Step 05.</span> 음주가무 (Table Time)
                                </h2>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="bg-slate-800 p-4 rounded-xl text-cyan-400">
                                        <GlassWater size={32} />
                                    </div>
                                    <div>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            파트너가 옆에 앉으면 가볍게 인사하고 술을 한 잔 권하세요.
                                            기본 타임은 80분~90분이며, 매너 있는 손님이 더 좋은 대우를 받습니다.
                                            셔츠룸의 경우 셔츠 환복 퍼포먼스가 하이라이트입니다.
                                        </p>
                                        <div className="bg-amber-900/20 p-3 rounded border border-amber-600/30 text-amber-200 text-sm">
                                            ⚠️ <strong>주의:</strong> 담당 실장 몰래 '2차' 등을 제안하는 것은 금물입니다.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 6 - 연장 결정 */}
                        <div className="relative pl-8 md:pl-12" id="step6">
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="text-cyan-400">Step 06.</span> 연장 결정 또는 마무리
                                </h2>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="bg-slate-800 p-4 rounded-xl text-cyan-400">
                                        <Clock size={32} />
                                    </div>
                                    <div>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            시간이 끝나가면 웨이터가 타임 종료 안내를 해드립니다.
                                            TC를 추가하여 연장하거나, 마무리를 결정하세요.
                                            연장 시 1시간 단위로 추가됩니다.
                                        </p>
                                        <ul className="space-y-2 text-sm text-slate-400">
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500" /> 연장은 강제가 아닙니다. 부담 없이 마무리하셔도 됩니다.</li>
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500" /> 파트너 변경(로테이션)도 이 타이밍에 요청 가능합니다.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Step 7 - 계산 및 귀가 */}
                        <div className="relative pl-8 md:pl-12" id="step7">
                            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                    <span className="text-cyan-400">Step 07.</span> 계산 및 안전한 귀가
                                </h2>
                                <div className="flex flex-col md:flex-row gap-6 items-start">
                                    <div className="bg-slate-800 p-4 rounded-xl text-cyan-400">
                                        <Shield size={32} />
                                    </div>
                                    <div>
                                        <p className="text-slate-300 leading-relaxed mb-4">
                                            계산서를 꼼꼼히 확인하고 현금 또는 카드로 결제합니다.
                                            술에 취하셨다면 대리운전이나 택시를 요청하여 안전하게 귀가하세요.
                                            지갑, 휴대폰 두고 가지 않도록 챙기세요.
                                        </p>
                                        <ul className="space-y-2 text-sm text-slate-400">
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500" /> 현금 결제 시 할인 혜택이 있을 수 있습니다.</li>
                                            <li className="flex items-center gap-2"><CheckCircle size={14} className="text-cyan-500" /> 대리운전 연결 서비스도 제공됩니다.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="mt-20 text-center">
                        <h2 className="text-2xl font-bold text-white mb-8">이제 실전입니다!</h2>
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
