import React, { useState, useEffect } from 'react';
import { CheckCircle, Database, ArrowRight, Zap, Bot, BarChart, User, Server, Clock, Shield, Network, CloudLightning, Layers, Package, Search } from 'lucide-react';

interface EnrichmentOptionsProps {
  leads: any[];
  onEnrichmentSelect: (options: string[]) => void;
}

const EnrichmentOptions: React.FC<EnrichmentOptionsProps> = ({ leads, onEnrichmentSelect }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [automatedRecommendation, setAutomatedRecommendation] = useState<string[] | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<'basic' | 'advanced'>('basic');
  const [searchTerm, setSearchTerm] = useState("");
  
  const enrichmentOptions = {
    basic: [
      {
        id: 'metadata',
        name: 'AWS Data Metadata',
        description: 'Enhance datasets with AWS-specific metadata like regions, service integrations, and schema information.',
        icon: <Database className="w-5 h-5 text-blue-500" />,
        impact: 'high',
        fields: ['datasetType', 'updateFrequency', 'awsRegions'],
      },
      {
        id: 'provider',
        name: 'Provider Information',
        description: 'Add detailed data provider information, contact details, and support levels.',
        icon: <User className="w-5 h-5 text-green-500" />,
        impact: 'medium',
        fields: ['email', 'phone', 'supportLevel'],
      },
      {
        id: 'integration',
        name: 'AWS Integration Details',
        description: 'Include AWS service integration documentation, sample code, and implementation guides.',
        icon: <Zap className="w-5 h-5 text-purple-500" />,
        impact: 'high',
        fields: ['apiDocs', 'sampleCode', 'awsServiceIntegrations'],
      },
      {
        id: 'insights',
        name: 'Usage & Insights',
        description: 'Add AI-generated usage recommendations, performance metrics, and Lyzr agent compatibility.',
        icon: <Bot className="w-5 h-5 text-indigo-500" />,
        impact: 'high',
        fields: ['dataQualityScore', 'usageTrend', 'compatibleLyzrAgents'],
      },
    ],
    advanced: [
      {
        id: 'security',
        name: 'Security Classification',
        description: 'Add security certifications, compliance status, and data sensitivity classifications.',
        icon: <Shield className="w-5 h-5 text-red-500" />,
        impact: 'high',
        fields: ['securityCerts', 'complianceStatus', 'dataClassification'],
      },
      {
        id: 'performance',
        name: 'Performance Metrics',
        description: 'Include latency, throughput, and reliability metrics for data access patterns.',
        icon: <BarChart className="w-5 h-5 text-amber-500" />,
        impact: 'medium',
        fields: ['avgLatency', 'throughputRating', 'reliability'],
      },
      {
        id: 'delivery',
        name: 'Delivery Method Details',
        description: 'Add details on API specs, data formats, and access mechanisms.',
        icon: <CloudLightning className="w-5 h-5 text-cyan-500" />,
        impact: 'medium',
        fields: ['apiVersion', 'dataFormats', 'accessMethods'],
      },
      {
        id: 'schema',
        name: 'Schema Information',
        description: 'Enhanced schema details, field types, and validation rules.',
        icon: <Layers className="w-5 h-5 text-blue-600" />,
        impact: 'medium',
        fields: ['schemaVersion', 'fieldTypes', 'validationRules'],
      },
      {
        id: 'marketplace',
        name: 'Marketplace Analytics',
        description: 'Include popularity metrics, subscriber counts, and industry adoption stats.',
        icon: <Server className="w-5 h-5 text-green-600" />,
        impact: 'medium',
        fields: ['popularity', 'subscriberCount', 'industryAdoption'],
      },
      {
        id: 'aws_services',
        name: 'AWS Service Mapping',
        description: 'Detailed AWS service compatibility and usage patterns.',
        icon: <Network className="w-5 h-5 text-orange-500" />,
        impact: 'high',
        fields: ['serviceCompatibility', 'usagePatterns', 'integrationGuides'],
      },
      {
        id: 'updates',
        name: 'Update & Version History',
        description: 'Historical update frequency, version changes, and data freshness metrics.',
        icon: <Clock className="w-5 h-5 text-purple-600" />,
        impact: 'low',
        fields: ['updateHistory', 'dataFreshness', 'versionChanges'],
      },
      {
        id: 'pricing',
        name: 'Pricing Details',
        description: 'Comprehensive pricing tiers, usage costs, and optimization recommendations.',
        icon: <Package className="w-5 h-5 text-indigo-600" />,
        impact: 'medium',
        fields: ['pricingTiers', 'usageCosts', 'costOptimization'],
      },
    ]
  };
  
  // Filter options based on search term
  const filteredOptions = currentCategory === 'basic' 
    ? enrichmentOptions.basic.filter(option => 
        option.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        option.description.toLowerCase().includes(searchTerm.toLowerCase()))
    : enrichmentOptions.advanced.filter(option => 
        option.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        option.description.toLowerCase().includes(searchTerm.toLowerCase()));

  // Calculate missing fields to make quality recommendations
  useEffect(() => {
    // Analyze the data
    const missingMetadata = leads.some(lead => !lead.datasetType || !lead.updateFrequency || !lead.awsRegions);
    const missingProvider = leads.some(lead => !lead.email || !lead.phone);
    const missingIntegration = leads.some(lead => !lead.apiDocs || !lead.sampleCode || !lead.awsServiceIntegrations);
    
    // Create recommendation
    const recommendation = [];
    if (missingMetadata) recommendation.push('metadata');
    if (missingProvider) recommendation.push('provider');
    if (missingIntegration) recommendation.push('integration');
    
    // Always recommend insights as they're valuable
    recommendation.push('insights');
    
    setTimeout(() => {
      setAutomatedRecommendation(recommendation);
      setShowRecommendation(true);
    }, 1500);
    
    // Trigger animations
    setTimeout(() => {
      setAnimateIn(true);
    }, 300);
  }, [leads]);

  const handleOptionToggle = (optionId: string) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const applyRecommendation = () => {
    if (automatedRecommendation) {
      setSelectedOptions(automatedRecommendation);
    }
  };

  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      onEnrichmentSelect(selectedOptions);
    } else {
      alert('Please select at least one enrichment option');
    }
  };

  return (
    <div className={`space-y-6 transition-all duration-700 ease-in-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Enrich Your AWS Data Marketplace Sources</h2>
        <p className="mt-2 text-gray-600">
          Select the types of enrichment you'd like to apply. Our AI will enhance your data with these additional fields.
        </p>
      </div>

      {showRecommendation && automatedRecommendation && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-5 animate-fade-in">
          <div className="flex items-start">
            <div className="bg-indigo-100 rounded-full p-2 mr-3">
              <Bot className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-indigo-900 mb-1">AI-Generated Recommendation</h3>
              <p className="text-indigo-700 text-sm mb-3">
                Based on analysis of your {leads.length} AWS data sources, we recommend the following enrichments:
              </p>
              <div className="flex flex-wrap mt-2">
                {automatedRecommendation.map(option => {
                  const optionDetails = [...enrichmentOptions.basic, ...enrichmentOptions.advanced].find(o => o.id === option);
                  return optionDetails ? (
                    <div key={option} className="flex items-center bg-white border border-indigo-200 rounded-md px-3 py-1.5 mr-2 mb-2">
                      {optionDetails.icon}
                      <span className="ml-2 text-sm font-medium text-indigo-700">{optionDetails.name}</span>
                    </div>
                  ) : null;
                })}
              </div>
              <button 
                className="mt-3 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
                onClick={applyRecommendation}
              >
                Apply Recommendation
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentCategory === 'basic'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setCurrentCategory('basic')}
          >
            Basic Enrichments
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              currentCategory === 'advanced'
                ? 'bg-indigo-100 text-indigo-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setCurrentCategory('advanced')}
          >
            Advanced AWS Enrichments
          </button>
        </div>
        
        <div className="relative w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search enrichments..."
            className="pl-10 pr-3 py-2 w-full border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredOptions.map(option => (
          <div 
            key={option.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              selectedOptions.includes(option.id)
                ? 'border-indigo-400 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'
            }`}
            onClick={() => handleOptionToggle(option.id)}
          >
            <div className="flex items-start">
              <div className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center ${
                selectedOptions.includes(option.id)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200'
              }`}>
                {selectedOptions.includes(option.id) && <CheckCircle className="w-4 h-4" />}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="mr-2">{option.icon}</div>
                    <h3 className="text-md font-medium text-gray-800">{option.name}</h3>
                  </div>
                  <div className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                    option.impact === 'high'
                      ? 'bg-green-100 text-green-800'
                      : option.impact === 'medium'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                  }`}>
                    {option.impact.charAt(0).toUpperCase() + option.impact.slice(1)} Impact
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                <div className="mt-3">
                  <h4 className="text-xs text-gray-500 uppercase">Adds these fields:</h4>
                  <div className="flex flex-wrap mt-1">
                    {option.fields.map(field => (
                      <div key={field} className="mr-2 mb-1 px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-md">
                        {field}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredOptions.length === 0 && (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <Search className="w-10 h-10 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-600">No enrichment options match your search</p>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={handleContinue}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center shadow-md hover:shadow-lg transition-all"
          disabled={selectedOptions.length === 0}
        >
          Apply {selectedOptions.length} Enrichments
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default EnrichmentOptions;