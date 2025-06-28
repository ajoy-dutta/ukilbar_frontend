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
    const filtered = committeeList.filter((item) => Number(item.year) === Number(selectedYear));
    setFilteredList(filtered);
  }, [selectedYear, committeeList]);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Committee List</h2>

      {/* Year filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Select Year:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border px-3 py-1 rounded border-gray-600"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white text-sm border rounded shadow">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">SL</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Bar Registration</th>
              <th className="p-2 border">Position</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length === 0 ? (
              <tr>
                <td className="p-2 border text-center" colSpan={6}>
                  No committee found for {selectedYear}.
                </td>
              </tr>
            ) : (
              filteredList.map((member, index) => (
                <tr key={member.id}>
                  <td className="p-2 border">{index + 1}</td>
                  <td className="p-2 border">{member.name}</td>
                  <td className="p-2 border">{member.phone}</td>
                  <td className="p-2 border">{member.bar_registration_number}</td>
                  <td className="p-2 border">{member.committee_position}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
