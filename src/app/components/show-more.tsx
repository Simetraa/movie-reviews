import {useLayoutEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import Markdown from "react-markdown";

export function ShowMoreText({ text }: { text: string }) {
    const [expanded, setExpanded] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = contentRef.current;
        if (el && !expanded) {
            setIsOverflowing(el.scrollHeight > el.clientHeight);
        }
    }, [text, expanded]);

    return (
        <div className="space-y-2">
            <div
                ref={contentRef}
                className={
                    expanded
                        ? "prose prose-neutral max-w-none"
                        : "prose prose-neutral max-w-none overflow-hidden max-h-24"
                }
            >
                <Markdown>{text}</Markdown>
            </div>
            {!expanded && isOverflowing && (
                <Button variant="link" className="p-0 h-auto" onClick={() => setExpanded(true)}>
                    Show More
                </Button>
            )}
            {expanded && (
                <Button variant="link" className="p-0 h-auto" onClick={() => setExpanded(false)}>
                    Show Less
                </Button>
            )}
        </div>
    );
}