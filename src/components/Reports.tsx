import React, { useState, useEffect } from 'react';
import { 
  BarChart, PieChart, LineChart, ArrowUpRight, Download, Filter, Calendar, 
  RefreshCw, Search, ChevronDown, Settings, AlertTriangle, TrendingUp, TrendingDown, 
  HelpCircle, DownloadCloud, Share2, CircleSlash, Copy, ExternalLink,
  Wallet, CheckSquare, Users, Database, ClipboardCheck, ArrowUp, ArrowDown,
  CloudLightning, Clock, Zap, Code, FileText, PlusCircle
} from 'lucide-react';

// Sample data for reports
const monthlyUsageData = [
  { month: 'Jan', requests: 125000, cost: 1250 },
  { month: 'Feb', requests: 142000, cost: 1420 },
  { month: 'Mar', requests: 158000, cost: 1580 },
  { month: 'Apr', requests: 189000, cost: 1890 },
  { month: 'May', requests: 210000, cost: 2100 },
  { month: 'Jun', requests: 252000, cost: 2520 },
  { month: 'Jul', requests: 265000, cost: 2650 },
  { month: 'Aug', requests: 287000, cost: 2870 },
  { month: 'Sep', requests: 302000, cost: 3020 },
  { month: 'Oct', requests: 334000, cost: 3340 },
  { month: 'Nov', requests: 348000, cost: 3480 },
  { month: 'Dec', requests: 370000, cost: 3700 }
];

