import { Fragment } from "react";

export const renderRichText = (text: string) =>
  text.split(/(<strong>.*?<\/strong>)/g).map((part, index) => {
    const strongMatch = part.match(/^<strong>(.*?)<\/strong>$/);

    if (strongMatch) {
      return (
        <strong key={`${strongMatch[1]}-${index}`} className="font-semibold text-foreground">
          {strongMatch[1]}
        </strong>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part.replace(/<[^>]*>/g, "")}</Fragment>;
  });
