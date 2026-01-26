import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { DollarSign, CheckCircle, AlertTriangle, Phone } from 'lucide-react';

const PriceGuide = () => {
    return (
        <>
            <Helmet>
                <title>인계동 유흥 가격 가이드 | 주대 18만원 이상 기준</title>
                <meta name="description" content="인계동 유흥 가격 가이드. 하이퍼블릭·가라오케·룸살롱·셔츠룸 기준을 정리했습니다. 주대 18만원 이상, TC 10만원 이상, 상세 문의." />
                <meta name="keywords" content="인계동 유흥 가격, 인계동 주대, 인계동 TC, 인계동 하이퍼블릭 가격" />
                <meta property="og:title" content="인계동 유흥 가격 가이드 | 주대 18만원 이상 기준" />
                <meta property="og:description" content="인계동 유흥 가격 가이드. 하이퍼블릭·가라오케·룸살롱·셔츠룸 기준을 정리했습니다. 주대 18만원 이상, TC 10만원 이상, 상세 문의." />
                <meta property="og:image" content="https://ingedongkaraoke.com/og-price.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="인계동 유흥 가격 가이드" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ko_KR" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="인계동 유흥 가격 가이드 | 주대 18만원 이상 기준" />
                <meta property="twitter:description" content="인계동 유흥 가격 가이드. 하이퍼블릭·가라오케·룸살롱·셔츠룸 기준을 정리했습니다. 주대 18만원 이상, TC 10만원 이상, 상세 문의." />
                <meta property="twitter:image" content="https://ingedongkaraoke.com/og-price.jpg" />
                <link rel="canonical" href="https://ingedongkaraoke.com/ingedong-price-guide" />
            </Helmet>

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950 px-4 pb-20">
                <div className="container mx-auto max-w-5xl">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-green-500 mb-6">
                            2026 인계동 유흥 가격 가이드
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mx-auto">인계동 상권 기준 주대/TC 기준을 한눈에 정리했습니다.<br />수원시청역·인계로데오거리 중심 업소 기준으로 안내하며 상세 견적은 문의 부탁드립니다.</p>
                    </div>

                    {/* SEO Content Section */}
                    <div className="bg-slate-900/30 rounded-2xl p-8 mb-16 border border-slate-800">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <div className="w-1.5 h-8 bg-amber-500 rounded-full"></div>
                            인계동 유흥 가격, 어떻게 결정되나요?
                        </h2>

                        <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                            <p>
                                인계동은 수원시청역과 인계로데오거리를 중심으로 경기남부 최대 유흥 상권을 형성하고 있습니다.
                                <strong className="text-white">30년 이상의 역사</strong>를 가진 검증된 업소들이 밀집해 있으며,
                                가라오케·하이퍼블릭·룸살롱·셔츠룸·호빠·기모노룸 등 다양한 업종이 공존합니다.
                            </p>

                            <p>
                                인계동 유흥 가격은 <strong className="text-amber-400">주대(SET) + TC(Table Charge) + WT(Waiter Tip)</strong>
                                구조로 구성됩니다. 주대는 기본 주류 1병과 과일·안주가 포함된 세트 가격이며,
                                TC는 매니저(아가씨/선수) 봉사료, WT는 웨이터 서비스 비용입니다.
                            </p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">인계동 vs 강남 가격 비교</h3>
                            <p>
                                동일한 서비스 수준을 기준으로 했을 때, 인계동은 강남 대비 약 <strong className="text-amber-400">30% 저렴</strong>합니다.
                                예를 들어 강남에서 주대 25만원·TC 15만원인 하이퍼블릭 코스가
                                인계동에서는 주대 18만원·TC 10만원 수준으로 이용 가능합니다.
                            </p>

                            <p>
                                특히 <strong className="text-white">수원시청역 중심 상권</strong>은 접근성이 뛰어나고
                                주차 인프라가 잘 갖춰져 있어, 수원·용인·화성 지역 비즈니스 고객들에게
                                높은 가성비를 제공합니다.
                            </p>

                            <h3 className="text-xl font-bold text-white mt-8 mb-4">정찰제 가격 운영의 중요성</h3>
                            <p>
                                서우실장은 <strong className="text-amber-400">100% 정찰제 가격표</strong>를 사전 공개하고,
                                예약 시 정확한 견적을 안내해 드립니다. 일부 비양심 업소에서 발생하는
                                '술병 늘리기', '안 먹은 안주 추가' 같은 바가지요금 문제를 원천 차단합니다.
                            </p>

                            <p>
                                인계동에서 15년 이상 활동하며 쌓은 신뢰를 바탕으로,
                                <strong className="text-white">투명한 계산서</strong>와 합리적인 가격을 약속드립니다.
                                계산 전 항상 내역을 확인시켜 드리며, 예상치 못한 추가금은 절대 발생하지 않습니다.
                            </p>
                        </div>
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
                                            <Link to="/ingedong-hyperpub-guide" className="hover:underline">하이퍼블릭</Link>
                                        </td>
                                        <td className="py-4 px-6">주대 18만원 이상</td>
                                        <td className="py-4 px-6">TC 10만원 이상</td>
                                        <td className="py-4 px-6 text-sm">수원시청역·인계로데오거리 라인 중심, 수원시청권 비즈니스 선호. 프라이빗 라운지 타입.</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-blue-400">
                                            <Link to="/ingedong-shirtsroom-guide" className="hover:underline">셔츠룸</Link>
                                        </td>
                                        <td className="py-4 px-6">주대 18만원 이상</td>
                                        <td className="py-4 px-6">TC 10만원 이상</td>
                                        <td className="py-4 px-6 text-sm">인계로데오거리 인근 도심형 분위기, 빠른 초이스.</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-purple-400">
                                            <Link to="/ingedong-karaoke-guide" className="hover:underline">가라오케</Link>
                                        </td>
                                        <td className="py-4 px-6">주대 18만원 이상</td>
                                        <td className="py-4 px-6">TC 10만원 이상</td>
                                        <td className="py-4 px-6 text-sm">효원공원 파티/회식 수요 중심, 대형 룸 구성.</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-amber-600">
                                            <Link to="/ingedong-room-salon-guide" className="hover:underline">정통 룸살롱</Link>
                                        </td>
                                        <td className="py-4 px-6">주대 18만원 이상</td>
                                        <td className="py-4 px-6">TC 10만원 이상</td>
                                        <td className="py-4 px-6 text-sm">수원시청역 비즈니스 접대 중심, 조용한 룸.</td>
                                    </tr>
                                    <tr className="hover:bg-slate-800/30 transition-colors">
                                        <td className="py-4 px-6 font-bold text-rose-500">
                                            <Link to="/ingedong-hostbar-guide" className="hover:underline">호스트바 (호빠)</Link>
                                        </td>
                                        <td className="py-4 px-6">주대 18만원 이상</td>
                                        <td className="py-4 px-6">TC 10만원 이상</td>
                                        <td className="py-4 px-6 text-sm">경기아트센터 주변 여성 고객 맞춤 라운지.</td>
                                    </tr>
</tbody>
                            </table>
                        </div>
                        <div className="p-4 bg-slate-800/50 text-xs text-slate-500 text-center">
                            * 주대 18만원 이상, TC 10만원 이상 기준이며 업소/시간/인원에 따라 변동됩니다. 인계동 상세 견적은 전화 문의 바랍니다.
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
                                        인계동 기준은 기본 주류 1병과 과일/음료 포함 세트이며, 추가 주문 시 비용이 발생합니다.
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
                                        룸 서빙을 담당하는 웨이터의 봉사료입니다. 보통 룸당 별도 안내됩니다.
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-amber-900/10 p-8 rounded-2xl border border-amber-500/20">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                <AlertTriangle className="text-amber-500" /> 바가지요금 주의보
                            </h2>
                            <p className="text-slate-300 mb-4 leading-relaxed">인계동 상권에서도 일부 비양심적인 영업진들이 손님이 술에 취한 틈을 타 <strong>'술병 늘리기'</strong>를 하거나, 계산서에 안 먹은 안주를 몰래 넣는 경우가 있습니다.</p>
                            <p className="text-slate-300 mb-6 leading-relaxed">서우실장은 <strong>'정찰제 가격표'</strong>를 미리 보여드리고 시작하며, 수원시청역·인계로데오거리 중심 업소 기준으로 계산 시 드신 내역을 투명하게 확인시켜 드립니다.</p>
                            <div className="bg-slate-950 p-4 rounded-xl border border-amber-500/30 text-amber-200 text-sm font-bold text-center">
                                "저렴하다고 무조건 좋은 게 아닙니다. 믿을 수 있는 사람을 찾으세요. (인계동 기준)"
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
