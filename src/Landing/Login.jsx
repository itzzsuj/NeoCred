import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Dark/Light mode adaptive colors
  const bgGradient = useColorModeValue(
    "linear(to-br, #2F3C7E, black)",
    "linear(to-br, gray.800, black)"
  );
  const textColor = useColorModeValue("white", "gray.200");
  const inputBg = useColorModeValue("gray.100", "gray.700");

  // Handle Login (Replace with actual auth logic)
  const handleLogin = () => {
    console.log("Logging in with:", email, password);
    // Add authentication logic here (Firebase, API call, etc.)
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient={bgGradient}
      color={textColor}
      px={6}
    >
      <Box
        bg="rgba(255, 255, 255, 0.1)"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        w={{ base: "full", md: "400px" }}
      >
        <Heading as="h2" size="lg" textAlign="center" mb={6}>
          Login to <Text as="span" color="cyan.300">NeoCred</Text>
        </Heading>

        {/* Email Input */}
        <FormControl mb={5}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            bg={inputBg}
            border="none"
            _focus={{ borderColor: "cyan.400" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        {/* Password Input */}
        <FormControl mb={5}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter your password"
            bg={inputBg}
            border="none"
            _focus={{ borderColor: "cyan.400" }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        {/* Login Button */}
        <Button
          colorScheme="cyan"
          w="full"
          size="lg"
          _hover={{ bg: "cyan.400" }}
          onClick={handleLogin}
        >
          Login
        </Button>

        {/* Signup Redirect */}
        <Text mt={4} fontSize="sm" textAlign="center">
          Don't have an account?{" "}
          <Text as="span" color="cyan.300" cursor="pointer" onClick={() => navigate("/signup")}>
            Sign up
          </Text>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
