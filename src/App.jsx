import React, { useMemo, useState } from 'react';
import {
  Activity,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  ClipboardList,
  ExternalLink,
  Files,
  Home,
  Layers,
  LineChart,
  Mail,
  Menu,
  Search,
  Shield,
  Sparkles,
  X,
} from 'lucide-react';

const menuItems = [
  {
    id: 'home',
    title: 'หน้าแรก',
    icon: Home,
    type: 'view',
    badge: null,
  },
  {
    id: 'qi-plan',
    title: 'Quality Improvement Plan',
    subtitle: 'แผนพัฒนาคุณภาพโรงพยาบาล',
    icon: ClipboardList,
    url: 'https://script.google.com/macros/s/AKfycbxi9LlAXHCxNuu-lI6pC1_R4V45vohKcFARF4hTnppO28nyZ9MO-MpHlRPbGbEeAsGj0g/exec',
    badge: 'webapp',
    badgeText: 'Web App',
    description:
      'ระบบบันทึกและติดตามความก้าวหน้าโครงการพัฒนาคุณภาพ รวบรวมแผนงานเชิงกลยุทธ์ของแต่ละหน่วยงานอย่างเป็นระบบ',
  },
  {
    id: 'essential-safety',
    title: '9 Essential Standard for Safety',
    subtitle: 'มาตรฐานสำคัญจำเป็น 9 ข้อ',
    icon: Shield,
    url: 'https://sathapornmanee.github.io/warin-9-essential-standards/',
    badge: 'webapp',
    badgeText: 'Web App',
    description: 'แนวทางปฏิบัติตามมาตรฐานความปลอดภัยสำคัญจำเป็น 9 ข้อสำหรับโรงพยาบาล',
  },
  {
    id: 'ha-sar',
    title: 'HA SAR Writing Assistant',
    subtitle: 'ผู้ช่วยเขียนแบบประเมินตนเองในการพัฒนาคุณภาพ',
    icon: Bot,
    url: 'https://gemini.google.com/gem/1Ke-AK0zVxSrsNEnV0h-jy8IoLR7AC9n0?usp=sharing',
    badge: 'ai',
    badgeText: 'AI Assistant',
    description:
      'เครื่องมือสร้างสรรค์และปรับแต่งคำอธิบายแบบประเมินตนเอง (SAR) ให้สอดคล้องกับมาตรฐาน HA อย่างมืออาชีพและรวดเร็ว',
  },
  {
    id: 'perf-insight',
    title: 'Performance Insight',
    subtitle: 'นักวิเคราะห์ผลการดำเนินงาน',
    icon: LineChart,
    url: 'https://gemini.google.com/share/7ed04cbc04ba',
    badge: 'ai',
    badgeText: 'AI Assistant',
    description:
      'ระบบวิเคราะห์ตัวชี้วัด ประมวลผลลัพธ์การดำเนินงานหลัก พร้อมสรุปประเด็นสำคัญเพื่อการตัดสินใจเชิงบริหาร',
  },
  {
    id: 'quality-doc',
    title: 'Quality Document System',
    subtitle: 'เอกสารระบบคุณภาพ',
    icon: Files,
    url: 'https://script.google.com/macros/s/AKfycbznDRG2YQa1VsojEZgDmNMFX3fEIuV58jioOZieXcXYE-ONZIRWeIZiRWL2TV45ucTcYg/exec',
    badge: 'webapp',
    badgeText: 'Web App',
    description:
      'คลังรวบรวมและวิเคราะห์สืบค้นเอกสารคุณภาพ แนวทางปฏิบัติงานมาตรฐาน (SOP) และคู่มือต่างๆ ด้วยขุมพลังปัญญาประดิษฐ์',
  },
  {
    id: 'booking',
    title: 'Conference Room Booking',
    subtitle: 'ระบบจองห้องประชุม',
    icon: Calendar,
    url: 'https://script.google.com/macros/s/AKfycbxTbHSE3o4mjMdFxQ3AmJkWB_hrRNZgaYPFVbEMeEYH1mYdDwZrGkB-OQwrQIDHAcQ3_g/exec',
    badge: 'webapp',
    badgeText: 'Web App',
    description:
      'แพลตฟอร์มอำนวยความสะดวกในการตรวจสอบสถานะ ค้นหาตาราง และทำรายการจองห้องประชุมของโรงพยาบาลแบบเรียลไทม์',
  },
];

