import React, { useState, useEffect } from 'react';
import { Search, XCircle, ChevronRight, Filter, Clock, Star, BarChart, Server, Database, Zap, FileText, Tag, Globe, User, Sliders, ArrowUpRight, Download, CloudLightning, Code, FileCheck, ArrowDown, ArrowUp, ExternalLink as External, CheckCircle, X, LightbulbIcon, ArrowLeft, BookmarkIcon, BadgeCheck, Heart, BarChart2, ChevronDown, Zap as LucideZap, Sparkles, AlertCircle } from 'lucide-react';

interface MarketplaceBrowserProps {
  onClose: () => void;
}

// Sample data for marketplace data sources
const dataSources = [
  {
    id: 1,
    name: "Financial Market Data",
    provider: "Bloomberg Enterprise",
    category: "Financial Services",
    type: "API",
    price: "$1,000/month",
    rating: 4.8,
    reviews: 124,
    updateFrequency: "Real-time",
    description: "Comprehensive global financial market data including stocks, bonds, currencies, and commodities with real-time updates.",
    popular: true,
    regions: ["us-east-1", "eu-west-1", "ap-southeast-1"],
    format: "JSON/XML",
    sampleFields: ["ticker", "price", "volume", "timestamp", "high", "low", "open", "close"],
    compatibleWith: ["QuickSight", "SageMaker", "Redshift", "Athena"],
    verified: true,
    lastUpdated: "Today",
    subscribers: 723,
    usageTrend: "increasing",
    dataVolume: "5.8 TB/month",
    documentation: 98,
    complianceCertifications: ["SOC 2", "GDPR", "ISO 27001"]
  },
  {
    id: 2,
    name: "Healthcare Analytics Bundle",
    provider: "HealthData Inc.",
    category: "Healthcare",
    type: "S3 Bucket",
    price: "$750/month",
    rating: 4.7,
    reviews: 89,
    updateFrequency: "Daily",
    description: "HIPAA-compliant healthcare datasets including anonymized patient records, treatment outcomes, and healthcare provider metrics.",
    popular: true,
    regions: ["us-east-1", "us-west-2"],
    format: "CSV/Parquet",
    sampleFields: ["patient_id", "diagnosis", "treatment", "outcome", "provider_id", "facility"],
    compatibleWith: ["SageMaker", "QuickSight", "HealthLake"],
    verified: true,
    lastUpdated: "Yesterday",
    subscribers: 481,
    usageTrend: "stable",
    dataVolume: "3.2 TB/month",
    documentation: 92,
    complianceCertifications: ["HIPAA", "SOC 2", "HITRUST"]
  },
  {
    id: 3,
    name: "Consumer Behavior Dataset",
    provider: "Retail Analytics Co.",
    category: "Retail",
    type: "API + File",
    price: "$500/month",
    rating: 4.5,
    reviews: 67,
    updateFrequency: "Weekly",
    description: "Detailed consumer purchase behavior, demographic data, and shopping patterns across multiple retail sectors.",
    popular: false,
    regions: ["us-east-1", "eu-central-1", "ap-northeast-1"],
    format: "JSON/CSV",
    sampleFields: ["consumer_id", "purchase_date", "category", "product", "amount", "location", "channel"],
    compatibleWith: ["QuickSight", "Personalize", "SageMaker"],
    verified: false,
    lastUpdated: "Last week",
    subscribers: 356,
    usageTrend: "increasing",
    dataVolume: "1.8 TB/month",
    documentation: 85,
    complianceCertifications: ["GDPR"]
  },
  {
    id: 4,
    name: "Geospatial Data Feed",
    provider: "Mapify Technologies",
    category: "Location Services",
    type: "Streaming API",
    price: "$1,200/month",
    rating: 4.9,
    reviews: 103,
    updateFrequency: "Real-time",
    description: "High-resolution geospatial data including POI, traffic patterns, and geographic features with global coverage.",
    popular: true,
    regions: ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-1", "ap-northeast-1"],
    format: "GeoJSON/Shapefile",
    sampleFields: ["lat", "long", "poi_type", "address", "metadata", "timestamp", "accuracy"],
    compatibleWith: ["Location Service", "QuickSight", "SageMaker"],
    verified: true,
    lastUpdated: "Today",
    subscribers: 642,
    usageTrend: "increasing",
    dataVolume: "6.5 TB/month",
    documentation: 97,
    complianceCertifications: ["GDPR", "ISO 27001"]
  },
  {
    id: 5,
    name: "ESG & Sustainability Metrics",
    provider: "GreenData Global",
    category: "ESG",
    type: "File",
    price: "$600/month",
    rating: 4.6,
    reviews: 42,
    updateFrequency: "Monthly",
    description: "Environmental, social, and governance data for public companies, including carbon emissions, diversity metrics, and governance scores.",
    popular: false,
    regions: ["us-east-1", "eu-west-1"],
    format: "CSV/Excel",
    sampleFields: ["company_id", "carbon_emissions", "water_usage", "diversity_score", "governance_rating"],
    compatibleWith: ["QuickSight", "Athena", "S3 Analytics"],
    verified: false,
    lastUpdated: "2 weeks ago",
    subscribers: 218,
    usageTrend: "stable",
    dataVolume: "750 GB/month",
    documentation: 84,
    complianceCertifications: ["SASB"]
  },
  {
    id: 6,
    name: "Weather & Climate Data",
    provider: "ClimateWatch",
    category: "Environmental",
    type: "API",
    price: "$400/month",
    rating: 4.7,
    reviews: 78,
    updateFrequency: "Hourly",
    description: "Historical and forecast weather data, climate patterns, and environmental metrics with global coverage.",
    popular: false,
    regions: ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-2"],
    format: "JSON/CSV",
    sampleFields: ["timestamp", "location", "temperature", "precipitation", "wind_speed", "humidity", "pressure"],
    compatibleWith: ["SageMaker", "QuickSight", "IoT Analytics"],
    verified: true,
    lastUpdated: "Yesterday",
    subscribers: 390,
    usageTrend: "increasing",
    dataVolume: "1.2 TB/month",
    documentation: 91,
    complianceCertifications: ["ISO 9001"]
  }
];

