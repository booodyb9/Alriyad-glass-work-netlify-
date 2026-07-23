import { useLocation } from 'react-router-dom';
import WhatsAppButton from './WhatsAppButton';
import ChatBubble from './ChatBubble';

export default function GlobalWidgets() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) return null;

  return (
    <>
      <WhatsAppButton />
      <ChatBubble />
    </>
  );
}
