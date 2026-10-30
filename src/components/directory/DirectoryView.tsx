import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DestinationService, ServiceCategory } from '../../types';
import { 
  MapPin, 
  Search, 
  Phone, 
  Clock, 
  Building2, 
  GraduationCap, 
  HeartPulse, 
  Baby, 
  Briefcase, 
  ShieldAlert, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

export const DirectoryView: React.FC = () => {
  const { destinationServices, t } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories: { key: string; label: string; icon: any }[] = [
    { key: 'ALL', label: 'All Services', icon: Building2 },
    { key: 'SCHOOL', label: 'Govt Schools', icon: GraduationCap },
    { key: 'PRIMARY_HEALTH_CENTRE', label: 'Health Centres (PHC)', icon: HeartPulse },
    { key: 'ANGANWADI', label: 'Anganwadi Daycare', icon: Baby },
    { key: 'LABOUR_SEVA_KENDRA', label: 'Labour Welfare Offices', icon: Briefcase },
    { key: 'NGO_CENTRE', label: 'Civil Society Hubs', icon: Building2 },
    { key: 'CHILD_SUPPORT', label: 'Childline & DCPU', icon: ShieldAlert },
  ];

  const filteredServices = destinationServices.filter(svc => {
    const matchesSearch = 
      svc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      svc.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      svc.pincode.includes(searchTerm) ||
      svc.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      svc.servicesOffered.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'ALL' || svc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (cat: ServiceCategory) => {
    switch (cat) {
      case 'SCHOOL': return GraduationCap;
      case 'PRIMARY_HEALTH_CENTRE': return HeartPulse;
      case 'ANGANWADI': return Baby;
      case 'LABOUR_SEVA_KENDRA': return Briefcase;
      case 'CHILD_SUPPORT': return ShieldAlert;
      default: return Building2;
    }
  };

  return (
    <div className="space-y-6">
      {/* Visual Header Banner with Destination Hub Image */}
      <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 text-white min-h-[170px] flex flex-col justify-end p-5">
        <img 
          src="/src/assets/images/destination_hub_pune_1793356921560.jpg"
          alt="Destination Facilitation Kiosk" 
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-mono tracking-wider text-[#F8D793] uppercase font-semibold">
            Maharashtra Destination Facilities · Pune &amp; Corridor Hubs
          </span>
          <h2 className="text-xl font-bold text-white mt-1">
            Verified Destination Service Directory
          </h2>
          <p className="text-xs text-neutral-200 mt-1">
            Access free public schools, primary health centers, Anganwadi nutrition hubs, and labour facilitation counters.
          </p>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="bg-white p-4 rounded-xl border border-neutral-200 shadow-xs space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by facility name, PIN code (e.g. 412207), taluka, or service..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#1C5F3B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-100">
          {categories.map(c => {
            const Icon = c.icon;
            return (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                  selectedCategory === c.key
                    ? 'bg-[#1C5F3B] text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map(svc => {
          const Icon = getCategoryIcon(svc.category);

          return (
            <div
              key={svc.id}
              className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between hover:border-neutral-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-500">
                    <Icon className="w-4 h-4 text-neutral-700" />
                    <span>{svc.district} · {svc.taluka}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EAF5EE] text-[#1C5F3B] border border-[#A4D7B7] font-semibold">
                    ✓ {svc.verificationStatus.replace('_', ' ')}
                  </span>
                </div>

                <h3 className="text-base font-bold text-neutral-900 leading-snug">
                  {svc.name}
                </h3>

                <div className="text-xs text-neutral-600 mt-2 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                  <span>{svc.address} (PIN: <strong className="font-mono">{svc.pincode}</strong>)</span>
                </div>

                <div className="text-xs text-neutral-600 mt-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>{svc.operatingHours}</span>
                </div>

                {/* Services List */}
                <div className="mt-3.5">
                  <span className="text-[11px] font-bold text-neutral-700">Services Provided:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {svc.servicesOffered.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-neutral-50 border border-neutral-200 text-neutral-700 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-3 p-2 bg-neutral-50 rounded-lg text-[11px] text-neutral-600 border border-neutral-100">
                  <strong>Access Policy:</strong> {svc.eligibilityNotes}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-neutral-500">Contact:</span>{' '}
                  <span className="font-semibold text-neutral-900">{svc.contactPerson}</span>
                </div>

                <a
                  href={`tel:${svc.contactPhone.replace(/[^0-9+]/g, '')}`}
                  className="px-3 py-1.5 bg-[#1C5F3B] hover:bg-[#14462B] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span className="font-mono">{svc.contactPhone}</span>
                </a>
              </div>
            </div>
          );
        })}

        {filteredServices.length === 0 && (
          <div className="col-span-2 py-12 text-center text-neutral-500 bg-white rounded-xl border border-neutral-200">
            No facilities found matching your search. Try searching &quot;Wagholi&quot; or &quot;412207&quot;.
          </div>
        )}
      </div>
    </div>
  );
};
