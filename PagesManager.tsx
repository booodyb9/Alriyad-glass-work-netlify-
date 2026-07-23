import React, { useState, useMemo } from 'react';

import { Plus, Edit3, Trash2, Save } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '../../lib/supabase';

interface PagesManagerProps {
  contents: any[];
  fetchContents: () => void;
  token?: string;
}

export default function PagesManager({ contents, fetchContents }: PagesManagerProps) {
  const pages = useMemo(() => {
    return contents.filter(c => c.key.startsWith('page_') && c.type === 'page').map(c => {
        try {
            return { ...c, parsed: JSON.parse(c.body) };
        } catch {
            return { ...c, parsed: {} };
        }
    });
  }, [contents]);

  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingPage, setEditingPage] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const handleAddNew = () => {
    const id = Date.now().toString();
    setEditingKey(`page_${id}`);
    setEditingPage({
      key: `page_${id}`,
      type: 'page',
      title: 'صفحة جديدة',
      parsed: {
        title: 'صفحة جديدة',
        slug: `page-${id}`,
        content: '',
        showTitle: true,
        seo: { title: '', description: '', keywords: '' },
        sections: []
      }
    });
  };

  const handleSave = async () => {
    if (!editingPage) return;
    setSaving(true);
    try {
      const { error } = await supabase.from('contents').upsert(
        {
          key: editingPage.key,
          title: editingPage.parsed.title,
          type: 'page',
          body: JSON.stringify(editingPage.parsed),
        },
        { onConflict: 'key' }
      );
      if (error) throw error;

      alert('تم الحفظ بنجاح');
      fetchContents();
      setEditingKey(null);
      setEditingPage(null);
    } catch (error: any) {
      alert('خطأ أثناء الحفظ: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (key: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الصفحة؟')) return;
    try {
      const { error } = await supabase.from('contents').delete().eq('key', key);
      if (error) throw error;

      fetchContents();
    } catch (error: any) {
      alert('خطأ: ' + error.message);
    }
  };

  const availableSections = [
    'Hero', 'Services', 'Process', 'GlassVisualizer', 'ProjectStats', 
    'Features', 'Gallery', 'Testimonials', 'TrustedPartners', 
    'FAQ', 'Maintenance', 'Blog', 'Contact'
  ];

  const toggleSection = (sectionName: string) => {
      const currentSections = editingPage.parsed.sections || [];
      if (currentSections.includes(sectionName)) {
          setEditingPage({
              ...editingPage, 
              parsed: { ...editingPage.parsed, sections: currentSections.filter((s: string) => s !== sectionName) }
          });
      } else {
          setEditingPage({
              ...editingPage, 
              parsed: { ...editingPage.parsed, sections: [...currentSections, sectionName] }
          });
      }
  };

  if (editingPage) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">تعديل الصفحة: {editingPage.parsed.title}</h2>
          <div className="flex gap-2">
            <button onClick={() => setEditingKey(null)} className="px-4 py-2 border rounded">إلغاء</button>
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#0284C7] text-white rounded font-bold">
              {saving ? 'جاري الحفظ...' : 'حفظ الصفحة'}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2">عنوان الصفحة</label>
              <input 
                type="text" 
                value={editingPage.parsed.title}
                onChange={e => setEditingPage({...editingPage, parsed: {...editingPage.parsed, title: e.target.value}})}
                className="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">رابط الصفحة (Slug)</label>
              <input 
                type="text" 
                value={editingPage.parsed.slug}
                onChange={e => setEditingPage({...editingPage, parsed: {...editingPage.parsed, slug: e.target.value}})}
                className="w-full border p-2 rounded text-left" dir="ltr"
              />
              <p className="text-xs text-gray-500 mt-1">مثال: about-us</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-bold mb-4">إعدادات SEO</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Meta Title</label>
                <input 
                  type="text" 
                  value={editingPage.parsed.seo?.title || ''}
                  onChange={e => setEditingPage({...editingPage, parsed: {...editingPage.parsed, seo: {...editingPage.parsed.seo, title: e.target.value}}})}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Meta Description</label>
                <textarea 
                  value={editingPage.parsed.seo?.description || ''}
                  onChange={e => setEditingPage({...editingPage, parsed: {...editingPage.parsed, seo: {...editingPage.parsed.seo, description: e.target.value}}})}
                  className="w-full border p-2 rounded h-20"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-bold mb-4">محتوى الصفحة (Rich Text)</h3>
            <div className="ltr text-left" dir="ltr">
              <ReactQuill 
                theme="snow"
                value={editingPage.parsed.content || ''}
                onChange={val => setEditingPage({...editingPage, parsed: {...editingPage.parsed, content: val}})}
                className="h-64 mb-12"
              />
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-bold mb-4">إضافة أقسام (Sections)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableSections.map(sec => (
                    <label key={sec} className="flex items-center gap-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                        <input 
                            type="checkbox" 
                            checked={(editingPage.parsed.sections || []).includes(sec)}
                            onChange={() => toggleSection(sec)}
                            className="w-4 h-4 text-[#0284C7]"
                        />
                        <span>{sec}</span>
                    </label>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">إدارة الصفحات</h2>
        <button onClick={handleAddNew} className="flex items-center gap-2 bg-[#0284C7] text-white px-4 py-2 rounded font-bold hover:bg-[#0369A1]">
          <Plus className="w-5 h-5" /> إنشـاء صفحة جديدة
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-right border-b">عنوان الصفحة</th>
              <th className="p-3 text-left border-b" dir="ltr">الرابط (Slug)</th>
              <th className="p-3 text-center border-b">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {pages.length === 0 ? (
                <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">لا توجد صفحات إضافية، يمكنك إنشاء صفحة جديدة.</td>
                </tr>
            ) : pages.map((page: any) => (
              <tr key={page.key} className="border-b hover:bg-gray-50">
                <td className="p-3 font-bold text-gray-900">{page.parsed.title}</td>
                <td className="p-3 text-left" dir="ltr"><a href={`/${page.parsed.slug}`} target="_blank" className="text-blue-600 hover:underline">/{page.parsed.slug}</a></td>
                <td className="p-3">
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => {
                        setEditingKey(page.key);
                        setEditingPage(page);
                      }}
                      className="p-2 text-[#0284C7] hover:bg-[#0284C7]/10 rounded"
                      title="تعديل"
                    >
                      <Edit3 className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(page.key)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      title="حذف"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
