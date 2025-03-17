import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });
  
  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully. We'll get back to you soon.",
        variant: "default",
      });
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="py-12 md:py-16 bg-royal-purple">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">Contact Us</h2>
          <div className="w-24 h-1 bg-royal-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Have questions about planning your visit to Mysore? Reach out to us for assistance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="bg-white rounded-lg p-6 md:p-8">
            <h3 className="text-2xl font-playfair font-bold text-royal-purple mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-royal-gold ${
                      errors.name ? "border-red-500" : ""
                    }`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-red-500 text-sm">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-royal-gold ${
                      errors.email ? "border-red-500" : ""
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  id="subject" 
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-royal-gold ${
                    errors.subject ? "border-red-500" : ""
                  }`}
                  {...register("subject")}
                />
                {errors.subject && (
                  <p className="mt-1 text-red-500 text-sm">{errors.subject.message}</p>
                )}
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">Your Message</label>
                <textarea 
                  id="message" 
                  rows={4} 
                  className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-royal-gold ${
                    errors.message ? "border-red-500" : ""
                  }`}
                  {...register("message")}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>
              <button 
                type="submit" 
                className="w-full py-3 bg-royal-gold hover:bg-yellow-600 text-white rounded-md transition-colors duration-300 flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
          
          <div className="text-white">
            <div className="mb-8">
              <h3 className="text-2xl font-playfair font-bold mb-4">Tourism Information Office</h3>
              <div className="space-y-3">
                <div className="flex">
                  <i className="fas fa-map-marker-alt mt-1 mr-3 text-royal-gold"></i>
                  <div>Department of Tourism<br/>Government of Karnataka<br/>Palace Road, Mysore 570001</div>
                </div>
                <div className="flex">
                  <i className="fas fa-phone-alt mt-1 mr-3 text-royal-gold"></i>
                  <div>+91 821 2422096</div>
                </div>
                <div className="flex">
                  <i className="fas fa-envelope mt-1 mr-3 text-royal-gold"></i>
                  <div>info@mysoretourism.gov.in</div>
                </div>
                <div className="flex">
                  <i className="fas fa-clock mt-1 mr-3 text-royal-gold"></i>
                  <div>Monday to Saturday: 10:00 AM - 5:30 PM</div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-playfair font-bold mb-4">Tourism Police</h3>
              <div className="space-y-3">
                <div className="flex">
                  <i className="fas fa-shield-alt mt-1 mr-3 text-royal-gold"></i>
                  <div>For tourist safety concerns or emergencies</div>
                </div>
                <div className="flex">
                  <i className="fas fa-phone-alt mt-1 mr-3 text-royal-gold"></i>
                  <div>Emergency: 100 | Tourist Helpline: 1800 425 8866</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-playfair font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-royal-purple hover:bg-royal-gold hover:text-white transition-colors duration-300">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-royal-purple hover:bg-royal-gold hover:text-white transition-colors duration-300">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-royal-purple hover:bg-royal-gold hover:text-white transition-colors duration-300">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-royal-purple hover:bg-royal-gold hover:text-white transition-colors duration-300">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
