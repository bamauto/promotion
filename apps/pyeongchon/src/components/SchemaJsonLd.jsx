import React from 'react';
import { Helmet } from 'react-helmet-async';

const SchemaJsonLd = ({ data }) => {
    // Handle both single schema and array of schemas
    const schemas = Array.isArray(data) ? data : [data];

    return (
        <Helmet>
            {schemas.map((schema, index) => (
                <script key={index} type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            ))}
        </Helmet>
    );
};

export const generateLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "EntertainmentBusiness",
    "name": "평촌 하이퍼블릭·가라오케 서우실장",
    "image": "https://pc-karaoke.com/og-home.jpg",
    "telephone": "010-2626-4833",
    "url": "https://pc-karaoke.com/",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "평촌역 일대",
        "addressLocality": "Anyang-si",
        "addressRegion": "경기도",
        "addressCountry": "KR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.3894,
        "longitude": 126.9519
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "18:00",
            "closes": "23:59"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "00:00",
            "closes": "06:00"
        }
    ],
    "priceRange": "$$",
    "areaServed": [
        { "@type": "City", "name": "Anyang-si" },
        { "@type": "Place", "name": "Pyeongchon Station" },
        { "@type": "Place", "name": "Beomgye Station" },
        { "@type": "Place", "name": "Pyeongchon New Town" },
        { "@type": "Place", "name": "Indeogwon Station" },
        { "@type": "Place", "name": "Dongan-gu" }
    ]
});

export const generateServiceSchema = (serviceName, description, url, offerPrice) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceName,
    "provider": {
        "@type": "LocalBusiness",
        "name": "평촌 하이퍼블릭·가라오케 서우실장",
        "image": "https://pc-karaoke.com/og-home.jpg",
        "telephone": "010-2626-4833"
    },
    "areaServed": {
        "@type": "City",
        "name": "평촌"
    },
    "description": description,
    "url": url,
    "offers": {
        "@type": "Offer",
        "priceCurrency": "KRW",
        "price": offerPrice || "180000",
        "availability": "https://schema.org/InStock"
    }
});

export const generateFAQSchema = (faqs) => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
});

export const generateBreadcrumbSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
    }))
});

export const generateOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "서우실장 평촌 하이퍼블릭·가라오케",
    "alternateName": "평촌 서우실장",
    "url": "https://pc-karaoke.com",
    "logo": "https://pc-karaoke.com/logo.png",
    "image": "https://pc-karaoke.com/og-home.jpg",
    "description": "평촌 하이퍼블릭·가라오케·룸살롱 프리미엄 가이드. 평촌·범계·인덕원 상권 맞춤 안내, 24시간 예약.",
    "telephone": "+82-10-2626-4833",
    "sameAs": [
        "https://t.me/pbsewoo",
        "http://qr.kakao.com/talk/jMlvTnRecn1PgP4S9gqME2itU7g-"
    ],
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+82-10-2626-4833",
        "contactType": "customer service",
        "availableLanguage": ["Korean"],
        "areaServed": "KR",
        "hoursAvailable": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            "opens": "18:00",
            "closes": "06:00"
        }
    },
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "평촌역 일대",
        "addressLocality": "안양시",
        "addressRegion": "경기도",
        "addressCountry": "KR"
    }
});

export default SchemaJsonLd;
