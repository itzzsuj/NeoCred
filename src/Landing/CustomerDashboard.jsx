import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Papa from "papaparse";
import {
  Box,
  Text,
  Button,
  Flex,
  VStack,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaArrowLeft } from "react-icons/fa";

const CustomerDashboard = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const csvUrl = location.state?.csvUrl; // ✅ Get CSV URL from `CustomerPage.js`

  useEffect(() => {
    if (!csvUrl) {
      setLoading(false);
      return;
    }

    const fetchCSVData = async () => {
      try {
        console.log(`📂 Fetching CSV from: ${csvUrl}`);

        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Failed to fetch CSV file");

        const text = await response.text();
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            // Convert numeric months to readable format
            const monthMap = {
              1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
              7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
            };

            const formattedData = result.data.map((row) => ({
              Month: monthMap[row.Month] || row.Month,
              Credit: row.Monthly_Credit_Avg,
              Debit: row.Monthly_Debit_Avg,
              NetSavings: row.Net_Savings,
            }));

            console.log("📊 Parsed CSV Data:", formattedData); // Debugging Log
            setChartData(formattedData);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("❌ Error fetching CSV data:", error);
        setLoading(false);
      }
    };

    fetchCSVData();
  }, [csvUrl]);

  return (
    <Flex minH="100vh" bg="#2F3C7E" color="white">
      {/* Left Sidebar */}
      <Box w="250px" bg="rgba(0, 0, 0, 0.2)" p={6} boxShadow="lg" minH="100vh">
        <VStack spacing={6} align="start">
          <Button leftIcon={<FaArrowLeft />} colorScheme="whiteAlpha" variant="outline" onClick={() => navigate("/customer")}>
            Back to Customers
          </Button>
          <Divider borderColor="whiteAlpha.500" />
          <Text fontSize="lg" fontWeight="bold">Customer Dashboard</Text>
          <Text fontSize="md">Customer ID: {customerId}</Text>

          {/* ✅ "Check Loan Eligibility" Button */}
          <Button colorScheme="yellow" onClick={() => navigate(`/loan-eligibility/${customerId}`)}>
            Check Loan Eligibility
          </Button>
        </VStack>
      </Box>

      {/* Main Dashboard Content */}
      <Box flex="1" p={6} display="flex" flexDirection="column" alignItems="center">
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          {customerId.charAt(0).toUpperCase() + customerId.slice(1)}'s Analytics
        </Text>

        {loading ? (
          <Spinner size="xl" />
        ) : csvUrl ? (
          <>
            {/* Bar Chart: Credit vs Debit */}
            <Box bg="white" p={4} borderRadius="lg" boxShadow="md" color="black" w="80%" mb={6}>
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Monthly Credit vs Debit</Text>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Credit" fill="green" barSize={50} />
                  <Bar dataKey="Debit" fill="red" barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* Line Chart: Net Savings Over Time */}
            <Box bg="white" p={4} borderRadius="lg" boxShadow="md" color="black" w="80%">
              <Text fontSize="lg" fontWeight="bold" textAlign="center">Net Savings Trend</Text>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="NetSavings" stroke="blue" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </>
        ) : (
          <Text fontSize="lg" fontWeight="bold" color="red.400">
            ❌ No CSV file available for this customer.
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default CustomerDashboard;
