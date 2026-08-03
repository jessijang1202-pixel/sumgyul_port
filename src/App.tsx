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
  Layout,
  Smartphone,
  Target,
  ArrowRight,
  CheckCircle2,
  Instagram,
  Mail,
  MessageSquare,
  Menu,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowLeft,
  Store,
  Globe,
  PenTool,
  Video,
  MapPin,
  Newspaper,
  Sun,
  Moon
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
type Theme = 'dark' | 'light';

function Logo({ className, footer = false }: { className?: string; footer?: boolean }) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="w-8 h-8 bg-brand-purple/20 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-brand-accent" />
        </div>
        <span className={cn(
          "font-bold tracking-tighter text-white",
          footer ? "text-lg" : "text-xl"
        )}>
          숨결;온 <span className="text-brand-accent italic">On Studio</span>
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

const contactSchema = z.object({
  name: z.string().min(2, '이름을 입력해주세요.'),
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
  serviceType: z.string().min(1, '서비스 유형을 선택해주세요.'),
  message: z.string().min(10, '문의 내용을 10자 이상 입력해주세요.'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const serviceIcons = [
  <Layout className="w-6 h-6 text-brand-accent" />,
  <Smartphone className="w-6 h-6 text-brand-accent" />,
  <ShieldCheck className="w-6 h-6 text-brand-accent" />,
];

const portfolioIcons = [
  <Globe className="w-6 h-6 text-brand-accent" />,
  <PenTool className="w-6 h-6 text-brand-accent" />,
  <Video className="w-6 h-6 text-brand-accent" />,
  <MapPin className="w-6 h-6 text-brand-accent" />,
  <Target className="w-6 h-6 text-brand-accent" />,
  <Newspaper className="w-6 h-6 text-brand-accent" />,
];

const content = {
  kr: {
    navContact: "문의하기",
    heroBadge: "Website & App Development Studio",
    heroLine1: "아이디어에",
    heroLine2: "≈숨결≈",
    heroLine3: "웹·앱으로 구현합니다",
    heroSub: "20년 서비스·개발 기획 경험을 바탕으로, 아이디어 단계의 서비스를 Next.js·Supabase·Vercel 기반의 실제 운영 가능한 웹·앱 제품으로 구현합니다.",
    ctaPrimary: "프로젝트 시작하기",
    ctaSecondary: "포트폴리오 보기",
    aboutEyebrow: "About Us",
    aboutTitle: "숨결 온스튜디오 소개",
    about: [
      "숨결 온스튜디오는 경기도 평택의 웹사이트·앱 개발 전문 스타트업입니다. 대표의 20년 서비스·개발 기획 경험을 바탕으로, 아이디어를 Next.js·Supabase·Vercel 기반의 실제 운영 가능한 웹·앱 제품으로 구현합니다.",
      "로컬루프 코리아, 크리스피카피, 스냅릴 등 다수의 자체 서비스를 기획·개발·운영하며 특허 3건을 출원했고, 소상공인·지역 기업의 디지털 전환을 지원하는 개발 전문기업으로 성장하고 있습니다.",
    ],
    servicesEyebrow: "Our Services",
    servicesTitle: <>기획부터 배포까지,<br />웹사이트 l 애플리케이션 l 유지보수</>,
    services: [
      { title: "웹사이트 구축", description: "Next.js 기반의 반응형 웹사이트와 랜딩페이지를 기획부터 배포까지 자체 인력으로 구축합니다." },
      { title: "애플리케이션 개발", description: "회원 관리, 외부 API 연동, 관리자 대시보드 등 실제 운영 가능한 웹·앱 서비스를 설계하고 개발합니다." },
      { title: "유지보수 & 운영", description: "Vercel·Supabase 기반의 배포 환경을 구성하고, 서비스 오픈 이후의 유지보수와 운영을 지원합니다." },
    ],
    portfolioEyebrow: "Portfolio",
    portfolioTitle: "직접 기획하고 개발한 서비스들",
    portfolioSub: "기획부터 개발, 배포와 운영까지 자체 인력으로 만들어온 숨결;온스튜디오의 서비스 개발 실적을 확인해보세요.",
    portfolio: [
      { title: "로컬루프 코리아 (Localoop Korea)", description: "국내 거주 외국인을 위한 AI 기반 생활 적응 SaaS 플랫폼. 장소·음식·모임·사람 4대 축으로 회원 매칭·다국어 번역·지역 추천 제공, 특허 3건 출원." },
      { title: "크리스피카피 (CrispyCopy)", description: "AI가 브랜드를 학습해 네이버 블로그·인스타그램·카카오톡·당근·스레드·틱톡 6개 채널용 SNS 콘텐츠를 자동 작성하는 SaaS. 특허 3건 출원." },
      { title: "스냅릴 (SnapReel)", description: "숏폼 영상 자동 생성 앱. 단순 자동생성 모드와 사용자 승인 절차 포함 10단계 고급 모드로 구성." },
      { title: "평택광장", description: "지역 정당 당원(약 13명)을 위한 정보공유 앱. 현수막 지도, 행사 일정, 자원봉사 지도, Gemini API 기반 일일 인사말 카드 기능 포함." },
      { title: "솔로플로우 (SoloFlow)", description: "개인의 주간·일간 목표를 설정하고 실행을 관리하는 목표 관리 앱." },
      { title: "바이칼뉴스 (Baikal News)", description: "인터넷신문사의 뉴스 콘텐츠 제작·게재용 온라인 플랫폼 구축·운영에 개발 인력으로 참여." },
    ],
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
        features: ["회원 관리 시스템 구축", "외부 API 연동", "관리자 대시보드 개발", "Supabase 기반 데이터베이스 설계"],
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
        features: ["기존 서비스 유지보수 및 기능 개선", "소규모 기능 추가 개발", "업무 자동화 도구 개발", "Vercel 기반 배포 환경 운영"],
        duration: "협의 후 안내",
        price: "별도 견적",
        priceSuffix: ""
      }
    ],
    contactEyebrow: "Contact Us",
    contactTitle: <>새로운 프로젝트를<br />함께 시작해볼까요?</>,
    contactSub: <>문의를 남겨주시면 24시간 이내에 담당자가 <br />확인 후 순차적으로 연락 드립니다.</>,
    formNameLabel: "성함 / 업체명",
    formNamePlaceholder: "홍길동",
    formEmailLabel: "이메일 주소",
    formServiceLabel: "서비스 유형",
    formServiceOptions: [
      { value: "", label: "선택해주세요" },
      { value: "website", label: "웹사이트 제작" },
      { value: "app", label: "애플리케이션 개발" },
      { value: "maintenance", label: "유지보수·사무자동화" },
      { value: "other", label: "기타 문의" },
    ],
    formMessageLabel: "문의 내용",
    formMessagePlaceholder: "프로젝트에 대해 자세히 설명해주세요.",
    formSubmitting: "전송 중...",
    formSubmit: "문의 보내기",
    formSuccess: "문의가 성공적으로 전송되었습니다!",
    formErrorDefault: "이메일 전송에 실패했습니다. 다시 시도해주세요.",
    formErrorMissingKey: "이메일 전송 키가 설정되지 않았습니다. 환경 변수(VITE_WEB3FORMS_ACCESS_KEY)를 확인해주세요.",
    footerText: "숨결;온스튜디오. 웹사이트·앱 개발 전문기업 © 2026 All rights reserved.",
    kakaoCta: "30분 무료상담",
  },
  en: {
    navContact: "Contact",
    heroBadge: "Website & App Development Studio",
    heroLine1: "We Breathe",
    heroLine2: "≈Life≈",
    heroLine3: "into Web & App Products",
    heroSub: "With 20 years of hands-on experience in service and development planning, we turn early-stage ideas into fully operational web and app products built on Next.js, Supabase, and Vercel.",
    ctaPrimary: "Start a Project",
    ctaSecondary: "View Portfolio",
    aboutEyebrow: "About Us",
    aboutTitle: "About Sumgyeol On Studio",
    about: [
      "Sumgyeol On Studio is a website and app development startup based in Pyeongtaek, South Korea. Drawing on the founder's 20 years of experience in service and development planning, we turn ideas into fully operational web and app products built on Next.js, Supabase, and Vercel.",
      "We've planned, built, and operated proprietary services including Localoop Korea, CrispyCopy, and SnapReel, filed three patents, and continue growing as a development studio that helps small businesses and local companies with practical digital transformation.",
    ],
    servicesEyebrow: "Our Services",
    servicesTitle: <>From Planning to Deployment,<br />Website l Application l Maintenance</>,
    services: [
      { title: "Website Development", description: "We build responsive websites and landing pages end-to-end, from planning to deployment, using Next.js." },
      { title: "Application Development", description: "We design and build fully operational web and app services, including member management, third-party API integrations, and admin dashboards." },
      { title: "Maintenance & Operations", description: "We set up deployment infrastructure on Vercel and Supabase, and support maintenance and operations after launch." },
    ],
    portfolioEyebrow: "Portfolio",
    portfolioTitle: "Services We've Built In-House",
    portfolioSub: "See how Sumgyeol On Studio has planned, built, deployed, and operated its own services entirely in-house.",
    portfolio: [
      { title: "Localoop Korea", description: "An AI-powered life-adaptation SaaS platform for foreign residents in Korea. Matches members and recommends places, food, meetups, and people through AI, with multilingual translation and local recommendations. Three patents filed." },
      { title: "CrispyCopy", description: "An AI SaaS that learns a brand's voice to auto-write SNS content for six channels — Naver Blog, Instagram, KakaoTalk, Danggeun, Threads, and TikTok. Three patents filed." },
      { title: "SnapReel", description: "A short-form video auto-generation app, offering both a simple auto-generate mode and a 10-step advanced mode with user approval steps." },
      { title: "Pyeongtaek Plaza", description: "An information-sharing app for around 13 members of a local political party, featuring a banner map, event schedule, volunteer map, and Gemini API-based daily greeting cards." },
      { title: "SoloFlow", description: "A goal-management app for setting and tracking personal weekly and daily goals." },
      { title: "Baikal News", description: "Joined as a developer to build and operate the online platform for an internet newspaper's news content production and publishing." },
    ],
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
        features: ["Member management system", "Third-party API integration", "Admin dashboard development", "Database design with Supabase"],
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
        features: ["Maintenance & improvements for existing services", "Small-scale feature additions", "Office automation tool development", "Deployment operations on Vercel"],
        duration: "By consultation",
        price: "Custom quote",
        priceSuffix: ""
      }
    ],
    contactEyebrow: "Contact Us",
    contactTitle: <>Ready to Start<br />a New Project?</>,
    contactSub: <>Leave us a message and we'll get back to you <br />within 24 hours.</>,
    formNameLabel: "Name / Company",
    formNamePlaceholder: "John Doe",
    formEmailLabel: "Email Address",
    formServiceLabel: "Service Type",
    formServiceOptions: [
      { value: "", label: "Select an option" },
      { value: "website", label: "Website Development" },
      { value: "app", label: "Application Development" },
      { value: "maintenance", label: "Maintenance & Automation" },
      { value: "other", label: "Other Inquiry" },
    ],
    formMessageLabel: "Message",
    formMessagePlaceholder: "Tell us more about your project.",
    formSubmitting: "Sending...",
    formSubmit: "Send Message",
    formSuccess: "Your message has been sent successfully!",
    formErrorDefault: "Failed to send message. Please try again.",
    formErrorMissingKey: "Email delivery key is not configured. Please check the VITE_WEB3FORMS_ACCESS_KEY environment variable.",
    footerText: "Sumgyeol On Studio. Website & App Development Studio © 2026 All rights reserved.",
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
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('sumgyul-theme') as Theme) || 'dark');

  const t = content[lang];

  const toggleLang = () => {
    const next: Lang = lang === 'kr' ? 'en' : 'kr';
    setLang(next);
    localStorage.setItem('sumgyul-lang', next);
  };

  const toggleTheme = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('sumgyul-theme', next);
  };

  React.useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

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
          message: `성함/업체명: ${data.name}\n이메일: ${data.email}\n서비스 유형: ${data.serviceType}\n\n문의 내용:\n${data.message}`
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
    <div className="min-h-screen bg-[var(--surface)] selection:bg-brand-purple/30 max-w-[1200px] mx-auto relative shadow-2xl overflow-hidden border-x border-[var(--border-soft)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-50 bg-brand-deep/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-[55px] w-auto object-contain" />
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Services</a>
            <a href="#portfolio" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Portfolio</a>
            <a href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Contact Us</a>

            <div className="flex items-center gap-2">
              <button
                onClick={toggleLang}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors text-xs font-bold"
                aria-label="Toggle language"
              >
                {lang === 'kr' ? 'EN' : 'KR'}
              </button>
              <button
                onClick={toggleTheme}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </div>

            <a href="#contact" className="px-5 py-2.5 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-brand-purple/20">
              {t.navContact}
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-40 bg-brand-deep pt-24 px-6 md:hidden text-center"
          >
            <div className="flex flex-col gap-6 text-2xl font-bold">
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#portfolio" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
              <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-brand-accent">Contact Us</a>
            </div>
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={toggleLang}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold text-slate-300"
              >
                {lang === 'kr' ? 'EN' : 'KR'}
              </button>
              <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 px-6 overflow-hidden text-center bg-gradient-to-b from-[#1A0B2E] to-[#0A0118] text-white">
          {/* Impactful Background Elements - Intensified Purple */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-5%] w-[70%] h-[70%] bg-brand-purple/40 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] bg-brand-blue/10 blur-[120px] rounded-full" />
          </div>

          <div className="max-w-7xl mx-auto relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/20 border border-brand-purple/30 text-brand-accent text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm"
              >
                <span>{t.heroBadge}</span>
              </motion.div>

              <h1 className="font-extrabold tracking-tighter leading-[0.9] mb-10 flex flex-col items-center">
                <span className="text-4xl md:text-7xl text-slate-200">{t.heroLine1}</span>
                <span className="text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-purple-400 to-brand-blue italic py-2">{t.heroLine2}</span>
                <span className="text-4xl md:text-7xl text-slate-200">{t.heroLine3}</span>
              </h1>

              <p className="text-[15px] md:text-[19px] text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-serif break-keep">
                {t.heroSub}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  className="group px-10 py-5 bg-brand-purple text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-brand-purple/90 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                >
                  {t.ctaPrimary}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  href="#portfolio"
                  className="px-10 py-5 bg-white/5 border border-white/10 rounded-full font-bold flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-md"
                >
                  {t.ctaSecondary}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">{t.aboutEyebrow}</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight break-keep">{t.aboutTitle}</h3>
            </div>

            <div className="space-y-6 text-left">
              {t.about.map((paragraph, index) => (
                <p key={index} className="text-[var(--text-muted)] leading-relaxed break-keep">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-6 bg-[var(--surface-alt)] text-center">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">{t.servicesEyebrow}</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight break-keep">{t.servicesTitle}</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {t.services.map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="glass-card p-8 group hover:bg-[var(--card-bg-hover)] transition-all flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-brand-purple/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {serviceIcons[index]}
                  </div>
                  <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-24 px-6 text-center">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center justify-center mb-16 gap-6">
              <div>
                <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">{t.portfolioEyebrow}</h2>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight break-keep">{t.portfolioTitle}</h3>
              </div>
              <p className="text-[var(--text-muted)] max-w-2xl mx-auto font-serif text-[15px] md:text-lg tracking-wide break-keep">
                {t.portfolioSub}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.portfolio.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="glass-card p-8 group hover:bg-[var(--card-bg-hover)] transition-all flex flex-col items-center text-left"
                >
                  <div className="w-12 h-12 bg-brand-purple/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shrink-0">
                    {portfolioIcons[index]}
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-center">{item.title}</h4>
                  <p className="text-[var(--text-muted)] leading-relaxed break-keep">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-6 bg-brand-blue/5 text-center">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">{t.pricingEyebrow}</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 break-keep">{t.pricingTitle}</h3>
              <p className="text-[var(--text-muted)] text-[15px] md:text-base break-keep">{t.pricingSub}</p>
            </div>

            <div className="max-w-lg mx-auto relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPricingIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card p-10 border-brand-purple/30 relative overflow-hidden cursor-pointer"
                  onClick={nextPricing}
                >
                  <div className="absolute top-0 right-0 p-4">
                    <div className="bg-brand-purple text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">
                      {currentPricingIndex + 1} / {pricingPlans.length}
                    </div>
                  </div>

                  <h4 className="text-2xl font-bold mb-2">{pricingPlans[currentPricingIndex].title}</h4>
                  <div className="flex items-baseline justify-center gap-1 mb-6">
                    <span className="text-4xl font-bold">{pricingPlans[currentPricingIndex].price}</span>
                    <span className="text-[var(--text-muted)]">{pricingPlans[currentPricingIndex].priceSuffix}</span>
                  </div>

                  <div className="text-sm text-brand-accent font-medium mb-6">
                    {t.pricingDurationLabel} {pricingPlans[currentPricingIndex].duration}
                  </div>

                  <ul className="space-y-4 mb-10 inline-block text-left">
                    {pricingPlans[currentPricingIndex].features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-[var(--text-secondary)]">
                        <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#contact" onClick={(e) => e.stopPropagation()} className="block w-full py-4 bg-brand-purple hover:bg-brand-purple/90 text-white text-center rounded-xl font-bold transition-all">
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

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 relative text-center">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col items-center gap-16">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">{t.contactEyebrow}</h2>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 break-keep">{t.contactTitle}</h3>
                <p className="text-[var(--text-muted)] mb-12 text-[15px] md:text-lg mx-auto break-keep">
                  {t.contactSub}
                </p>

                <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 w-full max-w-sm sm:max-w-none mx-auto">
                  <a href="mailto:sumgyulonstudion@gmail.com" className="flex flex-col items-center gap-2 md:gap-3 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass-card flex items-center justify-center group-hover:bg-[var(--card-bg-hover)] transition-colors rounded-xl md:rounded-2xl">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-brand-accent" />
                    </div>
                    <p className="text-[10px] md:text-xs text-[var(--text-faint)] uppercase font-bold tracking-wider md:tracking-widest group-hover:text-brand-accent transition-colors">email</p>
                  </a>
                  <a href="https://www.instagram.com/sumgyulonstudio/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 md:gap-3 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass-card flex items-center justify-center group-hover:bg-[var(--card-bg-hover)] transition-colors rounded-xl md:rounded-2xl">
                      <Instagram className="w-4 h-4 md:w-5 md:h-5 text-brand-accent" />
                    </div>
                    <p className="text-[10px] md:text-xs text-[var(--text-faint)] uppercase font-bold tracking-wider md:tracking-widest group-hover:text-brand-accent transition-colors">instagram</p>
                  </a>
                  <a href="https://kmong.com/gig/762621" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 md:gap-3 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass-card flex items-center justify-center group-hover:bg-[var(--card-bg-hover)] transition-colors rounded-xl md:rounded-2xl">
                      <Store className="w-4 h-4 md:w-5 md:h-5 text-brand-accent" />
                    </div>
                    <p className="text-[10px] md:text-xs text-[var(--text-faint)] uppercase font-bold tracking-wider md:tracking-widest group-hover:text-brand-accent transition-colors">kmong</p>
                  </a>
                  <a href="http://pf.kakao.com/_QxcxauX" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 md:gap-3 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass-card flex items-center justify-center group-hover:bg-[var(--card-bg-hover)] transition-colors rounded-xl md:rounded-2xl">
                      <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-brand-accent" />
                    </div>
                    <p className="text-[10px] md:text-xs text-[var(--text-faint)] uppercase font-bold tracking-wider md:tracking-widest group-hover:text-brand-accent transition-colors">kakao</p>
                  </a>
                </div>
              </div>

              <div className="glass-card p-8 md:p-10 w-full max-w-2xl text-left">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[var(--text-muted)]">{t.formNameLabel}</label>
                      <input
                        {...register('name')}
                        className={cn(
                          "w-full bg-[var(--card-bg)] border border-[var(--border-medium)] rounded-xl px-4 py-3 focus:outline-none focus:border-brand-purple transition-all",
                          errors.name && "border-red-500/50"
                        )}
                        placeholder={t.formNamePlaceholder}
                      />
                      {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[var(--text-muted)]">{t.formEmailLabel}</label>
                      <input
                        {...register('email')}
                        className={cn(
                          "w-full bg-[var(--card-bg)] border border-[var(--border-medium)] rounded-xl px-4 py-3 focus:outline-none focus:border-brand-purple transition-all",
                          errors.email && "border-red-500/50"
                        )}
                        placeholder="example@email.com"
                      />
                      {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--text-muted)]">{t.formServiceLabel}</label>
                    <select
                      {...register('serviceType')}
                      className={cn(
                        "w-full bg-[var(--card-bg)] border border-[var(--border-medium)] rounded-xl px-4 py-3 focus:outline-none focus:border-brand-purple transition-all appearance-none",
                        errors.serviceType && "border-red-500/50"
                      )}
                    >
                      {t.formServiceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value} className="bg-[var(--surface)]">{opt.label}</option>
                      ))}
                    </select>
                    {errors.serviceType && <p className="text-xs text-red-400">{errors.serviceType.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--text-muted)]">{t.formMessageLabel}</label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      className={cn(
                        "w-full bg-[var(--card-bg)] border border-[var(--border-medium)] rounded-xl px-4 py-3 focus:outline-none focus:border-brand-purple transition-all resize-none",
                        errors.message && "border-red-500/50"
                      )}
                      placeholder={t.formMessagePlaceholder}
                    />
                    {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[var(--invert-bg)] text-[var(--invert-text)] rounded-xl font-bold hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? t.formSubmitting : t.formSubmit}
                    <Zap className="w-4 h-4" />
                  </button>

                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm text-center"
                    >
                      {t.formSuccess}
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm text-center"
                    >
                      {errorMessage || t.formErrorDefault}
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-deep py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Logo className="h-[40px] w-auto object-contain" footer />
          </div>

          <p className="text-slate-500 text-sm">
            {t.footerText}
          </p>

          <div className="flex gap-6">
            <a href="https://kmong.com/gig/762621" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors" title="크몽"><Store className="w-5 h-5" /></a>
            <a href="https://www.instagram.com/sumgyulonstudio/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="mailto:sumgyulonstudio@gmail.com" className="text-slate-500 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>

      {/* KakaoTalk Floating Button */}
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
    </div>
  );
}
