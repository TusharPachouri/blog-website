import nodeMail from "nodemailer";
async function mainMail(name, email, subject = "BlogWebsite", contactNumber = "", message) {
  const transporter = await nodeMail.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.PASSWORD,
    },
  });
  const mailOption = {
    from: process.env.GMAIL_USER,
    to: process.env.EMAIL,
    subject: subject,
    html: `
    <p>You received a message from:</p>
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Contact Number:</strong> ${contactNumber}</li>
    </ul>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
  };
  try {
    await transporter.sendMail(mailOption);
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    return Promise.reject(error);
  }
}

export { mainMail as Contact };
