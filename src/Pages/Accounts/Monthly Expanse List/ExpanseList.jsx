import { useState, useEffect } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";

const ExpanseList = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [rawData, setRawData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    AxiosInstance.get(`actual_expanse/?year=${selectedYear}`)
      .then((res) => {
        setRawData(res.data);
        const uniqueCategories = Array.from(
          new Set(res.data.map((item) => item.expanseCategory))
        );
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [selectedYear]);

  const getFilteredDataByMonth = () => {
    return rawData.filter((item) => {
      const date = new Date(item.date);
      return date.getMonth() + 1 === month;
    });
  };

  const getDaysInMonth = (year, month) => {
    const totalDays = new Date(year, month, 0).getDate();
    return Array.from({ length: totalDays }, (_, i) => {
      const day = i + 1;
      return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(
        2,
        "0"
      )}`;
    });
  };

  const getGroupedData = () => {
    const filtered = getFilteredDataByMonth();

    const grouped = {};
    filtered.forEach((item) => {
      const date = item.date;
      const category = item.expanseCategory;
      const amount = parseFloat(item.actualExpanse || 0);

      if (!grouped[date]) {
        grouped[date] = { trunc_date: date, total: 0 };
        categories.forEach((cat) => (grouped[date][cat] = 0));
      }

      grouped[date][category] += amount;
      grouped[date].total += amount;
    });

    // Fill missing dates
    const allDates = getDaysInMonth(selectedYear, month);
    allDates.forEach((date) => {
      if (!grouped[date]) {
        grouped[date] = { trunc_date: date, total: 0 };
        categories.forEach((cat) => (grouped[date][cat] = 0));
      }
    });

    // Return sorted by date
    return allDates.map((date) => grouped[date]);
  };

  //   const rows = getGroupedData();
  //   const columns = ["trunc_date", ...categories, "total"];

  const getTotalRow = (groupedData) => {
    const totals = { trunc_date: "Total", total: 0 };

    categories.forEach((cat) => {
      totals[cat] = 0;
    });

    groupedData.forEach((row) => {
      categories.forEach((cat) => {
        totals[cat] += row[cat] || 0;
      });
      totals.total += row.total || 0;
    });

    return totals;
  };

  const groupedData = getGroupedData();
  const totalRow = getTotalRow(groupedData);
  const finalData = [...groupedData, totalRow];

  return (
    <div className="p-4 px-8 mt-4">
      <div className="my-4 px-4 flex flex-row gap-4">
        {/* Year selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="year" className="font-semibold">
            Select Year:
          </label>
          <select
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
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
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
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

      <div className="overflow-auto">
        <h1 className="text-black text-center text-xl font-semibold my-4">
          Monthly Expanse List
        </h1>
        <table className="table-auto w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Collection Date</th>
              {categories.map((cat) => (
                <th key={cat} className="border px-2 py-1">
                  {cat}
                </th>
              ))}
              <th className="border px-2 py-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {finalData.map((row, idx) => (
              <tr
                key={idx}
                className={
                  row.trunc_date === "Total" ? "font-bold bg-gray-100" : ""
                }
              >
                <td className="border px-2 py-1">{row.trunc_date}</td>
                {categories.map((cat) => (
                  <td key={cat} className="border px-2 py-1 text-right">
                    {row[cat]?.toFixed(2)}
                  </td>
                ))}
                <td className="border px-2 py-1 text-right">
                  {row.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpanseList;