const MarketplaceBrowser: React.FC<MarketplaceBrowserProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDataSource, setSelectedDataSource] = useState<typeof dataSources[0] | null>(null);
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'price'>('popular');
  const [showComparisonMode, setShowComparisonMode] = useState(false);
  const [comparedItems, setComparedItems] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'schema' | 'usage' | 'reviews' | 'pricing'>('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [costEstimate, setCostEstimate] = useState<{ monthly: string, annual: string } | null>(null);
  
  // Filtered data sources based on search and filters
  const filteredDataSources = dataSources.filter(source => {
    const matchesSearch = searchQuery === '' || 
      source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || source.category === selectedCategory;
    const matchesType = selectedType === null || source.type.includes(selectedType);
    
    return matchesSearch && matchesCategory && matchesType;
  });
  
  // Sort data sources
  const sortedDataSources = [...filteredDataSources].sort((a, b) => {
    if (sortBy === 'popular') {
      return a.popular === b.popular ? 0 : a.popular ? -1 : 1;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    } else {
      // Simple price sorting (would be more complex in a real app)
      return parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, ''));
    }
  });
  
  // Categories from data
  const categories = Array.from(new Set(dataSources.map(source => source.category)));
  
  // Types from data
  const types = ["API", "S3 Bucket", "File", "Streaming API"];

  // Toggle favorite status
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(item => item !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Toggle comparison item
  const toggleComparisonItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (comparedItems.includes(id)) {
      setComparedItems(comparedItems.filter(item => item !== id));
    } else {
      if (comparedItems.length < 3) {
        setComparedItems([...comparedItems, id]);
      }
    }
  };

  // Calculate cost estimate
  useEffect(() => {
    if (selectedDataSource) {
      const basePrice = parseInt(selectedDataSource.price.replace(/[^0-9]/g, ''));
      setCostEstimate({
        monthly: `$${basePrice.toLocaleString()}`,
        annual: `$${(basePrice * 12 * 0.9).toLocaleString()}`
      });
    }
  }, [selectedDataSource]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/150px-Amazon_Web_Services_Logo.svg.png" 
              alt="AWS" 
              className="h-8 mr-3" 
            />
            <div>
              <h2 className="text-lg font-bold text-gray-800">AWS Data Marketplace</h2>
              <p className="text-xs text-gray-500">Discover, subscribe, and manage third-party data products</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {showComparisonMode && (
              <button 
                onClick={() => setShowComparisonMode(false)}
                className="flex items-center text-sm text-indigo-600"
              >
                <X className="w-4 h-4 mr-1" />
                Exit Comparison
              </button>
            )}
            {!showComparisonMode && comparedItems.length > 0 && (
              <button 
                onClick={() => setShowComparisonMode(true)}
                className="flex items-center text-sm text-indigo-600"
              >
                <FileCheck className="w-4 h-4 mr-1" />
                Compare ({comparedItems.length})
              </button>
            )}
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {!showComparisonMode ? (
          <div className="flex h-[calc(90vh-70px)]">
            {/* Sidebar for filters */}
            <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
                <div className="space-y-1">
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${selectedCategory === null ? 'bg-[#FF9900] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </button>
                  {categories.map((category, index) => (
                    <button 
                      key={index}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md ${selectedCategory === category ? 'bg-[#FF9900] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Data Types</h3>
                <div className="space-y-1">
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${selectedType === null ? 'bg-[#FF9900] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setSelectedType(null)}
                  >
                    All Types
                  </button>
                  {types.map((type, index) => (
                    <button 
                      key={index}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md ${selectedType === type ? 'bg-[#FF9900] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      onClick={() => setSelectedType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700">Sort By</h3>
                  <button 
                    className="text-xs text-indigo-600 hover:text-indigo-800"
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  >
                    {showAdvancedFilters ? 'Hide Advanced' : 'Advanced Filters'}
                  </button>
                </div>
                <div className="space-y-1">
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${sortBy === 'popular' ? 'bg-[#FF9900] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setSortBy('popular')}
                  >
                    Popularity
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${sortBy === 'rating' ? 'bg-[#FF9900] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setSortBy('rating')}
                  >
                    Highest Rated
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${sortBy === 'price' ? 'bg-[#FF9900] text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => setSortBy('price')}
                  >
                    Price: Low to High
                  </button>
                </div>
              </div>
              
              {showAdvancedFilters && (
                <>
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Update Frequency</h3>
                    <div className="space-y-1">
                      {['Real-time', 'Hourly', 'Daily', 'Weekly', 'Monthly'].map((freq, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="checkbox" id={`freq-${idx}`} className="h-4 w-4 text-indigo-600 rounded" />
                          <label htmlFor={`freq-${idx}`} className="ml-2 text-sm text-gray-700">{freq}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">AWS Regions</h3>
                    <div className="space-y-1">
                      {['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'].map((region, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="checkbox" id={`region-${idx}`} className="h-4 w-4 text-indigo-600 rounded" />
                          <label htmlFor={`region-${idx}`} className="ml-2 text-sm text-gray-700">{region}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Data Format</h3>
                    <div className="space-y-1">
                      {['JSON', 'CSV', 'Parquet', 'XML', 'GeoJSON'].map((format, idx) => (
                        <div key={idx} className="flex items-center">
                          <input type="checkbox" id={`format-${idx}`} className="h-4 w-4 text-indigo-600 rounded" />
                          <label htmlFor={`format-${idx}`} className="ml-2 text-sm text-gray-700">{format}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              
              <div className="pt-4 border-t border-gray-200">
                <button 
                  className="w-full bg-[#FF9900] hover:bg-[#E68A00] text-white py-2 px-4 rounded-md text-sm font-medium"
                  onClick={() => alert('AWS Marketplace API Documentation would open')}
                >
                  API Documentation
                </button>
                <button 
                  className="w-full mt-2 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium flex items-center justify-center"
                  onClick={() => alert('Would connect to AWS Console')}
                >
                  <External className="w-4 h-4 mr-2" />
                  Open in AWS Console
                </button>
              </div>
            </div>
            
            {/* Main content area */}
            <div className="flex-1 flex flex-col">
              {/* Search bar */}
              <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search data sources..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button className="ml-2 flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                      <Filter className="w-4 h-4 mr-2 text-gray-400" />
                      Filters
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className={`p-2 border ${viewMode === 'grid' ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'} rounded-md`}
                      onClick={() => setViewMode('grid')}
                    >
                      <div className="grid grid-cols-2 gap-0.5">
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-sm"></div>
                        <div className="w-1.5 h-1.5 bg-gray-500 rounded-sm"></div>
                      </div>
                    </button>
                    <button 
                      className={`p-2 border ${viewMode === 'list' ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-200'} rounded-md`}
                      onClick={() => setViewMode('list')}
                    >
                      <div className="flex flex-col gap-0.5">
                        <div className="w-4 h-1 bg-gray-500 rounded-sm"></div>
                        <div className="w-4 h-1 bg-gray-500 rounded-sm"></div>
                        <div className="w-4 h-1 bg-gray-500 rounded-sm"></div>
                      </div>
                    </button>
                  </div>
                </div>
                
                {searchQuery && (
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <span>Results for "{searchQuery}"</span>
                    <button 
                      className="ml-2 text-indigo-600 hover:text-indigo-800"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex-1 overflow-hidden flex">
                {/* Data sources list */}
                <div className={`${selectedDataSource ? 'hidden md:block md:w-1/2' : 'w-full'} border-r border-gray-200 overflow-y-auto`}>
                  <div className="p-2">
                    <div className="text-xs text-gray-500 px-2 py-1 flex justify-between items-center">
                      <span>{filteredDataSources.length} data sources found</span>
                      <div className="flex items-center text-xs">
                        <span>Show:</span>
                        <select className="ml-1 border-none bg-transparent text-xs focus:outline-none focus:ring-0">
                          <option>All</option>
                          <option>Verified only</option>
                          <option>Favorites</option>
                        </select>
                      </div>
                    </div>
                    
                    {viewMode === 'grid' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-2">
                        {sortedDataSources.map((source) => (
                          <div 
                            key={source.id}
                            className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${selectedDataSource?.id === source.id ? 'border-[#FF9900] ring-1 ring-[#FF9900]' : 'border-gray-200'}`}
                            onClick={() => setSelectedDataSource(source)}
                          >
                            <div className="p-3">
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="text-sm font-medium text-gray-800 flex items-center">
                                    {source.name}
                                    {source.verified && (
                                      <span className="ml-1 text-blue-500">
                                        <BadgeCheck className="w-4 h-4" />
                                      </span>
                                    )}
                                  </h3>
                                  <p className="text-xs text-gray-500 mt-0.5">{source.provider}</p>
                                </div>
                                <div className="flex space-x-1">
                                  <button 
                                    onClick={(e) => toggleFavorite(source.id, e)} 
                                    className={`p-1.5 rounded-full ${favorites.includes(source.id) ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
                                  >
                                    <Heart className={`w-3.5 h-3.5 ${favorites.includes(source.id) ? 'fill-red-500' : ''}`} />
                                  </button>
                                  <button 
                                    onClick={(e) => toggleComparisonItem(source.id, e)}
                                    className={`p-1.5 rounded-full ${comparedItems.includes(source.id) ? 'text-indigo-500' : 'text-gray-400 hover:text-gray-600'}`}
                                  >
                                    <FileCheck className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                              
                              <div className="flex items-center mt-2">
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-0.5" />
                                  <span className="text-xs text-gray-600">{source.rating}</span>
                                </div>
                                <span className="mx-1.5 text-gray-300">•</span>
                                <span className="text-xs text-gray-500">{source.reviews} reviews</span>
                              </div>
                              
                              <p className="mt-2 text-xs text-gray-600 line-clamp-2">{source.description}</p>
                              
                              <div className="mt-2 flex flex-wrap gap-1">
                                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] rounded-full">
                                  {source.type}
                                </span>
                                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] rounded-full">
                                  {source.updateFrequency}
                                </span>
                                <span className="px-1.5 py-0.5 bg-gray-100 text-gray-700 text-[10px] rounded-full">
                                  {source.category}
                                </span>
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 px-3 py-2 border-t border-gray-200 flex justify-between items-center">
                              <div className="text-sm font-medium text-gray-900">{source.price}</div>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="w-3 h-3 mr-1" />
                                <span>Updated {source.lastUpdated}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {sortedDataSources.map((source) => (
                          <div 
                            key={source.id}
                            className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${selectedDataSource?.id === source.id ? 'border-[#FF9900] bg-[#FF9900]/5' : 'border-gray-200 hover:border-gray-300'}`}
                            onClick={() => setSelectedDataSource(source)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h3 className="text-sm font-medium text-gray-800 flex items-center">
                                  {source.name}
                                  {source.verified && (
                                    <span className="ml-1 text-blue-500">
                                      <BadgeCheck className="w-4 h-4" />
                                    </span>
                                  )}
                                </h3>
                                <div className="mt-1 flex items-center text-xs text-gray-500">
                                  <span className="mr-2">{source.provider}</span>
                                  <span className="px-1.5 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                                    {source.category}
                                  </span>
                                  {source.popular && (
                                    <span className="ml-2 px-1.5 py-0.5 bg-[#FF9900]/10 text-[#FF9900] rounded-full text-xs font-medium">
                                      Popular
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex space-x-1">
                                <button 
                                  onClick={(e) => toggleFavorite(source.id, e)} 
                                  className={`p-1.5 rounded-full ${favorites.includes(source.id) ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${favorites.includes(source.id) ? 'fill-red-500' : ''}`} />
                                </button>
                                <button 
                                  onClick={(e) => toggleComparisonItem(source.id, e)}
                                  className={`p-1.5 rounded-full ${comparedItems.includes(source.id) ? 'text-indigo-500' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                  <FileCheck className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            
                            <div className="mt-2 flex items-center justify-between">
                              <div className="flex items-center text-xs text-gray-500">
                                <Database className="w-3 h-3 mr-1" />
                                {source.type}
                                <Clock className="w-3 h-3 ml-2 mr-1" />
                                {source.updateFrequency}
                                <div className="ml-2 flex items-center">
                                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-0.5" />
                                  <span>{source.rating}</span>
                                </div>
                              </div>
                              <div className="text-sm font-medium text-gray-800">{source.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {filteredDataSources.length === 0 && (
                      <div className="text-center py-8">
                        <BarChart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                        <h3 className="text-sm font-medium text-gray-700">No data sources found</h3>
                        <p className="text-xs text-gray-500 mt-1">Try adjusting your filters or search terms</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Data source details */}
                {selectedDataSource && (
                  <div className={`${selectedDataSource ? 'w-full md:w-1/2' : 'hidden'} overflow-y-auto`}>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <button 
                          className="md:hidden flex items-center text-sm text-[#FF9900]"
                          onClick={() => setSelectedDataSource(null)}
                        >
                          <ArrowLeft className="w-4 h-4 mr-1" />
                          Back to list
                        </button>
                        <div className="flex space-x-2">
                          <button 
                            onClick={(e) => toggleFavorite(selectedDataSource.id, e)}
                            className={`px-2 py-1 text-xs font-medium rounded flex items-center ${
                              favorites.includes(selectedDataSource.id) 
                                ? 'bg-red-50 text-red-700 border border-red-200' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <Heart className={`w-3 h-3 mr-1 ${favorites.includes(selectedDataSource.id) ? 'fill-red-500' : ''}`} />
                            {favorites.includes(selectedDataSource.id) ? 'Favorited' : 'Favorite'}
                          </button>
                          <button 
                            onClick={(e) => toggleComparisonItem(selectedDataSource.id, e)}
                            className={`px-2 py-1 text-xs font-medium rounded flex items-center ${
                              comparedItems.includes(selectedDataSource.id) 
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <FileCheck className="w-3 h-3 mr-1" />
                            {comparedItems.includes(selectedDataSource.id) ? 'Added to Compare' : 'Compare'}
                          </button>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-lg font-bold text-gray-800 flex items-center">
                              {selectedDataSource.name}
                              {selectedDataSource.verified && (
                                <span className="ml-1 text-blue-500">
                                  <BadgeCheck className="w-5 h-5" />
                                </span>
                              )}
                            </h2>
                            <div className="flex items-center mt-1">
                              <span className="text-sm text-gray-600 mr-2">{selectedDataSource.provider}</span>
                              <div className="flex items-center">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                                <span className="text-xs text-gray-600">{selectedDataSource.rating} ({selectedDataSource.reviews} reviews)</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-white px-4 py-3 rounded-lg border border-gray-200 text-center">
                            <div className="text-xs text-gray-500">Marketplace Price</div>
                            <div className="text-lg font-bold text-gray-900">{selectedDataSource.price}</div>
                            <div className="text-xs text-gray-500">{selectedDataSource.price.includes('year') ? 'per year' : 'per month'}</div>
                          </div>
                        </div>
                        
                        <p className="mt-3 text-sm text-gray-600">{selectedDataSource.description}</p>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          {selectedDataSource.verified && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center">
                              <BadgeCheck className="w-3 h-3 mr-1" />
                              AWS Verified
                            </span>
                          )}
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {selectedDataSource.type}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {selectedDataSource.updateFrequency}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            {selectedDataSource.subscribers}+ subscribers
                          </span>
                        </div>
                      </div>
                      
                      {/* Tabs for different views */}
                      <div className="border-b border-gray-200 mb-4">
                        <div className="flex -mb-px">
                          <button 
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'overview' ? 'text-[#FF9900] border-b-2 border-[#FF9900]' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('overview')}
                          >
                            Overview
                          </button>
                          <button 
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'schema' ? 'text-[#FF9900] border-b-2 border-[#FF9900]' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('schema')}
                          >
                            Schema & Sample
                          </button>
                          <button 
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'usage' ? 'text-[#FF9900] border-b-2 border-[#FF9900]' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('usage')}
                          >
                            Usage
                          </button>
                          <button 
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'reviews' ? 'text-[#FF9900] border-b-2 border-[#FF9900]' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('reviews')}
                          >
                            Reviews
                          </button>
                          <button 
                            className={`px-4 py-2 text-sm font-medium ${activeTab === 'pricing' ? 'text-[#FF9900] border-b-2 border-[#FF9900]' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setActiveTab('pricing')}
                          >
                            Pricing
                          </button>
                        </div>
                      </div>
                      
                      {/* Overview Tab Content */}
                      {activeTab === 'overview' && (
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Globe className="w-4 h-4 text-[#FF9900] mr-2" />
                                Available AWS Regions
                              </h3>
                              <div className="grid grid-cols-2 gap-2">
                                {selectedDataSource.regions.map((region, index) => (
                                  <div key={index} className="text-xs text-gray-600 py-1 px-2 bg-gray-50 rounded flex items-center">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></div>
                                    {region}
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="border border-gray-200 rounded-lg p-4">
                              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Server className="w-4 h-4 text-[#FF9900] mr-2" />
                                Compatible AWS Services
                              </h3>
                              <div className="flex flex-wrap gap-1">
                                {selectedDataSource.compatibleWith.map((service, index) => (
                                  <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                                    {service}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                              <h3 className="text-xs text-gray-500 uppercase mb-1">Subscribers</h3>
                              <div className="flex items-center">
                                <div className="text-xl font-bold text-gray-800 mr-2">{selectedDataSource.subscribers}</div>
                                <div className={`px-2 py-0.5 text-xs rounded-full ${selectedDataSource.usageTrend === 'increasing' ? 'bg-green-100 text-green-800' : selectedDataSource.usageTrend === 'decreasing' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                                  {selectedDataSource.usageTrend === 'increasing' ? '↑ Rising' : selectedDataSource.usageTrend === 'decreasing' ? '↓ Declining' : '→ Stable'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="border border-gray-200 rounded-lg p-4">
                              <h3 className="text-xs text-gray-500 uppercase mb-1">Data Volume</h3>
                              <div className="text-xl font-bold text-gray-800">{selectedDataSource.dataVolume}</div>
                            </div>
                            
                            <div className="border border-gray-200 rounded-lg p-4">
                              <h3 className="text-xs text-gray-500 uppercase mb-1">Documentation</h3>
                              <div className="flex items-center">
                                <div className="text-xl font-bold text-gray-800 mr-2">{selectedDataSource.documentation}/100</div>
                                <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${selectedDataSource.documentation > 90 ? 'bg-green-500' : selectedDataSource.documentation > 70 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                    style={{ width: `${selectedDataSource.documentation}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 rounded-lg p-4 mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Compliance & Security</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedDataSource.complianceCertifications.map((cert, index) => (
                                <div key={index} className="bg-gray-50 px-3 py-2 rounded text-sm text-gray-700 flex items-center border border-gray-200">
                                  <Shield className="w-4 h-4 text-green-500 mr-2" />
                                  {cert}
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 rounded-lg p-4 mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                              <Zap className="w-4 h-4 text-[#FF9900] mr-2" />
                              Lyzr AI Integration
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                              <div className="bg-[#FF9900]/10 p-3 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-800">Data Enrichment Agent</h4>
                                    <p className="text-xs text-gray-600 mt-1">Enhance this dataset with additional fields and metadata.</p>
                                  </div>
                                  <button className="px-2 py-1 text-xs bg-[#FF9900] text-white rounded">
                                    Connect
                                  </button>
                                </div>
                              </div>
                              
                              <div className="bg-indigo-50 p-3 rounded-lg">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="text-sm font-medium text-indigo-900">Visualization Agent</h4>
                                    <p className="text-xs text-indigo-700 mt-1">Automatically generate visualizations from this data.</p>
                                  </div>
                                  <button className="px-2 py-1 text-xs bg-indigo-600 text-white rounded">
                                    Connect
                                  </button>
                                </div>
                              </div>
                              
                              <div className="mt-3 p-3 border border-gray-200 rounded-lg">
                                <h4 className="text-sm font-medium text-gray-800 flex items-center">
                                  <LightbulbIcon className="w-4 h-4 text-amber-500 mr-1.5" />
                                  AI-Powered Recommendations
                                </h4>
                                <p className="text-xs text-gray-600 mt-1">
                                  Our analysis shows this dataset would be most valuable when combined with:
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  <div className="border border-gray-200 rounded px-2 py-1 text-xs bg-white">
                                    Consumer Behavior Dataset (+34% insights)
                                  </div>
                                  <div className="border border-gray-200 rounded px-2 py-1 text-xs bg-white">
                                    Weather & Climate Data (+28% correlation)
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gradient-to-r from-[#232F3E] to-[#00A1C9] text-white p-4 rounded-lg shadow-sm">
                            <div className="flex items-center">
                              <LucideZap className="w-10 h-10 mr-3" />
                              <div>
                                <h3 className="font-medium">Deploy with One Click</h3>
                                <p className="text-sm text-white/80 mt-1">
                                  Use our templates to instantly connect this data to your AWS environment with proper IAM roles and policies.
                                </p>
                              </div>
                            </div>
                            <button className="mt-3 w-full bg-[#FF9900] hover:bg-[#E68A00] text-white py-2 rounded font-medium text-sm">
                              Deploy to Your AWS Account
                            </button>
                          </div>
                        </div>
                      )}
                      
                      {/* Schema & Sample Tab Content */}
                      {activeTab === 'schema' && (
                        <div>
                          <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Data Format</h3>
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex items-center justify-between">
                              <div className="flex items-center">
                                <FileText className="w-4 h-4 text-indigo-600 mr-2" />
                                <span className="text-sm text-gray-700">{selectedDataSource.format}</span>
                              </div>
                              <button className="text-xs text-indigo-600 font-medium">
                                View Sample File
                              </button>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-sm font-medium text-gray-700">Schema Definition</h3>
                              <button className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded flex items-center">
                                <Download className="w-3 h-3 mr-1" />
                                Download Schema
                              </button>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 overflow-auto">
                              <pre className="text-xs text-gray-700">
{`{
  "type": "object",
  "properties": {
    ${selectedDataSource.sampleFields.map(field => `"${field}": { "type": "${typeof field === 'string' && field.includes('date') ? 'string' : field.includes('id') ? 'string' : typeof field === 'string' && !isNaN(Date.parse(field)) ? 'string' : 'string'}", "description": "Description of ${field}" }`).join(',\n    ')}
  },
  "required": [${selectedDataSource.sampleFields.slice(0, 3).map(field => `"${field}"`).join(', ')}]
}`}
                              </pre>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="text-sm font-medium text-gray-700">Sample Data (Preview)</h3>
                              <div className="flex items-center text-xs text-gray-500">
                                <span>Showing 5 of 100 records</span>
                              </div>
                            </div>
                            <div className="border border-gray-200 rounded-lg overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    {selectedDataSource.sampleFields.map((field, idx) => (
                                      <th key={idx} className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        {field}
                                      </th>
                                    ))}
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {Array.from({ length: 5 }).map((_, rowIdx) => (
                                    <tr key={rowIdx}>
                                      {selectedDataSource.sampleFields.map((field, colIdx) => (
                                        <td key={colIdx} className="px-3 py-2 whitespace-nowrap text-xs text-gray-500">
                                          {field.includes('id') ? `${field.replace('_id', '')}_${rowIdx + 1}` : 
                                          field.includes('date') || field.includes('timestamp') ? `2023-${(rowIdx + 1).toString().padStart(2, '0')}-${(colIdx + 1).toString().padStart(2, '0')}` :
                                          field.includes('price') ? `$${(rowIdx + 1) * 10 + colIdx}` :
                                          field.includes('name') ? `Sample ${field} ${rowIdx + 1}` :
                                          `Sample data ${rowIdx + 1}-${colIdx + 1}`}
                                        </td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Data Quality Metrics</h3>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                                <h4 className="text-xs text-green-800 font-medium">Completeness</h4>
                                <div className="mt-1 flex items-center">
                                  <div className="text-lg font-bold text-green-900 mr-1">98%</div>
                                  <div className="text-xs text-green-700">complete</div>
                                </div>
                              </div>
                              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                <h4 className="text-xs text-blue-800 font-medium">Consistency</h4>
                                <div className="mt-1 flex items-center">
                                  <div className="text-lg font-bold text-blue-900 mr-1">97%</div>
                                  <div className="text-xs text-blue-700">consistent</div>
                                </div>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                                <h4 className="text-xs text-purple-800 font-medium">Accuracy</h4>
                                <div className="mt-1 flex items-center">
                                  <div className="text-lg font-bold text-purple-900 mr-1">95%</div>
                                  <div className="text-xs text-purple-700">accurate</div>
                                </div>
                              </div>
                              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                                <h4 className="text-xs text-yellow-800 font-medium">Timeliness</h4>
                                <div className="mt-1 flex items-center">
                                  <div className="text-lg font-bold text-yellow-900 mr-1">99%</div>
                                  <div className="text-xs text-yellow-700">on time</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                            <div className="flex items-start">
                              <Sparkles className="w-5 h-5 text-indigo-600 mt-0.5 mr-2" />
                              <div>
                                <h3 className="text-sm font-medium text-indigo-800 mb-1">Lyzr AI Schema Analysis</h3>
                                <p className="text-xs text-indigo-700">
                                  Our AI detected that this schema pairs well with your existing data model. 
                                  We recommend using our Schema Mapping Agent to automatically create joins and relationships.
                                </p>
                                <button className="mt-2 bg-indigo-600 text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-indigo-700">
                                  Generate Schema Mappings
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Usage Tab Content */}
                      {activeTab === 'usage' && (
                        <div>
                          <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Integration Methods</h3>
                            <div className="space-y-3">
                              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-start">
                                    <div className="bg-indigo-100 p-2 rounded-md mr-3">
                                      <Code className="w-4 h-4 text-indigo-700" />
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-800">AWS SDK Integration</h4>
                                      <p className="text-xs text-gray-600 mt-1">Access using standard AWS SDK for your preferred language.</p>
                                    </div>
                                  </div>
                                  <button className="text-xs text-indigo-600 font-medium">
                                    View Docs
                                  </button>
                                </div>
                              </div>
                              
                              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-start">
                                    <div className="bg-green-100 p-2 rounded-md mr-3">
                                      <Server className="w-4 h-4 text-green-700" />
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-800">Direct API Access</h4>
                                      <p className="text-xs text-gray-600 mt-1">REST API endpoints for programmatic access across services.</p>
                                    </div>
                                  </div>
                                  <button className="text-xs text-indigo-600 font-medium">
                                    View Docs
                                  </button>
                                </div>
                              </div>
                              
                              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-start">
                                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                                      <Database className="w-4 h-4 text-blue-700" />
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium text-gray-800">AWS Data Exchange</h4>
                                      <p className="text-xs text-gray-600 mt-1">Automatic updates through AWS Data Exchange subscription.</p>
                                    </div>
                                  </div>
                                  <button className="text-xs text-indigo-600 font-medium">
                                    View Docs
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Sample Code</h3>
                            <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                              <pre className="text-xs text-gray-300">
{`// Python Example
import boto3

client = boto3.client('dataexchange')

response = client.get_dataset(
    DataSetId='${selectedDataSource.id.toString().padStart(8, '0')}'
)

# Access the dataset 
assets = client.list_revision_assets(
    DataSetId='${selectedDataSource.id.toString().padStart(8, '0')}',
    RevisionId='latest'
)

# Process the assets
for asset in assets['Assets']:
    print(f"Asset Name: {asset['Name']}")
    # Download and process the asset...`}
                              </pre>
                            </div>
                            <div className="mt-2 flex justify-between">
                              <div className="flex space-x-2">
                                <button className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-200">
                                  Python
                                </button>
                                <button className="text-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-100">
                                  JavaScript
                                </button>
                                <button className="text-gray-700 text-xs px-2 py-1 rounded hover:bg-gray-100">
                                  Java
                                </button>
                              </div>
                              <button className="text-xs text-indigo-600 font-medium">
                                Copy Code
                              </button>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2">Rate Limits & Quotas</h3>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">API Method</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Requests per Second</th>
                                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">Daily Quota</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  <tr>
                                    <td className="px-3 py-2 text-xs text-gray-700">List Datasets</td>
                                    <td className="px-3 py-2 text-xs text-gray-700">20</td>
                                    <td className="px-3 py-2 text-xs text-gray-700">100,000</td>
                                  </tr>
                                  <tr>
                                    <td className="px-3 py-2 text-xs text-gray-700">Get Dataset</td>
                                    <td className="px-3 py-2 text-xs text-gray-700">50</td>
                                    <td className="px-3 py-2 text-xs text-gray-700">500,000</td>
                                  </tr>
                                  <tr>
                                    <td className="px-3 py-2 text-xs text-gray-700">Query Data</td>
                                    <td className="px-3 py-2 text-xs text-gray-700">30</td>
                                    <td className="px-3 py-2 text-xs text-gray-700">200,000</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                              <h3 className="text-sm font-medium text-gray-700 mb-2">Example Use Cases</h3>
                              <div className="space-y-2">
                                <div className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                  <div className="text-sm text-gray-700">Predictive analytics for market trends</div>
                                </div>
                                <div className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                  <div className="text-sm text-gray-700">Real-time dashboards and reporting</div>
                                </div>
                                <div className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                  <div className="text-sm text-gray-700">Risk assessment and modeling</div>
                                </div>
                                <div className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                  <div className="text-sm text-gray-700">ML model training and validation</div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border border-gray-200 rounded-lg p-4">
                              <h3 className="text-sm font-medium text-gray-700 mb-2">Reference Customers</h3>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="bg-gray-100 h-10 rounded-md flex items-center justify-center text-xs text-gray-500">
                                  Company A
                                </div>
                                <div className="bg-gray-100 h-10 rounded-md flex items-center justify-center text-xs text-gray-500">
                                  Company B
                                </div>
                                <div className="bg-gray-100 h-10 rounded-md flex items-center justify-center text-xs text-gray-500">
                                  Company C
                                </div>
                                <div className="bg-gray-100 h-10 rounded-md flex items-center justify-center text-xs text-gray-500">
                                  Company D
                                </div>
                                <div className="bg-gray-100 h-10 rounded-md flex items-center justify-center text-xs text-gray-500">
                                  Company E
                                </div>
                                <div className="bg-gray-100 h-10 rounded-md flex items-center justify-center text-xs text-gray-500">
                                  +23 more
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                            <div className="flex items-start">
                              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 mr-2" />
                              <div>
                                <h3 className="text-sm font-medium text-amber-800 mb-1">Usage Advisory</h3>
                                <p className="text-xs text-amber-700">
                                  This dataset provides real-time updates which may incur additional data transfer costs. 
                                  We recommend implementing caching strategies for non-critical applications.
                                </p>
                                <button className="mt-2 bg-amber-600 text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-amber-700">
                                  View Cost Optimization Guide
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Reviews Tab Content */}
                      {activeTab === 'reviews' && (
                        <div>
                          <div className="mb-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <div className="mr-4">
                                  <div className="text-4xl font-bold text-gray-900">{selectedDataSource.rating}</div>
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                      <Star 
                                        key={idx} 
                                        className={`w-4 h-4 ${idx < Math.floor(selectedDataSource.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                      />
                                    ))}
                                  </div>
                                  <div className="text-xs text-gray-500 mt-1">{selectedDataSource.reviews} reviews</div>
                                </div>
                                <div className="flex-1">
                                  <div className="space-y-1">
                                    {[5, 4, 3, 2, 1].map(stars => {
                                      // Generate percentage based on rating
                                      const percentage = stars === 5 ? 70 :
                                                        stars === 4 ? 20 :
                                                        stars === 3 ? 7 :
                                                        stars === 2 ? 2 : 1;
                                      return (
                                        <div key={stars} className="flex items-center">
                                          <div className="flex items-center w-24">
                                            <span className="text-xs text-gray-500 mr-1">{stars}</span>
                                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500 mr-1" />
                                            <span className="text-xs text-gray-500 w-10">{percentage}%</span>
                                          </div>
                                          <div className="flex-1">
                                            <div className="h-1.5 w-full bg-gray-200 rounded-full">
                                              <div className="h-1.5 bg-yellow-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                              <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded hover:bg-indigo-700">
                                Write Review
                              </button>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-3">
                              <h3 className="text-sm font-medium text-gray-700">Customer Reviews</h3>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">Filter:</span>
                                <select className="text-xs border border-gray-200 rounded p-1 bg-white">
                                  <option>All Ratings</option>
                                  <option>5 Star Only</option>
                                  <option>4 Star Only</option>
                                  <option>3 Star and below</option>
                                </select>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              {/* Review 1 */}
                              <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center">
                                      <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-800 font-medium text-sm">
                                        JD
                                      </div>
                                      <div className="ml-3">
                                        <div className="text-sm font-medium text-gray-800">John Doe</div>
                                        <div className="text-xs text-gray-500">Data Scientist at Company X</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className="flex">
                                      {Array.from({ length: 5 }).map((_, idx) => (
                                        <Star key={idx} className={`w-3 h-3 ${idx < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                                      ))}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">2 days ago</div>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <h4 className="text-sm font-medium text-gray-800">Excellent data quality and reliability</h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    We've been using this dataset for our financial forecasting models and have been impressed with both the data quality and the reliability of updates. The documentation is thorough and the support team is responsive.
                                  </p>
                                </div>
                                <div className="mt-3 flex items-center text-xs text-gray-500">
                                  <span>Was this review helpful?</span>
                                  <button className="ml-2 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">Yes</button>
                                  <button className="ml-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">No</button>
                                </div>
                              </div>
                              
                              {/* Review 2 */}
                              <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center">
                                      <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-medium text-sm">
                                        SJ
                                      </div>
                                      <div className="ml-3">
                                        <div className="text-sm font-medium text-gray-800">Sarah Johnson</div>
                                        <div className="text-xs text-gray-500">Data Engineer at Company Y</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className="flex">
                                      {Array.from({ length: 5 }).map((_, idx) => (
                                        <Star key={idx} className={`w-3 h-3 ${idx < 4 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                                      ))}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">1 week ago</div>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <h4 className="text-sm font-medium text-gray-800">Good dataset but needs more documentation</h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    The data quality is excellent and updates are reliable. However, I found the documentation lacking for some of the more advanced use cases. Would appreciate more code examples for different programming languages.
                                  </p>
                                </div>
                                <div className="mt-3 flex items-center text-xs text-gray-500">
                                  <span>Was this review helpful?</span>
                                  <button className="ml-2 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">Yes</button>
                                  <button className="ml-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">No</button>
                                </div>
                              </div>
                              
                              {/* Review 3 */}
                              <div className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <div className="flex items-center">
                                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-medium text-sm">
                                        MR
                                      </div>
                                      <div className="ml-3">
                                        <div className="text-sm font-medium text-gray-800">Michael Rodriguez</div>
                                        <div className="text-xs text-gray-500">CTO at Company Z</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <div className="flex">
                                      {Array.from({ length: 5 }).map((_, idx) => (
                                        <Star key={idx} className={`w-3 h-3 ${idx < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} />
                                      ))}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1">1 month ago</div>
                                  </div>
                                </div>
                                <div className="mt-3">
                                  <h4 className="text-sm font-medium text-gray-800">Perfect for our trading algorithms</h4>
                                  <p className="text-sm text-gray-600 mt-1">
                                    We've integrated this dataset into our algorithmic trading platform and it has significantly improved our models' accuracy. The real-time updates are reliable and the API is well-designed. Highly recommend for anyone in the financial sector.
                                  </p>
                                </div>
                                <div className="mt-3 flex items-center text-xs text-gray-500">
                                  <span>Was this review helpful?</span>
                                  <button className="ml-2 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">Yes</button>
                                  <button className="ml-1 px-2 py-1 bg-gray-100 rounded hover:bg-gray-200">No</button>
                                </div>
                              </div>
                              
                              <div className="text-center">
                                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800">
                                  Show more reviews
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Pricing Tab Content */}
                      {activeTab === 'pricing' && (
                        <div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="md:col-span-2 border border-gray-200 rounded-lg shadow-sm">
                              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-t-lg">
                                <h3 className="text-lg font-medium">Standard Subscription</h3>
                                <p className="text-sm text-white/80 mt-1">Full access to the dataset with regular updates</p>
                              </div>
                              <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                  <div>
                                    <div className="text-3xl font-bold text-gray-900">{selectedDataSource.price}</div>
                                    <div className="text-sm text-gray-500 mt-1">per month, billed monthly</div>
                                  </div>
                                  <button className="bg-[#FF9900] text-white px-4 py-2 rounded font-medium text-sm hover:bg-[#E68A00]">
                                    Subscribe Now
                                  </button>
                                </div>
                                
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                  <h4 className="text-sm font-medium text-gray-800 mb-3">What's included:</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-start">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                      <div className="text-sm text-gray-700">Full access to all data fields</div>
                                    </div>
                                    <div className="flex items-start">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                      <div className="text-sm text-gray-700">{selectedDataSource.updateFrequency} updates</div>
                                    </div>
                                    <div className="flex items-start">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                      <div className="text-sm text-gray-700">Access via API and AWS Data Exchange</div>
                                    </div>
                                    <div className="flex items-start">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                      <div className="text-sm text-gray-700">Basic support via email</div>
                                    </div>
                                    <div className="flex items-start">
                                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                      <div className="text-sm text-gray-700">Historical data (12 months)</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="border border-gray-200 rounded-lg shadow-sm">
                              <div className="bg-gray-50 p-4 rounded-t-lg border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-800">Cost Calculator</h3>
                                <p className="text-sm text-gray-600 mt-1">Estimate your costs</p>
                              </div>
                              <div className="p-4">
                                <div className="mb-3">
                                  <label className="text-xs text-gray-500 mb-1 block">Subscription Type</label>
                                  <select className="w-full border border-gray-200 rounded-md p-2 text-sm">
                                    <option>Monthly</option>
                                    <option>Annual (15% discount)</option>
                                  </select>
                                </div>
                                
                                <div className="mb-3">
                                  <label className="text-xs text-gray-500 mb-1 block">Data Volume</label>
                                  <select className="w-full border border-gray-200 rounded-md p-2 text-sm">
                                    <option>Standard</option>
                                    <option>Enterprise (Contact for pricing)</option>
                                  </select>
                                </div>
                                
                                <div className="border-t border-gray-200 pt-4 mt-4">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">Monthly cost:</span>
                                    <span className="text-lg font-bold text-gray-900">{costEstimate?.monthly}</span>
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">Annual cost:</span>
                                    <span className="text-lg font-bold text-gray-900">{costEstimate?.annual}</span>
                                  </div>
                                  <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                                    <span>Save with annual billing:</span>
                                    <span>$1,200/year</span>
                                  </div>
                                </div>
                                
                                <button className="w-full mt-4 border border-indigo-600 text-indigo-600 px-4 py-2 rounded font-medium text-sm hover:bg-indigo-50">
                                  Request Quote
                                </button>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border border-gray-200 rounded-lg p-4 mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-3">Additional Pricing Details</h3>
                            <div className="space-y-3">
                              <div className="flex items-start">
                                <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                                <div className="text-sm text-gray-700">
                                  <span className="font-medium">Data Transfer Costs:</span> Standard AWS data transfer rates apply for data egress out of AWS.
                                </div>
                              </div>
                              <div className="flex items-start">
                                <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                                <div className="text-sm text-gray-700">
                                  <span className="font-medium">Custom Pricing:</span> Contact us for custom pricing for higher volume needs or enterprise agreements.
                                </div>
                              </div>
                              <div className="flex items-start">
                                <ArrowRight className="w-4 h-4 text-gray-500 mt-0.5 mr-2" />
                                <div className="text-sm text-gray-700">
                                  <span className="font-medium">Free Trial:</span> 14-day trial available with limited data access.
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="border border-gray-200 rounded-lg p-4">
                              <h3 className="text-sm font-medium text-gray-700 mb-2">Enterprise Options</h3>
                              <p className="text-sm text-gray-600 mb-3">
                                Need custom data integration, SLAs, or higher volume pricing? Our enterprise options provide:
                              </p>
                              <div className="space-y-2">
                                <div className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                  <div className="text-sm text-gray-700">Dedicated support manager</div>
                                </div>
                                <div className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                  <div className="text-sm text-gray-700">Custom data transformation</div>
                                </div>
                                <div className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                  <div className="text-sm text-gray-700">Higher rate limits and data volume</div>
                                </div>
                                <div className="flex items-start">
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 mr-2" />
                                  <div className="text-sm text-gray-700">Advanced security controls</div>
                                </div>
                              </div>
                              <button className="mt-4 w-full bg-gray-800 text-white px-4 py-2 rounded font-medium text-sm hover:bg-gray-700">
                                Contact Sales
                              </button>
                            </div>
                            
                            <div className="border border-gray-200 rounded-lg p-4">
                              <h3 className="text-sm font-medium text-gray-700 mb-2">Need Help Deciding?</h3>
                              <div className="space-y-3">
                                <div className="flex items-start">
                                  <BarChart2 className="w-4 h-4 text-indigo-600 mt-0.5 mr-2" />
                                  <div>
                                    <div className="text-sm font-medium text-gray-800">ROI Calculator</div>
                                    <div className="text-xs text-gray-600">Estimate potential ROI from using this data</div>
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <UserCheck className="w-4 h-4 text-indigo-600 mt-0.5 mr-2" />
                                  <div>
                                    <div className="text-sm font-medium text-gray-800">Speak with an Expert</div>
                                    <div className="text-xs text-gray-600">Get personalized recommendations</div>
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <MessageSquare className="w-4 h-4 text-indigo-600 mt-0.5 mr-2" />
                                  <div>
                                    <div className="text-sm font-medium text-gray-800">Chat with Support</div>
                                    <div className="text-xs text-gray-600">Ask technical questions</div>
                                  </div>
                                </div>
                                <div className="flex items-start">
                                  <Rocket className="w-4 h-4 text-indigo-600 mt-0.5 mr-2" />
                                  <div>
                                    <div className="text-sm font-medium text-gray-800">Schedule Demo</div>
                                    <div className="text-xs text-gray-600">See the data in action</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-center">
                              <h3 className="text-sm font-medium text-gray-800">Ready to subscribe?</h3>
                              <button className="bg-[#FF9900] text-white px-6 py-2 rounded font-medium text-sm hover:bg-[#E68A00]">
                                Subscribe Now
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mt-6">
                        <a href="#" className="text-sm text-[#FF9900] flex items-center">
                          <External className="w-4 h-4 mr-1" />
                          View in AWS Console
                        </a>
                        <button className="px-4 py-2 bg-[#FF9900] text-white rounded-md text-sm font-medium flex items-center hover:bg-[#E68A00]">
                          <CloudLightning className="w-4 h-4 mr-2" />
                          Subscribe & Deploy
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Comparison Mode
          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Compare Data Sources</h2>
              <p className="text-sm text-gray-600">Comparing {comparedItems.length} data sources</p>
            </div>
            
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">
                      Criteria
                    </th>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <th key={id} className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <div className="flex flex-col">
                            <span>{source.name}</span>
                            <span className="text-[10px] normal-case font-normal text-gray-400">{source.provider}</span>
                          </div>
                        </th>
                      ) : null;
                    })}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Price row */}
                  <tr>
                    <td className="px-3 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white z-10">
                      Price
                    </td>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <td key={id} className="px-3 py-3 text-sm text-gray-700">
                          {source.price}
                        </td>
                      ) : null;
                    })}
                  </tr>
                  
                  {/* Rating row */}
                  <tr className="bg-gray-50">
                    <td className="px-3 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-gray-50 z-10">
                      Rating
                    </td>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <td key={id} className="px-3 py-3 text-sm text-gray-700">
                          <div className="flex items-center">
                            <span className="mr-1">{source.rating}</span>
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 text-xs text-gray-500">({source.reviews})</span>
                          </div>
                        </td>
                      ) : null;
                    })}
                  </tr>
                  
                  {/* Type row */}
                  <tr>
                    <td className="px-3 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white z-10">
                      Type
                    </td>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <td key={id} className="px-3 py-3 text-sm text-gray-700">
                          {source.type}
                        </td>
                      ) : null;
                    })}
                  </tr>
                  
                  {/* Update Frequency row */}
                  <tr className="bg-gray-50">
                    <td className="px-3 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-gray-50 z-10">
                      Update Frequency
                    </td>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <td key={id} className="px-3 py-3 text-sm text-gray-700">
                          {source.updateFrequency}
                        </td>
                      ) : null;
                    })}
                  </tr>
                  
                  {/* Available Regions row */}
                  <tr>
                    <td className="px-3 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white z-10">
                      Available Regions
                    </td>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <td key={id} className="px-3 py-3 text-sm text-gray-700">
                          {source.regions.length} regions
                          <div className="flex flex-wrap gap-1 mt-1">
                            {source.regions.slice(0, 2).map((region, idx) => (
                              <span key={idx} className="text-xs bg-gray-100 rounded px-1.5 py-0.5">
                                {region}
                              </span>
                            ))}
                            {source.regions.length > 2 && (
                              <span className="text-xs bg-gray-100 rounded px-1.5 py-0.5">
                                +{source.regions.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                      ) : null;
                    })}
                  </tr>
                  
                  {/* Data Format row */}
                  <tr className="bg-gray-50">
                    <td className="px-3 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-gray-50 z-10">
                      Data Format
                    </td>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <td key={id} className="px-3 py-3 text-sm text-gray-700">
                          {source.format}
                        </td>
                      ) : null;
                    })}
                  </tr>
                  
                  {/* Subscribers row */}
                  <tr>
                    <td className="px-3 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white z-10">
                      Subscribers
                    </td>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <td key={id} className="px-3 py-3 text-sm text-gray-700">
                          {source.subscribers}+
                        </td>
                      ) : null;
                    })}
                  </tr>
                  
                  {/* Compatible Services row */}
                  <tr className="bg-gray-50">
                    <td className="px-3 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-gray-50 z-10">
                      Compatible AWS Services
                    </td>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <td key={id} className="px-3 py-3 text-sm text-gray-700">
                          <div className="flex flex-wrap gap-1">
                            {source.compatibleWith.slice(0, 2).map((service, idx) => (
                              <span key={idx} className="text-xs bg-blue-50 text-blue-700 rounded px-1.5 py-0.5">
                                {service}
                              </span>
                            ))}
                            {source.compatibleWith.length > 2 && (
                              <span className="text-xs bg-blue-50 text-blue-700 rounded px-1.5 py-0.5">
                                +{source.compatibleWith.length - 2} more
                              </span>
                            )}
                          </div>
                        </td>
                      ) : null;
                    })}
                  </tr>
                  
                  {/* Data Volume row */}
                  <tr>
                    <td className="px-3 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white z-10">
                      Data Volume
                    </td>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <td key={id} className="px-3 py-3 text-sm text-gray-700">
                          {source.dataVolume}
                        </td>
                      ) : null;
                    })}
                  </tr>
                  
                  {/* Documentation Score row */}
                  <tr className="bg-gray-50">
                    <td className="px-3 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-gray-50 z-10">
                      Documentation Score
                    </td>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <td key={id} className="px-3 py-3 text-sm text-gray-700">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-800 mr-2">{source.documentation}/100</div>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${source.documentation > 90 ? 'bg-green-500' : source.documentation > 70 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                                style={{ width: `${source.documentation}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                      ) : null;
                    })}
                  </tr>
                  
                  {/* Compliance Certifications row */}
                  <tr>
                    <td className="px-3 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-white z-10">
                      Compliance Certifications
                    </td>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <td key={id} className="px-3 py-3 text-sm text-gray-700">
                          {source.complianceCertifications.join(', ')}
                        </td>
                      ) : null;
                    })}
                  </tr>
                  
                  {/* Actions row */}
                  <tr className="bg-gray-50">
                    <td className="px-3 py-3 text-sm font-medium text-gray-700 sticky left-0 bg-gray-50 z-10">
                      Actions
                    </td>
                    {comparedItems.map(id => {
                      const source = dataSources.find(s => s.id === id);
                      return source ? (
                        <td key={id} className="px-3 py-3 text-sm text-gray-700">
                          <div className="flex space-x-2">
                            <button 
                              className="px-3 py-1.5 text-xs font-medium text-white bg-[#FF9900] rounded hover:bg-[#E68A00]"
                              onClick={() => setSelectedDataSource(source)}
                            >
                              View Details
                            </button>
                            <button 
                              className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded hover:bg-red-100"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleComparisonItem(id, e);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      ) : null;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
            
            {/* AI Recommendation on Comparison */}
            <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-100">
              <div className="flex items-start">
                <Sparkles className="w-6 h-6 text-indigo-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-md font-medium text-indigo-800 mb-1">AI-Powered Comparison Insights</h3>
                  <p className="text-sm text-indigo-700 mb-3">
                    Based on your comparison, here's our analysis of the best options for your needs:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-md shadow-sm border border-indigo-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Best Value: Financial Market Data</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Offers the highest quality data with real-time updates at a competitive price point.
                          </p>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md font-medium">
                          Recommended
                        </span>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm border border-indigo-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Best Documentation: Healthcare Analytics Bundle</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Has the most comprehensive documentation and code examples for faster implementation.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white p-3 rounded-md shadow-sm border border-indigo-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-medium text-gray-800">Complementary Datasets</h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Financial Market Data + Consumer Behavior Dataset would provide comprehensive market insights.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceBrowser;