import React, { useEffect, useState } from "react";
import AxiosInstance from "../../Components/AxiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FeeList = () => {
  const advocateList = useSelector((state) => state.advocate.advocates);
  const [advocates, setAdvocates] = useState([]);
  const [feeData, setFeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setAdvocates(advocateList);
  }, [advocateList]);

  const fetchFees = async () => {
    try {
      const response = await AxiosInstance.get("advocate-all-fees/");
      setFeeData(response.data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleDelete = async (id) => {
    setFeeData((prev) => prev.filter((item) => item.id !== id));
    try {
      await AxiosInstance.delete(`advocate-all-fees/${id}/`);
      fetchFees();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEdit = (fee) => {
    navigate("/dashboard/advocate-all-fees/", { state: { FeeData: fee } });
  };

  const handlePrint = (fee, advocateObj) => {
    const printWindow = window.open("", "_blank");

    const rows = [];
    let total = 0;
    let sl = 1;

    fee.rentcollection_set?.forEach((i) => {
      rows.push(
        `<tr><td>${sl++}</td><td>Rent Fee (${i.rent_type}-${i.month}/${
          i.year
        })</td><td style="text-align: right;">${i.rent_amount}</td></tr>`
      );
      total += parseFloat(i.rent_amount);
    });

    fee.entryfee_set?.forEach((i) => {
      rows.push(
        `<tr><td>${sl++}</td><td>Entry Fee</td><td style="text-align: right;">${
          i.entry_fee
        }</td></tr>`
      );
      total += parseFloat(i.entry_fee);
    });

    fee.monthlyfee_set?.forEach((i) => {
      rows.push(
        `<tr><td>${sl++}</td><td>Monthly Fee (${i.from_month}/${
          i.from_year
        } - ${i.to_month}/${i.to_year})</td><td style="text-align: right;">${
          i.total_monthly_amount
        }</td></tr>`
      );
      total += parseFloat(i.total_monthly_amount);
    });

    fee.barassociationfee_set?.forEach((i) => {
      rows.push(
        `<tr><td>${sl++}</td><td>Bar Association Fee (${i.yearly_from_year}-${
          i.yearly_to_year
        })</td><td style="text-align: right;">${i.total_amount}</td></tr>`
      );
      total += parseFloat(i.total_amount);
    });

    const numberToWords = (num) => {
      const a = [
        "",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
      ];
      const b = [
        "",
        "",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
      ];

      if (num === 0) return "zero";

      function inWords(n) {
        if (n < 20) return a[n];
        if (n < 100)
          return b[Math.floor(n / 10)] + (n % 10 ? "-" + a[n % 10] : "");
        if (n < 1000)
          return (
            a[Math.floor(n / 100)] +
            " hundred" +
            (n % 100 ? " " + inWords(n % 100) : "")
          );
        if (n < 1000000)
          return (
            inWords(Math.floor(n / 1000)) +
            " thousand" +
            (n % 1000 ? " " + inWords(n % 1000) : "")
          );
        return "number too big";
      }

      return inWords(num);
    };

    const htmlContent = `
      <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        .receipt {
          border: 1px solid #000;
          padding: 20px;
          max-width: 700px;
          margin: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f0f0f0;
        }
        td:last-child, th:last-child {
          text-align: right;
        }
        .footer {
          margin-top: 42px;
          display: flex;
          justify-content: space-between;
        }
        .header {
          text-align: center;
          font-weight: bold;
        }
        .top-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: left;
          padding: 8px;
          font-weight: bold;
          border-top: 1px solid #000;
        }
        .total-words {
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="receipt">
        <div class="header">
          Jashore District Bar Association, Jashore<br/>
          Established - 1874<br/><br/>
          Money Collection Receipt
        </div>
        <div class="top-row">
          <div><strong>Member:</strong> ${advocateObj?.name_english || "N/A"}</div>
          <div><strong>Date:</strong> ${fee.collection_date}</div>
        </div>
        <div><strong>Receipt No:</strong> ${fee.receipt_no}</div>
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Description</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${rows.join("")}
          </tbody>
        </table>
        <div class="total-row">
        
          <div class="total-words">
            Total:
            ${
              numberToWords(Math.floor(total)).charAt(0).toUpperCase() +
              numberToWords(Math.floor(total)).slice(1)
            } only
          </div>
          <div>${total.toFixed(2)}</div>
        </div>
        <div class="footer">
          <span>Signature of General Secretary</span>
          <span>Signature of Accountant</span>
          <span>Signature of Office Assistant</span>
        </div>
      </div>
      <script>window.onload = function() { window.print(); }</script>
    </body>
    </html>`;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Advocate Fees List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : feeData.length === 0 ? (
        <p>No data found.</p>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full bg-white border rounded shadow text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">SL</th>
                <th className="p-2 border">Advocate ID</th>
                <th className="p-2 border">Name && Father's Name</th>
                <th className="p-2 border">Receipt No</th>
                <th className="p-2 border">Rent Fee</th>
                <th className="p-2 border">Bar Association Fee</th>
                <th className="p-2 border">Monthly Fee</th>
                <th className="p-2 border">Entry Fee</th>
                <th className="p-2 border">Total</th>
                <th className="p-2 border">Actions</th>
                <th className="p-2 border">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {feeData.map((fee, index) => {
                const advocateObj = advocates.find(
                  (adv) => adv.bar_registration_number === fee.advocate_id
                );

                const rentTotal = fee.rentcollection_set?.reduce((sum, item) => sum + (parseFloat(item.rent_amount) || 0), 0) || 0;
                const barTotal = fee.barassociationfee_set?.reduce((sum, item) => sum + (parseFloat(item.total_amount) || 0), 0) || 0;
                const monthlyTotal = fee.monthlyfee_set?.reduce((sum, item) => sum + (parseFloat(item.total_monthly_amount) || 0), 0) || 0;
                const entryTotal = fee.entryfee_set?.reduce((sum, item) => sum + (parseFloat(item.entry_fee) || 0), 0) || 0;

                const grandTotal = rentTotal + barTotal + monthlyTotal + entryTotal;

                return (
                  <tr key={fee.id} className="border-t hover:bg-gray-50">
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border">{fee.advocate_id}</td>
                    <td className="p-2 border">
                      {advocateObj
                        ? `${advocateObj.name_english} (${advocateObj.father_name})`
                        : "Unknown"}
                    </td>
                    <td className="p-2 border">{fee.receipt_no}</td>
                    <td className="p-2 border text-right">
                      {fee.rentcollection_set?.length > 0
                        ? fee.rentcollection_set
                            .map((item) => item.rent_amount)
                            .join(", ")
                        : "—"}
                    </td>
                    <td className="p-2 border text-right">
                      {fee.barassociationfee_set?.length > 0
                        ? fee.barassociationfee_set
                            .map((item) => item.total_amount)
                            .join(", ")
                        : "—"}
                    </td>
                    <td className="p-2 border text-right">
                      {fee.monthlyfee_set?.length > 0
                        ? fee.monthlyfee_set
                            .map((item) => item.total_monthly_amount)
                            .join(", ")
                        : "—"}
                    </td>
                    <td className="p-2 border text-right">
                      {fee.entryfee_set?.length > 0
                        ? fee.entryfee_set
                            .map((item) => item.entry_fee)
                            .join(", ")
                        : "—"}
                    </td>

                    <td className="p-2 border text-right font-bold">
                      {grandTotal}
                    </td>

                    <td className="p-2 border space-x-2">
                      <button
                        onClick={() => handleEdit(fee)}
                        className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(fee.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handlePrint(fee, advocateObj)}
                        className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                      >
                        PDF
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeeList;
