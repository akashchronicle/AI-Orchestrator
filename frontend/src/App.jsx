import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  Textarea,
  useToast,
  Container,
  Card,
  CardBody,
  Stack,
  StackDivider,
  Badge,
} from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [request, setRequest] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!request.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a request',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', {
        request,
      });
      setTasks([response.data, ...tasks]);
      setRequest('');
      toast({
        title: 'Task submitted',
        description: 'Your request has been processed',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error submitting task',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading textAlign="center" size="2xl">
            AI Orchestrator
          </Heading>
          
          <Card>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  <Textarea
                    value={request}
                    onChange={(e) => setRequest(e.target.value)}
                    placeholder="Enter your request (e.g., 'Clean this dataset', 'Analyze sentiment in this text')"
                    size="lg"
                    rows={4}
                  />
                  <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={loading}
                    loadingText="Processing..."
                  >
                    Submit Request
                  </Button>
                </VStack>
              </form>
            </CardBody>
          </Card>

          <Heading size="lg">Recent Tasks</Heading>
          <Stack spacing={4}>
            {tasks.map((task) => (
              <Card key={task._id}>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing={4}>
                    <Box>
                      <Heading size="sm">{task.request}</Heading>
                      <Badge
                        colorScheme={task.status === 'completed' ? 'green' : 'yellow'}
                        mt={2}
                      >
                        {task.status}
                      </Badge>
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
      </Container>
    </ChakraProvider>
  );
}

export default App;
