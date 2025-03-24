import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, Users, Layers, ArrowRight, PieChart, Target, Briefcase, TrendingUp, ChevronDown, PlusCircle, UserCircle, Building2, Activity, FileText, ArrowUpRight, EyeOff, Tag, Search, Filter, ListFilter, RefreshCw, Zap, BarChart2, CloudLightning as Lightning, X, Award, Clock, ArrowDown, ArrowUp, MousePointer, FileCheck, CheckCircle, CheckSquare, AlertTriangle, Cog, Save, Share2, UserCheck, MessageSquare, Rocket, Sparkles, Lightbulb } from 'lucide-react';

interface SegmentationScoringProps {
  enrichedLeads: any[];
  segments: any[];
  onContinue: () => void;
}

const SegmentationScoring: React.FC<SegmentationScoringProps> = ({
  enrichedLeads,
  segments,
  onContinue,
}) => {
  const [activeTab, setActiveTab] = useState<'segments' | 'scoring'>('segments');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState<any | null>(null);
  const [showCreateSegment, setShowCreateSegment] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [scoreFilterValue, setScoreFilterValue] = useState<[number, number]>([0, 100]);
  const [leadInsights, setLeadInsights] = useState<any | null>(null);
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [animateIn, setAnimateIn] = useState(false);
  
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading state
    setTimeout(() => {
      setIsLoading(false);
      setAnimateIn(true);
      // Generate insights data
      setLeadInsights({
        totalLeads: enrichedLeads.length,
        highValueCount: Math.round(enrichedLeads.length * 0.35),
        mediumValueCount: Math.round(enrichedLeads.length * 0.45),
        lowValueCount: Math.round(enrichedLeads.length * 0.2),
        averageScore: 67,
        leadsByIndustry: [
          { name: 'Technology', count: Math.round(enrichedLeads.length * 0.30), color: '#4F46E5' },
          { name: 'Finance', count: Math.round(enrichedLeads.length * 0.25), color: '#0EA5E9' },
          { name: 'Healthcare', count: Math.round(enrichedLeads.length * 0.20), color: '#10B981' },
          { name: 'Retail', count: Math.round(enrichedLeads.length * 0.15), color: '#F59E0B' },
          { name: 'Other', count: Math.round(enrichedLeads.length * 0.10), color: '#6B7280' },
        ],
        timeToConversion: {
          highValue: '14 days',
          mediumValue: '24 days',
          lowValue: '45+ days',
        },
        conversionRates: {
          highValue: '24%',
          mediumValue: '12%',
          lowValue: '3%',
        }
      });
    }, 1500);
  }, [enrichedLeads]);

  useEffect(() => {
    if (!isLoading && chartRef.current) {
      // Simulate rendering a chart - in a real app you'd use a chart library
      renderSimpleBarChart();
    }
  }, [isLoading, activeTab]);

  const renderSimpleBarChart = () => {
    if (chartRef.current) {
      const chartDiv = chartRef.current;
      chartDiv.innerHTML = '';

      // Create a simple chart using div elements
      const chartContainer = document.createElement('div');
      chartContainer.className = 'flex items-end h-60 space-x-6 justify-center';
      
      const totalLeads = leadInsights.totalLeads;
      const maxBarHeight = 200; // max height in pixels
      
      // High value bar
      const highBar = createBar(
        leadInsights.highValueCount, 
        totalLeads, 
        maxBarHeight, 
        'High', 
        'bg-green-500',
        `${leadInsights.highValueCount} leads`
      );
      
      // Medium value bar
      const mediumBar = createBar(
        leadInsights.mediumValueCount, 
        totalLeads, 
        maxBarHeight, 
        'Medium', 
        'bg-yellow-500',
        `${leadInsights.mediumValueCount} leads`
      );
      
      // Low value bar
      const lowBar = createBar(
        leadInsights.lowValueCount, 
        totalLeads, 
        maxBarHeight, 
        'Low', 
        'bg-red-500',
        `${leadInsights.lowValueCount} leads`
      );
      
      chartContainer.appendChild(highBar);
      chartContainer.appendChild(mediumBar);
      chartContainer.appendChild(lowBar);
      
      chartDiv.appendChild(chartContainer);
    }
  };

  const createBar = (value: number, total: number, maxHeight: number, label: string, colorClass: string, subtitle: string) => {
    const container = document.createElement('div');
    container.className = 'flex flex-col items-center';
    
    const height = Math.max(20, (value / total) * maxHeight);
    
    const bar = document.createElement('div');
    bar.className = `w-20 ${colorClass} rounded-t-md transition-all duration-700 ease-out`;
    bar.style.height = '0';
    
    // Animate the bar height after a short delay
    setTimeout(() => {
      bar.style.height = `${height}px`;
    }, 300);
    
    const labelEl = document.createElement('div');
    labelEl.className = 'mt-2 text-sm font-medium text-gray-700';
    labelEl.textContent = label;
    
    const subtitleEl = document.createElement('div');
    subtitleEl.className = 'text-xs text-gray-500';
    subtitleEl.textContent = subtitle;
    
    container.appendChild(bar);
    container.appendChild(labelEl);
    container.appendChild(subtitleEl);
    
    return container;
  };

  // Calculate some stats for the visualization
  const totalLeads = enrichedLeads.length;
  const highValueLeads = enrichedLeads.filter(lead => (lead.intentScore || 0) > 70).length;
  const mediumValueLeads = enrichedLeads.filter(lead => (lead.intentScore || 0) > 40 && (lead.intentScore || 0) <= 70).length;
  const lowValueLeads = totalLeads - highValueLeads - mediumValueLeads;

  const handleSegmentSelect = (segment: any) => {
    setSelectedSegment(segment);
  };

  const filteredSegments = segments.filter(segment => {
    if (segmentFilter === 'all') return true;
    if (segmentFilter === 'high-converting' && parseInt(segment.conversion) > 15) return true;
    if (segmentFilter === 'large' && segment.count > enrichedLeads.length * 0.25) return true;
    return false;
  }).filter(segment => {
    if (!searchQuery) return true;
    return segment.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           segment.criteria.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const renderSegmentsTab = () => {
    if (isLoading) {
      return (
        <div className="py-16 flex justify-center items-center">
          <div className="text-center">
            <RefreshCw className="w-10 h-10 text-indigo-500 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-medium text-gray-800 mb-1">Analyzing Your Data</h3>
            <p className="text-gray-600">Our AI is creating intelligent segments based on your leads...</p>
          </div>
        </div>
      );
    }

    return (
      <div className={`transition-all duration-500 ease-in-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search segments..."
                className="pl-10 pr-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="ml-2 relative">
              <button 
                className="flex items-center px-3 py-2 text-sm border border-gray-200 rounded-md bg-white hover:bg-gray-50"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-gray-700">Filter</span>
                <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
              </button>
              
              {filterOpen && (
                <div className="absolute left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-48">
                  <div className="py-1">
                    <button 
                      className={`flex items-center px-4 py-2 text-sm w-full text-left ${segmentFilter === 'all' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => {
                        setSegmentFilter('all');
                        setFilterOpen(false);
                      }}
                    >
                      All Segments
                    </button>
                    <button 
                      className={`flex items-center px-4 py-2 text-sm w-full text-left ${segmentFilter === 'high-converting' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => {
                        setSegmentFilter('high-converting');
                        setFilterOpen(false);
                      }}
                    >
                      High Converting
                    </button>
                    <button 
                      className={`flex items-center px-4 py-2 text-sm w-full text-left ${segmentFilter === 'large' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}
                      onClick={() => {
                        setSegmentFilter('large');
                        setFilterOpen(false);
                      }}
                    >
                      Large Segments
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <button 
            className="flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            onClick={() => setShowCreateSegment(true)}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Segment
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {filteredSegments.map(segment => (
            <div 
              key={segment.id} 
              className={`border ${selectedSegment?.id === segment.id ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200'} rounded-lg p-5 hover:border-indigo-300 hover:shadow-sm transition-all cursor-pointer`}
              onClick={() => handleSegmentSelect(segment)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{segment.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{segment.criteria}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="bg-indigo-100 rounded-full px-3 py-1 text-xs font-medium text-indigo-800">
                    {segment.count} leads
                  </div>
                  {parseInt(segment.conversion) > 15 && (
                    <div className="bg-green-100 rounded-full px-3 py-1 text-xs font-medium text-green-800 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      High Convert
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-500">Average conversion</span>
                  <div className="text-lg font-medium text-gray-800 mt-1">{segment.conversion}</div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-xs px-3 py-1.5 bg-white border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50">
                    Export
                  </button>
                  <button className="text-xs px-3 py-1.5 bg-indigo-600 rounded-md text-white hover:bg-indigo-700">
                    View Leads
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredSegments.length === 0 && (
            <div className="col-span-2 p-8 border border-gray-200 rounded-lg text-center">
              <EyeOff className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-800 mb-1">No segments found</h3>
              <p className="text-gray-600">Try changing your search or filter criteria.</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-md font-medium text-gray-800">Segment Overview</h3>
            </div>
            <div className="p-5">
              {selectedSegment ? (
                <div>
                  <div className="mb-5">
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{selectedSegment.name}</h4>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="bg-indigo-100 rounded-full px-3 py-1 text-xs font-medium text-indigo-800 flex items-center">
                        <Users className="w-3.5 h-3.5 mr-1.5" />
                        {selectedSegment.count} leads
                      </div>
                      <div className="bg-blue-100 rounded-full px-3 py-1 text-xs font-medium text-blue-800 flex items-center">
                        <Target className="w-3.5 h-3.5 mr-1.5" />
                        {selectedSegment.conversion} conversion
                      </div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <FileText className="w-3.5 h-3.5 mr-1.5" />
                        Created today
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Criteria:</span> {selectedSegment.criteria}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
                      <h5 className="text-sm font-medium text-green-800 mb-2">Expected Revenue Impact</h5>
                      <p className="text-2xl font-bold text-green-900">$14,250</p>
                      <p className="text-xs text-green-700 mt-1 flex items-center">
                        <ArrowUpRight className="w-3 h-3 mr-1" />
                        Based on historical conversion
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                      <h5 className="text-sm font-medium text-blue-800 mb-2">Recommended Approach</h5>
                      <p className="text-md font-medium text-blue-900">Personalized Outreach</p>
                      <p className="text-xs text-blue-700 mt-1">Focus on pain points specific to {selectedSegment.name.toLowerCase()}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-3">Lead Distribution</h5>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="border border-gray-200 rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div className="bg-green-100 p-2 rounded-full">
                            <Activity className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                            {Math.round(selectedSegment.count * 0.35)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 mt-3">High Intent</p>
                        <p className="text-xs text-gray-500">35% of segment</p>
                      </div>
                      <div className="border border-gray-200 rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div className="bg-yellow-100 p-2 rounded-full">
                            <Activity className="w-4 h-4 text-yellow-600" />
                          </div>
                          <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            {Math.round(selectedSegment.count * 0.45)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 mt-3">Medium Intent</p>
                        <p className="text-xs text-gray-500">45% of segment</p>
                      </div>
                      <div className="border border-gray-200 rounded-md p-3">
                        <div className="flex justify-between items-start">
                          <div className="bg-red-100 p-2 rounded-full">
                            <Activity className="w-4 h-4 text-red-600" />
                          </div>
                          <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs rounded-full">
                            {Math.round(selectedSegment.count * 0.2)}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 mt-3">Low Intent</p>
                        <p className="text-xs text-gray-500">20% of segment</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                        View all leads in this segment
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Tag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <h3 className="text-lg font-medium text-gray-800 mb-1">Select a segment</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    Choose a segment from the list to see detailed insights and lead distribution
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-md font-medium text-gray-800">AI Recommendations</h3>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-3 border border-indigo-100">
                  <div className="flex items-start">
                    <Zap className="w-5 h-5 text-indigo-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-indigo-800 mb-1">Prioritize High-Value Prospects</h4>
                      <p className="text-xs text-indigo-700">
                        Focus on the "High-Value Prospects" segment for immediate outreach. These leads show the highest intent and match your ideal customer profile.
                      </p>
                      <button className="text-xs text-indigo-800 font-medium mt-2 hover:underline">
                        Apply Filter
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-lg p-3 border border-blue-100">
                  <div className="flex items-start">
                    <Briefcase className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800 mb-1">Tech Vertical Campaign</h4>
                      <p className="text-xs text-blue-700">
                        Create a personalized email campaign for the "Technology Vertical" segment focusing on integration capabilities and scalability.
                      </p>
                      <button className="text-xs text-blue-800 font-medium mt-2 hover:underline">
                        Create Campaign
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-3 border border-purple-100">
                  <div className="flex items-start">
                    <Building2 className="w-5 h-5 text-purple-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-purple-800 mb-1">Enterprise Follow-up</h4>
                      <p className="text-xs text-purple-700">
                        Schedule targeted follow-ups for "Enterprise Leads" segment with case studies showcasing ROI for large organizations.
                      </p>
                      <button className="text-xs text-purple-800 font-medium mt-2 hover:underline">
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg p-3 border border-emerald-100">
                  <div className="flex items-start">
                    <UserCircle className="w-5 h-5 text-emerald-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-emerald-800 mb-1">Decision Maker Focus</h4>
                      <p className="text-xs text-emerald-700">
                        For the "Decision Makers" segment, prepare executive-focused content highlighting strategic benefits and competitive advantages.
                      </p>
                      <button className="text-xs text-emerald-800 font-medium mt-2 hover:underline">
                        View Content
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Segment Comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Deal Size</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Est. Revenue</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {segments.map((segment) => (
                  <tr key={segment.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${
                          parseInt(segment.conversion) > 20 
                            ? 'bg-green-500' 
                            : parseInt(segment.conversion) > 10 
                              ? 'bg-yellow-500' 
                              : 'bg-red-500'
                        } mr-2`}></div>
                        <div className="text-sm font-medium text-gray-900">{segment.name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{segment.count} leads</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className={`text-sm font-medium ${
                        parseInt(segment.conversion) > 20 
                          ? 'text-green-600' 
                          : parseInt(segment.conversion) > 10 
                            ? 'text-yellow-600' 
                            : 'text-red-600'
                      }`}>
                        {segment.conversion}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        ${(620 + segment.id * 50).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${Math.round(segment.count * parseInt(segment.conversion) / 100 * (620 + segment.id * 50)).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        parseInt(segment.conversion) > 20 
                          ? 'bg-green-100 text-green-800' 
                          : parseInt(segment.conversion) > 10 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {parseInt(segment.conversion) > 20 
                          ? 'High' 
                          : parseInt(segment.conversion) > 10 
                            ? 'Medium' 
                            : 'Low'
                        }
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderScoringTab = () => {
    if (isLoading) {
      return (
        <div className="py-16 flex justify-center items-center">
          <div className="text-center">
            <RefreshCw className="w-10 h-10 text-indigo-500 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-medium text-gray-800 mb-1">Calculating Lead Scores</h3>
            <p className="text-gray-600">Our AI is analyzing engagement data and firmographics...</p>
          </div>
        </div>
      );
    }

    return (
      <div className={`transition-all duration-500 ease-in-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Lead Score Distribution</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1.5 text-xs bg-indigo-100 text-indigo-700 rounded-md font-medium">
                  By Score
                </button>
                <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  By Industry
                </button>
                <button className="px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  By Company Size
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-center">
                <div 
                  ref={chartRef} 
                  className="w-full h-64 flex items-center justify-center"
                >
                  <RefreshCw className="w-8 h-8 text-gray-300 animate-spin" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                <h4 className="text-sm font-medium text-green-800">High Value</h4>
                <p className="text-2xl font-bold text-green-900 mt-1">{leadInsights?.highValueCount || 0}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-green-700">Conversion:</span>
                  <span className="text-xs font-medium text-green-800">{leadInsights?.conversionRates.highValue}</span>
                </div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                <h4 className="text-sm font-medium text-yellow-800">Medium Value</h4>
                <p className="text-2xl font-bold text-yellow-900 mt-1">{leadInsights?.mediumValueCount || 0}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-yellow-700">Conversion:</span>
                  <span className="text-xs font-medium text-yellow-800">{leadInsights?.conversionRates.mediumValue}</span>
                </div>
              </div>
              <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                <h4 className="text-sm font-medium text-red-800">Low Value</h4>
                <p className="text-2xl font-bold text-red-900 mt-1">{leadInsights?.lowValueCount || 0}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-red-700">Conversion:</span>
                  <span className="text-xs font-medium text-red-800">{leadInsights?.conversionRates.lowValue}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Scoring Factors</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Engagement Level</span>
                  <span className="text-sm font-medium text-green-600">High Impact</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full animate-expand" style={{ width: '0%', animationFillMode: 'forwards', animationDelay: '0.2s' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Company Size Match</span>
                  <span className="text-sm font-medium text-green-600">High Impact</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full animate-expand" style={{ width: '0%', animationFillMode: 'forwards', animationDelay: '0.3s' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Industry Relevance</span>
                  <span className="text-sm font-medium text-yellow-600">Medium Impact</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full animate-expand" style={{ width: '0%', animationFillMode: 'forwards', animationDelay: '0.4s' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Decision Maker Level</span>
                  <span className="text-sm font-medium text-green-600">High Impact</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full animate-expand" style={{ width: '0%', animationFillMode: 'forwards', animationDelay: '0.5s' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Recency of Activity</span>
                  <span className="text-sm font-medium text-yellow-600">Medium Impact</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full animate-expand" style={{ width: '0%', animationFillMode: 'forwards', animationDelay: '0.6s' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Lead Score Formula</h4>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm text-gray-700">
                <p className="font-mono">Score = (engagement × 0.35) + </p>
                <p className="font-mono pl-8">(firmographics × 0.25) + </p>
                <p className="font-mono pl-8">(intent signals × 0.25) + </p>
                <p className="font-mono pl-8">(behavioral data × 0.15)</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Avg. Time to Conversion</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-md border border-gray-200 p-2 text-center">
                  <div className="text-xs text-gray-500 mb-1">High Value</div>
                  <div className="text-sm font-medium text-gray-800">{leadInsights?.timeToConversion.highValue}</div>
                </div>
                <div className="rounded-md border border-gray-200 p-2 text-center">
                  <div className="text-xs text-gray-500 mb-1">Medium Value</div>
                  <div className="text-sm font-medium text-gray-800">{leadInsights?.timeToConversion.mediumValue}</div>
                </div>
                <div className="rounded-md border border-gray-200 p-2 text-center">
                  <div className="text-xs text-gray-500 mb-1">Low Value</div>
                  <div className="text-sm font-medium text-gray-800">{leadInsights?.timeToConversion.lowValue}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-md font-medium text-gray-800">Top Scored Leads</h3>
              <button className="text-xs text-indigo-600 font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lead
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Recent Activity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enrichedLeads.filter(lead => (lead.intentScore || 0) > 70).slice(0, 5).map(lead => (
                    <tr key={lead.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {lead.company}
                          {lead.industry && (
                            <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {lead.industry}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            {lead.intentScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{lead.recentActivity || 'No recent activity'}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                          View
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          Contact
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <h3 className="text-md font-medium text-gray-800">Industry Distribution</h3>
            </div>
            <div className="p-4">
              {leadInsights?.leadsByIndustry.map((industry, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">{industry.name}</span>
                    <span className="text-xs font-medium text-gray-700">{industry.count} leads</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full animate-expand" 
                      style={{ 
                        width: '0%', 
                        backgroundColor: industry.color,
                        animationFillMode: 'forwards',
                        animationDelay: `${0.2 + (index * 0.1)}s`
                      }}
                      data-width={`${(industry.count / leadInsights.totalLeads) * 100}%`}
                    ></div>
                  </div>
                </div>
              ))}
              
              <div className="mt-6">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Industry Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded-md border border-green-100">
                    <span className="text-xs text-green-700">Technology</span>
                    <span className="text-xs font-medium text-green-800">24% conversion</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-blue-50 rounded-md border border-blue-100">
                    <span className="text-xs text-blue-700">Finance</span>
                    <span className="text-xs font-medium text-blue-800">19% conversion</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-purple-50 rounded-md border border-purple-100">
                    <span className="text-xs text-purple-700">Healthcare</span>
                    <span className="text-xs font-medium text-purple-800">15% conversion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-5 border border-indigo-100">
          <div className="flex items-start">
            <PieChart className="w-6 h-6 text-indigo-600 mr-3 mt-0.5" />
            <div>
              <h3 className="text-md font-medium text-indigo-800">Lead Scoring Insights</h3>
              <p className="text-sm text-indigo-700 mt-1">
                Our AI has analyzed your leads based on multiple factors including firmographics, 
                engagement history, and intent signals. High-scoring leads are 3.5x more likely 
                to convert based on your historical data patterns. We recommend prioritizing outreach 
                to high and medium-scored leads first.
              </p>
              <div className="mt-4 flex space-x-3">
                <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700">
                  Export High-Value Leads
                </button>
                <button className="px-3 py-1.5 bg-white text-indigo-700 text-sm font-medium rounded-md border border-indigo-300 hover:bg-indigo-50">
                  Schedule Follow-ups
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Segmentation & Lead Scoring</h2>
        <p className="mt-2 text-gray-600">
          Our AI has analyzed your leads and created intelligent segments to help you prioritize outreach.
        </p>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'segments'
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
          }`}
          onClick={() => setActiveTab('segments')}
        >
          <div className="flex items-center">
            <Layers className="w-4 h-4 mr-2" />
            AI Segments
          </div>
        </button>
        <button
          className={`px-4 py-3 text-sm font-medium ${
            activeTab === 'scoring'
              ? 'border-b-2 border-indigo-500 text-indigo-600'
              : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:border-b-2'
          }`}
          onClick={() => setActiveTab('scoring')}
        >
          <div className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Predictive Scoring
          </div>
        </button>
      </div>

      {activeTab === 'segments' ? renderSegmentsTab() : renderScoringTab()}

      <div className="flex justify-center mt-6">
        <button
          onClick={onContinue}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center shadow-md hover:shadow-lg transition-all"
        >
          Continue to Export
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>

      {/* Create Segment Modal */}
      {showCreateSegment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Create New Segment</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Segment Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="E.g., Enterprise Decision Makers"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Segment Criteria
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center p-2 bg-gray-50 rounded-md border border-gray-200">
                      <select className="border-none bg-transparent text-sm text-gray-700 focus:outline-none focus:ring-0 pr-2">
                        <option>Company Size</option>
                        <option>Industry</option>
                        <option>Title</option>
                        <option>Intent Score</option>
                        <option>Recent Activity</option>
                      </select>
                      <select className="border-none bg-transparent text-sm text-gray-700 focus:outline-none focus:ring-0 px-2">
                        <option>is equal to</option>
                        <option>contains</option>
                        <option>greater than</option>
                        <option>less than</option>
                      </select>
                      <input 
                        type="text" 
                        className="flex-1 border-none bg-transparent text-sm focus:outline-none focus:ring-0"
                        placeholder="Value"
                      />
                    </div>
                    <button className="text-sm text-indigo-600 font-medium flex items-center">
                      <PlusCircle className="w-4 h-4 mr-1" />
                      Add Criteria
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (Optional)
                  </label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Add a description to help your team understand this segment"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 flex justify-end space-x-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setShowCreateSegment(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                onClick={() => setShowCreateSegment(false)}
              >
                Create Segment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SegmentationScoring;