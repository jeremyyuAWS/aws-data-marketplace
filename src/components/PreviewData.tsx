import React, { useState, useEffect } from 'react';
import { CheckCircle, Filter, Download, ArrowRight, Eye, EyeOff, ArrowDownUp, Search, Sparkles, RefreshCw, Tag, Trash2, AlertCircle } from 'lucide-react';

interface PreviewDataProps {
  originalLeads: any[];
  enrichedLeads: any[];
  selectedOptions: string[];
  onValidate: () => void;
}

const PreviewData: React.FC<PreviewDataProps> = ({
  originalLeads,
  enrichedLeads,
  selectedOptions,
  onValidate,
}) => {
  const [currentView, setCurrentView] = useState<'all' | 'changed'>('changed');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showComparison, setShowComparison] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisResults, setAnalysisResults] = useState<any | null>(null);
  const [animateIn, setAnimateIn] = useState(false);
  
  const pageSize = 5;

  useEffect(() => {
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResults({
        fieldsEnriched: calculateEnrichedFields(),
        completenessImprovement: Math.round(Math.random() * 30) + 15,
        dataQualityScore: Math.round(Math.random() * 20) + 75,
        potentialIssues: Math.round(Math.random() * 5),
      });
      setAnimateIn(true);
    }, 1500);
  }, []);

  // Count how many fields were enriched
  const calculateEnrichedFields = () => {
    return enrichedLeads.reduce((count, lead, index) => {
      const originalLead = originalLeads[index];
      let fieldCount = 0;
      
      if (selectedOptions.includes('contact')) {
        if (lead.email && !originalLead.email) fieldCount++;
        if (lead.phone && !originalLead.phone) fieldCount++;
      }
      
      if (selectedOptions.includes('social')) {
        if (lead.linkedin && !originalLead.linkedin) fieldCount++;
      }
      
      if (selectedOptions.includes('company')) {
        if (lead.industry && !originalLead.industry) fieldCount++;
      }
      
      if (selectedOptions.includes('intent')) {
        if (lead.intentScore) fieldCount++;
        if (lead.recentActivity) fieldCount++;
      }
      
      return count + fieldCount;
    }, 0);
  };

  // Filter leads based on current view and search
  const filteredLeads = enrichedLeads.filter((lead, index) => {
    const originalLead = originalLeads[index];
    const matchesView = currentView === 'all' || 
      Object.keys(lead).some(key => lead[key] !== originalLead[key]);
    
    const matchesSearch = searchTerm === '' || 
      Object.values(lead).some(value => 
        value && typeof value === 'string' && 
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return matchesView && matchesSearch;
  });

  // Sort leads
  const sortedLeads = sortField 
    ? [...filteredLeads].sort((a, b) => {
        if (a[sortField] === undefined || a[sortField] === null) return sortDirection === 'asc' ? 1 : -1;
        if (b[sortField] === undefined || b[sortField] === null) return sortDirection === 'asc' ? -1 : 1;
        
        const valueA = typeof a[sortField] === 'string' ? a[sortField].toLowerCase() : a[sortField];
        const valueB = typeof b[sortField] === 'string' ? b[sortField].toLowerCase() : b[sortField];
        
        if (valueA < valueB) return sortDirection === 'asc' ? -1 : 1;
        if (valueA > valueB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      }) 
    : filteredLeads;

  // Paginate leads
  const paginatedLeads = sortedLeads.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const totalPages = Math.max(1, Math.ceil(sortedLeads.length / pageSize));

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleShowDetails = (lead: any) => {
    const originalLead = originalLeads.find(l => l.id === lead.id);
    setSelectedLead({ enriched: lead, original: originalLead });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Preview Enriched Data</h2>
        <p className="mt-2 text-gray-600">
          Review your enriched lead data. Our AI has filled in missing information and standardized formats.
        </p>
      </div>

      {isAnalyzing ? (
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
          <div className="flex justify-center mb-4">
            <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Analyzing Data Quality</h3>
          <p className="text-gray-600 mb-4">We're running comprehensive checks on your enriched data...</p>
          
          <div className="max-w-md mx-auto space-y-4">
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Verifying data consistency</span>
                <span>75%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full animate-pulse" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Evaluating data quality</span>
                <span>60%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Identifying data patterns</span>
                <span>40%</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full animate-pulse" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={`transition-all duration-500 ease-in-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 shadow-sm border border-green-100">
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <Sparkles className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-green-800">Fields Enriched</h3>
                  <p className="text-2xl font-bold text-green-900 mt-1">{analysisResults?.fieldsEnriched || 0}</p>
                  <p className="text-xs text-green-700 mt-1">Across {enrichedLeads.length} leads</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 shadow-sm border border-blue-100">
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-blue-800">Completeness Improvement</h3>
                  <p className="text-2xl font-bold text-blue-900 mt-1">+{analysisResults?.completenessImprovement || 0}%</p>
                  <p className="text-xs text-blue-700 mt-1">Better data quality</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 shadow-sm border border-purple-100">
              <div className="flex items-start">
                <div className="bg-purple-100 rounded-full p-2 mr-3">
                  <Tag className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-purple-800">Data Quality Score</h3>
                  <p className="text-2xl font-bold text-purple-900 mt-1">{analysisResults?.dataQualityScore || 0}/100</p>
                  <p className="text-xs text-purple-700 mt-1">{analysisResults?.dataQualityScore > 90 ? 'Excellent' : analysisResults?.dataQualityScore > 80 ? 'Very Good' : analysisResults?.dataQualityScore > 70 ? 'Good' : 'Average'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-4 shadow-sm border border-amber-100">
              <div className="flex items-start">
                <div className="bg-amber-100 rounded-full p-2 mr-3">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-amber-800">Potential Issues</h3>
                  <p className="text-2xl font-bold text-amber-900 mt-1">{analysisResults?.potentialIssues || 0}</p>
                  <p className="text-xs text-amber-700 mt-1">{analysisResults?.potentialIssues === 0 ? 'No issues detected' : 'Minor formatting inconsistencies'}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentView('changed')}
                  className={`px-3 py-1.5 text-xs rounded-md flex items-center ${
                    currentView === 'changed'
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  Changed Only
                </button>
                <button
                  onClick={() => setCurrentView('all')}
                  className={`px-3 py-1.5 text-xs rounded-md flex items-center ${
                    currentView === 'all'
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <EyeOff className="w-3.5 h-3.5 mr-1.5" />
                  Show All
                </button>
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className={`px-3 py-1.5 text-xs rounded-md flex items-center ${
                    showComparison
                      ? 'bg-indigo-100 text-indigo-700 font-medium'
                      : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <ArrowDownUp className="w-3.5 h-3.5 mr-1.5" />
                  {showComparison ? 'Hide Comparison' : 'Compare Before/After'}
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-3.5 w-3.5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search leads..."
                  className="pl-9 pr-3 py-1.5 text-xs border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                />
              </div>
              <button className="flex items-center text-xs text-indigo-600 hover:text-indigo-700 font-medium">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Export Preview
              </button>
            </div>

            {showComparison ? (
              // Before/After View
              <div>
                {paginatedLeads.map((lead, index) => {
                  const originalLead = originalLeads.find(l => l.id === lead.id) || {};
                  const hasChanges = Object.keys(lead).some(key => lead[key] !== originalLead[key]);
                  
                  return (
                    <div key={lead.id} className={`border-b border-gray-100 ${hasChanges ? '' : 'opacity-60'}`}>
                      <div className="p-3 bg-gray-50 font-medium text-sm text-gray-700">
                        {lead.name} - {lead.company}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                        <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                          <div className="text-xs text-red-500 font-medium mb-2">Before Enrichment</div>
                          <div className="space-y-2">
                            <ComparisonRow label="Email" value={originalLead.email || '-'} />
                            <ComparisonRow label="Phone" value={originalLead.phone || '-'} />
                            <ComparisonRow label="LinkedIn" value={originalLead.linkedin ? 'Available' : '-'} />
                            <ComparisonRow label="Title" value={originalLead.title || '-'} />
                            <ComparisonRow label="Industry" value={originalLead.industry || '-'} />
                            {selectedOptions.includes('intent') && (
                              <ComparisonRow label="Intent Score" value={originalLead.intentScore ? `${originalLead.intentScore}` : '-'} />
                            )}
                            {selectedOptions.includes('intent') && (
                              <ComparisonRow label="Recent Activity" value={originalLead.recentActivity || '-'} />
                            )}
                          </div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                          <div className="text-xs text-green-500 font-medium mb-2">After Enrichment</div>
                          <div className="space-y-2">
                            <ComparisonRow 
                              label="Email" 
                              value={lead.email || '-'} 
                              isEnriched={lead.email && !originalLead.email}
                            />
                            <ComparisonRow 
                              label="Phone" 
                              value={lead.phone || '-'} 
                              isEnriched={lead.phone && !originalLead.phone}
                            />
                            <ComparisonRow 
                              label="LinkedIn" 
                              value={lead.linkedin ? 'Available' : '-'} 
                              isEnriched={lead.linkedin && !originalLead.linkedin}
                            />
                            <ComparisonRow 
                              label="Title" 
                              value={lead.title || '-'} 
                              isEnriched={lead.title && !originalLead.title}
                            />
                            <ComparisonRow 
                              label="Industry" 
                              value={lead.industry || '-'} 
                              isEnriched={lead.industry && !originalLead.industry}
                            />
                            {selectedOptions.includes('intent') && (
                              <ComparisonRow 
                                label="Intent Score" 
                                value={lead.intentScore ? `${lead.intentScore}` : '-'} 
                                isEnriched={lead.intentScore && !originalLead.intentScore}
                              />
                            )}
                            {selectedOptions.includes('intent') && (
                              <ComparisonRow 
                                label="Recent Activity" 
                                value={lead.recentActivity || '-'} 
                                isEnriched={lead.recentActivity && !originalLead.recentActivity}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Table View
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <SortableHeader 
                        label="Name" 
                        field="name" 
                        sortField={sortField} 
                        sortDirection={sortDirection} 
                        onSort={() => handleSort('name')} 
                      />
                      <SortableHeader 
                        label="Email" 
                        field="email" 
                        sortField={sortField} 
                        sortDirection={sortDirection} 
                        onSort={() => handleSort('email')} 
                      />
                      <SortableHeader 
                        label="Company" 
                        field="company" 
                        sortField={sortField} 
                        sortDirection={sortDirection} 
                        onSort={() => handleSort('company')} 
                      />
                      <SortableHeader 
                        label="Title" 
                        field="title" 
                        sortField={sortField} 
                        sortDirection={sortDirection} 
                        onSort={() => handleSort('title')} 
                      />
                      <SortableHeader 
                        label="Phone" 
                        field="phone" 
                        sortField={sortField} 
                        sortDirection={sortDirection} 
                        onSort={() => handleSort('phone')} 
                      />
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        LinkedIn
                      </th>
                      {selectedOptions.includes('intent') && (
                        <SortableHeader 
                          label="Intent Score" 
                          field="intentScore" 
                          sortField={sortField} 
                          sortDirection={sortDirection} 
                          onSort={() => handleSort('intentScore')} 
                        />
                      )}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedLeads.map((lead, index) => {
                      const originalLead = originalLeads.find(o => o.id === lead.id) || {};
                      return (
                        <tr key={lead.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${!originalLead.email && lead.email ? 'font-semibold text-indigo-700' : 'text-gray-500'}`}>
                              {lead.email || '-'}
                              {!originalLead.email && lead.email && (
                                <span className="ml-1.5 px-1.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded">
                                  New
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {lead.company}
                              {lead.industry && (
                                <span className="ml-1.5 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                                  {lead.industry}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{lead.title || '-'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${!originalLead.phone && lead.phone ? 'font-semibold text-indigo-700' : 'text-gray-500'}`}>
                              {lead.phone || '-'}
                              {!originalLead.phone && lead.phone && (
                                <span className="ml-1.5 px-1.5 py-0.5 bg-indigo-100 text-indigo-800 text-xs rounded">
                                  New
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm ${!originalLead.linkedin && lead.linkedin ? 'font-semibold text-indigo-700' : 'text-gray-500'}`}>
                              {lead.linkedin ? (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center w-fit">
                                  <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                                  </svg>
                                  Profile
                                </span>
                              ) : (
                                '-'
                              )}
                            </div>
                          </td>
                          {selectedOptions.includes('intent') && (
                            <td className="px-6 py-4 whitespace-nowrap">
                              {lead.intentScore ? (
                                <div className="flex items-center">
                                  <span 
                                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                                      lead.intentScore > 70 
                                        ? 'bg-green-100 text-green-800' 
                                        : lead.intentScore > 40 
                                          ? 'bg-yellow-100 text-yellow-800' 
                                          : 'bg-red-100 text-red-800'
                                    }`}
                                  >
                                    {lead.intentScore}
                                  </span>
                                  {lead.recentActivity && (
                                    <span className="ml-2 text-xs text-gray-500 truncate max-w-[120px]" title={lead.recentActivity}>
                                      {lead.recentActivity}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                '-'
                              )}
                            </td>
                          )}
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button 
                              onClick={() => handleShowDetails(lead)}
                              className="text-indigo-600 hover:text-indigo-900 font-medium"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {paginatedLeads.length === 0 && (
                      <tr>
                        <td colSpan={selectedOptions.includes('intent') ? 8 : 7} className="px-6 py-4 text-center text-sm text-gray-500">
                          No leads match your criteria
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, sortedLeads.length)} of {sortedLeads.length} leads
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 text-xs rounded-md ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 text-xs rounded-md ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {selectedLead && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Lead Details</h3>
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Original Data</h4>
                      <LeadDetails lead={selectedLead.original} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Enriched Data</h4>
                      <LeadDetails lead={selectedLead.enriched} showIntent={selectedOptions.includes('intent')} />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-6 py-3 flex justify-end">
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center mt-8">
            <button
              onClick={onValidate}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center shadow-md hover:shadow-lg transition-all"
            >
              Continue to Segmentation
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

interface SortableHeaderProps {
  label: string;
  field: string;
  sortField: string | null;
  sortDirection: 'asc' | 'desc';
  onSort: () => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({
  label,
  field,
  sortField,
  sortDirection,
  onSort
}) => {
  return (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={onSort}
    >
      <div className="flex items-center">
        {label}
        {sortField === field ? (
          <span className="ml-1">
            {sortDirection === 'asc' ? '↑' : '↓'}
          </span>
        ) : null}
      </div>
    </th>
  );
};

interface ComparisonRowProps {
  label: string;
  value: string;
  isEnriched?: boolean;
}

const ComparisonRow: React.FC<ComparisonRowProps> = ({ label, value, isEnriched }) => {
  return (
    <div className="flex justify-between">
      <span className="text-xs text-gray-500">{label}:</span>
      <span className={`text-xs ${isEnriched ? 'font-medium text-green-700' : 'text-gray-700'}`}>
        {value}
        {isEnriched && <span className="ml-1 text-[10px] text-green-600">✓</span>}
      </span>
    </div>
  );
};

interface LeadDetailsProps {
  lead: any;
  showIntent?: boolean;
}

const LeadDetails: React.FC<LeadDetailsProps> = ({ lead, showIntent = false }) => {
  if (!lead) return <div className="text-sm text-gray-500">No data available</div>;
  
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Name</label>
        <div className="text-sm font-medium text-gray-900">{lead.name || '-'}</div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Company</label>
        <div className="text-sm font-medium text-gray-900">{lead.company || '-'}</div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Title</label>
        <div className="text-sm font-medium text-gray-900">{lead.title || '-'}</div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Email</label>
        <div className="text-sm font-medium text-gray-900">{lead.email || '-'}</div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Phone</label>
        <div className="text-sm font-medium text-gray-900">{lead.phone || '-'}</div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">LinkedIn</label>
        <div className="text-sm font-medium text-gray-900">
          {lead.linkedin ? (
            <a href="#" className="text-blue-600 hover:underline">View Profile</a>
          ) : (
            '-'
          )}
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Industry</label>
        <div className="text-sm font-medium text-gray-900">{lead.industry || '-'}</div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Company Size</label>
        <div className="text-sm font-medium text-gray-900">{lead.companySize || '-'}</div>
      </div>
      {showIntent && (
        <>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Intent Score</label>
            <div className="text-sm font-medium text-gray-900">
              {lead.intentScore ? (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  lead.intentScore > 70 
                    ? 'bg-green-100 text-green-800' 
                    : lead.intentScore > 40 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-red-100 text-red-800'
                }`}>
                  {lead.intentScore}
                </span>
              ) : (
                '-'
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Recent Activity</label>
            <div className="text-sm font-medium text-gray-900">{lead.recentActivity || '-'}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewData;