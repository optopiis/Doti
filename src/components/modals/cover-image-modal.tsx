"use client"

import { useEdgeStore } from "@/lib/edgestore";
import { useCoverImage } from "../../../hooks/use-cover-image"
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { SingleImageDropzone } from "../single-image-dropzone";


export const CoverImageModal = () => {

    const params = useParams();

    const [file,setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const update = useMutation(api.documents.update);
    const coverImage = useCoverImage();
    const { edgestore } = useEdgeStore();

    const onChange = async(file? : File) => {
        if(file){
            setIsSubmitting(true);
            setFile(file);

            const res = await edgestore.publicFiles.upload({
                file,
                options : {
                    replaceTargetUrl : coverImage.url,
                }
            });
    
            await update({
                id : params.documentId as Id<"documents">,
                coverImage : res.url,
            });

            onClose();
        };
    };

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    };



    return(
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover Image
                    </h2>
                </DialogHeader>
                <SingleImageDropzone
                className="w-full outline-none"
                disabled={isSubmitting}
                value={file}
                onChange={onChange}
                />
            </DialogContent>
        </Dialog>
    );
};