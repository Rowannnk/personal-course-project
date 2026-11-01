interface DineInOrder {
  kind: "dine-in"
  orderId: string
  customerName: string
  tableNumber: number
}

interface TakeawayOrder {
  kind: "takeaway"
  orderId: string
  customerName: string
  pickupName: string
}

type ShopOrder = DineInOrder | TakeawayOrder

function describeOrder(order: ShopOrder): string {
  if (order.kind === "dine-in") {
    return `${order.customerName} is eating at table ${order.tableNumber}.`
  }

  return `${order.customerName} will collect the order under the name ${order.pickupName}.`
}

const dineInOrder: DineInOrder = {
  kind: "dine-in",
  orderId: "ORD-002",
  customerName: "John",
  tableNumber: 5,
}

const takeawayOrder: TakeawayOrder = {
  kind: "takeaway",
  orderId: "ORD-003",
  customerName: "Alice",
  pickupName: "Alice",
}

console.log(describeOrder(dineInOrder))
console.log(describeOrder(takeawayOrder))
