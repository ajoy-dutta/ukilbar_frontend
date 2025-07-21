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

  // Define desired position order
  const positionOrder = [
    "President",
    "Vice President",
    "Secretary",
    "Joint Secretary",
    "Assistant Secretary",
    "Library Secretary",
    "Member",
  ];

  // Sort filtered list based on position order
  const sortedFilteredList = [...filteredList].sort((a, b) => {
    const aIndex = positionOrder.indexOf(a.committee_position) !== -1
      ? positionOrder.indexOf(a.committee_position)
      : positionOrder.length;
    const bIndex = positionOrder.indexOf(b.committee_position) !== -1
      ? positionOrder.indexOf(b.committee_position)
      : positionOrder.length;
    return aIndex - bIndex;
  });

  // Group sorted list by position
  const groupedByPosition = sortedFilteredList.reduce((acc, item) => {
    const position = item.committee_position || "Other";
    if (!acc[position]) acc[position] = [];
    acc[position].push(item);
    return acc;
  }, {});

  return (
    <div className="p-4 max-w-5xl mx-auto font-serif">
      <h2 className="text-xl font-semibold mb-4">Committee List</h2>

      {/* Year filter */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Select Year:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border px-3 py-1 rounded border-gray-400"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto flex flex-col items-center border border-zinc-300 rounded shadow-md mt-6 p-4 bg-white">
        <h2 className="text-center text-lg md:text-xl font-bold mb-4 text-gray-800">
          Executive Committee {selectedYear} — Jashore District Lawyers Association
        </h2>

        <table className="w-3/4 border-collapse mb-4">
          <thead className="bg-gray-200 text-gray-700">
            <tr className="text-base">
              <th className="border w-40 border-zinc-400 p-3 text-center font-semibold">
                Position
              </th>
              <th className="border w-20 border-zinc-400 p-3 text-center font-semibold">
                SL No.
              </th>
              <th className="border border-zinc-400 p-3 text-center font-semibold">
                Advocate Name
              </th>
              <th className="border border-zinc-400 p-3 w-40 text-center font-semibold">
                Mobile Number
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {Object.keys(groupedByPosition).length === 0 ? (
              <tr>
                <td className="border p-3 text-center text-gray-500" colSpan={4}>
                  No committee found for {selectedYear}.
                </td>
              </tr>
            ) : (
              Object.entries(groupedByPosition).map(([position, members]) =>
                members.map((member, index) => {
                  const isPresident = position.toLowerCase() === "president";
                  const isSecretary = position.toLowerCase() === "secretary";
                  const highlightClass =
                    isPresident
                      ? "bg-green-50 border border-zinc-400"
                      : isSecretary
                      ? "bg-blue-50 border border-zinc-400"
                      : "";

                  return (
                    <tr
                      key={member.id}
                      className={`hover:bg-gray-50 transition ${highlightClass}`}
                    >
                      {index === 0 && (
                        <td
                          className="border border-zinc-400 p-3 text-left font-semibold align-middle"
                          rowSpan={members.length}
                        >
                          {position}
                        </td>
                      )}
                      <td className="border border-zinc-400 w-20 p-3 text-center">
                        {index + 1}
                      </td>
                      <td className="border border-zinc-400 p-3 px-4 text-left text-gray-700 font-semibold">
                        {member.advocate?.name_english}
                      </td>
                      <td className="border border-zinc-400 p-3 text-center">
                        {member.phone}
                      </td>
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
