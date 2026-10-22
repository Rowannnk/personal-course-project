# Shop Loyalty Tracker

A loyalty and membership points tracker for a café or mini mart, built with TypeScript as my personal project for the **Advanced JavaScript and TypeScript** course.

## About

Small shops often want to reward regular customers but don't have a simple system for it. This project lets a shop record customer orders, turn them into points, and decide when a customer qualifies as a member.

For now it is built for one shop. Supporting several shops, each with its own points, is planned for later.

A few rules shape how it works:

- **One purchase is not enough.** A customer has to complete several orders before becoming a member, so the requirement makes sense for the shop owner.
- **Points come from the order.** Each menu item is worth points, and big orders can earn a bonus.
- **Cancelled orders give nothing.**

The result (points, member or not, tier) is calculated from the order data, not typed in by hand.

## Main Data

| Data       | What it holds                               |
| ---------- | ------------------------------------------- |
| Menu item  | Name, price, category and points value      |
| Order      | Customer, items with quantities, and status |
| Membership | A customer's points, tier and member status |

## Current Stage

The project is at its first stage: a single typed program with a hard-coded menu and some orders for one shop. It checks the orders, calculates points, and prints each customer's points and membership status.

Later ideas: support for several shops, rewards that points can be spent on, and an owner dashboard.

## Getting Started

```bash
npm install
npm start
```

## Tooling

| Tool       | Command             | Purpose                             |
| ---------- | ------------------- | ----------------------------------- |
| TypeScript | `npm run typecheck` | Checks types without emitting files |
| ESLint     | `npm run lint`      | Finds code problems                 |
| Prettier   | `npm run format`    | Formats code consistently           |
| Run        | `npm start`         | Runs `src/index.ts`                 |
