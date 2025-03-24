import React, { useState } from 'react';
import { LineChart, Settings, BellDot, User, HelpCircle, Search, Menu, LogOut, ChevronDown, Database, Tag, Globe, Cloud, Zap, Filter, CreditCard, BarChart2, Users, Building2, Bot, Sparkles, ArrowRight, Star, ServerCog, Target, Rocket, ArrowUpRight, MapPin, Calendar, Clock, Package, File, GitBranch, Layers, FileText, SlidersHorizontal, ChevronRight } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: 'dashboard' | 'library' | 'reports') => void;
  activeView: 'dashboard' | 'library' | 'reports';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, activeView }) => {
  const [showMarketplaceDropdown, setShowMarketplaceDropdown] = useState(false);
  const [showDataPartnersDropdown, setShowDataPartnersDropdown] = useState(false);
  const [showRegionsDropdown, setShowRegionsDropdown] = useState(false);
  const [activeMarketplaceTab, setActiveMarketplaceTab] = useState<'categories' | 'types' | 'providers'>('categories');

  const handleMarketplaceClick = () => {
    setShowMarketplaceDropdown(!showMarketplaceDropdown);
    if (showDataPartnersDropdown) setShowDataPartnersDropdown(false);
    if (showRegionsDropdown) setShowRegionsDropdown(false);
  };

  const handleDataPartnersClick = () => {
    setShowDataPartnersDropdown(!showDataPartnersDropdown);
    if (showMarketplaceDropdown) setShowMarketplaceDropdown(false);
    if (showRegionsDropdown) setShowRegionsDropdown(false);
  };

  const handleRegionsClick = () => {
    setShowRegionsDropdown(!showRegionsDropdown);
    if (showMarketplaceDropdown) setShowMarketplaceDropdown(false);
    if (showDataPartnersDropdown) setShowDataPartnersDropdown(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="flex items-center px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#232F3E] to-[#00A1C9]">
                <div className="flex items-center mr-2 bg-white rounded-md px-1.5 py-0.5">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/150px-Amazon_Web_Services_Logo.svg.png" 
                    alt="AWS" 
                    className="h-4" 
                  />
                </div>
                <span className="text-lg font-bold text-white flex items-center">
                  <div className="bg-black rounded-md h-5 w-5 mr-1.5 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">&lt;/&gt;</span>
                  </div>
                  <span className="mr-1">lyzr</span>
                  <span>Data Platform</span>
                </span>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6 ml-10">
              <NavLink 
                href="#" 
                active={activeView === 'dashboard'} 
                onClick={() => onNavigate('dashboard')}
              >
                Dashboard
              </NavLink>
              <NavLink 
                href="#" 
                active={activeView === 'library'} 
                onClick={() => onNavigate('library')}
              >
                Data Library
              </NavLink>
              <div className="relative">
                <button 
                  className="flex items-center text-sm py-2 text-gray-500 hover:text-gray-900"
                  onClick={handleMarketplaceClick}
                >
                  <span>AWS Marketplace</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                
                {showMarketplaceDropdown && (
                  <div className="absolute left-0 mt-2 w-[650px] bg-white border border-gray-200 rounded-lg shadow-lg z-20 animate-fade-in">
                    <div className="p-4">
                      <div className="flex border-b border-gray-200 mb-4">
                        <button 
                          className={`px-4 py-2 text-sm font-medium ${activeMarketplaceTab === 'categories' ? 'text-[#FF9900] border-b-2 border-[#FF9900]' : 'text-gray-500 hover:text-gray-700'}`}
                          onClick={() => setActiveMarketplaceTab('categories')}
                        >
                          Data Categories
                        </button>
                        <button 
                          className={`px-4 py-2 text-sm font-medium ${activeMarketplaceTab === 'types' ? 'text-[#FF9900] border-b-2 border-[#FF9900]' : 'text-gray-500 hover:text-gray-700'}`}
                          onClick={() => setActiveMarketplaceTab('types')}
                        >
                          Data Types
                        </button>
                        <button 
                          className={`px-4 py-2 text-sm font-medium ${activeMarketplaceTab === 'providers' ? 'text-[#FF9900] border-b-2 border-[#FF9900]' : 'text-gray-500 hover:text-gray-700'}`}
                          onClick={() => setActiveMarketplaceTab('providers')}
                        >
                          Top Providers
                        </button>
                      </div>
                    
                      {activeMarketplaceTab === 'categories' && (
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">Industry Categories</h3>
                            <div className="space-y-1">
                              <MarketplaceLink 
                                icon={<CreditCard className="w-4 h-4 text-[#FF9900]" />} 
                                text="Financial Services" 
                                description="Banking, investments, insurance datasets"
                                badge={{ text: "200+ datasets", color: "blue" }}
                              />
                              <MarketplaceLink 
                                icon={<Users className="w-4 h-4 text-[#FF9900]" />} 
                                text="Healthcare & Life Sciences" 
                                description="Clinical, pharma, medical research data"
                                badge={{ text: "Premium", color: "green" }}
                              />
                              <MarketplaceLink 
                                icon={<Building2 className="w-4 h-4 text-[#FF9900]" />} 
                                text="Retail & E-commerce" 
                                description="Consumer behavior, retail analytics"
                              />
                              <MarketplaceLink 
                                icon={<Target className="w-4 h-4 text-[#FF9900]" />} 
                                text="Manufacturing & IoT" 
                                description="Industrial data, IoT analytics"
                              />
                              <MarketplaceLink 
                                icon={<Globe className="w-4 h-4 text-[#FF9900]" />} 
                                text="Public Sector & Government" 
                                description="Public datasets, social statistics"
                                badge={{ text: "New", color: "amber" }}
                              />
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">Domain Categories</h3>
                            <div className="space-y-1">
                              <MarketplaceLink 
                                icon={<BarChart2 className="w-4 h-4 text-[#FF9900]" />} 
                                text="Business Intelligence" 
                                description="Market data, company metrics, KPIs"
                              />
                              <MarketplaceLink 
                                icon={<MapPin className="w-4 h-4 text-[#FF9900]" />} 
                                text="Geospatial & Location" 
                                description="Maps, coordinates, POI data"
                                badge={{ text: "Trending", color: "purple" }}
                              />
                              <MarketplaceLink 
                                icon={<Calendar className="w-4 h-4 text-[#FF9900]" />} 
                                text="Time Series & Forecasting" 
                                description="Sequential data, predictive models"
                              />
                              <MarketplaceLink 
                                icon={<Clock className="w-4 h-4 text-[#FF9900]" />} 
                                text="Real-time Data Feeds" 
                                description="Live data streams, IoT feeds"
                                badge={{ text: "High Value", color: "red" }}
                              />
                              <MarketplaceLink 
                                icon={<Filter className="w-4 h-4 text-[#FF9900]" />} 
                                text="Synthesized & Clean Data" 
                                description="ML-ready datasets, labeled data"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeMarketplaceTab === 'types' && (
                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">Delivery Methods</h3>
                            <div className="space-y-1">
                              <MarketplaceLink 
                                icon={<Database className="w-4 h-4 text-[#FF9900]" />} 
                                text="S3 Bucket Access" 
                                description="Direct access to stored data"
                              />
                              <MarketplaceLink 
                                icon={<Zap className="w-4 h-4 text-[#FF9900]" />} 
                                text="API Endpoints" 
                                description="RESTful access to data services"
                                badge={{ text: "Popular", color: "green" }}
                              />
                              <MarketplaceLink 
                                icon={<Package className="w-4 h-4 text-[#FF9900]" />} 
                                text="Data Feeds" 
                                description="Continuous stream of data updates"
                              />
                              <MarketplaceLink 
                                icon={<File className="w-4 h-4 text-[#FF9900]" />} 
                                text="File Downloads" 
                                description="Packaged data file access"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">Data Formats</h3>
                            <div className="space-y-1">
                              <MarketplaceLink 
                                icon={<FileText className="w-4 h-4 text-[#FF9900]" />} 
                                text="CSV & Tabular" 
                                description="Structured, row-column data"
                              />
                              <MarketplaceLink 
                                icon={<Layers className="w-4 h-4 text-[#FF9900]" />} 
                                text="JSON & XML" 
                                description="Flexible, schema-based data"
                              />
                              <MarketplaceLink 
                                icon={<SlidersHorizontal className="w-4 h-4 text-[#FF9900]" />} 
                                text="Parquet & ORC" 
                                description="Optimized columnar formats"
                                badge={{ text: "High Performance", color: "blue" }}
                              />
                              <MarketplaceLink 
                                icon={<GitBranch className="w-4 h-4 text-[#FF9900]" />} 
                                text="Graph & Network" 
                                description="Relationship-based data models"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">Common Use Cases</h3>
                            <div className="space-y-1">
                              <MarketplaceLink 
                                icon={<Bot className="w-4 h-4 text-[#FF9900]" />} 
                                text="ML Training Data" 
                                description="Clean data for model training"
                                badge={{ text: "AI Ready", color: "purple" }}
                              />
                              <MarketplaceLink 
                                icon={<Target className="w-4 h-4 text-[#FF9900]" />} 
                                text="Market Research" 
                                description="Industry and competitor insights"
                              />
                              <MarketplaceLink 
                                icon={<BarChart2 className="w-4 h-4 text-[#FF9900]" />} 
                                text="Analytics & BI" 
                                description="Decision support data"
                              />
                              <MarketplaceLink 
                                icon={<Sparkles className="w-4 h-4 text-[#FF9900]" />} 
                                text="Data Enrichment" 
                                description="Supplemental data for existing sets"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {activeMarketplaceTab === 'providers' && (
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { name: 'Bloomberg', description: 'Financial market data', logo: 'https://logo.clearbit.com/bloomberg.com' },
                            { name: 'Refinitiv', description: 'Financial & risk data', logo: 'https://logo.clearbit.com/refinitiv.com' },
                            { name: 'FactSet', description: 'Financial analytics', logo: 'https://logo.clearbit.com/factset.com' },
                            { name: 'Acxiom', description: 'Consumer data enrichment', logo: 'https://logo.clearbit.com/acxiom.com' },
                            { name: 'Experian', description: 'Credit & business data', logo: 'https://logo.clearbit.com/experian.com' },
                            { name: 'Databricks', description: 'AI & ML datasets', logo: 'https://logo.clearbit.com/databricks.com' },
                            { name: 'Foursquare', description: 'Location insights', logo: 'https://logo.clearbit.com/foursquare.com' },
                            { name: 'SafeGraph', description: 'POI & foot traffic data', logo: 'https://logo.clearbit.com/safegraph.com' },
                            { name: 'Weather Company', description: 'Weather & climate data', logo: 'https://logo.clearbit.com/weather.com' }
                          ].map((provider, index) => (
                            <a key={index} href="#" className="flex items-center border border-gray-200 rounded-lg p-3 hover:border-[#FF9900] hover:bg-[#FF9900]/5 transition-colors">
                              <div className="flex-shrink-0 mr-3">
                                <img 
                                  src={provider.logo} 
                                  alt={provider.name}
                                  className="w-10 h-10 rounded"
                                  onError={(e) => {
                                    // Fallback when image fails to load
                                    const target = e.target as HTMLElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium text-gray-800">{provider.name}</h4>
                                <p className="text-xs text-gray-500">{provider.description}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                      
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <a href="#" className="flex justify-between items-center px-4 py-3 bg-[#FF9900]/10 rounded-lg hover:bg-[#FF9900]/20 transition-colors">
                          <div className="flex items-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/150px-Amazon_Web_Services_Logo.svg.png" alt="AWS Marketplace" className="h-8 mr-3" />
                            <div>
                              <h3 className="text-sm font-medium text-gray-800">Browse AWS Data Marketplace</h3>
                              <p className="text-xs text-gray-600 mt-0.5">Explore 100,000+ datasets from 3,000+ providers</p>
                            </div>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#FF9900]" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  className="flex items-center text-sm py-2 text-gray-500 hover:text-gray-900"
                  onClick={handleDataPartnersClick}
                >
                  <span>Lyzr Agents</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                
                {showDataPartnersDropdown && (
                  <div className="absolute left-0 mt-2 w-[650px] bg-white border border-gray-200 rounded-lg shadow-lg z-20 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4 p-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                          <ServerCog className="w-4 h-4 mr-2 text-[#FF9900]" />
                          Data Processing Agents
                        </h3>
                        
                        <div className="space-y-4">
                          <DataPartnerCard 
                            name="Data Enrichment Agent" 
                            description="Enhance raw data from AWS Data Marketplace with custom fields, normalization, and data quality validations." 
                            icon={<Bot className="w-5 h-5 text-white" />}
                            bgColor="bg-gradient-to-br from-[#FF9900] to-amber-600"
                            rating={4.8}
                          />
                          
                          <DataPartnerCard 
                            name="AWS Source Connector" 
                            description="Connect to any AWS Data Marketplace source with our intelligent connector that handles authentication, rate limits and data transformation." 
                            icon={<Sparkles className="w-5 h-5 text-white" />}
                            bgColor="bg-gradient-to-br from-[#232F3E] to-slate-700"
                            rating={4.9}
                            featured={true}
                          />
                          
                          <DataPartnerCard 
                            name="Data Quality Agent" 
                            description="AI-powered data validation, cleansing and standardization for AWS Data Marketplace datasets." 
                            icon={<Users className="w-5 h-5 text-white" />}
                            bgColor="bg-gradient-to-br from-green-500 to-emerald-600"
                            rating={4.7}
                          />
                          
                          <DataPartnerCard 
                            name="Compliance Scanner" 
                            description="Automatically scan AWS Marketplace data for PII, sensitive information, and compliance with regulations like GDPR, HIPAA." 
                            icon={<Database className="w-5 h-5 text-white" />}
                            bgColor="bg-gradient-to-br from-blue-500 to-indigo-600"
                            rating={4.5}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-[#FF9900]" />
                          Analysis & Insight Agents
                        </h3>
                        
                        <div className="space-y-4">
                          <DataPartnerCard 
                            name="Data Visualization Agent" 
                            description="Automatically generate visualizations and dashboards from AWS Data Marketplace datasets to uncover insights." 
                            icon={<Rocket className="w-5 h-5 text-white" />}
                            bgColor="bg-gradient-to-br from-blue-600 to-blue-700"
                            rating={4.6}
                          />
                          
                          <DataPartnerCard 
                            name="Predictive Analytics Agent" 
                            description="Build ML models from AWS Marketplace data to predict trends, segment customers, and forecast business metrics." 
                            icon={<Zap className="w-5 h-5 text-white" />}
                            bgColor="bg-gradient-to-br from-amber-500 to-amber-600"
                            rating={4.3}
                          />
                          
                          <DataPartnerCard 
                            name="Augmented Intelligence" 
                            description="Use LLMs to query AWS Data Marketplace data in natural language and get insights without complex SQL." 
                            icon={<Building2 className="w-5 h-5 text-white" />}
                            bgColor="bg-gradient-to-br from-indigo-500 to-indigo-600"
                            rating={4.4}
                          />
                          
                          <div className="bg-gradient-to-r from-[#FF9900]/20 to-amber-50 p-4 rounded-lg border border-[#FF9900]/30">
                            <h4 className="text-sm font-medium text-amber-800 mb-2">Build Your Custom Agent</h4>
                            <p className="text-xs text-amber-700 mb-3">
                              Create a custom Lyzr agent tailored to your specific needs for processing and analyzing AWS Data Marketplace data.
                            </p>
                            <a href="#" className="flex items-center text-xs font-medium text-[#FF9900] hover:text-amber-600">
                              Talk to an expert
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-span-2 pt-3 border-t border-gray-100">
                        <a href="#" className="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center">
                            <Filter className="w-5 h-5 text-[#FF9900] mr-3" />
                            <div>
                              <h3 className="text-sm font-medium text-gray-800">Explore Lyzr Agent Hub</h3>
                              <p className="text-xs text-gray-500 mt-0.5">Discover our full library of 50+ AI agents optimized for AWS Data Marketplace</p>
                            </div>
                          </div>
                          <ArrowUpRight className="w-5 h-5 text-[#FF9900]" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  className="flex items-center text-sm py-2 text-gray-500 hover:text-gray-900"
                  onClick={handleRegionsClick}
                >
                  <span>Regions</span>
                  <ChevronDown className="w-4 h-4 ml-1" />
                </button>
                
                {showRegionsDropdown && (
                  <div className="absolute left-0 mt-2 w-[350px] bg-white border border-gray-200 rounded-lg shadow-lg z-20 animate-fade-in">
                    <div className="p-4">
                      <h3 className="text-xs font-medium text-gray-500 uppercase mb-3">AWS Regions</h3>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <RegionButton name="US East (N. Virginia)" code="us-east-1" />
                        <RegionButton name="US East (Ohio)" code="us-east-2" />
                        <RegionButton name="US West (Oregon)" code="us-west-2" />
                        <RegionButton name="US West (N. California)" code="us-west-1" />
                        <RegionButton name="EU (Ireland)" code="eu-west-1" />
                        <RegionButton name="EU (Frankfurt)" code="eu-central-1" />
                        <RegionButton name="Asia Pacific (Tokyo)" code="ap-northeast-1" />
                        <RegionButton name="Asia Pacific (Singapore)" code="ap-southeast-1" />
                      </div>
                      
                      <div className="mt-4 pt-3 border-t border-gray-100">
                        <a href="#" className="text-sm text-[#FF9900] font-medium hover:underline">
                          View all AWS regions
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <NavLink 
                href="#" 
                active={activeView === 'reports'} 
                onClick={() => onNavigate('reports')}
              >
                Reports
              </NavLink>
            </nav>
          </div>
          
          <div className="hidden lg:flex items-center max-w-md w-full mx-12">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search AWS Marketplace datasets..." 
                className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF9900] focus:border-[#FF9900]"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <HelpCircle className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100 relative">
              <BellDot className="w-5 h-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <button className="flex items-center gap-2 hover:bg-gray-50 p-1.5 pr-3 rounded-full border border-transparent hover:border-gray-200">
                <div className="h-8 w-8 rounded-full bg-[#FF9900]/20 flex items-center justify-center text-[#FF9900] font-medium">
                  JD
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline-block">John Doe</span>
              </button>
              
              {/* Dropdown menu - hidden by default */}
              <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white border border-gray-200 shadow-lg hidden">
                <div className="p-2">
                  <div className="px-3 py-2 text-xs text-gray-500">john.doe@example.com</div>
                  <div className="h-px bg-gray-200 my-1"></div>
                  <button className="flex w-full items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                    <User className="w-4 h-4 mr-2" />
                    Profile Settings
                  </button>
                  <button className="flex w-full items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
            
            <button className="lg:hidden p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* AWS Banner */}
      <div className="bg-gradient-to-r from-[#232F3E] to-[#00A1C9] text-white py-2 px-4 text-sm text-center">
        <span className="font-medium">New!</span> Lyzr AI agents now integrate with AWS Data Marketplace! Process, analyze, and generate insights from premium data sources. <a href="#" className="underline font-medium hover:text-blue-100">Explore integrations</a>
      </div>
    </header>
  );
};

interface MarketplaceLinkProps {
  icon: React.ReactNode;
  text: string;
  description: string;
  badge?: {
    text: string;
    color: 'blue' | 'green' | 'red' | 'amber' | 'purple';
  };
}

const MarketplaceLink: React.FC<MarketplaceLinkProps> = ({ icon, text, description, badge }) => {
  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'red': return 'bg-red-100 text-red-800';
      case 'amber': return 'bg-amber-100 text-amber-800';
      case 'purple': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <a href="#" className="flex items-center p-2 rounded-md hover:bg-[#FF9900]/10 hover:text-[#FF9900] group">
      <div className="mr-2 text-[#FF9900] group-hover:text-[#FF9900]">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <div className="text-sm text-gray-700 font-medium group-hover:text-[#FF9900]">{text}</div>
          {badge && (
            <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${getBadgeColor(badge.color)}`}>
              {badge.text}
            </span>
          )}
        </div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </a>
  );
};

interface RegionButtonProps {
  name: string;
  code: string;
}

const RegionButton: React.FC<RegionButtonProps> = ({ name, code }) => {
  return (
    <button className="flex flex-col items-start border border-gray-200 rounded-md p-2 hover:bg-gray-50 hover:border-[#FF9900] text-left">
      <span className="text-sm text-gray-700 font-medium">{name}</span>
      <span className="text-xs text-gray-500">{code}</span>
    </button>
  );
};

interface DataPartnerCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  bgColor: string;
  rating: number;
  featured?: boolean;
}

const DataPartnerCard: React.FC<DataPartnerCardProps> = ({ 
  name, 
  description, 
  icon, 
  bgColor,
  rating,
  featured = false 
}) => {
  return (
    <a 
      href="#" 
      className={`block border rounded-lg p-3 transition-all duration-200 hover:shadow-md ${
        featured ? 'border-[#FF9900] bg-[#FF9900]/10' : 'border-gray-200 hover:border-[#FF9900] hover:bg-[#FF9900]/5'
      }`}
    >
      <div className="flex items-start">
        <div className={`h-10 w-10 ${bgColor} rounded-lg flex items-center justify-center mr-3 shadow-sm`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between">
            <h4 className="text-sm font-medium text-gray-800">{name}</h4>
            <div className="flex items-center">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
              <span className="text-xs text-gray-600">{rating}</span>
            </div>
          </div>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{description}</p>
        </div>
      </div>
      {featured && (
        <div className="mt-2 text-xs text-[#FF9900] font-medium flex justify-end">
          Featured Agent
        </div>
      )}
    </a>
  );
};

const NavLink = ({ href, children, active = false, onClick }: { href: string, children: React.ReactNode, active?: boolean, onClick?: () => void }) => {
  return (
    <a 
      href={href} 
      className={`text-sm font-medium py-2 ${active ? 'text-[#FF9900] border-b-2 border-[#FF9900]' : 'text-gray-500 hover:text-gray-900'}`}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick();
      }}
    >
      {children}
    </a>
  );
};

export default Header;