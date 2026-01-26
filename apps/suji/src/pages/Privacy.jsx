import React from 'react';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
    return (
        <>
            <Helmet>
                <title>개인정보처리방침 | 수지 서우실장</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950 px-4 pb-20">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">개인정보처리방침</h1>

                    <div className="text-slate-300 space-y-8 leading-relaxed text-sm md:text-base">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">1. 개인정보의 처리 목적</h2>
                            <p>
                                수지 서우실장(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>예약 상담 및 관리: 전화번호, 닉네임(선택)</li>
                                <li>마케팅 및 광고 활용: 신규 서비스(제품) 개발 및 맞춤 서비스 제공 (동의 시)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">2. 개인정보의 처리 및 보유 기간</h2>
                            <p>
                                회사는 법령에 따른 개인정보 보유·이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용 기간 내에서 개인정보를 처리·보유합니다.
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>예약 기록: 상담 완료 후 3개월 (고객 요청 시 즉시 파기)</li>
                                <li>통신비밀보호법에 따른 통신사실확인자료 보관 등</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">3. 정보주체의 권리·의무 및 그 행사방법</h2>
                            <p>
                                이용자는 개인정보주체로서 언제든지 개인정보 열람, 정정, 삭제, 처리정지 요구 등의 권리를 행사할 수 있습니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">4. 처리하는 개인정보의 항목</h2>
                            <p>
                                회사는 원활한 예약 상담을 위해 아래와 같은 최소한의 정보를 수집하고 있습니다.
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>필수항목: 휴대전화번호</li>
                                <li>선택항목: 닉네임, 차종(발렛파킹 시)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">5. 개인정보의 파기</h2>
                            <p>
                                회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다. 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법을 사용합니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">6. 개인정보 보호책임자</h2>
                            <p>
                                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>책임자: 서우 실장</li>
                                <li>연락처: 010-2626-4833</li>
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Privacy;
