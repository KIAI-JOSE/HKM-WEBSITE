import React from 'react';
import { Heart, CreditCard, Gift, Smartphone, ShieldCheck, Calendar, Building2 } from 'lucide-react';

const Give: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-church-900 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Heart className="w-16 h-16 text-church-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Generosity Changes Lives</h1>
          <p className="text-xl text-gray-300">
            Thank you for your faithfulness. Your giving supports the mission of HKM Ministries to reach the lost and serve our community.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Ways to Give</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            
            {/* M-Pesa / Paybill Option */}
            <div className="flex flex-col items-center justify-center p-6 border-2 border-church-100 rounded-xl bg-church-50 hover:border-church-500 transition-all font-nav">
              <Smartphone className="w-10 h-10 text-green-600 mb-3" />
              <span className="font-bold text-gray-900 text-lg">M-Pesa Paybill</span>
              <div className="mt-4 text-center space-y-2">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Paybill Number</p>
                    <p className="text-3xl font-bold text-church-900 tracking-tight">400200</p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Account Number</p>
                    <p className="text-xl font-bold text-church-800">882900</p>
                </div>
              </div>
            </div>

            {/* Bank Transfer Option */}
            <div className="flex flex-col items-center justify-center p-6 border-2 border-church-100 rounded-xl bg-church-50 hover:border-church-500 transition-all font-nav">
              <Building2 className="w-10 h-10 text-church-600 mb-3" />
              <span className="font-bold text-gray-900 text-lg">Bank Transfer</span>
              <div className="mt-4 text-center space-y-2">
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Bank Name</p>
                    <p className="text-xl font-bold text-church-900">Co-op Bank</p>
                </div>
                <div>
                   <p className="text-xs text-gray-500 uppercase tracking-wide font-bold">Account Number</p>
                   <p className="text-xl font-bold text-church-800">882900</p>
                </div>
              </div>
            </div>

          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left border border-gray-100">
             <h3 className="font-bold text-lg mb-2 flex items-center gap-2 font-serif text-church-900">
               <ShieldCheck className="text-green-600" size={20} /> Secure Giving
             </h3>
             <p className="text-sm text-gray-600">
               Your contributions are processed securely. We appreciate your support in helping us spread the Gospel.
             </p>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8 text-center">
           <div className="p-6">
             <div className="w-12 h-12 bg-church-100 rounded-full flex items-center justify-center mx-auto mb-4 text-church-600">
               <Gift size={24} />
             </div>
             <h3 className="text-xl font-bold mb-3 font-serif">Tithe & Offering</h3>
             <p className="text-gray-600">Support the ongoing operations and ministry of the church through your regular giving.</p>
           </div>
           <div className="p-6">
             <div className="w-12 h-12 bg-church-100 rounded-full flex items-center justify-center mx-auto mb-4 text-church-600">
               <Heart size={24} />
             </div>
             <h3 className="text-xl font-bold mb-3 font-serif">Missions</h3>
             <p className="text-gray-600">Help us spread the Gospel locally and globally through our mission partners.</p>
           </div>
           <div className="p-6">
             <div className="w-12 h-12 bg-church-100 rounded-full flex items-center justify-center mx-auto mb-4 text-church-600">
               <Calendar size={24} />
             </div>
             <h3 className="text-xl font-bold mb-3 font-serif">Building Fund</h3>
             <p className="text-gray-600">Invest in the future of our church home and facilities for the next generation.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Give;