import React, { useState } from 'react';
import { 
  ArrowDownToLine, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink, 
  Download, 
  Building2, 
  Laptop, 
  Cloud, 
  Linkedin, 
  FileSpreadsheet, 
  FileText, 
  Shield, 
  ChevronRight, 
  Zap, 
  Database, 
  CheckCircle, 
  ArrowRightCircle, 
  CalendarClock,
  ServerCog,
  LayoutGrid,
  PieChart,
  Settings,
  Globe,
  ShoppingCart,
  Package,
  Tag,
  X,
  Search,
  Filter,
  BarChart2,
  Users,
  Target,
  Layers,
  UserPlus,
  Activity,
  ChevronDown,
  BarChart3,
  DollarSign,
  LineChart,
  Image,
  Youtube,
  MonitorSmartphone,
  MousePointer,
  Bell,
  Flag,
  CreditCard,
  BarChart,
  ChevronsRight,
  Play,
  FilePlus2
} from 'lucide-react';

interface ExportOptionsProps {
  enrichedLeads: any[];
  segments: any[];
  onExport: () => void;
}

const ExportOptions: React.FC<ExportOptionsProps> = ({
  enrichedLeads,
  segments,
  onExport,
}) => {
  const [selectedDestination, setSelectedDestination] = useState<string>('hubspot');
  const [exportOption, setExportOption] = useState<string>('all');
  const [includeTags, setIncludeTags] = useState<boolean>(true);
  const [sendNotification, setSendNotification] = useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [showMarketplaceModal, setShowMarketplaceModal] = useState<boolean>(false);
  const [showTradeDesk, setShowTradeDesk] = useState<boolean>(false);
  const [showCampaignModal, setShowCampaignModal] = useState<boolean>(false);
  const [segmentForAds, setSegmentForAds] = useState<any>(null);
  const [selectedAdPlatform, setSelectedAdPlatform] = useState<string>('tradedesk');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Sample marketplace data packages
  const marketplacePackages = [
    {
      id: "financial-package",
      name: "Financial Services Data Package",
      description: "Comprehensive financial data indicators for banking, investment, and insurance prospects",
      records: 1250000,
      price: "$0.008 per record",
      provider: "FinData Solutions",
      dataPoints: ["Credit Score Range", "Investment Preferences", "Financial Products", "Banking History", "Risk Profile"],
      category: "Finance"
    },
    {
      id: "tech-package",
      name: "Technology Stack Intelligence",
      description: "Detailed information about companies' technology infrastructure, software usage, and IT decision-making",
      records: 950000,
      price: "$0.012 per record",
      provider: "TechStack Analytics",
      dataPoints: ["Current Technologies", "Renewal Dates", "IT Budget", "Tech Adoption Stage", "Decision Makers"],
      category: "Technology"
    },
    {
      id: "intent-package",
      name: "B2B Purchase Intent Signals",
      description: "Real-time buying signals based on research activity, content consumption, and engagement patterns",
      records: 780000,
      price: "$0.015 per record",
      provider: "Intent Intelligence Inc",
      dataPoints: ["Research Topics", "Content Engagement", "Competitor Research", "Purchase Timeline", "Budget Indicators"],
      category: "Intent Data"
    }
  ];
  
  // Ad campaign metrics based on segments
  const generateAdMetrics = (segmentSize: number) => {
    const reach = segmentSize * (3 + Math.floor(Math.random() * 5)); // 3-8x multiplier
    const impressions = reach * (4 + Math.floor(Math.random() * 6)); // 4-10x multiplier
    const clicks = Math.floor(impressions * (0.01 + Math.random() * 0.04)); // 1-5% CTR
    const conversions = Math.floor(clicks * (0.08 + Math.random() * 0.12)); // 8-20% conversion rate 
    const revenue = conversions * (100 + Math.floor(Math.random() * 400)); // $100-500 per conversion
    
    return {
      reach,
      impressions,
      clicks,
      clickRate: (clicks / impressions * 100).toFixed(2),
      conversions,
      conversionRate: (conversions / clicks * 100).toFixed(2),
      cpac: (5000 / conversions).toFixed(2), // Cost per acquisition based on $5000 budget
      revenue,
      roi: ((revenue - 5000) / 5000 * 100).toFixed(2) // ROI based on $5000 budget
    };
  };
  
  // Sample ad platforms
  const adPlatforms = [
    {
      id: 'tradedesk',
      name: 'The Trade Desk',
      logo: <Image className="w-5 h-5 text-white" />,
      description: 'Global demand-side platform with advanced audience targeting and AI optimization tools.',
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      matchRate: '93%',
      cookieless: true,
      connectedId: true,
      features: ['Cross-device targeting', 'Cookieless solutions', 'Unified ID 2.0', 'AI-based optimization']
    },
    {
      id: 'google',
      name: 'Google Display & Video 360',
      logo: <Youtube className="w-5 h-5 text-white" />,
      description: 'Google\'s integrated programmatic platform for display, video, and connected TV advertising.',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      matchRate: '91%',
      cookieless: true,
      connectedId: true,
      features: ['Google audience integration', 'YouTube inventory', 'Cross-channel measurement', 'Brand safety tools']
    },
    {
      id: 'amazon',
      name: 'Amazon DSP',
      logo: <ShoppingCart className="w-5 h-5 text-white" />,
      description: 'Amazon\'s demand-side platform for e-commerce targeting using shopper intent signals.',
      bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
      matchRate: '88%',
      cookieless: false,
      connectedId: false,
      features: ['Amazon shopping data', 'Retail analytics', 'On & off Amazon inventory', 'Purchase-based audiences']
    },
    {
      id: 'xandr',
      name: 'Xandr',
      logo: <Globe className="w-5 h-5 text-white" />,
      description: 'Microsoft\'s end-to-end programmatic platform with advanced data capabilities.',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
      matchRate: '86%',
      cookieless: true,
      connectedId: true,
      features: ['Microsoft audience data', 'Curated marketplace', 'Brand safety', 'Custom segments']
    }
  ];
  
  // Sample ad campaign channels
  const adChannels = [
    { id: 'display', name: 'Display', icon: <MonitorSmartphone className="w-4 h-4" />, description: 'Banner ads across premium websites', reachMultiplier: 1.0 },
    { id: 'video', name: 'Video', icon: <Youtube className="w-4 h-4" />, description: 'Pre-roll and in-stream video ads', reachMultiplier: 0.7 },
    { id: 'native', name: 'Native', icon: <FileText className="w-4 h-4" />, description: 'Contextual ads that match site content', reachMultiplier: 0.8 },
    { id: 'audio', name: 'Audio', icon: <Play className="w-4 h-4" />, description: 'Streaming audio and podcast ads', reachMultiplier: 0.5 },
    { id: 'ctv', name: 'Connected TV', icon: <Laptop className="w-4 h-4" />, description: 'Premium TV streaming inventory', reachMultiplier: 0.4 }
  ];
  
  // Toggle Trade Desk section
  const toggleTradeDesk = () => {
    setShowTradeDesk(!showTradeDesk);
  };
  
  // Handle segment selection for ads
  const handleSelectSegmentForAds = (segment: any) => {
    setSegmentForAds(segment);
    setShowCampaignModal(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Export Enriched Leads</h2>
        <p className="mt-2 text-gray-600">
          Choose where to export your enriched lead data, or download it directly.
        </p>
      </div>

      {/* AWS Data Marketplace Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-5 shadow-md">
        <div className="flex items-start">
          <div className="bg-white/20 p-2 rounded-full mr-4">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">Monetize Your Data with AWS Data Marketplace</h3>
            <p className="text-sm opacity-90 mb-4">
              Turn your enriched data into a revenue stream. Package and sell your segmented datasets 
              to other businesses through AWS Data Marketplace. Our platform handles the publishing, 
              delivery, and billing processes.
            </p>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={() => setShowMarketplaceModal(true)}
                className="px-4 py-2 bg-white text-indigo-700 rounded-md text-sm font-medium hover:bg-blue-50 flex items-center"
              >
                <Tag className="w-4 h-4 mr-2" />
                Publish Your Data
              </button>
              <button className="px-4 py-2 bg-indigo-700 text-white rounded-md text-sm font-medium hover:bg-indigo-800 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Learn About AWS Data Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* The Trade Desk Banner */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg p-5 shadow-md">
        <div className="flex items-start">
          <div className="bg-white/20 p-2 rounded-full mr-4">
            <Target className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">Activate Your Audiences on Programmatic Ad Platforms</h3>
            <p className="text-sm opacity-90 mb-4">
              Take your enriched segments directly to The Trade Desk and other programmatic advertising platforms. 
              Create targeted campaigns that reach your ideal customers across display, video, audio, and CTV channels.
            </p>
            <div className="flex flex-wrap gap-3">
              <button 
                onClick={toggleTradeDesk}
                className="px-4 py-2 bg-white text-green-700 rounded-md text-sm font-medium hover:bg-green-50 flex items-center"
              >
                <Layers className="w-4 h-4 mr-2" />
                Activate Segments
              </button>
              <button className="px-4 py-2 bg-green-700 text-white rounded-md text-sm font-medium hover:bg-green-800 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Learn About The Trade Desk
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trade Desk Audience Activation Section */}
      {showTradeDesk && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm animate-fade-in">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              <Target className="w-5 h-5 text-green-600 mr-2" />
              Programmatic Advertising Platforms
            </h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select 
                  className="text-sm border border-gray-300 rounded-md px-3 py-1.5 pr-8 bg-white appearance-none"
                  value={selectedAdPlatform}
                  onChange={(e) => setSelectedAdPlatform(e.target.value)}
                >
                  {adPlatforms.map(platform => (
                    <option key={platform.id} value={platform.id}>{platform.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Platform Details */}
          <div className="mb-6">
            {adPlatforms.filter(p => p.id === selectedAdPlatform).map(platform => (
              <div key={platform.id} className="flex items-start">
                <div className={`h-12 w-12 ${platform.bgColor} rounded-lg flex items-center justify-center mr-4 shadow-sm`}>
                  {platform.logo}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-md font-medium text-gray-800 flex items-center">{platform.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{platform.description}</p>
                    </div>
                    <div className="bg-green-100 px-2.5 py-1 rounded text-sm font-medium text-green-800 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1.5" />
                      Connected
                    </div>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {platform.features.map((feature, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Match Rate</div>
                      <div className="flex items-end">
                        <span className="text-lg font-semibold text-gray-800">{platform.matchRate}</span>
                        <span className="text-xs text-gray-500 ml-1 mb-0.5">avg.</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">Cookieless Ready</div>
                      <div className="text-lg font-semibold text-gray-800 flex items-center">
                        {platform.cookieless ? (
                          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <X className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        {platform.cookieless ? 'Yes' : 'No'}
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">ID Solution</div>
                      <div className="text-lg font-semibold text-gray-800 flex items-center">
                        {platform.connectedId ? (
                          <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <X className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        {platform.connectedId ? 'UID 2.0' : 'None'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Activatable Segments */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Layers className="w-4 h-4 mr-1.5 text-gray-600" />
              Segments Available for Activation
            </h4>
            
            <div className="space-y-3">
              {segments.map(segment => {
                // Generate some predictive metrics for this segment
                const metrics = generateAdMetrics(segment.count);
                
                return (
                  <div key={segment.id} className="border border-gray-200 rounded-lg p-4 hover:border-green-200 hover:bg-green-50/10 cursor-pointer">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="md:col-span-2 flex items-center">
                        <div className="bg-green-100 rounded-full p-2 mr-3">
                          <Users className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <h5 className="text-sm font-medium text-gray-800">{segment.name}</h5>
                          <p className="text-xs text-gray-500 mt-0.5">{segment.count} leads · {segment.criteria}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col justify-center">
                        <div className="text-xs text-gray-500">Estimated audience reach</div>
                        <div className="text-sm font-medium text-gray-800 mt-0.5">~{metrics.reach.toLocaleString()} people</div>
                      </div>
                      
                      <div className="flex items-center justify-end">
                        <button 
                          onClick={() => handleSelectSegmentForAds(segment)}
                          className="px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 flex items-center"
                        >
                          <Zap className="w-3.5 h-3.5 mr-1.5" />
                          Activate
                        </button>
                      </div>
                    </div>
                    
                    {/* Expandable section with metrics */}
                    <div className="mt-3">
                      <button 
                        onClick={() => setExpandedSection(expandedSection === `segment-${segment.id}` ? null : `segment-${segment.id}`)}
                        className="text-xs text-green-600 font-medium flex items-center"
                      >
                        {expandedSection === `segment-${segment.id}` ? 'Hide' : 'Show'} performance predictions
                        <ChevronRight className={`w-3.5 h-3.5 ml-1 transition-transform ${expandedSection === `segment-${segment.id}` ? 'rotate-90' : ''}`} />
                      </button>
                      
                      {expandedSection === `segment-${segment.id}` && (
                        <div className="mt-3 grid grid-cols-2 md:grid-cols-5 gap-3 bg-gray-50 p-3 rounded-lg">
                          <PerformanceMetric 
                            label="Est. CTR" 
                            value={`${metrics.clickRate}%`}
                            icon={<MousePointer className="w-3.5 h-3.5 text-gray-600" />}
                          />
                          <PerformanceMetric 
                            label="Est. Conversion" 
                            value={`${metrics.conversionRate}%`}
                            icon={<UserPlus className="w-3.5 h-3.5 text-gray-600" />}
                          />
                          <PerformanceMetric 
                            label="Est. CPAC" 
                            value={`$${metrics.cpac}`}
                            icon={<CreditCard className="w-3.5 h-3.5 text-gray-600" />}
                          />
                          <PerformanceMetric 
                            label="Est. Revenue" 
                            value={`$${metrics.revenue.toLocaleString()}`}
                            icon={<DollarSign className="w-3.5 h-3.5 text-gray-600" />}
                          />
                          <PerformanceMetric 
                            label="Est. ROI" 
                            value={`${metrics.roi}%`}
                            icon={<BarChart className="w-3.5 h-3.5 text-gray-600" />}
                            positive={Number(metrics.roi) > 0}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Integration Benefits */}
          <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-4 border border-teal-100">
            <h4 className="text-sm font-medium text-teal-800 mb-3 flex items-center">
              <Zap className="w-4 h-4 mr-1.5 text-teal-600" />
              Benefits of Direct Activation
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                  <Users className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-teal-800">Precise Targeting</p>
                  <p className="text-xs text-teal-700 mt-0.5">Direct mapping of your enriched segments to ad platforms</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                  <Activity className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-teal-800">Live Performance</p>
                  <p className="text-xs text-teal-700 mt-0.5">Real-time campaign metrics tied back to your segments</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                  <BarChart2 className="w-4 h-4 text-teal-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-teal-800">Closed-Loop Analytics</p>
                  <p className="text-xs text-teal-700 mt-0.5">Connect ad performance back to your CRM data</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <Database className="w-5 h-5 text-indigo-500 mr-2" />
            Export to CRM
          </h3>
          
          <div className="space-y-4">
            <CRMOption
              id="hubspot"
              name="HubSpot"
              icon={<Laptop className="w-5 h-5 text-white" />}
              colorClass="bg-gradient-to-br from-orange-500 to-orange-600"
              isSelected={selectedDestination === 'hubspot'}
              onSelect={() => setSelectedDestination('hubspot')}
              description="Marketing automation & CRM"
            />
            <CRMOption
              id="zoho"
              name="Zoho CRM"
              icon={<Building2 className="w-5 h-5 text-white" />}
              colorClass="bg-gradient-to-br from-blue-500 to-blue-600"
              isSelected={selectedDestination === 'zoho'}
              onSelect={() => setSelectedDestination('zoho')}
              description="Sales & marketing platform"
            />
            <CRMOption
              id="salesforce"
              name="Salesforce"
              icon={<Cloud className="w-5 h-5 text-white" />}
              colorClass="bg-gradient-to-br from-sky-500 to-sky-600"
              isSelected={selectedDestination === 'salesforce'}
              onSelect={() => setSelectedDestination('salesforce')}
              description="Cloud-based CRM solution"
            />
            <CRMOption
              id="linkedin"
              name="LinkedIn Sales Navigator"
              icon={<Linkedin className="w-5 h-5 text-white" />}
              colorClass="bg-gradient-to-br from-blue-600 to-blue-700"
              isSelected={selectedDestination === 'linkedin'}
              onSelect={() => setSelectedDestination('linkedin')}
              description="Professional sales tools"
            />
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Settings className="w-4 h-4 text-gray-500 mr-2" />
              Export Options
            </h4>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded text-indigo-600 focus:ring-indigo-500" 
                  defaultChecked 
                />
                <span className="ml-2 text-sm text-gray-600">Create new leads if they don't exist</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded text-indigo-600 focus:ring-indigo-500" 
                  defaultChecked 
                />
                <span className="ml-2 text-sm text-gray-600">Update existing leads with new data</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded text-indigo-600 focus:ring-indigo-500" 
                  checked={includeTags}
                  onChange={(e) => setIncludeTags(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">Add leads to segments as tags</span>
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  className="rounded text-indigo-600 focus:ring-indigo-500" 
                  checked={sendNotification}
                  onChange={(e) => setSendNotification(e.target.checked)}
                />
                <span className="ml-2 text-sm text-gray-600">Send email notification when complete</span>
              </label>
            </div>
            
            <div className="mt-4">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
              >
                {showAdvanced ? 'Hide' : 'Show'} advanced options
                <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
              </button>
              
              {showAdvanced && (
                <div className="mt-3 bg-gray-50 rounded-md p-3 border border-gray-200">
                  <div className="mb-3">
                    <label className="block text-xs text-gray-600 mb-1">Data to export</label>
                    <div className="flex space-x-3">
                      <label className="flex items-center">
                        <input 
                          type="radio"
                          name="exportOption" 
                          value="all"
                          checked={exportOption === 'all'} 
                          onChange={() => setExportOption('all')}
                          className="text-indigo-600 focus:ring-indigo-500" 
                        />
                        <span className="ml-1.5 text-sm text-gray-700">All leads</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio"
                          name="exportOption" 
                          value="highValueOnly"
                          checked={exportOption === 'highValueOnly'} 
                          onChange={() => setExportOption('highValueOnly')}
                          className="text-indigo-600 focus:ring-indigo-500" 
                        />
                        <span className="ml-1.5 text-sm text-gray-700">High-value only</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Scheduling</label>
                    <div className="flex items-center space-x-3">
                      <label className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="rounded text-indigo-600 focus:ring-indigo-500" 
                        />
                        <span className="ml-1.5 text-sm text-gray-700">Schedule recurring export</span>
                      </label>
                      <select className="text-xs border border-gray-300 rounded px-2 py-1">
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <ArrowDownToLine className="w-5 h-5 text-indigo-500 mr-2" />
            Alternative Export Options
          </h3>
          
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer hover:bg-indigo-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-2 mr-3">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">Download CSV</h4>
                    <p className="text-xs text-gray-500 mt-1">Export all enriched lead data as CSV</p>
                  </div>
                </div>
                <button className="text-xs text-indigo-600 font-medium flex items-center">
                  Download
                  <Download className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer hover:bg-indigo-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-2 mr-3">
                    <FileSpreadsheet className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">Excel Workbook</h4>
                    <p className="text-xs text-gray-500 mt-1">Export with segments as separate sheets</p>
                  </div>
                </div>
                <button className="text-xs text-indigo-600 font-medium flex items-center">
                  Download
                  <Download className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer hover:bg-indigo-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-purple-100 rounded-full p-2 mr-3">
                    <LayoutGrid className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">Google Sheets</h4>
                    <p className="text-xs text-gray-500 mt-1">Export directly to connected Google account</p>
                  </div>
                </div>
                <button className="text-xs text-indigo-600 font-medium flex items-center">
                  Connect
                  <ArrowRightCircle className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer hover:bg-indigo-50/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-amber-100 rounded-full p-2 mr-3">
                    <CalendarClock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-800">Schedule Export</h4>
                    <p className="text-xs text-gray-500 mt-1">Set up recurring data exports</p>
                  </div>
                </div>
                <button className="text-xs text-indigo-600 font-medium flex items-center">
                  Schedule
                  <ArrowRightCircle className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <PieChart className="w-4 h-4 text-gray-500 mr-2" />
              Export Summary
            </h4>
            <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Total leads to export:</span>
                <span className="font-medium text-gray-800">{enrichedLeads.length}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Segments included:</span>
                <span className="font-medium text-gray-800">{segments.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Enriched fields:</span>
                <span className="font-medium text-gray-800">12 fields</span>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-xs text-gray-500">Export progress</div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mt-1.5">
                <div className="h-full bg-indigo-500 rounded-full w-0 animate-progress"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>Preparing export...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start shadow-sm">
        <Shield className="w-5 h-5 text-blue-500 mr-3 mt-0.5" />
        <div>
          <h3 className="text-sm font-medium text-blue-800">AWS Data Marketplace Integration</h3>
          <p className="mt-1 text-sm text-blue-700">
            SmartLeads AI uses AWS Data Marketplace to securely transfer and monetize your data. 
            Access premium data sources or sell your enriched segments with enterprise-grade security standards.
            All data is encrypted in transit and at rest.
          </p>
          <div className="mt-2 flex space-x-4 text-xs">
            <span className="flex items-center text-blue-700">
              <CheckCircle className="w-3.5 h-3.5 mr-1" />
              SOC 2 Compliant
            </span>
            <span className="flex items-center text-blue-700">
              <CheckCircle className="w-3.5 h-3.5 mr-1" />
              GDPR Ready
            </span>
            <span className="flex items-center text-blue-700">
              <CheckCircle className="w-3.5 h-3.5 mr-1" />
              End-to-End Encryption
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={onExport}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-lg font-medium flex items-center shadow-md hover:shadow-lg transition-all"
        >
          <ServerCog className="w-5 h-5 mr-3" />
          Export to {selectedDestination === 'hubspot' ? 'HubSpot' : 
                      selectedDestination === 'zoho' ? 'Zoho CRM' : 
                      selectedDestination === 'salesforce' ? 'Salesforce' : 
                      'LinkedIn Sales Navigator'}
          <ExternalLink className="w-4 h-4 ml-3" />
        </button>
      </div>

      {/* AWS Data Marketplace Publishing Modal */}
      {showMarketplaceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 rounded-md mr-3">
                  <ShoppingCart className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">AWS Data Marketplace Publishing</h3>
                  <p className="text-sm text-gray-500">Create and sell data products from your enriched leads</p>
                </div>
              </div>
              <button 
                onClick={() => setShowMarketplaceModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-100 mb-6">
                <h4 className="text-sm font-medium text-indigo-800 mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-1.5 text-indigo-600" />
                  Turn Your Enriched Data into Revenue
                </h4>
                <p className="text-xs text-indigo-700">
                  Package your high-quality segments and sell them on AWS Data Marketplace. Our platform handles all the technical aspects of 
                  data delivery, security, and billing. You set the pricing and control who can access your data products.
                </p>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-800 mb-3">Your Eligible Data Packages</h4>
                <div className="space-y-4">
                  {segments.slice(0, 3).map((segment, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 hover:border-indigo-200 hover:bg-indigo-50/10">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start">
                          <div className="p-2 bg-indigo-100 rounded-full mr-3">
                            <Package className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-800">{segment.name}</h5>
                            <p className="text-xs text-gray-500 mt-0.5">{segment.count} leads, enriched with premium data</p>
                          </div>
                        </div>
                        <button className="text-xs text-indigo-600 font-medium px-2.5 py-1 border border-indigo-200 rounded hover:bg-indigo-50">
                          Publish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-800 mb-3">Sample Marketplace Listings</h4>
                <div className="space-y-4">
                  {marketplacePackages.map((pkg) => (
                    <div key={pkg.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="p-2 bg-blue-100 rounded-full mr-3">
                          <Database className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="text-sm font-medium text-gray-800">{pkg.name}</h5>
                              <p className="text-xs text-gray-600 mt-1">{pkg.description}</p>
                            </div>
                            <div className="bg-blue-100 px-2 py-1 rounded text-xs font-medium text-blue-800">
                              {pkg.category}
                            </div>
                          </div>
                          
                          <div className="mt-3 flex flex-wrap gap-1">
                            {pkg.dataPoints.map((point, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                {point}
                              </span>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <div className="text-xs text-gray-500">
                                <span className="font-medium text-gray-700">{pkg.records.toLocaleString()}</span> records
                              </div>
                              <div className="text-xs text-gray-500">
                                <span className="font-medium text-gray-700">{pkg.price}</span>
                              </div>
                            </div>
                            <span className="text-xs text-gray-500">Published by {pkg.provider}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 flex items-center">
                <Package className="w-4 h-4 mr-1.5" />
                Create New Data Package
              </button>
              <button
                onClick={() => setShowMarketplaceModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Campaign Creation Modal */}
      {showCampaignModal && segmentForAds && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-md mr-3">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Create Programmatic Campaign</h3>
                  <p className="text-sm text-gray-500">Activate "{segmentForAds.name}" on {adPlatforms.find(p => p.id === selectedAdPlatform)?.name}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowCampaignModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {/* Campaign Setup */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-800 mb-4">Campaign Setup</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Campaign Name</label>
                        <input
                          type="text" 
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          defaultValue={`${segmentForAds.name} - ${new Date().toLocaleDateString('en-US', {month: 'short', year: 'numeric'})}`}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Start Date</label>
                          <input
                            type="date" 
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                            defaultValue={new Date().toISOString().split('T')[0]}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">End Date</label>
                          <input
                            type="date" 
                            className="w-full p-2 border border-gray-300 rounded-md text-sm"
                            defaultValue={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Budget</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <DollarSign className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="number" 
                            className="w-full pl-8 p-2 border border-gray-300 rounded-md text-sm"
                            defaultValue="5000"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Campaign Objective</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                          <option>Brand Awareness</option>
                          <option>Lead Generation</option>
                          <option selected>Conversions</option>
                          <option>Website Traffic</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-800 mb-4">Channel Selection</h4>
                    <div className="space-y-3">
                      {adChannels.map(channel => {
                        const metrics = generateAdMetrics(segmentForAds.count * channel.reachMultiplier);
                        
                        return (
                          <div key={channel.id} className="border border-gray-200 rounded-lg p-3 hover:border-green-200 hover:bg-green-50/10">
                            <div className="flex items-center">
                              <input 
                                type="checkbox" 
                                id={`channel-${channel.id}`} 
                                className="mr-3 rounded text-green-600 focus:ring-green-500"
                                defaultChecked={channel.id === 'display' || channel.id === 'video'} 
                              />
                              <label 
                                htmlFor={`channel-${channel.id}`}
                                className="flex items-center cursor-pointer flex-1"
                              >
                                <div className="bg-green-100 p-2 rounded-full mr-3">
                                  {channel.icon}
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-gray-800">{channel.name}</h5>
                                  <p className="text-xs text-gray-500 mt-0.5">{channel.description}</p>
                                </div>
                              </label>
                              <div className="text-xs text-gray-600">
                                Est. reach: <span className="font-medium">{Math.round(metrics.reach * 0.8).toLocaleString()}-{Math.round(metrics.reach * 1.2).toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-4">Advanced Targeting Options</h4>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center">
                          <ChevronsRight className="w-4 h-4 text-gray-600 mr-2" />
                          <span className="text-sm font-medium text-gray-700">Apply additional filters to your segment</span>
                        </div>
                        <button className="text-xs font-medium text-green-600 hover:text-green-800">
                          + Add Filter
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center text-xs text-gray-500 justify-between">
                          <div className="bg-white p-2 rounded border border-gray-200 flex-1 flex items-center mr-2">
                            <span className="font-medium text-gray-700 mr-1">Geography:</span> United States
                          </div>
                          <button className="text-gray-500 hover:text-gray-700">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-500 justify-between">
                          <div className="bg-white p-2 rounded border border-gray-200 flex-1 flex items-center mr-2">
                            <span className="font-medium text-gray-700 mr-1">Device:</span> Desktop, Mobile, Tablet
                          </div>
                          <button className="text-gray-500 hover:text-gray-700">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-500 justify-between">
                          <div className="bg-white p-2 rounded border border-gray-200 flex-1 flex items-center mr-2">
                            <span className="font-medium text-gray-700 mr-1">Time of Day:</span> Business Hours (9am-5pm)
                          </div>
                          <button className="text-gray-500 hover:text-gray-700">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100 mb-4">
                    <h4 className="text-sm font-medium text-green-800 mb-3 flex items-center">
                      <Target className="w-4 h-4 mr-1.5 text-green-600" />
                      Audience Summary
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs text-green-700 mb-1">
                          <span>Original Segment Size</span>
                          <span className="font-medium">{segmentForAds.count} leads</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-1.5">
                          <div className="bg-green-600 h-1.5 rounded-full w-1/4"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs text-green-700 mb-1">
                          <span>Estimated Match Rate</span>
                          <span className="font-medium">{adPlatforms.find(p => p.id === selectedAdPlatform)?.matchRate || '90%'}</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-1.5">
                          <div className="bg-green-600 h-1.5 rounded-full w-[93%]"></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-xs text-green-700 mb-1">
                          <span>Estimated Audience Size</span>
                          <span className="font-medium">{(segmentForAds.count * 4).toLocaleString()} people</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-1.5">
                          <div className="bg-green-600 h-1.5 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-xs text-green-700">
                      <p>Segments will be anonymized and matched using {adPlatforms.find(p => p.id === selectedAdPlatform)?.connectedId ? 'UID 2.0' : 'cookie-based identifiers'} for privacy-compliant targeting.</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200 mb-4">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">Performance Forecast</h4>
                    
                    {(() => {
                      const metrics = generateAdMetrics(segmentForAds.count);
                      return (
                        <div className="space-y-3">
                          <PerformanceMetric 
                            label="Estimated Impressions" 
                            value={metrics.impressions.toLocaleString()}
                            icon={<Eye className="w-3.5 h-3.5 text-gray-600" />}
                          />
                          <PerformanceMetric 
                            label="Estimated Clicks" 
                            value={metrics.clicks.toLocaleString()}
                            secondaryText={`${metrics.clickRate}% CTR`}
                            icon={<MousePointer className="w-3.5 h-3.5 text-gray-600" />}
                          />
                          <PerformanceMetric 
                            label="Estimated Conversions" 
                            value={metrics.conversions.toLocaleString()}
                            secondaryText={`${metrics.conversionRate}% CR`}
                            icon={<CheckCircle className="w-3.5 h-3.5 text-gray-600" />}
                          />
                          <PerformanceMetric 
                            label="Projected Revenue" 
                            value={`$${metrics.revenue.toLocaleString()}`}
                            icon={<DollarSign className="w-3.5 h-3.5 text-gray-600" />}
                          />
                          <PerformanceMetric 
                            label="Estimated ROI" 
                            value={`${metrics.roi}%`}
                            icon={<BarChart className="w-3.5 h-3.5 text-gray-600" />}
                            positive={Number(metrics.roi) > 0}
                          />
                        </div>
                      );
                    })()}
                    
                    <div className="mt-3 text-xs text-gray-500">
                      Based on historical performance data from similar campaigns.
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-800 mb-3">
                      Campaign Timeline
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white mr-3 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700">Segment Data Export</p>
                          <p className="text-xs text-gray-500">Secure, privacy-compliant transfer</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-white border-2 border-green-600 flex items-center justify-center text-green-600 mr-3 mt-0.5">
                          <span className="text-xs">2</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700">Audience Matching</p>
                          <p className="text-xs text-gray-500">Up to 24 hours for processing</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-gray-600 mr-3 mt-0.5">
                          <span className="text-xs">3</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700">Campaign Launch</p>
                          <p className="text-xs text-gray-500">Creative setup and optimization</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-gray-600 mr-3 mt-0.5">
                          <span className="text-xs">4</span>
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-700">Performance Tracking</p>
                          <p className="text-xs text-gray-500">Real-time reporting dashboard</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 flex items-center">
                <FilePlus2 className="w-4 h-4 mr-1.5" />
                Create Campaign
              </button>
              <button
                onClick={() => setShowCampaignModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

interface CRMOptionProps {
  id: string;
  name: string;
  icon: React.ReactNode;
  colorClass: string;
  isSelected: boolean;
  onSelect: () => void;
  description: string;
}

const CRMOption: React.FC<CRMOptionProps> = ({
  id,
  name,
  icon,
  colorClass,
  isSelected,
  onSelect,
  description
}) => {
  return (
    <div
      className={`border rounded-lg p-3 cursor-pointer transition-all flex items-center ${
        isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30'
      }`}
      onClick={onSelect}
    >
      <div className={`h-10 w-10 rounded flex items-center justify-center mr-3 shadow-sm ${colorClass}`}>
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-800">{name}</h4>
        <p className="text-xs text-gray-500 mt-0.5">{description}</p>
      </div>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-200'
        }`}
      >
        {isSelected && <CheckCircle2 className="w-4 h-4" />}
      </div>
    </div>
  );
};

interface PerformanceMetricProps {
  label: string;
  value: string;
  secondaryText?: string;
  icon: React.ReactNode;
  positive?: boolean;
}

const PerformanceMetric: React.FC<PerformanceMetricProps> = ({ label, value, secondaryText, icon, positive }) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <div className="bg-gray-100 p-1.5 rounded-full mr-2">
          {icon}
        </div>
        <span className="text-xs text-gray-600">{label}</span>
      </div>
      <div className="flex items-center">
        <span className={`text-sm font-medium ${positive ? 'text-green-600' : 'text-gray-800'}`}>
          {value}
        </span>
        {secondaryText && (
          <span className="text-xs text-gray-500 ml-1.5">({secondaryText})</span>
        )}
      </div>
    </div>
  );
};

export default ExportOptions;