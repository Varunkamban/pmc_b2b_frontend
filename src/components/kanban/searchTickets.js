export function matchesSearch(ticket, query) {
  if (!query || !query.trim()) return true;
  const q = query.toLowerCase().trim();
  return (
    ticket.ticketId?.toLowerCase().includes(q) ||
    ticket.customerName?.toLowerCase().includes(q) ||
    ticket.vehicle?.name?.toLowerCase().includes(q) ||
    ticket.vehicle?.number?.toLowerCase().includes(q) ||
    ticket.pickupLocation?.toLowerCase().includes(q) ||
    ticket.drivers?.mainDriver?.name?.toLowerCase().includes(q) ||
    ticket.drivers?.supportDriver?.name?.toLowerCase().includes(q)
  );
}
