import React from 'react';
import { Box, Flex, Link, Heading, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box bg="white" px={4} py={3} boxShadow="sm">
      <Flex maxW="1200px" mx="auto" align="center" justify="space-between">
        <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
          <Heading size="lg" color="brand.600">
            AI Orchestrator
          </Heading>
        </Link>
        <Flex gap={4}>
          <Button
            as={RouterLink}
            to="/"
            variant="ghost"
            colorScheme="brand"
          >
            Home
          </Button>
          <Button
            as={RouterLink}
            to="/history"
            variant="ghost"
            colorScheme="brand"
          >
            History
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar; 