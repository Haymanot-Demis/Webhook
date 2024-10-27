# Webhook Handler Service

This project implements a webhook endpoint for securely receiving and processing transaction notifications from a YaYa Wallet. Built with TypeScript, Express.js, TypeORM, PostgreSQL, and the project includes Docker for containerization and Jest for testing.

### Prerequisites

- **Node.js** (v20+) and
- **PostgreSQL** (for data storage).
  OR
- **Docker** (for containerization)

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Haymanot-Demis/Webhook.git
   cd Webhook

   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set up Environment Variables**:

   Create a .env file in the root directory:

   ```
   PORT=3000
   DATABASE_HOST=localhost
   DATABASE_PORT=5432
   DATABASE_USERNAME=yourusername
   DATABASE_PASSWORD=yourpassword
   DATABASE_NAME=yourdbname
   YAYA_SECRET_KEY=secrete-key
   TOLERANCE=300000 # 5 minutes
   ```

4. **Run Database Migrations**:

   This project uses TypeORM migrations to manage database schema changes. Run the following command to create tables in the PostgreSQL database:

   ```bash
   npm run migration:generate
   npm run migration:run
   ```

5. **Start the Application**:

   ```bash
   npm start
   The service should now be running on http://localhost:3000.

   ```

6. **Usage**:

   - Webhook Endpoint: The webhook endpoint is exposed at /webhook.
   - Payload Validation: Incoming webhook data is validated using Joi.
   - Digital signature validation.a
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

7. **Signature Verification**:
   Each incoming request should have a signature in the headers to ensure authenticity:

   ```
   Header Key: yaya-signature
   Value: HMAC SHA256 signature generated of the payload with the SECRET_KEY.

   ```

8. **Testing**:
   This project includes Jest for API testing. Run Tests:

   ```bash
   npm test

   ```

9. **Project Structure**:
   ```bash
   Copy code
   ├── src
   │   ├── config             # Configuration files (e.g., environment variables)
   │   ├── controllers        # Webhook controller logic
   │   ├── middleware         # Middleware for authentication, validation, etc.
   │   ├── repository         # Database logic using TypeORM repositories
   │   ├── routes             # Route definitions
   │   ├── utils              # Utility functions (e.g., signature generation)
   │   └── tests              # Jest test cases for the API
   ├── .env                   # Environment variables
   ├── jest.config.js         # Jest configuration
   ├── Dockerfile             # Docker configuration
   └── README.md
   ```
