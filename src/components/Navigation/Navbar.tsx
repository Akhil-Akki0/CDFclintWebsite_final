import React, { useState } from 'react';
import { usePlatform, LIGHT_THEMES } from '../../context/PlatformContext';
import { PageId, LightThemeId } from '../../types';
import { CfdLogo } from '../common/CfdLogo';
import { motion } from 'motion/react';
import {
  Globe,
  LayoutDashboard,
  FolderKanban,
  Shapes,
  Settings,
  PlayCircle,
  BarChart3,
  Brain,
  FileSpreadsheet,
  Volume2,
  VolumeX,
  Palette,
  Check,
  Sparkles,
  TrendingUp,
  BookOpen,
  ListOrdered,
  FolderArchive,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    page,
    setPage,
    soundEnabled,
    toggleSound,
    lightTheme,
    setLightTheme,
    activeThemeConfig,
    themeMode,
    toggleThemeMode,
    queue,
    setIsQueueOpen,
    setIsOpenFoamModalOpen,
  } = usePlatform();
  const [showThemePicker, setShowThemePicker] = useState(false);

  const runningJobsCount = queue.filter((j) => j.status === 'running').length;

  const navItems: { id: PageId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'landing', label: 'Landing', icon: Globe },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'geometry', label: 'Geometry', icon: Shapes },
    { id: 'setup', label: 'Setup', icon: Settings },
    { id: 'runner', label: 'Run', icon: PlayCircle },
    { id: 'sweeps', label: 'Sweeps & Polars', icon: TrendingUp },
    { id: 'results', label: 'Results', icon: BarChart3 },
    { id: 'ai', label: 'AI', icon: Brain },
    { id: 'reporting', label: 'Reports', icon: FileSpreadsheet },
    { id: 'docs', label: 'Docs', icon: BookOpen },
  ];

  return (
    <header className="h-14 bg-white/90 backdrop-blur-md border-b border-[#BAE6FD]/60 shadow-xs px-3 sm:px-5 flex items-center justify-between select-none z-40 shrink-0 sticky top-0 transition-colors">
      {/* Brand & Official Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPage('landing')}
          className="group text-left transition-transform active:scale-95 flex items-center"
          title="CFD Platform — Home"
        >
          <CfdLogo size="sm" showText={true} />
        </button>

        <div className="h-5 w-px bg-[#E2E8F0] hidden xl:block mx-1"></div>

        {/* Live CFD Engine Badge */}
        <div className="hidden 2xl:flex items-center gap-1.5 text-[11px] px-2.5 py-0.5 rounded-full bg-[#ECFDF5] text-[#047857] border border-[#A7F3D0] font-medium shadow-2xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse"></span>
          <span>Live CFD Engine</span>
        </div>
      </div>

      {/* Center Navigation Links */}
      <nav className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1 max-w-[55vw] lg:max-w-[62vw]">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = page === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => setPage(item.id)}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap relative cursor-pointer ${
                isActive
                  ? 'text-[#0284C7] bg-[#E0F2FE] font-bold shadow-xs border border-[#BAE6FD]'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-white/80'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#0284C7]' : 'text-[#64748B]'}`} />
              <span>{item.label}</span>
              {isActive && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-[#0284C7] rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Bright Light Color Theme Selector */}
        <div className="relative">
          <button
            onClick={() => setShowThemePicker(!showThemePicker)}
            title="Change Light Background Theme"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#BAE6FD] bg-[#F0F9FF] hover:bg-[#E0F2FE] text-[#0369A1] text-xs font-medium transition-all shadow-2xs cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-[#0284C7]" />
            <span className="hidden md:inline font-sans">{activeThemeConfig.badge}</span>
            <span
              className="w-2.5 h-2.5 rounded-full border border-white shadow-2xs"
              style={{ backgroundColor: activeThemeConfig.accentColor }}
            />
          </button>

          {/* Theme Dropdown Menu */}
          {showThemePicker && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowThemePicker(false)}
              />
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-[#BAE6FD] shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[11px] font-semibold text-[#0369A1] px-2 py-1 flex items-center justify-between border-b border-[#F1F5F9] mb-1">
                  <span>Bright Light Colors</span>
                  <Sparkles className="w-3 h-3 text-[#0284C7]" />
                </div>
                <div className="space-y-1">
                  {(Object.keys(LIGHT_THEMES) as LightThemeId[]).map((themeKey) => {
                    const theme = LIGHT_THEMES[themeKey];
                    const isSelected = lightTheme === themeKey;
                    return (
                      <button
                        key={themeKey}
                        onClick={() => {
                          setLightTheme(themeKey);
                          setShowThemePicker(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#E0F2FE] text-[#0284C7] font-semibold'
                            : 'hover:bg-[#F8FAFC] text-[#334155]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-slate-300 shadow-2xs"
                            style={{ backgroundColor: theme.accentColor }}
                          />
                          <span>{theme.name}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#0284C7]" />}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-[#94A3B8] px-2 pt-2 border-t border-[#F1F5F9] mt-1.5 leading-tight">
                  High-contrast bright aero color themes with subtle gradient flows.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Simulation Queue Button */}
        <button
          onClick={() => setIsQueueOpen(true)}
          title="Open Simulation Queue & Terminal Logs"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#BAE6FD] bg-[#F0F9FF] dark:bg-slate-800 dark:border-slate-700 hover:bg-[#E0F2FE] text-[#0284C7] dark:text-cyan-400 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
        >
          <ListOrdered className="w-3.5 h-3.5" />
          <span className="hidden sm:inline font-mono">Queue</span>
          {runningJobsCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#0284C7] text-white text-[10px] flex items-center justify-center font-mono animate-pulse">
              {runningJobsCount}
            </span>
          )}
        </button>

        {/* OpenFOAM Export Quick Button */}
        <button
          onClick={() => setIsOpenFoamModalOpen(true)}
          title="Export Production OpenFOAM Case ZIP"
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-all shadow-2xs cursor-pointer"
        >
          <FolderArchive className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>OpenFOAM</span>
        </button>

        {/* Dark / Light Mode Toggle */}
        <button
          onClick={toggleThemeMode}
          title={themeMode === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-amber-400 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
        >
          {themeMode === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Sound Effects Toggle */}
        <button
          onClick={toggleSound}
          title={soundEnabled ? 'Sound Effects Enabled (Click to Mute)' : 'Sound Effects Muted (Click to Enable)'}
          className={`p-2 rounded-lg border transition-colors flex items-center gap-1 text-xs cursor-pointer ${
            soundEnabled
              ? 'bg-[#E0F2FE] text-[#0284C7] border-[#BAE6FD] hover:bg-[#BAE6FD]/60 dark:bg-slate-800 dark:border-slate-700 dark:text-cyan-400'
              : 'bg-white text-[#94A3B8] border-[#E2E8F0] hover:text-[#64748B] dark:bg-slate-800 dark:border-slate-700'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="text-[10px] font-mono hidden xl:inline font-medium">
            {soundEnabled ? 'SFX' : 'MUTED'}
          </span>
        </button>

        {/* Quick Simulation CTA */}
        {page !== 'runner' && (
          <button
            onClick={() => setPage('runner')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#0284C7] to-[#0369A1] hover:from-[#0369A1] hover:to-[#075985] text-white text-xs font-semibold rounded-lg shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <PlayCircle className="w-3.5 h-3.5 text-white" />
            <span>Workbench</span>
          </button>
        )}
      </div>
    </header>
  );
};
