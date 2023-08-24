type QueryValue = string | { $regex: string; $options: string };

export interface BadgeQueryInterface {
  $or?: Array<{
    [key: string]: QueryValue;
  }>;
}
