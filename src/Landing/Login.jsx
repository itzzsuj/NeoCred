import React, { useState } from "react";
import { auth } from "../firebase/firebase"; // Ensure correct import
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Loginimg from "../images/loginimg.jpg";
import {
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Grid,
  Image,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Dark/Light mode adaptive colors
  const bgGradient = useColorModeValue(
    "linear(to-br, #2F3C7E, black)",
    "linear(to-br, gray.800, black)"
  );
  const textColor = useColorModeValue("white", "gray.200");
  const inputBg = useColorModeValue("gray.100", "gray.700");

  // Validate email format (must end with @axis.com)
  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@axis\.com$/.test(email);

  // Handle Firebase Login
  const handleLogin = async () => {
    if (!isValidEmail(email)) {
      setError("Email must be in the format: example@axis.com");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Login successful", user);
      setError("");
      navigate("/customer"); // ✅ Redirect to Customer Page
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bgGradient={bgGradient} color={textColor} px={6}>
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} bg="rgba(255, 255, 255, 0.1)" borderRadius="lg" boxShadow="lg" w={{ base: "full", md: "800px" }} overflow="hidden">
        {/* Left Side - Login Form */}
        <Box p={8} w="100%">
          <Heading as="h2" size="lg" textAlign="center" mb={6}>
            Login to <Text as="span" color="cyan.300">NeoCred</Text>
          </Heading>

          {/* Email Input */}
          <FormControl mb={5} isInvalid={error}>
            <FormLabel>Email</FormLabel>
            <Input color="black" type="email" placeholder="Enter your email (example@axis.com)" bg={inputBg} border="none" _focus={{ borderColor: "cyan.400" }} value={email} onChange={(e) => setEmail(e.target.value)} />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
          </FormControl>

          {/* Password Input */}
          <FormControl mb={5}>
            <FormLabel>Password</FormLabel>
            <Input color="black" type="password" placeholder="Enter your password" bg={inputBg} border="none" _focus={{ borderColor: "cyan.400" }} value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>

          {/* Login Button */}
          <Button colorScheme="cyan" w="full" size="lg" _hover={{ bg: "cyan.400" }} onClick={handleLogin}>
            Login
          </Button>
        </Box>

        {/* Right Side - Image */}
        <Box display={{ base: "none", md: "block" }}>
          <Image src={Loginimg} alt="Login Illustration" objectFit="cover" h="100%" w="100%" />
        </Box>
      </Grid>
    </Flex>
  );
};

export default Login;
