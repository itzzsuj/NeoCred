import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import { SUPABASE_URL } from "../supabase/supabase"; // ✅ Correct import
 // ✅ Import Supabase URL
import {
  Box,
  Text,
  Button,
  Flex,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import { FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const LoanEligibility = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [eligibilityData, setEligibilityData] = useState(null);

  useEffect(() => {
    const fetchCsvAndPredict = async () => {
      try {
        console.log(`📂 Fetching CSV file from Supabase for ${customerId}...`);

        // ✅ Select correct CSV file
        const csvFileName = customerId === "CUST001" ? "output.csv" : customerId === "CUST002" ? "200.csv" : null;
        if (!csvFileName) {
          console.error(`❌ No CSV file found for ${customerId}`);
          setLoading(false);
          return;
        }

        const csvUrl = `${SUPABASE_URL}/storage/v1/object/public/csv-files/${csvFileName}`;
        console.log(`🔗 CSV URL: ${csvUrl}`);

        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Failed to fetch CSV file");

        const text = await response.text();
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: async (result) => {
            if (result.data.length === 0) {
              console.error("❌ CSV is empty or not formatted correctly.");
              setLoading(false);
              return;
            }

            console.log("📊 Parsed CSV Data:", result.data);

            // ✅ Send CSV data to API for Loan Eligibility Prediction
            const apiResponse = await fetch("http://127.0.0.1:5050/predict", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ data: result.data }),
            });

            const jsonData = await apiResponse.json();
            console.log("✅ API Response:", jsonData);

            setEligibilityData(jsonData);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("❌ Error fetching or processing CSV:", error);
        setLoading(false);
      }
    };

    fetchCsvAndPredict();
  }, [customerId]);

  // ✅ Determine Card Colors Based on Eligibility
  const getStatusColor = (eligibility) => {
    if (eligibility === "Safe") return { color: "green.400", icon: FaCheckCircle };
    if (eligibility === "Medium Risk") return { color: "orange.400", icon: FaExclamationTriangle };
    return { color: "red.400", icon: FaTimesCircle };
  };

  const status = eligibilityData ? getStatusColor(eligibilityData.Eligibility) : null;

  // ✅ Data for Bar Graph
  const barChartData = eligibilityData
    ? [
        { name: "Risk Score", value: eligibilityData.Risk_Score },
        { name: "Net Savings", value: eligibilityData.Net_Savings },
      ]
    : [];

  // ✅ Data for Pie Chart (Spending vs Income)
  const pieChartData = eligibilityData
    ? [
        { name: "Spending", value: eligibilityData.Spending_To_Income_Ratio * 100 },
        { name: "Income Left", value: 100 - eligibilityData.Spending_To_Income_Ratio * 100 },
      ]
    : [];

  const COLORS = ["#FF8042", "#00C49F"];

  // ✅ Pass CSV URL back when going to Dashboard
  const csvFileName = customerId === "CUST001" ? "output.csv" : "200.csv";
  const csvUrl = `${SUPABASE_URL}/storage/v1/object/public/csv-files/${csvFileName}`;

  return (
    <Flex minH="100vh" bg="#2F3C7E" color="white" flexDirection="column">
      {/* Navbar */}
      <Flex bg="rgba(0, 0, 0, 0.2)" p={4} justify="space-between" align="center" borderBottom="2px solid white" boxShadow="md">
        <Button 
          leftIcon={<FaArrowLeft />} 
          colorScheme="whiteAlpha" 
          variant="outline" 
          onClick={() => navigate(`/dashboard/${customerId}`, { state: { csvUrl } })}
        >
          Back to Dashboard
        </Button>
        <Text fontSize="2xl" fontWeight="bold">Loan Eligibility</Text>
      </Flex>

      {/* Main Content */}
      <Flex p={6} flexDirection="column" align="center">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Loan Assessment for {customerId}
        </Text>

        {loading ? (
          <Spinner size="xl" />
        ) : eligibilityData ? (
          <>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="80%">
              {/* ✅ Eligibility Status */}
              <Box bg={status.color} p={6} borderRadius="lg" boxShadow="lg" textAlign="center" color="white" fontWeight="bold">
                <Icon as={status.icon} w={16} h={16} mb={3} />
                <Text fontSize="xl">Eligibility: {eligibilityData.Eligibility}</Text>
              </Box>

              {/* ✅ Risk Score */}
              <Stat bg="white" p={6} borderRadius="lg" boxShadow="lg" color="black">
                <StatLabel fontSize="lg">Risk Score</StatLabel>
                <StatNumber color={status.color}>{eligibilityData.Risk_Score}</StatNumber>
                <StatHelpText>Lower is better</StatHelpText>
              </Stat>
            </SimpleGrid>

            {/* ✅ Financial Insights */}
            <Box bg="white" p={6} borderRadius="lg" boxShadow="lg" color="black" mt={8} w="80%">
              <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={3}>Financial Insights</Text>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill={status.color} barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </Box>

            {/* ✅ Spending vs Income Pie Chart */}
            <Box bg="white" p={6} borderRadius="lg" boxShadow="lg" color="black" mt={8} w="80%">
              <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={3}>Spending to Income Ratio</Text>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                    {pieChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </>
        ) : (
          <Text>Error loading loan eligibility data.</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default LoanEligibility;
