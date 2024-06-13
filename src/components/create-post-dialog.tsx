"use client";

import { useMutation } from "@tanstack/react-query";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { createPost } from "@/server/actions";
import { useState } from "react";
import { toast } from "sonner";
import { Icons } from "./icons";

export function CreatePostDialog() {
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState("");
  const { mutate: server_createPost, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (data) => {
      setOpen(false);
      toast.success(data.message);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="self-start font-medium px-10" size="lg">
          Write
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Share your thoughts and feelings to your friends
          </DialogDescription>
        </DialogHeader>
        <Textarea
          value={post}
          onChange={(e) => setPost(e.target.value)}
          className="resize-none"
          rows={6}
          placeholder="Start writing here..."
        />
        <DialogFooter>
          <Button
            size="lg"
            onClick={() => server_createPost(post)}
            disabled={isPending}
          >
            {isPending && (
              <Icons.spinner className="h-4 w-4 animate-spin mr-2" />
            )}
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
