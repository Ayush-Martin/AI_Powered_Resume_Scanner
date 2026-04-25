import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";

interface UseFileSelectOptions {
  acceptedTypes?: string[];
  maxSizeMB?: number;
}

export const useFileSelect = (options: UseFileSelectOptions = {}) => {
  const { acceptedTypes = ["application/pdf"], maxSizeMB = 5 } = options;
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndSetFile = useCallback((incoming: File) => {
    if (acceptedTypes.length > 0 && !acceptedTypes.includes(incoming.type)) {
      toast.error(`Only ${acceptedTypes.join(", ")} files are accepted.`);
      return;
    }
    if (incoming.size > maxSizeMB * 1024 * 1024) {
      toast.error(`File size must be under ${maxSizeMB} MB.`);
      return;
    }
    setFile(incoming);
  }, [acceptedTypes, maxSizeMB]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) validateAndSetFile(dropped);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) validateAndSetFile(selected);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const onDragLeave = () => {
    setDragOver(false);
  };

  return {
    file,
    dragOver,
    fileInputRef,
    handleDrop,
    handleInputChange,
    removeFile,
    onDragOver,
    onDragLeave
  };
};
