import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/AxiosInstance";

export default function History() {
  const [committeeMembers, setCommitteeMembers] = useState([]);

  useEffect(() => {
    AxiosInstance.get("committees/")
      .then((res) => {
        setCommitteeMembers(res.data);
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
                      <p className="text-gray-700 font-semibold">{member.name}</p>
                    </div>
                  </div>
                  <blockquote className="text-gray-600 text-sm italic text-justify px-2">
                    "{member.quote}"
                  </blockquote>
                </figcaption>
              </figure>
            ))}

          </div>
        </section>
      </div>
    </div>
  );
}
