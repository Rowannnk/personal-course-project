# Shop Loyalty Tracker

A small shop membership management application built with TypeScript for my **Advanced JavaScript and TypeScript** course.

The project uses a pnpm monorepo with a shared TypeScript package, a command-line interface (CLI), a Fastify API, and a browser dashboard.

## About

Small cafés and mini marts often need a simple way to keep track of their regular customers. This project explores how a shop could manage its members and membership levels using TypeScript.

The current application focuses on one shop. It allows the shop to:

- Add new members.
- Assign members to bronze, silver, or gold tiers.
- View all members.
- Find a member by ID.
- Count members by membership tier.
- Store member data between application restarts.
- View member information through a browser dashboard.

The project started as a loyalty tracker idea. The current implementation focuses on member management first. Calculating points from customer orders and redeeming rewards are planned improvements.

## Main Data

| Data            | What it holds                              |
| --------------- | ------------------------------------------ |
| Member          | Member ID, name, and membership tier       |
| Membership tier | Bronze, silver, or gold                    |
| Member storage  | JSON data saved locally by the application |

## Project Structure

This project uses pnpm workspaces to organize the application and shared package.

```text
personal-course-project/
├── apps/
│   └── shop-app/
│       ├── src/
│       │   ├── browser/
│       │   │   └── members-page.ts
│       │   ├── commands.ts
│       │   ├── data/
│       │   │   ├── members-store.ts
│       │   │   └── members.json
│       │   ├── server/
│       │   │   ├── index.ts
│       │   │   └── plugins/
│       │   │       └── members.ts
│       │   ├── services/
│       │   │   └── members.ts
│       │   └── index.ts
│       ├── public/
│       │   └── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── tsconfig.browser.json
├── packages/
│   └── loyalty-core/
│       ├── src/
│       │   ├── loyalty/
│       │   │   ├── index.ts
│       │   │   ├── tracker.ts
│       │   │   ├── types.ts
│       │   │   └── validation.ts
│       │   └── index.ts
│       └── package.json
├── src/
│   ├── index.ts
│   ├── data-kinds.ts
│   ├── loyalty-keeper.ts
│   └── data-guard.ts
├── .github/
│   └── workflows/
│       └── ci.yml
├── eslint.config.js
├── nx.json
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── tsconfig.json
└── README.md
```

### Workspace packages

- **`apps/shop-app`** – The main application. It contains the CLI, API server, browser dashboard, services, and data storage.
- **`packages/loyalty-core`** – A shared TypeScript package containing the loyalty tracker, member types, and validation functions.
- **`src`** – TypeScript exercises from the earlier course modules.

The application uses services to communicate with the API instead of making API requests directly from the CLI and browser page.

## Main Features

### 1. Command-Line Interface

The CLI uses Commander to provide commands for managing members.

Examples:

```bash
# Display all members
pnpm --filter @shop/shop-app cli -- list

# Add one member
pnpm --filter @shop/shop-app cli -- add "Emma" silver

# Add several members
pnpm --filter @shop/shop-app cli -- add "Guest" gold --quantity 3

# Count members in a specific tier
pnpm --filter @shop/shop-app cli -- count gold

# Select a tier interactively
pnpm --filter @shop/shop-app cli -- count
```

Inquirer is used when the user needs to select a membership tier interactively.

The CLI communicates with the API through the service functions. The API server must be running before using these commands.

### 2. Fastify API

The application uses Fastify to provide endpoints for member management.

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| GET    | `/members`     | Get all members      |
| GET    | `/members/:id` | Get one member by ID |
| POST   | `/members`     | Create a new member  |

The API validates incoming member data before saving it.

For example, a new member must have a name and a valid membership tier. Invalid data receives a `400 Bad Request` response.

The API also handles cases such as missing members and server errors.

### 3. Browser Dashboard

The browser dashboard displays member information retrieved from the API.

It includes:

- Total member count.
- Membership tier information.
- A list of members.
- Member details when selecting a member.
- A status indicator for the application.

The browser uses the Fetch API through the service layer to retrieve member data.

### 4. Data Storage

