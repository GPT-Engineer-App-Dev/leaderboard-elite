import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Table, Thead, Tbody, Tr, Th, Td, Input, Select, Button, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Avatar, Switch, Progress, Alert, AlertIcon } from "@chakra-ui/react";
import { FaBars, FaSync, FaCog, FaUser } from "react-icons/fa";

const Index = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("daily");
  const [category, setCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [syncStatus, setSyncStatus] = useState("idle");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Fetch leaderboard data from the mocked backend
    const fetchLeaderboardData = async () => {
      // Replace with actual API call to the mocked backend
      const response = await fetch(`/api/leaderboard?timeFrame=${timeFrame}&category=${category}`);
      const data = await response.json();
      setLeaderboardData(data);
    };

    fetchLeaderboardData();
  }, [timeFrame, category]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSync = async () => {
    setSyncStatus("syncing");
    // Simulate data sync with a delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setSyncStatus("completed");
  };

  const filteredData = leaderboardData.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Box>
      <Flex align="center" justify="space-between" p={4}>
        <Heading as="h1" size="xl">
          ActivityWatch Leaderboard
        </Heading>
        <Button leftIcon={<FaBars />} onClick={onOpen}>
          Menu
        </Button>
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Box mb={4}>
              <Button leftIcon={<FaUser />} variant="ghost" size="lg" width="100%">
                Profile
              </Button>
            </Box>
            <Box mb={4}>
              <Button leftIcon={<FaCog />} variant="ghost" size="lg" width="100%">
                Settings
              </Button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box p={4}>
        <Flex mb={4} align="center">
          <Select mr={4} value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </Select>
          <Select mr={4} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="coding">Coding</option>
            <option value="design">Design</option>
          </Select>
          <Input placeholder="Search users" value={searchTerm} onChange={handleSearch} />
        </Flex>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>User</Th>
              <Th>Productive Time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredData.map((user, index) => (
              <Tr key={user.id}>
                <Td>{index + 1}</Td>
                <Td>
                  <Flex align="center">
                    <Avatar size="sm" name={isAnonymous ? "Anonymous" : user.name} src={isAnonymous ? null : user.avatar} mr={2} />
                    {isAnonymous ? "Anonymous" : user.name}
                  </Flex>
                </Td>
                <Td>{user.productiveTime}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Box p={4}>
        <Heading as="h2" size="lg" mb={4}>
          Profile
        </Heading>
        <Flex align="center" mb={4}>
          <Avatar size="lg" name="John Doe" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHx1c2VyJTIwYXZhdGFyfGVufDB8fHx8MTcxMDMyMzIyMHww&ixlib=rb-4.0.3&q=80&w=1080" mr={4} />
          <Box>
            <Heading as="h3" size="md">
              John Doe
            </Heading>
            <Flex align="center">
              <Switch id="anonymous" isChecked={isAnonymous} onChange={(e) => setIsAnonymous(e.target.checked)} mr={2} />
              <label htmlFor="anonymous">Anonymous</label>
            </Flex>
          </Box>
        </Flex>
        <Box mb={4}>
          <Heading as="h4" size="sm" mb={2}>
            Productive Time This Week
          </Heading>
          <Progress value={80} />
        </Box>
        <Button leftIcon={<FaSync />} onClick={handleSync} isLoading={syncStatus === "syncing"} loadingText="Syncing">
          {syncStatus === "completed" ? "Sync Completed" : "Sync Data"}
        </Button>
        {syncStatus === "completed" && (
          <Alert status="success" mt={4}>
            <AlertIcon />
            Data synced successfully!
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Index;
