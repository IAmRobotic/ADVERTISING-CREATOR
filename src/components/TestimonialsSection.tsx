import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "After 6 months of looking for a job, I finally felt like I was in the driver's seat. Chumzee helped me see that I was actually making progress, even when it didn't feel like it.",
      author: "Sarah C.",
      role: "Career Transition - Product Manager",
      image: "/product manager.jpg"
    },
    {
      quote: "I used to hate networking.  I thought it was a chore, just a necessary evil. Now I have a system that works, and I've already landed two interviews this month. And I'm making real meaningful connections.",
      author: "Marcus R.",
      role: "Career Transition - Software Engineer",
      image: "/software-engineer.jpg"
    },
    {
      quote: "The momentum tracking and constellation keeps me motivated. Seeing the progress bars fill up and my constellation growing keeps me reaching out.",
      author: "Jennifer P.",
      role: "Marketing Director",
      image: "/marketing-director.jpg"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            From overwhelmed to <span className="text-purple-600">in control</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of professionals who've already transformed their networking approach and accelerated their careers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 relative">
              <Quote className="h-8 w-8 text-purple-200 mb-4" />
              <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={`${testimonial.author} headshot`}
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-gray-200"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
