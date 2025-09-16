export const signinConfirmationTemplate = (username: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { color: #333; }
        .content { margin: 20px 0; }
        .footer { margin-top: 20px; font-size: 0.8em; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="header">Sign-In Confirmation</h1>
        <div class="content">
            <p>Hello ${username},</p>
            <p>You've successfully signed in to your Case Port account.</p>
            <p>If this wasn't you, please secure your account immediately.</p>
        </div>
        <div class="footer">
            <p>Best regards,<br>Your Application Team</p>
        </div>
    </div>
</body>
</html>
`;