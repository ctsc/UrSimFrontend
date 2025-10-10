import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { TrendingUp, Users, Flame, Target, Copy } from 'lucide-react';
import { useState } from 'react';

interface PopularParlaysProps {
  sport: string;
}

const parlaysByPosition = {
  QB: [
    { 
      id: 1, 
      players: ['Patrick Mahomes O287.5 Pass Yds', 'Josh Allen O2.5 Pass TDs'],
      odds: '+265',
      popularity: 92,
      edge: '+8.2%',
      legs: 2
    },
    { 
      id: 2, 
      players: ['Patrick Mahomes O287.5 Pass Yds', 'Josh Allen O2.5 Pass TDs', 'Lamar Jackson O45.5 Rush Yds'],
      odds: '+485',
      popularity: 78,
      edge: '+6.5%',
      legs: 3
    },
  ],
  RB: [
    { 
      id: 3, 
      players: ['Christian McCaffrey O95.5 Rush Yds', 'Saquon Barkley O75.5 Rush Yds'],
      odds: '+310',
      popularity: 88,
      edge: '+7.1%',
      legs: 2
    },
    { 
      id: 4, 
      players: ['Christian McCaffrey O95.5 Rush Yds', 'Derrick Henry O85.5 Rush Yds', 'Nick Chubb O70.5 Rush Yds'],
      odds: '+520',
      popularity: 75,
      edge: '+5.8%',
      legs: 3
    },
  ],
  WR: [
    { 
      id: 5, 
      players: ['Tyreek Hill O82.5 Rec Yds', 'Justin Jefferson O75.5 Rec Yds'],
      odds: '+280',
      popularity: 85,
      edge: '+6.9%',
      legs: 2
    },
    { 
      id: 6, 
      players: ['Tyreek Hill O82.5 Rec Yds', 'CeeDee Lamb O70.5 Rec Yds', 'Amon-Ra St. Brown O65.5 Rec Yds'],
      odds: '+495',
      popularity: 71,
      edge: '+5.2%',
      legs: 3
    },
  ],
  TE: [
    { 
      id: 7, 
      players: ['Travis Kelce O5.5 Rec', 'Mark Andrews O4.5 Rec'],
      odds: '+245',
      popularity: 80,
      edge: '+7.5%',
      legs: 2
    },
  ],
};

const teamParlays = [
  { 
    id: 1, 
    team: 'Kansas City Chiefs',
    players: ['Patrick Mahomes O287.5 Pass Yds', 'Travis Kelce O5.5 Rec', 'Isiah Pacheco O60.5 Rush Yds'],
    odds: '+425',
    popularity: 94,
    edge: '+8.8%',
    legs: 3
  },
  { 
    id: 2, 
    team: 'Buffalo Bills',
    players: ['Josh Allen O2.5 Pass TDs', 'Stefon Diggs O75.5 Rec Yds'],
    odds: '+290',
    popularity: 87,
    edge: '+7.2%',
    legs: 2
  },
  { 
    id: 3, 
    team: 'San Francisco 49ers',
    players: ['Christian McCaffrey O95.5 Rush Yds', 'Deebo Samuel O65.5 Rec Yds', 'George Kittle O50.5 Rec Yds'],
    odds: '+510',
    popularity: 82,
    edge: '+6.5%',
    legs: 3
  },
  { 
    id: 4, 
    team: 'Philadelphia Eagles',
    players: ['Jalen Hurts O1.5 Rush TDs', 'AJ Brown O80.5 Rec Yds'],
    odds: '+315',
    popularity: 79,
    edge: '+6.1%',
    legs: 2
  },
];

