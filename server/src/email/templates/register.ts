export const registerTemplate = (username: string, otp: string) => 
`<!DOCTYPE html>
      <html>
      <head>
          <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
              .otp { font-size: 24px; font-weight: bold; color: #2c3e50; margin: 20px 0; }
              .footer { margin-top: 30px; font-size: 12px; color: #7f8c8d; }
          </style>
      </head>
      <body>
          <div class="container">
              <h2>Welcome to CasePort, ${username}!</h2>
              <p>Thank you for registering. Please use the following OTP to verify your email address:</p>
              <div class="otp">${otp}</div>
              <p>This OTP will expire in 15 minutes.</p>
              <div class="footer">
                  <p>If you didn't request this, please ignore this email.</p>
              </div>
          </div>
      </body>
      </html>
`;