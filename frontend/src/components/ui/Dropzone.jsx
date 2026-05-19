import { useCallback } from 'react';
import { UploadCloud, X } from 'lucide-react';

export const Dropzone = ({ file, setFile, label = "Upload Image" }) => {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  }, [setFile]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">{label}</label>
      
      {!file ? (
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="relative w-full h-40 border-2 border-dashed border-textPrimary/20 hover:border-textPrimary/50 transition-colors bg-surface/30 flex flex-col items-center justify-center cursor-pointer group"
        >
          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleChange} accept="image/*,video/*" />
          <UploadCloud className="text-textSecondary group-hover:text-textPrimary transition-colors mb-3" size={32} />
          <p className="text-sm text-textSecondary group-hover:text-textPrimary transition-colors">Drag and drop or click to browse</p>
        </div>
      ) : (
        <div className="relative w-full h-40 border border-textPrimary/20 bg-surface/30 flex items-center justify-center overflow-hidden">
          {file.type?.includes('video') ? (
            <div className="text-sm font-medium">{file.name}</div>
          ) : (
            <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
          )}
          <button 
            onClick={(e) => { e.preventDefault(); setFile(null); }}
            className="absolute top-2 right-2 p-1 bg-background text-textPrimary hover:bg-red-500 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
