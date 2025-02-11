import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase"; // Firebase for Authentication
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Divider,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

const CustomerPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const username = currentUser.email.split("@")[0]; // Extract username from email
        setUser(username);
      }
    });

    return () => unsubscribe();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login"); // Redirect to login page after logout
  };

  // Static customers (Only Harish & Karthik)
  const customers = [
    { name: "Harish", customerId: "harish", accountNumber: "1234567890" },
    { name: "Karthik", customerId: "karthik", accountNumber: "9876543210" },
  ];

  return (
    <Box minH="100vh" bg="#2F3C7E" color="white">
      {/* Navbar */}
      <Flex as="nav" bg="#2F3C7E" color="white" p={4} align="center" justify="space-between" borderBottom="4px solid black">
        <Flex align="center" gap={2}>
          <FaUserCircle size={24} />
          <Heading size="md">{user || "Loading..."}</Heading>
        </Flex>

        {/* Logout Button */}
        <Button colorScheme="red" onClick={handleLogout}>
          LOGOUT
        </Button>
      </Flex>

      {/* Page Content */}
      <Box mt={6} p={6} bg="rgba(255, 255, 255, 0.1)" borderRadius="lg" boxShadow="lg" w="90%" maxW="800px" mx="auto">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
          Customer List
        </Text>

        <Divider borderColor="gray.400" mb={4} />

        {/* Customers Table */}
        <Box overflowX="auto">
          <Table variant="simple" bg="white" color="black" borderRadius="lg">
            <Thead>
              <Tr bg="cyan.300">
                <Th color="black">Customer Name</Th>
                <Th color="black">Customer ID</Th>
                <Th color="black">Account Number</Th>
              </Tr>
            </Thead>
            <Tbody>
              {customers.map((customer) => (
                <Tr key={customer.customerId}>
                  <Td>{customer.name}</Td>
                  <Td
                    color="blue.500"
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => navigate(`/dashboard/${customer.customerId}`)}
                  >
                    {customer.customerId}
                  </Td>
                  <Td>{customer.accountNumber}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerPage;
