function EntryFeeForm({ formData, handleChange }) {
  return (
    <div className="border-t-2 border-gray-200 pt-6 mb-2">
     <h2 className="text-lg text-sky-900 font-semibold mb-4 text-center">Entry Fee Form</h2>
     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
            <label className="block text-gray-700 text-sm font-semibold ">
            Receipt No
            </label>
            <input
            type="text"
            name="receipt_no"
            value={formData.receipt_no}
            onChange={handleChange}
            placeholder="Auto Generated"
            className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            />
        </div>

        <div>
            <label className="block text-gray-700 text-sm font-semibold ">
            Entry Fee <span className="text-red-500">*</span>
            </label>
            <input
            type="number"
            name="entry_fee"
            value={formData.entry_fee}
            onChange={handleChange}
            placeholder="Enter entry fee"
            className="shadow appearance-none border border-gray-400 bg-sky-50 rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            />  

        </div>

         <div className="mb-0">
            <label className="block text-gray-700 text-sm font-semibold ">
            Payment Type
            </label>
            <select
            name="entry_payment_type"
            value={formData.entry_payment_type}
            onChange={handleChange}
            className="shadow appearance-none border border-gray-400 rounded bg-sky-50 w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
            <option value="cash">Cash</option>
            <option value="bank">Bank Transfer</option>
            <option value="check">Check</option>
            <option value="mobile_banking">Mobile Banking</option>
            </select>
        </div>

        {/* Remarks */}
        <div className="">
            <label className="block text-gray-700 text-sm font-semibold ">
            Remarks
            </label>
            <textarea
                name="remarks4"
                value={formData.remarks4}
                onChange={handleChange}
                className="shadow appearance-none border border-gray-400 h-12 rounded bg-sky-50 w-full px-2  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="3"
            />
        </div>
    </div>
    </div>
  );
}

export default EntryFeeForm;
