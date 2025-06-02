import { useState, useEffect } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";

const IncomeReport = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

  const [incomeData, setIncomeData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedOption, setSelectedOption] = useState("first10");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [probableIncome, setProbableIncome] = useState([]);

  useEffect(() => {
    fetchProbableIncomes();
  }, [selectedYear]);

  const fetchProbableIncomes = async () => {
    try {
      const response = await AxiosInstance.get(`probable_income/?year=${selectedYear}`);
      setProbableIncome(response.data);
    } catch (err) {
      console.error("Failed to fetch Probable income list:", err);
    }
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    setIncomeData(null);

    AxiosInstance.get(`income-report/?year=${selectedYear}`)
      .then((res) => {
        setIncomeData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching income data:", err);
        setError("Failed to load data");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedYear]);

  // Helper: Given rows and columns, compute totals for the chosen option
  const computeActualTotals = () => {
    if (!incomeData) return {};

    const { columns, rows } = incomeData;
    const categoryNames = columns.filter(
      (col) => col !== "trunc_date" && col !== "total"
    );

    console.log("columns", columns);
    console.log("rows", rows);

    // Determine which month‐numbers to include
    let monthsToInclude;
    if (selectedOption === "first10") {
      monthsToInclude = new Set(Array.from({ length: 10 }, (_, i) => i + 1));
    } else if (selectedOption === "last2") {
      monthsToInclude = new Set([11, 12]);
    } else {
      monthsToInclude = new Set(Array.from({ length: 12 }, (_, i) => i + 1));
    }

    // Initialize totals object
    const totals = {};
    categoryNames.forEach((cat) => (totals[cat] = 0));

    rows.forEach((row) => {
      const month = parseInt(row.trunc_date.split("-")[1], 10);
      if (monthsToInclude.has(month)) {
        categoryNames.forEach((cat) => {
          totals[cat] += parseFloat(row[cat] || 0);
        });
      }
    });

    // Round to two decimals
    categoryNames.forEach((cat) => {
      totals[cat] = Math.round(totals[cat] * 100) / 100;
    });

    return totals;
  };

  const actualTotals = computeActualTotals();

  const allCategories = Array.from(
    new Set([
      ...probableIncome.map((item) => item.IncomeCategory),
      ...Object.keys(actualTotals),
    ])
  );

  const combinedRows = allCategories.map((cat) => {
    const probableItem = probableIncome.find((pi) => pi.IncomeCategory === cat);
    const probableAmount = probableItem ? parseFloat(probableItem.amount) : 0;
    const actualAmount = actualTotals[cat] || 0;

    return {
      category: cat,
      probable: Math.round(probableAmount * 100) / 100,
      actual: Math.round(actualAmount * 100) / 100,
    };
  });

  const grandProbable = combinedRows
    .reduce((sum, row) => sum + row.probable, 0)
    .toFixed(2);
  const grandActual = combinedRows
    .reduce((sum, row) => sum + row.actual, 0)
    .toFixed(2);

  return (
    <div className="p-8 ">
      <h2 className="text-2xl font-semibold mb-4">Income Report</h2>

      {/* Year selector */}
      <div className="mb-4 flex items-center gap-2">
        <label htmlFor="yearSelect" className="font-medium">
          Select Year:
        </label>
        <select
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="border px-2 py-1 rounded"
        >
        {years.map((yr) => (
          <option key={yr} value={yr}>
            {yr}
          </option>
        ))}
        </select>
      </div>

      {/* Report‐type radio buttons */}
      <div className="mb-6">
        <label className="font-medium mr-4">Report for:</label>

        <label className="mr-4 inline-flex items-center">
          <input
            type="radio"
            name="reportType"
            value="first10"
            checked={selectedOption === "first10"}
            onChange={() => setSelectedOption("first10")}
            className="mr-1"
          />
          Jan – Oct
        </label>

        <label className="mr-4 inline-flex items-center">
          <input
            type="radio"
            name="reportType"
            value="last2"
            checked={selectedOption === "last2"}
            onChange={() => setSelectedOption("last2")}
            className="mr-1"
          />
          Nov & Dec
        </label>

        <label className="inline-flex items-center">
          <input
            type="radio"
            name="reportType"
            value="whole"
            checked={selectedOption === "whole"}
            onChange={() => setSelectedOption("whole")}
            className="mr-1"
          />
          Entire Year
        </label>
      </div>

      {/* Loading / Error states */}
      {loading && <p>Loading data for {selectedYear}…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {/* Combined Table */}
      {!loading && !error && (
        <div>
          <h3 className="text-xl font-medium mb-2">
            Probable vs Actual Income – {selectedYear} (
            {selectedOption === "first10"
              ? "Jan–Oct"
              : selectedOption === "last2"
              ? "Nov & Dec"
              : "All 12 Months"}
            )
          </h3>

          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                {/* <th className="py-1 border text-left">SL</th> */}
                <th className="px-2 py-1 border text-left">Category</th>
                <th className="px-2 py-1 border text-right">Probable</th>
                <th className="px-2 py-1 border text-right">Actual</th>
              </tr>
            </thead>
            <tbody>
              {combinedRows.map((row,idx) => (
                <tr key={row.category} className="border-t">
                 {/* <td className=" py-1 border">{idx+1}</td> */}
                  <td className="px-2 py-1 border">{row.category}</td>
                  <td className="px-2 py-1 border text-right">
                    {row.probable.toFixed(2)}
                  </td>
                  <td className="px-2 py-1 border text-right">
                    {row.actual.toFixed(2)}
                  </td>
                </tr>
              ))}

              {/* Grand total row */}
              <tr className="border-t font-semibold">
                <td className="px-2 py-1 border">Grand Total</td>
                <td className="px-2 py-1 border text-right">
                  {parseFloat(grandProbable).toFixed(2)}
                </td>
                <td className="px-2 py-1 border text-right">
                  {parseFloat(grandActual).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IncomeReport;
