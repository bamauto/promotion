import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Home, Search, HelpCircle } from 'lucide-react';

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>페이지를 찾을 수 없습니다 | 분당 서우실장</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>

                <div className="max-w-md w-full text-center relative z-10">
                    <div className="mb-8 relative inline-block">
                        <div className="text-9xl font-extrabold text-slate-800 select-none">404</div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-rose-500">
                            <HelpCircle size={64} className="animate-bounce" />
                        </div>
                    </div>

                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        길을 잃으셨나요?
                    </h1>

                    <p className="text-slate-400 mb-10 leading-relaxed">
                        요청하신 페이지가 사라졌거나 잘못된 주소입니다.<br />
                        하지만 걱정 마세요. 오늘 밤 분당에서 완벽한 장소는 아직 열려있습니다.
                    </p>

                    <div className="grid gap-3">
                        <Link
                            to="/"
                            className="bg-gradient-to-r from-amber-500 to-amber-700 text-white font-bold py-4 px-6 rounded-xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg shadow-amber-900/20"
                        >
                            <Home size={20} />
                            메인으로 돌아가기
                        </Link>
                    </div>

                    <div className="mt-12 text-sm text-slate-600">
                        <p>도움이 필요하신가요?</p>
                        <a href="tel:01026264833" className="text-rose-500 hover:text-rose-400 font-bold mt-2 inline-block">
                            010-2626-4833 (서우실장 직통)
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFound;
