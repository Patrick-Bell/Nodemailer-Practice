const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/contact.html');
});

app.get('/success', (req, res) => {
    res.sendFile(__dirname + '/public/success.html');
});


app.post('/send', upload.array('attachments'), async function (req, res) {
    try {
        // Validate form inputs (add your validation logic here)

        const data = req.body;
        const attachments = req.files; // use req.files for multiple files

        // ... (CAPTCHA verification and other existing code)

        // Create a nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        // Prepare email content
        const emailContent = `<p>${data.message}</p><p>Phone Number: ${data.phone}</p>`;

        // Prepare attachments array
        const attachmentsArray = [];

        if (attachments) {
            // Loop through each attachment
            for (const attachment of attachments) {
                const attachmentContent = (await fs.readFile(path.join(__dirname, 'uploads', attachment.filename))).toString('base64');
                attachmentsArray.push({
                    filename: attachment.originalname,
                    content: attachmentContent,
                    encoding: 'base64',
                    contentType: attachment.mimetype,
                });
            }
        }

        // Mail options
        const mailOptions = {
            from: data.email,
            to: process.env.USER,
            subject: data.subject,
            html: emailContent,
            replyTo: data.email,
            attachments: attachmentsArray, // Add the array of attachments
        };

        // Send the email
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).send('Error sending email');
            } else {
                res.redirect('/success');
                console.log('Email sent successfully', info.response);
            }
        });
    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).send('Internal server error');
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
