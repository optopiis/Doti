"use client"

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Documents = () => {

    const {user} = useUser();
    const router = useRouter();

    const create = useMutation(api.documents.create)

    const onCreate = () => {
        const promise = create({ title : "untitled"})
        .then((documentId) => (router.push(`/documents/${documentId}`)));

        toast.promise(promise,{
            loading : "Creating a new note...",
            success : "Note created succesfully",
            error : "Failed to create a new note"
        });
    };

    return ( 
        <div className="h-full flex flex-col items-center justify-center space-y-4">
            <Image
            src="/experiments.png"
            alt="page"
            height="300"
            width="300"
            />

            <h2 className="text-lg font-medium">
                Welcome to {user?.firstName}&apos;s Doti
            </h2>

            <Button onClick={onCreate}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Create a note
            </Button>
        </div>
     );
}
 
export default Documents;