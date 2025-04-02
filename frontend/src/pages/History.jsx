import React, { useState, useEffect } from 'react';
import {
  VStack,
  Heading,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Badge,
  Text,
  Box,
  Select,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const History = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const toast = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      toast({
        title: 'Error fetching tasks',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <VStack spacing={8} align="stretch">
      <Heading textAlign="center" size="xl">
        Task History
      </Heading>

      <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        maxW="200px"
      >
        <option value="all">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="processing">Processing</option>
        <option value="failed">Failed</option>
      </Select>

      <Stack spacing={4}>
        {filteredTasks.map((task) => (
          <Card key={task._id}>
            <CardBody>
              <Stack divider={<StackDivider />} spacing={4}>
                <Box>
                  <Heading size="sm">{task.request}</Heading>
                  <Badge
                    colorScheme={
                      task.status === 'completed'
                        ? 'green'
                        : task.status === 'failed'
                        ? 'red'
                        : 'yellow'
                    }
                    mt={2}
                  >
                    {task.status}
                  </Badge>
                  <Text fontSize="sm" color="gray.500" mt={1}>
                    {new Date(task.createdAt).toLocaleString()}
                  </Text>
                </Box>
                {task.result && (
                  <Box>
                    <Text fontWeight="bold">Result:</Text>
                    <Text whiteSpace="pre-wrap">{task.result}</Text>
                  </Box>
                )}
              </Stack>
            </CardBody>
          </Card>
        ))}
      </Stack>
    </VStack>
  );
};

export default History; 