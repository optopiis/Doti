"use client"

import { useMutation } from "convex/react";
import { Doc } from "../../../../convex/_generated/dataModel"
import { useOrigin } from "../../../../hooks/use-origin";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverTrigger,PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";


interface PublishProps{
    initialData : Doc<"documents">;
};

export const Publish = ({
    initialData,
} : PublishProps) => {

    const origin = useOrigin();
    const update = useMutation(api.documents.update);

    const [copied,setCopied] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const url = `${origin}/preview/${initialData._id}`;

    const onPublish = () => {

        setIsSubmitting(true);

        const promise = update({
            id : initialData._id,
            isPublished : true,
        })
        .finally(() => setIsSubmitting(false)); 

        toast.promise(promise,{
            loading : "publishing",
            success : "published succesfully",
            error : "Failed to publish note"
        })

    }

    const onUnPublish = () => {

        setIsSubmitting(true);

        const promise = update({
            id : initialData._id,
            isPublished : false,
        })
        .finally(() => setIsSubmitting(false)); 

        toast.promise(promise,{
            loading : "unpublishing",
            success : "unpublished succesfully",
            error : "Failed to unpublish note"
        })

    }

    const onCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        },1000)
    }

    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" variant="ghost">
                    Publish
                    {initialData.isPublished && (
                        <Globe className="text-sky-500 w-4 h-4 ml-2" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
            className="w-72"
            align="end"
            alignOffset={8}
            forceMount
            >
                {initialData.isPublished ? (
                    <div className="space-y-4">
                        <div className="flex items-center gap-x-2">
                            <Globe className="text-sky-500 animate-pulse w-4 h-4"/>
                            <p className="text-xs font-medium text-sky-500">
                                This note is live on web.
                            </p>
                        </div>
                        <div className="flex items-center">
                            <input
                            className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                            value={url}
                            disabled 
                            />
                            <Button
                            className="h-8 rounded-l-none"
                            onClick={onCopy}
                            disabled={copied}>
                                {copied ? (
                                    <Check className="h-4 w-4" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>
                        <Button
                        className="w-full text-xs"
                        disabled={isSubmitting}
                        onClick={onUnPublish}
                        >
                            Unpublish
                        </Button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        <Globe className="h-8 w-8 text-muted-foregorund mb-2"/>
                        <p className="text-sm font-medium mb-2">
                            Publish this note
                        </p>
                        <span className="text-xs text-muted-foregorund mb-4">
                            share your work with others.
                        </span>
                        <Button
                        disabled={isSubmitting}
                        onClick={onPublish}
                        className="w-full text-xs"
                        size="sm"
                        >
                            Pulbish
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    )
};