import { useEffect } from "react";

export const useDocumentMetadata = (title: string, description: string) => {
  useEffect(() => {
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [description, title]);
};
