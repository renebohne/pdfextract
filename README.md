# PDF Form Field Extractor

This project provides a Node.js web service with a REST API to extract form field data from PDF files. 

It uses the `pdf-lib` library for PDF manipulation and serves the API using Express.js. 

The project also includes a frontend webpage (`index.html`) with a file upload form and displays the extracted data.

## Features

* Extracts form fields from PDF files (text fields, checkboxes, radio buttons, dropdowns, etc.)
* Provides a REST API endpoint (`/extract-form-fields`) for easy integration
* Includes a user-friendly web interface for uploading and extracting data
* Serves API documentation using Swagger UI
* Supports CORS (Cross-Origin Resource Sharing)
* Can be deployed using Nginx

## Installation

### Clone the repository

```bash
git clone [invalid URL removed]
```

### Install dependencies

```bash
cd pdf-form-field-extractor
npm install
```

## Usage

### Start the server

```bash
node server.js
```

### Access to the web interface

* Open your browser and go to http://localhost:3002/ (or your server's address).
* Upload a PDF file and click "Extract Fields".
* The extracted form field data will be displayed on the page.


## API Documentation

The API documentation is available through Swagger UI.
Access the documentation: http://localhost:3002/api-docs

## Deployment with Nginx

You can use Nginx to serve this project. Refer to the nginx.conf file for an example configuration.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 