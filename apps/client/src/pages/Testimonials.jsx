import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    cllgName: "GTBIT",
    avatar: "RS",
    rating: 4,
    review:
      "This is a wonderful platform for students to get the components they need for their projects",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Priya Mehta",
    cllgName: "GTBIT",
    avatar: "PM",
    rating: 3,
    review: "Idea is good but UI can be improved",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Arjun Patel",
    cllgName: "BPIT",
    avatar: "AP",
    rating: 4,
    review: "I like the way they implement the bidding system",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    cllgName: "BPIT",
    avatar: "SR",
    rating: 5,
    review:
      "This is a great platform I get the components I need for my projects",
    date: "1 week ago",
  },
  {
    id: 5,
    name: "Vikram Singh",
    cllgName: "MSIT",
    avatar: "VS",
    rating: 4,
    review: "I like the idea!!",
    date: "2 months ago",
  },
  {
    id: 6,
    name: "Ananya Iyer",
    cllgName: "MSIT",
    avatar: "AI",
    rating: 5,
    review: "Great project to handle the components procurement",
    date: "3 days ago",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={star <= rating ? "#FFC107" : "#E0E0E0"}
          className="w-5 h-5"
        >
          <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
        </svg>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const { name, cllgName, avatar, rating, review, date } = testimonial;

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-gray-100">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--action-color)] to-[var(--dark-action-color)] flex items-center justify-center text-white font-bold text-lg shadow-md">
            {avatar}
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-800 truncate">{name}</h3>
          <p className="text-sm text-gray-600 truncate">{cllgName}</p>
          <div className="flex items-center gap-2 mt-1">
            <StarRating rating={rating} />
            <span className="text-xs text-gray-500">{date}</span>
          </div>
        </div>
      </div>

      {/* Review */}
      <div className="mt-4">
        <p className="text-gray-700 leading-relaxed text-sm md:text-base">
          {review}
        </p>
      </div>

      {/* Footer with upvote style */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
        <button className="flex items-center gap-2 text-gray-500 hover:text-[var(--action-color)] transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
          </svg>
          <span className="text-sm font-medium">Helpful</span>
        </button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-[var(--secondary-color)] transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97zM6.75 8.25a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H7.5z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm font-medium">Reply</span>
        </button>
      </div>
    </div>
  );
};

function Testimonials() {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[var(--bg-color)] py-10 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Student Testimonials
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Hear from students across India who are revolutionizing their project
          procurement experience through our innovative bidding platform
        </p>
        <div className="flex justify-center items-center gap-2 mt-6">
          <div className="flex -space-x-2">
            {["RS", "PM", "AP", "SR"].map((initial, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--action-color)] to-[var(--dark-action-color)] flex items-center justify-center text-white font-semibold text-xs border-2 border-white"
              >
                {initial}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600 ml-2">
            <span className="font-bold text-[var(--action-color)]">20+</span>{" "}
            happy students
          </p>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>

      {/* Call to Action */}
      <div className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-[var(--action-color)] to-[var(--dark-action-color)] rounded-2xl p-8 md:p-12 text-center shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Transform Your Project Experience?
        </h2>
        <p className="text-white/90 text-lg mb-6">
          Join thousands of students who are already using our platform to get
          the components they need
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-white text-[var(--action-color)] font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
        >
          Start Bidding Now
        </button>
      </div>
    </div>
  );
}

export default Testimonials;
