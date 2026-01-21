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
    "name": "인계동 가라오케 서우실장",
    "image": "https://www.ingedongkaraoke.com/og-image.jpg",
    "telephone": "010-2626-4833",
    "url": "https://www.ingedongkaraoke.com/",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "인계동",
        "addressLocality": "Suwon-si",
        "addressRegion": "Gyeonggi-do",
        "postalCode": "16517",
        "addressCountry": "KR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.2636,
        "longitude": 127.0286
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
        { "@type": "City", "name": "Ingye-dong" },
        { "@type": "City", "name": "Suwon" },
        { "@type": "City", "name": "Yeongtong" },
        { "@type": "City", "name": "Gwanggyo" },
        { "@type": "City", "name": "Maetan-dong" }
    ]
});

export const generateServiceSchema = (serviceName, description, url, offerPrice) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceName,
    "provider": {
        "@type": "LocalBusiness",
        "name": "인계동 가라오케 서우실장",
        "image": "https://www.ingedongkaraoke.com/og-image.jpg",
        "telephone": "010-2626-4833"
    },
    "areaServed": {
        "@type": "City",
        "name": "Ingye-dong"
    },
    "description": description,
    "url": url,
    "offers": {
        "@type": "Offer",
        "priceCurrency": "KRW",
        "price": offerPrice || "130000",
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
    "name": "서우실장 인계동 가라오케",
    "alternateName": "인계동 서우실장",
    "url": "https://www.ingedongkaraoke.com",
    "logo": "https://www.ingedongkaraoke.com/logo.png",
    "image": "https://www.ingedongkaraoke.com/og-home.jpg",
    "description": "인계동 최고급 가라오케, 하이퍼블릭, 룸살롱 프리미엄 가이드. 투명한 정찰제, 24시간 예약 가능.",
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
        "streetAddress": "인계동",
        "addressLocality": "인계동",
        "addressRegion": "경기도",
        "postalCode": "16517",
        "addressCountry": "KR"
    }
});

export default SchemaJsonLd;
