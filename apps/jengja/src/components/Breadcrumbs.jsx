import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const routeNameMap = {
    'jeongja-highpub-guide': '하이퍼블릭',
    'jeongja-karaoke-guide': '가라오케',
    'jeongja-shirtsroom-guide': '셔츠룸',
    'jeongja-kimono-room-guide': '기모노룸',
    'jeongja-room-salon-guide': '룸살롱',
    'jeongja-hostbar-guide': '호빠',
    'jeongja-entertainment-price-guide': '가격 가이드',
    'jeongja-entertainment-beginner-guide': '초보자 가이드',
    'faq': 'FAQ',
    'contact': '문의하기',
    'terms': '이용약관',
    'privacy': '개인정보처리방침'
};

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    // Don't show breadcrumbs on home page
    if (pathnames.length === 0) {
        return null;
    }

    const schemaItems = [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.jengjakaraoke.com/"
        }
    ];

    pathnames.forEach((name, index) => {
        const routeName = routeNameMap[name] || name;
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        schemaItems.push({
            "@type": "ListItem",
            "position": index + 2,
            "name": routeName,
            "item": `https://www.jengjakaraoke.com${routeTo}`
        });
    });

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": schemaItems
    };

    return (
        <div className="bg-slate-900/50 border-b border-slate-800 backdrop-blur-sm relative z-20 pt-[72px]">
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            </Helmet>
            <div className="container mx-auto px-4 py-3">
                <nav aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 text-xs md:text-sm text-slate-400">
                        <li>
                            <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-1">
                                <Home size={14} />
                                <span className="sr-only">Home</span>
                            </Link>
                        </li>
                        {pathnames.map((name, index) => {
                            const routeName = routeNameMap[name] || name;
                            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                            const isLast = index === pathnames.length - 1;

                            return (
                                <li key={name} className="flex items-center">
                                    <ChevronRight size={14} className="mx-1 text-slate-600" />
                                    {isLast ? (
                                        <span className="text-amber-500 font-medium" aria-current="page">
                                            {routeName}
                                        </span>
                                    ) : (
                                        <Link to={routeTo} className="hover:text-amber-400 transition-colors">
                                            {routeName}
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </div>
    );
};

export default Breadcrumbs;
