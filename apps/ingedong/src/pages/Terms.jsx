import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
    return (
        <>
            <Helmet>
                <title>이용약관 | 인계동 서우실장</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <div className="pt-24 md:pt-32 min-h-screen bg-slate-950 px-4 pb-20">
                <div className="container mx-auto max-w-4xl">
                    <h1 className="text-3xl font-bold text-white mb-8 border-b border-slate-800 pb-4">이용약관</h1>

                    <div className="text-slate-300 space-y-8 leading-relaxed text-sm md:text-base">
                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">제 1 조 (목적)</h2>
                            <p>
                                본 약관은 인계동 서우실장(이하 "회사")이 제공하는 웹사이트 및 제반 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">제 2 조 (용어의 정의)</h2>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>"서비스"라 함은 구현되는 단말기(PC, 휴대형단말기 등)와 상관없이 회원이 이용할 수 있는 인계동 서우실장 관련 제반 서비스를 의미합니다.</li>
                                <li>"회원"이라 함은 회사의 서비스에 접속하여 본 약관에 따라 회사와 이용계약을 체결하고 회사가 제공하는 서비스를 이용하는 고객을 말합니다.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">제 3 조 (약관의 게시와 개정)</h2>
                            <p>
                                회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다. 회사는 "약관의 규제에 관한 법률", "정보통신망 이용촉진 및 정보보호 등에 관한 법률" 등 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">제 4 조 (서비스의 제공 및 변경)</h2>
                            <p>
                                회사는 회원에게 아래와 같은 서비스를 제공합니다.
                            </p>
                            <ul className="list-disc pl-5 mt-2 space-y-1">
                                <li>유흥업소 정보 제공 및 예약 대행 서비스</li>
                                <li>위치 기반 업소 안내 서비스</li>
                                <li>기타 회사가 추가 개발하거나 제휴 계약 등을 통해 회원에게 제공하는 일체의 서비스</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">제 5 조 (책임의 한계)</h2>
                            <p>
                                본 사이트는 성인(만 19세 이상)을 대상으로 정보를 제공하며, 청소년 보호법 등 관련 법규를 준수합니다. 본 사이트에 게재된 업소 정보는 해당 업소의 자료를 바탕으로 제공되며, 실제 서비스 내용과 다를 수 있습니다. 예약 및 이용 과정에서 발생하는 회원 간, 또는 회원과 업소 간의 분쟁에 대해서는 회사가 책임을 지지 않습니다.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Terms;
