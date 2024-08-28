import React, { useState, useEffect, useCallback } from 'react';
import { OptimalConfigurationFinder } from './services/optimal-configuration-finder';
import { ConfigurationScorer } from './services/configuration-scorer';
import { JsonDataRepository } from './services/json-data-repository';
import { ResultDisplay } from './components/ResultsDisplay';
import { Configuration } from './types/configuration.types';
import { FaCar, FaCog } from 'react-icons/fa';
import { CustomSelect } from './components/CustomSelect';

const dataRepository = JsonDataRepository.getInstance();
const configurationScorer = new ConfigurationScorer();

export default function App() {
  const [driver, setDriver] = useState('');
  const [profile, setProfile] = useState('balanced');
  const [result, setResult] = useState<Configuration | null>(null);
  const [finder] = useState(() => new OptimalConfigurationFinder(dataRepository, configurationScorer));
  const [drivers, setDrivers] = useState<string[]>([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      const driverList = await dataRepository.getDrivers();
      setDrivers(driverList.map(d => d.name));
    };
    fetchDrivers();
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (driver) {
      const optimalConfig = await finder.findOptimalConfiguration(driver, profile);
      setResult(optimalConfig);
    }
  }, [driver, profile, finder]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-600 mb-1">[MK8DX]</h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Kart Configuration Optimizer</h2>
          <p className="text-gray-600 mb-6">Find the best setup for your racing style!</p>

          <form onSubmit={handleSubmit} className="space-y-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomSelect
                id="driver-select"
                label="Driver"
                icon={<FaCar className="inline-block mr-2" />}
                value={driver}
                onChange={setDriver}
                options={drivers}
                placeholder="Select a driver"
              />

              <CustomSelect
                id="profile-select"
                label="Profile"
                icon={<FaCog className="inline-block mr-2" />}
                value={profile}
                onChange={setProfile}
                options={[
                  { value: 'balanced', label: 'Balanced' },
                  { value: 'speed', label: 'Speed' },
                  { value: 'technical', label: 'Technical' },
                ]}
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={!driver}
            >
              Find Optimal Configuration
            </button>
          </form>
        </div>

        {result && <ResultDisplay result={result} />}
      </div>
    </div>
  );
}