import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

export default function History() {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const currentYear = new Date().getFullYear();

  // useEffect(() => {
  //   AxiosInstance.get("committees/")
  //   .then((res) => {
  //     const filtered = res.data.filter((item) => Number(item.year) === currentYear);
  //     setCommitteeMembers(filtered);
  //   })
  //   .catch((err) => {
  //     console.error("Failed to fetch committee data", err);
  //   });
  // }, []);



  useEffect(() => {
  AxiosInstance.get("committees/")
    .then((res) => {
      const currentYear = new Date().getFullYear();
      const filtered = res.data.filter((item) => Number(item.year) === currentYear);

      const positionPriority = [
        "President",
        "Vice President",
        "Secretary",
        "Joint Secretary",
        "Assistant Secretary",
        "Library Secretary",
        "Member"
      ];

      const sorted = filtered.sort((a, b) => {
        const posA = positionPriority.indexOf(a.committee_position) !== -1 ? positionPriority.indexOf(a.committee_position) : positionPriority.length;
        const posB = positionPriority.indexOf(b.committee_position) !== -1 ? positionPriority.indexOf(b.committee_position) : positionPriority.length;
        return posA - posB;
      });

      setCommitteeMembers(sorted);
    })
    .catch((err) => {
      console.error("Failed to fetch committee data", err);
    });
}, []);



  console.log(committeeMembers)

  return (
    <div className="overflow-y-scroll px-4 md:px-20 font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Committee Section */}
        <section className="py-2">
          <div className="grid md:grid-cols-2 gap-10">

            {committeeMembers.map((member) => (
              <figure
                key={member.id}
                className="flex flex-col items-center text-center border border-[#d8c4b6] rounded-md p-2 shadow-lg bg-white"
              >
                <img
                  src={member.advocate?.photo}
                  alt={member.name}
                  className="w-32 h-32 rounded-full border mb-2 object-cover"
                />
                <figcaption>
                  <h3 className="text-sm font-bold text-gray-800">{member.committee_position}</h3>
                  <div className="flex justify-center items-center my-1">
                    <div className="w-60 h-9 flex items-center justify-center border-2 border-cyan-600 bg-blue-300 rounded-full">
                      <p className="text-gray-700 font-semibold">{member.advocate.name_english}</p>
                    </div>
                  </div>
                </figcaption>
              </figure>
            ))}

          </div>
        </section>
      </div>
    </div>
  );
}
