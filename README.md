# Gmail to WhatsApp Notifier

Get instant WhatsApp notifications whenever a new email lands in your Gmail inbox, without keeping auto-sync always turned on.

---

## Why This Exists

Keeping auto-sync enabled on your phone drains your battery. But turning it off means you might miss important emails. This tool solves that problem by running silently in the background on Google's servers, watching your inbox and pushing WhatsApp alerts to your phone within a minute.

---

## Features

- Instant WhatsApp notifications for new emails (within 1 minute)
- Shows sender, subject, and a preview of the email body
- No need to keep auto-sync turned on — saves battery
- Runs entirely on Google's servers — no hosting required
- Credentials stored securely using Google Apps Script Properties
- Works with multiple Gmail accounts (e.g. personal and university)

---

## Tech Stack

- **Google Apps Script** — runs the email checking logic on a time-driven trigger
- **Gmail API** — reads unread emails from your inbox
- **Twilio WhatsApp API** — sends WhatsApp notifications to your phone

---

## Setup Guide

### Prerequisites
- A Gmail account
- A [Twilio account](https://twilio.com) (free tier works)
- WhatsApp on your phone

---

### Step 1: Set Up Twilio WhatsApp Sandbox
1. Sign up at [twilio.com](https://twilio.com)
2. Go to **Console → Messaging → Try it out → Send a WhatsApp message**
3. Note your **sandbox number** and **join code**
4. On your phone, WhatsApp message the sandbox number with the join code (e.g. `join bright-tiger`)
5. Note down your **Account SID** and **Auth Token** from the Console homepage

---

### Step 2: Set Up Google Apps Script
1. Go to [script.google.com](https://script.google.com) and create a **New Project**
2. Paste the contents of `code.gs` into the editor
3. Save the project

---

### Step 3: Store Your Credentials
In the `setSecrets` function, replace the placeholders with your real values:

```javascript
function setSecrets() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty('TWILIO_SID',     'YOUR_TWILIO_ACCOUNT_SID');
  props.setProperty('TWILIO_TOKEN',   'YOUR_TWILIO_AUTH_TOKEN');
  props.setProperty('TWILIO_FROM',    'whatsapp:+YOUR_TWILIO_SANDBOX_NUMBER');
  props.setProperty('YOUR_WHATSAPP',  'whatsapp:+YOUR_WHATSAPP_NUMBER');
}
```

Select `setSecrets` from the function dropdown and click **Run**. This stores your credentials securely inside Google's servers. You only need to do this once.

---

### Step 4: Set Up the Trigger
1. Click the **Triggers** (clock) icon in the left sidebar
2. Click **Add Trigger**
3. Configure it as follows:
   - **Function:** `checkNewEmails`
   - **Event source:** `Time-driven`
   - **Type:** `Minutes timer`
   - **Interval:** `Every 1 minute`
4. Click **Save**

---

## Using With Multiple Gmail Accounts

You can run a separate Apps Script project under each Gmail account (e.g. personal and university). Each project watches its own inbox and sends notifications to the same WhatsApp number. No email forwarding needed.

---

## How It Works

```
Gmail Inbox
    |  (checked every 1 minute via time-driven trigger)
Google Apps Script
    |  (detects new unread emails)
Twilio WhatsApp API
    |
Your WhatsApp
```

---

## Customization

- **Email preview length** — change the `500` in `msg.getPlainBody().substring(0, 500)` to show more or less of the email body
- **Check frequency** — adjust the trigger interval (minimum is 1 minute on the free tier)
- **Filter by sender or label** — modify the `GmailApp.search()` query to narrow down which emails trigger a notification

---

## Security Notes

- Credentials are stored securely using Google Apps Script's `PropertiesService`

---

## License

MIT License — feel free to use, modify, and share.
