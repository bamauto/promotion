import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Star, Music, GlassWater, Shirt, Flower2, Mic2, Crown } from 'lucide-react';

const services = [
    {
        id: 'highpublic',
        name: '하이퍼블릭',
        linkText: '오산 하이퍼블릭 초이스 시스템·가격 가이드',
        desc: '매직미러·조별·무한 초이스 비교',
        path: '/osan-highpub-guide',
        icon: Star,
        color: 'text-amber-400'
    },
    {
        id: 'karaoke',
        name: '가라오케',
        linkText: '오산 가라오케 회식·파티룸 예약 가이드',
        desc: '음향 특화 대형룸·삼성전자 오산캠퍼스 픽업',
        path: '/osan-karaoke-guide',
        icon: Mic2,
        color: 'text-purple-400'
    },
    {
        id: 'shirtsroom',
        name: '셔츠룸',
        linkText: '오산 셔츠룸 빠른 초이스·가격 안내',
        desc: '비즈니스 접대·화이트셔츠 컨셉',
        path: '/osan-shirtsroom-guide',
        icon: Shirt,
        color: 'text-white'
    },
    {
        id: 'kimonoroom',
        name: '기모노룸',
        linkText: '오산 기모노룸 이색 테마 체험 가이드',
        desc: '코스프레·테마 파티 전문',
        path: '/osan-kimono-room-guide',
        icon: Flower2,
        color: 'text-pink-400'
    },
    {
        id: 'roomsalon',
        name: '룸살롱',
        linkText: '오산 룸살롱 비즈니스 접대 VVIP 가이드',
        desc: '프라이빗 룸·고급 접대',
        path: '/osan-room-salon-guide',
        icon: Crown,
        color: 'text-amber-500'
    },
    {
        id: 'hostbar',
        name: '호빠',
        linkText: '오산 호빠 여성 전용 프리미엄 라운지',
        desc: '오산대역 여성 고객 맞춤',
        path: '/osan-hostbar-guide',
        icon: GlassWater,
        color: 'text-blue-400'
    }
];

const RelatedServices = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    // Filter out redundant links (current page)
    const otherServices = services.filter(service => service.path !== currentPath);

    return (
        <section className="py-20 bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold text-white mb-2">다른 서비스 둘러보기</h3>
                    <p className="text-slate-400">오산 최고의 밤문화 코스를 확인해보세요.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {otherServices.map((service) => (
                        <Link
                            key={service.id}
                            to={service.path}
                            className="group bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-amber-500/50 p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center ${service.color} group-hover:scale-110 transition-transform`}>
                                    <service.icon size={24} />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-white group-hover:text-amber-400 transition-colors">{service.linkText}</h4>
                                    <p className="text-xs text-slate-400">{service.desc}</p>
                                </div>
                            </div>
                            <ArrowRight size={18} className="text-slate-600 group-hover:text-amber-500 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedServices;
