'use client';

import { useState, useEffect, Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { fetchModels } from 'src/app/lib/api';

const ModelsList = ({ makeId, year }: { makeId: string; year: string }) => {
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    const fetchModelsData = async () => {
      const models = await fetchModels(makeId, year);
      setModels(models);
    };

    fetchModelsData();
  }, [makeId, year]);

  return (
    <ul className="space-y-4">
      {models.map((car) => (
        <li key={uuidv4()} className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">
            <span className="font-medium">ID:</span> {car.Make_ID}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Make:</span> {car.Make_Name}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Model:</span> {car.Model_Name}
          </p>
        </li>
      ))}
    </ul>
  );
};

export function DataResult({ makeId, year }: { makeId: string; year: string }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
      <h1 className="text-2xl font-semibold text-center mb-6">Car Models</h1>

      <Suspense
        fallback={
          <p className="text-center text-gray-500">Loading models...</p>
        }
      >
        <ModelsList makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
}