const dataSources = [
  { 
    id: 1, 
    name: "Financial Market Data",
    provider: "Bloomberg Enterprise",
    usage: 34.5,
    trend: "up",
    cost: "$1,200.50",
    lastAccessed: "2 hours ago",
    quality: 96,
    integrations: ["QuickSight", "SageMaker"],
    storageUsed: "2.3 TB",
    usage_trend: [120, 135, 140, 170, 190, 210, 220]
  },
  { 
    id: 2, 
    name: "Healthcare Analytics Bundle",
    provider: "HealthData Inc.",
    usage: 22.8,
    trend: "up",
    cost: "$750.00",
    lastAccessed: "1 day ago",
    quality: 92,
    integrations: ["SageMaker", "HealthLake"],
    storageUsed: "1.8 TB",
    usage_trend: [90, 95, 110, 115, 140, 155, 160]
  },
  { 
    id: 3, 
    name: "Consumer Behavior Dataset",
    provider: "Retail Analytics Co.",
    usage: 18.2,
    trend: "down",
    cost: "$500.00",
    lastAccessed: "3 days ago",
    quality: 88,
    integrations: ["Personalize", "QuickSight"],
    storageUsed: "1.2 TB",
    usage_trend: [160, 155, 150, 140, 130, 120, 110]
  },
  { 
    id: 4, 
    name: "Geospatial Data Feed",
    provider: "Mapify Technologies",
    usage: 15.3,
    trend: "up",
    cost: "$950.00",
    lastAccessed: "5 hours ago",
    quality: 94,
    integrations: ["Location Service", "QuickSight"],
    storageUsed: "2.7 TB",
    usage_trend: [80, 90, 110, 120, 140, 160, 185]
  },
  { 
    id: 5, 
    name: "ESG & Sustainability Metrics",
    provider: "GreenData Global",
    usage: 9.2,
    trend: "up",
    cost: "$600.00",
    lastAccessed: "2 days ago",
    quality: 89,
    integrations: ["QuickSight", "Athena"],
    storageUsed: "0.8 TB",
    usage_trend: [50, 55, 60, 70, 80, 85, 95]
  }
];

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'usage' | 'cost' | 'quality' | 'performance'>('overview');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '12m'>('30d');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDataSource, setSelectedDataSource] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [showCostForecast, setShowCostForecast] = useState(false);
  const [scheduledReports, setScheduledReports] = useState([
    { id: 1, name: 'Weekly Usage Summary', schedule: 'Every Monday', recipients: 'team@example.com', format: 'PDF' },
    { id: 2, name: 'Monthly Cost Analysis', schedule: 'First of month', recipients: 'finance@example.com', format: 'Excel' }
  ]);
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  
  const filteredDataSources = dataSources.filter(source =>
    searchQuery === '' ||
    source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Calculate totals
  const totalCost = dataSources.reduce((sum, source) => 
    sum + parseFloat(source.cost.replace(/[^0-9.]/g, '')), 0
  );
  
  const totalStorage = dataSources.reduce((sum, source) => 
    sum + parseFloat(source.storageUsed.replace(/[^0-9.]/g, '')), 0
  );
  
  const avgQuality = Math.round(
    dataSources.reduce((sum, source) => sum + source.quality, 0) / dataSources.length
  );
  
  const handleGenerateReport = () => {
    setIsGeneratingReport(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      // Simulate download in a real application
      alert('Report generated and downloaded.');
    }, 2500);
  };

  const renderOverviewTab = () => {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Datasets</p>
                <p className="text-2xl font-bold text-gray-900">{dataSources.length}</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+2 from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Database className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Cost</p>
                <p className="text-2xl font-bold text-gray-900">${totalCost.toLocaleString()}</p>
                <div className="flex items-center mt-1 text-xs text-red-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+12.5% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Storage Used</p>
                <p className="text-2xl font-bold text-gray-900">{totalStorage.toFixed(1)} TB</p>
                <div className="flex items-center mt-1 text-xs text-yellow-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+0.3 TB from last week</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DownloadCloud className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Data Quality</p>
                <p className="text-2xl font-bold text-gray-900">{avgQuality}%</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+2% improvement</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Monthly Usage Trend</h3>
              <div className="flex items-center space-x-2">
                <button className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                  Requests
                </button>
                <button className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200">
                  Cost
                </button>
              </div>
            </div>
            
            <div className="h-64 relative">
              {/* Placeholder for chart - in a real app, use a charting library */}
              <svg className="w-full h-full" viewBox="0 0 800 250">
                <g>
                  {/* X-axis */}
                  <line x1="50" y1="220" x2="750" y2="220" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Y-axis */}
                  <line x1="50" y1="20" x2="50" y2="220" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* X-axis labels */}
                  {monthlyUsageData.map((data, index) => {
                    const x = 50 + (index * (700 / (monthlyUsageData.length - 1)));
                    return (
                      <text 
                        key={index} 
                        x={x} 
                        y="240" 
                        textAnchor="middle" 
                        fontSize="10" 
                        fill="#6b7280"
                      >
                        {data.month}
                      </text>
                    );
                  })}
                  
                  {/* Y-axis labels */}
                  {[0, 100000, 200000, 300000, 400000].map((value, index) => {
                    const y = 220 - (index * (200 / 4));
                    return (
                      <text 
                        key={index} 
                        x="40" 
                        y={y} 
                        textAnchor="end" 
                        fontSize="10" 
                        fill="#6b7280"
                      >
                        {value.toLocaleString()}
                      </text>
                    );
                  })}
                  
                  {/* Data points and line */}
                  <polyline 
                    points={monthlyUsageData.map((data, index) => {
                      const x = 50 + (index * (700 / (monthlyUsageData.length - 1)));
                      const y = 220 - ((data.requests / 400000) * 200);
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="2"
                  />
                  
                  {/* Data points */}
                  {monthlyUsageData.map((data, index) => {
                    const x = 50 + (index * (700 / (monthlyUsageData.length - 1)));
                    const y = 220 - ((data.requests / 400000) * 200);
                    return (
                      <g key={index}>
                        <circle cx={x} cy={y} r="4" fill="#4f46e5" />
                        <circle cx={x} cy={y} r="8" fill="#4f46e5" fillOpacity="0.2" />
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Usage by Dataset</h3>
              <button className="p-1 text-gray-400 hover:text-gray-600">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              {/* Placeholder for pie chart */}
              <svg className="w-full h-full" viewBox="0 0 200 200">
                <g transform="translate(100, 100)">
                  {/* Circle segments - in a real app, calculate and render proper segments */}
                  {dataSources.map((source, index) => {
                    const angle = (source.usage / 100) * 360;
                    const startAngle = index === 0 ? 0 : dataSources.slice(0, index).reduce((sum, s) => sum + (s.usage / 100) * 360, 0);
                    const endAngle = startAngle + angle;
                    
                    const startRadians = (startAngle * Math.PI) / 180;
                    const endRadians = (endAngle * Math.PI) / 180;
                    
                    const x1 = Math.sin(startRadians) * 80;
                    const y1 = -Math.cos(startRadians) * 80;
                    const x2 = Math.sin(endRadians) * 80;
                    const y2 = -Math.cos(endRadians) * 80;
                    
                    const largeArcFlag = angle > 180 ? 1 : 0;
                    
                    const colors = [
                      '#4f46e5', '#10b981', '#f59e0b', '#6366f1', '#ec4899'
                    ];
                    
                    return (
                      <path 
                        key={index} 
                        d={`M 0 0 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`} 
                        fill={colors[index % colors.length]} 
                      />
                    );
                  })}
                </g>
              </svg>
            </div>
            
            <div className="space-y-2 mt-2">
              {dataSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ 
                      backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#6366f1', '#ec4899'][index % 5] 
                    }}></div>
                    <span className="text-xs text-gray-700 truncate max-w-[200px]">{source.name}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-900">{source.usage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Data Sources</h3>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search sources..."
                  className="pl-10 pr-4 py-1.5 w-64 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
                    <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Last Accessed</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDataSources.map((source, index) => (
                    <tr 
                      key={index} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedDataSource(source)}
                    >
                      <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {source.name}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                        {source.provider}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-1 h-1.5 bg-gray-200 rounded-full max-w-[100px] mr-2">
                            <div 
                              className="h-1.5 bg-indigo-600 rounded-full" 
                              style={{ width: `${source.usage}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-700">{source.usage}%</span>
                            {source.trend === 'up' ? (
                              <ArrowUp className="w-3 h-3 text-green-500 ml-1" />
                            ) : (
                              <ArrowDown className="w-3 h-3 text-red-500 ml-1" />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                        {source.cost}
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`px-2 py-1 text-xs rounded-full ${
                            source.quality >= 90 ? 'bg-green-100 text-green-800' :
                            source.quality >= 80 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {source.quality}%
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                        {source.lastAccessed}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Recent Activity</h3>
              <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <CloudLightning className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">New Dataset Connected</p>
                  <p className="text-xs text-gray-500">Financial Market Data was connected to QuickSight</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <BarChart className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Usage Spike Detected</p>
                  <p className="text-xs text-gray-500">Healthcare Analytics Bundle had 300% more queries than usual</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Cost Alert</p>
                  <p className="text-xs text-gray-500">Monthly budget 85% utilized with 10 days remaining</p>
                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">Refresh Schedule Updated</p>
                  <p className="text-xs text-gray-500">Consumer Behavior Dataset now refreshes daily</p>
                  <p className="text-xs text-gray-400 mt-1">3 days ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-900">New Team Member</p>
                  <p className="text-xs text-gray-500">John Doe was granted access to 3 datasets</p>
                  <p className="text-xs text-gray-400 mt-1">5 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Scheduled Reports</h3>
            <button className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
              <PlusCircle className="w-4 h-4 mr-1" />
              New Schedule
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {scheduledReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {report.name}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                      {report.schedule}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                      {report.recipients}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                      {report.format}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-right">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                      <button className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Generate Custom Report</h3>
              <p className="text-white/80 mb-4">
                Create a comprehensive report with custom metrics, date ranges, and visualizations.
                Export in multiple formats or schedule for regular delivery.
              </p>
              <div className="flex space-x-3">
                <button 
                  className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-indigo-50 flex items-center"
                  onClick={handleGenerateReport}
                  disabled={isGeneratingReport}
                >
                  {isGeneratingReport ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <BarChart className="w-4 h-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </button>
                <button className="bg-indigo-800/30 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-indigo-800/50 flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </button>
              </div>
            </div>
            <img 
              src="/images/aws-reports-icon.png" 
              alt="AWS Reports" 
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>
      </div>
    );
  };
  
  const renderUsageTab = () => {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Total API Calls</p>
                <p className="text-2xl font-bold text-gray-900">3.2M</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Data Transferred</p>
                <p className="text-2xl font-bold text-gray-900">542 GB</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+8% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <DownloadCloud className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">AWS Service Integrations</p>
                <p className="text-2xl font-bold text-gray-900">7</p>
                <div className="flex items-center mt-1 text-xs text-yellow-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+1 from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <CloudLightning className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+5 from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Usage Patterns by Dataset</h3>
            <div className="flex items-center space-x-2">
              <select className="text-sm border border-gray-200 rounded-md p-1.5">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dataset</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">API Calls</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Transferred</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peak Usage Time</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage Trend</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataSources.map((source, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{source.name}</div>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                      {Math.floor(Math.random() * 500 + 100)}K
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                      {Math.floor(Math.random() * 100 + 10)} GB
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                      {['9-11 AM', '1-3 PM', '3-5 PM', '6-8 PM', '10-12 PM'][index % 5]}
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        {/* Mini sparkline chart */}
                        <svg className="w-24 h-12" viewBox="0 0 100 30">
                          <path 
                            d={`M 0,${30 - source.usage_trend[0] / 10} ${source.usage_trend.map((value, i) => `L ${i * (100 / (source.usage_trend.length - 1))},${30 - value / 10}`).join(' ')}`} 
                            fill="none" 
                            stroke={source.trend === 'up' ? '#10b981' : '#ef4444'} 
                            strokeWidth="2" 
                          />
                        </svg>
                        
                        {source.trend === 'up' ? (
                          <ArrowUp className="w-4 h-4 text-green-500 ml-2" />
                        ) : (
                          <ArrowDown className="w-4 h-4 text-red-500 ml-2" />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Usage by AWS Service</h3>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md">
                <Download className="w-4 h-4" />
              </button>
            </div>
            
            <div className="h-64">
              {/* Horizontal bar chart placeholder */}
              <svg className="w-full h-full" viewBox="0 0 400 250">
                {['SageMaker', 'QuickSight', 'Athena', 'Glue', 'Redshift', 'Lambda', 'S3'].map((service, index) => {
                  const value = 85 - (index * 10);
                  return (
                    <g key={index} transform={`translate(0, ${index * 35 + 10})`}>
                      <text x="0" y="15" fontSize="12" fill="#6b7280">{service}</text>
                      <rect 
                        x="100" 
                        y="5" 
                        width={value * 3} 
                        height="20" 
                        fill={['#4f46e5', '#10b981', '#f59e0b', '#6366f1', '#ec4899', '#0ea5e9', '#8b5cf6'][index % 7]} 
                        rx="2"
                      />
                      <text x={value * 3 + 110} y="18" fontSize="12" fill="#6b7280">{value}%</text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Top Queries & Endpoints</h3>
              <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-800 flex items-center">
                      <Code className="w-4 h-4 text-indigo-500 mr-2" />
                      GET /api/financial-data/stocks
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Financial Market Data</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">245K calls</div>
                    <div className="text-xs text-gray-500 mt-1">+18% from last week</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-800 flex items-center">
                      <Code className="w-4 h-4 text-indigo-500 mr-2" />
                      GET /api/consumer/behavior-patterns
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Consumer Behavior Dataset</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">182K calls</div>
                    <div className="text-xs text-gray-500 mt-1">+5% from last week</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-800 flex items-center">
                      <Code className="w-4 h-4 text-indigo-500 mr-2" />
                      GET /api/healthcare/clinical-outcomes
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Healthcare Analytics Bundle</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">156K calls</div>
                    <div className="text-xs text-gray-500 mt-1">+22% from last week</div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-800 flex items-center">
                      <Code className="w-4 h-4 text-indigo-500 mr-2" />
                      GET /api/geo/points-of-interest
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Geospatial Data Feed</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-800">121K calls</div>
                    <div className="text-xs text-gray-500 mt-1">+15% from last week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-700 to-indigo-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-start">
            <div className="mr-8">
              <h3 className="text-xl font-bold mb-2">Usage Analysis & Optimization</h3>
              <p className="text-white/80 mb-4">
                Our AI has analyzed your usage patterns and found potential optimizations that could save up to 15% on your monthly costs.
              </p>
              <div className="flex space-x-3">
                <button className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-indigo-50">
                  View Recommendations
                </button>
                <button className="bg-indigo-800/30 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-indigo-800/50">
                  Schedule Review
                </button>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 flex-1">
              <h4 className="text-sm font-medium text-white mb-3">Top 3 Optimizations</h4>
              <div className="space-y-2">
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Implement caching for frequent queries</span>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Optimize data transfer with compression</span>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Consolidate similar API calls</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderCostTab = () => {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Current Month Cost</p>
                <p className="text-2xl font-bold text-gray-900">${totalCost.toLocaleString()}</p>
                <div className="flex items-center mt-1 text-xs text-red-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+12.5% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Monthly Budget</p>
                <p className="text-2xl font-bold text-gray-900">$5,000.00</p>
                <div className="flex items-center mt-1 text-xs text-yellow-600">
                  <span>85% utilized</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <BarChart className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">YTD Spending</p>
                <p className="text-2xl font-bold text-gray-900">$32,450.75</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  <span>-3.2% vs last year</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <LineChart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Cost per GB</p>
                <p className="text-2xl font-bold text-gray-900">$0.12</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  <span>-8% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DownloadCloud className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Monthly Cost Trend</h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-xs bg-indigo-50 text-indigo-700 rounded">
                  Per Dataset
                </button>
                <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                  By Service
                </button>
              </div>
            </div>
            
            <div className="h-64 relative">
              {/* Placeholder for chart - in a real app, use a charting library */}
              <svg className="w-full h-full" viewBox="0 0 800 250">
                <g>
                  {/* X-axis */}
                  <line x1="50" y1="220" x2="750" y2="220" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Y-axis */}
                  <line x1="50" y1="20" x2="50" y2="220" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* X-axis labels */}
                  {monthlyUsageData.map((data, index) => {
                    const x = 50 + (index * (700 / (monthlyUsageData.length - 1)));
                    return (
                      <text 
                        key={index} 
                        x={x} 
                        y="240" 
                        textAnchor="middle" 
                        fontSize="10" 
                        fill="#6b7280"
                      >
                        {data.month}
                      </text>
                    );
                  })}
                  
                  {/* Y-axis labels */}
                  {[0, 1000, 2000, 3000, 4000].map((value, index) => {
                    const y = 220 - (index * (200 / 4));
                    return (
                      <text 
                        key={index} 
                        x="40" 
                        y={y} 
                        textAnchor="end" 
                        fontSize="10" 
                        fill="#6b7280"
                      >
                        ${value}
                      </text>
                    );
                  })}
                  
                  {/* Data points and line */}
                  <polyline 
                    points={monthlyUsageData.map((data, index) => {
                      const x = 50 + (index * (700 / (monthlyUsageData.length - 1)));
                      const y = 220 - ((data.cost / 4000) * 200);
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                  />
                  
                  {/* Data points */}
                  {monthlyUsageData.map((data, index) => {
                    const x = 50 + (index * (700 / (monthlyUsageData.length - 1)));
                    const y = 220 - ((data.cost / 4000) * 200);
                    return (
                      <g key={index}>
                        <circle cx={x} cy={y} r="4" fill="#ef4444" />
                        <circle cx={x} cy={y} r="8" fill="#ef4444" fillOpacity="0.2" />
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Cost Breakdown</h3>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md">
                <Download className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {dataSources.map((source, index) => {
                const cost = parseFloat(source.cost.replace(/[^0-9.]/g, ''));
                const percentage = (cost / totalCost * 100).toFixed(1);
                
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-800">{source.name}</div>
                      <div className="text-sm font-medium text-gray-800">{source.cost}</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: ['#4f46e5', '#10b981', '#f59e0b', '#6366f1', '#ec4899'][index % 5]
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div>{source.provider}</div>
                      <div>{percentage}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-700">Total Cost</div>
                <div className="text-lg font-bold text-gray-900">${totalCost.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Cost by AWS Service</h3>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md">
                <Filter className="w-4 h-4" />
              </button>
            </div>
            
            <div className="h-64">
              {/* Donut chart placeholder */}
              <svg className="w-full h-full" viewBox="0 0 400 250">
                <g transform="translate(120, 125)">
                  {/* Circle segments for the donut chart */}
                  <circle cx="0" cy="0" r="60" fill="white" />
                  <path d="M 0 -80 A 80 80 0 0 1 69.28 -40 L 52.2 -30 A 60 60 0 0 0 0 -60 Z" fill="#4f46e5" />
                  <path d="M 69.28 -40 A 80 80 0 0 1 69.28 40 L 52.2 30 A 60 60 0 0 0 52.2 -30 Z" fill="#10b981" />
                  <path d="M 69.28 40 A 80 80 0 0 1 0 80 L 0 60 A 60 60 0 0 0 52.2 30 Z" fill="#f59e0b" />
                  <path d="M 0 80 A 80 80 0 0 1 -69.28 40 L -52.2 30 A 60 60 0 0 0 0 60 Z" fill="#ec4899" />
                  <path d="M -69.28 40 A 80 80 0 0 1 -69.28 -40 L -52.2 -30 A 60 60 0 0 0 -52.2 30 Z" fill="#0ea5e9" />
                  <path d="M -69.28 -40 A 80 80 0 0 1 0 -80 L 0 -60 A 60 60 0 0 0 -52.2 -30 Z" fill="#8b5cf6" />
                </g>
                
                <g transform="translate(250, 125)">
                  <text x="0" y="-60" fontSize="12" textAnchor="start" fill="#4f46e5">SageMaker: $1,200 (28%)</text>
                  <text x="0" y="-40" fontSize="12" textAnchor="start" fill="#10b981">QuickSight: $850 (20%)</text>
                  <text x="0" y="-20" fontSize="12" textAnchor="start" fill="#f59e0b">Athena: $750 (18%)</text>
                  <text x="0" y="0" fontSize="12" textAnchor="start" fill="#ec4899">S3: $550 (13%)</text>
                  <text x="0" y="20" fontSize="12" textAnchor="start" fill="#0ea5e9">Glue: $450 (11%)</text>
                  <text x="0" y="40" fontSize="12" textAnchor="start" fill="#8b5cf6">Others: $420 (10%)</text>
                </g>
              </svg>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Cost Forecast</h3>
              <button 
                className="flex items-center text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                onClick={() => setShowCostForecast(!showCostForecast)}
              >
                {showCostForecast ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm text-gray-600">Current Month Projection</div>
                <div className="text-sm font-medium text-gray-900">$4,850</div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '97%' }}></div>
              </div>
              <div className="flex justify-between items-center text-xs mt-1">
                <div className="text-gray-500">Budget: $5,000</div>
                <div className="text-yellow-600">97% of budget</div>
              </div>
            </div>
            
            {showCostForecast && (
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-800">Current Trend</div>
                    <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                      +12.5% Monthly
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">
                    If current trend continues, projected annual cost will be <span className="font-medium">$58,200</span>, 
                    which is <span className="text-red-600">$8,200 over budget</span>.
                  </p>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-800">Top Cost Drivers</div>
                    <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      Last 30 Days
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <div className="text-gray-600">Financial Market Data</div>
                      <div className="text-red-600">↑ 18%</div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <div className="text-gray-600">Healthcare Analytics Bundle</div>
                      <div className="text-red-600">↑ 12%</div>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <div className="text-gray-600">SageMaker Usage</div>
                      <div className="text-red-600">↑ 15%</div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-gray-800">Cost Saving Opportunities</div>
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                      Potential: $820/mo
                    </div>
                  </div>
                  <div className="space-y-2 text-xs text-gray-600">
                    <div className="flex items-start">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 mr-1.5" />
                      <span>Implement API call batching to reduce request volume</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 mr-1.5" />
                      <span>Convert to annual subscription for Financial Market Data</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 mr-1.5" />
                      <span>Optimize SageMaker instance usage during off-hours</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Cost Allocation Tags</h3>
            <button className="flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
              <PlusCircle className="w-4 h-4 mr-1" />
              Add Tag
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tag Key</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Values</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resources</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost Allocation</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Department</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-1">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Finance</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">Marketing</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Operations</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">100%</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">25</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">Yes</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Project</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-1">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Market Analysis</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">Customer 360</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">+3 more</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">85%</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">18</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">Yes</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Environment</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-1">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Production</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">Staging</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Development</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">100%</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">25</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">Yes</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Owner</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-1">
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">Data Science</span>
                      <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">Engineering</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">Analytics</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">92%</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">22</td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="mr-6">
              <h3 className="text-xl font-bold mb-2">Cost Optimization Workshop</h3>
              <p className="text-white/80 mb-4">
                Our AWS Cost Optimization experts can help you identify savings opportunities and implement best practices 
                for your data marketplace usage. Schedule a 1-hour workshop to get started.
              </p>
              <button className="bg-white text-green-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-green-50">
                Schedule Workshop
              </button>
            </div>
            <div className="bg-white/10 rounded-lg p-4 flex-1 max-w-sm">
              <h4 className="text-sm font-medium text-white mb-3">Typical Outcomes</h4>
              <div className="space-y-2">
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>15-20% cost reduction</span>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Improved resource utilization</span>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Automated cost controls</span>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Better cost allocation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderQualityTab = () => {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Data Quality</p>
                <p className="text-2xl font-bold text-gray-900">{avgQuality}%</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+2% improvement</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckSquare className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Schema Stability</p>
                <p className="text-2xl font-bold text-gray-900">99.8%</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+0.3% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Completeness Score</p>
                <p className="text-2xl font-bold text-gray-900">94.2%</p>
                <div className="flex items-center mt-1 text-xs text-yellow-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  <span>-0.8% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <ClipboardCheck className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Schema Drift Issues</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
                <div className="flex items-center mt-1 text-xs text-red-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+2 from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Data Quality by Source</h3>
            <div className="flex items-center space-x-2">
              <select className="text-sm border border-gray-200 rounded-md p-1.5">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dataset</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Quality</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completeness</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Consistency</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timeliness</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issues</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataSources.map((source, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{source.name}</div>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`px-2 py-1 text-xs rounded-full ${
                          source.quality >= 90 ? 'bg-green-100 text-green-800' :
                          source.quality >= 80 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {source.quality}%
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mr-2">
                          <div 
                            className={`h-1.5 rounded-full ${
                              Math.round(source.quality * 0.9) >= 90 ? 'bg-green-500' :
                              Math.round(source.quality * 0.9) >= 80 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`} 
                            style={{ width: `${Math.round(source.quality * 0.9)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{Math.round(source.quality * 0.9)}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mr-2">
                          <div 
                            className={`h-1.5 rounded-full ${
                              Math.round(source.quality * 1.1) > 100 ? 'bg-green-500' :
                              Math.round(source.quality * 1.1) >= 90 ? 'bg-green-500' :
                              Math.round(source.quality * 1.1) >= 80 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`} 
                            style={{ width: `${Math.min(100, Math.round(source.quality * 1.1))}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{Math.min(100, Math.round(source.quality * 1.1))}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mr-2">
                          <div 
                            className={`h-1.5 rounded-full ${
                              Math.round(source.quality * 0.95) >= 90 ? 'bg-green-500' :
                              Math.round(source.quality * 0.95) >= 80 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`} 
                            style={{ width: `${Math.round(source.quality * 0.95)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">{Math.round(source.quality * 0.95)}%</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                      {Math.round((100 - source.quality) / 10)} issues
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Common Issues</h3>
              <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Schema Drift Detected</p>
                      <p className="text-xs text-gray-500 mt-1">2 fields changed type in Financial Market Data</p>
                    </div>
                  </div>
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                    High
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <button className="text-xs text-indigo-600 hover:text-indigo-800">Fix Issue</button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Missing Values</p>
                      <p className="text-xs text-gray-500 mt-1">12% of records missing 'region' in Consumer Behavior Dataset</p>
                    </div>
                  </div>
                  <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                    Medium
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <button className="text-xs text-indigo-600 hover:text-indigo-800">Fix Issue</button>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Update Delay</p>
                      <p className="text-xs text-gray-500 mt-1">Healthcare Analytics Bundle refreshed 3 hours late</p>
                    </div>
                  </div>
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    Low
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <button className="text-xs text-indigo-600 hover:text-indigo-800">Investigate</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Data Quality Trend</h3>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 text-xs bg-indigo-50 text-indigo-700 rounded">
                  Last 30 Days
                </button>
                <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                  Last 90 Days
                </button>
              </div>
            </div>
            
            <div className="h-64 relative">
              {/* Placeholder for chart - in a real app, use a charting library */}
              <svg className="w-full h-full" viewBox="0 0 800 250">
                <g>
                  {/* X-axis */}
                  <line x1="50" y1="220" x2="750" y2="220" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Y-axis */}
                  <line x1="50" y1="20" x2="50" y2="220" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* X-axis labels - 30 days */}
                  {Array.from({ length: 10 }).map((_, index) => {
                    const x = 50 + (index * (700 / 9));
                    return (
                      <text 
                        key={index} 
                        x={x} 
                        y="240" 
                        textAnchor="middle" 
                        fontSize="10" 
                        fill="#6b7280"
                      >
                        {`${index * 3 + 1}/${new Date().getMonth() + 1}`}
                      </text>
                    );
                  })}
                  
                  {/* Y-axis labels */}
                  {[60, 70, 80, 90, 100].map((value, index) => {
                    const y = 220 - (index * (200 / 4));
                    return (
                      <text 
                        key={index} 
                        x="40" 
                        y={y} 
                        textAnchor="end" 
                        fontSize="10" 
                        fill="#6b7280"
                      >
                        {value}%
                      </text>
                    );
                  })}
                  
                  {/* Data line for overall quality */}
                  <path 
                    d="M50,100 L124,95 L198,105 L272,92 L346,88 L420,94 L494,82 L568,78 L642,74 L716,70" 
                    fill="none" 
                    stroke="#4f46e5" 
                    strokeWidth="2" 
                  />
                  
                  {/* Data line for completeness */}
                  <path 
                    d="M50,110 L124,112 L198,108 L272,102 L346,98 L420,104 L494,100 L568,96 L642,94 L716,92" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="2" 
                    strokeDasharray="4" 
                  />
                  
                  {/* Data line for consistency */}
                  <path 
                    d="M50,90 L124,88 L198,92 L272,82 L346,78 L420,84 L494,76 L568,72 L642,68 L716,64" 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="2" 
                    strokeDasharray="4" 
                  />
                  
                  {/* Legend */}
                  <g transform="translate(600, 40)">
                    <circle cx="10" cy="10" r="4" fill="#4f46e5" />
                    <text x="20" y="14" fontSize="12" fill="#6b7280">Overall</text>
                    
                    <line x1="0" y1="30" x2="20" y2="30" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
                    <text x="25" y="34" fontSize="12" fill="#6b7280">Completeness</text>
                    
                    <line x1="0" y1="50" x2="20" y2="50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4" />
                    <text x="25" y="54" fontSize="12" fill="#6b7280">Consistency</text>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Schema Changes</h3>
              <div className="flex space-x-2">
                <select className="text-xs border border-gray-200 rounded-md p-1">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-800 flex items-center">
                      <FileText className="w-4 h-4 text-indigo-500 mr-2" />
                      Financial Market Data
                    </div>
                    <div className="text-xs text-gray-500 mt-1">2 days ago</div>
                  </div>
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    Field Added
                  </div>
                </div>
                <div className="mt-2 text-xs">
                  <p className="text-gray-600">Added field <span className="font-mono bg-gray-100 px-1 rounded">esg_score</span> of type <span className="font-mono bg-gray-100 px-1 rounded">number</span></p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-800 flex items-center">
                      <FileText className="w-4 h-4 text-indigo-500 mr-2" />
                      Healthcare Analytics Bundle
                    </div>
                    <div className="text-xs text-gray-500 mt-1">5 days ago</div>
                  </div>
                  <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                    Type Changed
                  </div>
                </div>
                <div className="mt-2 text-xs">
                  <p className="text-gray-600">Changed field <span className="font-mono bg-gray-100 px-1 rounded">patient_id</span> from <span className="font-mono bg-gray-100 px-1 rounded">number</span> to <span className="font-mono bg-gray-100 px-1 rounded">string</span></p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm font-medium text-gray-800 flex items-center">
                      <FileText className="w-4 h-4 text-indigo-500 mr-2" />
                      Consumer Behavior Dataset
                    </div>
                    <div className="text-xs text-gray-500 mt-1">1 week ago</div>
                  </div>
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                    Field Removed
                  </div>
                </div>
                <div className="mt-2 text-xs">
                  <p className="text-gray-600">Removed field <span className="font-mono bg-gray-100 px-1 rounded">legacy_id</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Data Quality Monitoring</h3>
              <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Configure</button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <Bell className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Quality Drop Alert</p>
                      <p className="text-xs text-gray-500 mt-1">Alert when data quality drops below 90%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox" name="toggle" id="toggle-1" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer" checked />
                      <label htmlFor="toggle-1" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <Bell className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Schema Change Detection</p>
                      <p className="text-xs text-gray-500 mt-1">Alert when schema changes are detected</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox" name="toggle" id="toggle-2" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer" checked />
                      <label htmlFor="toggle-2" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <Bell className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Data Freshness Monitor</p>
                      <p className="text-xs text-gray-500 mt-1">Alert when data is not updated on schedule</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox" name="toggle" id="toggle-3" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer" checked />
                      <label htmlFor="toggle-3" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <Bell className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Weekly Quality Report</p>
                      <p className="text-xs text-gray-500 mt-1">Send data quality summary every Monday</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input type="checkbox" name="toggle" id="toggle-4" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer" checked />
                      <label htmlFor="toggle-4" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-lg shadow-md p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="mr-8">
              <h3 className="text-xl font-bold mb-2">Auto-healing Data Quality</h3>
              <p className="text-white/80 mb-4">
                Enable our AI-powered data quality auto-healing to automatically detect and fix common quality issues,
                including missing values, inconsistent formats, and schema drifts.
              </p>
              <div className="flex space-x-3">
                <button className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-indigo-50">
                  Enable Auto-healing
                </button>
                <button className="bg-indigo-800/30 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-indigo-800/50">
                  Learn More
                </button>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 flex-1 max-w-sm">
              <h4 className="text-sm font-medium text-white mb-3">Auto-healing Benefits</h4>
              <div className="space-y-2">
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Improves data quality by ~15%</span>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Reduces manual fixes by 85%</span>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Creates detailed audit logs</span>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Customizable healing rules</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderPerformanceTab = () => {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Response Time</p>
                <p className="text-2xl font-bold text-gray-900">124 ms</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  <span>-8ms from last week</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Query Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">99.8%</p>
                <div className="flex items-center mt-1 text-xs text-yellow-600">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  <span>-0.1% from last week</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Peak Requests/Sec</p>
                <p className="text-2xl font-bold text-gray-900">2,845</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+12% from last week</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Cache Hit Ratio</p>
                <p className="text-2xl font-bold text-gray-900">76.4%</p>
                <div className="flex items-center mt-1 text-xs text-green-600">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  <span>+5.2% from last week</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Database className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Response Time by Dataset</h3>
              <div className="flex items-center space-x-2">
                <select className="text-sm border border-gray-200 rounded-md p-1.5">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="h-64 relative">
              {/* Placeholder for chart - in a real app, use a charting library */}
              <svg className="w-full h-full" viewBox="0 0 800 250">
                <g>
                  {/* X-axis */}
                  <line x1="50" y1="220" x2="750" y2="220" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* Y-axis */}
                  <line x1="50" y1="20" x2="50" y2="220" stroke="#e5e7eb" strokeWidth="1" />
                  
                  {/* X-axis labels */}
                  {dataSources.map((source, index) => {
                    const x = 50 + ((index + 1) * (700 / (dataSources.length + 1)));
                    return (
                      <text 
                        key={index} 
                        x={x} 
                        y="240" 
                        textAnchor="middle" 
                        fontSize="10" 
                        fill="#6b7280"
                        transform={`rotate(45, ${x}, 240)`}
                      >
                        {source.name.length > 15 ? source.name.substring(0, 15) + '...' : source.name}
                      </text>
                    );
                  })}
                  
                  {/* Y-axis labels */}
                  {[0, 50, 100, 150, 200].map((value, index) => {
                    const y = 220 - (index * (200 / 4));
                    return (
                      <text 
                        key={index} 
                        x="40" 
                        y={y} 
                        textAnchor="end" 
                        fontSize="10" 
                        fill="#6b7280"
                      >
                        {value} ms
                      </text>
                    );
                  })}
                  
                  {/* Bars for each dataset */}
                  {dataSources.map((source, index) => {
                    const x = 50 + ((index + 1) * (700 / (dataSources.length + 1))) - 30;
                    const responseTime = 100 + Math.random() * 80; // Random value between 100 and 180 ms
                    const barHeight = (responseTime / 200) * 200;
                    
                    return (
                      <g key={index}>
                        <rect 
                          x={x} 
                          y={220 - barHeight} 
                          width="60" 
                          height={barHeight} 
                          fill={
                            responseTime < 120 ? '#10b981' : 
                            responseTime < 150 ? '#f59e0b' : 
                            '#ef4444'
                          } 
                          opacity="0.7" 
                          rx="2"
                        />
                        <text 
                          x={x + 30} 
                          y={220 - barHeight - 5} 
                          textAnchor="middle" 
                          fontSize="10" 
                          fill="#6b7280"
                        >
                          {Math.round(responseTime)} ms
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Error Rates</h3>
              <button className="p-1.5 text-gray-400 hover:text-gray-600 border border-gray-200 rounded-md">
                <Filter className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {dataSources.map((source, index) => {
                const errorRate = 0.1 + Math.random() * 0.5; // Random value between 0.1% and 0.6%
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-800 truncate max-w-[200px]">{source.name}</div>
                      <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        errorRate < 0.2 ? 'bg-green-100 text-green-800' :
                        errorRate < 0.4 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {errorRate.toFixed(2)}%
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full ${
                          errorRate < 0.2 ? 'bg-green-500' :
                          errorRate < 0.4 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} 
                        style={{ width: `${errorRate * 100}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-sm font-medium text-gray-800 mb-2">Most Common Errors</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <div className="text-gray-600">Timeout Errors</div>
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">42%</div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="text-gray-600">Authentication Failures</div>
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">28%</div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="text-gray-600">Rate Limit Exceeded</div>
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">15%</div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <div className="text-gray-600">Other Errors</div>
                  <div className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">15%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Performance by Region</h3>
              <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">View All</button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Response</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error Rate</th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { region: 'us-east-1', name: 'US East (N. Virginia)', response: 95, error: 0.12, usage: 42 },
                    { region: 'us-west-2', name: 'US West (Oregon)', response: 128, error: 0.18, usage: 28 },
                    { region: 'eu-west-1', name: 'EU (Ireland)', response: 142, error: 0.22, usage: 15 },
                    { region: 'ap-southeast-1', name: 'Asia Pacific (Singapore)', response: 187, error: 0.35, usage: 10 },
                    { region: 'ap-northeast-1', name: 'Asia Pacific (Tokyo)', response: 165, error: 0.28, usage: 5 }
                  ].map((region, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{region.name}</div>
                          <div className="text-xs text-gray-500 ml-1">({region.region})</div>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className={`text-sm font-medium ${
                          region.response < 120 ? 'text-green-600' :
                          region.response < 160 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {region.response} ms
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className={`px-2 py-1 text-xs rounded-full inline-flex items-center ${
                          region.error < 0.2 ? 'bg-green-100 text-green-800' :
                          region.error < 0.3 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {region.error.toFixed(2)}%
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{region.usage}%</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Performance Optimizations</h3>
              <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Apply All</button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Enable Multi-Region Caching</p>
                      <p className="text-xs text-gray-500 mt-1">Improves response time by ~35% for global users</p>
                    </div>
                  </div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -45ms
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Database className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Optimize Query Patterns</p>
                      <p className="text-xs text-gray-500 mt-1">Batch similar queries to reduce API calls</p>
                    </div>
                  </div>
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -28ms
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <Code className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Implement Connection Pooling</p>
                      <p className="text-xs text-gray-500 mt-1">Reuse connections to reduce overhead</p>
                    </div>
                  </div>
                  <div className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -15ms
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <Filter className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Enable Response Compression</p>
                      <p className="text-xs text-gray-500 mt-1">Reduce data transfer size by up to 70%</p>
                    </div>
                  </div>
                  <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                    Bandwidth -65%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Top Slow Queries</h3>
            <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Export</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Query</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dataset</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Time</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Call Count</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">GET /api/financial-data/historical/12m</div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    Financial Market Data
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-red-600 font-medium">
                    845 ms
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    1,245
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full inline-flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Needs Optimization
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">GET /api/healthcare/analytics/patients</div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    Healthcare Analytics Bundle
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-yellow-600 font-medium">
                    467 ms
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    2,876
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full inline-flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Suboptimal
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">GET /api/consumer/segmentation</div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    Consumer Behavior Dataset
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-yellow-600 font-medium">
                    356 ms
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    1,932
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full inline-flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Cache Miss
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="text-sm font-mono text-gray-900">GET /api/geo/heatmap/density</div>
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    Geospatial Data Feed
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-yellow-600 font-medium">
                    312 ms
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500">
                    3,452
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <div className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full inline-flex items-center">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      High Compute
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-[#232F3E] to-[#00A1C9] rounded-lg shadow-md p-6 text-white">
          <div className="flex items-start">
            <div className="mr-8">
              <h3 className="text-xl font-bold mb-2">AWS Performance Advisor</h3>
              <p className="text-white/80 mb-4">
                Our performance analysis detected potential improvements that could reduce your API response times by up to 40% 
                and reduce infrastructure costs. Schedule a 30-minute session with an AWS performance engineer.
              </p>
              <div className="flex space-x-3">
                <button className="bg-white text-[#232F3E] px-4 py-2 rounded-md font-medium text-sm hover:bg-gray-100">
                  Schedule Consultation
                </button>
                <button className="bg-[#232F3E]/30 text-white px-4 py-2 rounded-md font-medium text-sm hover:bg-[#232F3E]/50 border border-white/20">
                  View Recommendations
                </button>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 flex-1 max-w-sm">
              <h4 className="text-sm font-medium text-white mb-3">Key Areas for Improvement</h4>
              <div className="space-y-2">
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Query optimization patterns</span>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Multi-region deployment</span>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Global caching strategy</span>
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-300" />
                  <span>Connection pooling implementation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Define a Bell component since it's not in lucide-react but used in the code
  const Bell = (props: any) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
      </svg>
    );
  };

  // Define an Activity component since it's not in lucide-react but used in the code
  const Activity = (props: any) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-indigo-500 mx-auto animate-spin mb-4" />
          <h3 className="text-lg font-medium text-gray-800">Loading Reports</h3>
          <p className="text-sm text-gray-600 mt-2">Gathering your AWS Data Marketplace analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AWS Data Marketplace Reports</h1>
          <p className="text-gray-600 mt-1">
            Monitor usage, costs, performance, and data quality metrics for your AWS Data Marketplace sources
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="border border-gray-300 rounded-md flex items-center">
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded-l ${timeRange === '7d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setTimeRange('7d')}
            >
              7D
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium ${timeRange === '30d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setTimeRange('30d')}
            >
              30D
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium ${timeRange === '90d' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setTimeRange('90d')}
            >
              90D
            </button>
            <button 
              className={`px-3 py-1.5 text-sm font-medium rounded-r ${timeRange === '12m' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              onClick={() => setTimeRange('12m')}
            >
              12M
            </button>
          </div>
          <button 
            className="px-3 py-1.5 text-sm font-medium bg-white border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50"
            onClick={() => {}}
          >
            <Calendar className="w-4 h-4 mr-1.5" />
            Custom Range
          </button>
          <button 
            className="px-3 py-1.5 text-sm font-medium bg-indigo-600 text-white rounded-md flex items-center hover:bg-indigo-700"
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
          >
            {isGeneratingReport ? (
              <>
                <RefreshCw className="w-4 h-4 mr-1.5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-1.5" />
                Export Report
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="flex border-b border-gray-200">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'overview'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'usage'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
            }`}
            onClick={() => setActiveTab('usage')}
          >
            Usage Analytics
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'cost'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
            }`}
            onClick={() => setActiveTab('cost')}
          >
            Cost Analysis
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'quality'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
            }`}
            onClick={() => setActiveTab('quality')}
          >
            Data Quality
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'performance'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
            }`}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && renderOverviewTab()}
          {activeTab === 'usage' && renderUsageTab()}
          {activeTab === 'cost' && renderCostTab()}
          {activeTab === 'quality' && renderQualityTab()}
          {activeTab === 'performance' && renderPerformanceTab()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Report Templates</h3>
            <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Create New</button>
          </div>
          
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3 hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <BarChart className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Monthly Performance Summary</p>
                    <p className="text-xs text-gray-500 mt-1">Usage, cost, and quality metrics in one report</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3 hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Wallet className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Cost Optimization Report</p>
                    <p className="text-xs text-gray-500 mt-1">Cost breakdown with savings recommendations</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3 hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Data Quality Audit</p>
                    <p className="text-xs text-gray-500 mt-1">Detailed quality metrics and issues</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Alerts & Notifications</h3>
            <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">Configure</button>
          </div>
          
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Budget Alert</p>
                    <p className="text-xs text-gray-500 mt-1">Notify when monthly spend reaches 80%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" name="toggle-budget" id="toggle-budget" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer" checked />
                    <label htmlFor="toggle-budget" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="bg-red-100 p-2 rounded-full mr-3">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Error Rate Alert</p>
                    <p className="text-xs text-gray-500 mt-1">Notify when error rate exceeds 1%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" name="toggle-error" id="toggle-error" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer" checked />
                    <label htmlFor="toggle-error" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-3">
                    <Database className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Data Quality Alert</p>
                    <p className="text-xs text-gray-500 mt-1">Notify when quality score drops below 90%</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" name="toggle-quality" id="toggle-quality" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer" checked />
                    <label htmlFor="toggle-quality" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Zap className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">Performance Alert</p>
                    <p className="text-xs text-gray-500 mt-1">Notify when response time exceeds 500ms</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="relative inline-block w-10 mr-2 align-middle select-none">
                    <input type="checkbox" name="toggle-perf" id="toggle-perf" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 border-gray-300 appearance-none cursor-pointer" checked />
                    <label htmlFor="toggle-perf" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-800">Quick Actions</h3>
          </div>
          
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-lg p-3 hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <Download className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Download All Reports</p>
                  <p className="text-xs text-gray-500 mt-1">Get all reports in PDF format</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3 hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Share2 className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Share with Team</p>
                  <p className="text-xs text-gray-500 mt-1">Send reports to team members</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3 hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Settings className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Configure Dashboard</p>
                  <p className="text-xs text-gray-500 mt-1">Customize widgets and metrics</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3 hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="flex items-start">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <Calendar className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Schedule Reports</p>
                  <p className="text-xs text-gray-500 mt-1">Set up recurring report delivery</p>
                </div>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-3 hover:border-indigo-300 cursor-pointer transition-colors">
              <div className="flex items-start">
                <div className="bg-red-100 p-2 rounded-full mr-3">
                  <ExternalLink className="w-4 h-4 text-red-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Open in AWS Console</p>
                  <p className="text-xs text-gray-500 mt-1">View detailed metrics in AWS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-lg p-6 shadow-md text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Analytics</h3>
            <p className="text-white/80 mb-4 max-w-3xl">
              Enable our AI analytics to automatically identify patterns, anomalies, and optimization opportunities across your AWS Data Marketplace usage. 
              Get personalized recommendations on cost savings, performance improvements, and data quality enhancements.
            </p>
            <button className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium text-sm hover:bg-indigo-50 inline-flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              Enable AI Analytics
            </button>
          </div>
          <div className="hidden lg:block">
            <Lightbulb className="w-20 h-20 text-white/30" />
          </div>
        </div>
      </div>
      
      {/* Floating Quick Action Button */}
      <div className="fixed bottom-8 right-8">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all">
          <Sparkles className="w-6 h-6" />
        </button>
      </div>

      {/* CSS for toggle switches */}
      <style jsx>{`
        .toggle-checkbox:checked {
          right: 0;
          border-color: #4f46e5;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #4f46e5;
        }
        .toggle-checkbox {
          right: 0;
          transition: all 0.3s;
        }
        .toggle-label {
          transition: all 0.3s;
        }
      `}</style>
    </div>
  );
};

export default Reports;
