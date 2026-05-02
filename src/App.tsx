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
  Palette, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Instagram, 
  Mail, 
  MessageSquare,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowLeft,
  Store
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
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{title: string, items: any[]} | null>(null);
  const [currentPricingIndex, setCurrentPricingIndex] = useState(0);

  const pricingPlans = [
    {
      title: "로고 디자인 베이직",
      features: [
        "브랜드 코어 분석 및 비주얼 컨셉 도출",
        "로고 시안 2개 제안",
        "수정 2회",
        "디지털 응용 Mock-up 제공"
      ],
      duration: "1주 이내",
      price: "10만원",
      priceSuffix: "부터"
    },
    {
      title: "로고 디자인 프리미엄",
      features: [
        "시안 2종 제안, 수정 2회",
        "비주얼 아이덴티티 가이드라인 제공",
        "고해상도 그래픽 에셋 제공",
        "디지털 응용 Mock-up 제공"
      ],
      duration: "1주 이내",
      price: "20만원",
      priceSuffix: "부터"
    },
    {
      title: "상세페이지 제작",
      features: [
        "고객 심리 기반의 셀링 포인트(USP) 도출",
        "시선을 사로잡는 스토리텔링 레이아웃",
        "고감도 제품 보정 및 합성",
        "모바일 최적화 및 UI/UX 디자인"
      ],
      duration: "1주 이내",
      price: "10만원",
      priceSuffix: "부터"
    },
    {
      title: "브랜딩 전략 기획",
      features: [
        "브랜드 버벌 아이덴티티(V.I) 수립",
        "타겟 페르소나 및 포지셔닝 전략",
        "브랜드 네이밍(네이밍 의미, 슬로건, 네이밍 전략)",
        "상품 팩키지 디자인, 광고 랜딩 페이지 제작"
      ],
      duration: "1-2개월",
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

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedItem || selectedCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedItem, selectedCategory]);

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
      title: "로고 디자인",
      description: "브랜드 인터뷰와 경쟁사 리서치를 통해 브랜드의 숨결이 느껴지는, 단단한 첫인상의 로고를 만듭니다.",
      icon: <Palette className="w-6 h-6 text-brand-accent" />,
    },
    {
      title: "브랜딩 & 마케팅",
      description: "브랜드 키워드 정의를 통해 이름, 스토리, 비주얼, SNS 관리까지 브랜드의 숨결을 일관되게 정리합니다.",
      icon: <Target className="w-6 h-6 text-brand-accent" />,
    },
    {
      title: "상세페이지 디자인",
      description: "상품 USP 정리, 스토리 구조 설계, 설득형 카피 등 임팩트 있게 구성된 상세페이지로 구매전환율을 즉각 상승시켜드립니다.",
      icon: <Layout className="w-6 h-6 text-brand-accent" />,
    },
  ];

  const portfolio = {
    logoDesign: [
      { id: 'l1', title: "까페 Brew Moment 로고 이미지와 간판", category: "Logo Design", thumbnail: "/sum_logo1.png", image: "/brewmoment.png" },
      { id: 'l2', title: "힙하고 트렌디한 업사이클링 브랜드 - RERE", category: "Logo Design", thumbnail: "/sum_logo2.png", image: "/rere.png" },
      { id: 'l3', title: "Tech 스타트업 싱크노트 SyncNote", category: "Logo Design", thumbnail: "/sum_logo3.png", image: "/sync.png" },
      { id: 'l4', title: "정갈한 가정식 반상 또는 모던 솥밥 전문점 - 다온 반상", category: "Logo Design", thumbnail: "/sum_logo4.png", image: "/daon.png" },
    ],
    brandingMarketing: [
      { id: 'b1', title: "빈티지 탐험 스탬프 - 트래커스 블렌드", category: "Branding & Marketing", thumbnail: "/sum_trackers.png", image: "/portfolio_trackers.png" },
      { id: 'b2', title: "지속가능한 슬로우 패션 - 리포즈(RE:PAUSE)", category: "Branding & Marketing", thumbnail: "/logo_lepause.png", image: "/portfolio_lepause.png" },
    ],
    detailPage: [
      { id: 'd1', title: "프리미엄 한국 전통주 또록", category: "Detail Page", thumbnail: "/page_6-2.gif", image: "/ttorok.png", images: ["/page_6-2.gif", "/ttorok.png"], thumbnailPosition: "object-top" },
      { 
        id: 'd5', 
        title: "가장 따뜻한 위로, 다온의 정성, 채끝 트러플 솥밥", 
        category: "Detail Page", 
        thumbnail: "/sobtbob_move.gif", 
        image: "/sotbob.png",
        images: ["/sobtbob_move.gif", "/sotbob.png"],
        thumbnailPosition: "object-top"
      },
      { 
        id: 'd6', 
        title: "바다의 깊은 온기를 담다, 전복 내장 (게우) 솥밥", 
        category: "Detail Page", 
        thumbnail: "/jonbok_move.gif", 
        image: "/jonbok.png",
        images: ["/jonbok_move.gif", "/jonbok.png"],
        thumbnailPosition: "object-top"
      },
      { 
        id: 'd3', 
        title: "3,650일 단 하나의 향, 트래커스 블렌드", 
        category: "Detail Page", 
        thumbnail: "/treckers_move1.gif", 
        image: "/portfolio_trackersblend.png",
        images: ["/treckers_move1.gif", "/portfolio_trackersblend.png"]
      },
      { 
        id: 'd4', 
        title: "가장 완벽한 온도와 균형을 유지하는 zeln 젤른 텀블러", 
        category: "Detail Page", 
        thumbnail: "/zeln_move.gif", 
        image: "/zeln.png",
        images: ["/zeln_move.gif", "/zeln.png"],
        thumbnailPosition: "object-top"
      },
      { id: 'd2', title: "필드위 그녀의 매끈한 다리의 비밀 벨벳블리즈", category: "Detail Page", thumbnail: "/velvet1.png", image: "/velvet1.png", thumbnailPosition: "object-[center_1%]" },
    ]
  };

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
                <span>Premium Marketing & Design Studio</span>
              </motion.div>
              
              <h1 className="font-extrabold tracking-tighter leading-[0.9] mb-10 flex flex-col items-center">
                <span className="text-4xl md:text-7xl text-slate-200">브랜드에</span>
                <span className="text-6xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-purple-400 to-brand-blue italic py-2">≈숨결≈</span>
                <span className="text-4xl md:text-7xl text-slate-200">불어넣으세요</span>
              </h1>
              
              <p className="text-[15px] md:text-[19px] text-slate-300 mb-12 leading-relaxed max-w-2xl mx-auto font-serif break-keep">
                당신의 제품이 가진 가치를 가장 완벽한 시각적 언어로 만들어보세요. 12년 마케팅 기획 경험으로 로고부터 마케팅까지 ’숨 쉬는 브랜드’를 만들어 드립니다.
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

        {/* Services Section */}
        <section id="services" className="py-24 px-6 bg-white/[0.02] text-center">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4">Our Services</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight break-keep">컨셉부터 마케팅까지,<br />디자인 l 브랜딩 l 마케팅</h3>
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
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight break-keep">성공을 디자인한 기록</h3>
              </div>
              <p className="text-slate-400 max-w-2xl mx-auto font-serif text-[15px] md:text-lg tracking-wide break-keep">
                다양한 카테고리의 브랜드들과 함께하며 쌓아온 
                숨결;온만의 감각적인 포트폴리오를 확인해보세요.
              </p>
            </div>

            {/* Logo Design Category */}
            <div className="mb-24">
              <div className="flex items-center justify-center relative mb-10">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-accent text-xl md:text-2xl font-bold">
                  <Palette className="w-5 h-5 md:w-6 md:h-6" />
                  <span>로고디자인</span>
                </div>
                <button 
                  onClick={() => setSelectedCategory({ title: '로고디자인', items: portfolio.logoDesign })}
                  className="absolute right-0 text-[13px] font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  전체보기 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolio.logoDesign.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedItem(item)}
                    className="flex flex-col items-center"
                  >
                    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl cursor-pointer">
                      <img 
                        src={item.thumbnail || item.image} 
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <p className="mt-6 font-bold text-slate-400">{item.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Detail Page Category */}
            <div className="mb-24">
              <div className="flex items-center justify-center relative mb-10">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-accent text-xl md:text-2xl font-bold">
                  <Layout className="w-5 h-5 md:w-6 md:h-6" />
                  <span>상세페이지 제작</span>
                </div>
                <button 
                  onClick={() => setSelectedCategory({ title: '상세페이지 제작', items: portfolio.detailPage })}
                  className="absolute right-0 text-[13px] font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  전체보기 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                {portfolio.detailPage.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedItem(item)}
                    className="flex flex-col items-center"
                  >
                    {/* Mobile Phone Frame */}
                    <div className="relative w-full max-w-[280px] aspect-[9/19] bg-white/5 backdrop-blur-md rounded-[3rem] p-1 border-2 border-white/50 shadow-2xl shadow-brand-purple/5 overflow-hidden group cursor-pointer">
                      {/* Screen Content */}
                      <div className="relative w-full h-full rounded-[2.8rem] overflow-hidden bg-brand-deep">
                        <div className="w-full flex flex-col transition-transform duration-700 group-hover:scale-110">
                          {item.images ? (
                            item.images.map((img, idx) => (
                              <img 
                                key={idx}
                                src={img} 
                                alt={`${item.title} ${idx + 1}`}
                                referrerPolicy="no-referrer"
                                className={cn(
                                  "w-full h-auto block object-top",
                                  idx === 0 ? item.thumbnailPosition : ""
                                )}
                              />
                            ))
                          ) : (
                            <img 
                              src={item.thumbnail || item.image} 
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className={cn(
                                "w-full h-auto block object-top",
                                item.thumbnailPosition
                              )}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <p className="mt-6 font-bold text-slate-400">{item.title}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Branding & Marketing Category */}
            <div>
              <div className="flex items-center justify-center relative mb-10">
                <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-accent text-xl md:text-2xl font-bold">
                  <Target className="w-5 h-5 md:w-6 md:h-6" />
                  <span>브랜딩&마케팅</span>
                </div>
                <button 
                  onClick={() => setSelectedCategory({ title: '브랜딩&마케팅', items: portfolio.brandingMarketing })}
                  className="absolute right-0 text-[13px] font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  전체보기 <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {portfolio.brandingMarketing.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedItem(item)}
                    className="flex flex-col items-center"
                  >
                    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl cursor-pointer">
                      <img 
                        src={item.thumbnail || item.image} 
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <p className="mt-6 font-bold text-slate-400">{item.title}</p>
                  </motion.div>
                ))}
              </div>
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
                      <option value="logo" className="bg-brand-deep">로고 디자인</option>
                      <option value="branding_marketing" className="bg-brand-deep">브랜딩&마케팅</option>
                      <option value="detail_page" className="bg-brand-deep">상세페이지 제작</option>
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
            숨결;온스튜디오. 시각 디자인& 광고 대행 © 2026 All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="https://kmong.com/gig/762621" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors" title="크몽"><Store className="w-5 h-5" /></a>
            <a href="https://www.instagram.com/sumgyulonstudio/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="mailto:sumgyulonstudio@gmail.com" className="text-slate-500 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>

      {/* Category Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-10"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-brand-deep/95 backdrop-blur-xl"
              onClick={() => setSelectedCategory(null)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl h-full bg-brand-deep rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-brand-deep/50 backdrop-blur-md z-10">
                <div className="text-left">
                  <h3 className="text-2xl font-bold">{selectedCategory.title} 전체보기</h3>
                </div>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Image Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                <div className={cn(
                  "grid gap-6",
                  selectedCategory.title === '상세페이지 제작' 
                    ? "grid-cols-2 md:grid-cols-4" 
                    : "grid-cols-2 md:grid-cols-4"
                )}>
                  {selectedCategory.items.map((item) => (
                    <motion.div
                      key={item.id}
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedItem(item)}
                      className={cn(
                        "group relative overflow-hidden cursor-pointer bg-white/5 flex flex-col items-center",
                        item.category === "Detail Page" 
                          ? "w-full aspect-[9/19] rounded-[2rem] p-1 border-2 border-white/20" 
                          : "aspect-video md:aspect-square rounded-2xl"
                      )}
                    >
                      <div className={cn(
                        "relative w-full h-full overflow-hidden",
                        item.category === "Detail Page" ? "rounded-[1.8rem]" : "rounded-2xl"
                      )}>
                        <div className="w-full h-full flex flex-col transition-transform duration-700 group-hover:scale-110">
                          {item.images && item.category === "Detail Page" ? (
                            item.images.map((img, idx) => (
                              <img 
                                key={idx}
                                src={img} 
                                alt={`${item.title} ${idx + 1}`}
                                referrerPolicy="no-referrer"
                                className={cn(
                                  "w-full h-auto block object-top",
                                  idx === 0 ? item.thumbnailPosition : ""
                                )}
                              />
                            ))
                          ) : (
                            <img 
                              src={item.thumbnail || item.image} 
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className={cn(
                                "block",
                                item.category === "Detail Page" ? "w-full h-auto object-top" : "w-full h-full object-cover",
                                item.category === "Detail Page" ? item.thumbnailPosition : ""
                              )}
                            />
                          )}
                        </div>
                      </div>
                      <p className={cn(
                        "font-bold text-slate-400 text-center",
                        item.category === "Detail Page" ? "mt-4 text-sm" : "mt-4 text-sm md:text-base"
                      )}>
                        {item.title}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] z-[100] flex items-center justify-center p-4 md:p-10"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-brand-deep/95 backdrop-blur-xl"
              onClick={() => setSelectedItem(null)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl h-full bg-brand-deep rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/5 bg-brand-deep/50 backdrop-blur-md z-10">
                <div className="text-left">
                  <span className="text-xs font-bold text-brand-accent uppercase tracking-widest">{selectedItem.category}</span>
                  <h3 className="text-xl font-bold">{selectedItem.title}</h3>
                </div>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable Image Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/20">
                {selectedItem.images ? (
                  selectedItem.images.map((img: string, idx: number) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={`${selectedItem.title} - ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto block"
                    />
                  ))
                ) : (
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto block"
                  />
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

