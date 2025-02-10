import React, { useState } from "react";
import { db } from "../firebase/firebase"; // Import Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useColorModeValue,
  useToast
} from "@chakra-ui/react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const toast = useToast();

  // Dark/Light mode adaptive colors
  const bgGradient = useColorModeValue(
    "linear(to-br, #2F3C7E, black)",
    "linear(to-br, gray.800, black)"
  );
  const textColor = useColorModeValue("white", "gray.200");
  const inputBg = useColorModeValue("gray.100", "gray.700");

  // Handle form submission
  const handleSubmit = async () => {
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "All fields are required!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "messages"), {
        name,
        email,
        message,
        timestamp: serverTimestamp()
      });

      // Show success message
      toast({
        title: "Message Sent",
        description: "We will get back to you soon.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Clear input fields
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Error saving message: ", error);
      toast({
        title: "Error",
        description: "Failed to send message. Try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    setLoading(false);
  };

  return (
    <Box
      id="contact"
      minH="100vh"
      bgGradient={bgGradient}
      color={textColor}
      px={{ base: 6, md: 12 }}
      py={16}
      textAlign="center"
    >
      {/* Contact Section Heading */}
      <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" mb={8}>
        Contact <Text as="span" color="cyan.300">NEO CRED</Text>
      </Heading>

      {/* Contact Description */}
      <Text fontSize="lg" maxW="3xl" mx="auto" mb={10} opacity={0.9}>
        Have questions or need support? Feel free to reach out to us. 
        Our team is here to help with any inquiries regarding <strong>NeoCred, 
        credit scoring, or financial inclusion.</strong>
      </Text>

      {/* Contact Form */}
      <Flex justify="center">
        <Box
          w={{ base: "full", md: "50%" }}
          bg="rgba(255, 255, 255, 0.1)"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
        >
          <FormControl mb={5}>
            <FormLabel>Name</FormLabel>
            <Input
              bg={inputBg}
              placeholder="Enter your name"
              border="none"
              _focus={{ borderColor: "cyan.400" }}
              value={name}
              color="black" // Ensures black text color
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              bg={inputBg}
              placeholder="Enter your email"
              border="none"
              _focus={{ borderColor: "cyan.400" }}
              value={email}
              color="black" // Ensures black text color
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>Message</FormLabel>
            <Textarea
              bg={inputBg}
              placeholder="Write your message..."
              border="none"
              _focus={{ borderColor: "cyan.400" }}
              value={message}
              color="black" // Ensures black text color
              onChange={(e) => setMessage(e.target.value)}
            />
          </FormControl>

          <Button
            colorScheme="cyan"
            w="full"
            size="lg"
            _hover={{ bg: "cyan.400" }}
            onClick={handleSubmit}
            isLoading={loading}
          >
            Send Message
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Contact;
