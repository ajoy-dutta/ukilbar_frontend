import React from "react";
import president from "../../assets/president1.png";
import secratory from "../../assets/secratory.png";

export default function History() {
  return (
    <div className=" overflow-y-scroll px-4 md:px-20  font-sans">
      <div className="max-w-6xl mx-auto">

        {/* Committee Section */}
        <section className="py-4">
          <div className="grid md:grid-cols-2 gap-10">
            {/* President */}
            <figure className="flex flex-col items-center text-center border border-[#d8c4b6] rounded-md p-6 shadow-lg bg-white">
              <img
                src={president}
                alt="সভাপতি আইনজীবী আবু মোর্তজা ছোট"
                className="w-32 h-32 rounded-full border mb-4"
              />
              <figcaption>
                <h3 className="text-sm font-bold text-gray-800 mb-1">সভাপতি</h3>
                <p className="text-gray-700 font-semibold mb-4">আইনজীবী আবু মোর্তজা ছোট</p>
                <blockquote className="text-gray-600 text-sm italic text-justify px-2">
                  "যশোর উকিল বার শুধু একটি পেশাগত সংগঠন নয়, এটি আমাদের মর্যাদা, আদর্শ এবং দায়িত্ববোধের প্রতীক। আমি বিশ্বাস করি আমাদের ঐতিহ্য রক্ষা করে আগামীর ন্যায়বিচার প্রতিষ্ঠায় আমরা আরও বলিষ্ঠভাবে এগিয়ে যাব।"
                </blockquote>
              </figcaption>
            </figure>

            {/* Secretary */}
            <figure className="flex flex-col items-center text-center border border-[#d8c4b6] rounded-md p-6 shadow-lg bg-white">
              <img
                src={secratory}
                alt="সাধারণ সম্পাদক আইনজীবী এম.এ গফুর"
                className="w-32 h-32 rounded-full border mb-4"
              />
              <figcaption>
                <h3 className="text-sm font-bold text-gray-800 mb-1">সাধারণ সম্পাদক</h3>
                <p className="text-gray-700 font-semibold mb-4">আইনজীবী এম.এ গফুর</p>
                <blockquote className="text-gray-600 text-sm italic text-justify px-2">
                  "আমরা একটি ডিজিটাল বার প্রতিষ্ঠার লক্ষ্যে কাজ করে চলেছি, যাতে জনগণের কাছে দ্রুত ও কার্যকর আইনগত সহায়তা পৌঁছানো যায়। আমাদের একতা এবং পেশাগত নিষ্ঠাই আমাদের শক্তি।"
                </blockquote>
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
    </div>
  );
}
