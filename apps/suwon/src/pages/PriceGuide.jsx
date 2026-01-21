import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { DollarSign, CheckCircle, AlertTriangle, Phone } from 'lucide-react';

const PriceGuide = () => {
    return (
        <>
            <Helmet>
                <title>수원 유흥 가격비교 2026 | 하이퍼블릭·룸살롱·가라오케 주대표</title>
                <meta name="description" content="수원 유흥업소 가격 완전 정복 | 하이퍼블릭 18만원~ | 셔츠룸·룸살롱·가라오케 주대 비교 | 100% 정찰제 가격표 공개 | 바가지 ZERO | ☎ 010-2626-4833" />
                <meta name="keywords" content="수원 유흥 가격, 수원 룸살롱 가격, 하이퍼블릭 주대, 가라오케 비용, 셔츠룸 시스템 가격, 수원 TC 가격" />
                <meta property="og:title" content="수원 유흥 가격비교 2026 | 정찰제 가격표 공개" />
                <meta property="og:description" content="하이퍼블릭·룸살롱·가라오케 주대 비교 | 바가지 ZERO | 100% 정찰제" />
                <meta property="og:image" content="https://www.suwon.vip/og-price.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="수원 유흥 가격 비교표" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="수원 유흥 가격비교 | 정찰제 가격표" />
                <meta property="twitter:description" content="하이퍼블릭·룸살롱·가라오케 주대 비교 | 바가지 ZERO" />
                <meta property="twitter:image" content="https://www.suwon.vip/og-price.jpg" />
                <link rel="canonical" href="https://www.suwon.vip/suwon-entertainment-price-guide" />
            </Helmet>

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950 px-4 pb-20">
                <div className="container mx-auto max-w-5xl">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500 mb-6">
                            2026 수원 유흥 가격 가이드
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mx-auto">
                            업소 갈 때마다 "혹시 바가지 쓰는 거 아닐까?" 걱정하셨나요?<br />
                            서우실장이 <strong>투명한 정찰제 가격표</strong>를 공개합니다. 예산에 맞는 최적의 장소를 선택하세요.
                        </p>
                    </div>

                    {/* Comparison Table */}
                    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden mb-16 shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-800 text-white">
                                        <th className="py-4 px-6 font-bold text-lg md:w-1/4">구분</th>
                                        <th className="py-4 px-6 font-bold text-lg md:w-1/4">기본 주대 (SET)</th>
                                        <th className="py-4 px-6 font-bold text-lg md:w-1/4">매니저 봉사료 (T/C)</th>
                                        <th className="py-4 px-6 font-bold text-lg md:w-1/4">특징 & 가성비</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300 divide-y divide-slate-800">
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-amber-400">
                                            <Link to="/suwon-highpub-guide" className="hover:underline">하이퍼블릭</Link>
                                        </td>
                                        <td className="py-4 px-6">18~22만원</td>
                                        <td className="py-4 px-6">18만원 (80분)</td>
                                        <td className="py-4 px-6 text-sm">가성비 甲. 합리적인 가격에 고퀄리티 외모. 2030 선호도 1위.</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-blue-400">
                                            <Link to="/suwon-shirtsroom-guide" className="hover:underline">셔츠룸</Link>
                                        </td>
                                        <td className="py-4 px-6">18만원 내외</td>
                                        <td className="py-4 px-6">18~20만원 (60분)</td>
                                        <td className="py-4 px-6 text-sm">인사 타임 퍼포먼스. 화끈한 분위기를 원할 때 추천.</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-purple-400">
                                            <Link to="/suwon-karaoke-guide" className="hover:underline">가라오케</Link>
                                        </td>
                                        <td className="py-4 px-6">18~20만원</td>
                                        <td className="py-4 px-6">18만원 (60분)</td>
                                        <td className="py-4 px-6 text-sm">노래와 파티 위주. 남녀 동반 모임이나 회식에 최적.</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-amber-600">
                                            <Link to="/suwon-room-salon-guide" className="hover:underline">정통 룸살롱</Link>
                                        </td>
                                        <td className="py-4 px-6">20만원~</td>
                                        <td className="py-4 px-6">18만원~</td>
                                        <td className="py-4 px-6 text-sm">최상급 접대 장소. 높은 가격만큼 확실한 서비스와 마인드 보장.</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-rose-500">
                                            <Link to="/suwon-hostbar-guide" className="hover:underline">호스트바 (호빠)</Link>
                                        </td>
                                        <td className="py-4 px-6">18만원~</td>
                                        <td className="py-4 px-6">5~6만원 (시간당)</td>
                                        <td className="py-4 px-6 text-sm">여성 전용. 시간당 TC 계산으로 오래 놀수록 비용 상승.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-slate-800/50 text-xs text-slate-500 text-center">
                            * 위 가격은 평균적인 기준이며, 업소 사정이나 방문 인원(N빵), 이벤트 유무에 따라 변동될 수 있습니다. 정확한 견적은 전화 문의 바랍니다.
                        </div>
                    </div>

                    {/* Hidden Costs Explainer */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
                        <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <DollarSign className="text-green-500" /> 계산서 보는 법
                            </h2>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex gap-3">
                                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                    <div>
                                        <strong className="text-white block mb-1">기본 주대 (Liquor Price)</strong>
                                        양주 1병 + 과일안주 + 맥주/음료 세트 가격입니다. 첫 병 이후 술을 추가할 때마다 비용이 발생합니다.
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                    <div>
                                        <strong className="text-white block mb-1">T/C (Table Charge)</strong>
                                        매니저(아가씨/선수)의 봉사료입니다. 보통 시간 단위(60분~90분)로 계산되거나, 묶음(통)으로 계산됩니다.
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <CheckCircle className="text-green-500 flex-shrink-0 mt-1" size={20} />
                                    <div>
                                        <strong className="text-white block mb-1">W/T (Waiter Tip)</strong>
                                        룸 서빙을 담당하는 웨이터의 봉사료입니다. 보통 룸당 3~5만원이 고정적으로 발생합니다.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-amber-900/10 p-8 rounded-2xl border border-amber-500/20">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <AlertTriangle className="text-amber-500" /> 바가지요금 주의보
                            </h2>
                            <p className="text-slate-300 mb-4 leading-relaxed">
                                일부 비양심적인 영업진들이 손님이 술에 취한 틈을 타 <strong>'술병 늘리기'</strong>를 하거나,
                                계산서에 안 먹은 안주를 몰래 넣는 경우가 있습니다.
                            </p>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                서우실장은 <strong>'정찰제 가격표'</strong>를 미리 보여드리고 시작하며,
                                계산 시 드신 내역을 투명하게 확인시켜 드립니다.
                            </p>
                            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 text-amber-200 text-sm font-bold text-center">
                                "저렴하다고 무조건 좋은 게 아닙니다. 믿을 수 있는 사람을 찾으세요."
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-6">내 예산에 딱 맞는 곳이 궁금하다면?</h2>
                        <button onClick={() => window.location.href = 'tel:01026264833'} className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2 mx-auto">
                            <Phone fill="currentColor" size={20} /> 30초 만에 견적 받기
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default PriceGuide;
