import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Heart, 
  BookOpen, 
  LogOut, 
  Download, 
  Calendar,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock Data
const GIVING_HISTORY = [
  { id: 1, date: '2023-10-29', type: 'Tithe', amount: '5,000 KES', method: 'M-Pesa' },
  { id: 2, date: '2023-10-22', type: 'Offering', amount: '1,000 KES', method: 'Cash' },
  { id: 3, date: '2023-10-15', type: 'Building Fund', amount: '10,000 KES', method: 'Bank Transfer' },
];

const RESOURCES = [
  { id: 1, title: 'Home Cell Study Guide - Nov 2023', type: 'PDF', size: '2.4 MB' },
  { id: 2, title: 'Church Constitution & Bylaws', type: 'PDF', size: '1.1 MB' },
  { id: 3, title: 'Leadership Training Manual', type: 'PDF', size: '5.6 MB' },
  { id: 4, title: 'Volunteer Roster - Q4', type: 'XLSX', size: '0.5 MB' },
];

const MemberDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear auth tokens here
    navigate('/login');
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-serif font-bold text-gray-900">Dashboard Overview</h2>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-50 text-church-600 rounded-lg">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-nav">Next Service Duty</p>
                    <p className="text-lg font-bold text-gray-900">Ushering Team</p>
                    <p className="text-xs text-gray-400">Sun, Nov 12 • 8:30 AM</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                    <Heart size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-nav">YTD Giving</p>
                    <p className="text-lg font-bold text-gray-900">45,000 KES</p>
                    <p className="text-xs text-green-600">Thank you for your faithfulness</p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                 <div className="flex items-center gap-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-nav">Home Cell Group</p>
                    <p className="text-lg font-bold text-gray-900">Utawala East</p>
                    <p className="text-xs text-gray-400">Fridays • 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Announcements */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 font-serif">Member Announcements</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-church-500 pl-4 py-1">
                  <p className="font-bold text-gray-900">Annual General Meeting</p>
                  <p className="text-sm text-gray-600">The AGM will be held on Dec 10th after the second service. All registered members are requested to attend.</p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4 py-1">
                  <p className="font-bold text-gray-900">Volunteer Opportunity</p>
                  <p className="text-sm text-gray-600">We need 5 more volunteers for the upcoming Youth Conference. Sign up at the information desk.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'giving':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
               <h2 className="text-2xl font-serif font-bold text-gray-900">My Giving History</h2>
               <button className="flex items-center gap-2 text-sm text-church-600 font-medium hover:text-church-800 bg-church-50 px-4 py-2 rounded-lg transition-colors">
                 <Download size={16} /> Download Statement
               </button>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider font-nav">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider font-nav">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider font-nav">Method</th>
                      <th className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider font-nav">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {GIVING_HISTORY.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.method}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">{item.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'resources':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h2 className="text-2xl font-serif font-bold text-gray-900">Member Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {RESOURCES.map((resource) => (
                <div key={resource.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 text-gray-600 rounded-lg group-hover:bg-church-50 group-hover:text-church-600 transition-colors">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-church-600 transition-colors">{resource.title}</p>
                      <p className="text-xs text-gray-500">{resource.type} • {resource.size}</p>
                    </div>
                  </div>
                  <button className="text-gray-400 group-hover:text-church-600 transition-colors">
                    <Download size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-church-900 text-white flex-shrink-0 md:min-h-[calc(100vh-80px)]">
          <div className="p-6 border-b border-church-800">
            <h1 className="text-xl font-brand font-bold text-white">Member Portal</h1>
            <p className="text-xs text-church-200 mt-1">Welcome, John Doe</p>
          </div>
          <nav className="p-4 space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors font-nav ${activeTab === 'dashboard' ? 'bg-church-800 text-white shadow-lg' : 'text-church-200 hover:bg-church-800 hover:text-white'}`}
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('giving')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors font-nav ${activeTab === 'giving' ? 'bg-church-800 text-white shadow-lg' : 'text-church-200 hover:bg-church-800 hover:text-white'}`}
            >
              <Heart size={18} /> My Giving
            </button>
            <button 
              onClick={() => setActiveTab('resources')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors font-nav ${activeTab === 'resources' ? 'bg-church-800 text-white shadow-lg' : 'text-church-200 hover:bg-church-800 hover:text-white'}`}
            >
              <BookOpen size={18} /> Resources
            </button>
            <div className="pt-4 mt-4 border-t border-church-800">
               <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-300 hover:bg-church-800 hover:text-red-200 transition-colors font-nav"
              >
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
           {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;