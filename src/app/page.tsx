'use client';

import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { fetchMakes, fetchYears } from 'src/app/lib/api';

export default function Home() {
  const [makes, setMakes] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const loadMakes = async () => {
      const fetchedMakes = await fetchMakes();
      setMakes(fetchedMakes);
    };

    loadMakes();
  }, []);

  useEffect(() => {
    const fetchedYears = fetchYears();
    setYears(fetchedYears);
  }, []);

  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  useEffect(() => {
    if (selectedMake && selectedYear) {
      setIsEnabled(true);
    }
  }, [selectedMake, selectedYear]);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen bg-gray-100 p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-center mb-6">Choose Make</h1>

        <Suspense
          fallback={<div className="text-center">Loading makes...</div>}
        >
          <div className="select-container mb-4">
            <label
              htmlFor="make"
              className="block text-sm font-medium text-gray-700"
            >
              Make:
            </label>
            <select
              id="make"
              value={selectedMake}
              onChange={handleMakeChange}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            >
              <option value="" className="text-gray">
                Make
              </option>
              {makes.map((make) => (
                <option key={make.MakeId} value={make.MakeId}>
                  {make.MakeName}
                </option>
              ))}
            </select>
          </div>
        </Suspense>

        <Suspense
          fallback={<div className="text-center">Loading years...</div>}
        >
          <div className="select-container mb-6">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year:
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
              className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            >
              <option value="">Choose a Year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </Suspense>

        <div className="mb-8">
          {selectedMake && (
            <p className="text-sm text-gray-600">
              You selected make: {selectedMake}
            </p>
          )}
          {selectedYear && (
            <p className="text-sm text-gray-600">
              You selected year: {selectedYear}
            </p>
          )}
        </div>

        <div className="next-button-container w-full max-w-2xl">
          <Link href={`/result/${selectedMake}/${selectedYear}`}>
            <button
              className={`w-full py-2 rounded-md text-white ${isEnabled ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!isEnabled}
            >
              Next
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
