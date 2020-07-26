export interface Ticket {
   id: string;
   applicationName?: string;
   category?: string;
   subject: string;
   description?: string;
   status: string;
   priority: string;
   assignee: string;
   platform?: string;
   dueDate: string;
   ticketId?: string;
}
