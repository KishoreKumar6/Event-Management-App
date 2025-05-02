import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../components/AdminLayout";

const Reports = () => {
  const [reportData, setReportData] = useState({
    totalBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    refundedAmount: 0,
    ticketsSold: 0,
    ticketsCancelled: 0,
  });

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "https://event-management-app-3-vs67.onrender.com/api/admin/reports"
      );
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  useEffect(() => {
    fetchReports(); // Automatically fetch when page loads
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Reports</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Total Bookings</h2>
            <p className="text-3xl font-bold">{reportData.totalBookings}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Cancelled Bookings</h2>
            <p className="text-3xl font-bold">{reportData.cancelledBookings}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Total Revenue</h2>
            <p className="text-3xl font-bold">${reportData.totalRevenue}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Refunded Amount</h2>
            <p className="text-3xl font-bold">${reportData.refundedAmount}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Tickets Sold</h2>
            <p className="text-3xl font-bold">{reportData.ticketsSold}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Tickets Cancelled</h2>
            <p className="text-3xl font-bold">{reportData.ticketsCancelled}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;
