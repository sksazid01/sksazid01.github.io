import emailjs from '@emailjs/browser'

export interface EmailData {
  name: string
  email: string
  message: string
  title?: string
}

export interface EmailResponse {
  success: boolean
  message: string
  data?: unknown
}

class EmailService {
  private static instance: EmailService
  private isInitialized = false

  // EmailJS Configuration — values come from .env.local (never hardcoded)
  private readonly SERVICE_ID          = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID           ?? ''
  /** Template that sends form data TO YOU */
  private readonly TEMPLATE_ID         = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID          ?? ''
  /** Template that sends an auto-reply confirmation TO THE USER */
  private readonly AUTOREPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID ?? ''
  private readonly PUBLIC_KEY           = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY           ?? ''

  private constructor() {}

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService()
    }
    return EmailService.instance
  }

  /**
   * Initialize EmailJS with public key
   */
  initialize(): void {
    if (!this.isInitialized) {
      emailjs.init(this.PUBLIC_KEY)
      this.isInitialized = true
    }
  }

  /**
   * Send email using EmailJS
   */
  async sendEmail(emailData: EmailData): Promise<EmailResponse> {
    try {
      // Ensure EmailJS is initialized
      this.initialize()

      // Prepare template parameters
      const templateParams = {
        title: emailData.title || 'Portfolio Contact Form',
        name: emailData.name,
        time: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        message: emailData.message,
        email: emailData.email
      }

      // Send email via EmailJS
      const result = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams,
        this.PUBLIC_KEY
      )

      // Send auto-reply confirmation to the user
      const autoReplyParams = {
        name: emailData.name,
        email: emailData.email,
        message: emailData.message,
        time: templateParams.time
      }

      try {
        const autoReplyResult = await emailjs.send(
          this.SERVICE_ID,
          this.AUTOREPLY_TEMPLATE_ID,
          autoReplyParams,
          this.PUBLIC_KEY
        )
        void autoReplyResult
      } catch (autoReplyError) {
        // Non-critical: auto-reply failed but notification was still sent
        void autoReplyError
      }

      return {
        success: true,
        message: 'Email sent successfully!',
        data: result
      }

    } catch (error) {
      // EmailJS throws a plain object {status, text}, not an Error instance
      let errorMessage = 'Unknown error occurred'
      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'object' && error !== null && 'text' in error) {
        const ejsError = error as { status: number; text: string }
        errorMessage = `EmailJS error ${ejsError.status}: ${ejsError.text}`
      }

      return {
        success: false,
        message: errorMessage,
        data: error
      }
    }
  }

  /**
   * Send test email
   */
  async sendTestEmail(): Promise<EmailResponse> {
    const testData: EmailData = {
      name: 'Test User',
      email: '1.sksazid@gmail.com',
      message: 'This is a test message to verify EmailJS setup',
      title: 'Portfolio Contact Test'
    }

    return this.sendEmail(testData)
  }

  /**
   * Validate email data before sending
   */
  validateEmailData(emailData: EmailData): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    if (!emailData.name || emailData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long')
    }

    if (!emailData.email || !this.isValidEmail(emailData.email)) {
      errors.push('Please provide a valid email address')
    }

    if (!emailData.message || emailData.message.trim().length < 10) {
      errors.push('Message must be at least 10 characters long')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  /**
   * Simple email validation
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Get service configuration (for debugging)
   */
  getConfig() {
    return {
      serviceId: this.SERVICE_ID,
      templateId: this.TEMPLATE_ID,
      publicKey: this.PUBLIC_KEY,
      isInitialized: this.isInitialized
    }
  }
}

export default EmailService
