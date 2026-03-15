import { stats, experience, skills, education, languages } from './data.js';

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.renderLanguages();
        this.renderStats();
        this.renderExperience();
        this.renderSkills();
        this.renderEducation();
        

        setTimeout(() => {
            lucide.createIcons();
            this.initAnimations();
        }, 100);

        document.getElementById('year').textContent = new Date().getFullYear();
    }

    renderLanguages() {
        const container = document.getElementById('language-switcher');
        container.innerHTML = languages.map((lang, index) => `
            <div class="group relative flex items-center cursor-pointer">
                <span class="text-xs font-medium ${index === 0 ? 'text-gold' : 'text-gray-400'} hover:text-gold transition-colors">${lang.code}</span>
                <div class="absolute top-full right-0 mt-2 px-3 py-1 bg-black/80 backdrop-blur border border-white/10 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                    ${lang.name} (${lang.level})
                </div>
            </div>
            ${index < languages.length - 1 ? '<span class="text-white/20 text-xs">|</span>' : ''}
        `).join('');
    }

    renderStats() {
        const container = document.getElementById('stats-container');
        container.innerHTML = stats.map(stat => `
            <div class="gs-stat">
                <div class="text-4xl md:text-5xl font-serif font-bold text-gold-gradient mb-2">${stat.value}</div>
                <div class="text-sm text-gray-400 uppercase tracking-wider">${stat.label}</div>
            </div>
        `).join('');
    }

    renderExperience() {
        const container = document.getElementById('timeline-container');
        container.innerHTML = experience.map((exp, index) => `
            <div class="relative glass-card p-8 gs-reveal">
                <div class="timeline-dot"></div>
                <div class="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                    <div>
                        <h3 class="text-2xl font-serif font-bold text-white mb-1">${exp.title}</h3>
                        <div class="text-gold font-medium tracking-wide uppercase text-sm">${exp.company}</div>
                    </div>
                    <span class="inline-block px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 whitespace-nowrap">
                        ${exp.period}
                    </span>
                </div>
                <p class="text-gray-400 font-light leading-relaxed">
                    ${exp.description}
                </p>
            </div>
        `).join('');
    }

    renderSkills() {
        const container = document.getElementById('bento-container');
        container.innerHTML = skills.map(skill => `
            <div class="glass-card p-8 flex flex-col h-full gs-reveal ${skill.size}">
                <div class="mb-6">
                    <i data-lucide="${skill.icon}" class="w-8 h-8 text-gold"></i>
                </div>
                <h3 class="text-xl font-serif font-bold mb-4">${skill.title}</h3>
                <div class="mt-auto flex flex-wrap gap-2">
                    ${skill.tags.map(tag => `
                        <span class="px-3 py-1 bg-black/40 border border-white/5 rounded-full text-xs text-gray-300">
                            ${tag}
                        </span>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    renderEducation() {
        const container = document.getElementById('education-container');
        container.innerHTML = education.map(edu => `
            <div class="glass-card p-8 text-center flex flex-col items-center justify-center gs-reveal">
                <div class="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
                    <i data-lucide="${edu.icon}" class="w-8 h-8 text-gold"></i>
                </div>
                <h3 class="text-xl font-serif font-bold mb-2">${edu.title}</h3>
                <p class="text-gray-400 font-light text-sm uppercase tracking-widest">${edu.institution}</p>
            </div>
        `).join('');
    }

    initAnimations() {
        gsap.registerPlugin(ScrollTrigger);


        gsap.fromTo("#hero .gs-reveal", 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power3.out" }
        );


        gsap.fromTo(".gs-stat", 
            { y: 30, opacity: 0 },
            { 
                y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out",
                scrollTrigger: {
                    trigger: "#stats",
                    start: "top 80%"
                }
            }
        );


        const revealElements = document.querySelectorAll("section .gs-reveal");
        revealElements.forEach(el => {
            gsap.fromTo(el,
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1, ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });


        window.addEventListener('scroll', () => {
            const nav = document.getElementById('navbar');
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(26, 26, 26, 0.9)';
                nav.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
            } else {
                nav.style.background = 'rgba(43, 43, 43, 0.8)';
                nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
