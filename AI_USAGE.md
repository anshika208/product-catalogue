# AI Usage Notes

## 1. Tool Used

- **ChatGPT:** Used for architecture planning, implementation guidance, code review, understanding design decisions and debugging.

## 2. How AI Was Used

- Shared the assignment requirements and asked for an architecture that keeps product data fetching behind the backend rather than calling the external API directly from the frontend.
- Asked for a scalable project structure with clear separation of responsibilities and appropriate design patterns.
- Built the application incrementally in phases instead of generating the entire application at once.
- Reviewed the generated code and asked for explanations of why particular approaches, patterns and technologies were being used.
- Used AI assistance to investigate and debug issues encountered while configuring SMTP email functionality with Docker.

## 3. Key AI Interactions

1. Designing the application architecture around frontend, backend and external service boundaries.
2. Establishing provider abstractions and separation of concerns to support future changes.
3. Implementing the application phase by phase, reviewing code and understanding design decisions.
4. Debugging SMTP configuration and Docker-related issues during local setup.

## 4. Review and Validation

AI-generated code and suggestions were reviewed rather than accepted blindly.

The implementation was validated through:
- Reviewing the code and understanding the purpose of its components.
- Running backend builds and tests.
- Building and running the Docker containers.
- Testing frontend-backend communication and the enquiry email workflow.

## 5. Time Spent

**Total: Approximately 3.5 hours.**

The additional time beyond the initial estimate was primarily spent troubleshooting Docker setup and SMTP configuration issues.