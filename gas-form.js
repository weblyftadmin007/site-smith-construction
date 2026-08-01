// Google Apps Script — contact form backend for smith-construction
// Paste into: Google Sheet -> Extensions -> Apps Script
// Sheet headers (row 1): Timestamp | Name | Email | Phone | Service | Message
// After pasting: set SHEET_ID, run doPost once to authorize, then deploy as a NEW version.

const SHEET_ID = 'YOUR_SHEET_ID'
const YOUR_EMAIL = 'weblyft.admin@gmail.com'

function doPost(e) {
  try {
    const d = e.parameter
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0]
    sheet.appendRow([
      new Date(),
      d.name || '',
      d.email || '',
      d.phone || '',
      d.service || '',
      d.message || ''
    ])
    const body = `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nService: ${d.service}\nMessage: ${d.message}`
    MailApp.sendEmail(YOUR_EMAIL, 'New enquiry', body)
    return HtmlService.createHtmlOutput(
      '<html><body style="font-family:sans-serif;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:1rem"><p style="font-size:1.2rem">Message sent. You can close this tab.</p><a href="https://smith-construction.pages.dev" style="font-size:1rem;color:#2563eb;text-decoration:none">Return to website</a></body></html>'
    )
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}
