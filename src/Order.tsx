import { Box, Circle, Flex, HStack, Tabs, Text, VStack } from "@chakra-ui/react"
import { useState } from "react"

interface OrderItem {
    id: number
    status: "Available now" | "Finished"
    name: string
    category: "all" | "kitchen" | "bar"
}

interface SelectedOrder {
    id: number
    name: string
    quantity: number
}

const AllTabs = ({
    orderDetails,
    selectedOrders,
    onAddOrder,
    onRemoveOrder
}: {
    orderDetails: OrderItem[]
    selectedOrders: SelectedOrder[]
    onAddOrder: (order: OrderItem) => void
    onRemoveOrder: (orderId: number) => void
}) => {
    // const getOrderQuantity = (orderId: number): number => {
    //     const selected = selectedOrders.find(order => order.id === orderId)
    //     return selected ? selected.quantity : 0
    // }

    const isOrderSelected = (orderId: number): boolean => {
        return selectedOrders.some(order => order.id === orderId)
    }

    return (
        <VStack gap={4}>
            {orderDetails.map((order) => (
                <Box key={order.id} borderRadius="lg" p={4} w="full">
                    <Flex alignItems="center" gap={5}>
                        <Box w={32} h={32} bg="#ECECEC" borderRadius="md" />
                        <VStack gap={0} align="start" flex={1}>
                            <Flex
                                flexDir="column"
                                justify="space-between"
                                align="start"
                                gap={2}
                                mb={2}
                            >
                                <Text fontSize="sm" color={order.status === "Finished" ? "gray.500" : "black"}>
                                    {order.status}
                                </Text>
                                <Text mb={4} fontSize="md" fontWeight="medium" color={order.status === "Finished" ? "gray.500" : "black"}>
                                    {order.name}
                                </Text>
                            </Flex>
                            <Flex alignItems="center" gap={3}>
                                <Circle
                                    bg={order.status === "Finished" ? "#D9D9D9" : (isOrderSelected(order.id) ? "red.500" : "black")}
                                    color={order.status === "Finished" ? "black" : "white"}
                                    size="50px"
                                    cursor={order.status === "Finished" ? "not-allowed" : "pointer"}
                                    onClick={() => {
                                        if (order.status === "Finished") return

                                        if (isOrderSelected(order.id)) {
                                            onRemoveOrder(order.id)
                                        } else {
                                            onAddOrder(order)
                                        }
                                    }}
                                    _hover={order.status !== "Finished" ? {
                                        transform: "scale(1.05)",
                                    } : {}}
                                    transition="all 0.2s"
                                    fontSize="lg"
                                >
                                    {isOrderSelected(order.id) ? "−" : "+"}
                                </Circle>
                                {/* {getOrderQuantity(order.id) > 0 && (
                                    <Text fontSize="sm" fontWeight="medium">
                                        Qty: {getOrderQuantity(order.id)}
                                    </Text>
                                )} */}
                            </Flex>
                        </VStack>
                    </Flex>
                </Box>
            ))}
        </VStack>
    )
}

const KitchenTabs = ({
    orderDetails,
    selectedOrders,
    onAddOrder,
    onRemoveOrder
}: {
    orderDetails: OrderItem[]
    selectedOrders: SelectedOrder[]
    onAddOrder: (order: OrderItem) => void
    onRemoveOrder: (orderId: number) => void
}) => {
    const kitchenOrders = orderDetails.filter(order => order.category === "kitchen")

    return (
        <AllTabs
            orderDetails={kitchenOrders}
            selectedOrders={selectedOrders}
            onAddOrder={onAddOrder}
            onRemoveOrder={onRemoveOrder}
        />
    )
}

const BarTabs = ({
    orderDetails,
    selectedOrders,
    onAddOrder,
    onRemoveOrder
}: {
    orderDetails: OrderItem[]
    selectedOrders: SelectedOrder[]
    onAddOrder: (order: OrderItem) => void
    onRemoveOrder: (orderId: number) => void
}) => {
    const barOrders = orderDetails.filter(order => order.category === "bar")

    return (
        <AllTabs
            orderDetails={barOrders}
            selectedOrders={selectedOrders}
            onAddOrder={onAddOrder}
            onRemoveOrder={onRemoveOrder}
        />
    )
}

