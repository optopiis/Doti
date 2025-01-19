"use client"

import { useRouter } from "next/navigation"
import { Id } from "../../../../convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ConfirmModal } from "@/components/modals/alert-modal"

interface BannerProps {
    documentId : Id<"documents">
};

export const Banner = ({
    documentId
} : BannerProps) => {

    const router = useRouter();

    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {


        const promise = remove({ id: documentId })

        toast.promise(promise,{
            loading : "Deleting note...",
            success : "Note Deleted succesfully",
            error : "Failed to Delete note"
        });

        router.push("/documents");
    };

    const onRestore = () => {

        const promise = restore ({ id: documentId });

        toast.promise(promise,{
            loading : "Restoring note...",
            success : "Note restored succesfully",
            error : "Failed to restore note"
        });
    };


    return(
        <div className="w-full bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
            <p>
                This page is in the Trash.
            </p>

            <Button
            className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
            variant="outline"
            size="sm"
            onClick={onRestore}
            >
                Restore Page
            </Button>

            <ConfirmModal onConfirm={onRemove}>
                <Button
                className="border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
                variant="outline"
                size="sm"
                
                >
                    Delete forever
                </Button>
            </ConfirmModal>
        </div>
    )
}