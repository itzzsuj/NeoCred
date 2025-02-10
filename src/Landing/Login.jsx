import React, { useState } from "react";
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
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }} // Stacks on mobile, side-by-side on desktop
        bg="rgba(255, 255, 255, 0.1)"
        borderRadius="lg"
        boxShadow="lg"
        w={{ base: "full", md: "800px" }}
        overflow="hidden"
      >
        {/* Left Side - Login Form */}
        <Box p={8} w="100%">
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
        </Box>

        {/* Right Side - Image */}
        <Box display={{ base: "none", md: "block" }}> {/* Hide image on mobile */}
          <Image
            src={Loginimg} // Replace with actual login image
            alt="Login Illustration"
            objectFit="cover"
            h="100%"
            w="100%"
          />
        </Box>
      </Grid>
    </Flex>
  );
};

export default Login;