const Order = () => {
    const [selectedOrders, setSelectedOrders] = useState<SelectedOrder[]>([])

    const orderDetails: OrderItem[] = [
        {
            id: 1,
            status: "Available now",
            name: "Basmati Fried Rice",
            category: "kitchen"
        },
        {
            id: 2,
            status: "Available now",
            name: "Smokey Jollof Rice",
            category: "kitchen"
        },
        {
            id: 3,
            status: "Finished",
            name: "Suya Pasta",
            category: "kitchen"
        },
        {
            id: 4,
            status: "Available now",
            name: "Grilled Chicken",
            category: "kitchen"
        },
        {
            id: 5,
            status: "Finished",
            name: "Pizza, Fried, Water",
            category: "kitchen"
        },
        {
            id: 6,
            status: "Available now",
            name: "Cocktail Mix",
            category: "bar"
        },
        {
            id: 7,
            status: "Available now",
            name: "Fresh Juice",
            category: "bar"
        },
        {
            id: 8,
            status: "Finished",
            name: "Wine Selection",
            category: "bar"
        }
    ]

    const handleAddOrder = (order: OrderItem) => {
        setSelectedOrders(prev => {
            const existingOrder = prev.find(selected => selected.id === order.id)
            if (existingOrder) {
                return prev.map(selected =>
                    selected.id === order.id
                        ? { ...selected, quantity: selected.quantity + 1 }
                        : selected
                )
            } else {
                return [...prev, { id: order.id, name: order.name, quantity: 1 }]
            }
        })
    }

    const handleRemoveOrder = (orderId: number) => {
        setSelectedOrders(prev => {
            const existingOrder = prev.find(selected => selected.id === orderId)
            if (existingOrder && existingOrder.quantity > 1) {
                return prev.map(selected =>
                    selected.id === orderId
                        ? { ...selected, quantity: selected.quantity - 1 }
                        : selected
                )
            } else {
                return prev.filter(selected => selected.id !== orderId)
            }
        })
    }

    // const getTotalItems = (): number => {
    //     return selectedOrders.reduce((total, order) => total + order.quantity, 0)
    // }

    const getOrderSummary = (): string => {
        if (selectedOrders.length === 0) return "Nothing yet. Choose an option"
        if (selectedOrders.length === 1) return selectedOrders[0].name
        return `${selectedOrders.length} different items selected`
    }

    return (
        <Box minH="100vh" position="relative">
            <Flex h="full" justifyContent="end">
                <Flex w="50%" justifyContent="center" position="fixed" bottom={0} left={0} maxH="100vh" pb={16}>
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
                <VStack bg="white" w="50%" h="full" px={16} py={8} justifyContent="start" alignItems="start" minH="100vh">
                    <Flex justifyContent="space-between" alignItems="center" w="full">
                        <Text
                            fontSize="3xl"
                            fontWeight="normal"
                            fontFamily="serif"
                        >
                            Table 10
                        </Text>
                        <HStack gap={4} fontSize="sm">
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>History</Text>
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>Leave a review</Text>
                        </HStack>
                    </Flex>

                    <Tabs.Root defaultValue="all" mx="auto" w="full">
                        <Tabs.List gap={5} justifyContent="center" border="none">
                            <Tabs.Trigger value="all" color="black" border="1px solid" rounded="full" _selected={{ bg: "#D9D9D9" }}>
                                All
                            </Tabs.Trigger>
                            <Tabs.Trigger value="kitchen" color="black" border="1px solid" rounded="full" _selected={{ bg: "#D9D9D9" }}>
                                Kitchen
                            </Tabs.Trigger>
                            <Tabs.Trigger value="bar" color="black" border="1px solid" rounded="full" _selected={{ bg: "#D9D9D9" }}>
                                Bar
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value="all">
                            <AllTabs
                                orderDetails={orderDetails}
                                selectedOrders={selectedOrders}
                                onAddOrder={handleAddOrder}
                                onRemoveOrder={handleRemoveOrder}
                            />
                        </Tabs.Content>
                        <Tabs.Content value="kitchen">
                            <KitchenTabs
                                orderDetails={orderDetails}
                                selectedOrders={selectedOrders}
                                onAddOrder={handleAddOrder}
                                onRemoveOrder={handleRemoveOrder}
                            />
                        </Tabs.Content>
                        <Tabs.Content value="bar">
                            <BarTabs
                                orderDetails={orderDetails}
                                selectedOrders={selectedOrders}
                                onAddOrder={handleAddOrder}
                                onRemoveOrder={handleRemoveOrder}
                            />
                        </Tabs.Content>
                    </Tabs.Root>
                </VStack>
            </Flex>

            {/* Floating Order Summary */}
            <Box
                position="fixed"
                bottom={8}
                right="25%"
                transform="translateX(50%)"
                bg="#D9D9D9"
                shadow="lg"
                zIndex={20}
                minW="250px"
                px={4}
                borderRadius="lg"
            >
                <HStack gap={4}>
                    <VStack
                        align="start"
                        px={5}
                        py={3}
                        fontSize="sm"
                        transition="all 0.2s"
                    >
                        <Text fontWeight="medium">Your order</Text>
                        <Text>{getOrderSummary()}</Text>
                        {/* {getTotalItems() > 0 && (
                            <Text fontSize="xs" color="gray.600">
                                Total items: {getTotalItems()}
                            </Text>
                        )} */}
                    </VStack>
                    {selectedOrders.length > 0 && (
                        <Circle
                            bg="black"
                            color="white"
                            size="50px"
                            cursor="pointer"
                            _hover={{
                                bg: "gray.800",
                                transform: "scale(1.05)"
                            }}
                            transition="all 0.2s"
                            onClick={() => {
                                // Handle checkout/proceed to next step
                                console.log('Proceeding with order:', selectedOrders)
                            }}
                        >
                            &gt;
                        </Circle>
                    )}
                </HStack>
            </Box>
        </Box>
    )
}

export default Order