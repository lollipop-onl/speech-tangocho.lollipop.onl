/** Route */
export type Route = {
  path: string;
  matcher(matchedPath: string): boolean;
};
