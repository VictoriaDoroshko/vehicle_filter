import { DataResult } from 'src/app/result/[makeId]/[year]/dataResult';
import { fetchMakes } from 'src/app/lib/api';
import { Suspense } from 'react';

export async function generateStaticParams() {
  try {
    const fetchedMakes = await fetchMakes();

    const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];

    const paths = fetchedMakes.flatMap(({ MakeId, MakeName }) =>
      years.map((year) => ({
        params: {
          makeId: MakeId.toString(),
          year: year.toString(),
          makeName: MakeName,
        },
      }))
    );

    return paths;
  } catch (error) {
    console.error('Error fetching makes:', error);
    return [];
  }
}

export default function ResultPage({
  params,
}: {
  params: { makeId: string; year: string };
}) {
  const { makeId, year } = params;

  return (
    <div className="grid grid-rows-[auto_1fr] items-center justify-items-center min-h-screen bg-gray-100 p-8 sm:p-20 gap-16">
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <DataResult makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
}
