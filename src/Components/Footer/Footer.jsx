

const Footer = () => {
  return (
<footer className="bg-slate-100 text-slate-800 pt-4 pb-1 text-sm font-sans">
  {/* Header Label */}
  <div className="bg-blue-600 text-white w-fit px-3 py-1 font-semibold text-base ml-4 rounded-t">
    Get in Touch!
  </div>

  {/* Main Footer Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-4 bg-slate-300 text-sm leading-relaxed">
  {/* Contact Us */}
  <div>
    <h3 className="text-base font-semibold mb-2 text-blue-700">Contact Us</h3>
    <p className="mt-1">
      <strong>📍 Address:</strong> Near Judge Court Mor, Jashore
    </p>
    <p className="mt-1">
      <strong>📞 Phone:</strong> 02223389807
    </p>
    <p className="mt-1">
      <strong>✉️ Email:</strong> jashorebar@gmail.com
    </p>
    <p className="mt-1">
      <strong>🕒  Working Days:</strong> Sunday-Thursday (As per Govt. Office hour) & <br />Friday, Saturday and Govt. Holidays Office Remain Closed
    </p>
  </div>

  {/* Important Links Column 1 */}
  <div>
    <h3 className="text-base font-semibold mb-2 text-blue-700">Important Links</h3>
    <ul className="space-y-1 text-blue-900 font-medium list-disc list-inside">
      <li><a href="https://bangabhaban.gov.bd/" className="hover:text-blue-500">Office of the Hon’ble President</a></li>
      <li><a href="#" className="hover:text-blue-500">Office of the Hon’ble Prime Minister</a></li>
      <li><a href="https://www.supremecourt.gov.bd/web/indexn.php" className="hover:text-blue-500">Supreme Court of Bangladesh</a></li>
      <li><a href="https://lawjusticediv.gov.bd/" className="hover:text-blue-500">Law & Justice Division</a></li>
      <li><a href="https://www.parliament.gov.bd/" className="hover:text-blue-500">Bangladesh Parliament</a></li>
    </ul>
  </div>

  {/* Important Links Column 2 */}
  <div className="md:mt-5">
    <ul className="space-y-1 text-blue-900 font-medium list-disc list-inside">
      <li><a href="https://legislativediv.gov.bd/" className="hover:text-blue-500">Legislative & Parliamentary Affairs Division</a></li>
      <li><a href="http://bdlaws.minlaw.gov.bd/" className="hover:text-blue-500">Laws of Bangladesh</a></li>
      <li><a href="#" className="hover:text-blue-500">Bangladesh Forms</a></li>
      <li><a href="https://bangladesh.gov.bd/index.php" className="hover:text-blue-500">Bangladesh National Portal</a></li>
      <li><a href="https://railway.gov.bd/" className="hover:text-blue-500">Bangladesh Railway</a></li>
    </ul>
  </div>
</div>


  {/* Footer Bottom */}
  <div className="bg-slate-400 text-center text-slate-700 py-1 text-sm">
    <p>© 2025 All rights reserved.</p>
    <p>Developed by Utshab Technology Ltd.</p>
  </div>
</footer>

  );
};

export default Footer;
