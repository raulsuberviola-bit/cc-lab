import { useEffect } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'agent-id'?: string;
        'server-location'?: string;
      }, HTMLElement>;
    }
  }
}

export function ElevenLabsWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;

    const suppressWidgetError = (event: ErrorEvent | PromiseRejectionEvent) => {
      const msg = (event as ErrorEvent).message ?? String((event as PromiseRejectionEvent).reason ?? "");
      if (
        (event instanceof ErrorEvent && event.filename?.includes("elevenlabs")) ||
        (event instanceof ErrorEvent && event.filename?.includes("unpkg")) ||
        msg.includes("elevenlabs") ||
        msg.includes("convai")
      ) {
        event.preventDefault();
        event.stopPropagation?.();
        return true;
      }
    };

    window.addEventListener("error", suppressWidgetError as EventListener, true);
    window.addEventListener("unhandledrejection", suppressWidgetError as EventListener, true);

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      window.removeEventListener("error", suppressWidgetError as EventListener, true);
      window.removeEventListener("unhandledrejection", suppressWidgetError as EventListener, true);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <elevenlabs-convai agent-id="agent_8001kn1y4038ftxs2tc5rtn4q3xk" server-location="eu-residency" />
    </div>
  );
}
