import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { DollarSign, CheckCircle, AlertTriangle, Phone } from 'lucide-react';

const PriceGuide = () => {
    return (
        <>
            <Helmet>
                <title>안양 유흥 가격비교 2026 | 하이퍼블릭·룸살롱·가라오케 주대표</title>
                <meta name="description" content="안양 유흥업소 가격 완전 정복 | 하이퍼블릭 13만원~ | 셔츠룸·룸살롱·가라오케 주대 비교 | 100% 정찰제 가격표 공개 | 바가지 ZERO | ☎ 010-2626-4833" />
                <meta name="keywords" content="안양 유흥 가격, 안양 룸살롱 가격, 하이퍼블릭 주대, 가라오케 비용, 셔츠룸 시스템 가격, 안양 TC 가격" />
                <meta property="og:title" content="안양 유흥 가격비교 2026 | 정찰제 가격표 공개" />
                <meta property="og:description" content="하이퍼블릭·룸살롱·가라오케 주대 비교 | 바가지 ZERO | 100% 정찰제" />
                <meta property="og:image" content="https://anyangkaraoke.com/og-price.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="안양 유흥 가격 비교표" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="안양 유흥 가격비교 | 정찰제 가격표" />
                <meta property="twitter:description" content="하이퍼블릭·룸살롱·가라오케 주대 비교 | 바가지 ZERO" />
                <meta property="twitter:image" content="https://anyangkaraoke.com/og-price.jpg" />
                <link rel="canonical" href="https://anyangkaraoke.com/anyang-entertainment-price-guide" />
            </Helmet>

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950 px-4 pb-20">
                <div className="container mx-auto max-w-5xl">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500 mb-6">
                            2026 안양 유흥 가격 가이드
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mx-auto">
                            업소 갈 때마다 "혹시 바가지 쓰는 거 아닐까?" 걱정하셨나요?<br />
                            서우실장이 <strong>투명한 정찰제 가격표</strong>를 공개합니다. 예산에 맞는 최적의 장소를 선택하세요.
                        </p>
                    </div>

                    {/* 안양 지역별 가격 비교표 */}
                    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden mb-8 shadow-xl">
                        <div className="bg-amber-600/20 p-4 border-b border-slate-700">
                            <h2 className="text-xl font-bold text-amber-400 text-center">📍 안양 지역별 가격 비교 (하이퍼블릭·가라오케 기준)</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-800 text-white">
                                        <th className="py-4 px-4 font-bold text-base">업종</th>
                                        <th className="py-4 px-4 font-bold text-base text-center">평촌역<br/><span className="text-xs text-slate-400">프리미엄 상권</span></th>
                                        <th className="py-4 px-4 font-bold text-base text-center">범계역<br/><span className="text-xs text-slate-400">로데오거리</span></th>
                                        <th className="py-4 px-4 font-bold text-base text-center">인덕원역<br/><span className="text-xs text-slate-400">IT·비즈니스</span></th>
                                        <th className="py-4 px-4 font-bold text-base text-center">안양역<br/><span className="text-xs text-slate-400">가성비 상권</span></th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300 divide-y divide-slate-800">
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-4 font-bold text-amber-400">
                                            <Link to="/anyang-highpub-guide" className="hover:underline">하이퍼블릭</Link>
                                        </td>
                                        <td className="py-4 px-4 text-center">13~16만원</td>
                                        <td className="py-4 px-4 text-center text-amber-300 font-semibold">14~17만원</td>
                                        <td className="py-4 px-4 text-center">11~14만원</td>
                                        <td className="py-4 px-4 text-center text-green-400">10~13만원</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-4 font-bold text-purple-400">
                                            <Link to="/anyang-karaoke-guide" className="hover:underline">가라오케</Link>
                                        </td>
                                        <td className="py-4 px-4 text-center">10~13만원</td>
                                        <td className="py-4 px-4 text-center text-amber-300 font-semibold">11~14만원</td>
                                        <td className="py-4 px-4 text-center">9~12만원</td>
                                        <td className="py-4 px-4 text-center text-green-400">8~11만원</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-4 font-bold text-blue-400">
                                            <Link to="/anyang-shirtsroom-guide" className="hover:underline">셔츠룸</Link>
                                        </td>
                                        <td className="py-4 px-4 text-center">14~17만원</td>
                                        <td className="py-4 px-4 text-center text-amber-300 font-semibold">15~18만원</td>
                                        <td className="py-4 px-4 text-center">12~15만원</td>
                                        <td className="py-4 px-4 text-center text-green-400">11~14만원</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-3 bg-slate-800/50 text-xs text-slate-400 text-center">
                            📊 2026년 1월 기준, 서우실장 협력업소 12곳 실거래가 조사 | 평촌역·범계역: 프리미엄 상권 / 인덕원·안양역: 가성비 상권
                        </div>
                    </div>

                    {/* 업종별 상세 비교표 */}
                    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden mb-16 shadow-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-800 text-white">
                                        <th className="py-4 px-6 font-bold text-lg md:w-1/4">구분</th>
                                        <th className="py-4 px-6 font-bold text-lg md:w-1/4">기본 주대 (SET)</th>
                                        <th className="py-4 px-6 font-bold text-lg md:w-1/4">매니저 봉사료 (T/C)</th>
                                        <th className="py-4 px-6 font-bold text-lg md:w-1/4">안양 특화 정보</th>
                                    </tr>
                                </thead>
                                <tbody className="text-slate-300 divide-y divide-slate-800">
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-amber-400">
                                            <Link to="/anyang-highpub-guide" className="hover:underline">하이퍼블릭</Link>
                                        </td>
                                        <td className="py-4 px-6">10~17만원</td>
                                        <td className="py-4 px-6">13만원 (80분)</td>
                                        <td className="py-4 px-6 text-sm">범계 로데오거리 집중 분포. 2030 직장인 선호도 1위. 평촌 신도시 퇴근 회식 명소.</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-blue-400">
                                            <Link to="/anyang-shirtsroom-guide" className="hover:underline">셔츠룸</Link>
                                        </td>
                                        <td className="py-4 px-6">11~18만원</td>
                                        <td className="py-4 px-6">14~15만원 (60분)</td>
                                        <td className="py-4 px-6 text-sm">인사 타임 퍼포먼스. 인덕원 IT기업 접대 선호. 여성 고객 40% 증가 추세.</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-purple-400">
                                            <Link to="/anyang-karaoke-guide" className="hover:underline">가라오케</Link>
                                        </td>
                                        <td className="py-4 px-6">8~14만원</td>
                                        <td className="py-4 px-6">13만원 (60분)</td>
                                        <td className="py-4 px-6 text-sm">평촌 학원가 학부모 회식 인기. 안양역 가성비 최고. 단체 30인 파티룸 완비.</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-amber-600">
                                            <Link to="/anyang-room-salon-guide" className="hover:underline">정통 룸살롱</Link>
                                        </td>
                                        <td className="py-4 px-6">20만원~</td>
                                        <td className="py-4 px-6">15만원~</td>
                                        <td className="py-4 px-6 text-sm">1기 신도시 고소득 전문직 접대 특화. IT·과학단지 임원 선호. 법인 결제 가능.</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-rose-500">
                                            <Link to="/anyang-hostbar-guide" className="hover:underline">호스트바 (호빠)</Link>
                                        </td>
                                        <td className="py-4 px-6">15만원~</td>
                                        <td className="py-4 px-6">5~6만원 (시간당)</td>
                                        <td className="py-4 px-6 text-sm">평촌 여성 전문직 선호. 범계역 근처 안전 귀갓길. 브라이덜샤워·걸스파티 명소.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-slate-800/50 text-xs text-slate-500 text-center">
                            * 가격은 지역·업소·시간대에 따라 변동됩니다. 정확한 견적은 ☎ 010-2626-4833으로 문의 바랍니다.
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
