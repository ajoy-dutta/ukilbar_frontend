import React, { useState, useEffect } from 'react';
import AxiosInstance from '../../../Components/AxiosInstance';

const IncomeList = () => {
  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState(new Date().getMonth() + 1); // 1–12
  const [data, setData] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    AxiosInstance.get('income-report/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching income data:', error);
      });
  }, []);

  const getDaysInMonth = (year, month) => {
    const days = [];
    const totalDays = new Date(year, month, 0).getDate(); // gets correct total days in month
    for (let day = 1; day <= totalDays; day++) {
        const formatted = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        days.push(formatted);
    }
    return days;
  };


  


  const getFilteredRows = () => {
    if (!data) return [];

    const allDates = getDaysInMonth(currentYear, month);
    const dateRowMap = new Map(data.rows?.map(row => [row.trunc_date, row]));

    return allDates?.map(date => {
      const existingRow = dateRowMap.get(date);
      if (existingRow) return existingRow;

      const blankRow = { trunc_date: date };
      data.columns?.slice(1, -1).forEach(cat => {
        blankRow[cat] = 0;
      });
      blankRow.total = 0;
      return blankRow;
    });
  };

  if (!data) return <p className="p-4">Loading...</p>;

  const columns = data.columns;
  const filteredRows = getFilteredRows();

  return (
    <div className="p-4">
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Month:</label>
        <select
          value={month}
          onChange={e => setMonth(Number(e.target.value))}
          className="border px-2 py-1 rounded"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i+1} value={i + 1}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <h1 className='text-black text-center text-lg font-semibold my-4'>Monthly Income List</h1>
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {columns?.map(col => (
                <th key={col} className="px-2 py-1 border border-gray-300 text-left whitespace-nowrap">
                  {col === 'trunc_date'? "Collection date" : col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRows?.map((row, idx) => (
              <tr key={idx} className="border-t">
                {columns?.map(col => (
                  <td key={col} className="px-2 py-1 border border-gray-200">
                    {col === 'trunc_date' ? row[col] : row[col]?.toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          <tfoot>
            <tr className="bg-gray-200 font-semibold">
              {columns.map(col => (
                <td key={col} className="px-2 py-1 border border-gray-300">
                  {col === 'trunc_date'
                    ? 'Total'
                    : col === 'total'
                    ? data.grand_total.toFixed(2)
                    : data.category_totals?.[col]?.toFixed(2) ?? '0.00'}
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default IncomeList;
