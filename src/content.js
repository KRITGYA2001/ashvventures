// Single source for the copy used across the site.

export const company = {
    name: 'ASHV Ventures',
    short: 'ASHV',
    tagline: 'Design, construction, and material supply in one delivery flow.',
    email: 'contact@ashvventures.com',
    phone: '+91 8700832180',
    phoneHref: 'tel:+918700832180',
    whatsapp: '918700832180',
    address: ['H. No. 178-B, Ground Floor', 'Basant Nagar, New Delhi', '110057, India'],
    hours: 'Mon — Sat, 9:00 AM – 6:00 PM',
    coords: '28.5712° N, 77.1582° E',
    mapSrc:
        'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3503.826!2d77.158168!3d28.571209!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m1!2zMjjCsDM0JzE2LjQiTiA3N8KwMDknMjkuNCJF!5e0!3m2!1sen!2sin!4v1709000000000!5m2!1sen!2sin',
};

export const navItems = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'Studio' },
    { to: '/materials', label: 'Materials' },
    { to: '/contact', label: 'Contact' },
    { to: '/brochure', label: 'Brochure' },
];

export const disciplines = [
    {
        id: 'design',
        number: '01',
        title: 'Design',
        lead: 'Design strategy',
        copy: 'Concepts shaped around space, materials, and execution from the beginning, so design decisions hold up on site.',
        points: ['Spatial planning', 'Concept & detailing', 'Technical drawings'],
        image: '/images/slides/ashv-hero.png',
        alt: 'Modern exterior architecture with warm stone and clean lines',
    },
    {
        id: 'build',
        number: '02',
        title: 'Construction',
        lead: 'Construction delivery',
        copy: 'Execution that stays disciplined from planning through on-site delivery, with clear sequencing and quality checkpoints.',
        points: ['Sequencing & site control', 'Quality checkpoints', 'Transparent progress'],
        image: '/images/slides/ashv-construction.png',
        alt: 'Construction of a modern building project',
    },
    {
        id: 'supply',
        number: '03',
        title: 'Material Supply',
        lead: 'Material coordination',
        copy: 'Finishes and materials curated to protect the design intent and the budget, sourced as part of one project system.',
        points: ['Curated finishes', 'Brand partnerships', 'Budget protection'],
        image: '/images/slides/ashv-materials.png',
        alt: 'Curated premium materials and finishes',
    },
];

export const processSteps = [
    {
        number: '01',
        title: 'Brief & site reading',
        copy: 'We align on project goals, context, and the most important constraints before momentum starts.',
    },
    {
        number: '02',
        title: 'Design & technical planning',
        copy: 'Spatial direction, specifications, and delivery logic are shaped together so decisions stay practical.',
    },
    {
        number: '03',
        title: 'Build & source',
        copy: 'Execution and procurement run against the same quality standard, with progress kept visible.',
    },
    {
        number: '04',
        title: 'Finish & handover',
        copy: 'Details, finishes, and handover quality are treated as part of the process, not a last-minute correction.',
    },
];

export const values = [
    {
        title: 'Clarity in communication',
        copy: 'Decisions, updates, and next steps stay visible so the project does not drift into confusion.',
    },
    {
        title: 'Respect for timelines',
        copy: 'Planning and sequencing are treated seriously because premium outcomes depend on disciplined momentum.',
    },
    {
        title: 'Detail-led quality',
        copy: 'Execution quality is protected through materials, finishes, and practical oversight at every stage.',
    },
    {
        title: 'Long-term accountability',
        copy: 'We aim to leave clients with confidence in the result, not just a completed scope on paper.',
    },
];

export const vision =
    'A single standard of quality across design, build, and supply, so every project feels resolved rather than assembled in parts.';

export const mission =
    'Connect decisions across design, construction, and materials. Keep updates and next steps visible, respect timelines, and protect execution quality through finishes and practical oversight at every stage.';

export const manifesto =
    'Ashv Ventures brings design thinking, construction discipline and material coordination into one delivery flow — so your project feels resolved, not assembled in parts.';

export const pad = (value) => String(value).padStart(2, '0');
