// types/mailgun-js.d.ts
declare module 'mailgun-js' {
  interface MailgunOptions {
    apiKey: string;
    domain: string;
  }

  interface MessageData {
    from: string;
    to: string;
    subject: string;
    text: string;
  }

  interface Messages {
    send: (data: MessageData) => Promise<any>;
  }

  interface MailgunInstance {
    messages: () => Messages;
  }

  export default function (options: MailgunOptions): MailgunInstance;
}
