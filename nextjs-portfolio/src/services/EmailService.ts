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
  data?: any
}

class EmailService {
  private static instance: EmailService
  private isInitialized = false

  // EmailJS Configuration
  private readonly SERVICE_ID = 'service_65kgqhp'
  private readonly TEMPLATE_ID = 'template_7ki2kwt'
  private readonly PUBLIC_KEY = 'kRx4IwOm1auh5jZWn'

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
      console.log('📧 EmailJS initialized successfully')
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

      console.log('📧 Sending email with params:', templateParams)

      // Send email via EmailJS
      const result = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams,
        this.PUBLIC_KEY
      )

      console.log('✅ Email sent successfully:', result)

      return {
        success: true,
        message: 'Email sent successfully!',
        data: result
      }

    } catch (error) {
      console.error('❌ Email sending failed:', error)
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
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
      email: 'test@example.com',
      message: 'This is a test message to verify EmailJS setup',
      title: 'Portfolio Contact Test'
    }

    console.log('🧪 Sending test email...')
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
