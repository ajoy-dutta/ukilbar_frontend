import { useState, useEffect } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";

const ExpanseReport = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);
  const [rawData, setRawData] = useState([]);
  const [expanseList, setExpanseList] = useState([]);
  const [categoryTotals, setCategoryTotals] = useState({});
  const [probableExpanseList, setProbableExpanseList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    fetchexpanses();
    fetchProbableExpanses();
  }, [selectedYear]);

  const fetchProbableExpanses = async () => {
    try {
      const response = await AxiosInstance.get(
        `probable_expanse/?year=${selectedYear}`
      );
      setProbableExpanseList(response.data);
    } catch (err) {
      console.error("Failed to fetch Probable expanse list:", err);
    }
  };

  const fetchexpanses = async () => {
    try {
      const response = await AxiosInstance.get(
        `actual_expanse/?year=${selectedYear}`
      );
      setRawData(response.data);
    } catch (err) {
      console.error("Failed to fetch expanse list:", err);
    }
  };

  useEffect(() => {
    const filteredActual = rawData.filter((item) => {
      const date = new Date(item.date);
      return date.getMonth() + 1 === selectedMonth;
    });

    setExpanseList(filteredActual);
  }, [selectedMonth, rawData]);

  useEffect(() => {
    const totals = {};
    expanseList.forEach((item) => {
      const category = item.expanseCategory;
      const amount = parseFloat(item.actualExpanse);
      totals[category] = (totals[category] || 0) + amount;
    });
    setCategoryTotals(totals);
  }, [expanseList]);

  const mergedList = () => {
    const probableMap = {};
    probableExpanseList.forEach((item) => {
      probableMap[item.expanseCategory] = parseFloat(item.ProbableExpanse);
    });

    const allCategories = new Set([
      ...Object.keys(categoryTotals),
      ...Object.keys(probableMap),
    ]);

    return Array.from(allCategories).map((category) => ({
      category,
      actual: categoryTotals[category] || 0,
      probable: probableMap[category] || 0,
    }));
  };

  const monthName = new Date(selectedYear, selectedMonth - 1).toLocaleString('default', { month: 'long' });

 
  return (
    <div className="p-8 max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">Expanse Report</h2>
      <div className="my-4 flex flex-row gap-4 my-4">
        {/* Year selector */}
        <div className="px-2 flex items-center gap-2">
          <label htmlFor="year" className="font-medium">
            Select Year:
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
            }}
            className="border px-4 py-2 rounded"
          >
            {years.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-semibold">Select Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border px-2 py-2 rounded"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-medium mb-2">
          Probable vs Actual Income – {selectedYear} -{monthName}
        </h3>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Category</th>
              <th>Actual Expense</th>
              <th>Probable Expense</th>
            </tr>
          </thead>
          <tbody>
            {mergedList().map((item, idx) => (
              <tr key={idx}>
                <td>{item.category}</td>
                <td>{item.actual.toFixed(2)}</td>
                <td>{item.probable.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpanseReport;
