import React, { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

const TableOfContents = ({ sections }) => {
    const [activeId, setActiveId] = useState('');

    const scrollToSection = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 100; // Height of fixed header + padding
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-20% 0px -35% 0px" }
        );

        sections.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sections]);

    if (!sections || sections.length === 0) return null;

    return (
        <nav className="mb-12 p-6 bg-slate-900/50 rounded-2xl border border-slate-800 backdrop-blur-sm">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                <List className="text-amber-500 w-5 h-5" />
                목차 (Table of Contents)
            </h4>
            <ul className="space-y-2">
                {sections.map(({ id, title }) => (
                    <li key={id}>
                        <a
                            href={`#${id}`}
                            onClick={(e) => scrollToSection(e, id)}
                            className={`flex items-center gap-2 text-sm transition-colors duration-200 group ${activeId === id
                                    ? 'text-amber-400 font-medium translate-x-1'
                                    : 'text-slate-400 hover:text-white hover:translate-x-1'
                                }`}
                        >
                            <ChevronRight size={14} className={`transition-transform duration-200 ${activeId === id ? 'text-amber-500 opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                            {title}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TableOfContents;
