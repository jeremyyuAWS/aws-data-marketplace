import React, { useCallback, useState, useEffect } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertCircle, RefreshCw, ArrowRight, Search, Shield } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

// Mock CSV structure for simulation
const simulatedHeaders = [
  { original: 'DATASET NAME', mapped: 'name', confidence: 0.95 },
  { original: 'PROVIDER EMAIL', mapped: 'email', confidence: 0.98 },
  { original: 'PROVIDER', mapped: 'company', confidence: 0.99 },
  { original: 'PACKAGE TYPE', mapped: 'title', confidence: 0.92 },
  { original: 'CONTACT', mapped: 'phone', confidence: 0.97 },
  { original: 'PROVIDER URL', mapped: 'linkedin', confidence: 0.96 },
  { original: 'CATEGORY', mapped: 'industry', confidence: 0.89 },
  { original: 'PROVIDER SIZE', mapped: 'companySize', confidence: 0.85 },
  { original: 'DATASET TYPE', mapped: 'datasetType', confidence: 0.94 },
  { original: 'UPDATE FREQUENCY', mapped: 'updateFrequency', confidence: 0.92 },
  { original: 'AWS REGIONS', mapped: 'awsRegions', confidence: 0.91 },
];

const dataSampleRows = [
  { name: 'Financial Transactions Dataset', email: 'sales@financeprovider.com', company: 'Finance Provider Inc', title: 'Premium Data Package' },
  { name: 'Healthcare Analytics Bundle', email: 'support@healthdata.com', company: 'Health Data Co', title: 'Enterprise Package' },
  { name: 'Consumer Behavior Insights', email: 'info@consumermetrics.co', company: 'Consumer Metrics', title: 'Developer Package' },
];

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [headersMapped, setHeadersMapped] = useState<typeof simulatedHeaders>([]);
  const [dataQuality, setDataQuality] = useState({ 
    rows: 0, 
    completeness: 0, 
    issues: 0 
  });
  
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setAnimateIn(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setSelectedFile(file);
        simulateFileAnalysis(file);
      } else {
        alert('Please upload a CSV file');
      }
    }
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setSelectedFile(file);
        simulateFileAnalysis(file);
      } else {
        alert('Please upload a CSV file');
      }
    }
  }, []);

  const simulateFileAnalysis = (file: File) => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    // Simulate analysis taking some time
    setTimeout(() => {
      // Create random data quality stats based on file size
      const estimatedRows = Math.floor(file.size / 100) + 10;
      const randomCompleteness = Math.floor(Math.random() * 30) + 65; // 65-95%
      const randomIssues = Math.floor(estimatedRows * (Math.random() * 0.2));
      
      setDataQuality({
        rows: estimatedRows,
        completeness: randomCompleteness,
        issues: randomIssues
      });
      
      // Simulate header mapping with slight randomization of confidence
      const mappedHeaders = simulatedHeaders.map(header => ({
        ...header,
        confidence: Math.min(0.99, header.confidence * (0.95 + Math.random() * 0.1))
      }));
      
      setHeadersMapped(mappedHeaders);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 2500);
  };

  const handleProcessFile = useCallback(() => {
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
  }, [selectedFile, onFileUpload]);

  return (
    <div className={`space-y-6 transition-all duration-700 ease-in-out ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800">Upload AWS Data Marketplace Sources</h2>
        <p className="mt-2 text-gray-600">
          Upload a CSV file with your AWS Data Marketplace sources to get started. Our intelligent agents will help you analyze and enrich the data.
        </p>
      </div>

      <div className="flex items-center justify-center mb-8">
        <img 
          src="/images/aws-logo.png" 
          alt="AWS Marketplace" 
          className="h-8 mr-4" 
        />
        <span className="text-2xl font-bold text-gray-400">+</span>
        <div className="ml-4 flex items-center">
          <img 
            src="/images/lyzr-logo.png" 
            alt="Lyzr AI Agents" 
            className="h-7" 
          />
        </div>
      </div>

      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-[#FF9900] bg-[#FF9900]/5 scale-102 shadow-md'
            : selectedFile && !isAnalyzing && !analysisComplete
            ? 'border-green-500 bg-green-50'
            : isAnalyzing
            ? 'border-yellow-400 bg-yellow-50 animate-pulse'
            : analysisComplete
            ? 'border-[#FF9900] bg-[#FF9900]/5'
            : 'border-gray-300 hover:border-[#FF9900] hover:bg-gray-50'
        } ${selectedFile ? 'cursor-default' : 'cursor-pointer'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !selectedFile && document.getElementById('file-upload')?.click()}
      >
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          className="hidden"
          onChange={handleFileChange}
        />
        
        {!selectedFile && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-[#FF9900]/10 rounded-full flex items-center justify-center mb-4 animate-bounce-slow">
              <UploadCloud className="w-10 h-10 text-[#FF9900]" />
            </div>
            <p className="text-lg font-medium text-gray-800">
              Drag and drop your AWS Data Marketplace CSV file here
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or click to browse files
            </p>
          </div>
        )}
        
        {selectedFile && isAnalyzing && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <RefreshCw className="w-10 h-10 text-yellow-500 animate-spin" />
            </div>
            <p className="text-lg font-medium text-gray-800">Analyzing file...</p>
            <p className="text-sm text-gray-500 mt-1">Detecting headers and validating AWS Data Marketplace structure</p>
            
            <div className="mt-4 w-64 mx-auto">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Header detection</span>
                <span className="text-yellow-600">In progress</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full animate-progress" style={{ width: '60%' }}></div>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500 mb-1 mt-2">
                <span>Data structure analysis</span>
                <span className="text-yellow-600">In progress</span>
              </div>
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full animate-progress-delayed" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {selectedFile && !isAnalyzing && !analysisComplete && (
          <div className="flex flex-col items-center">
            <FileText className="w-12 h-12 text-green-500 mb-4" />
            <p className="text-lg font-medium text-gray-800">{selectedFile.name}</p>
            <p className="text-sm text-gray-500 mt-1">
              {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}
        
        {selectedFile && analysisComplete && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <p className="text-lg font-medium text-gray-800">Analysis Complete!</p>
            <p className="text-sm text-gray-500 mt-1">
              Detected {dataQuality.rows} data sources in {selectedFile.name}
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-4 w-full max-w-md mx-auto">
              <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                <div className="text-xs text-gray-500">Sources</div>
                <div className="text-xl font-semibold text-gray-800">{dataQuality.rows}</div>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                <div className="text-xs text-gray-500">Completeness</div>
                <div className="text-xl font-semibold text-gray-800">{dataQuality.completeness}%</div>
              </div>
              
              <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                <div className="text-xs text-gray-500">Issues</div>
                <div className={`text-xl font-semibold ${dataQuality.issues > 0 ? 'text-amber-600' : 'text-green-600'}`}>
                  {dataQuality.issues}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {selectedFile && analysisComplete && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-fade-in">
          <h3 className="text-lg font-medium text-gray-800 mb-4">AWS Data Marketplace Mapping</h3>
          <p className="text-sm text-gray-600 mb-4">
            Our AI has automatically mapped your CSV headers to AWS Data Marketplace fields with high confidence.
          </p>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CSV Column
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Maps to Field
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Confidence
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preview
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {headersMapped.slice(0, 6).map((header, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                      {header.original}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-[#FF9900]/10 text-[#FF9900] rounded-full">
                        {header.mapped}
                      </span>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 h-1.5 bg-gray-200 rounded-full mr-2">
                          <div 
                            className={`h-full rounded-full ${
                              header.confidence > 0.9 ? 'bg-green-500' : 
                              header.confidence > 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} 
                            style={{ width: `${header.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">
                          {Math.round(header.confidence * 100)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {index < 3 ? dataSampleRows[index][header.mapped as keyof typeof dataSampleRows[0]] || '-' : '-'}
                    </td>
                  </tr>
                ))}
                {headersMapped.length > 6 && (
                  <tr>
                    <td colSpan={4} className="px-4 py-2 text-center text-sm text-gray-500">
                      + {headersMapped.length - 6} more fields mapped
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {selectedFile && analysisComplete && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm animate-fade-in-delayed">
          <h3 className="text-lg font-medium text-gray-800 mb-3">AWS Data Quality Assessment</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-start">
              <div className="bg-[#FF9900]/10 rounded-full p-2 mr-3">
                <Search className="w-5 h-5 text-[#FF9900]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Data Completeness</p>
                <div className="flex items-center mt-1">
                  <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                    <div 
                      className={`h-full rounded-full ${
                        dataQuality.completeness > 80 ? 'bg-green-500' : 
                        dataQuality.completeness > 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`} 
                      style={{ width: `${dataQuality.completeness}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{dataQuality.completeness}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {dataQuality.completeness > 80 
                    ? 'Good overall completeness'
                    : 'Some metadata is missing and can be enriched'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">AWS Compatibility</p>
                <p className="text-xs text-gray-500 mt-1">
                  {dataQuality.issues === 0 
                    ? 'All sources are AWS Data Marketplace compatible'
                    : `${dataQuality.issues} compatibility issues found`}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {dataQuality.issues === 0 
                    ? 'Ready for Lyzr Agent integration'
                    : 'Our AI will attempt to fix compatibility issues'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-indigo-100 rounded-full p-2 mr-3">
                <RefreshCw className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Enrichment Potential</p>
                <div className="flex items-center mt-1">
                  <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                    <div 
                      className="h-full rounded-full bg-indigo-500" 
                      style={{ width: `${100 - dataQuality.completeness}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{100 - dataQuality.completeness}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {dataQuality.completeness < 70 
                    ? 'High potential for metadata enrichment'
                    : 'Some fields can be enriched with AI'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedFile && analysisComplete && (
        <div className="flex justify-center mt-8 animate-fade-in-delayed">
          <button
            onClick={handleProcessFile}
            className="bg-[#FF9900] hover:bg-[#E68A00] text-white px-6 py-3 rounded-lg font-medium flex items-center shadow-md hover:shadow-lg transition-all"
          >
            Process {dataQuality.rows} Data Sources
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      )}

      {!selectedFile && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
          <h3 className="text-sm font-medium text-blue-800">AWS Data Marketplace Format</h3>
          <p className="mt-1 text-sm text-blue-600">
            Your CSV should include columns like: Dataset Name, Provider, Category, Dataset Type, AWS Regions, etc. 
            Don't worry if some fields are missing - our AI will help fill them in!
          </p>
          <div className="mt-2 flex items-center">
            <img 
              src="/images/aws-logo.png" 
              alt="AWS" 
              className="h-5 mr-2" 
            />
            <p className="text-xs text-blue-800">
              Once imported, Lyzr's AI agents will automatically enrich and analyze your AWS Data Marketplace sources
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
