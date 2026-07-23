import { memo } from 'react';
import { Mail, Trash2, CheckCircle, Circle } from 'lucide-react';
import { Message } from './types';
import { supabase } from '../../lib/supabase';

interface MessagesProps {
  messages: Message[];
  loading: boolean;
  fetchMessages: () => void;
}

const Messages = memo(({ messages, loading, fetchMessages }: MessagesProps) => {
  const handleToggleRead = async (id: number, current: boolean | undefined) => {
    const { error } = await supabase.from('messages').update({ is_read: !current }).eq('id', id);
    if (error) {
      console.error('Failed to update message:', error);
      return;
    }
    fetchMessages();
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه الرسالة؟')) return;
    const { error } = await supabase.from('messages').delete().eq('id', id);
    if (error) {
      console.error('Failed to delete message:', error);
      alert('حدث خطأ أثناء الحذف');
      return;
    }
    fetchMessages();
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">جاري التحميل...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Mail className="w-5 h-5 text-[#0284C7]" />
          الرسائل الواردة
        </h2>
        <span className="bg-blue-50 text-[#0284C7] px-3 py-1 rounded-full text-sm font-bold">
          {messages.length} رسالة
        </span>
      </div>

      <div className="divide-y divide-gray-200">
        {messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            لا توجد رسائل جديدة
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`p-6 hover:bg-gray-50 transition-colors ${msg.is_read ? '' : 'bg-blue-50/40'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-gray-900">{msg.name}</h3>
                  <a href={`tel:${msg.phone}`} dir="ltr" className="text-sm text-[#0284C7] hover:underline inline-block">
                    {msg.phone}
                  </a>
                  {msg.service && (
                    <p className="text-xs text-gray-500 mt-1">الخدمة المطلوبة: {msg.service}</p>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleDateString('ar-SA')}
                  </span>
                  <button
                    onClick={() => handleToggleRead(msg.id, msg.is_read)}
                    title={msg.is_read ? 'تحديد كغير مقروءة' : 'تحديد كمقروءة'}
                    className="text-gray-400 hover:text-[#0284C7] transition-colors"
                  >
                    {msg.is_read ? <CheckCircle className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
                    title="حذف"
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mt-3 whitespace-pre-wrap">{msg.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

Messages.displayName = 'Messages';
export default Messages;
