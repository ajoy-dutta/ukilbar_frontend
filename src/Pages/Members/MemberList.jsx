import { useEffect, useState } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

const MemberList = () => {
  const [advocates, setAdvocates] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        const response = await AxiosInstance.get("/advocates/");
        setAdvocates(response.data);
        setFiltered(response.data);
      } catch (error) {
        console.error("Error fetching advocates", error);
      }
    };
    fetchAdvocates();
  }, []);

  console.log("Advocates", advocates)

  useEffect(() => {
    if (filter === "all") {
      setFiltered(advocates);
    } else {
      const filteredData = advocates.filter(
        (adv) => adv.status && adv.status.toLowerCase() === filter
      );
      setFiltered(filteredData);
    }
  }, [filter, advocates]);
// bg-[#f5efe9]
  return (
    <div className="bg-teal-50">
      <div className="py-10 px-4 md:px-12">
        {/* Filter Dropdown */}
        <div className="mb-6">
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Filter by Advocate Status
          </label>
          <select
            className="border border-gray-300 rounded px-4 py-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="lg:w-[550px] mx-auto">
          <p className="font-bold text-center text-xl font-serif">
            Advocate List
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6 py-4">
          {filtered.map((advocate, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center justify-between font-serif border border-blue-200 p-4 rounded shadow-sm bg-white"
            >
              {/* Advocate Image */}
              <div className="w-32 h-32 mb-4 md:mb-0 md:mr-6 shrink-0 border border-[#d8c4b6] rounded-full overflow-hidden">
                {advocate.photo ? (
                  <img
                    src={advocate.photo}
                    alt="Advocate"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </div>

              {/* Advocate Info Table */}
              <div className="flex-1 w-full">
                <table className="table-auto w-full text-sm">
                  <tbody>
                    <tr>
                      <td className="bg-[#d8c4b6] text-right text-gray-600 px-2 border border-[#d8c4b6] w-1/3">
                        Name
                      </td>
                      <td className="text-gray-800 px-2 border border-[#d8c4b6]">
                        {advocate.name_english} ({advocate.name_bengali})
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#d8c4b6] text-right text-gray-600 px-2 border border-[#d8c4b6]">
                        Father's Name
                      </td>
                      <td className="text-gray-800 px-2 border border-[#d8c4b6]">
                        {advocate.father_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#d8c4b6] text-right text-gray-600 px-2 border border-[#d8c4b6]">
                        Present Address
                      </td>
                      <td className="text-gray-800 px-2 border border-[#d8c4b6]">
                        {advocate.current_address}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#d8c4b6] text-right text-gray-600 px-2 border border-[#d8c4b6]">
                        Date of Joining
                      </td>
                      <td className="text-gray-800 px-2 border border-[#d8c4b6]">
                        {advocate.enrollment_date_As_member}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#d8c4b6] text-right text-gray-600 px-2 border border-[#d8c4b6]">
                        Phone
                      </td>
                      <td className="text-gray-800 px-2 border border-[#d8c4b6]">
                        {advocate.phone}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#d8c4b6] text-right text-gray-600 px-2 border border-[#d8c4b6]">
                        Blood Group
                      </td>
                      <td className="text-gray-800 px-2 border border-[#d8c4b6]">
                        {advocate.blood_group}
                      </td>
                    </tr>
                    <tr>
                      <td className="bg-[#d8c4b6] text-right text-gray-600 px-2 border border-[#d8c4b6]">
                        Date of Birth
                      </td>
                      <td className="text-gray-800 px-2 border border-[#d8c4b6]">
                        {advocate.date_of_birth}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemberList;
