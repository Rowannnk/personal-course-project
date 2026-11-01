interface OrderItem {
  name: string
  price: number
  quantity: number
}

interface Order {
  orderId: string
  customerName: string
  items: OrderItem[]
  totalAmount: number
  isCancelled: boolean
}

const order: Order = {
  orderId: "ORD-001",
  customerName: "John",
  items: [
    {
      name: "Iced Coffee",
      price: 3.5,
      quantity: 2,
    },
    {
      name: "Chocolate Cake",
      price: 4,
      quantity: 1,
    },
  ],
  totalAmount: 11,
  isCancelled: false,
}

console.log("Order ID:", order.orderId)
console.log("Customer:", order.customerName)
console.log("Items:", order.items)
console.log("Total Amount:", order.totalAmount)
