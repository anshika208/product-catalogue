# Decisions and Assumptions

## 1. Technology Choices

- **React + TypeScript + Vite:** Component-based frontend with type safety and fast development.
- **Node.js + TypeScript + Fastify:** Lightweight backend for building REST APIs.
- **Zod:** Request and environment variable validation.
- **Vitest:** Backend unit and route testing.
- **Nodemailer + Mailpit:** SMTP-based enquiry emails with local email capture.
- **Docker Compose + Nginx:** Consistent local setup and production frontend serving.

## 2. Key Assumptions

- The five featured products are selected dynamically based on product ratings.
- Products are sorted by rating, using rating count as a secondary criterion.
- Search matches product title, description and category.
- Category pages show top-rated products followed by the remaining products.
- Name, email and message are mandatory for enquiries; phone number is optional.
- The sales recipient is configurable through environment variables.

## 3. Architectural Decisions

- **Backend-mediated product access:** The frontend communicates only with our backend. It never calls Fake Store API directly.
- **Product provider abstraction:** `ProductProvider` isolates the external data source, allowing it to be replaced without changing business logic.
- **Layered backend:** Controllers handle HTTP requests, services contain business logic, repositories handle data access, and providers integrate external systems.
- **Email provider abstraction:** `EmailProvider` keeps enquiry processing independent of the email delivery implementation.
- **Centralised validation:** Zod validates incoming requests, while the backend handles invalid input and missing products.
- **Containerisation:** Docker Compose runs the frontend, backend and Mailpit together for a reproducible local setup.

## 4. Scope and Trade-offs

To keep the implementation within the time-box:

- Fake Store API is used instead of introducing a database.
- Mailpit is used instead of integrating a paid production email service.
- Authentication, admin functionality and persistent enquiry storage are not included.
- Product retrieval and enquiry workflows are prioritised over additional features.

## 5. Future Improvements

With another day, I would prioritise:

1. Add end-to-end tests for the complete customer journey.
2. Introduce persistent storage for products and enquiries.
3. Add pagination and caching for product retrieval.
4. Integrate a production email provider with retry handling.
5. Add CI/CD automation and structured application logging.