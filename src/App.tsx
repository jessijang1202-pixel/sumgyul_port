/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Menu,
  X,
  Sparkles,
  Image as ImageIcon
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Lang = 'kr' | 'en';

function Logo({ className, footer = false }: { className?: string; footer?: boolean }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="w-8 h-8 bg-brand-blue/20 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-brand-blue" />
        </div>
        <span className={cn(
          "font-bold tracking-tighter text-white",
          footer ? "text-lg" : "text-xl"
        )}>
          숨결;온 <span className="text-brand-cyan-soft italic">On Studio</span>
        </span>
      </div>
    );
  }

  return (
    <img
      src="/lonstudio_trans.png"
      alt="숨결;온 On Studio Logo"
      className={className}
      onError={() => setError(true)}
      referrerPolicy="no-referrer"
    />
  );
}

function ImagePlaceholder({ ratio, caption, className }: { ratio: string; caption: string; className?: string }) {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-2 bg-[var(--surface-alt)] border border-[var(--border-soft)] text-[var(--text-muted)]", ratio, className)}>
      <ImageIcon className="w-6 h-6 opacity-50" />
      <span className="text-xs font-medium px-4 text-center">{caption}</span>
    </div>
  );
}

const contactSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요.'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
  phone: z.string().optional(),
  message: z.string().min(10, '문의 내용을 10자 이상 입력해주세요.'),
  consent: z.boolean().refine((v) => v === true, { message: '개인정보 수집·이용에 동의해주세요.' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const content = {
  kr: {
    navLinks: [
      { href: '#services', label: '서비스' },
      { href: '#portfolio', label: '포트폴리오' },
      { href: '#about', label: '회사소개' },
      { href: '#pricing', label: '요금안내' },
    ],
    navCta: '상담 신청',
    heroKicker: 'Web · App Development Studio',
    heroTitle: <>아이디어에 <span className="text-gradient">숨결</span>을,<br />웹·앱으로 구현합니다</>,
    heroSub: "20년 서비스·개발 기획 경험을 바탕으로, 아이디어 단계의 서비스를 실제 운영 가능한 웹·앱 제품으로 구현합니다.",
    heroCtaPrimary: "무료 상담 신청",
    heroCtaSecondary: "포트폴리오 보기",
    aboutEyebrow: "About Us",
    aboutTitle: "숨결 온스튜디오 소개",
    aboutTags: ["20년 기획 경험", "특허 9건 출원"],
    about: [
      "숨결 온스튜디오는 웹사이트·앱 개발 전문 스타트업입니다. 대표의 20년 서비스·개발 기획 경험을 바탕으로, 아이디어를 Next.js 기반의 실제 운영 가능한 웹·앱 제품으로 구현합니다.",
      "로컬루프 코리아, 크리스피카피, 스냅릴 등 다수의 자체 서비스를 기획·개발·운영하며 특허 9건을 출원했고, 소상공인·지역 기업의 디지털 전환을 지원하는 개발 전문기업으로 성장하고 있습니다.",
    ],
    servicesEyebrow: "Services",
    servicesTitle: "기획부터 배포까지",
    servicesSub: "웹사이트 · 애플리케이션 · 유지보수",
    services: [
      { title: "웹사이트 구축", description: "Next.js 기반의 반응형 웹사이트와 랜딩페이지를 기획부터 배포까지 자체 인력으로 구축합니다." },
      { title: "애플리케이션 개발", description: "회원 관리, 외부 API 연동, 관리자 대시보드 등 실제 운영 가능한 웹·앱 서비스를 설계하고 개발합니다." },
      { title: "유지보수 & 운영", description: "안정적인 배포 환경을 구성하고, 서비스 오픈 이후의 유지보수와 운영을 지원합니다." },
    ],
    portfolioEyebrow: "Portfolio",
    portfolioTitle: "직접 기획하고 개발한 서비스들",
    portfolioSub: "기획부터 개발, 배포와 운영까지 자체 인력으로 만들어온 숨결;온스튜디오의 서비스 개발 실적입니다.",
    portfolio: [
      { industry: "SaaS Platform", title: "로컬루프 코리아 (Localoop Korea)", description: "국내 거주 외국인을 위한 AI 기반 생활 적응 SaaS 플랫폼. 장소·음식·모임·사람 4대 축으로 회원 매칭·다국어 번역·지역 추천 제공, 특허 3건 출원.", image: "/p_localoop.png" },
      { industry: "AI SaaS", title: "크리스피카피 (CrispyCopy)", description: "AI가 브랜드를 학습해 네이버 블로그·인스타그램·카카오톡·당근·스레드·틱톡 6개 채널용 SNS 콘텐츠를 자동 작성하는 SaaS. 특허 3건 출원.", image: "/p_crispycopy.png" },
      { industry: "Mobile App", title: "스냅릴 (SnapReel)", description: "숏폼 영상 자동 생성 앱. 단순 자동생성 모드와 사용자 승인 절차 포함 10단계 고급 모드로 구성.", image: "/p_snapreel.png" },
      { industry: "Community App", title: "평택광장", description: "지역 정당 당원을 위한 정보공유 앱. 현수막 지도, 행사 일정, 자원봉사 지도, Gemini API 기반 일일 인사말 카드 기능 포함.", image: "/p_pyungtaek.jpg" },
      { industry: "Productivity App", title: "솔로플로우 (SoloFlow)", description: "개인의 주간·일간 목표를 설정하고 실행을 관리하는 목표 관리 앱.", image: "/p_soloflow.jpg" },
      { industry: "Media Platform", title: "바이칼뉴스 (Baikal News)", description: "인터넷신문사의 뉴스 콘텐츠 제작·게재용 온라인 플랫폼 구축·운영에 개발 인력으로 참여.", image: "/p_baikalnews.png" },
    ],
    portfolioImageCaption: "프로젝트 사진 준비 중",
    pricingEyebrow: "Pricing",
    pricingTitle: <>합리적인 비용으로 시작하는<br />압도적인 퀄리티</>,
    pricingSub: "당신의 비즈니스 규모와 필요에 맞는 최적의 플랜을 제안합니다.",
    pricingDurationLabel: "기간:",
    pricingCta: "지금 바로 문의하기",
    pricingPlans: [
      {
        title: "랜딩페이지 제작",
        features: ["반응형 원페이지 웹사이트 구축", "Next.js 기반 페이지 개발", "문의폼 및 메일 연동", "모바일 최적화 및 기본 SEO 세팅"],
        duration: "협의 후 안내",
        price: "별도 견적",
        priceSuffix: ""
      },
      {
        title: "웹 서비스 개발",
        features: ["회원 관리 시스템 구축", "외부 API 연동", "관리자 대시보드 개발", "데이터베이스 설계 및 구축"],
        duration: "협의 후 안내",
        price: "별도 견적",
        priceSuffix: ""
      },
      {
        title: "모바일 앱 개발",
        features: ["서비스 기획 및 화면 설계", "iOS/Android 대응 애플리케이션 개발", "배포 및 스토어 등록 지원", "출시 이후 초기 안정화 지원"],
        duration: "협의 후 안내",
        price: "별도 견적",
        priceSuffix: ""
      },
      {
        title: "유지보수 & 사무자동화",
        features: ["기존 서비스 유지보수 및 기능 개선", "소규모 기능 추가 개발", "업무 자동화 도구 개발", "배포 환경 구성 및 운영"],
        duration: "협의 후 안내",
        price: "별도 견적",
        priceSuffix: ""
      }
    ],
    ctaBannerTitle: <>당신의 아이디어,<br />이제 실제 제품으로 만들 시간입니다.</>,
    ctaBannerButton: "지금 바로 문의하기",
    contactEyebrow: "Contact",
    contactTitle: "지금 문의해보세요",
    contactSub: "간단한 정보만 남겨주시면 담당자가 1영업일 이내에 연락드립니다.",
    contactRows: [
      { label: "sumgyulonstudio@gmail.com", href: "mailto:sumgyulonstudio@gmail.com" },
      { label: "경기도 평택시", href: null },
      { label: "카카오톡 상담", href: "http://pf.kakao.com/_QxcxauX" },
      { label: "크몽", href: "https://kmong.com/gig/762621" },
    ],
    formNameLabel: "이름 / 업체명",
    formNamePlaceholder: "예: 홍길동 / OO상회",
    formEmailLabel: "이메일 주소",
    formPhoneLabel: "연락처",
    formPhonePlaceholder: "010-0000-0000",
    formMessageLabel: "문의 내용",
    formMessagePlaceholder: "어떤 도움이 필요하신가요?",
    formConsentLabel: "개인정보 수집·이용에 동의합니다",
    formSubmitting: "전송 중...",
    formSubmit: "문의 보내기",
    formSuccess: "문의가 성공적으로 전송되었습니다!",
    formErrorDefault: "이메일 전송에 실패했습니다. 다시 시도해주세요.",
    formErrorMissingKey: "이메일 전송 키가 설정되지 않았습니다. 환경 변수(VITE_WEB3FORMS_ACCESS_KEY)를 확인해주세요.",
    footerCopyright: "© 2026 숨결;온스튜디오. All rights reserved.",
    kakaoCta: "30분 무료상담",
  },
  en: {
    navLinks: [
      { href: '#services', label: 'Services' },
      { href: '#portfolio', label: 'Portfolio' },
      { href: '#about', label: 'About' },
      { href: '#pricing', label: 'Pricing' },
    ],
    navCta: 'Contact',
    heroKicker: 'Web · App Development Studio',
    heroTitle: <>We Breathe <span className="text-gradient">Life</span><br />into Web &amp; App Products</>,
    heroSub: "With 20 years of hands-on experience in service and development planning, we turn early-stage ideas into fully operational web and app products.",
    heroCtaPrimary: "Free Consultation",
    heroCtaSecondary: "View Portfolio",
    aboutEyebrow: "About Us",
    aboutTitle: "About Sumgyeol On Studio",
    aboutTags: ["20 Years of Planning", "9 Patents Filed"],
    about: [
      "Sumgyeol On Studio is a website and app development startup. Drawing on the founder's 20 years of experience in service and development planning, we turn ideas into fully operational web and app products built on Next.js.",
      "We've planned, built, and operated proprietary services including Localoop Korea, CrispyCopy, and SnapReel, filed nine patents, and continue growing as a development studio that helps small businesses and local companies with practical digital transformation.",
    ],
    servicesEyebrow: "Services",
    servicesTitle: "From Planning to Deployment",
    servicesSub: "Website · Application · Maintenance",
    services: [
      { title: "Website Development", description: "We build responsive websites and landing pages end-to-end, from planning to deployment, using Next.js." },
      { title: "Application Development", description: "We design and build fully operational web and app services, including member management, third-party API integrations, and admin dashboards." },
      { title: "Maintenance & Operations", description: "We set up reliable deployment infrastructure and support maintenance and operations after launch." },
    ],
    portfolioEyebrow: "Portfolio",
    portfolioTitle: "Services We've Built In-House",
    portfolioSub: "See how Sumgyeol On Studio has planned, built, deployed, and operated its own services entirely in-house.",
    portfolio: [
      { industry: "SaaS Platform", title: "Localoop Korea", description: "An AI-powered life-adaptation SaaS platform for foreign residents in Korea. Matches members and recommends places, food, meetups, and people through AI, with multilingual translation and local recommendations. Three patents filed.", image: "/p_localoop.png" },
      { industry: "AI SaaS", title: "CrispyCopy", description: "An AI SaaS that learns a brand's voice to auto-write SNS content for six channels — Naver Blog, Instagram, KakaoTalk, Danggeun, Threads, and TikTok. Three patents filed.", image: "/p_crispycopy.png" },
      { industry: "Mobile App", title: "SnapReel", description: "A short-form video auto-generation app, offering both a simple auto-generate mode and a 10-step advanced mode with user approval steps.", image: "/p_snapreel.png" },
      { industry: "Community App", title: "Pyeongtaek Plaza", description: "An information-sharing app for members of a local political party, featuring a banner map, event schedule, volunteer map, and Gemini API-based daily greeting cards.", image: "/p_pyungtaek.jpg" },
      { industry: "Productivity App", title: "SoloFlow", description: "A goal-management app for setting and tracking personal weekly and daily goals.", image: "/p_soloflow.jpg" },
      { industry: "Media Platform", title: "Baikal News", description: "Joined as a developer to build and operate the online platform for an internet newspaper's news content production and publishing.", image: "/p_baikalnews.png" },
    ],
    portfolioImageCaption: "Project photo coming soon",
    pricingEyebrow: "Pricing",
    pricingTitle: <>Exceptional Quality,<br />Starting at a Fair Price</>,
    pricingSub: "We recommend the plan that best fits your business size and needs.",
    pricingDurationLabel: "Timeline:",
    pricingCta: "Contact Us Now",
    pricingPlans: [
      {
        title: "Landing Page",
        features: ["Responsive one-page website", "Built with Next.js", "Contact form & email integration", "Mobile optimization & basic SEO setup"],
        duration: "By consultation",
        price: "Custom quote",
        priceSuffix: ""
      },
      {
        title: "Web Service Development",
        features: ["Member management system", "Third-party API integration", "Admin dashboard development", "Database design & setup"],
        duration: "By consultation",
        price: "Custom quote",
        priceSuffix: ""
      },
      {
        title: "Mobile App Development",
        features: ["Service planning & screen design", "iOS/Android app development", "Deployment & store listing support", "Post-launch stabilization support"],
        duration: "By consultation",
        price: "Custom quote",
        priceSuffix: ""
      },
      {
        title: "Maintenance & Automation",
        features: ["Maintenance & improvements for existing services", "Small-scale feature additions", "Office automation tool development", "Deployment environment setup & operations"],
        duration: "By consultation",
        price: "Custom quote",
        priceSuffix: ""
      }
    ],
    ctaBannerTitle: <>Your idea —<br />it's time to make it real.</>,
    ctaBannerButton: "Contact Us Now",
    contactEyebrow: "Contact",
    contactTitle: "Get in Touch",
    contactSub: "Leave us a few details and we'll get back to you within 1 business day.",
    contactRows: [
      { label: "sumgyulonstudio@gmail.com", href: "mailto:sumgyulonstudio@gmail.com" },
      { label: "Pyeongtaek, South Korea", href: null },
      { label: "KakaoTalk", href: "http://pf.kakao.com/_QxcxauX" },
      { label: "Kmong", href: "https://kmong.com/gig/762621" },
    ],
    formNameLabel: "Name / Company",
    formNamePlaceholder: "John Doe",
    formEmailLabel: "Email Address",
    formPhoneLabel: "Phone",
    formPhonePlaceholder: "+82 10-0000-0000",
    formMessageLabel: "Message",
    formMessagePlaceholder: "Tell us more about your project.",
    formConsentLabel: "I agree to the collection and use of my personal information",
    formSubmitting: "Sending...",
    formSubmit: "Send Message",
    formSuccess: "Your message has been sent successfully!",
    formErrorDefault: "Failed to send message. Please try again.",
    formErrorMissingKey: "Email delivery key is not configured. Please check the VITE_WEB3FORMS_ACCESS_KEY environment variable.",
    footerCopyright: "© 2026 Sumgyeol On Studio. All rights reserved.",
    kakaoCta: "Free 30-min Consultation",
  },
} as const;

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPricingIndex, setCurrentPricingIndex] = useState(0);
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('sumgyul-lang') as Lang) || 'kr');

  const t = content[lang];

  const toggleLang = () => {
    const next: Lang = lang === 'kr' ? 'en' : 'kr';
    setLang(next);
    localStorage.setItem('sumgyul-lang', next);
  };

  const pricingPlans = t.pricingPlans;

  const nextPricing = () => {
    setCurrentPricingIndex((prev) => (prev + 1) % pricingPlans.length);
  };

  const prevPricing = () => {
    setCurrentPricingIndex((prev) => (prev - 1 + pricingPlans.length) % pricingPlans.length);
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      if (!accessKey) {
        console.error("Web3Forms Access Key is missing. Please set VITE_WEB3FORMS_ACCESS_KEY.");
        setErrorMessage(t.formErrorMissingKey);
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `[숨결;온스튜디오] 새로운 문의가 도착했습니다 - ${data.name}님`,
          from_name: data.name,
          email: data.email,
          message: `성함/업체명: ${data.name}\n이메일: ${data.email}\n연락처: ${data.phone || '-'}\n\n문의 내용:\n${data.message}`
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        throw new Error(result.message || t.formErrorDefault);
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || t.formErrorDefault);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)] selection:bg-brand-blue/20 max-w-[1200px] mx-auto relative shadow-2xl overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-50 bg-brand-navy/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Logo className="h-[48px] w-auto object-contain" />
          </div>

          <div className="hidden md:flex items-center gap-7">
            {t.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-white/80 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xs font-bold"
              aria-label="Toggle language"
            >
              {lang === 'kr' ? 'EN' : 'KR'}
            </button>
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-brand-blue to-brand-purple shadow-[0_4px_16px_rgba(47,107,255,0.35)] hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              {t.navCta}
            </a>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleLang}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors text-xs font-bold"
              aria-label="Toggle language"
            >
              {lang === 'kr' ? 'EN' : 'KR'}
            </button>
            <button className="text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-40 bg-brand-navy pt-24 px-6 md:hidden text-center"
          >
            <div className="flex flex-col gap-6 text-2xl font-bold text-white">
              {t.navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>{link.label}</a>
              ))}
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-brand-cyan-soft">{t.navCta}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section
          id="hero"
          className="relative pt-40 pb-24 px-6 overflow-hidden text-white"
          style={{ background: 'radial-gradient(circle at 15% 20%, rgba(124,92,255,0.35), transparent 45%), radial-gradient(circle at 85% 70%, rgba(34,211,238,0.28), transparent 45%), #0a0f2c' }}
        >
          <svg className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 1200 600">
            <path d="M0,420 C250,340 380,500 620,420 C860,340 950,470 1200,380" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
            <path d="M0,470 C260,400 400,540 640,460 C880,380 970,500 1200,430" fill="none" stroke="#7c5cff" strokeWidth="1.5" />
            <path d="M0,370 C220,300 360,440 600,370 C840,300 940,410 1200,330" fill="none" stroke="#2f6bff" strokeWidth="1.2" />
          </svg>

          <div className="max-w-7xl mx-auto relative grid md:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="text-xs font-bold uppercase tracking-[0.14em] text-brand-cyan-soft mb-4">{t.heroKicker}</div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.2] mb-5 tracking-tight break-keep">
                {t.heroTitle}
              </h1>
              <p className="text-base md:text-lg text-white/72 mb-8 leading-relaxed max-w-xl break-keep">
                {t.heroSub}
              </p>
              <div className="flex flex-wrap gap-3 mb-9">
                <motion.a
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  href="#contact"
                  className="px-7 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-brand-blue to-brand-purple shadow-[0_8px_24px_rgba(47,107,255,0.4)] transition-transform"
                >
                  {t.heroCtaPrimary}
                </motion.a>
                <a
                  href="#portfolio"
                  className="px-7 py-3.5 rounded-full font-bold text-white border border-white/25 hover:bg-white/10 transition-colors"
                >
                  {t.heroCtaSecondary}
                </a>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {t.services.map((service, index) => (
                  <span key={index} className="inline-flex items-center px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/85">
                    {service.title}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="relative aspect-[4/5] rounded-[20px] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
              <img
                src="/hero-cityscape.png"
                alt=""
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 md:py-[88px] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-brand-blue mb-3">{t.aboutEyebrow}</div>
            <h2 className="text-2xl md:text-[32px] font-extrabold mb-8 max-w-[18ch] tracking-tight break-keep">{t.aboutTitle}</h2>
            <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10">
              <div className="flex flex-wrap gap-2.5 content-start">
                {t.aboutTags.map((tag, index) => (
                  <span key={index} className="px-4 py-2 rounded-full bg-brand-tag-bg text-brand-tag-text text-sm font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="space-y-4">
                {t.about.map((paragraph, index) => (
                  <p key={index} className="text-[var(--text-secondary)] leading-relaxed break-keep">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 md:py-[88px] px-6 bg-[var(--surface-alt)] text-center">
          <div className="max-w-7xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-brand-blue mb-3">{t.servicesEyebrow}</div>
            <h2 className="text-2xl md:text-[32px] font-extrabold mb-2 tracking-tight break-keep">{t.servicesTitle}</h2>
            <p className="text-[var(--text-muted)] mb-12">{t.servicesSub}</p>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              {t.services.map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="glass-card p-8"
                >
                  <h4 className="text-lg font-bold mb-2.5">{service.title}</h4>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 md:py-[88px] px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-brand-blue mb-3">{t.portfolioEyebrow}</div>
            <h2 className="text-2xl md:text-[32px] font-extrabold mb-2 max-w-[20ch] tracking-tight break-keep">{t.portfolioTitle}</h2>
            <p className="text-[var(--text-muted)] max-w-2xl mb-10 break-keep">
              {t.portfolioSub}
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {t.portfolio.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6 }}
                  className="glass-card overflow-hidden"
                >
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full aspect-[4/3] object-cover object-top" />
                  ) : (
                    <ImagePlaceholder ratio="aspect-[4/3]" caption={t.portfolioImageCaption} className="w-full !border-0 !border-b !border-[var(--border-soft)] rounded-none" />
                  )}
                  <div className="p-5">
                    <span className="inline-block px-3 py-1 rounded-full bg-brand-tag-bg text-brand-tag-text text-[11px] font-bold mb-2.5">
                      {item.industry}
                    </span>
                    <h4 className="text-[17px] font-bold mb-2">{item.title}</h4>
                    <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-[88px] px-6 bg-[var(--surface-alt)] text-center">
          <div className="max-w-7xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-brand-blue mb-3">{t.pricingEyebrow}</div>
            <h2 className="text-2xl md:text-[32px] font-extrabold mb-3 tracking-tight break-keep">{t.pricingTitle}</h2>
            <p className="text-[var(--text-muted)] mb-12 break-keep">{t.pricingSub}</p>

            <div className="max-w-md mx-auto relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPricingIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-9 relative overflow-hidden cursor-pointer text-left"
                  onClick={nextPricing}
                >
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-brand-blue text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                      {currentPricingIndex + 1} / {pricingPlans.length}
                    </div>
                  </div>

                  <div className="text-xs font-bold text-brand-blue uppercase tracking-wide mb-2">{pricingPlans[currentPricingIndex].title}</div>
                  <div className="text-2xl font-extrabold mb-1">
                    {pricingPlans[currentPricingIndex].price}
                    <span className="text-sm font-normal text-[var(--text-muted)] ml-1">{pricingPlans[currentPricingIndex].priceSuffix}</span>
                  </div>

                  <div className="inline-block px-3 py-1 rounded-full bg-brand-tag-bg text-brand-tag-text text-xs font-semibold mb-6">
                    {t.pricingDurationLabel} {pricingPlans[currentPricingIndex].duration}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pricingPlans[currentPricingIndex].features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#contact" onClick={(e) => e.stopPropagation()} className="block w-full py-3.5 rounded-full text-white text-center font-bold bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-90 transition-opacity">
                    {t.pricingCta}
                  </a>
                </motion.div>
              </AnimatePresence>

              {/* Left Swipe Indicator */}
              <div
                className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 flex flex-col items-center gap-2 cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors z-10"
                onClick={prevPricing}
              >
                <motion.div
                  animate={{ x: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowLeft className="w-6 h-6" />
                </motion.div>
                <span className="hidden md:block text-xs font-bold tracking-widest uppercase">Prev</span>
              </div>

              {/* Right Swipe Indicator */}
              <div
                className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 flex flex-col items-center gap-2 cursor-pointer text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors z-10"
                onClick={nextPricing}
              >
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
                <span className="hidden md:block text-xs font-bold tracking-widest uppercase">Next</span>
              </div>
            </div>
          </div>
        </section>

        {/* Dark CTA Banner */}
        <section className="py-14 md:py-16 px-6 bg-brand-navy">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="text-xl md:text-[26px] font-extrabold text-white leading-snug">
              {t.ctaBannerTitle}
            </div>
            <a href="#contact" className="whitespace-nowrap px-8 py-4 rounded-full font-bold text-brand-navy bg-white hover:bg-white/90 transition-colors">
              {t.ctaBannerButton} <ArrowRight className="inline w-4 h-4 ml-1" />
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-[88px] px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14">
            <div>
              <div className="text-xs font-bold uppercase tracking-[0.12em] text-brand-blue mb-3">{t.contactEyebrow}</div>
              <h2 className="text-2xl md:text-[30px] font-extrabold mb-4 max-w-[16ch] tracking-tight break-keep">{t.contactTitle}</h2>
              <p className="text-[var(--text-muted)] mb-8 max-w-md break-keep">
                {t.contactSub}
              </p>

              <div className="flex flex-col gap-4">
                {t.contactRows.map((row, index) => (
                  row.href ? (
                    <a key={index} href={row.href} target={row.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm text-[var(--text-secondary)] hover:text-brand-blue transition-colors">
                      {row.label}
                    </a>
                  ) : (
                    <div key={index} className="text-sm text-[var(--text-secondary)]">
                      {row.label}
                    </div>
                  )
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1.5">{t.formNameLabel}</label>
                <input
                  {...register('name')}
                  className={cn(
                    "w-full box-border px-3.5 py-3 rounded-[10px] border bg-[var(--surface-alt)] border-[var(--border-soft)] focus:outline-none focus:border-brand-blue transition-colors",
                    errors.name && "border-red-500"
                  )}
                  placeholder={t.formNamePlaceholder}
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1.5">{t.formEmailLabel}</label>
                <input
                  {...register('email')}
                  className={cn(
                    "w-full box-border px-3.5 py-3 rounded-[10px] border bg-[var(--surface-alt)] border-[var(--border-soft)] focus:outline-none focus:border-brand-blue transition-colors",
                    errors.email && "border-red-500"
                  )}
                  placeholder="example@email.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1.5">{t.formPhoneLabel}</label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full box-border px-3.5 py-3 rounded-[10px] border bg-[var(--surface-alt)] border-[var(--border-soft)] focus:outline-none focus:border-brand-blue transition-colors"
                  placeholder={t.formPhonePlaceholder}
                />
              </div>
              <div>
                <label className="block text-sm text-[var(--text-muted)] mb-1.5">{t.formMessageLabel}</label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className={cn(
                    "w-full box-border px-3.5 py-3 rounded-[10px] border bg-[var(--surface-alt)] border-[var(--border-soft)] focus:outline-none focus:border-brand-blue transition-colors resize-y",
                    errors.message && "border-red-500"
                  )}
                  placeholder={t.formMessagePlaceholder}
                />
                {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>}
              </div>

              <label className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                <input type="checkbox" {...register('consent')} className="accent-brand-blue" />
                {t.formConsentLabel}
              </label>
              {errors.consent && <p className="text-xs text-red-500 -mt-2">{errors.consent.message}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? t.formSubmitting : t.formSubmit}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-600 text-sm text-center"
                >
                  {t.formSuccess}
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm text-center"
                >
                  {errorMessage || t.formErrorDefault}
                </motion.div>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-navy py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          <div>
            <Logo className="h-[40px] w-auto object-contain" footer />
            <p className="text-xs text-white/50 mt-2">{t.footerCopyright}</p>
          </div>

          <div className="flex gap-6 text-sm">
            {t.navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-white/75 hover:text-white transition-colors">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* KakaoTalk Floating Button — temporarily hidden, restore by removing `false &&` */}
      {false && (
        <a
          href="http://pf.kakao.com/_QxcxauX"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#FEE500] text-[#000000] px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group"
        >
          <div className="flex flex-col text-right">
            <span className="text-[10px] font-bold opacity-70">숨결 온스튜디오</span>
            <span className="text-sm font-extrabold">{t.kakaoCta}</span>
          </div>
          <svg viewBox="0 0 32 32" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4.64c-6.96 0-12.64 4.48-12.64 10.08 0 3.52 2.32 6.64 5.76 8.48l-1.44 5.44c-.16.48.32.8.72.56l6.4-4.32c.4.08.8.08 1.2.08 6.96 0 12.64-4.48 12.64-10.08S22.96 4.64 16 4.64z" fill="#000000"/>
          </svg>
        </a>
      )}
    </div>
  );
}
