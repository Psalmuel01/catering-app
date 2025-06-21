import { useState } from "react"
import { Box, Button, Circle, CloseButton, Drawer, Flex, HStack, Image, Input, Portal, Tabs, Text, VStack } from "@chakra-ui/react"
import ofada from "/ofada.png";
import friedrice from "/friedrice.png";
import jollof from "/jollof.png";
import pasta from "/pasta.png";
import { toaster } from "./components/ui/toaster";

interface OrderItem {
    id: number
    status: "Available now" | "Finished"
    name: string
    category: "all" | "kitchen" | "bar"
    image?: string
}

interface SelectedOrder {
    id: number
    name: string
    image?: string
    quantity: number
}

const AllTabs = ({
    orderDetails,
    selectedOrders,
    onAddOrder,
    onRemoveOrder,
    orderIsPending
}: {
    orderDetails: OrderItem[]
    selectedOrders: SelectedOrder[]
    onAddOrder: (order: OrderItem) => void
    onRemoveOrder: (orderId: number) => void
    orderIsPending: boolean
}) => {
    const isOrderSelected = (orderId: number): boolean => {
        return selectedOrders.some(order => order.id === orderId)
    }

    return (
        <VStack gap={{ base: 0, md: 4 }}>
            {orderDetails.map((order) => (
                <Box key={order.id} borderRadius="lg" p={{ base: 2, md: 4 }} w="full">
                    <Flex alignItems="center" gap={5}>
                        {order.image ? <Image src={order.image} alt={order.name} w={32} h={32} /> : <Box w={32} h={32} bg="#ECECEC" />}

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
                                    bg={order.status === "Finished" ? "#D9D9D9" : "black"}
                                    color={order.status === "Finished" ? "black" : "white"}
                                    size="50px"
                                    cursor={order.status === "Finished" ? "not-allowed" : "pointer"}
                                    onClick={() => {
                                        if (order.status === "Finished") return
                                        if (orderIsPending) {
                                            toaster.create({
                                                description: "Sorry, can’t place new order while processing an order",
                                                type: "error",
                                            })
                                            return
                                        }
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
    onRemoveOrder,
    orderIsPending
}: {
    orderDetails: OrderItem[]
    selectedOrders: SelectedOrder[]
    onAddOrder: (order: OrderItem) => void
    onRemoveOrder: (orderId: number) => void
    orderIsPending: boolean
}) => {
    const kitchenOrders = orderDetails.filter(order => order.category === "kitchen")

    return (
        <AllTabs
            orderDetails={kitchenOrders}
            selectedOrders={selectedOrders}
            onAddOrder={onAddOrder}
            onRemoveOrder={onRemoveOrder}
            orderIsPending={orderIsPending}
        />
    )
}

const BarTabs = ({
    orderDetails,
    selectedOrders,
    onAddOrder,
    onRemoveOrder,
    orderIsPending
}: {
    orderDetails: OrderItem[]
    selectedOrders: SelectedOrder[]
    onAddOrder: (order: OrderItem) => void
    onRemoveOrder: (orderId: number) => void
    orderIsPending: boolean
}) => {
    const barOrders = orderDetails.filter(order => order.category === "bar")

    return (
        <AllTabs
            orderDetails={barOrders}
            selectedOrders={selectedOrders}
            onAddOrder={onAddOrder}
            onRemoveOrder={onRemoveOrder}
            orderIsPending={orderIsPending}
        />
    )
}

const Order = () => {
    const [open, setOpen] = useState(false)
    const [orderIsPending, setOrderIsPending] = useState(false)
    const [selectedOrders, setSelectedOrders] = useState<SelectedOrder[]>([])

    const orderDetails: OrderItem[] = [
        {
            id: 1,
            status: "Available now",
            name: "Basmati Fried Rice",
            category: "kitchen",
            image: friedrice
        },
        {
            id: 2,
            status: "Available now",
            name: "Smokey Jollof Rice",
            category: "kitchen",
            image: jollof
        },
        {
            id: 3,
            status: "Available now",
            name: "Ofada Rice Sauce",
            category: "all",
            image: ofada
        },
        {
            id: 4,
            status: "Finished",
            name: "Suya Pasta",
            category: "kitchen",
            image: pasta
        },
        {
            id: 5,
            status: "Available now",
            name: "Cocktail Mix",
            category: "bar"
        },
        {
            id: 6,
            status: "Available now",
            name: "Grilled Chicken",
            category: "kitchen"
        },
        {
            id: 7,
            status: "Finished",
            name: "Pizza, Fried, Water",
            category: "kitchen"
        },
        {
            id: 8,
            status: "Available now",
            name: "Fresh Juice",
            category: "bar"
        },
        {
            id: 9,
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
                return [...prev, { id: order.id, name: order.name, quantity: 1, image: order.image }]
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

    const handleSubmitOrder = () => {
        setOpen(false)
        setSelectedOrders([])
        setOrderIsPending(true)
        setTimeout(() => {
            setOrderIsPending(false)
        }, 10000)
        console.log("Selected orders:", selectedOrders)
        // Add your logic to submit the order here
    }

    const getOrderSummary = (): string => {
        if (selectedOrders.length === 0) return "Nothing yet. Choose an option"
        if (selectedOrders.length === 1) return selectedOrders[0].name
        return `${selectedOrders.length} different items selected`
    }

    const getOrderTime = (): string => {
        // Calculate the total time based on the number of selected orders
        return "09mins 23secs"
    }

    return (
        <Box minH="100vh" position="relative">
            <Flex
                h="full"
                direction={{ base: "column", md: "row" }}
                justifyContent={{ base: "start", md: "end" }}
                align="start"
            >
                <Flex
                    w={{ base: "100%", md: "50%" }}
                    justifyContent="center"
                    position={{ base: "relative", md: "fixed" }}
                    bottom={{ base: "auto", md: 0 }}
                    left={0}
                    maxH="100vh"
                    pb={{ base: 0, md: 16 }}
                >
                    <VStack
                        gap={4}
                        bgImage="url('/bgImg.png')"
                        bgSize="cover"
                        bgPos="center"
                        bgRepeat="no-repeat"
                        w="full"
                        minH={{ base: "25vh", md: "100vh" }}
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                    >
                        <Flex flexDir="column" color="white" alignItems="center" justifyContent={{ base: "space-between", md: "end" }} h="full" w="full" p={2.5} pb={{ base: 0, md: 50 }}>
                            <Flex display={{ base: "flex", md: "none" }} color="white" justifyContent="space-between" alignItems="center" w="full">
                                <Text fontSize="xl" fontWeight="normal" fontFamily="serif">
                                    Table 10
                                </Text>
                                <HStack gap={4} fontSize="xs">
                                    <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>History</Text>
                                    <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>Leave a review</Text>
                                </HStack>
                            </Flex>
                            <Flex flexDir="column" alignItems="center" gap={0} fontFamily="serif" color="white">
                                <Text fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.2">
                                    #BeeTee Bistro
                                </Text>
                                <Text fontSize={{ base: "lg", md: "2xl" }}>
                                    Place your order
                                </Text>
                            </Flex>
                            <Tabs.Root display={{ base: "block", md: "none" }} defaultValue="all" mx="auto" w="full">
                                <Tabs.List gap={5} justifyContent="center" border="none">
                                    <Tabs.Trigger value="all" color="white" border="1px solid" rounded="full" fontSize="xs" py={0} _selected={{ bg: "white", color: "black" }}>
                                        All
                                    </Tabs.Trigger>
                                    <Tabs.Trigger value="kitchen" color="white" border="1px solid" rounded="full" fontSize="xs" py={0} _selected={{ bg: "white", color: "black" }}>
                                        Kitchen
                                    </Tabs.Trigger>
                                    <Tabs.Trigger value="bar" color="white" border="1px solid" rounded="full" fontSize="xs" py={0} _selected={{ bg: "white", color: "black" }}>
                                        Bar
                                    </Tabs.Trigger>
                                </Tabs.List>

                                <Tabs.Content value="all">
                                    {/* <AllTabs
                                        orderDetails={orderDetails}
                                        selectedOrders={selectedOrders}
                                        onAddOrder={handleAddOrder}
                                        onRemoveOrder={handleRemoveOrder}
                                    /> */}
                                </Tabs.Content>
                                <Tabs.Content value="kitchen">
                                    {/* <KitchenTabs
                                        orderDetails={orderDetails}
                                        selectedOrders={selectedOrders}
                                        onAddOrder={handleAddOrder}
                                        onRemoveOrder={handleRemoveOrder}
                                    /> */}
                                </Tabs.Content>
                                <Tabs.Content value="bar">
                                    {/* <BarTabs
                                        orderDetails={orderDetails}
                                        selectedOrders={selectedOrders}
                                        onAddOrder={handleAddOrder}
                                        onRemoveOrder={handleRemoveOrder}
                                    /> */}
                                </Tabs.Content>
                            </Tabs.Root>
                        </Flex>
                    </VStack>
                </Flex>

                <VStack
                    bg="white"
                    w={{ base: "100%", md: "50%" }}
                    h="full"
                    px={{ base: 4, md: 16 }}
                    py={{ base: 6, md: 8 }}
                    justifyContent="start"
                    alignItems="start"
                    minH="100vh"
                >
                    <Flex display={{ base: "none", md: "flex" }} justifyContent="space-between" alignItems="center" w="full">
                        <Text fontSize="3xl" fontWeight="normal" fontFamily="serif">
                            Table 10
                        </Text>
                        <HStack gap={4} fontSize="sm">
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>History</Text>
                            <Text cursor="pointer" _hover={{ textDecoration: "underline" }}>Leave a review</Text>
                        </HStack>
                    </Flex>

                    <Tabs.Root defaultValue="all" mx="auto" w="full">
                        <Tabs.List gap={5} justifyContent="center" border="none" display={{ base: "none", md: "flex" }}>
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
                                orderIsPending={orderIsPending}
                            />
                        </Tabs.Content>
                        <Tabs.Content value="kitchen">
                            <KitchenTabs
                                orderDetails={orderDetails}
                                selectedOrders={selectedOrders}
                                onAddOrder={handleAddOrder}
                                onRemoveOrder={handleRemoveOrder}
                                orderIsPending={orderIsPending}
                            />
                        </Tabs.Content>
                        <Tabs.Content value="bar">
                            <BarTabs
                                orderDetails={orderDetails}
                                selectedOrders={selectedOrders}
                                onAddOrder={handleAddOrder}
                                onRemoveOrder={handleRemoveOrder}
                                orderIsPending={orderIsPending}
                            />
                        </Tabs.Content>
                    </Tabs.Root>
                </VStack>
            </Flex>

            {/* Floating Order Summary */}
            <Box
                position="fixed"
                bottom={{ base: "0", md: "8" }}
                right={{ base: "0", md: "25vw" }}
                transform={{ base: "translateX(0)", md: "translateX(50%)" }}
                bg="#D9D9D9"
                shadow="lg"
                zIndex={20}
                minW={{ base: "100%", md: "230px" }}
                w={{ base: "100%", md: "auto" }}
                px={4}
                borderRadius={{ base: "none", md: "lg" }}
            >
                <Flex alignItems={"center"} justifyContent="space-between" gap={4}>
                    <VStack
                        align="start"
                        px={5}
                        py={3}
                        fontSize="sm"
                        transition="all 0.2s"
                    >
                        <Text>{orderIsPending ? "Order arrives in" : "Your order"}</Text>
                        <Text>{orderIsPending ? getOrderTime() : getOrderSummary()}</Text>
                    </VStack>
                    {selectedOrders.length > 0 && (
                        <Drawer.Root size="sm" placement="end" open={open} onOpenChange={(e) => setOpen(e.open)}>
                            <Drawer.Trigger asChild>
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
                                >
                                    &gt;
                                </Circle>
                            </Drawer.Trigger>
                            <Portal>
                                <Drawer.Backdrop bg={"rgba(0, 0, 0, 0.50)"} backdropFilter={"blur(10px)"} />
                                <Drawer.Positioner>
                                    <Drawer.Content
                                        bg={"#fff"}
                                        color={"#000"}
                                        className={"no-scrollbar"}
                                        fontFamily={"font4"}
                                        p={{ base: "0.675rem", md: "1rem" }}>
                                        <Drawer.Header>
                                            <Drawer.Title fontSize="3xl" fontWeight="light" mb={8}>Order Summary</Drawer.Title>
                                        </Drawer.Header>
                                        <Drawer.Body display="flex" flexDirection="column" justifyContent="space-between">
                                            <Box mb={16}>
                                                {selectedOrders.map((order) => (
                                                    <Flex alignItems="center" justifyContent="space-between" mb={8}>
                                                        <HStack>
                                                            {order.image ? <Image src={order.image} alt={order.name} w={12} h={12} /> : <Box w={12} h={12} border="1px solid #ACACAC" />}
                                                            <Text fontSize="lg">{order.name}</Text>
                                                        </HStack>
                                                        <Text fontSize="md">3mins</Text>
                                                    </Flex>
                                                ))}

                                                <VStack gap={3} align="stretch">
                                                    <Text
                                                        fontSize="md"
                                                        textTransform="uppercase"
                                                        letterSpacing="wider"
                                                    >
                                                        Total Time ({selectedOrders.length * 3} mins)
                                                    </Text>

                                                    <Text
                                                        fontSize="md"
                                                        textTransform="uppercase"
                                                        letterSpacing="wide"
                                                    >
                                                        Please Note
                                                    </Text>

                                                    <Box as="ul" listStyleType="disc" gap={3} pl={6} fontSize="md">
                                                        <li>
                                                            Server will bring it up to your table
                                                        </li>

                                                        <li>
                                                            No additional step needed after placing order
                                                        </li>

                                                        <li>
                                                            Only one order per time
                                                        </li>

                                                        <li>
                                                            Order cannot be edited
                                                        </li>
                                                    </Box>
                                                </VStack>
                                            </Box>
                                            <VStack gap={8}>
                                                <VStack w="full" gap={4}>
                                                    <Input
                                                        id="name"
                                                        placeholder="Full name"
                                                        size="sm"
                                                        border="1px solid"
                                                        borderColor="#D9D9D9"
                                                        rounded="none"
                                                        bg="#D9D9D9"
                                                        px={2}
                                                        py={6}
                                                    />
                                                    <Input
                                                        id="name"
                                                        placeholder="Phone number"
                                                        size="sm"
                                                        border="1px solid"
                                                        borderColor="#D9D9D9"
                                                        rounded="none"
                                                        bg="#D9D9D9"
                                                        px={2}
                                                        py={6}
                                                    />
                                                </VStack>
                                                <Button
                                                    cursor={"pointer"}
                                                    bgColor="black"
                                                    color="white"
                                                    justifyContent={"center"}
                                                    alignItems={"center"}
                                                    fontSize={{ base: "0.785rem", md: "0.895rem" }}
                                                    letterSpacing={"1px"}
                                                    fontFamily={"font4"}
                                                    _hover={{ bgColor: "black", color: "white" }}
                                                    rounded="none"
                                                    px={"1.5rem"}
                                                    w={"full"}
                                                    h={"50px"}
                                                    mb={2.5}
                                                    onClick={handleSubmitOrder}
                                                >
                                                    Order now
                                                </Button>
                                                <Text display="flex" gap={1} alignItems="center">
                                                    <Text as="span">Powered by weddn.co</Text>
                                                    <Text as="span">|</Text>
                                                    <Text as="span" textDecor="underline" cursor="pointer">
                                                        Contact us
                                                    </Text>
                                                </Text>
                                            </VStack>
                                        </Drawer.Body>

                                        <Drawer.CloseTrigger asChild>
                                            <CloseButton size="sm" bg="#D9D9D9" color="white" rounded="full" />
                                        </Drawer.CloseTrigger>
                                    </Drawer.Content>
                                </Drawer.Positioner>
                            </Portal>
                        </Drawer.Root>
                    )}
                </Flex>
            </Box>
        </Box>
    )
}

export default Order