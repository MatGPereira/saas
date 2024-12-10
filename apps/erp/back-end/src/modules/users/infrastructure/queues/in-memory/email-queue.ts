import type { IEmailQueue } from "@/modules/users/domain/abstractions/queues/in-memory/email-queue";

class EmailQueue implements IEmailQueue {

  private readonly channels = {};
}

export { EmailQueue };
