import { Star, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface SkillCardProps {
  id: string;
  title: string;
  category: string;
  mentor: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  image?: string;
}

const SkillCard = ({ id, title, category, mentor, rating, reviews, price, duration }: SkillCardProps) => (
  <div className="card-hover group overflow-hidden rounded-xl border border-border bg-card">
    <div className="aspect-video bg-muted flex items-center justify-center">
      <span className="text-4xl font-extrabold text-muted-foreground/20">{category}</span>
    </div>
    <div className="p-5">
      <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
        {category}
      </span>
      <h3 className="mb-1 text-base font-bold text-card-foreground line-clamp-2">{title}</h3>
      <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
        <User className="h-3 w-3" /> {mentor}
      </div>
      <div className="mb-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-gold-dark">
          <Star className="h-4 w-4 fill-gold text-gold" />
          <span className="font-semibold">{rating}</span>
          <span className="text-muted-foreground">({reviews})</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> {duration}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-extrabold text-foreground">${price}</span>
        <Button variant="gold" size="sm" asChild>
          <Link to={`/skills/${id}`}>Book Now</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default SkillCard;
