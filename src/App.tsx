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
  Newspaper
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentPricingIndex, setCurrentPricingIndex] = useState(0);
  const [aboutLang, setAboutLang] = useState<'kr' | 'en'>('kr');

  const pricingPlans = [
    {
      title: "랜딩페이지 제작",
      features: [
        "반응형 원페이지 웹사이트 구축",
        "Next.js 기반 페이지 개발",
        "문의폼 및 메일 연동",
        "모바일 최적화 및 기본 SEO 세팅"
      ],
      duration: "협의 후 안내",
      price: "별도 견적",
      priceSuffix: ""
    },
    {
      title: "웹 서비스 개발",
      features: [
        "회원 관리 시스템 구축",
        "외부 API 연동",
        "관리자 대시보드 개발",
        "Supabase 기반 데이터베이스 설계"
      ],
      duration: "협의 후 안내",
      price: "별도 견적",
      priceSuffix: ""
    },
    {
      title: "모바일 앱 개발",
      features: [
        "서비스 기획 및 화면 설계",
        "iOS/Android 대응 애플리케이션 개발",
        "배포 및 스토어 등록 지원",
        "출시 이후 초기 안정화 지원"
      ],
      duration: "협의 후 안내",
      price: "별도 견적",
      priceSuffix: ""
    },
    {
      title: "유지보수 & 사무자동화",
      features: [
        "기존 서비스 유지보수 및 기능 개선",
        "소규모 기능 추가 개발",
        "업무 자동화 도구 개발",
        "Vercel 기반 배포 환경 운영"
      ],
      duration: "협의 후 안내",
      price: "별도 견적",
      priceSuffix: ""
    }
  ];

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
        setErrorMessage("이메일 전송 키가 설정되지 않았습니다. 환경 변수(VITE_WEB3FORMS_ACCESS_KEY)를 확인해주세요.");
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
        throw new Error(result.message || "이메일 전송에 실패했습니다.");
      }
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error.message || "이메일 전송 중 오류가 발생했습니다. 다시 시도해주세요.");
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      title: "웹사이트 구축",
      description: "Next.js 기반의 반응형 웹사이트와 랜딩페이지를 기획부터 배포까지 자체 인력으로 구축합니다.",
      icon: <Layout className="w-6 h-6 text-brand-accent" />,
    },
    {
      title: "애플리케이션 개발",
      description: "회원 관리, 외부 API 연동, 관리자 대시보드 등 실제 운영 가능한 웹·앱 서비스를 설계하고 개발합니다.",
      icon: <Smartphone className="w-6 h-6 text-brand-accent" />,
    },
    {
      title: "유지보수 & 운영",
      description: "Vercel·Supabase 기반의 배포 환경을 구성하고, 서비스 오픈 이후의 유지보수와 운영을 지원합니다.",
      icon: <ShieldCheck className="w-6 h-6 text-brand-accent" />,
    },
  ];

  const portfolio = [
    {
      id: 'p1',
      title: "로컬루프 코리아 (Localoop Korea)",
      description: "국내 거주 외국인을 위한 AI 기반 생활 적응 SaaS 플랫폼. 장소·음식·모임·사람 4대 축으로 회원 매칭·다국어 번역·지역 추천 제공, 특허 3건 출원.",
      icon: <Globe className="w-6 h-6 text-brand-accent" />,
    },
    {
      id: 'p2',
      title: "크리스피카피 (CrispyCopy)",
      description: "AI가 브랜드를 학습해 네이버 블로그·인스타그램·카카오톡·당근·스레드·틱톡 6개 채널용 SNS 콘텐츠를 자동 작성하는 SaaS. 특허 3건 출원.",
      icon: <PenTool className="w-6 h-6 text-brand-accent" />,
    },
    {
      id: 'p3',
      title: "스냅릴 (SnapReel)",
      description: "숏폼 영상 자동 생성 앱. 단순 자동생성 모드와 사용자 승인 절차 포함 10단계 고급 모드로 구성.",
      icon: <Video className="w-6 h-6 text-brand-accent" />,
    },
    {
      id: 'p4',
      title: "평택광장",
      description: "지역 정당 당원(약 13명)을 위한 정보공유 앱. 현수막 지도, 행사 일정, 자원봉사 지도, Gemini API 기반 일일 인사말 카드 기능 포함.",
      icon: <MapPin className="w-6 h-6 text-brand-accent" />,
    },
    {
      id: 'p5',
      title: "솔로플로우 (SoloFlow)",
      description: "개인의 주간·일간 목표를 설정하고 실행을 관리하는 목표 관리 앱.",
      icon: <Target className="w-6 h-6 text-brand-accent" />,
    },
    {
      id: 'p6',
      title: "바이칼뉴스 (Baikal News)",
      description: "인터넷신문사의 뉴스 콘텐츠 제작·게재용 온라인 플랫폼 구축·운영에 개발 인력으로 참여.",
      icon: <Newspaper className="w-6 h-6 text-brand-accent" />,
    },
  ];

  const aboutKr = [
    "숨결 온스튜디오는 경기도 평택에 소재한 기술 기반 스타트업으로, 웹사이트 구축과 애플리케이션 개발을 핵심 사업으로 하는 IT 전문기업입니다. 대표는 20년간 서비스 기획 및 개발 기획 분야에서 실무 경험을 쌓아왔으며, 이를 바탕으로 아이디어 단계의 서비스를 실제 운영 가능한 웹·앱 제품으로 구현하는 데 주력하고 있습니다. Next.js, Supabase, Vercel 등 현재 스타트업 시장에서 널리 쓰이는 기술 스택을 기반으로, 기획-설계-개발-배포-운영에 이르는 전 과정을 자체 인력으로 수행할 수 있는 개발 조직을 갖추고 있습니다.",
    "숨결 온스튜디오는 다수의 자체 서비스를 기획·개발하여 운영한 실적을 보유하고 있습니다. 국내 거주 외국인을 위한 AI 기반 생활 적응 플랫폼 로컬루프 코리아(Localoop Korea), AI가 SNS 콘텐츠를 자동으로 작성해주는 크리스피카피(CrispyCopy), 숏폼 영상을 자동 생성하는 스냅릴(SnapReel), 지역 정당 당원들을 위한 정보공유 애플리케이션 평택광장, 주간·일간 목표 관리 애플리케이션 솔로플로우(SoloFlow) 등이 대표적이며, 인터넷신문사 바이칼뉴스의 온라인 플랫폼 구축에도 참여하였습니다. 이 과정에서 회원 관리, 지도 연동, 외부 API 연동, 관리자 대시보드 구축 등 실제 서비스 운영에 필요한 기술 요소를 폭넓게 다루어 왔습니다.",
    "또한 세 건의 특허를 출원하는 등 자체 개발한 서비스의 기술적 차별성을 인정받기 위한 노력을 지속하고 있으며, 정부 창업지원사업 및 공공조달 용역 분야에서도 다국어 콘텐츠 시스템, AI 활용 교육 프로그램, 소규모 웹 개발 등 개발 역량을 필요로 하는 과업을 중심으로 참여 영역을 넓혀가고 있습니다.",
    "앞으로 숨결 온스튜디오는 소상공인 및 지역 기업을 대상으로 한 홈페이지 구축 및 사무 자동화 앱 등 실질적인 디지털 전환 서비스를 제공하는 동시에, 자체 서비스형 애플리케이션 개발을 지속하여 개발 전문기업으로서의 정체성을 강화해 나가고자 합니다.",
  ];

  const aboutEn = [
    "Sumgyeol On Studio is a technology startup based in Pyeongtaek, Gyeonggi-do, South Korea, specializing in website and application development. The founder has 20 years of hands-on experience in service and development planning, applied toward turning early-stage ideas into fully operational web and app products. The studio handles planning, design, development, deployment, and operation in-house, using tools such as Next.js, Supabase, and Vercel.",
    "The studio has planned, built, and operated several proprietary services, including Localoop Korea, an AI-powered life-adaptation platform for foreign residents in Korea; CrispyCopy, an AI tool for automated SNS content writing; SnapReel, a short-form video auto-generation app; Pyeongtaek Plaza, an information-sharing app for local political party members; and SoloFlow, a weekly and daily goal-management app. The team also helped build the online platform for Baikal News, an internet newspaper, gaining hands-on experience in member management, map integration, API integration, and admin dashboard development.",
    "Three patents have been filed for its in-house services, and the studio has been expanding into government startup support programs and public procurement projects centered on development work, such as multilingual content systems, AI education programs, and small-scale web development.",
    "Going forward, Sumgyeol On Studio aims to support small businesses and local companies with practical digital transformation services such as website development and office automation apps, while continuing to build its own proprietary applications.",
  ];

  return (
    <div className="min-h-screen bg-brand-deep selection:bg-brand-purple/30 max-w-[1200px] mx-auto relative shadow-2xl overflow-hidden border-x border-white/5">
      {/* Navigation */}
      <nav className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-50 bg-brand-deep/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="h-[55px] w-auto object-contain" />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Services</a>
            <a href="#portfolio" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Portfolio</a>
            <a href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pricing</a>
            <a href="#contact" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Contact Us</a>
            <a href="#contact" className="px-5 py-2.5 bg-brand-purple hover:bg-brand-purple/90 text-white rounded-full text-sm font-semibold transition-all shadow-lg shadow-brand-purple/20">
              문의하기
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
                <span>Website & App Development Studio</span>
              </motion.div>

              <h1 className="font-extrabold tracking-tighter leading-[0.9] mb-10 flex flex-col items-center">
                <span className="text-4xl md:text-7xl text-slate-200">아이디어에</span>
                <span className="text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-purple-400 to-brand-blue italic py-2">≈숨결≈</span>
                <span className="text-4xl md:text-7xl text-slate-200">웹·앱으로 구현합니다</span>
              </h1>

              <p className="text-[15px] md:text-[19px] text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-serif break-keep">
                20년 서비스·개발 기획 경험을 바탕으로, 아이디어 단계의 서비스를 Next.js·Supabase·Vercel 기반의 실제 운영 가능한 웹·앱 제품으로 구현합니다.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.a 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact" 
                  className="group px-10 py-5 bg-brand-purple text-white rounded-full font-bold flex items-center justify-center gap-3 hover:bg-brand-purple/90 transition-all shadow-[0_0_30px_rgba(139,92,246,0.3)]"
                >
                  프로젝트 시작하기
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <motion.a 
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                  href="#portfolio" 
                  className="px-10 py-5 bg-white/5 border border-white/10 rounded-full font-bold flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-md"
                >
                  포트폴리오 보기
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center mb-12 gap-6">
              <div>
                <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">About Us</h2>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight break-keep">숨결 온스튜디오 소개</h3>
              </div>
              <button
                onClick={() => setAboutLang(aboutLang === 'kr' ? 'en' : 'kr')}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:border-brand-purple/30 transition-colors"
              >
                {aboutLang === 'kr' ? 'Read in English' : '한국어로 보기'}
              </button>
            </div>

            <div className="space-y-6 text-left">
              {(aboutLang === 'kr' ? aboutKr : aboutEn).map((paragraph, index) => (
                <p key={index} className="text-slate-400 leading-relaxed break-keep">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-6 bg-white/[0.02] text-center">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">Our Services</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight break-keep">기획부터 배포까지,<br />웹사이트 l 애플리케이션 l 유지보수</h3>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -10 }}
                  className="glass-card p-8 group hover:bg-white/10 transition-all flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-brand-purple/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {service.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-4">{service.title}</h4>
                  <p className="text-slate-400 leading-relaxed">
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
                <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">Portfolio</h2>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight break-keep">직접 기획하고 개발한 서비스들</h3>
              </div>
              <p className="text-slate-400 max-w-2xl mx-auto font-serif text-[15px] md:text-lg tracking-wide break-keep">
                기획부터 개발, 배포와 운영까지 자체 인력으로 만들어온
                숨결;온스튜디오의 서비스 개발 실적을 확인해보세요.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolio.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -10 }}
                  className="glass-card p-8 group hover:bg-white/10 transition-all flex flex-col items-center text-left"
                >
                  <div className="w-12 h-12 bg-brand-purple/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shrink-0">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-4 text-center">{item.title}</h4>
                  <p className="text-slate-400 leading-relaxed break-keep">
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
              <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">Pricing</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 break-keep">합리적인 비용으로 시작하는<br />압도적인 퀄리티</h3>
              <p className="text-slate-400 text-[15px] md:text-base break-keep">당신의 비즈니스 규모와 필요에 맞는 최적의 플랜을 제안합니다.</p>
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
                    <span className="text-slate-400">{pricingPlans[currentPricingIndex].priceSuffix}</span>
                  </div>
                  
                  <div className="text-sm text-brand-accent font-medium mb-6">
                    기간: {pricingPlans[currentPricingIndex].duration}
                  </div>

                  <ul className="space-y-4 mb-10 inline-block text-left">
                    {pricingPlans[currentPricingIndex].features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="#contact" onClick={(e) => e.stopPropagation()} className="block w-full py-4 bg-brand-purple hover:bg-brand-purple/90 text-white text-center rounded-xl font-bold transition-all">
                    지금 바로 문의하기
                  </a>
                </motion.div>
              </AnimatePresence>

              {/* Left Swipe Indicator */}
              <div 
                className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 flex flex-col items-center gap-2 cursor-pointer text-slate-400 hover:text-white transition-colors z-10"
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
                className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 flex flex-col items-center gap-2 cursor-pointer text-slate-400 hover:text-white transition-colors z-10"
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
                <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">Contact Us</h2>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 break-keep">새로운 프로젝트를<br />함께 시작해볼까요?</h3>
                <p className="text-slate-400 mb-12 text-[15px] md:text-lg mx-auto break-keep">
                  문의를 남겨주시면 24시간 이내에 담당자가 <br />
                  확인 후 순차적으로 연락 드립니다.
                </p>

                <div className="flex justify-center gap-4 sm:gap-6 md:gap-8 w-full max-w-sm sm:max-w-none mx-auto">
                  <a href="mailto:sumgyulonstudion@gmail.com" className="flex flex-col items-center gap-2 md:gap-3 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass-card flex items-center justify-center group-hover:bg-white/10 transition-colors rounded-xl md:rounded-2xl">
                      <Mail className="w-4 h-4 md:w-5 md:h-5 text-brand-accent" />
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider md:tracking-widest group-hover:text-brand-accent transition-colors">email</p>
                  </a>
                  <a href="https://www.instagram.com/sumgyulonstudio/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 md:gap-3 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass-card flex items-center justify-center group-hover:bg-white/10 transition-colors rounded-xl md:rounded-2xl">
                      <Instagram className="w-4 h-4 md:w-5 md:h-5 text-brand-accent" />
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider md:tracking-widest group-hover:text-brand-accent transition-colors">instagram</p>
                  </a>
                  <a href="https://kmong.com/gig/762621" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 md:gap-3 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass-card flex items-center justify-center group-hover:bg-white/10 transition-colors rounded-xl md:rounded-2xl">
                      <Store className="w-4 h-4 md:w-5 md:h-5 text-brand-accent" />
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider md:tracking-widest group-hover:text-brand-accent transition-colors">kmong</p>
                  </a>
                  <a href="http://pf.kakao.com/_QxcxauX" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 md:gap-3 group">
                    <div className="w-10 h-10 md:w-12 md:h-12 glass-card flex items-center justify-center group-hover:bg-white/10 transition-colors rounded-xl md:rounded-2xl">
                      <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-brand-accent" />
                    </div>
                    <p className="text-[10px] md:text-xs text-slate-500 uppercase font-bold tracking-wider md:tracking-widest group-hover:text-brand-accent transition-colors">kakao</p>
                  </a>
                </div>
              </div>

              <div className="glass-card p-8 md:p-10 w-full max-w-2xl text-left">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">성함 / 업체명</label>
                      <input 
                        {...register('name')}
                        className={cn(
                          "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-purple transition-all",
                          errors.name && "border-red-500/50"
                        )}
                        placeholder="홍길동"
                      />
                      {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-400">이메일 주소</label>
                      <input 
                        {...register('email')}
                        className={cn(
                          "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-purple transition-all",
                          errors.email && "border-red-500/50"
                        )}
                        placeholder="example@email.com"
                      />
                      {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">서비스 유형</label>
                    <select 
                      {...register('serviceType')}
                      className={cn(
                        "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-purple transition-all appearance-none",
                        errors.serviceType && "border-red-500/50"
                      )}
                    >
                      <option value="" className="bg-brand-deep">선택해주세요</option>
                      <option value="website" className="bg-brand-deep">웹사이트 제작</option>
                      <option value="app" className="bg-brand-deep">애플리케이션 개발</option>
                      <option value="maintenance" className="bg-brand-deep">유지보수·사무자동화</option>
                      <option value="other" className="bg-brand-deep">기타 문의</option>
                    </select>
                    {errors.serviceType && <p className="text-xs text-red-400">{errors.serviceType.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-400">문의 내용</label>
                    <textarea 
                      {...register('message')}
                      rows={5}
                      className={cn(
                        "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-purple transition-all resize-none",
                        errors.message && "border-red-500/50"
                      )}
                      placeholder="프로젝트에 대해 자세히 설명해주세요."
                    />
                    {errors.message && <p className="text-xs text-red-400">{errors.message.message}</p>}
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-white text-brand-deep rounded-xl font-bold hover:bg-brand-accent hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "전송 중..." : "문의 보내기"}
                    <Zap className="w-4 h-4" />
                  </button>

                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm text-center"
                    >
                      문의가 성공적으로 전송되었습니다!
                    </motion.div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm text-center"
                    >
                      {errorMessage || "이메일 전송에 실패했습니다. 다시 시도해주세요."}
                    </motion.div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Logo className="h-[40px] w-auto object-contain" footer />
          </div>

          <p className="text-slate-500 text-sm">
            숨결;온스튜디오. 웹사이트·앱 개발 전문기업 © 2026 All rights reserved.
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
          <span className="text-sm font-extrabold">30분 무료상담</span>
        </div>
        <svg viewBox="0 0 32 32" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4.64c-6.96 0-12.64 4.48-12.64 10.08 0 3.52 2.32 6.64 5.76 8.48l-1.44 5.44c-.16.48.32.8.72.56l6.4-4.32c.4.08.8.08 1.2.08 6.96 0 12.64-4.48 12.64-10.08S22.96 4.64 16 4.64z" fill="#000000"/>
        </svg>
      </a>
    </div>
  );
}