export default function App() {
  const [activeMenu, setActiveMenu] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const activeItem = menuItems.find((item) => item.id === activeMenu) || menuItems[0];
  const ActiveIcon = activeItem.icon;

  const filteredServices = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return menuItems
      .filter((item) => item.id !== 'home')
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(query) ||
          item.subtitle.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query);

        const matchesCategory =
          categoryFilter === 'all' ||
          (categoryFilter === 'ai' && item.badge === 'ai') ||
          (categoryFilter === 'webapp' && item.badge === 'webapp');

        return matchesSearch && matchesCategory;
      });
  }, [categoryFilter, searchQuery]);

  const renderBadge = (badgeType, size = 'sm') => {
    if (!badgeType) return null;

    if (badgeType === 'ai') {
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white shadow-sm shadow-indigo-200 ${
            size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
          }`}
        >
          <Sparkles size={size === 'xs' ? 10 : 12} className="stroke-[2]" />
          <span>AI Assistant</span>
        </span>
      );
    }

    if (badgeType === 'webapp') {
      return (
        <span
          className={`inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 font-semibold text-emerald-700 ${
            size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
          }`}
        >
          <Layers size={size === 'xs' ? 10 : 12} className="stroke-[2]" />
          <span>Web App</span>
        </span>
      );
    }

    return null;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="ปิดเมนู"
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-80 transform flex-col bg-gradient-to-b from-teal-800 to-teal-950 text-white shadow-2xl transition-transform duration-300 ease-in-out lg:static ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between border-b border-teal-700/30 bg-teal-900/40 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-2.5 text-teal-800 shadow-md">
              <Activity size={26} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg font-bold leading-tight tracking-wide">Warinchamrab</h1>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-200">
                Quality Improvement Center
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="ปิดเมนู"
            className="rounded-lg bg-teal-900/50 p-1.5 text-teal-100 hover:text-white lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3.5 py-5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  setActiveMenu(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`group flex w-full items-center gap-3.5 rounded-xl px-4 py-3.5 text-left transition-all duration-200 ${
                  isActive
                    ? 'scale-[1.02] bg-white font-bold text-teal-900 shadow-lg shadow-teal-950/20'
                    : 'text-teal-100 hover:bg-teal-700/40 hover:text-white'
                }`}
              >
                <div
                  className={`rounded-lg p-1.5 transition-colors ${
                    isActive
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-teal-900/30 text-teal-200 group-hover:bg-teal-800/40'
                  }`}
                >
                  <Icon size={18} className="stroke-[2]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-sm">{item.title}</span>
                  {item.subtitle && (
                    <span
                      className={`mt-0.5 block truncate text-xs ${
                        isActive ? 'font-medium text-teal-700' : 'text-teal-300/80 group-hover:text-teal-200'
                      }`}
                    >
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-teal-800/30 bg-teal-950/50 p-4 text-center text-xs text-teal-300/75">
          เวอร์ชันระบบ v2.0 (2026) • พัฒนาโดย นพ.สถาพร มณี
        </div>
      </aside>

      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-30 flex items-center justify-between border-b border-slate-100 bg-white p-4 shadow-md lg:hidden">
          <div className="flex items-center gap-2 font-bold tracking-wide text-teal-800">
            <div className="rounded-lg bg-teal-50 p-1.5">
              <Activity size={18} className="text-teal-700" />
            </div>
            <span className="text-sm">Warinchamrab QIC</span>
          </div>
          <button
            type="button"
            aria-label="เปิดเมนู"
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-xl bg-slate-100 p-2.5 text-slate-700 transition-colors hover:bg-slate-200"
          >
            <Menu size={20} />
          </button>
        </header>

        <main className="relative flex-1 overflow-y-auto bg-slate-50/70 p-4 lg:p-8">
          <div className="mx-auto flex h-full max-w-6xl flex-col">
            {activeMenu === 'home' ? (
              <div className="space-y-8 pb-12">
                <section className="relative flex flex-col gap-6 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-teal-700 via-teal-800 to-teal-900 p-6 text-white shadow-xl shadow-teal-900/10 lg:gap-8 lg:p-10">
                  <div className="absolute right-0 top-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/5 blur-3xl" />

                  <div className="z-10 flex flex-col items-center gap-8 lg:flex-row">
                    <div className="flex-1 text-center lg:text-left">
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-600/30 bg-teal-900/40 px-3 py-1.5 text-xs font-semibold text-teal-200">
                        <Sparkles size={14} />
                        <span>ศูนย์พัฒนาคุณภาพ</span>
                      </div>
                      <h2 className="mb-3 text-3xl font-extrabold leading-tight tracking-tight lg:text-4xl">
                        Warinchamrab QIC Ecosystem
                      </h2>

                      <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
                        <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-1.5 text-xs font-medium">
                          <CheckCircle2 size={14} className="text-teal-300" />
                          <span>มาตรฐาน HA</span>
                        </div>
                        <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-3.5 py-1.5 text-xs font-medium">
                          <CheckCircle2 size={14} className="text-teal-300" />
                          <span>ระบบสารสนเทศอัจฉริยะ</span>
                        </div>
                      </div>
                    </div>

                    <div className="z-10 w-full shrink-0 lg:w-80">
                      <div className="rounded-2xl border border-white/20 bg-white/10 p-2.5 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]">
                        <img
                          src="https://lh3.googleusercontent.com/d/17F5VD_e4TluDC9bRxwzeTWHCSDvkTgwS"
                          alt="Quality Improvement Ecosystem"
                          className="h-44 w-full rounded-xl bg-teal-950 object-cover"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src =
                              'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600';
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="z-10 mt-2 border-t border-teal-600/30 pt-5 text-center lg:text-left">
                    <p className="text-sm font-medium leading-relaxed text-teal-100/90 lg:text-base">
                      ศูนย์พัฒนาคุณภาพ โรงพยาบาลวารินชำราบ ขับเคลื่อนนวัตกรรมและกระบวนการทำงานที่เป็นเลิศด้วยเทคโนโลยีปัญญาประดิษฐ์
                      (AI) และแอปพลิเคชันระบบสารสนเทศอัตโนมัติ
                    </p>
                  </div>
                </section>

                <section className="space-y-6">
                  <div className="flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-4 md:flex-row md:items-center">
                    <div>
                      <h3 className="text-2xl font-extrabold tracking-tight text-slate-800">
                        แผงควบคุมหลัก (Control Panel)
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        เลือกใช้งานเครื่องมือวิเคราะห์และซอฟต์แวร์สนับสนุนระบบคุณภาพทั้งหมดของเรา
                      </p>
                    </div>

                    <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center md:w-auto">
                      <div className="flex rounded-xl border border-slate-200 bg-slate-100 p-1">
                        <button
                          type="button"
                          onClick={() => setCategoryFilter('all')}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                            categoryFilter === 'all'
                              ? 'bg-white text-teal-800 shadow-sm'
                              : 'text-slate-600 hover:text-teal-800'
                          }`}
                        >
                          ทั้งหมด
                        </button>
                        <button
                          type="button"
                          onClick={() => setCategoryFilter('ai')}
                          className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                            categoryFilter === 'ai'
                              ? 'bg-white text-indigo-700 shadow-sm'
                              : 'text-slate-600 hover:text-indigo-700'
                          }`}
                        >
                          <Sparkles size={12} />
                          AI
                        </button>
                        <button
                          type="button"
                          onClick={() => setCategoryFilter('webapp')}
                          className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                            categoryFilter === 'webapp'
                              ? 'bg-white text-emerald-800 shadow-sm'
                              : 'text-slate-600 hover:text-emerald-800'
                          }`}
                        >
                          <Layers size={12} />
                          Web App
                        </button>
                      </div>

                      <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="ค้นหาเครื่องมือ..."
                          value={searchQuery}
                          onChange={(event) => setSearchQuery(event.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-12 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:w-56"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full bg-slate-100 p-1 text-xs text-slate-500 hover:bg-slate-200"
                          >
                            ล้าง
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {filteredServices.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredServices.map((service) => {
                        const IconComponent = service.icon;

                        return (
                          <article
                            key={service.id}
                            className="group relative flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                          >
                            <div className="mb-4 flex items-start justify-between gap-3">
                              <div
                                className={`rounded-2xl p-3.5 shadow-inner transition-colors duration-300 ${
                                  service.badge === 'ai'
                                    ? 'bg-violet-50 text-violet-700 group-hover:bg-violet-600 group-hover:text-white'
                                    : 'bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white'
                                }`}
                              >
                                <IconComponent size={24} className="stroke-[2]" />
                              </div>
                              {renderBadge(service.badge, 'md')}
                            </div>

                            <div className="flex-1 space-y-2">
                              <h4 className="text-lg font-bold tracking-tight text-slate-800 transition-colors group-hover:text-teal-900">
                                {service.title}
                              </h4>
                              <p className="text-xs font-semibold text-teal-700/80">{service.subtitle}</p>
                              <p className="pt-1.5 text-sm leading-relaxed text-slate-500">{service.description}</p>
                            </div>

                            <div className="mt-6 border-t border-slate-100 pt-4">
                              <a
                                href={service.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                                  service.badge === 'ai'
                                    ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-600 hover:text-white'
                                    : 'bg-teal-50 text-teal-700 hover:bg-teal-700 hover:text-white'
                                }`}
                              >
                                <span>เข้าใช้งานระบบ</span>
                                <ExternalLink size={15} />
                              </a>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                        <Search size={28} />
                      </div>
                      <h4 className="text-lg font-bold text-slate-700">ไม่พบเครื่องมือที่ต้องการค้นหา</h4>
                      <p className="mt-1 text-sm text-slate-500">
                        กรุณาลองเปลี่ยนคำค้นหาหรือเลือกประเภททั้งหมดอีกครั้ง
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setCategoryFilter('all');
                        }}
                        className="mt-4 rounded-xl bg-teal-600 px-4 py-2 text-xs font-semibold text-white hover:bg-teal-700"
                      >
                        รีเซ็ตตัวกรอง
                      </button>
                    </div>
                  )}
                </section>

                <section className="flex items-start gap-4 rounded-2xl border border-amber-200/60 bg-amber-50/50 p-5">
                  <div className="shrink-0 rounded-xl bg-amber-100 p-2 text-amber-800">
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-amber-900">
                      ข้อแนะนำการใช้งานระบบปัญญาประดิษฐ์ (Gemini)
                    </h5>
                    <p className="mt-1 text-xs leading-relaxed text-amber-800/80">
                      Gemini เป็น AI และอาจทำผิดพลาดได้ ผู้ใช้งานควรตรวจสอบคำตอบด้วยตนเองทุกครั้ง
                    </p>
                  </div>
                </section>
              </div>
            ) : (
              <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center pb-16 pt-6">
                <div className="relative flex flex-col items-center overflow-hidden rounded-[1.75rem] border border-teal-50/60 bg-white p-8 text-center shadow-xl lg:p-12">
                  <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-teal-500 via-indigo-500 to-purple-600" />

                  <div className="mb-4">{renderBadge(activeItem.badge, 'md')}</div>

                  <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-teal-50 text-teal-700 shadow-inner">
                    <ActiveIcon size={44} className="stroke-[1.5]" />
                  </div>

                  <h2 className="mb-2 text-3xl font-extrabold text-slate-800">{activeItem.title}</h2>
                  <p className="mb-6 text-base font-semibold text-teal-700/80">{activeItem.subtitle}</p>
                  <p className="mb-8 max-w-lg text-sm leading-relaxed text-slate-500">{activeItem.description}</p>

                  <a
                    href={activeItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-700 px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-teal-700 hover:to-teal-800 hover:shadow-teal-900/10 focus:ring-4 focus:ring-teal-100"
                  >
                    <span>เข้าสู่ระบบ / เปิดใช้งานเครื่องมือ</span>
                    <ExternalLink size={20} />
                  </a>

                  <div className="mt-8 space-y-2 text-xs text-slate-400">
                    <p>* ระบบจะนำทางและเปิดหน้าต่างเบราว์เซอร์แถบใหม่เพื่อเข้าใช้งานแอปพลิเคชันปลายทางอย่างปลอดภัย</p>
                    {activeItem.badge === 'ai' && (
                      <p className="font-medium text-indigo-500">
                        ระบบขับเคลื่อนผ่านโมเดลปัญญาประดิษฐ์ระดับสูงเพื่อวิเคราะห์แผนงานส่วนบุคคล
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>
        </main>

        <footer className="z-30 shrink-0 border-t border-slate-100 bg-white px-6 py-4 shadow-[0_-2px_10px_rgba(0,0,0,0.02)]">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-xs font-medium text-slate-500 sm:flex-row lg:text-sm">
            <span>© 2026 Warinchamrab Hospital Quality Improvement Center. สงวนลิขสิทธิ์</span>
            <div className="flex items-center gap-2">
              <Mail size={15} className="shrink-0 text-teal-600" />
              <span>
                ติดต่อเรา E-mail:{' '}
                <a href="mailto:warinqic@gmail.com" className="font-semibold text-teal-600 hover:underline">
                  warinqic@gmail.com
                </a>
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
