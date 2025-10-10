import { Card } from './ui/card';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TrendingUp, Filter, Download, Activity, Star, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from './ui/chart';

interface PropBetFinderProps {
  sport: string;
}

const mockPropBets = [
  { 
    id: 1, 
    player: 'Patrick Mahomes', 
    team: 'KC',
    opponent: '@LAC',
    prop: 'Passing Yards', 
    line: 287.5, 
    odds: '-110', 
    projection: 312.4,
    confidence: 95,
    edge: 8.2,
    hitRate: 68,
    trend: 'up'
  },
  { 
    id: 2, 
    player: 'Christian McCaffrey', 
    team: 'SF',
    opponent: '@DAL',
    prop: 'Rushing Yards', 
    line: 95.5, 
    odds: '-115', 
    projection: 108.3,
    confidence: 92,
    edge: 6.7,
    hitRate: 72,
    trend: 'up'
  },
  { 
    id: 3, 
    player: 'Tyreek Hill', 
    team: 'MIA',
    opponent: '@BUF',
    prop: 'Receiving Yards', 
    line: 82.5, 
    odds: '+105', 
    projection: 94.1,
    confidence: 85,
    edge: 5.3,
    hitRate: 64,
    trend: 'up'
  },
  { 
    id: 4, 
    player: 'Josh Allen', 
    team: 'BUF',
    opponent: 'vs MIA',
    prop: 'Passing TDs', 
    line: 2.5, 
    odds: '-120', 
    projection: 2.9,
    confidence: 82,
    edge: 4.1,
    hitRate: 58,
    trend: 'neutral'
  },
  { 
    id: 5, 
    player: 'Travis Kelce', 
    team: 'KC',
    opponent: '@LAC',
    prop: 'Receptions', 
    line: 5.5, 
    odds: '-105', 
    projection: 6.8,
    confidence: 88,
    edge: 7.5,
    hitRate: 70,
    trend: 'up'
  },
  { 
    id: 6, 
    player: 'Saquon Barkley', 
    team: 'NYG',
    opponent: '@SEA',
    prop: 'Rush + Rec Yards', 
    line: 110.5, 
    odds: '-110', 
    projection: 122.8,
    confidence: 87,
    edge: 6.1,
    hitRate: 66,
    trend: 'up'
  },
];

const edgeDistribution = [
  { range: '0-2%', count: 12 },
  { range: '2-4%', count: 18 },
  { range: '4-6%', count: 24 },
  { range: '6-8%', count: 15 },
  { range: '8%+', count: 8 },
];

const chartConfig = {
  count: {
    label: "Props",
    color: "#06b6d4",
  },
} satisfies ChartConfig;

