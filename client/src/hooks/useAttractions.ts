import { useQuery } from "@tanstack/react-query";
import { Attraction } from "@/lib/types";

// Hook to fetch all attractions
export const useAttractions = (categoryFilter?: string) => {
  const queryKey = categoryFilter 
    ? ['/api/attractions', { category: categoryFilter }]
    : ['/api/attractions'];
    
  return useQuery<Attraction[]>({
    queryKey,
    refetchOnWindowFocus: false,
  });
};

// Hook to fetch a single attraction by ID
export const useAttraction = (id: number | null) => {
  return useQuery<Attraction>({
    queryKey: [`/api/attractions/${id}`],
    enabled: id !== null,
    refetchOnWindowFocus: false,
  });
};

// Hook to fetch featured attractions
export const useFeaturedAttractions = () => {
  return useQuery<Attraction[]>({
    queryKey: ['/api/attractions/featured'],
    refetchOnWindowFocus: false,
  });
};

// Utility function to filter attractions by category
export const filterAttractionsByCategory = (
  attractions: Attraction[] | undefined,
  category: string
): Attraction[] => {
  if (!attractions) return [];
  
  if (category === "all") {
    return attractions;
  }
  
  return attractions.filter(attraction => 
    attraction.category.toLowerCase().includes(category.toLowerCase())
  );
};

// Utility function to render star ratings
export const renderStarRating = (ratingText: string) => {
  const ratingValue = parseFloat(ratingText.split('/')[0]);
  
  return {
    fullStars: Math.floor(ratingValue),
    hasHalfStar: !Number.isInteger(ratingValue),
    emptyStars: 5 - Math.ceil(ratingValue)
  };
};
