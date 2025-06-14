import { useState, useEffect } from "react";
import AxiosInstance from "../../../Components/AxiosInstance";
import CategoryConfig from "./CategoryConfig";
import WelfareExpanse from "./WelfareExpanse";


const WelfareFund = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const [selectedTab, setSelectedTab] = useState("income");
  const [incomeData, setIncomeData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [showModal, setShowModal] = useState(false);
  const [percentage, setPercentage] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalIncome, setTotalIncome] = useState("");


  const years = Array.from({ length: 11 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (selectedTab === "income") {
      fetchIncomeData();
    }
  }, [selectedYear, selectedTab]);

  const fetchIncomeData = async () => {
    try {
      const res = await AxiosInstance.get(`general-income-report/?year=${selectedYear}`);
      setIncomeData(res.data.records || []);
    } catch (err) {
      console.error("Failed to fetch income data:", err);
    }
  };


  useEffect(() => {
    const fetchCategories_and_Percentage = async () => {
        try {
        const res = await AxiosInstance.get("welfare-category-percentage/");
        setPercentage(res.data);
        } catch (err) {
        console.error("Failed to fetch percentageData:", err);
        }
    };
    fetchCategories_and_Percentage();
  },[])

  useEffect(() => {
    const filtered = incomeData.filter((item) => {
      const date = new Date(item.date);
      return selectedMonth === 0 || date.getMonth() + 1 === Number(selectedMonth);
    });
    setFilteredData(filtered);
  }, [selectedMonth, incomeData]);

  useEffect(() => {
    const sourceMap = {};

    filteredData.forEach((item) => {
        const source = item.source;
        const amount = parseFloat(item.amount);

        if (!sourceMap[source]) {
        sourceMap[source] = 0;
        }
        sourceMap[source] += amount;
    });

    setCategories(sourceMap)

    let totalIncome = 0;
    const grouped = Object.entries(sourceMap)
        .filter(([source]) => 
        percentage.some(p => p.category === source)
        )
        .map(([source, total]) => {
        const config = percentage.find(p => p.category === source);
        const percentValue = config ? parseFloat(config.percentage) : 0;
        const calculatedFund = (total * percentValue) / 100;
        totalIncome += calculatedFund;

        return {
            source,
            total: total.toFixed(2),
            percentage:percentValue,
            fund: calculatedFund.toFixed(2),
        };
        });
    setTotalIncome(totalIncome);
    setGroupedData(grouped);
    }, [filteredData, percentage]);


  const monthName = new Date(selectedYear, selectedMonth - 1).toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="p-8 max-w-4xl">

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${selectedTab === "income" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedTab("income")}
        >
          Welfare Income
        </button>
        <button
          className={`px-4 py-2 rounded ${selectedTab === "expanse" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          onClick={() => setSelectedTab("expanse")}
        >
          Welfare Expanse
        </button>
      </div>

      {/* Conditional Rendering */}
      {
        selectedTab == 'expanse' ? (
          <WelfareExpanse/>
        ):(
      <>
      <h2 className="text-2xl font-semibold mb-4"> Welfare Income Report</h2>

      <div className="my-4 flex gap-4">
        {/* Year selector */}
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

        {/* Month selector */}
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
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mt-4"
            >
            Config Category
        </button>
        </div>

      </div>

      <CategoryConfig 
      isOpen={showModal} 
      onClose={() => setShowModal(false)} 
      categoryData={categories}
      reportType='welfare'
      />

      <div className="mt-6">
        <h3 className="text-xl font-medium mb-2">
         Welfare Fund Income Summary – {selectedYear} - {monthName}
        </h3>
        <table className="table table-bordered w-full border">
          <thead>
            <tr className="bg-gray-100">
                <th className="border px-4 py-2">Income Source</th>
                <th className="border px-4 py-2">Total Income</th>
                <th className="border px-4 py-2">Welfare Fund</th>
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
                <td className="border px-4 py-2 text-right font-bold" colSpan={2}>Total</td>
                <td className="px-4 py-2 text-right font-bold">{totalIncome} tk</td>
            </tr>
            </tbody>
        </table>
      </div>
      </>
      )}
    </div>
  );
};

export default WelfareFund;
