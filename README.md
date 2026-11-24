# Product Catalogue

A product catalogue MVP built with React, TypeScript and Node.js. Users can browse products, explore categories, search the catalogue, view product details and submit product enquiries.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite |
| Backend | Node.js, TypeScript, Fastify |
| Validation | Zod |
| API communication | Axios |
| Product data source | Fake Store API |
| Email | Nodemailer |
| Local email testing | Mailpit |
| Containerization | Docker, Docker Compose |
| Frontend web server | Nginx |

## Architecture

The application follows a client-server architecture.

- **Frontend:** React application responsible for the user interface and user interactions.
- **Backend:** Fastify REST API responsible for product retrieval, filtering, validation and enquiry processing.
- **Product provider:** An abstraction around the Fake Store API, keeping the external data source isolated from business logic.
- **Email provider:** An abstraction for sending enquiry emails, currently implemented using SMTP and Nodemailer.
- **Mailpit:** Captures outgoing emails locally for development and testing.

The frontend never communicates directly with the Fake Store API. All product requests are routed through the backend.

## Features

- Home page displaying five featured products.
- Category pages displaying top-rated and additional products.
- Search products by matching text.
- Product details page.
- Product enquiry form with input validation.
- Enquiry confirmation displayed after successful submission.
- Email notification sent to the configured sales inbox.
- Backend API validation and error handling.

## Prerequisites

- Docker Desktop installed and running.
- Docker Compose available (included with Docker Desktop).

No external API keys, paid services or email accounts are required to run the application locally.

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd product-catalogue
```

### 2. Start the application

Run the following command from the project root, where `docker-compose.yml` is located:

```bash
docker compose up --build
```

Docker Compose builds and starts the frontend, backend and Mailpit services.

### 3. Access the application

Once the containers are running, access:

| Service | URL |
|---|---|
| Frontend | http://localhost:8080 |
| Backend health check | http://localhost:3000/api/health |
| Mailpit email inbox | http://localhost:8025 |

### 4. Test the enquiry flow

1. Open the frontend.
2. Navigate to any product.
3. Complete and submit the enquiry form.
4. Verify that the thank-you confirmation is displayed.
5. Open the Mailpit inbox at http://localhost:8025.
6. Verify that the enquiry email has been captured.

Mailpit is used as a local SMTP testing service. Emails are captured in its web interface rather than delivered to an actual external sales inbox.

## Useful Docker Commands

Start services in the background:

```bash
docker compose up --build -d
```

Check running services:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs -f
```

View backend logs:

```bash
docker compose logs -f server
```

Stop and remove containers:

```bash
docker compose down
```

## Running Tests

Backend tests are written using Vitest.

To run them locally:

```bash
cd server
npm install
npm test
```

To build the backend:

```bash
npm run build
```

## Configuration

The Docker Compose configuration supplies the required environment variables for the local setup.

Important backend configuration:

| Variable | Purpose |
|---|---|
| `PORT` | Backend server port |
| `NODE_ENV` | Application environment |
| `CLIENT_URL` | Allowed frontend origin for CORS |
| `SALES_EMAIL` | Recipient address for enquiry notifications |
| `SMTP_HOST` | SMTP server hostname |
| `SMTP_PORT` | SMTP server port |
| `USE_CONSOLE_EMAIL` | Enables the console email provider when configured |

For local Docker execution, the backend connects to Mailpit using the Compose service hostname `mailpit` and SMTP port `1025`.

No secrets are required for the default local setup.

## Project Structure

```text
product-catalogue/
├── client/
│   ├── src/
│   ├── Dockerfile
│   └── nginx.conf
│
├── server/
│   ├── src/
│   │   ├── modules/
│   │   │   ├── products/
│   │   │   └── enquiries/
│   │   ├── app.ts
│   │   └── index.ts
│   ├── tests/
│   └── Dockerfile
│
├── docker-compose.yml
├── README.md
├── DECISIONS.md
└── AI_USAGE.md
```

## Future Improvements

- Replace the Fake Store API with a dedicated product data source.
- Introduce persistent storage for products and customer enquiries.
- Integrate a production email provider.
- Add authentication and administrative product management.
- Add broader integration and end-to-end test coverage.