import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Plus, MapPin, Calendar, Droplets, Camera, Check } from 'lucide-react';
import { api } from '../services/api';
import { Farm } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const FarmsPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [farms, setFarms] = useState<Farm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // New farm form state
  const [newFarm, setNewFarm] = useState({
    name: '',
    location: '',
    area_acres: 2.0,
    current_crop: 'Tomato',
    crop_variety: '',
    crop_stage: 'Vegetative',
    sowing_date: '',
    irrigation_type: 'Drip Irrigation'
  });

  const cropStages = [
    'Germination',
    'Vegetative',
    'Flowering',
    'Development',
    'Maturity',
    'Harvest'
  ];

  useEffect(() => {
    const fetchFarms = async () => {
      try {
        const list = await api.getFarms();
        setFarms(list);
      } catch (e) {
        console.error('Failed to fetch farms:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFarms();
  }, []);

  const handleCreateFarm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFarm.name || !newFarm.current_crop) return;

    try {
      const created = await api.createFarm(newFarm);
      setFarms((prev) => [...prev, created]);
      setShowAddModal(false);
      setNewFarm({
        name: '',
        location: '',
        area_acres: 2.0,
        current_crop: 'Tomato',
        crop_variety: '',
        crop_stage: 'Vegetative',
        sowing_date: '',
        irrigation_type: 'Drip Irrigation'
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-24 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-forest-600 block">
            Plot & Crop Management
          </span>
          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-forest-900 mt-1">
            {t('myFarm')}
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
            Manage your land holdings, crops, growth stages and irrigation systems
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-forest-600 text-white font-semibold text-xs sm:text-sm hover:bg-forest-700 shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addFarm')}</span>
        </button>
      </div>

      {/* Farms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {farms.map((farm) => (
          <div
            key={farm.id}
            className="glass-panel p-6 rounded-3xl border border-forest-100 shadow-card-soft space-y-4 hover:border-forest-300 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-forest-50 border border-forest-200 text-forest-700 flex items-center justify-center font-bold text-xl">
                  🌱
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-forest-900">
                    {farm.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 text-gray-400" />
                    <span>{farm.location}</span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold bg-forest-100 text-forest-800 px-3 py-1 rounded-full">
                {farm.area_acres} Acres
              </span>
            </div>

            {/* Crop Info Card */}
            <div className="bg-forest-50/70 p-4 rounded-2xl border border-forest-100/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-forest-600 block">
                    Current Crop
                  </span>
                  <span className="font-bold text-base text-forest-900">
                    {farm.current_crop}
                  </span>
                  {farm.crop_variety && (
                    <span className="text-xs text-gray-500 ml-1">
                      ({farm.crop_variety})
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-forest-600 block">
                    Growth Stage
                  </span>
                  <span className="text-xs font-bold text-forest-900 bg-white px-2.5 py-0.5 rounded-full border border-forest-200 inline-block">
                    {farm.crop_stage}
                  </span>
                </div>
              </div>

              {/* Stage Progress Pills */}
              <div className="grid grid-cols-6 gap-1 pt-1">
                {cropStages.map((stage, idx) => {
                  const currentIdx = cropStages.indexOf(farm.crop_stage);
                  const isPassed = currentIdx >= idx;

                  return (
                    <div key={stage} className="text-center">
                      <div
                        className={`h-1.5 rounded-full mb-1 ${
                          isPassed ? 'bg-forest-600' : 'bg-gray-200'
                        }`}
                      />
                      <span className="text-[8px] font-semibold text-gray-400 uppercase hidden sm:block">
                        {stage.slice(0, 3)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Farm Details Meta */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4 text-forest-600 shrink-0" />
                <span>Sown: {farm.sowing_date || 'Aug 2026'}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Droplets className="w-4 h-4 text-sky-600 shrink-0" />
                <span>{farm.irrigation_type}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-3 border-t border-forest-100 flex items-center justify-between">
              <Link
                to={`/scan?farm_id=${farm.id}&crop=${encodeURIComponent(farm.current_crop)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-forest-600 text-white text-xs font-semibold hover:bg-forest-700 shadow-sm transition-all"
              >
                <Camera className="w-3.5 h-3.5 text-leaf-light" />
                <span>Check Crop On This Farm</span>
              </Link>
            </div>

          </div>
        ))}
      </div>

      {/* Add Farm Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="font-display font-bold text-xl text-forest-900">
              {t('addFarm')}
            </h3>

            <form onSubmit={handleCreateFarm} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1">
                  {t('farmName')} *
                </label>
                <input
                  type="text"
                  required
                  value={newFarm.name}
                  onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })}
                  placeholder="e.g. Narmada South Field"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-forest-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    {t('location')}
                  </label>
                  <input
                    type="text"
                    value={newFarm.location}
                    onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })}
                    placeholder="e.g. Bhopal, MP"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-forest-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    {t('areaAcres')}
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={newFarm.area_acres}
                    onChange={(e) => setNewFarm({ ...newFarm, area_acres: parseFloat(e.target.value) || 1.0 })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-forest-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    {t('currentCrop')} *
                  </label>
                  <select
                    value={newFarm.current_crop}
                    onChange={(e) => setNewFarm({ ...newFarm, current_crop: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-forest-500 bg-white"
                  >
                    <option value="Tomato">Tomato (टमाटर)</option>
                    <option value="Potato">Potato (आलू)</option>
                    <option value="Rice">Rice / Paddy (धान)</option>
                    <option value="Cotton">Cotton (कपास)</option>
                    <option value="Chilli">Chilli (मिर्च)</option>
                    <option value="Wheat">Wheat (गेहूं)</option>
                    <option value="Maize">Maize (मक्का)</option>
                    <option value="Soybean">Soybean (सोयाबीन)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    {t('cropStage')}
                  </label>
                  <select
                    value={newFarm.crop_stage}
                    onChange={(e) => setNewFarm({ ...newFarm, crop_stage: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-forest-500 bg-white"
                  >
                    {cropStages.map((stage) => (
                      <option key={stage} value={stage}>{stage}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Sowing Date
                  </label>
                  <input
                    type="text"
                    value={newFarm.sowing_date}
                    onChange={(e) => setNewFarm({ ...newFarm, sowing_date: e.target.value })}
                    placeholder="e.g. 15 Aug 2026"
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-forest-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    {t('irrigation')}
                  </label>
                  <select
                    value={newFarm.irrigation_type}
                    onChange={(e) => setNewFarm({ ...newFarm, irrigation_type: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-forest-500 bg-white"
                  >
                    <option value="Drip Irrigation">Drip Irrigation</option>
                    <option value="Furrow / Canal">Furrow / Canal</option>
                    <option value="Sprinkler">Sprinkler</option>
                    <option value="Rainfed">Rainfed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-600 text-white text-xs font-bold hover:bg-forest-700 shadow-sm"
                >
                  {t('saveFarm')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
