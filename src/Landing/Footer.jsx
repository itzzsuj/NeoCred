import React from "react";
import { Box, Flex, Heading, Text, Link, useColorModeValue } from "@chakra-ui/react";

const Footer = () => {
  // Adaptive colors for light/dark mode
  const bgColor = useColorModeValue("#2F3C7E", "gray.900");
  const textColor = useColorModeValue("white", "gray.300");
  const linkHoverColor = useColorModeValue("cyan.300", "cyan.400");

  return (
    <Box
      as="footer"
      bg={bgColor}
      color={textColor}
      py={6}
      px={4}
      textAlign="center"
    >
      {/* Branding */}
      <Heading as="h1" fontSize="xl" fontWeight="bold">
        NeoCred
      </Heading>

      {/* Footer Links */}
      <Flex justify="center" gap={6} mt={3}>
        <Link href="#home" _hover={{ textDecoration: "none", color: linkHoverColor }}>
          Home
        </Link>
        <Link href="#about" _hover={{ textDecoration: "none", color: linkHoverColor }}>
          About
        </Link>
        <Link href="#contact" _hover={{ textDecoration: "none", color: linkHoverColor }}>
          Contact
        </Link>
      </Flex>

      {/* Copyright Notice */}
      <Text mt={4} fontSize="sm" opacity={0.8}>
        © {new Date().getFullYear()} NeoCred. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
