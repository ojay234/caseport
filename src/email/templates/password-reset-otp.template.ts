export const passwordResetOtpTemplate = (username: string, otp: string) => `
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
 <div>
          <h2>Password Reset Request</h2>
          <p>Hello ${username},</p>
          <p>Your OTP for password reset is: <strong>${otp}</strong></p>
          <p>This code will expire in 15 minutes.</p>
        </div>
</body>
</html>
`;