export default function PopularParlays({ sport }: PopularParlaysProps) {
  const [selectedPosition, setSelectedPosition] = useState<keyof typeof parlaysByPosition>('QB');
  const [filterLegs, setFilterLegs] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Popular Parlays
          </h1>
          <p className="text-slate-400">Trending player prop parlays with edge detection</p>
        </div>
        <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
          <Flame className="w-3 h-3 mr-1" />
          Trending Now
        </Badge>
      </div>

      {/* Quick Stats - Unique Design */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-300" />
          <div className="relative bg-slate-900 rounded-xl p-5 border border-cyan-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-lg ring-2 ring-cyan-500/30">
                <Target className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Total Parlays</div>
            </div>
            <div className="text-4xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-1">156</div>
            <div className="text-xs text-cyan-400/80">Tracked today</div>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-300" />
          <div className="relative bg-slate-900 rounded-xl p-5 border border-blue-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-lg ring-2 ring-blue-500/30">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Avg Popularity</div>
            </div>
            <div className="text-4xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-1">83%</div>
            <div className="text-xs text-blue-400/80">User interest</div>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-300" />
          <div className="relative bg-slate-900 rounded-xl p-5 border border-purple-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-lg ring-2 ring-purple-500/30">
                <TrendingUp className="w-5 h-5 text-purple-400" />
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Best Edge</div>
            </div>
            <div className="text-4xl bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-1">+8.8%</div>
            <div className="text-xs text-purple-400/80">KC stack parlay</div>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-red-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition duration-300" />
          <div className="relative bg-slate-900 rounded-xl p-5 border border-pink-500/30">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-gradient-to-br from-pink-500/20 to-pink-600/10 rounded-lg ring-2 ring-pink-500/30 relative">
                <Flame className="w-5 h-5 text-pink-400" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              </div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Hot Parlays</div>
            </div>
            <div className="text-4xl bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent mb-1">24</div>
            <div className="text-xs text-pink-400/80">Edge &gt; 7%</div>
          </div>
        </div>
      </div>

      {/* Parlay Tabs */}
      <Tabs defaultValue="position" className="w-full">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="position">By Position</TabsTrigger>
          <TabsTrigger value="team">By Team</TabsTrigger>
        </TabsList>

        <TabsContent value="position" className="space-y-4">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/20 p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
              <h3 className="text-white">Position-Based Parlays</h3>
              <div className="flex items-center gap-3">
                <Select value={selectedPosition} onValueChange={(value) => setSelectedPosition(value as keyof typeof parlaysByPosition)}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="QB">QB</SelectItem>
                    <SelectItem value="RB">RB</SelectItem>
                    <SelectItem value="WR">WR</SelectItem>
                    <SelectItem value="TE">TE</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterLegs} onValueChange={setFilterLegs}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Legs</SelectItem>
                    <SelectItem value="2">2-Leg Parlays</SelectItem>
                    <SelectItem value="3">3-Leg Parlays</SelectItem>
                    <SelectItem value="4">4+ Leg Parlays</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-3">
              {parlaysByPosition[selectedPosition]
                .filter(parlay => filterLegs === 'all' || parlay.legs.toString() === filterLegs)
                .map((parlay) => (
                <div key={parlay.id} className="relative group">
                  <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition duration-300" />
                  <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:border-cyan-500/40 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left side - Parlay details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/40 text-xs px-2 py-0.5">
                            {parlay.legs} Legs
                          </Badge>
                          <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/40 text-xs px-2 py-0.5">
                            {parlay.odds}
                          </Badge>
                          <div className="flex items-center gap-1.5 ml-auto">
                            <Users className="w-3 h-3 text-slate-500" />
                            <span className="text-xs text-slate-400">{parlay.popularity}%</span>
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          {parlay.players.map((player, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm group/item">
                              <div className="w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                              <span className="text-slate-300 group-hover/item:text-white transition-colors">{player}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Right side - Edge and actions */}
                      <div className="flex flex-col items-end gap-3 flex-shrink-0">
                        <div className="text-right">
                          <div className="text-xs text-slate-500 mb-0.5">Edge</div>
                          <div className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            {parlay.edge}
                          </div>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs h-8 px-3">
                          <Copy className="w-3 h-3 mr-1.5" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white">Team Stack Parlays</h3>
              <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                {teamParlays.length} Teams
              </Badge>
            </div>

            <div className="grid gap-3">
              {teamParlays.map((parlay) => (
                <div key={parlay.id} className="relative group">
                  <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-sm transition duration-300" />
                  <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 hover:border-cyan-500/40 transition-all">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      {/* Team header */}
                      <div className="flex items-center gap-2 flex-1">
                        <h4 className="text-white">{parlay.team}</h4>
                        <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/40 text-xs px-2 py-0.5">
                          {parlay.legs} Legs
                        </Badge>
                        <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/40 text-xs px-2 py-0.5">
                          {parlay.odds}
                        </Badge>
                      </div>
                      
                      {/* Popularity badge */}
                      <div className="flex items-center gap-1.5 bg-slate-800/50 px-2.5 py-1 rounded-md">
                        <Users className="w-3 h-3 text-pink-400" />
                        <span className="text-xs text-pink-400">{parlay.popularity}%</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start justify-between gap-4">
                      {/* Players list */}
                      <div className="flex-1 space-y-1.5">
                        {parlay.players.map((player, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm group/item">
                            <div className="w-1 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                            <span className="text-slate-300 group-hover/item:text-white transition-colors">{player}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Edge and action */}
                      <div className="flex flex-col items-end gap-3 flex-shrink-0">
                        <div className="text-right">
                          <div className="text-xs text-slate-500 mb-0.5">Edge</div>
                          <div className="text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            {parlay.edge}
                          </div>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-xs h-8 px-3">
                          <Copy className="w-3 h-3 mr-1.5" />
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
