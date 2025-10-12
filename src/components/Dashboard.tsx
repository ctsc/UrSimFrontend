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
  Wallet,
  Newspaper
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { DashboardLoader } from './SkeletonLoader';

// Lazy load dashboard components for better performance
const LineupBuilder = lazy(() => import('./LineupBuilder'));
const PropBetFinder = lazy(() => import('./PropBetFinder'));
const DashboardOverview = lazy(() => import('./DashboardOverview'));
const GameAnalysis = lazy(() => import('./GameAnalysis'));
const PopularParlays = lazy(() => import('./PopularParlays'));

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [selectedSport, setSelectedSport] = useState('NFL');
  const [selectedSlate, setSelectedSlate] = useState('main');
  const [activeView, setActiveView] = useState('games');

  const renderMainContent = useMemo(() => {
    switch (activeView) {
      case 'games':
        return (
          <Suspense fallback={<DashboardLoader />}>
            <DashboardOverview sport={selectedSport} />
          </Suspense>
        );
      case 'parlays':
        return (
          <Suspense fallback={<DashboardLoader />}>
            <PopularParlays sport={selectedSport} />
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
    <div className="min-h-screen bg-slate-900 flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <span className="text-white">DFS Optimizer</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="pb-2">
            <span className="text-slate-500 text-sm px-4">MAIN</span>
          </div>
          <button
            onClick={() => setActiveView('games')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              activeView === 'games' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Games Dashboard
          </button>
          <button
            onClick={() => setActiveView('parlays')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              activeView === 'parlays' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Target className="w-5 h-5" />
            Popular Parlays
          </button>

          <div className="pt-4 pb-2">
            <span className="text-slate-500 text-sm px-4">ANALYTICS</span>
          </div>
          <button
            onClick={() => setActiveView('prop-bet-finder')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              activeView === 'prop-bet-finder' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            Prop Bet Analyzer
          </button>
          <button
            onClick={() => setActiveView('game-analysis')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              activeView === 'game-analysis' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Game Analysis
          </button>

          <div className="pt-4 pb-2">
            <span className="text-slate-500 text-sm px-4">DFS TOOLS</span>
          </div>
          <button
            onClick={() => setActiveView('lineup-builder')}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              activeView === 'lineup-builder' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-300 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-5 h-5" />
            Lineup Builder
          </button>

          <div className="pt-4">
            <button
              onClick={() => setActiveView('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                activeView === 'settings' ? 'bg-blue-500/10 text-blue-400' : 'text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Settings className="w-5 h-5" />
              Settings
            </button>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation Bar */}
        <header className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Select value={selectedSport} onValueChange={setSelectedSport}>
              <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NFL">NFL</SelectItem>
                <SelectItem value="NBA">NBA</SelectItem>
                <SelectItem value="MLB">MLB</SelectItem>
                <SelectItem value="NHL">NHL</SelectItem>
                <SelectItem value="ESPORTS">Esports</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSlate} onValueChange={setSelectedSlate}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
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

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
              <HelpCircle className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white">
              <MessageSquare className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-slate-300 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => setActiveView('settings')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Account
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-slate-900 p-6">
          {renderMainContent}
        </main>
      </div>
    </div>
  );
}
