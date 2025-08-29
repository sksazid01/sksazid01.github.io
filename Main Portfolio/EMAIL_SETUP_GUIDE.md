# Email Setup Guide for Portfolio Contact Form

## 🚀 Quick Setup: EmailJS (Recommended)

EmailJS allows you to send emails directly from your frontend without a backend server.

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up with your Gmail account
3. Verify your email

### Step 2: Add Gmail Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail"
4. Connect your Gmail account (sksazid01@gmail.com)
5. Note the **Service ID** (something like `service_xxxxxxx`)

### Step 3: Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
Sent from your portfolio contact form
```

4. Note the **Template ID** (something like `template_xxxxxxx`)

### Step 4: Get Public Key
1. Go to "Account" > "General"
2. Copy your **Public Key** (something like `YOUR_PUBLIC_KEY`)

### Step 5: Update Your Code
Replace these values in `/src/components/DynamicContactForm.tsx`:

```typescript
emailjs.init('YOUR_PUBLIC_KEY') // Line 21
// Replace with: emailjs.init('user_your_actual_public_key')

'YOUR_SERVICE_ID', // Line 28
// Replace with: 'service_your_actual_service_id'

'YOUR_TEMPLATE_ID', // Line 29
// Replace with: 'template_your_actual_template_id'
```

### Step 6: Test
1. Build and run your portfolio
2. Fill out the contact form
3. Check your Gmail inbox (sksazid01@gmail.com)

---

## 🔧 Alternative: Nodemailer Backend (Advanced)

If you prefer a custom backend solution:

### Create API Route
Create `/pages/api/send-email.js`:

```javascript
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Create transporter
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: 'sksazid01@gmail.com',
      pass: 'your_app_password' // Generate App Password in Google Account settings
    }
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'sksazid01@gmail.com',
      subject: `Portfolio Contact: ${name}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
```

### Generate Gmail App Password
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate App Password for "Mail"
4. Use this password in the code above

---

## 📧 Current Fallback: Formspree

Your form already has Formspree as backup:
- Forms go to: https://formspree.io/f/xjkwpwgr
- Check if this forwards to your desired email

---

## 🎯 Recommended Setup Order

1. **Start with EmailJS** (easiest, no backend needed)
2. **Keep Formspree as fallback** (already configured)
3. **Consider Nodemailer** only if you need more control

## 📝 Email Template Example

When someone submits the form, you'll receive:

```
Subject: New Contact Form Message from John Doe

From: John Doe (john@example.com)

Message:
Hi! I'm interested in collaborating on a project. 
Would love to discuss opportunities.

---
Sent from your portfolio contact form
```

## 🚨 Important Notes

- **EmailJS Free Plan**: 200 emails/month
- **Gmail Limits**: 500 emails/day
- **Security**: Never expose Gmail password in frontend
- **Testing**: Always test before deploying

---

Choose EmailJS for quick setup, or Nodemailer for full control!
