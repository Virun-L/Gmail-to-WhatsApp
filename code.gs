function setSecrets() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty('TWILIO_SID',     'YOUR_TWILIO_ACCOUNT_SID');
  props.setProperty('TWILIO_TOKEN',   'YOUR_TWILIO_AUTH_TOKEN');
  props.setProperty('TWILIO_FROM',    'whatsapp:+YOUR_TWILIO_SANDBOX_NUMBER');
  props.setProperty('YOUR_WHATSAPP',  'whatsapp:+YOUR_WHATSAPP_NUMBER');
function checkNewEmails() {
  const props     = PropertiesService.getScriptProperties();
  const lastTime  = parseInt(props.getProperty('lastCheckedTime') || '0');
  const now       = new Date().getTime();
  const checkFrom = lastTime || (now - 60000);

  const threads = GmailApp.search('is:unread');

  for (let i = 0; i < threads.length; i++) {
    const messages = threads[i].getMessages();
    for (let j = 0; j < messages.length; j++) {
      const msg = messages[j];
      if (msg.getDate().getTime() > checkFrom && msg.isUnread()) {
        const from    = msg.getFrom();
        const subject = msg.getSubject();
        const body    = msg.getPlainBody().substring(0, 500);

        sendWhatsApp(`📧 *New Email!*\n*From:* ${from}\n*Subject:* ${subject}\n\n${body}`);
      }
    }
  }

  props.setProperty('lastCheckedTime', now.toString());
}

function setSecrets() {
  const props = PropertiesService.getScriptProperties();
  props.setProperty('TWILIO_SID',     'YOUR_TWILIO_ACCOUNT_SID');
  props.setProperty('TWILIO_TOKEN',   'YOUR_TWILIO_AUTH_TOKEN');
  props.setProperty('TWILIO_FROM',    'whatsapp:+YOUR_TWILIO_SANDBOX_NUMBER');
  props.setProperty('YOUR_WHATSAPP',  'whatsapp:+YOUR_WHATSAPP_NUMBER');
}

function sendWhatsApp(message) {
  const props   = PropertiesService.getScriptProperties();
  const sid     = props.getProperty('TWILIO_SID');
  const token   = props.getProperty('TWILIO_TOKEN');
  const from    = props.getProperty('TWILIO_FROM');
  const to      = props.getProperty('YOUR_WHATSAPP');

  const url     = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;

  const payload = 'To='    + encodeURIComponent(to) +
                  '&From=' + encodeURIComponent(from) +
                  '&Body=' + encodeURIComponent(message);

  UrlFetchApp.fetch(url, {
    method  : 'post',
    payload : payload,
    headers : {
      'Authorization'  : 'Basic ' + Utilities.base64Encode(sid + ':' + token),
      'Content-Type'   : 'application/x-www-form-urlencoded'
    }
  });
}
