export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
    return `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
        <h2 style="color:#2c3e50;">FYP SYSTEM - 🔒Password Reset Request</h2>
        
        <p>Hello,</p>
        
        <p>We received a request to reset your password. Click the button below to set a new password:</p>
        
        <a href="${resetPasswordUrl}" 
           style="display:inline-block; padding:10px 20px; margin:15px 0; 
           background-color:#3498db; color:#fff; text-decoration:none; border-radius:5px;">
           Reset Password
        </a>
        
        <p>If the button above doesn’t work, copy and paste the following link into your browser:</p>
        <p style="word-break: break-all;">${resetPasswordUrl}</p>
        
        <p>This link will expire shortly for security reasons.</p>
        
        <p>If you did not request a password reset, please ignore this email.</p>
        
        <br/>
        <p>Best regards,<br/>Your Team</p>
    </div>
    `;
}

/**
 * Request Accepted Email
 */
export function generateRequestAcceptedTemplate(supervisorName) {
    return `
      <div style="font-family: Arial; padding:20px; background:#fff; border:1px solid #ddd; border-radius:8px;">
        <h2 style="color:#10b981;">✅ Supervisor Request Accepted</h2>
        <p>Your supervisor request has been accepted by <strong>${supervisorName}</strong>.</p>
        <p>You can now start working on your project and upload files.</p>
      </div>
    `;
  }
  
  /**
   * Request Rejected Email
   */
  export function generateRequestRejectedTemplate(supervisorName) {
    return `
      <div style="font-family: Arial; padding:20px; background:#fff; border:1px solid #ddd; border-radius:8px;">
        <h2 style="color:#ef4444;">❌ Supervisor Request Rejected</h2>
        <p>Your supervisor request has been rejected by <strong>${supervisorName}</strong>.</p>
        <p>You can try requesting another supervisor.</p>
      </div>
    `;
  }