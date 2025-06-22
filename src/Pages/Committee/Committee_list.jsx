import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

export default function Committee_list() {
  const [committeeList, setCommitteeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - i);

  const fetchCommitteeList = async () => {
    try {
      const response = await AxiosInstance.get("committees/");
      setCommitteeList(response.data);
    } catch (error) {
      console.error("Error fetching committee list:", error);
    }
  };

  useEffect(() => {
    fetchCommitteeList();
  }, []);

  useEffect(() => {
    const filtered = committeeList.filter(
      (item) => Number(item.year) === Number(selectedYear)
    );
    setFilteredList(filtered);
  }, [selectedYear, committeeList]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Committee Members ({selectedYear})
        </h2>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-400 px-3 py-2 rounded text-gray-700"
        >
          {years.map((year) => (
            <option key={year}>{year}</option>
          ))}
        </select>
      </div>

      {filteredList.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">No committee members found for {selectedYear}.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredList.map((member, index) => (
            <div
              key={member.id}
              className="bg-white border border-gray-200 rounded-lg shadow p-4 hover:shadow-md transition"
            >
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full font-semibold">
                  #{index + 1} • {member.committee_position}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-gray-700 mt-1">
                Bar Reg. No: <span className="font-medium">{member.bar_registration_number}</span>
              </p>
              <p className="text-sm text-gray-700">
                Phone: <span className="font-medium">{member.phone}</span>
              </p>
              <p className="text-xs text-gray-400 mt-2">Year: {member.year}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
