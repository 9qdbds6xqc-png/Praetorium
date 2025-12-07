import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Please provide more details about your pricing inquiry"),
});

type FormValues = z.infer<typeof formSchema>;

interface PricingRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question?: string;
}

export const PricingRequestDialog = ({
  open,
  onOpenChange,
  question,
}: PricingRequestDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: question || "",
    },
  });

  // Update message when question prop changes
  useEffect(() => {
    if (question) {
      form.setValue("message", question);
    }
  }, [question, form]);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      // Prepare email content
      const emailSubject = `Pricing Request from ${values.name}`;
      const emailBody = `
New Pricing Request from Praetorium Website

Name: ${values.name}
Email: ${values.email}
Company: ${values.company || "Not provided"}

Question/Message:
${values.message}

---
This request was submitted through the chat interface
      `.trim();

      // Send email using mailto: link (opens email client)
      const mailtoLink = `mailto:contact@praetorium.tech?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`;

      // Open email client with pre-filled email
      window.location.href = mailtoLink;

      toast({
        title: "Request Submitted",
        description: "Your pricing request has been sent. We'll get back to you soon!",
      });

      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting pricing request:", error);
      toast({
        title: "Error",
        description:
          "Failed to submit your request. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Pricing Information</DialogTitle>
          <DialogDescription>
            Please provide your contact information and we'll get back to you with pricing details.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name (optional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Question *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your pricing inquiry..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Request"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

