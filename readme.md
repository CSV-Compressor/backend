# CSV to ZIP Converter Backend

This Node.js backend application provides an API endpoint to convert CSV files into ZIP archives. The application uses Express.js for handling requests and Multer for file uploads. The compressed ZIP files are created using the `archiver` library.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoint](#api-endpoint)
- [Configuration](#configuration)
- [Description](#description)

## Features

- Upload a CSV file via a POST request.
- Convert the CSV file into a ZIP archive.
- Download the compressed ZIP file directly.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/CSV-Compressor/backend.git
    ```

2. **Navigate to the project directory:**

    ```bash
    cd backend
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Create a `.env` file** in the root directory with the following variables:

    ```env
    APP_PORT={API_PORT}
    FRONT_URL=http://localhost:{FRONT_APP_PORT}
    ```

    - `APP_PORT`: Port on which the application will run.
    - `FRONT_URL`: URL and port of the frontend application, e.g., `http://localhost:{FRONT_APP_PORT}`. This is required for CORS configuration.

## Usage

1. **Start the server:**

    ```bash
    npm start
    ```

    The server will start on the port specified in your `.env` file (default: 8000).

2. **Send a POST request to the endpoint** using a tool like Postman or cURL:

    - **URL:** `http://localhost:{API_PORT}/api/v1/csv/compress`
    - **Method:** POST
    - **Body:** Form-data with the file field set to the CSV file you want to compress.

    Example using `cURL`:

    ```bash
    curl -X POST http://localhost:{API_URL}/api/v1/csv/compress \
         -F "file=@path/to/your/file.csv"
    ```

## API Endpoint

### `POST /api/v1/csv/compress`

- **Description:** Compresses a CSV file into a ZIP archive.
- **Request:**
  - **Content-Type:** `multipart/form-data`
  - **Form-data:**
    - **file**: The CSV file to be compressed.
- **Response:**
  - **Content-Type:** `application/zip`
  - **Content-Disposition:** Attachment with the ZIP file name.
  - **Body:** The ZIP file.

## Configuration

- **APP_PORT:** Port on which the server will listen (default: 8000).
- **FRONT_URL:** URL of the frontend application for CORS configuration, e.g., `http://localhost:{FRONT_APP_PORT}`.

## Description

- **`README.md`**: Contains information about the project, including installation instructions, usage, and other relevant details.

- **`index.js`**: The main entry point of the application where the server is started and configured.

- **`package.json`**: Lists the project dependencies, scripts, and other metadata.

- **`package-lock.json`**: Automatically generated file that locks the versions of dependencies.

- **`src/`**: Contains the source code for the backend application.
  - **`configs/`**: Directory for configuration files such as environment settings and application-specific configurations.
  - **`controllers/`**: Contains controller files that handle the business logic for various routes.
  - **`routes/`**: Defines the API routes and maps them to corresponding controller methods.
  - **`services/`**: Holds service files that encapsulate business logic and interactions with data.
  - **`uploads/`**: Directory for storing uploaded files, such as CSV files sent from the frontend.

This structure helps in organizing the code and separating different concerns of the application, making it easier to maintain and scale.

