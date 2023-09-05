export interface FeaturedQueryInterface {
  region: string | undefined;
  type: string | undefined;
  isActive: boolean;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
