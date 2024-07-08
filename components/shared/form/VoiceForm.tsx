"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { subjects } from "@/constants";
import Voice from "./Voice";
import { useState } from "react";
import { createNote } from "@/lib/actions/note.action";
import { usePathname } from "next/navigation";

const FormSchema = z.object({
  subject: z.string({
    required_error: "You must have to select subject.",
  }),
  transcript: z.string(),
});

const VoiceForm = ({ mongoId }: { mongoId: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [questions, setQuestions] = useState<string>();
  const [answers, setAnswers] = useState<string>();

  const pathname = usePathname();

  // console.log({
  //   question: questions,
  //   answer: answers,
  // });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);

    try {
      createNote({
        subject: data.subject,
        question: questions,
        answer: answers,
        author: JSON.parse(mongoId),
        pathname,
      });

      toast({
        title: "Note created successfully!",
        description: "Your note has been successfully created.",
        duration: 3000,
        variant: "default",
      });

      setQuestions("");
      setAnswers("");
    } catch (error) {
      console.log(error);
      toast({
        title: "Note creation failed!",
        description: "Something went wrong while creating your note.",
        duration: 3000,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-[90%] flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className="text-orange-600">*</FormLabel> */}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="mx-auto w-fit text-sm">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent side="bottom">
                  {subjects.map((item) => (
                    <SelectItem key={item.id} value={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transcript"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel className="text-orange-600">*</FormLabel> */}
              <Voice
                onChangeValue={field.onChange}
                value={field.value}
                setQuestions={setQuestions}
                setAnswers={setAnswers}
                questions={questions}
                answers={answers}
              />

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="secondary"
          className=" mt-4 w-fit"
        >
          {isSubmitting ? "Saving" : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default VoiceForm;
