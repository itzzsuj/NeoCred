import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebase"; // Ensure correct import
import { collection, getDocs } from "firebase/firestore";
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
  IconButton,
  VStack,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { FaUserCircle } from "react-icons/fa"; // ✅ User Icon

const CustomerPage = () => {
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();

  // Fetch authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Extract only the username from email
        const username = currentUser.email.split("@")[0];
        setUser(username);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Fetch customers from Firestore
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "customers"));
        const customerList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCustomers(customerList);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); // Redirect to home page after logout
  };

  // Handle Customer Click
  const handleCustomerClick = (customerId) => {
    navigate(`/dashboard/${customerId}`); // Redirect to customer dashboard with customerId
  };

  return (
    <Box minH="100vh" bg="#2F3C7E" color="white">
      {/* ✅ Navbar (Same as Before) */}
      <Flex
        as="nav"
        bg="#2F3C7E"
        color="white"
        p={4}
        align="center"
        justify="space-between"
        wrap="wrap"
        borderBottom="4px solid black"
      >
        {/* User Name with Icon */}
        <Flex align="center" gap={2}>
          <FaUserCircle size={24} /> {/* ✅ User Icon */}
          <Heading size="md">{user || "Loading..."}</Heading>
        </Flex>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Open Menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
        />

        {/* Desktop Logout Button */}
        <Flex display={{ base: "none", md: "flex" }} gap={6} align="center">
          <Button colorScheme="red" onClick={handleLogout}>
            LOGOUT
          </Button>
        </Flex>
      </Flex>

      {/* Sidebar (Mobile) */}
      {isOpen && (
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.8)"
          zIndex={10}
          display={{ base: "flex", md: "none" }}
          alignItems="center"
          justifyContent="center"
          onClick={onToggle} // Close on background click
        >
          <VStack spacing={6} bg="white" p={6} borderRadius="md">
            <Button colorScheme="red" onClick={handleLogout}>
              LOGOUT
            </Button>
          </VStack>
        </Box>
      )}

      {/* Page Content */}
      <Box mt={6} p={6} bg="rgba(255, 255, 255, 0.1)" borderRadius="lg" boxShadow="lg" w="90%" maxW="800px" mx="auto">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
          Customer List
        </Text>

        {/* Customer Count */}
        <Text fontSize="md" textAlign="center" mb={4} color="cyan.300">
          Total Customers: {customers.length}
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
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <Tr key={customer.id}>
                    <Td>{customer.name}</Td>
                    {/* ✅ Clickable Customer ID */}
                    <Td
                      color="blue.500"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      onClick={() => handleCustomerClick(customer.customerId)}
                    >
                      {customer.customerId}
                    </Td>
                    <Td>{customer.accountNumber}</Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="3" textAlign="center">
                    No customers found.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerPage;
