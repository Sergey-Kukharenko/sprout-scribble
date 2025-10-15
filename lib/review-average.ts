export const getReviewAverage = (reviews: number[]) =>
  reviews.reduce((acc, review) => acc + review, 0) / reviews.length || 0;
