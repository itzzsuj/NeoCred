import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase"; // Firebase Firestore & Auth
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import supabase, { SUPABASE_URL } from "../supabase/supabase"; // ✅ Import Supabase
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
  Spinner,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";

const CustomerPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [csvUrls, setCsvUrls] = useState({}); // ✅ Store CSV URLs from Supabase

  // ✅ Fetch authenticated user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const username = currentUser.email.split("@")[0];
        setUser(username);
      }
    });

    return () => unsubscribe();
  }, []);

  // ✅ Fetch customers from Firestore (CUST001 & CUST002 are stored here)
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "customers"));
        const customerList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("🔥 Fetched Customers from Firestore:", customerList);
        setCustomers(customerList);
      } catch (error) {
        console.error("❌ Error fetching customers from Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // ✅ Fetch CSV URLs from Supabase Storage (only for CUST001 & CUST002)
  useEffect(() => {
    const fetchCsvUrls = async () => {
      try {
        console.log("🛠 Manually Constructing CSV URLs from Supabase...");

        const urlMapping = {
          "CUST001": `${SUPABASE_URL}/storage/v1/object/public/csv-files/output.csv`,
          "CUST002": `${SUPABASE_URL}/storage/v1/object/public/csv-files/200.csv`
        };

        console.log("🔥 Supabase CSV File URLs (Final Mapping):", urlMapping);
        setCsvUrls(urlMapping);

      } catch (error) {
        console.error("❌ Error fetching CSV files from Supabase:", error);
      }
    };

    fetchCsvUrls();
  }, []);

  return (
    <Box minH="100vh" bg="#2F3C7E" color="white">
      {/* Navbar */}
      <Flex as="nav" bg="#2F3C7E" color="white" p={4} align="center" justify="space-between" borderBottom="4px solid black">
        <Flex align="center" gap={2}>
          <FaUserCircle size={24} />
          <Heading size="md">{user || "Loading..."}</Heading>
        </Flex>

        <Button colorScheme="red" onClick={() => signOut(auth).then(() => navigate("/login"))}>
          LOGOUT
        </Button>
      </Flex>

      {/* Page Content */}
      <Box mt={6} p={6} bg="rgba(255, 255, 255, 0.1)" borderRadius="lg" boxShadow="lg" w="90%" maxW="800px" mx="auto">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
          Customer List
        </Text>

        <Divider borderColor="gray.400" mb={4} />

        {loading ? (
          <Spinner size="lg" />
        ) : (
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
                  <Tr key={customer.id}>
                    <Td>{customer.name}</Td>
                    <Td
                      color="blue.500"
                      cursor="pointer"
                      _hover={{ textDecoration: "underline" }}
                      onClick={() => {
                        console.log(`🛠 Navigating to Dashboard for: ${customer.customerId}`);
                        console.log(`🔗 CSV URL for ${customer.customerId}: ${csvUrls[customer.customerId]}`);

                        if (csvUrls[customer.customerId]) {
                          navigate(`/dashboard/${customer.customerId}`, {
                            state: { csvUrl: csvUrls[customer.customerId] },
                          });
                        } else {
                          alert(`❌ CSV file not available for ${customer.customerId}.`);
                        }
                      }}
                    >
                      {customer.customerId}
                    </Td>
                    <Td>{customer.accountNumber}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default CustomerPage;
