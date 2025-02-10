import React from "react";
import { Box, Flex, Heading, Text, List, ListItem, useColorModeValue } from "@chakra-ui/react";
import RotatingText from "../components/RotatingText";

const About = () => {
  // Dark/Light mode adaptive colors
  const bgGradient = useColorModeValue(
    "linear(to-br, #2F3C7E, black)",
    "linear(to-br, gray.800, black)"
  );
  const textColor = useColorModeValue("white", "gray.200");
  const highlightColor = useColorModeValue("cyan.300", "cyan.400");

  return (
    <Box
      id="about"
      minH="100vh"
      bgGradient={bgGradient}
      color={textColor}
      px={{ base: 6, md: 12 }}
      py={16}
      textAlign="center"
    >
      {/* Section Heading */}
      <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="bold" mb={8}>
        About <Text as="span" color={highlightColor}>NEO CRED</Text>
      </Heading>

      {/* Rotating Highlighted Text */}
      <Flex justify="center" mb={6}>
        <Box
          px={4}
          py={2}
          bg="cyan.300"
          color="black"
          rounded="lg"
          fontSize={{ base: "xl", md: "2xl" }}
          fontWeight="semibold"
          overflow="hidden"
        >
          <RotatingText
            texts={[
              "Decentralized Credit Scoring",
              "Federated Learning for Privacy",
              "Blockchain-Powered Security",
              "Explainable AI for Trust",
            ]}
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2500}
          />
        </Box>
      </Flex>

      {/* About Text Section */}
      <Text fontSize="lg" maxW="4xl" mx="auto" mb={10} opacity={0.9}>
        <strong>NEO CRED</strong> is a revolutionary <strong>decentralized credit assessment system</strong>
        that empowers financial inclusion. By leveraging <Text as="span" color={highlightColor}>Federated Learning</Text>
        and <Text as="span" color={highlightColor}>Blockchain</Text>, it ensures <strong>privacy, security, and transparency</strong>
        in credit scoring. Our <strong>Explainable AI (XAI)</strong> model provides insights into credit decisions,
        making the system <strong>fair, reliable, and data-driven</strong>.
      </Text>

      {/* Features Section */}
      <Box mt={10}>
        <Heading as="h2" fontSize="3xl" fontWeight="bold" color={highlightColor} mb={6}>
          Why Choose NEO CRED?
        </Heading>
        <List spacing={4} fontSize="lg" textAlign="left" maxW="3xl" mx="auto">
          <ListItem>✔ <strong>Privacy-Focused:</strong> Uses <strong>Federated Learning</strong> to assess credit risk <strong>without exposing user data</strong>.</ListItem>
          <ListItem>✔ <strong>Secure & Immutable:</strong> Credit scores are stored on <strong>Ethereum/Polygon blockchain</strong>, preventing manipulation.</ListItem>
          <ListItem>✔ <strong>Real-Time Loan Meter:</strong> Instant loan eligibility visualization using <strong>dynamic scoring models</strong>.</ListItem>
          <ListItem>✔ <strong>Explainable AI (XAI):</strong> Provides transparency in scoring, helping users understand their financial standing.</ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default About;