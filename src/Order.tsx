import { Box, Circle, Flex, HStack, Tabs, Text, VStack } from "@chakra-ui/react"

const AllTabs = () => {

    const orderDetails = [
        {
            status: "Available now",
            name: "Basmati Fried Rice",
        },
        {
            status: "Available now",
            name: "Smokey Jollof Rice",
        },
        {
            status: "Finished",
            name: "Suya Pasta",
        },
        {
            status: "Available now",
            name: "Smokey Jollof Rice",
        },
        {
            status: "Finished",
            name: "Pizza, Fried, Water",
        },
        {
            status: "Finished",
            name: "Pizza, Salad, Water",
        }
    ]
    return (
        <VStack gap={4}>
            {orderDetails.map((order, index) => (
                <Box key={index} borderRadius="lg" p={4} w="full">
                    <Flex alignItems="center" gap={5}>
                        <Box w={32} h={32} bg="#ECECEC" />
                        <VStack gap={0} align="start">
                            <Flex
                                flexDir="column"
                                justify="space-between"
                                align="start"
                                gap={2}
                                mb={2}
                            >
                                <Text fontSize="sm">
                                    {order.status}
                                </Text>
                                <Text mb={4} fontSize="md" fontWeight="medium">
                                    {order.name}
                                </Text>
                            </Flex>
                            <Circle bg={order.status === "Finished" ? "#D9D9D9" : "black"} color={order.status === "Finished" ? "black" : "white"} size="50px" cursor="pointer">
                                +
                            </Circle>
                        </VStack>
                    </Flex>
                </Box>
            ))}
            {/* Floating Info*/}
            <Box position="fixed" bottom={8} bg="D9D9D9" shadow="lg" zIndex={20} px={4}>
                <HStack gap={4}>
                    <VStack align="start"
                        px={5}
                        py={3}
                        fontSize="sm"
                        _hover={{ bg: "gray.800", transform: "scale(1.05)" }}
                        transition="all 0.2s"
                    >
                        <Text>Your order</Text>
                        <Text>Nothing yet. Choose an option</Text>
                        {/* show order name instead if seleted, should also support multiple orders */}
                        {/* <Text>Smokey Jollof Rice</Text> */}
                    </VStack>
                    {/* should only show if at least one order is selected */}
                    {/* <Circle bg="black" color="white" size="50px" cursor="pointer">
                        &gt;
                    </Circle> */}
                </HStack>
            </Box>
        </VStack>
    )
}


const Order = () => {
    return (
        <Box minH="100vh">
            <HStack h="full">
                <Flex w="50%" justifyContent="center" alignItems="end" maxH="100vh" pb={16}>
                    <VStack gap={0}>
                        <Text
                            fontSize="4xl"
                            fontWeight="normal"
                            fontFamily="serif"
                        >
                            #BeeTee Bistro
                        </Text>
                        <Text
                            fontSize="xl"
                            fontWeight="normal"
                        >Place your order
                        </Text>
                    </VStack>
                </Flex>
                <VStack bg="white" w="50%" h="full" px={16} py={8} justifyContent="start" alignItems="start">
                    <Flex justifyContent="space-between" alignItems="center" w="full">
                        <Text
                            fontSize="3xl"
                            fontWeight="normal"
                            fontFamily="serif"
                        >
                            Table 10
                        </Text>
                        <HStack gap={4}>
                            <Text>History</Text>
                            <Text>Leave a review</Text>
                        </HStack>
                    </Flex>

                    <Tabs.Root defaultValue="all" mx="auto" w="full" >
                        <Tabs.List gap={5} justifyContent="center" border="none">
                            <Tabs.Trigger value="all" color="black" border="1px solid" rounded="full" _selected={{ bg: "#D9D9D9" }}>
                                all
                            </Tabs.Trigger>
                            <Tabs.Trigger value="kitchen" color="black" border="1px solid" rounded="full" _selected={{ bg: "#D9D9D9" }}>
                                kitchen
                            </Tabs.Trigger>
                            <Tabs.Trigger value="bar" color="black" border="1px solid" rounded="full" _selected={{ bg: "#D9D9D9" }}>
                                bar
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="all"><AllTabs /></Tabs.Content>
                        <Tabs.Content value="kitchen">Manage your kitchen</Tabs.Content>
                        <Tabs.Content value="bar">
                            Manage your bar for freelancers
                        </Tabs.Content>
                    </Tabs.Root>

                </VStack>
            </HStack>
        </Box>
    )
}

export default Order