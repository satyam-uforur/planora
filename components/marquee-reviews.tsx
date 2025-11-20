"use client"

import { cn } from "@/lib/utils"

const reviews = [
  {
    name: "Priya & Arjun",
    username: "Wedding 2025",
    body: "Planora made our wedding planning stress-free! The team's attention to detail was amazing. Highly recommend!",
    img: "https://avatar.vercel.sh/priya",
  },
  {
    name: "Emma Watson",
    username: "Birthday Party",
    body: "Best birthday party setup ever! The decorations were exactly what I imagined. Thank you, Planora!",
    img: "https://avatar.vercel.sh/emma",
  },
  {
    name: "Rajesh Kumar",
    username: "Corporate Event",
    body: "Professional, creative, and within budget. Planora handled everything perfectly. Will definitely book again!",
    img: "https://avatar.vercel.sh/rajesh",
  },
  {
    name: "Sophia Rodriguez",
    username: "Baby Shower",
    body: "The baby shower was absolutely beautiful! Every detail was perfect. Can't thank Planora enough.",
    img: "https://avatar.vercel.sh/sophia",
  },
  {
    name: "James Mitchell",
    username: "Anniversary Party",
    body: "Exceeded all expectations! The team went above and beyond to make our celebration special.",
    img: "https://avatar.vercel.sh/james",
  },
  {
    name: "Anita Patel",
    username: "Family Event",
    body: "From start to finish, Planora was fantastic. Smooth coordination and stunning execution!",
    img: "https://avatar.vercel.sh/anita",
  },
]

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string
  name: string
  username: string
  body: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt={name} src={img || "/placeholder.svg"} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">{name}</figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  )
}

export function MarqueeDemo() {
  const firstRow = reviews.slice(0, reviews.length / 2)
  const secondRow = reviews.slice(reviews.length / 2)

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - 1rem)); }
        }
        
        @keyframes marquee-reverse {
          from { transform: translateX(calc(-100% - 1rem)); }
          to { transform: translateX(0); }
        }
        
        .marquee-forward {
          animation: marquee 30s linear infinite;
        }
        
        .marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }
        
        .marquee-container:hover .marquee-forward,
        .marquee-container:hover .marquee-reverse {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-container relative w-full overflow-hidden">
        <div className="marquee-forward flex gap-4 w-fit">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
          {firstRow.map((review) => (
            <ReviewCard key={`${review.username}-dup`} {...review} />
          ))}
        </div>
      </div>

      <div className="marquee-container relative w-full overflow-hidden mt-4">
        <div className="marquee-reverse flex gap-4 w-fit">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
          {secondRow.map((review) => (
            <ReviewCard key={`${review.username}-dup`} {...review} />
          ))}
        </div>
      </div>

      <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
      <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
    </div>
  )
}
