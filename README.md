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

## Project Structure

This project uses a pnpm workspace with an application and a shared package.

```text
personal-course-project/
├── apps/
│   └── shop-app/
│       ├── src/
│       │   ├── server/
│       │   │   ├── index.ts
│       │   │   └── plugins/
│       │   │       └── members.ts
│       │   ├── services/
│       │   │   └── members.ts
│       │   ├── browser/
│       │   │   └── members-page.ts
│       │   └── fetch-demo.ts
│       ├── public/
│       │   ├── index.html
│       │   └── scripts/
│       │       └── members-page.js
│       └── tsconfig.browser.json
├── packages/
│   └── loyalty-core/
├── pnpm-workspace.yaml
└── README.md
```

## Course Assignments

### Module 1 – TypeScript Fundamentals

For Module 1, I created four TypeScript exercises based on the Shop Loyalty Tracker idea.

| Exercise                      | File                    | Concepts                                                             |
| ----------------------------- | ----------------------- | -------------------------------------------------------------------- |
| 1. Create Your Own Data Shape | `src/index.ts`          | Interfaces, primitive types, arrays, and type checking               |
| 2. Data in Several Kinds      | `src/data-kinds.ts`     | Interfaces, union types, and type narrowing                          |
| 3. A Keeper of Results        | `src/loyalty-keeper.ts` | Classes, private properties, string unions, and Record               |
| 4. A Guard at the Door        | `src/data-guard.ts`     | Unknown types, type guards, optional properties, and JSON validation |

In the first exercise, I intentionally introduced incorrect values and removed a required property to see how TypeScript detects errors. I then fixed the mistakes and checked the code again.

### Module 2 – Workspace and Project Structure

I organized the project using a pnpm workspace.

- Created a separate application and shared package.
- Used `@shop/loyalty-core` to share TypeScript code.
- Configured TypeScript and Nx for project type checking.
- Used workspace dependencies to connect the application and shared package.

### Module 3 – Async Data and CLI

I worked with asynchronous data loading and created a command-line interface.

- Loaded JSON data asynchronously.
- Used async/await and error handling.
- Used Commander to define CLI commands.
- Used Inquirer to collect user input.
- Organized the application into smaller modules.

### Module 4 – Server, Fetch, Services, and Browser

I extended the project with a small Fastify API and a browser-based member page.

#### Assignment 1 – Fastify Server

- Created a Fastify server.
- Registered a member routes plugin.
- Added three routes:
  - `GET /members` – Get all members with an API key.
  - `GET /members/:id` – Find a member by ID.
  - `POST /members` – Create a new member.
- Handled HTTP status codes such as 200, 201, 400, 401, and 404.
- Used `tsx watch` to restart the server when files change.

#### Assignment 2 – Fetch API

- Used `fetch()` to send GET and POST requests.
- Sent JSON request bodies.
- Read server responses as JSON.
- Handled HTTP errors using messages from the server.
- Handled cases where the server cannot be reached.

#### Assignment 3 – Service Functions

- Moved server requests into a separate service file.
- Created a generic request function.
- Used a generic type constraint and a default type.
- Used `Pick` to derive a type from an existing type.
- Kept the request function and server configuration private.

#### Assignment 4 – Browser DOM and Events

- Created a browser page to display shop members.
- Used `document.createElement()` to create elements.
- Used `textContent` to display text safely.
- Used one delegated click event listener for the member list.
- Updated member details when a different member is selected.
- Removed the event listener when the page is unloaded.
- Used DOM selectors and checked for missing elements.
- Avoided using `innerHTML`.

## Technologies Used

- TypeScript
- JavaScript
- Node.js
- pnpm Workspaces
- Nx
- Fastify
- Commander
- Inquirer
- Fetch API
- HTML and CSS
- Browser DOM API

## Getting Started

### 1. Install Dependencies

From the project root:

```bash
pnpm install
```

### 2. Run the Fastify Server

```bash
pnpm --filter @shop/shop-app dev:server
```

The server runs at:

```text
http://127.0.0.1:3000
```

### 3. Run the Fetch Demonstration

Keep the Fastify server running. Open another terminal and run:

```bash
pnpm --filter @shop/shop-app exec tsx src/fetch-demo.ts
```

This demonstrates GET requests, creating a member, and handling a server error.

### 4. Run the Browser Page

Compile the browser TypeScript:

```bash
pnpm --filter @shop/shop-app exec tsc -p tsconfig.browser.json
```

Start the static web server from the project root:

```bash
python3 -m http.server 8080 --directory apps/shop-app/public
```

Open the page:

```text
http://localhost:8080
```

You can select different members to view their membership details.

### 5. Check TypeScript

Run the Node project type check:

```bash
pnpm --filter @shop/shop-app typecheck
```

Run the browser TypeScript check:

```bash
pnpm --filter @shop/shop-app exec tsc -p tsconfig.browser.json
```

## Future Improvements

Some features I would like to add in the future:

- Connect the API to a database.
- Manage real customer orders and loyalty points.
- Add point redemption and rewards.
- Add member registration and authentication.
- Support multiple shops.
- Build an owner dashboard for shop management.

## Author

Personal project for the Advanced JavaScript and TypeScript course.
