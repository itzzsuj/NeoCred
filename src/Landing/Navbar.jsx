import React from "react";
import { Box, Flex, Heading, IconButton, Button, VStack, useDisclosure } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      onToggle(); // Close sidebar after clicking
    }
  };

  return (
    <>
      {/* Navbar */}
      <Flex
        as="nav"
        bg="#2F3C7E"
        color="white"
        p={4}
        align="center"
        justify="space-between"
        wrap="wrap"
        borderBottom="4px solid black" // Black shade outline
      >
        <Heading size="lg">NeoCred</Heading>

        {/* Desktop Nav Items */}
        <Flex display={{ base: "none", md: "flex" }} gap={6} align="center">
          <Button variant="link" color="white" onClick={() => scrollToSection("home")}>
            HOME
          </Button>
          <Button variant="link" color="white" onClick={() => scrollToSection("about")}>
            ABOUT
          </Button>
          <Button variant="link" color="white" onClick={() => scrollToSection("contact")}>
            CONTACT
          </Button>
          <Button colorScheme="pink" onClick={() => navigate("/login")}>
            LOGIN
          </Button>
        </Flex>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Open Menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
        />
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
            <Button variant="link" color="black" onClick={() => scrollToSection("home")}>
              HOME
            </Button>
            <Button variant="link" color="black" onClick={() => scrollToSection("about")}>
              ABOUT
            </Button>
            <Button variant="link" color="black" onClick={() => scrollToSection("contact")}>
              CONTACT
            </Button>
            <Button colorScheme="pink" onClick={() => navigate("/login")}>
              LOGIN
            </Button>
          </VStack>
        </Box>
      )}
    </>
  );
}

export default Navbar;