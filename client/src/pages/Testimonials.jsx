import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    college: "GTBIT",
    avatar: "RS",
    rating: 4,
    review:
      "This is a wonderful platform for students to get the components they need for their projects. The bidding system is fair and transparent!",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Priya Mehta",
    college: "GTBIT",
    avatar: "PM",
    rating: 4,
    review:
      "Great idea with good execution. Really helped me secure components for my final year project at a reasonable price.",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Arjun Patel",
    college: "BPIT",
    avatar: "AP",
    rating: 5,
    review:
      "The real-time bidding feature is amazing! It creates a fair competition and ensures everyone has a chance.",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    college: "BPIT",
    avatar: "SR",
    rating: 5,
    review:
      "This platform made component procurement so much easier. No more running around shops!",
    date: "1 week ago",
  },
  {
    id: 5,
    name: "Vikram Singh",
    college: "MSIT",
    avatar: "VS",
    rating: 4,
    review:
      "Innovative solution to a common student problem. The flame coins system adds an interesting strategic element.",
    date: "2 months ago",
  },
  {
    id: 6,
    name: "Ananya Iyer",
    college: "MSIT",
    avatar: "AI",
    rating: 5,
    review:
      "Best platform for electronics project components. The verification system ensures quality projects get priority!",
    date: "3 days ago",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={star <= rating ? "#f59e0b" : "#e2e8f0"}
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial, index }) => {
  const { name, college, avatar, rating, review, date } = testimonial;
  const gradients = [
    "from-emerald-500 to-orange-400",
    "from-blue-500 to-indigo-400",
    "from-emerald-500 to-emerald-400",
    "from-purple-500 to-pink-400",
    "from-amber-500 to-yellow-400",
    "from-cyan-500 to-teal-400",
  ];

  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300 animate-fadeInUp"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className={`w-12 h-12 rounded-full bg-gradient-to-br ${
            gradients[index % gradients.length]
          } flex items-center justify-center text-white font-bold text-sm shrink-0`}
        >
          {avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{college}</p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={rating} />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              • {date}
            </span>
          </div>
        </div>
      </div>

      {/* Review */}
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        "{review}"
      </p>
    </div>
  );
};

function Testimonials() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-sm font-semibold rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                clipRule="evenodd"
              />
            </svg>
            Student Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            What Students Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Hear from students across colleges who are transforming their
            project experience through our innovative platform
          </p>

          {/* Avatars + Count */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((t, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-gradient-to-br from-emerald-500 to-amber-400 flex items-center justify-center text-white text-xs font-bold`}
                >
                  {t.avatar}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                500+
              </span>{" "}
              happy students
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="mt-16 animate-fadeInUp"
          style={{ animationDelay: "600ms" }}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-500 p-8 md:p-12 text-center">
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to Start Your Journey?
              </h3>
              <p className="text-white/80 text-lg mb-6 max-w-xl mx-auto">
                Join thousands of students who are already using HackStock to
                power their projects
              </p>
              <button
                onClick={() => (window.location.href = "/")}
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-emerald-600 font-semibold rounded-xl hover:bg-white/90 transition-colors shadow-lg"
              >
                Start Bidding
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