Member data is stored in `apps/shop-app/src/data/members.json`.

The application reads and writes the JSON file asynchronously using Node.js file system functions.

External JSON data is validated before the application uses it. Errors such as invalid JSON or unavailable storage are handled with clear error messages.

This provides basic persistence without requiring a database.

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
- Configured TypeScript for the workspace packages.
- Used Nx to run project checks.
- Organized code into smaller modules.

### Module 3 – Async Data and CLI

I worked with asynchronous data loading and created a command-line interface.

- Loaded and saved JSON data asynchronously.
- Used async/await and error handling.
- Used Commander to define CLI commands and options.
- Used Inquirer to collect user input.
- Used TypeScript types and validation when working with data.
- Separated application logic into different modules.

### Module 4 – Server, Fetch, Services, and Browser

I extended the project with a Fastify API and a browser-based member dashboard.

#### Assignment 1 – Fastify Server

- Created a Fastify server.
- Registered a member routes plugin.
- Added GET and POST routes.
- Used typed request and response structures where appropriate.
- Handled HTTP status codes such as 200, 201, 400, 404, and 500.
- Used `tsx watch` during development.

#### Assignment 2 – Fetch API

- Used `fetch()` to send GET and POST requests.
- Sent JSON request bodies.
- Read server responses as JSON.
- Handled HTTP errors using messages from the server.
- Handled cases where the server cannot be reached.

#### Assignment 3 – Service Functions

- Moved server requests into a separate service file.
- Created a reusable request function.
- Used generic types and type constraints.
- Used `Pick` to derive a type from an existing type.
- Validated external data before returning it to the application.

#### Assignment 4 – Browser DOM and Events

- Created a browser page to display shop members.
- Used DOM selectors to find page elements.
- Used `textContent` to display text safely.
- Used event delegation for the member list.
- Updated member details when a different member is selected.
- Removed the event listener when the page is unloaded.
- Checked for missing DOM elements.
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
- ESLint
- Prettier

## Getting Started

### 1. Requirements

Make sure you have Node.js and pnpm installed.

### 2. Install Dependencies

Clone the repository and enter the project directory:

```bash
git clone https://github.com/Rowannnk/personal-course-project.git
cd personal-course-project
```

Install dependencies:

```bash
pnpm install
```

### 3. Start the Application

Run:

```bash
pnpm --filter @shop/shop-app start
```

This builds the browser TypeScript files and starts the Fastify server.

Open the dashboard:

```text
http://127.0.0.1:3000
```

The API is available at the same address.

### 4. Use the CLI

Keep the API server running and open another terminal in the project directory.

For example:

```bash
pnpm --filter @shop/shop-app cli -- list
```

Add a member:

```bash
pnpm --filter @shop/shop-app cli -- add "Emma" silver
```

Count gold members:

```bash
pnpm --filter @shop/shop-app cli -- count gold
```

### 5. Run the Development Server

For development, use:

```bash
pnpm --filter @shop/shop-app dev:server
```

This rebuilds the browser TypeScript files and runs the server with automatic restart support.

### 6. Run Quality Checks

Run all project checks:

```bash
pnpm check
```

Or run individual checks:

```bash
# ESLint
pnpm lint

# Prettier
pnpm format:check

# TypeScript checks for workspace packages
pnpm typecheck

# Browser TypeScript check
pnpm typecheck:browser
```

## Current Limitations

The current version focuses on member management.

- Member data is stored in a local JSON file instead of a database.
- The application supports one shop.
- There is no user authentication or role management.
- Membership tiers are assigned directly; they are not calculated from purchase history.
- Order tracking, loyalty point calculations, and reward redemption are not implemented yet.

## Future Improvements

Some features I would like to add in the future:

- Connect the API to a database.
- Manage customer orders and calculate loyalty points.
- Add point redemption and rewards.
- Add member registration and authentication.
- Support multiple shops.
- Build an owner dashboard with more shop statistics.

## Author (မင်းခန့်ကျော်)

Min Khant Kyaw's Personal project for the Advanced JavaScript and TypeScript course.
