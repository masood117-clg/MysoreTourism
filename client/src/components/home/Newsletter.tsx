import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

const Newsletter = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
    }
  });
  
  const onSubmit = async (data: NewsletterFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/newsletter", data);
      toast({
        title: "Subscribed!",
        description: "You have successfully subscribed to our newsletter.",
        variant: "default",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem subscribing to the newsletter. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting newsletter form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-10 bg-royal-gold">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-playfair font-bold text-white mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-white opacity-90">Get the latest updates on events and special offers in Mysore.</p>
          </div>
          <div className="w-full md:w-2/5">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row">
              <div className="flex-grow">
                <input 
                  type="email"
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-3 rounded-l-md focus:outline-none ${
                    errors.email ? "border-2 border-red-500" : ""
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-white text-sm">{errors.email.message}</p>
                )}
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="bg-royal-purple hover:bg-opacity-90 text-white px-6 py-3 rounded-r-md transition-colors duration-300 mt-2 sm:mt-0"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Subscribing...</span>
                  </div>
                ) : (
                  "Subscribe"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
