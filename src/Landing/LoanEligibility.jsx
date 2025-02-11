import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Papa from "papaparse";
import {
  Box,
  Text,
  Button,
  Flex,
  VStack,
  Divider,
  Spinner,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaArrowLeft, FaCheckCircle, FaExclamationTriangle, FaTimesCircle } from "react-icons/fa";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const LoanEligibility = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [eligibilityData, setEligibilityData] = useState(null);

  useEffect(() => {
    const fetchCSVAndPredict = async () => {
      try {
        // Fetch stored CSV data
        const response = await fetch(`/data/output (1).csv`);
        const text = await response.text();
        Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          complete: async (result) => {
            if (result.data.length === 0) {
              console.error("CSV is empty or not formatted correctly.");
              setLoading(false);
              return;
            }

            // Send CSV data to API for prediction
            const apiResponse = await fetch("http://127.0.0.1:5050/predict", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ data: result.data }),
            });

            const jsonData = await apiResponse.json();
            setEligibilityData(jsonData);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error("Error fetching or processing CSV:", error);
        setLoading(false);
      }
    };

    fetchCSVAndPredict();
  }, []);

  // ✅ Determine Card Colors Based on Eligibility
  const getStatusColor = (eligibility) => {
    if (eligibility === "Safe") return { color: "green.400", icon: FaCheckCircle };
    if (eligibility === "Medium Risk") return { color: "orange.400", icon: FaExclamationTriangle };
    return { color: "red.400", icon: FaTimesCircle };
  };

  const status = eligibilityData ? getStatusColor(eligibilityData.Eligibility) : null;

  // ✅ Chart Data for Bar Graph
  const barChartData = eligibilityData
    ? [
        { name: "Risk Score", value: eligibilityData.Risk_Score },
        { name: "Net Savings", value: eligibilityData.Net_Savings },
      ]
    : [];

  // ✅ Chart Data for Pie Chart
  const pieChartData = eligibilityData
    ? [
        { name: "Spending", value: eligibilityData.Spending_To_Income_Ratio * 100 },
        { name: "Income Left", value: 100 - eligibilityData.Spending_To_Income_Ratio * 100 },
      ]
    : [];

  const COLORS = ["#FF8042", "#00C49F"];

  return (
    <Flex minH="100vh" bg={useColorModeValue("#2F3C7E", "gray.900")} color="white" flexDirection="column">
      {/* Navbar */}
      <Flex
        bg="rgba(0, 0, 0, 0.2)"
        p={4}
        justify="space-between"
        align="center"
        borderBottom="2px solid white"
        boxShadow="md"
      >
        <Button leftIcon={<FaArrowLeft />} colorScheme="whiteAlpha" variant="outline" onClick={() => navigate(`/dashboard/${customerId}`)}>
          Back to Dashboard
        </Button>
        <Text fontSize="2xl" fontWeight="bold">
          Loan Eligibility
        </Text>
      </Flex>

      {/* Main Content */}
      <Flex p={6} flexDirection="column" align="center">
        <Text fontSize="3xl" fontWeight="bold" mb={6}>
          Loan Assessment for {customerId.charAt(0).toUpperCase() + customerId.slice(1)}
        </Text>

        {loading ? (
          <Spinner size="xl" />
        ) : eligibilityData ? (
          <>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="80%">
              {/* ✅ Eligibility Status Card */}
              <Box
                bg={status.color}
                p={6}
                borderRadius="lg"
                boxShadow="lg"
                textAlign="center"
                color="white"
                fontWeight="bold"
              >
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

            {/* ✅ Bar Chart for Risk Score & Net Savings */}
            <Box bg="white" p={6} borderRadius="lg" boxShadow="lg" color="black" mt={8} w="80%">
              <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={3}>
                Financial Insights
              </Text>
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

            {/* ✅ Pie Chart for Spending to Income Ratio */}
            <Box bg="white" p={6} borderRadius="lg" boxShadow="lg" color="black" mt={8} w="80%">
              <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={3}>
                Spending to Income Ratio
              </Text>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
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
