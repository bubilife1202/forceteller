'use client';

import { useState } from 'react';
import { SajuResult as SajuResultType } from '@/lib/saju-calculator';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, Home, Menu, X } from 'lucide-react';

// Import all components
import Cover from './saju-250p/Cover';
import TOC from './saju-250p/TOC';
import Overview from './saju-250p/Overview';
import SajuChart from './saju-250p/SajuChart';
import DayMasterIntro from './saju-250p/DayMasterIntro';
import YinYangBalance from './saju-250p/YinYangBalance';
import FiveElementsMain from './saju-250p/FiveElementsMain';
import FiveElementsDetail from './saju-250p/FiveElementsDetail';
import TenGodsMain from './saju-250p/TenGodsMain';
import TenGodsDetail from './saju-250p/TenGodsDetail';
import PatternAnalysis from './saju-250p/PatternAnalysis';
import TwelveCyclesMain from './saju-250p/TwelveCyclesMain';
import TwelveCyclesDetail from './saju-250p/TwelveCyclesDetail';
import HapchungMain from './saju-250p/HapchungMain';
import HapchungDetail from './saju-250p/HapchungDetail';
import ShinsalMain from './saju-250p/ShinsalMain';
import ShinsalDetail from './saju-250p/ShinsalDetail';
import PersonalityMain from './saju-250p/PersonalityMain';
import PersonalityDetail from './saju-250p/PersonalityDetail';
import WealthMain from './saju-250p/WealthMain';
import WealthDetail from './saju-250p/WealthDetail';
import CareerMain from './saju-250p/CareerMain';
import CareerDetail from './saju-250p/CareerDetail';
import LoveMain from './saju-250p/LoveMain';
import LoveDetail from './saju-250p/LoveDetail';
import MarriageAnalysis from './saju-250p/MarriageAnalysis';
import HealthMain from './saju-250p/HealthMain';
import HealthDetail from './saju-250p/HealthDetail';
import HealthAdvice from './saju-250p/HealthAdvice';
import DaeunOverview from './saju-250p/DaeunOverview';
import DaeunDetail from './saju-250p/DaeunDetail';
import LuckyItems from './saju-250p/LuckyItems';
import LuckyAdvice from './saju-250p/LuckyAdvice';
import Summary from './saju-250p/Summary';
import Closing from './saju-250p/Closing';

interface SajuResult250pProps {
  result: SajuResultType;
  name: string;
  gender: 'male' | 'female';
  birthDate: {
    year: number;
    month: number;
    day: number;
  };
  onReset: () => void;
}

// Page configuration with component and title
const PAGES = [
  { id: 'cover', title: '표지', chapter: 0 },
  { id: 'toc', title: '목차', chapter: 0 },
  { id: 'overview', title: '전체 개요', chapter: 1 },
  { id: 'saju-chart', title: '사주 원국', chapter: 1 },
  { id: 'daymaster-intro', title: '일간 소개', chapter: 2 },
  { id: 'yinyang-balance', title: '음양 균형', chapter: 2 },
  { id: 'five-elements-main', title: '오행 분석', chapter: 3 },
  { id: 'five-elements-detail', title: '오행 상세', chapter: 3 },
  { id: 'ten-gods-main', title: '십신 분석', chapter: 4 },
  { id: 'ten-gods-detail', title: '십신 상세', chapter: 4 },
  { id: 'pattern-analysis', title: '격국 분석', chapter: 5 },
  { id: 'twelve-cycles-main', title: '12운성', chapter: 6 },
  { id: 'twelve-cycles-detail', title: '12운성 상세', chapter: 6 },
  { id: 'hapchung-main', title: '합충 분석', chapter: 7 },
  { id: 'hapchung-detail', title: '합충 상세', chapter: 7 },
  { id: 'shinsal-main', title: '신살 분석', chapter: 8 },
  { id: 'shinsal-detail', title: '신살 상세', chapter: 8 },
  { id: 'personality-main', title: '성격 분석', chapter: 9 },
  { id: 'personality-detail', title: '성격 상세', chapter: 9 },
  { id: 'wealth-main', title: '재물운', chapter: 10 },
  { id: 'wealth-detail', title: '재물운 상세', chapter: 10 },
  { id: 'career-main', title: '직업운', chapter: 11 },
  { id: 'career-detail', title: '직업운 상세', chapter: 11 },
  { id: 'love-main', title: '연애운', chapter: 12 },
  { id: 'love-detail', title: '연애운 상세', chapter: 12 },
  { id: 'marriage', title: '결혼운', chapter: 12 },
  { id: 'health-main', title: '건강운', chapter: 13 },
  { id: 'health-detail', title: '건강운 상세', chapter: 13 },
  { id: 'health-advice', title: '건강 조언', chapter: 13 },
  { id: 'daeun-overview', title: '대운 개요', chapter: 14 },
  { id: 'daeun-detail', title: '대운 상세', chapter: 14 },
  { id: 'lucky-items', title: '행운 아이템', chapter: 15 },
  { id: 'lucky-advice', title: '행운 조언', chapter: 15 },
  { id: 'summary', title: '종합 정리', chapter: 16 },
  { id: 'closing', title: '마무리', chapter: 16 }
];

