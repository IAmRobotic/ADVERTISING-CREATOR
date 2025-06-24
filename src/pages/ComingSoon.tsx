
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Check, Mail } from "lucide-react";
import { supabase } from "@/lib/supabase";

// Define validation schema with Zod
const emailSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .refine((email) => {
      // Check for valid TLD (top-level domain) to catch obvious fakes
      const validTLDs = ['.com', '.org', '.net', '.edu', '.gov', '.mil', '.io', '.co', '.us', '.uk', '.ca', '.au', '.de', '.fr', '.jp', '.br', '.in', '.ru', '.cn', '.mx', '.nl', '.se', '.no', '.dk', '.fi', '.it', '.es', '.pl', '.ch', '.at', '.be', '.pt', '.gr', '.cz', '.hu', '.ro', '.bg', '.hr', '.si', '.sk', '.lt', '.lv', '.ee', '.ie', '.lu', '.mt', '.cy'];
      return validTLDs.some(tld => email.toLowerCase().endsWith(tld));
    }, "Please enter a valid email address with a recognized domain")
});

type EmailFormData = z.infer<typeof emailSchema>;

const ComingSoon = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [planInterest, setPlanInterest] = useState<string | null>(null);

  // Set up form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  // Extract plan parameter from URL when component mounts
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const plan = urlParams.get('plan');
    setPlanInterest(plan);
  }, []);

  const onSubmit = async (data: EmailFormData) => {
    setIsLoading(true);
    
    try {
      // Insert email and plan interest into Supabase database
      const { error } = await supabase
        .from('contacts')
        .insert({
          email: data.email.toLowerCase().trim(),
          plan_interest: planInterest
        });

      if (error) {
        console.error('Supabase error:', error);
        toast({
          title: "Something went wrong",
          description: "Please try again or contact support if the issue persists.",
          variant: "destructive"
        });
      } else {
        setIsSubmitted(true);
        toast({
          title: "You're on the list!",
          description: "We'll notify you as soon as Chumzee is ready.",
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact support if the issue persists.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="bg-gradient-to-r from-purple-600 to-teal-600 text-white px-6 py-2 rounded-full text-lg font-semibold w-fit mx-auto mb-8">
          chumzee
        </div>

        {!isSubmitted ? (
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Almost ready to launch! 🚀
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We're putting the finishing touches on Chumzee. Join our early access list 
              and be the first to know when we're ready to help you build career momentum.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="pl-10 py-3 text-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                {isLoading ? "Adding you to the list..." : "Get Early Access"}
              </Button>
            </form>

            <p className="text-sm text-gray-500 mt-4">
              No spam, ever. We'll only email you when we're ready to launch.
            </p>
          </>
        ) : (
          <>
            <div className="bg-green-100 rounded-full p-4 w-fit mx-auto mb-6">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              You're all set! ✨
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Thanks for joining our early access list. We'll be in touch soon with 
              updates on our launch and exclusive early bird pricing.
            </p>
          </>
        )}

        <Button 
          variant="ghost" 
          className="mt-8 text-purple-600 hover:text-purple-700"
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default ComingSoon;
