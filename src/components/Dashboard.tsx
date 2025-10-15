import { useState, useMemo, lazy, Suspense } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  TrendingUp, 
  LayoutDashboard, 
  Target, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  MessageSquare,
  LogOut,
  User,
  ChevronDown,
  FileText,
  Trophy,
  Zap,
  Menu,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { DashboardLoader } from './SkeletonLoader';
import type { DashboardProps } from '../types';

// Lazy load dashboard components for better performance
const LineupBuilder = lazy(() => import('./LineupBuilder'));
const PropBetFinder = lazy(() => import('./PropBetFinder'));
const DashboardOverview = lazy(() => import('./DashboardOverview'));
const GameAnalysis = lazy(() => import('./GameAnalysis'));
const AccountSettings = lazy(() => import('./AccountSettings'));

export default function Dashboard({ onLogout }: DashboardProps) {
  const [selectedSport, setSelectedSport] = useState('NFL');
  const [selectedSlate, setSelectedSlate] = useState('main');
  const [activeView, setActiveView] = useState('games');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderMainContent = useMemo(() => {
    switch (activeView) {
      case 'games':
        return (
          <Suspense fallback={<DashboardLoader />}>
            <DashboardOverview sport={selectedSport} />
          </Suspense>
        );
      case 'lineup-builder':
        return (
          <Suspense fallback={<DashboardLoader />}>
            <LineupBuilder sport={selectedSport} slate={selectedSlate} />
          </Suspense>
        );
      case 'prop-bet-finder':
        return (
          <Suspense fallback={<DashboardLoader />}>
            <PropBetFinder sport={selectedSport} />
          </Suspense>
        );
      case 'game-analysis':
        return (
          <Suspense fallback={<DashboardLoader />}>
            <GameAnalysis sport={selectedSport} />
          </Suspense>
        );
      case 'settings':
        return (
          <Suspense fallback={<DashboardLoader />}>
            <AccountSettings />
          </Suspense>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-slate-300 mb-2">Coming Soon</h2>
              <p className="text-slate-500">This feature is under development</p>
            </div>
          </div>
        );
    }
  }, [activeView, selectedSport, selectedSlate]);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
      
      {/* Gradient Orb - Top Left */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Gradient Orb - Right */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-blue-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Left Sidebar - Collapsible */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0'} bg-black/80 backdrop-blur-xl border-r border-cyan-500/20 flex flex-col shadow-2xl relative z-10 transition-all duration-300 overflow-hidden`}>
        {/* Logo Header */}
        <div className="p-6 border-b border-cyan-500/20 bg-gradient-to-r from-black via-cyan-950/10 to-black">
          <div className="flex items-center gap-3 mb-2">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30 relative">
                <Trophy className="w-7 h-7 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-black animate-pulse" />
              </div>
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl rounded-full" />
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">UrSim</div>
              <div className="text-xs text-cyan-400/70 font-medium">DFS Lineup Optimizer</div>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-2.5 hover:bg-cyan-500/10 transition-colors">
              <div className="text-cyan-400/80 text-xs font-medium">Active Contests</div>
              <div className="text-white text-lg font-bold">12</div>
            </div>
            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-2.5 hover:bg-cyan-500/10 transition-colors">
              <div className="text-cyan-400/80 text-xs font-medium">Win Rate</div>
              <div className="text-white text-lg font-bold">64%</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* DASHBOARD SECTION */}
          <div className="pb-2 flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400/80 text-xs font-bold uppercase tracking-wider">Dashboard</span>
          </div>
          <button
            onClick={() => setActiveView('games')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
              activeView === 'games' 
                ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                : 'text-slate-400 hover:bg-cyan-500/5 hover:text-cyan-400 border border-transparent hover:border-cyan-500/20'
            }`}
          >
            <LayoutDashboard className={`w-5 h-5 ${activeView === 'games' ? 'text-cyan-400' : 'group-hover:text-cyan-400'} transition-colors`} />
            <span className="font-medium">Games Overview</span>
            {activeView === 'games' && <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />}
          </button>
          {/* ANALYSIS SECTION */}
          <div className="pt-5 pb-2 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400/80 text-xs font-bold uppercase tracking-wider">Analysis</span>
          </div>
          <button
            onClick={() => setActiveView('prop-bet-finder')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
              activeView === 'prop-bet-finder' 
                ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                : 'text-slate-400 hover:bg-cyan-500/5 hover:text-cyan-400 border border-transparent hover:border-cyan-500/20'
            }`}
          >
            <TrendingUp className={`w-5 h-5 ${activeView === 'prop-bet-finder' ? 'text-cyan-400' : 'group-hover:text-cyan-400'} transition-colors`} />
            <span className="font-medium">Props & Stacks</span>
            {activeView === 'prop-bet-finder' && <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />}
          </button>
          <button
            onClick={() => setActiveView('game-analysis')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
              activeView === 'game-analysis' 
                ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                : 'text-slate-400 hover:bg-cyan-500/5 hover:text-cyan-400 border border-transparent hover:border-cyan-500/20'
            }`}
          >
            <Target className={`w-5 h-5 ${activeView === 'game-analysis' ? 'text-cyan-400' : 'group-hover:text-cyan-400'} transition-colors`} />
            <span className="font-medium">Game Matchups</span>
            {activeView === 'game-analysis' && <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />}
          </button>

          {/* OPTIMIZER SECTION */}
          <div className="pt-5 pb-2 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400/80 text-xs font-bold uppercase tracking-wider">Optimizer</span>
          </div>
          <button
            onClick={() => setActiveView('lineup-builder')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
              activeView === 'lineup-builder' 
                ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                : 'text-slate-400 hover:bg-cyan-500/5 hover:text-cyan-400 border border-transparent hover:border-cyan-500/20'
            }`}
          >
            <FileText className={`w-5 h-5 ${activeView === 'lineup-builder' ? 'text-cyan-400' : 'group-hover:text-cyan-400'} transition-colors`} />
            <span className="font-medium">Lineup Builder</span>
            {activeView === 'lineup-builder' && <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />}
          </button>

          {/* ACCOUNT SECTION */}
          <div className="pt-5 pb-2 flex items-center gap-2">
            <Settings className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400/80 text-xs font-bold uppercase tracking-wider">Account</span>
          </div>
          <button
            onClick={() => setActiveView('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
              activeView === 'settings' 
                ? 'bg-gradient-to-r from-cyan-500/10 to-blue-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                : 'text-slate-400 hover:bg-cyan-500/5 hover:text-cyan-400 border border-transparent hover:border-cyan-500/20'
            }`}
          >
            <User className={`w-5 h-5 ${activeView === 'settings' ? 'text-cyan-400' : 'group-hover:text-cyan-400'} transition-colors`} />
            <span className="font-medium">Settings</span>
            {activeView === 'settings' && <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />}
          </button>

          {/* LOGOUT */}
          <div className="pt-4 border-t border-cyan-500/10 mt-4">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-slate-400 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/20"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </nav>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Navigation Bar - DFS Optimized */}
        <header className="h-20 bg-black/80 backdrop-blur-xl border-b border-cyan-500/20 flex items-center justify-between px-8 shadow-2xl">
          <div className="flex items-center gap-4">
            {/* Hamburger Menu */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
            {/* Sport Selector */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-cyan-400/70 font-medium">Sport</label>
              <Select value={selectedSport} onValueChange={setSelectedSport}>
                <SelectTrigger className="w-36 bg-black/50 border-cyan-500/20 text-white hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NFL">🏈 NFL</SelectItem>
                  <SelectItem value="NBA">🏀 NBA</SelectItem>
                  <SelectItem value="MLB">⚾ MLB</SelectItem>
                  <SelectItem value="NHL">🏒 NHL</SelectItem>
                  <SelectItem value="ESPORTS">🎮 Esports</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Slate Selector */}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-cyan-400/70 font-medium">Contest Slate</label>
              <Select value={selectedSlate} onValueChange={setSelectedSlate}>
                <SelectTrigger className="w-44 bg-black/50 border-cyan-500/20 text-white hover:border-cyan-400 transition-all shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="main">Main Slate</SelectItem>
                  <SelectItem value="early">Early Only</SelectItem>
                  <SelectItem value="showdown">Showdown</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="prime">Prime Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Live Indicator */}
            <div className="ml-4 flex items-center gap-2 px-3 py-2 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              <span className="text-cyan-400 text-sm font-medium">Live Contests</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Actions */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
              title="Help & Support"
            >
              <HelpCircle className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all relative"
              title="Notifications"
            >
              <MessageSquare className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 px-4 py-2 rounded-lg hover:bg-cyan-500/5 transition-all border border-transparent hover:border-cyan-500/20">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(6,182,212,0.3)]">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">User</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => setActiveView('settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trophy className="w-4 h-4 mr-2" />
                  My Lineups
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout} className="text-red-400 focus:text-red-300">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-black p-8">
          {renderMainContent}
        </main>
      </div>
    </div>
  );
}
