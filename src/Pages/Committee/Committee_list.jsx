import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

export default function Committee_list() {
  const [committeeList, setCommitteeList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const years = Array.from(
    { length: 11 },
    (_, i) => new Date().getFullYear() - i
  );

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

  const groupedByPosition = filteredList.reduce((acc, item) => {
    const position = item.committee_position || "Other";
    if (!acc[position]) acc[position] = [];
    acc[position].push(item);
    return acc;
  }, {});

  useEffect(() => {
    const filtered = committeeList.filter(
      (item) => Number(item.year) === Number(selectedYear)
    );
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

      <div className="overflow-x-auto border rounded shadow-md mt-6 p-4 bg-white">
        <h2 className="text-center text-lg md:text-xl font-bold mb-4 text-gray-800">
          Executive Committee {selectedYear} — Jashore District Lawyers
          Association
        </h2>

        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="border p-3 text-center text-sm font-semibold">
                Position
              </th>
              <th className="border p-3 text-center text-sm font-semibold">
                SL No.
              </th>
              <th className="border p-3 text-center text-sm font-semibold">
                Advocate Name
              </th>
              <th className="border p-3 text-center text-sm font-semibold">
                Mobile Number
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Object.keys(groupedByPosition).length === 0 ? (
              <tr>
                <td
                  className="border p-3 text-center text-gray-500"
                  colSpan={4}
                >
                  No committee found for {selectedYear}.
                </td>
              </tr>
            ) : (
              Object.entries(groupedByPosition).map(([position, members]) =>
                members.map((member, index) => {
                  const isPresident = position.toLowerCase() === "president";
                  const isSecretary = position.toLowerCase() === "secretary";

                  return (
                    <tr
                      key={member.id}
                      className={`
                  hover:bg-gray-50 transition
                  ${
                    isPresident ? "bg-green-50 border-l-4 border-green-500" : ""
                  }
                  ${isSecretary ? "bg-blue-50 border-l-4 border-blue-500" : ""}
                `}
                    >
                      <td className="border p-3 text-center font-medium">
                        {isPresident && (
                          <span className="text-green-700">⭐ {position}</span>
                        )}
                        {isSecretary && (
                          <span className="text-blue-700">⭐ {position}</span>
                        )}
                        {!isPresident && !isSecretary && position}
                      </td>
                      <td className="border p-3 text-center">{index + 1}</td>
                      <td className="border p-3 text-center">{member.advocate.name_english}</td>
                      <td className="border p-3 text-center">{member.phone}</td>
                    </tr>
                  );
                })
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
