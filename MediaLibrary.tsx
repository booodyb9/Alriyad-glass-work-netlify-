import { memo, useState, useCallback } from 'react';
import { Image, Upload, Trash2 } from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { MediaFile } from './types';
import { supabase } from '../../lib/supabase';

interface MediaLibraryProps {
  mediaFiles: MediaFile[];
  fetchMedia: () => void;
  token: string | null;
}

const MediaLibrary = memo(({ mediaFiles, fetchMedia }: MediaLibraryProps) => {
  const [uploadingMedia, setUploadingMedia] = useState(false);

  const handleUploadMedia = useCallback(async (e: import("react").ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMedia(true);
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: false
      };

      const compressedFile = await imageCompression(file, options);

      const ext = file.name.split('.').pop() || 'jpg';
      const storagePath = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(storagePath, compressedFile, { contentType: compressedFile.type });
      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(storagePath);

      const { error: insertError } = await supabase
        .from('media')
        .insert({ name: file.name, url: publicUrlData.publicUrl, storage_path: storagePath });
      if (insertError) throw insertError;

      alert('تم ضغط ورفع الصورة بنجاح');
      fetchMedia();
    } catch (error) {
      console.error("Upload error:", error);
      alert('حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploadingMedia(false);
      e.target.value = '';
    }
  }, [fetchMedia]);

  const handleDeleteMedia = useCallback(async (id: number, storagePath: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الصورة؟')) return;
    try {
      const { error: storageError } = await supabase.storage.from('media').remove([storagePath]);
      if (storageError) console.error("Storage delete error:", storageError);

      const { error: dbError } = await supabase.from('media').delete().eq('id', id);
      if (dbError) throw dbError;

      alert('تم حذف الصورة');
      fetchMedia();
    } catch (error) {
      console.error("Delete error:", error);
      alert('حدث خطأ أثناء الحذف');
    }
  }, [fetchMedia]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Image className="w-5 h-5 text-[#0284C7]" />
          مكتبة الوسائط
        </h2>

        <label className={`cursor-pointer bg-[#0284C7] text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-[#0369A1] transition-colors ${uploadingMedia ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <Upload className="w-4 h-4" />
          {uploadingMedia ? 'جاري الرفع...' : 'رفع صورة جديدة'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadMedia}
            disabled={uploadingMedia}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mediaFiles.map((file) => (
          <div key={file.id} className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            <img
              src={file.url}
              alt={file.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleDeleteMedia(file.id, file.storage_path)}
                  className="bg-red-500 text-white p-1.5 rounded-md hover:bg-red-600 transition-colors"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="text-white text-xs truncate bg-black/50 p-1.5 rounded" title={file.name}>
                {file.name}
              </div>
            </div>
          </div>
        ))}
        {mediaFiles.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500">
            لا توجد صور في المكتبة
          </div>
        )}
      </div>
    </div>
  );
});

MediaLibrary.displayName = 'MediaLibrary';

export default MediaLibrary;
