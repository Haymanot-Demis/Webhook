# Webhook Handler Service

This project implements a webhook endpoint for securely receiving and processing transaction notifications from a YaYa Wallet. Built with TypeScript, Express.js, TypeORM, PostgreSQL, and the project includes Docker for containerization and Jest for testing.

### Prerequisites

- **Node.js** (v20+) and
- **PostgreSQL** (for data storage).
  OR
- **Docker** (for containerization)

### **Project Structure**:

    ├── src
    │   ├── config             # Configuration files (e.g., environment variables)
    │   ├── controllers        # Webhook controller logic
    │   ├── middleware         # Middleware for authentication, validation, etc.
    │   ├── repository         # Database logic using TypeORM repositories
    │   ├── routes             # Route definitions
    │   ├── utils              # Utility functions (e.g., signature generation)
    │   └── tests              # Jest test cases for the API
    ├── .env                   # Environment variables
    ├── tsconfig.json
    ├── package.json
    ├── jest.config.js         # Jest configuration
    ├── Dockerfile             # Docker configuration
    └── README.md
    ```

### Usage

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Haymanot-Demis/Webhook.git
   cd Webhook

   ```

## To Run Locally

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Set up Environment Variables**:

   Create a .env file in the root directory with the following values for testing:

   ```
    APP_PORT=3000
    DB_HOST="postgres"
    DB_PORT=5432
    DB_USERNAME="postgres"
    DB_PASSWORD="12345678"
    DB_NAME="postgres"
    YAYA_SECRET_KEY="l1z/JEzMST6Vcy6o2nTjmAaG361XZfY8nGsixBCsBao='"
    TOLERANCE=300000 # 5 minutes
   ```

3. **Run Database Migrations**:

   This project uses TypeORM migrations to manage database schema changes. Run the following command to create tables in the PostgreSQL database:

   ```bash
   npm run migration:generate
   npm run migration:run
   ```

4. **Start the Application**:

   ```bash
   npm start
   The service should now be running on http://localhost:3000.

   ```

5. **Testing**:
   This project includes Jest for API testing. Run Tests:

   ```bash
   npm test

   ```

**Features**:

    - Webhook Endpoint: The webhook endpoint is exposed at /webhook.
    - Payload Validation: Incoming webhook data is validated using Joi.
    - Digital signature validation.
    - Replay attack/old payload validation.
    - Data Storage: Validated webhook data is stored in PostgreSQL using TypeORM.

Example Request
Here is an example JSON payload that the /webhook route expects:

```
{
   "id": "1dd2854e-3a79-4548-ae36-97e4a18ebf81",
   "amount": 100,
   "currency": "ETB",
   "created_at_time": 1673381836,
   "timestamp": 1701272333, # update this timestamp to be valid
   "cause": "Testing",
   "full_name": "Abebe Kebede",
   "account_name": "abebekebede1",
   "invoice_url": "https://yayawallet.com/en/invoice/xxxx"
 }
```

**Signature Verification**:
Each incoming request should have a signature in the headers to ensure authenticity:

```
Header Key: yaya-signature
Value: HMAC SHA256 signature generated of the payload with the SECRET_KEY.
```

### Steps to run with docker

```bash
dokcer compose up --build
```

The server will run on port 3000

# Use the postman collection

[View Postman Collection](https://documenter.getpostman.com/view/20006567/2sAY4uCP9x)
