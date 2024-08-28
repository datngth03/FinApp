## FinApp

### Overview

**FinApp** is a powerful financial management application designed to help users track and analyze financial data. Built with **React** for the frontend and **.NET** for the backend, this application provides comprehensive features for managing stock information, financial reports, and user-generated comments. It integrates real-time financial data through the **Financial Modeling Prep API**, offering an insightful user experience.

### Prerequisites

To run this application, ensure that you have the following installed:

-  **.NET SDK** (for backend development)
-  **Node.js** and **npm** (for frontend development)
-  **SQL Server** (for database management)

### Installation

#### Backend Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/datngth03/FinApp.git
   ```

2. **Navigate to the Backend Directory**:

   ```bash
   cd FinApp/app.server
   ```

3. **Restore Dependencies**:

   ```bash
   dotnet restore
   ```

4. **Run the Backend Application**:
   ```bash
   dotnet run
   ```

#### Frontend Setup

1. **Navigate to the Frontend Directory**:

   ```bash
   cd FinApp/app.client
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Start the Frontend Application**:

   ```bash
   npm start
   ```

4. **Environment Configuration**:
   -  Create an `.env` file in the `app.client` directory to include necessary environment variables.

### Usage

### Authentication

**FinApp** uses JWT (JSON Web Tokens) for authentication. To access protected endpoints, a valid JWT token must be included in the `Authorization` header of your requests.

-  **Login Endpoint**:

   -  **URL**: `POST /api/auth/login`
   -  **Description**: Authenticates a user and returns a JWT token.
   -  **Request Body**:
      ```json
      {
         "username": "user@example.com",
         "password": "yourpassword"
      }
      ```
   -  **Response**:
      ```json
      {
         "token": "your_jwt_token"
      }
      ```

   Include the token in the `Authorization` header for subsequent requests:

### API Endpoints

-  **Fecth Company data from Free Stock Market Api**:
   -  `https://financialmodelingprep.com/`

#### Comment API

-  **Get List Conmment**:
   -  `GET /api/comment?Symbol={symbol}`
-  **Create a New Comment**:
   -  `POST /api/comment/{symbol}`
-  **Update an Existing Comment**:
   -  `PUT /api/comment/{id}`
-  **Delete a Comment**:
   -  `DELETE /api/comment/{id}`

#### Stock API

-  **Fetch Stock by Symbol**:
-  **URL**: `GET /api/stock/{symbol}`
-  **Description**: Retrieves stock information by its symbol.
-  **URL Parameters**: `symbol` - The stock symbol.
-  **Response**: Returns detailed information about the stock.

-  **Create Stock**:
-  **URL**: `POST /api/stock`
-  **Description**: Creates a new stock entry.
-  **Request Body**: `CreateStockDto` - Details of the stock to be created.
-  **Response**: Returns the created stock information.

-  **Update Stock**:
-  **URL**: `PUT /api/stock/{id}`
-  **Description**: Updates an existing stock entry.
-  **URL Parameters**: `id` - The ID of the stock.
-  **Request Body**: `UpdateStockDto` - Updated details of the stock.
-  **Response**: Returns the updated stock information.

-  **Delete Stock**:
-  **URL**: `DELETE /api/stock/{id}`
-  **Description**: Deletes a stock entry.
-  **URL Parameters**: `id` - The ID of the stock.
-  **Response**: Returns a confirmation of deletion.

#### Portfolio API

-  **Fetch Portfolio by ID**:
-  **URL**: `GET /api/portfolio/{id}`
-  **Description**: Retrieves portfolio information by its ID.
-  **URL Parameters**: `id` - The ID of the portfolio.
-  **Response**: Returns details of the portfolio.

-  **Create Portfolio**:
-  **URL**: `POST /api/portfolio`
-  **Description**: Creates a new portfolio entry.
-  **Request Body**: `CreatePortfolioDto` - Details of the portfolio to be created.
-  **Response**: Returns the created portfolio information.

-  **Update Portfolio**:
-  **URL**: `PUT /api/portfolio/{id}`
-  **Description**: Updates an existing portfolio entry.
-  **URL Parameters**: `id` - The ID of the portfolio.
-  **Request Body**: `UpdatePortfolioDto` - Updated details of the portfolio.
-  **Response**: Returns the updated portfolio information.

-  **Delete Portfolio**:
-  **URL**: `DELETE /api/portfolio/{id}`
-  **Description**: Deletes a portfolio entry.
-  **URL Parameters**: `id` - The ID of the portfolio.
-  **Response**: Returns a confirmation of deletion.

#### User Interface

-  **Dashboard**: Provides an overview of financial data and analysis.
-  **Search**: Allows users to search and view detailed stock information.
-  **Comments**: Users can add, edit, and delete comments related to stocks.

### Project Structure

-  **`app.server/`**: Contains the backend source code (ASP.NET Core).
-  **`app.client/`**: Contains the frontend source code (React).
-  **`app.server/Models/`**: Includes data models used in the backend.
-  **`app.client/src/components/`**: Contains React components used in the frontend.

### Contributing

We welcome contributions to enhance the functionality and usability of **FinApp**. To contribute:

1. **Fork the Repository**.
2. **Create a New Branch** for your feature or bug fix.
3. **Make Your Changes** and commit them.
4. **Submit a Pull Request** detailing the modifications made.

### License

This project is licensed under the [MIT License](LICENSE). Please refer to the `LICENSE` file for more information.

### Contact

-  **Maintainer**: Thanh-Dat Nguyen
-  **Email**: [datngth03@gmail.com](mailto:datngth03@gmail.com)
