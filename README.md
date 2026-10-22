# Shop Loyalty Tracker

A loyalty and membership points tracker for cafés and mini marts, built with TypeScript as my personal project for the **FE403 Advanced JavaScript and TypeScript** course.

## About

Small shops often want to reward regular customers but don't have a simple system for it. This project lets a shop record customer orders, turn them into points, and decide when a customer qualifies as a member.

A few rules shape how it works:

- **Points are separate for each shop.** There is no shared wallet across shops.
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

The project is at its first stage: a single typed program with a hard-coded menu and some orders. It checks the orders, calculates points, and prints each customer's points and membership status.

## Roadmap

As the course goes on, the project will grow in stages:

1. A single typed program (current)
2. A monorepo, so the rules and types can be shared
3. A command-line program that reads the menu and orders from files
4. A backend that stores the data and evaluates the rules, with a command-line client
5. A browser client where customers can check their points

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
