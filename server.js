const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');

const app = express();
const upload = multer();

const port = 3002;

// Enable CORS for all origins (or specify your origin)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/extract-form-fields', upload.single('pdfFile'), async (req, res) => {
  try {
    const pdfBytes = req.file.buffer;
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();
    const fields = form.getFields();
    const fieldData = [];

    fields.forEach((field) => {
      const fieldName = field.getName();
      let fieldValue;
      let fieldType;

      switch (field.constructor.name) {
        case 'PDFTextField':
          fieldValue = field.getText();
          fieldType = 'text';
          break;
        case 'PDFCheckBox':
          fieldValue = field.isChecked();
          fieldType = 'checkbox';
          break;
        case 'PDFRadioGroup':
          fieldValue = field.getSelected();
          fieldType = 'radio';
          break;
        case 'PDFDropdown':
          fieldValue = field.getSelected();
          fieldType = 'dropdown';
          break;
        case 'PDFListBox':
          fieldValue = field.getSelected();
          fieldType = 'listbox';
          break;
        case 'PDFComboBox':
          fieldValue = field.getText();
          fieldType = 'combobox';
          break;
        case 'PDFSignature':
          fieldValue = null;  // Or handle signature extraction differently
          fieldType = 'signature';
          break;
        case 'PDFButton':
          fieldValue = null;
          fieldType = 'button';
          break;
        default:
          fieldValue = null;
          fieldType = 'unknown';
          break;
      }

      fieldData.push({
        name: fieldName,
        value: fieldValue,
        type: fieldType
      });
    });

    const response = {
      filename: req.file.originalname,
      creationDate: pdfDoc.getCreationDate(),
      fields: fieldData
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Error extracting form fields: ${error.message}`);
  }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the root path to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Load the OpenAPI definition
const swaggerDocument = YAML.load(fs.readFileSync('./public/openapi.yaml', 'utf8'));

// Serve Swagger UI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});