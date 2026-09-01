function json(body, status = 200) {
  return {
    status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const attempts = globalThis.__crystalEnquiryAttempts || (globalThis.__crystalEnquiryAttempts = new Map())
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60 * 60 * 1000

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {})
  } catch {
    return res.status(400).json({ error: 'Invalid request.' })
  }

  const forwardedFor = req.headers['x-forwarded-for']
  const ip = String(forwardedFor || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()
  const now = Date.now()
  const record = attempts.get(ip)
  if (!record || record.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
  } else if (record.count >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Too many submissions. Please try again later.' })
  } else {
    record.count += 1
  }

  const enquiry = {
    name: String(body.name || '').trim().slice(0, 200),
    email: String(body.email || '').trim().slice(0, 200),
    phone: String(body.phone || '').trim().slice(0, 50),
    company: String(body.company || '').trim().slice(0, 200),
    service: String(body.service || '').trim().slice(0, 120),
    message: String(body.message || '').trim().slice(0, 5000),
    source: String(body.source || 'website').trim().slice(0, 120),
  }

  if (!enquiry.name || !enquiry.email || !enquiry.phone || !enquiry.message) {
    return res.status(400).json({ error: 'Please complete all required fields.' })
  }

  if (!/^\S+@\S+\.\S+$/.test(enquiry.email)) {
    return res.status(400).json({ error: 'Please enter a valid email address.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured')
    return res.status(503).json({ error: 'Email service is not configured.' })
  }

  const recipient = process.env.MARKETING_EMAIL || 'marketing@crystalgroup.in'
  const from = process.env.RESEND_FROM || 'Crystal Group Website <website@crystalgroup.in>'
  const subject = `New website enquiry${enquiry.service ? ` — ${enquiry.service}` : ''}`
  const html = `
    <h2>New website enquiry</h2>
    <table cellpadding="6" cellspacing="0" border="0">
      <tr><td><strong>Name</strong></td><td>${escapeHtml(enquiry.name)}</td></tr>
      <tr><td><strong>Email</strong></td><td>${escapeHtml(enquiry.email)}</td></tr>
      <tr><td><strong>Phone</strong></td><td>${escapeHtml(enquiry.phone)}</td></tr>
      <tr><td><strong>Company</strong></td><td>${escapeHtml(enquiry.company)}</td></tr>
      <tr><td><strong>Service</strong></td><td>${escapeHtml(enquiry.service)}</td></tr>
      <tr><td><strong>Source</strong></td><td>${escapeHtml(enquiry.source)}</td></tr>
    </table>
    <h3>Message</h3>
    <p>${escapeHtml(enquiry.message).replace(/\n/g, '<br>')}</p>
  `

  let resendResponse
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: enquiry.email,
        subject,
        html,
      }),
    })
    resendResponse = await response.json().catch(() => ({}))
    if (!response.ok) {
      console.error('Resend email failed', response.status, resendResponse)
      return res.status(502).json({ error: 'Unable to send enquiry email.' })
    }
  } catch (error) {
    console.error('Resend request failed', error)
    return res.status(502).json({ error: 'Unable to send enquiry email.' })
  }

  // Keep the admin record in sync when available, but email delivery does not
  // depend on the admin service being healthy.
  const adminUrl = process.env.PUBLIC_API_URL || 'https://admin.crystalgroup.in'
  try {
    const adminResponse = await fetch(`${adminUrl}/api/enquiries/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiry),
    })
    if (!adminResponse.ok) console.error('Admin enquiry persistence failed', adminResponse.status)
  } catch (error) {
    console.error('Admin enquiry persistence unavailable', error)
  }

  return res.status(200).json({ ok: true, id: resendResponse.id })
}
