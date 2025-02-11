import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Button,
  Flex,
  VStack,
  Divider,
} from "@chakra-ui/react";
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { FaArrowLeft, FaChartPie, FaChartLine } from "react-icons/fa";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

const CustomerDashboard = () => {
  const { customerId } = useParams(); // Get customer ID from URL
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const q = query(collection(db, "customers"), where("customerId", "==", customerId));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          setCustomer(querySnapshot.docs[0].data());
        }
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomer();
  }, [customerId]);

  // Sample Pie Chart Data (Account Distribution)
  const pieData = [
    { name: "Savings", value: 40 },
    { name: "Checking", value: 25 },
    { name: "Investments", value: 15 },
    { name: "Loans", value: 20 },
  ];

  // Sample Line Chart Data (Account Growth)
  const lineData = [
    { month: "Jan", balance: 5000 },
    { month: "Feb", balance: 7000 },
    { month: "Mar", balance: 9000 },
    { month: "Apr", balance: 11000 },
    { month: "May", balance: 13000 },
  ];

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
          <Text fontSize="md">Customer: {customer?.name || "Loading..."}</Text>
          <Text fontSize="md">Customer ID: {customer?.customerId || "Loading..."}</Text>
          <Text fontSize="md">Account No: {customer?.accountNumber || "Loading..."}</Text>
        </VStack>
      </Box>

      {/* Main Dashboard Content */}
      <Box flex="1" p={6} display="flex" flexDirection="column" alignItems="center">
        
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          Customer Analytics
        </Text>

        <Flex mt={4} w="90%" maxW="900px" gap={6} flexWrap="wrap" justify="center">
          
          {/* Pie Chart */}
          <Box bg="white" p={4} borderRadius="lg" boxShadow="md" color="black">
            <Text fontSize="lg" fontWeight="bold" textAlign="center">Account Type Distribution</Text>
            <ResponsiveContainer width={300} height={250}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* Line Chart */}
          <Box bg="white" p={4} borderRadius="lg" boxShadow="md" color="black">
            <Text fontSize="lg" fontWeight="bold" textAlign="center">Account Balance Growth</Text>
            <ResponsiveContainer width={350} height={250}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="balance" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Box>

        </Flex>
      </Box>

    </Flex>
  );
};

export default CustomerDashboard;