export default function PropBetFinder({ sport }: PropBetFinderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Prop Bet Analyzer
          </h1>
          <p className="text-slate-400">AI-powered player prop analysis with real-time edge detection</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
            <Activity className="w-3 h-3 mr-1" />
            {mockPropBets.length} Props Analyzed
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/20 p-6 relative overflow-hidden group hover:border-cyan-400/40 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">High Value Props</span>
              <div className="p-2 bg-cyan-500/10 rounded-lg">
                <Star className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div className="text-white text-3xl">24</div>
            <p className="text-cyan-400 text-sm mt-2">Edge &gt; 5%</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-blue-500/20 p-6 relative overflow-hidden group hover:border-blue-400/40 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Avg Edge Found</span>
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div className="text-white text-3xl">+6.2%</div>
            <p className="text-blue-400 text-sm mt-2">vs market lines</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-purple-500/20 p-6 relative overflow-hidden group hover:border-purple-400/40 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Model Accuracy</span>
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="text-white text-3xl">68%</div>
            <p className="text-purple-400 text-sm mt-2">Last 30 days</p>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-pink-500/20 p-6 relative overflow-hidden group hover:border-pink-400/40 transition-all">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400">Sharp Plays</span>
              <div className="p-2 bg-pink-500/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-pink-400" />
              </div>
            </div>
            <div className="text-white text-3xl">12</div>
            <p className="text-pink-400 text-sm mt-2">Confidence &gt; 90%</p>
          </div>
        </Card>
      </div>

      {/* Edge Distribution Chart */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/20 p-6">
        <h3 className="text-white mb-6">Edge Distribution</h3>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={edgeDistribution}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="range" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
          </BarChart>
        </ChartContainer>
      </Card>

      {/* Filters and Table */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/20 p-6">
        <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <h3 className="text-white">Player Props Analysis</h3>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Select defaultValue="all">
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Props</SelectItem>
                <SelectItem value="passing">Passing</SelectItem>
                <SelectItem value="rushing">Rushing</SelectItem>
                <SelectItem value="receiving">Receiving</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="high">
              <SelectTrigger className="bg-slate-800 border-slate-700 text-white w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High Edge First</SelectItem>
                <SelectItem value="confidence">By Confidence</SelectItem>
                <SelectItem value="hitrate">By Hit Rate</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Player</TableHead>
                <TableHead className="text-slate-300">Matchup</TableHead>
                <TableHead className="text-slate-300">Prop Type</TableHead>
                <TableHead className="text-slate-300">Line</TableHead>
                <TableHead className="text-slate-300">Projection</TableHead>
                <TableHead className="text-slate-300">Edge</TableHead>
                <TableHead className="text-slate-300">Confidence</TableHead>
                <TableHead className="text-slate-300">Hit Rate</TableHead>
                <TableHead className="text-slate-300">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPropBets.map((bet) => (
                <TableRow key={bet.id} className="border-slate-700 hover:bg-slate-800/50 cursor-pointer transition-colors">
                  <TableCell>
                    <div>
                      <div className="text-white mb-1">{bet.player}</div>
                      <Badge variant="outline" className="border-slate-600 text-slate-400 text-xs">
                        {bet.team}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-400">{bet.opponent}</TableCell>
                  <TableCell className="text-slate-300">{bet.prop}</TableCell>
                  <TableCell className="text-slate-300">O {bet.line}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">{bet.projection}</span>
                      <span className="text-slate-500 text-xs">({bet.odds})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-cyan-400" />
                      <span className="text-cyan-400">+{bet.edge}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-700 rounded-full h-2 w-20">
                        <div 
                          className={`h-2 rounded-full ${
                            bet.confidence >= 90 ? 'bg-gradient-to-r from-cyan-500 to-blue-600' :
                            bet.confidence >= 80 ? 'bg-gradient-to-r from-blue-500 to-purple-600' :
                            'bg-gradient-to-r from-purple-500 to-pink-600'
                          }`}
                          style={{ width: `${bet.confidence}%` }}
                        />
                      </div>
                      <span className="text-slate-400 text-sm w-8">{bet.confidence}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`${
                        bet.hitRate >= 70 ? 'border-cyan-500/30 text-cyan-400' :
                        bet.hitRate >= 60 ? 'border-blue-500/30 text-blue-400' :
                        'border-yellow-500/30 text-yellow-400'
                      }`}
                    >
                      {bet.hitRate}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded ${
                      bet.trend === 'up' ? 'bg-cyan-500/10 text-cyan-400' :
                      bet.trend === 'down' ? 'bg-red-500/10 text-red-400' :
                      'bg-slate-700/50 text-slate-400'
                    }`}>
                      <TrendingUp className={`w-3 h-3 ${bet.trend === 'down' ? 'rotate-180' : ''}`} />
                      <span className="text-xs">{bet.trend === 'up' ? 'Hot' : bet.trend === 'down' ? 'Cold' : 'Neutral'}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Analysis Insights */}
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-cyan-500/20 p-6">
        <h3 className="text-white mb-6">AI Insights & Alerts</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-cyan-500/5 border border-cyan-500/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
              <div>
                <h4 className="text-cyan-400 mb-2">Weather Alert</h4>
                <p className="text-slate-300 text-sm">
                  High winds expected in Buffalo (20+ mph). Consider under bets for passing props.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-blue-400 mt-0.5" />
              <div>
                <h4 className="text-blue-400 mb-2">Injury Updates</h4>
                <p className="text-slate-300 text-sm">
                  WR1 out for Miami - increased target share for Tyreek Hill. Line value detected.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-purple-500/5 border border-purple-500/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-purple-400 mt-0.5" />
              <div>
                <h4 className="text-purple-400 mb-2">Matchup Advantage</h4>
                <p className="text-slate-300 text-sm">
                  SF running backs averaging 135+ yards vs DAL defense. Strong rushing prop value.
                </p>
              </div>
            </div>
          </div>
          <div className="bg-pink-500/5 border border-pink-500/20 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-pink-400 mt-0.5" />
              <div>
                <h4 className="text-pink-400 mb-2">Line Movement</h4>
                <p className="text-slate-300 text-sm">
                  Mahomes passing yards line moved from 275.5 to 287.5. Sharp money on over.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
