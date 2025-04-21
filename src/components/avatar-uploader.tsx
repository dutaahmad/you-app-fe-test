import { useRef } from "react";
import { Plus } from "lucide-react";

interface AvatarUploaderProps {
  currentImageUrl?: string; // Optional preview
  onSelectImage?: (file: File) => void; // Optional file callback (can be used with RHF)
}

export function AvatarUploader({ currentImageUrl, onSelectImage }: AvatarUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onSelectImage) {
      onSelectImage(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        onClick={handleClick}
        className="relative flex justify-center items-center bg-white/10 rounded-2xl w-16 h-16 overflow-hidden text-white cursor-pointer"
      >
        {currentImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentImageUrl}
            alt="Profile preview"
            className="rounded-2xl w-full h-full object-cover"
          />
        ) : (
          <Plus className="w-6 h-6" />
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg, image/png"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
      <span className="text-muted-foreground text-sm">Add image</span>
    </div>
  );
}
