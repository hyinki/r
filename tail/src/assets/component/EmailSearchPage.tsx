import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

interface EmailData {
  number: number;
  body: string;
  subject: string;
  from: string;
  to: string;
  date: string;
}

const EmailSearchPage: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState({
    body: '',
    subject: '',
    startDate: '',
    endDate: ''
  });

  // Sample data - replace with your actual data source
  const sampleData: EmailData[] = [
    {
      number: 1,
      body: 'Hello, this is a test email about project updates',
      subject: 'Project Update',
      from: 'john@example.com',
      to: 'team@example.com',
      date: '2024-01-15'
    },
    {
      number: 2,
      body: 'Meeting scheduled for tomorrow at 2 PM',
      subject: 'Meeting Reminder',
      from: 'alice@example.com',
      to: 'john@example.com',
      date: '2024-01-16'
    },
    {
      number: 3,
      body: 'Please review the attached document',
      subject: 'Document Review',
      from: 'bob@example.com',
      to: 'team@example.com',
      date: '2024-01-17'
    },
    {
      number: 4,
      body: 'Weekly status report attached',
      subject: 'Weekly Report',
      from: 'manager@example.com',
      to: 'team@example.com',
      date: '2024-01-18'
    },
    {
      number: 5,
      body: 'Client feedback on the latest proposal',
      subject: 'Client Feedback',
      from: 'client@example.com',
      to: 'sales@example.com',
      date: '2024-01-19'
    }
  ];

  const [emailData] = useState<EmailData[]>(sampleData);

  const filteredData = useMemo(() => {
    return emailData.filter(email => {
      const bodyMatch = !searchFilters.body || 
        email.body.toLowerCase().includes(searchFilters.body.toLowerCase());
      
      const subjectMatch = !searchFilters.subject || 
        email.subject.toLowerCase().includes(searchFilters.subject.toLowerCase());
      
      const startDateMatch = !searchFilters.startDate || 
        new Date(email.date) >= new Date(searchFilters.startDate);
      
      const endDateMatch = !searchFilters.endDate || 
        new Date(email.date) <= new Date(searchFilters.endDate);
      
      return bodyMatch && subjectMatch && startDateMatch && endDateMatch;
    });
  }, [emailData, searchFilters]);

  const handleInputChange = (field: string, value: string) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    // The filtering happens automatically via useMemo
    // You can add additional search logic here if needed
    console.log('Search triggered with filters:', searchFilters);
  };

  return (
    <div className="h-screen p-4 flex flex-col">
      <div className="w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Email Search</h1>
        
        <div className="flex flex-col lg:flex-row gap-6 flex-1">
          {/* Left Panel - Search Filters */}
          <div className="lg:w-1/3 xl:w-1/4 space-y-4 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Search Filters</h2>
              
              {/* Body Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body
                </label>
                <input
                  type="text"
                  value={searchFilters.body}
                  onChange={(e) => handleInputChange('body', e.target.value)}
                  placeholder="Search in email body..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Subject Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={searchFilters.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder="Search in subject..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Date Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">From</label>
                    <input
                      type="date"
                      value={searchFilters.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">To</label>
                    <input
                      type="date"
                      value={searchFilters.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Search Button */}
              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="w-full text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#2563eb',
                  borderColor: '#2563eb'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
              >
                <Search size={20} />
                Search
              </button>
            </div>
          </div>

          {/* Right Panel - Data Grid */}
          <div className="lg:w-2/3 xl:w-3/4 flex-1 min-h-0">
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700">
                  Results ({filteredData.length})
                </h2>
              </div>
              
              <div className="overflow-x-auto flex-1">
                <table className="w-full h-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        From
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        To
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Body
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredData.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No results found
                        </td>
                      </tr>
                    ) : (
                      filteredData.map((email) => (
                        <tr key={email.number} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {email.number}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {email.subject}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {email.from}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {email.to}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {email.date}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                            {email.body}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSearchPage;