import React from "react";
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
  useColorModeValue
} from "@chakra-ui/react";

const Contact = () => {
  // Dark/Light mode adaptive colors
  const bgGradient = useColorModeValue(
    "linear(to-br, #2F3C7E, black)",
    "linear(to-br, gray.800, black)"
  );
  const textColor = useColorModeValue("white", "gray.200");
  const inputBg = useColorModeValue("gray.100", "gray.700");

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
        Our team is here to help with any inquiries regarding **NeoCred, 
        credit scoring, or financial inclusion.**
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
            <Input bg={inputBg} placeholder="Enter your name" border="none" _focus={{ borderColor: "cyan.400" }} />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>Email</FormLabel>
            <Input type="email" bg={inputBg} placeholder="Enter your email" border="none" _focus={{ borderColor: "cyan.400" }} />
          </FormControl>

          <FormControl mb={5}>
            <FormLabel>Message</FormLabel>
            <Textarea bg={inputBg} placeholder="Write your message..." border="none" _focus={{ borderColor: "cyan.400" }} />
          </FormControl>

          <Button colorScheme="cyan" w="full" size="lg" _hover={{ bg: "cyan.400" }}>
            Send Message
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default Contact;
