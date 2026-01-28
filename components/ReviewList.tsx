import { Review, User } from "@prisma/client";

interface ReviewWithUser extends Review {
  user: {
    email: string;
  };
}

interface ReviewListProps {
  reviews: ReviewWithUser[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        Aucun avis publié pour le moment
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <div className="text-xl mr-2">
                {"⭐".repeat(review.rating)}
              </div>
              <span className="text-sm text-gray-600">
                {new Date(review.createdAt).toLocaleDateString("fr-FR")}
              </span>
            </div>
          </div>

          <p className="text-gray-700 mb-2">{review.comment}</p>
        </div>
      ))}
    </div>
  );
}
