export function createSlug(input: string) {
  const slug = input
    .trim()
    .toLowerCase() // Convert to lowercase
    .replace(/[^a-z0-9]/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/-+/g, "-") // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-|-$/g, ""); // Remove leading and trailing hyphens

  return slug;
}
