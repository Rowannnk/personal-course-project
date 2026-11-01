# Shop Loyalty Tracker

A loyalty and membership points tracker for a café or mini mart, built with TypeScript as my personal project for the **Advanced JavaScript and TypeScript** course.

## About

Small shops often want to reward regular customers but don't have a simple system to manage loyalty points. This project aims to help a shop record customer orders, calculate points, and determine membership levels.

For now, the project focuses on one shop. Supporting multiple shops, redeemable rewards, and an owner dashboard are planned for the future.

Some basic rules guide the system:

- **Several purchases are required:** A customer needs to complete multiple orders before qualifying for membership.
- **Points come from orders:** Menu items have point values, and larger orders can earn bonus points.
- **Cancelled orders earn no points:** Cancelled orders are excluded from the calculation.
- **Membership is calculated:** Customer points, membership status, and tiers are determined from order data.

## Main Data

| Data       | What it holds                                       |
| ---------- | --------------------------------------------------- |
| Menu item  | Name, price, category, and points value             |
| Order      | Customer, items, quantities, and order status       |
| Membership | Customer points, membership tier, and member status |

## Module 1 – Personal Project

For Module 1, I created four TypeScript exercises based on the Shop Loyalty Tracker idea.

| Exercise                      | File                    | Concepts                                                             |
| ----------------------------- | ----------------------- | -------------------------------------------------------------------- |
| 1. Create Your Own Data Shape | `src/index.ts`          | Interfaces, primitive types, arrays, and type checking               |
| 2. Data in Several Kinds      | `src/data-kinds.ts`     | Interfaces, union types, and type narrowing                          |
| 3. A Keeper of Results        | `src/loyalty-keeper.ts` | Classes, private properties, string unions, and Record               |
| 4. A Guard at the Door        | `src/data-guard.ts`     | Unknown types, type guards, optional properties, and JSON validation |

In the first exercise, I intentionally introduced incorrect values and removed a required property to see how TypeScript detects errors. I then fixed the mistakes and checked the code again.

## Getting Started

Install the dependencies:

```bash
npm install
```
