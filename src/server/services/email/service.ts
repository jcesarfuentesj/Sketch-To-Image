import { render } from "@react-email/render";
import type { JSXElementConstructor, ReactElement } from "react";

import { logger } from "@/init/logger";

class EmailService {
  async sendTransactionalEmail(params: {
    from?: string;
    to: string;
    subject: string;
    body: ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  }) {
    const emailHtml = render(params.body);

    //TODO: Implement email sending provider
    logger.info(`Need to implement email sending: ${emailHtml}`);
    await Promise.resolve();
  }
}

const emailService = new EmailService();
export default emailService;