export default function SajuResult250p({
  result,
  name,
  gender,
  birthDate,
  onReset
}: SajuResult250pProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const dayStem = result.day.stem.ko;
  const dayElement = result.day.stem.element;

  const goToPage = (page: number) => {
    if (page >= 0 && page < PAGES.length) {
      setCurrentPage(page);
      setShowMenu(false);
    }
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // Render current page component
  const renderPage = () => {
    const pageId = PAGES[currentPage].id;

    switch (pageId) {
      case 'cover':
        return <Cover userName={name} dayStem={dayStem} dayElement={dayElement} gender={gender} />;
      case 'toc':
        return <TOC />;
      case 'overview':
        return <Overview result={result} />;
      case 'saju-chart':
        return <SajuChart result={result} />;
      case 'daymaster-intro':
        return <DayMasterIntro dayStem={dayStem} />;
      case 'yinyang-balance':
        return <YinYangBalance result={result} />;
      case 'five-elements-main':
        return <FiveElementsMain result={result} />;
      case 'five-elements-detail':
        return <FiveElementsDetail result={result} />;
      case 'ten-gods-main':
        return <TenGodsMain result={result} />;
      case 'ten-gods-detail':
        return <TenGodsDetail result={result} />;
      case 'pattern-analysis':
        return <PatternAnalysis result={result} />;
      case 'twelve-cycles-main':
        return <TwelveCyclesMain result={result} />;
      case 'twelve-cycles-detail':
        return <TwelveCyclesDetail result={result} />;
      case 'hapchung-main':
        return <HapchungMain result={result} />;
      case 'hapchung-detail':
        return <HapchungDetail result={result} />;
      case 'shinsal-main':
        return <ShinsalMain result={result} />;
      case 'shinsal-detail':
        return <ShinsalDetail result={result} />;
      case 'personality-main':
        return <PersonalityMain dayStem={dayStem} />;
      case 'personality-detail':
        return <PersonalityDetail dayStem={dayStem} />;
      case 'wealth-main':
        return <WealthMain dayStem={dayStem} />;
      case 'wealth-detail':
        return <WealthDetail dayStem={dayStem} />;
      case 'career-main':
        return <CareerMain dayStem={dayStem} />;
      case 'career-detail':
        return <CareerDetail dayStem={dayStem} />;
      case 'love-main':
        return <LoveMain dayStem={dayStem} />;
      case 'love-detail':
        return <LoveDetail dayStem={dayStem} />;
      case 'marriage':
        return <MarriageAnalysis dayStem={dayStem} />;
      case 'health-main':
        return <HealthMain dayStem={dayStem} />;
      case 'health-detail':
        return <HealthDetail dayStem={dayStem} />;
      case 'health-advice':
        return <HealthAdvice dayStem={dayStem} />;
      case 'daeun-overview':
        return <DaeunOverview result={result} birthYear={birthDate.year} />;
      case 'daeun-detail':
        return <DaeunDetail result={result} birthYear={birthDate.year} />;
      case 'lucky-items':
        return <LuckyItems dayStem={dayStem} />;
      case 'lucky-advice':
        return <LuckyAdvice dayStem={dayStem} />;
      case 'summary':
        return <Summary dayStem={dayStem} userName={name} />;
      case 'closing':
        return <Closing userName={name} />;
      default:
        return <div className="text-white text-center p-8">Page not found</div>;
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-800">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left: Menu & Home */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-slate-400 hover:text-white transition"
            >
              {showMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              onClick={() => goToPage(0)}
              className="p-2 text-slate-400 hover:text-white transition"
            >
              <Home className="w-5 h-5" />
            </button>
          </div>

          {/* Center: Page Info */}
          <div className="text-center">
            <div className="text-white font-medium">{PAGES[currentPage].title}</div>
            <div className="text-slate-500 text-xs">
              {currentPage + 1} / {PAGES.length}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-slate-400 hover:text-white transition">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentPage + 1) / PAGES.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </nav>

      {/* Side Menu */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-72 z-40 bg-slate-900 border-r border-slate-800 pt-16 overflow-y-auto"
          >
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-4">목차</h3>
              <div className="space-y-1">
                {PAGES.map((page, idx) => (
                  <button
                    key={page.id}
                    onClick={() => goToPage(idx)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      currentPage === idx
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="text-xs text-slate-500 mr-2">{idx + 1}</span>
                    {page.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 min-h-screen bg-slate-950">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-slate-950 py-8 px-4"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Page Navigation Buttons */}
      {currentPage > 0 && (
        <button
          onClick={prevPage}
          className="fixed left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-slate-800/80 hover:bg-slate-700 rounded-full text-white transition shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {currentPage < PAGES.length - 1 && (
        <button
          onClick={nextPage}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-slate-800/80 hover:bg-slate-700 rounded-full text-white transition shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Touch Navigation Hints */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-slate-800/80 backdrop-blur px-4 py-2 rounded-full text-slate-400 text-sm">
          ← 이전 | 다음 →
        </div>
      </div>

      {/* Menu Overlay */}
      {showMenu && (
        <div
          className="fixed inset-0 z-30 bg-black/50"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}
