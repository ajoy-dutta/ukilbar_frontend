import { useState, useEffect, useCallback } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";
import ExpanseCategoryConfig from "./ExpanseCategoryConfig";

const GeneralExpense = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [expenseData, setExpenseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [showModal, setShowModal] = useState(false);
  const [percentageConfig, setPercentageConfig] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);

  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

  const fetchExpenseData = useCallback(async () => {
    try {
      const res = await AxiosInstance.get(
        `actual_expanse/?year=${selectedYear}`
      );
      setExpenseData(res.data);
      console.log("Expanse Data", res.data);
    } catch (err) {
      console.error("Failed to fetch expense data:", err);
    }
  }, [selectedYear]);

  const fetchPercentageConfig = async () => {
    try {
      const res = await AxiosInstance.get("general-expense-category/");
      setPercentageConfig(res.data);
    } catch (err) {
      console.error("Failed to fetch percentage config:", err);
    }
  };

  useEffect(() => {
    fetchExpenseData();
  }, [fetchExpenseData]);

  useEffect(() => {
    fetchPercentageConfig();
  }, []);

  useEffect(() => {
    const filtered = expenseData.filter((item) => {
      const date = new Date(item.date);
      return (
        selectedMonth === 0 || date.getMonth() + 1 === Number(selectedMonth)
      );
    });
    setFilteredData(filtered);
  }, [selectedMonth, expenseData]);

  useEffect(() => {
    const map = {};

    filteredData.forEach((item) => {
      const { expanseCategory, actualExpanse } = item;
      const amt = parseFloat(actualExpanse);
      map[expanseCategory] = (map[expanseCategory] || 0) + amt;
    });

    let totalFund = 0;
    const grouped = Object.entries(map)
      .filter(([cat]) => percentageConfig.some((p) => p.category === cat))
      .map(([cat, total]) => {
        const config = percentageConfig.find((p) => p.category === cat);
        const percent = config ? parseFloat(config.percentage) : 0;
        const fund = (total * percent) / 100;
        totalFund += fund;

        return {
          source: cat,
          total: total.toFixed(2),
          percentage: percent,
          fund: fund.toFixed(2),
        };
      });

    setGroupedData(grouped);
    setTotalExpense(totalFund.toFixed(2));
  }, [filteredData, percentageConfig]);

  const monthName = new Date(selectedYear, selectedMonth - 1).toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">General Expense Report</h2>

      <div className="my-4 flex gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="font-medium">Select Year:</label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
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
          <label className="font-medium">Select Month:</label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="border px-4 py-2 rounded"
          >
            <option value={0}>All</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 mx-12">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Config Category
          </button>
        </div>
      </div>

      <ExpanseCategoryConfig
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          fetchPercentageConfig(); // Refresh config on close
        }}
        reportType="general"
      />

      <div className="mt-6">
        <h3 className="text-xl font-medium mb-2">
          General Expense Summary – {selectedYear} - {monthName}
        </h3>
        <table className="table table-bordered w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Expense Source</th>
              <th className="border px-4 py-2">Total Expense</th>
              <th className="border px-4 py-2">General Fund</th>
            </tr>
          </thead>
          <tbody>
            {groupedData.map((item, idx) => (
              <tr key={idx}>
                <td className="border px-4 py-2">{item.source}</td>
                <td className="border px-4 py-2">
                  {item.percentage === 100
                    ? item.total
                    : `${item.total} x ${item.percentage}%`}
                </td>
                <td className="border px-4 py-2 text-right">{item.fund} tk</td>
              </tr>
            ))}
            <tr>
              <td className="border px-4 py-2 text-right font-bold" colSpan={2}>
                Total
              </td>
              <td className="px-4 py-2 text-right font-bold">
                {totalExpense} tk
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralExpense;
