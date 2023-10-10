export interface AffiliateConfigQueryInterface {
  isActive: boolean | undefined;
  $or?: Array<{ [key: string]: { $regex: string; $options: string } }>;
}
