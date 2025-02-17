export const initialTickets = [
  {
    id : '1',
    title: 'Ticket 1',
    content: 'There is a bug in the code',
    status: 'DONE' as const,
  },
  {
    id : '2',
    title: 'Ticket 2',
    content: 'There is a typo in the code',
    status: 'IN_PROGRESS'  as const,
  },
  {
    id : '3',
    title: 'Ticket 3',
    content: 'I would like to have a new feature',
    status: 'OPEN'  as const,
  },
]

