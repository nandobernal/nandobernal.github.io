import { experience, culinarySkills, opSkills, languages, education } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initHeroAnimation();
    initTimeline();
    initSkills();
    initEducation();
    initScrollEffects();
    initCounters();
});

function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 }});
    tl.to('#hero-title', { opacity: 1, y: 0, delay: 0.5 })
      .to('#hero-subtitle', { opacity: 1, y: 0 }, '-=0.8')
      .to('#hero-tagline', { opacity: 1, y: 0 }, '-=0.8')
      .to('#hero-cta', { opacity: 1, y: 0 }, '-=0.8');

    gsap.to('.parallax-bg', {
        scrollTrigger: {
            trigger: 'header',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        scale: 1.1
    });
}

function initTimeline() {
    const container = document.getElementById('timeline');
    experience.forEach((exp, i) => {
        const item = document.createElement('div');
        item.className = 'timeline-item reveal';
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="glass-card p-8 rounded-sm">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h4 class="text-gold uppercase tracking-widest text-sm mb-1">${exp.period}</h4>
                        <h3 class="font-serif text-2xl">${exp.role}</h3>
                        <p class="text-gray-400 font-light">${exp.company}</p>
                    </div>
                    <i data-lucide="award" class="text-gold/20 w-8 h-8"></i>
                </div>
                <div class="text-sm text-gray-300 leading-relaxed mb-4">
                    <p class="mb-2 italic">"${exp.focus}"</p>
                    <p class="border-l border-gold/50 pl-4 py-1 bg-white/5">${exp.achievement}</p>
                </div>
                <div class="flex flex-wrap gap-2">
                    ${exp.tags.map(tag => `<span class="px-2 py-1 bg-white/5 text-[10px] uppercase tracking-tighter text-gray-400">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        container.appendChild(item);
    });
    lucide.createIcons();
}

function initSkills() {
    const culinaryContainer = document.getElementById('culinary-skills');
    culinarySkills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'reveal mb-6';
        div.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm uppercase tracking-widest">${skill.name}</span>
            </div>
            <div class="progress-container">
                <div class="progress-bar" data-width="${skill.level}%"></div>
            </div>
        `;
        culinaryContainer.appendChild(div);
    });

    const opContainer = document.getElementById('op-skills');
    opSkills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'reveal mb-6';
        div.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm uppercase tracking-widest">${skill.name}</span>
            </div>
            <div class="progress-container">
                <div class="progress-bar" data-width="${skill.level}%"></div>
            </div>
        `;
        opContainer.appendChild(div);
    });

    const langContainer = document.getElementById('languages');
    languages.forEach(lang => {
        const div = document.createElement('div');
        div.className = 'reveal';
        div.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <span class="text-sm uppercase tracking-widest font-semibold">${lang.name}</span>
                <span class="text-xs text-gold">${lang.label}</span>
            </div>
            <div class="progress-container h-[2px]">
                <div class="progress-bar" data-width="${lang.level}%"></div>
            </div>
        `;
        langContainer.appendChild(div);
    });
}

function initEducation() {
    const container = document.getElementById('edu-cards');
    education.forEach(edu => {
        const card = document.createElement('div');
        card.className = 'glass-card p-10 reveal';
        card.innerHTML = `
            <i data-lucide="graduation-cap" class="text-gold mb-6 w-8 h-8"></i>
            <h4 class="text-gold text-xs uppercase tracking-[0.2em] mb-4">${edu.location}</h4>
            <h3 class="font-serif text-xl mb-4">${edu.institution}</h3>
            <p class="text-sm text-gray-400 leading-relaxed">${edu.description}</p>
        `;
        container.appendChild(card);
    });
    lucide.createIcons();
}

function initCounters() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = parseInt(target.getAttribute('data-target'));
                animateCounter(target, value);
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
}

function animateCounter(el, target) {
    let count = 0;
    const speed = 2000 / target;
    const timer = setInterval(() => {
        count++;
        el.innerText = count + (el.parentElement.innerText.includes('%') ? '%' : '+');
        if (count >= target) {
            clearInterval(timer);
            el.innerText = target + (el.parentElement.innerText.includes('%') ? '%' : '+');
        }
    }, speed);
}

function initScrollEffects() {
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
                const bar = el.querySelector('.progress-bar');
                if (bar) bar.style.width = bar.getAttribute('data-width');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    

    window.addEventListener('scroll', () => {
        const nav = document.getElementById('main-nav');
        if (window.scrollY > 50) {
            nav.classList.add('bg-black/90', 'py-4', 'border-b', 'border-white/10');
            nav.classList.remove('py-6');
        } else {
            nav.classList.remove('bg-black/90', 'border-b', 'border-white/10');
            nav.classList.add('py-6');
        }
    });

    reveal(); // Initial check
}
