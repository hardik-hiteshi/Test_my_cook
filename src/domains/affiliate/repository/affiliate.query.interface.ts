export interface AffiliateQueryInterface {
  isActive: boolean | undefined;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
