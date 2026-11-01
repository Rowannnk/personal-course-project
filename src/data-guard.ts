interface SavedOrder {
  orderId: string
  customerName: string
  totalAmount: number
  isCancelled: boolean
  notes?: string
}

function isSavedOrder(data: unknown): data is SavedOrder {
  if (typeof data !== "object" || data === null) {
    return false
  }

  if (
    !("orderId" in data) ||
    !("customerName" in data) ||
    !("totalAmount" in data) ||
    !("isCancelled" in data)
  ) {
    return false
  }

  if (
    typeof data.orderId !== "string" ||
    typeof data.customerName !== "string" ||
    typeof data.totalAmount !== "number" ||
    typeof data.isCancelled !== "boolean"
  ) {
    return false
  }

  if ("notes" in data && typeof data.notes !== "string") {
    return false
  }

  return true
}

function processSavedOrder(data: unknown): void {
  if (!isSavedOrder(data)) {
    console.log("Rejected: Invalid order data.")
    return
  }

  console.log("Accepted order:", data.orderId)
  console.log("Customer:", data.customerName)
  console.log("Total:", data.totalAmount)
  console.log("Notes:", data.notes ?? "No notes provided")
}

const validOrder: unknown = JSON.parse(
  '{"orderId":"ORD-004","customerName":"David","totalAmount":15.5,"isCancelled":false,"notes":"Extra ice"}',
)

const missingName: unknown = JSON.parse(
  '{"orderId":"ORD-005","totalAmount":10,"isCancelled":false}',
)

const invalidPrice: unknown = JSON.parse(
  '{"orderId":"ORD-006","customerName":"Emma","totalAmount":"ten","isCancelled":false}',
)

const invalidData: unknown = JSON.parse('"This is not an order"')

processSavedOrder(validOrder)
console.log("---")
processSavedOrder(missingName)
console.log("---")
processSavedOrder(invalidPrice)
console.log("---")
processSavedOrder(invalidData)
