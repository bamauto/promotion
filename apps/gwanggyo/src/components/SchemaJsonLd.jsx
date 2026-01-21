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
    "name": "광교 가라오케 서우실장",
    "image": "https://gwanggyokaraoke.com/og-image.jpg",
    "telephone": "010-2626-4833",
    "url": "https://gwanggyokaraoke.com/",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "광교동",
        "addressLocality": "Suwon-si",
        "addressRegion": "Gyeonggi-do",
        "postalCode": "16508",
        "addressCountry": "KR"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 37.2849,
        "longitude": 127.0464
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
        { "@type": "City", "name": "광교" },
        { "@type": "Place", "name": "광교중앙역" },
        { "@type": "Place", "name": "상현역" },
        { "@type": "City", "name": "수원" },
        { "@type": "City", "name": "영통" }
    ]
});

export const generateServiceSchema = (serviceName, description, url, offerPrice) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceName,
    "provider": {
        "@type": "LocalBusiness",
        "name": "광교 가라오케 서우실장",
        "image": "https://gwanggyokaraoke.com/og-image.jpg",
        "telephone": "010-2626-4833"
    },
    "areaServed": {
        "@type": "City",
        "name": "Gwanggyo"
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
    "name": "서우실장 광교 가라오케",
    "alternateName": "광교 서우실장",
    "url": "https://gwanggyokaraoke.com",
    "logo": "https://gwanggyokaraoke.com/logo.png",
    "image": "https://gwanggyokaraoke.com/og-home.jpg",
    "description": "광교 최고급 가라오케, 하이퍼블릭, 룸살롱 프리미엄 가이드. 투명한 정찰제, 24시간 예약 가능.",
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
        "streetAddress": "광교동",
        "addressLocality": "수원시",
        "addressRegion": "경기도",
        "postalCode": "16508",
        "addressCountry": "KR"
    }
});

// WebSite schema for sitelinks searchbox and site identity
export const generateWebSiteSchema = () => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "광교 가라오케 서우실장",
    "alternateName": ["광교 하이퍼블릭", "광교 유흥", "광교 룸살롱"],
    "url": "https://gwanggyokaraoke.com",
    "potentialAction": {
        "@type": "SearchAction",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://gwanggyokaraoke.com/search?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
    },
    "publisher": {
        "@type": "Organization",
        "name": "서우실장",
        "logo": {
            "@type": "ImageObject",
            "url": "https://gwanggyokaraoke.com/logo.png"
        }
    }
});

// AggregateRating schema for venue ratings
export const generateAggregateRatingSchema = (itemName, ratingValue, reviewCount, bestRating = 5, worstRating = 1) => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": itemName,
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ratingValue,
        "reviewCount": reviewCount,
        "bestRating": bestRating,
        "worstRating": worstRating
    }
});

// Service with PriceSpecification for detailed pricing info
export const generateServiceWithPriceSchema = (serviceName, description, url, priceSpec) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "serviceType": serviceName,
    "provider": {
        "@type": "LocalBusiness",
        "name": "광교 가라오케 서우실장",
        "image": "https://gwanggyokaraoke.com/og-image.jpg",
        "telephone": "010-2626-4833"
    },
    "areaServed": {
        "@type": "City",
        "name": "광교"
    },
    "description": description,
    "url": url,
    "offers": {
        "@type": "Offer",
        "priceCurrency": "KRW",
        "priceSpecification": {
            "@type": "PriceSpecification",
            "price": priceSpec.price,
            "priceCurrency": "KRW",
            "minPrice": priceSpec.minPrice,
            "maxPrice": priceSpec.maxPrice,
            "eligibleQuantity": {
                "@type": "QuantitativeValue",
                "value": priceSpec.persons || 1,
                "unitText": "인"
            }
        },
        "availability": "https://schema.org/InStock"
    }
});

// Price comparison table schema for PriceGuide page
export const generatePriceTableSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "광교 유흥업소 가격 비교표",
    "description": "광교 가라오케, 하이퍼블릭, 셔츠룸, 호빠 가격 비교",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
            "@type": "Service",
            "name": item.name,
            "description": item.description,
            "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "KRW",
                "lowPrice": item.lowPrice,
                "highPrice": item.highPrice,
                "offerCount": item.offerCount || 1
            }
        }
    }))
});

export default SchemaJsonLd;
