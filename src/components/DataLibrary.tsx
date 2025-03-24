import React, { useState, useEffect } from 'react';
import { Search, Database, Tag, Clock, Star, Users, Filter, SlidersHorizontal, DownloadCloud, BarChart2, Shield, ArrowRight, Plus, Grid, List, ChevronDown, RefreshCw, CheckCircle, FileText, ExternalLink, Server, Globe, Layers, AlertCircle, ChevronRight, DivideIcon as LucideIcon, ExternalLinkIcon, Bookmark, BookmarkIcon } from 'lucide-react';

// Sample data for AWS Marketplace datasets
const datasets = [
  {
    id: 1,
    name: "Financial Market Data",
    provider: "Bloomberg Enterprise",
    category: "Financial Services",
    type: "API",
    tags: ["Real-time", "Financial", "Market Data"],
    lastUpdated: "2 hours ago",
    rating: 4.8,
    usageCount: 342,
    size: "2.4 TB",
    description: "Comprehensive global financial market data including stocks, bonds, currencies, and commodities with real-time updates.",
    status: "Active",
    regions: ["us-east-1", "eu-west-1", "ap-southeast-1"],
    linkedTo: ["SageMaker", "QuickSight", "Athena"],
    favorite: true,
    insights: {
      qualityScore: 98,
      completeness: 96,
      reliability: 99,
      updateFrequency: "Real-time",
      popular: true
    }
  },
  {
    id: 2,
    name: "Healthcare Analytics Bundle",
    provider: "HealthData Inc.",
    category: "Healthcare",
    type: "S3 Bucket",
    tags: ["HIPAA", "Healthcare", "Analytics"],
    lastUpdated: "1 day ago",
    rating: 4.7,
    usageCount: 156,
    size: "1.2 TB",
    description: "HIPAA-compliant healthcare datasets including anonymized patient records, treatment outcomes, and healthcare provider metrics.",
    status: "Active",
    regions: ["us-east-1", "us-west-2"],
    linkedTo: ["HealthLake", "SageMaker", "QuickSight"],
    favorite: false,
    insights: {
      qualityScore: 94,
      completeness: 92,
      reliability: 95,
      updateFrequency: "Daily",
      popular: true
    }
  },
  {
    id: 3,
    name: "Consumer Behavior Dataset",
    provider: "Retail Analytics Co.",
    category: "Retail",
    type: "API + File",
    tags: ["Consumer", "Retail", "Demographics"],
    lastUpdated: "3 days ago",
    rating: 4.5,
    usageCount: 89,
    size: "860 GB",
    description: "Detailed consumer purchase behavior, demographic data, and shopping patterns across multiple retail sectors.",
    status: "Active",
    regions: ["us-east-1", "eu-central-1"],
    linkedTo: ["Personalize", "QuickSight"],
    favorite: true,
    insights: {
      qualityScore: 92,
      completeness: 88,
      reliability: 93,
      updateFrequency: "Weekly",
      popular: false
    }
  },
  {
    id: 4,
    name: "Geospatial Data Feed",
    provider: "Mapify Technologies",
    category: "Location Services",
    type: "Streaming API",
    tags: ["Geospatial", "Location", "POI"],
    lastUpdated: "4 hours ago",
    rating: 4.9,
    usageCount: 278,
    size: "1.8 TB",
    description: "High-resolution geospatial data including POI, traffic patterns, and geographic features with global coverage.",
    status: "Active",
    regions: ["us-east-1", "us-west-2", "eu-west-1", "ap-northeast-1"],
    linkedTo: ["Location Service", "QuickSight", "SageMaker"],
    favorite: false,
    insights: {
      qualityScore: 97,
      completeness: 95,
      reliability: 98,
      updateFrequency: "Hourly",
      popular: true
    }
  },
  {
    id: 5,
    name: "ESG & Sustainability Metrics",
    provider: "GreenData Global",
    category: "ESG",
    type: "File",
    tags: ["ESG", "Sustainability", "Corporate"],
    lastUpdated: "2 weeks ago",
    rating: 4.6,
    usageCount: 63,
    size: "420 GB",
    description: "Environmental, social, and governance data for public companies, including carbon emissions, diversity metrics, and governance scores.",
    status: "Active",
    regions: ["us-east-1", "eu-west-1"],
    linkedTo: ["QuickSight", "Athena", "S3 Analytics"],
    favorite: false,
    insights: {
      qualityScore: 91,
      completeness: 89,
      reliability: 90,
      updateFrequency: "Monthly",
      popular: false
    }
  },
  {
    id: 6,
    name: "Weather & Climate Data",
    provider: "ClimateWatch",
    category: "Environmental",
    type: "API",
    tags: ["Weather", "Climate", "Environmental"],
    lastUpdated: "1 day ago",
    rating: 4.7,
    usageCount: 134,
    size: "980 GB",
    description: "Historical and forecast weather data, climate patterns, and environmental metrics with global coverage.",
    status: "Active",
    regions: ["us-east-1", "us-west-2", "eu-west-1"],
    linkedTo: ["SageMaker", "IoT Analytics"],
    favorite: true,
    insights: {
      qualityScore: 95,
      completeness: 93,
      reliability: 94,
      updateFrequency: "Hourly",
      popular: false
    }
  },
  {
    id: 7,
    name: "Social Media Sentiment Data",
    provider: "SocialAI Analytics",
    category: "Marketing",
    type: "Streaming API",
    tags: ["Social Media", "Sentiment", "Marketing"],
    lastUpdated: "2 hours ago",
    rating: 4.4,
    usageCount: 211,
    size: "1.3 TB",
    description: "Real-time sentiment analysis and social media trends across multiple platforms with demographic breakdowns.",
    status: "Active",
    regions: ["us-east-1", "us-west-2", "eu-west-1"],
    linkedTo: ["Comprehend", "SageMaker", "QuickSight"],
    favorite: true,
    insights: {
      qualityScore: 89,
      completeness: 85,
      reliability: 92,
      updateFrequency: "Real-time",
      popular: true
    }
  },
  {
    id: 8,
    name: "Cybersecurity Threat Intelligence",
    provider: "SecureNet Solutions",
    category: "Security",
    type: "API + File",
    tags: ["Cybersecurity", "Threat Intel", "Security"],
    lastUpdated: "6 hours ago",
    rating: 4.8,
    usageCount: 178,
    size: "740 GB",
    description: "Comprehensive cybersecurity threat intelligence including known threats, vulnerabilities, and attack patterns.",
    status: "Active",
    regions: ["us-east-1", "us-west-2", "eu-central-1", "ap-northeast-1"],
    linkedTo: ["Security Hub", "GuardDuty", "Detective"],
    favorite: false,
    insights: {
      qualityScore: 96,
      completeness: 94,
      reliability: 97,
      updateFrequency: "Hourly",
      popular: true
    }
  }
];

const DataLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredDatasets, setFilteredDatasets] = useState(datasets);
  const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'recently-used'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<typeof datasets[0] | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'rating' | 'usage'>('recent');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    // Filter datasets based on search, category, and tab
    let filtered = [...datasets];
    
    // Filter by tab
    if (activeTab === 'favorites') {
      filtered = filtered.filter(dataset => dataset.favorite);
    } else if (activeTab === 'recently-used') {
      // In a real app, this would filter by recently used datasets
      // For demo, just use the first 3
      filtered = filtered.slice(0, 3);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        dataset => 
          dataset.name.toLowerCase().includes(query) ||
          dataset.provider.toLowerCase().includes(query) ||
          dataset.description.toLowerCase().includes(query) ||
          dataset.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(dataset => dataset.category === selectedCategory);
    }
    
    // Sort datasets
    if (sortBy === 'recent') {
      // For demo purposes, just use the existing order
    } else if (sortBy === 'rating') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'usage') {
      filtered = filtered.sort((a, b) => b.usageCount - a.usageCount);
    }
    
    setFilteredDatasets(filtered);
  }, [searchQuery, selectedCategory, activeTab, sortBy]);

  const categories = Array.from(new Set(datasets.map(dataset => dataset.category)));
  
  const toggleFavorite = (id: number) => {
    const updatedDatasets = datasets.map(dataset => 
      dataset.id === id ? { ...dataset, favorite: !dataset.favorite } : dataset
    );
    // In a real app, you would update the state and save to backend
    // For demo, we'll just log
    console.log(`Toggled favorite for dataset ${id}`);
  };
  
  const handleShowDetails = (dataset: typeof datasets[0]) => {
    setSelectedDataset(dataset);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-10 h-10 text-indigo-500 mx-auto animate-spin mb-4" />
          <h3 className="text-lg font-medium text-gray-800">Loading AWS Data Library</h3>
          <p className="text-sm text-gray-600 mt-2">Retrieving your datasets from AWS Data Marketplace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AWS Data Marketplace Library</h1>
          <p className="text-gray-600 mt-1">
            Manage and explore your AWS Data Marketplace datasets
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
            <DownloadCloud className="w-4 h-4 mr-2 text-gray-500" />
            Import Data
          </button>
          <button className="bg-indigo-600 rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add New Dataset
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
          <div className="flex space-x-6">
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center ${
                activeTab === 'all' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('all')}
            >
              <Database className="w-4 h-4 mr-2" />
              All Datasets
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center ${
                activeTab === 'favorites' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('favorites')}
            >
              <Star className="w-4 h-4 mr-2" />
              Favorites
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium rounded-md flex items-center ${
                activeTab === 'recently-used' 
                  ? 'bg-indigo-100 text-indigo-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab('recently-used')}
            >
              <Clock className="w-4 h-4 mr-2" />
              Recently Used
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative">
              <select
                className="appearance-none pl-3 pr-8 py-1.5 border border-gray-300 bg-white rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="recent">Recently Updated</option>
                <option value="rating">Highest Rated</option>
                <option value="usage">Most Used</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
            
            <div className="flex border border-gray-300 rounded-md overflow-hidden">
              <button
                className={`p-1.5 ${viewType === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setViewType('grid')}
              >
                <Grid className="w-4 h-4 text-gray-600" />
              </button>
              <button
                className={`p-1.5 ${viewType === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                onClick={() => setViewType('list')}
              >
                <List className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <button
              className="p-1.5 border border-gray-300 rounded-md bg-white"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-4">
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search datasets by name, provider, or tags..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {showFilters && (
              <div className="ml-4 flex items-center space-x-2 bg-gray-50 p-2 rounded-md">
                <div className="text-xs text-gray-500">Category:</div>
                <select
                  className="text-sm border border-gray-300 rounded-md p-1"
                  value={selectedCategory || ''}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category, idx) => (
                    <option key={idx} value={category}>{category}</option>
                  ))}
                </select>
                
                <button 
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                  onClick={() => setSelectedCategory(null)}
                >
                  Reset
                </button>
              </div>
            )}
          </div>
          
          {filteredDatasets.length === 0 ? (
            <div className="text-center py-12">
              <Database className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-800 mb-1">No datasets found</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Try adjusting your search or filters to find what you're looking for, or browse the AWS Data Marketplace for new datasets.
              </p>
              <button className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 inline-flex items-center">
                Browse AWS Marketplace
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          ) : viewType === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDatasets.map(dataset => (
                <div 
                  key={dataset.id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleShowDetails(dataset)}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-800 line-clamp-1">{dataset.name}</h3>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(dataset.id);
                        }}
                        className="text-gray-400 hover:text-yellow-500"
                      >
                        <Star className={`w-5 h-5 ${dataset.favorite ? 'text-yellow-500 fill-yellow-500' : ''}`} />
                      </button>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">{dataset.provider}</div>
                    
                    <div className="mt-3 flex flex-wrap gap-1">
                      {dataset.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">{dataset.description}</p>
                    
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                      <div className="flex items-center text-sm">
                        <Database className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-gray-600">{dataset.type}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">{dataset.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-2 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-500">
                        Updated {dataset.lastUpdated}
                      </div>
                      <div className="flex items-center text-xs">
                        <Users className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-gray-600">{dataset.usageCount} users</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDatasets.map(dataset => (
                    <tr 
                      key={dataset.id}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleShowDetails(dataset)}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-3">
                            <Star 
                              className={`w-4 h-4 cursor-pointer ${dataset.favorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(dataset.id);
                              }}
                            />
                          </div>
                          <div className="font-medium text-gray-900">{dataset.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {dataset.provider}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full bg-blue-100 text-blue-800">
                          {dataset.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {dataset.type}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600">{dataset.rating}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {dataset.lastUpdated}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                        {dataset.size}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowDetails(dataset);
                          }}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      
      {/* Dataset Details Modal */}
      {selectedDataset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center">
                    <h2 className="text-2xl font-bold text-gray-800">{selectedDataset.name}</h2>
                    <button
                      className="ml-3"
                      onClick={() => toggleFavorite(selectedDataset.id)}
                    >
                      <Star className={`w-6 h-6 ${selectedDataset.favorite ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 hover:text-yellow-500'}`} />
                    </button>
                  </div>
                  <div className="text-gray-600 mt-1">{selectedDataset.provider}</div>
                </div>
                <button
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setSelectedDataset(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2">
                  <div className="bg-gray-50 rounded-lg p-5">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Dataset Overview</h3>
                    <p className="text-gray-600">{selectedDataset.description}</p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedDataset.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="bg-white rounded-md p-3 border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Type</div>
                        <div className="font-medium text-gray-800 flex items-center">
                          <Database className="w-4 h-4 text-indigo-500 mr-2" />
                          {selectedDataset.type}
                        </div>
                      </div>
                      <div className="bg-white rounded-md p-3 border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Size</div>
                        <div className="font-medium text-gray-800 flex items-center">
                          <Database className="w-4 h-4 text-green-500 mr-2" />
                          {selectedDataset.size}
                        </div>
                      </div>
                      <div className="bg-white rounded-md p-3 border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Rating</div>
                        <div className="font-medium text-gray-800 flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-2" />
                          {selectedDataset.rating} / 5.0
                        </div>
                      </div>
                      <div className="bg-white rounded-md p-3 border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Users</div>
                        <div className="font-medium text-gray-800 flex items-center">
                          <Users className="w-4 h-4 text-blue-500 mr-2" />
                          {selectedDataset.usageCount}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                        <Globe className="w-4 h-4 text-indigo-500 mr-2" />
                        Available AWS Regions
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedDataset.regions.map((region, idx) => (
                          <div key={idx} className="bg-gray-50 p-2 rounded text-sm text-gray-700 flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            {region}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="text-md font-medium text-gray-800 mb-3 flex items-center">
                        <Server className="w-4 h-4 text-indigo-500 mr-2" />
                        Linked AWS Services
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedDataset.linkedTo.map((service, idx) => (
                          <div key={idx} className="bg-blue-50 px-3 py-2 rounded text-sm text-blue-700 flex items-center">
                            <CheckCircle className="w-3 h-3 mr-2" />
                            {service}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="text-md font-medium text-gray-800 mb-4 flex items-center">
                      <BarChart2 className="w-4 h-4 text-indigo-500 mr-2" />
                      Data Quality Insights
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-600">Overall Quality</span>
                          <span className="text-xs font-medium text-gray-700">{selectedDataset.insights.qualityScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${selectedDataset.insights.qualityScore}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-600">Completeness</span>
                          <span className="text-xs font-medium text-gray-700">{selectedDataset.insights.completeness}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${selectedDataset.insights.completeness}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-xs text-gray-600">Reliability</span>
                          <span className="text-xs font-medium text-gray-700">{selectedDataset.insights.reliability}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${selectedDataset.insights.reliability}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <div className="flex justify-between items-center text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-gray-600">Updates: </span>
                          <span className="ml-1 text-gray-800 font-medium">{selectedDataset.insights.updateFrequency}</span>
                        </div>
                        
                        {selectedDataset.insights.popular && (
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 font-medium flex items-center justify-center">
                      <DownloadCloud className="w-4 h-4 mr-2" />
                      Access Dataset
                    </button>
                    
                    <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 font-medium flex items-center justify-center">
                      <FileText className="w-4 h-4 mr-2 text-gray-500" />
                      View Documentation
                    </button>
                    
                    <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 font-medium flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 mr-2 text-gray-500" />
                      View in AWS Console
                    </button>
                  </div>
                  
                  <div className="mt-4 bg-indigo-50 rounded-lg p-3 border border-indigo-100">
                    <h4 className="text-sm font-medium text-indigo-800 mb-2 flex items-center">
                      <Layers className="w-4 h-4 mr-1" />
                      Lyzr AI Integration
                    </h4>
                    <p className="text-xs text-indigo-700 mb-2">
                      This dataset is ready for integration with Lyzr's AI agents for advanced analytics and insights.
                    </p>
                    <button className="w-full bg-indigo-600 text-white py-1.5 px-3 rounded text-sm hover:bg-indigo-700">
                      Connect with Lyzr
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Sample Schema</h3>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 overflow-x-auto">
                  <pre className="text-sm text-gray-700">
                    {`{
  "sample_field_1": "string",
  "sample_field_2": "number",
  "sample_field_3": {
    "nested_field_1": "string",
    "nested_field_2": "array"
  },
  "sample_field_4": "timestamp",
  "sample_field_5": "boolean"
}`}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
              <div className="text-sm text-gray-600">
                Last updated: {selectedDataset.lastUpdated}
              </div>
              <div className="flex space-x-3">
                <button
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setSelectedDataset(null)}
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700">
                  Use This Dataset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataLibrary;