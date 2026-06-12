/**
 * Curated Unsplash photography for Jejau.
 *
 * These URLs were fetched once via the official Unsplash API (search +
 * `download_location` triggered per their guidelines) and hard-coded here so
 * the build is fully static and stable — no request at build or runtime.
 *
 * Attribution requirements (https://help.unsplash.com/en/articles/2511315):
 *  - hot-link to images.unsplash.com (we do, via next/image)
 *  - credit the photographer + Unsplash, with UTM referral params
 * The credits surface in the footer and on each image, built from this data.
 */

const UTM = "utm_source=jejau&utm_medium=referral";

export type UnsplashPhoto = {
  /** Stable source URL on images.unsplash.com (we add sizing params per use). */
  src: string;
  /** Short alt text for the photo. */
  alt: string;
  photographer: string;
  /** Unsplash @username. */
  username: string;
  /** Canonical photo page on Unsplash. */
  photoUrl: string;
};

function base(id: string) {
  return `https://images.unsplash.com/photo-${id}`;
}

export const photographerUrl = (username: string) =>
  `https://unsplash.com/@${username}?${UTM}`;

export const photoCreditUrl = (photo: UnsplashPhoto) =>
  `${photo.photoUrl}?${UTM}`;

export const unsplashUrl = `https://unsplash.com/?${UTM}`;

/** Aerial green crop rows — grounds the brand in real agriculture. */
export const AGRICULTURE: UnsplashPhoto = {
  src: base("1516822277566-bb38424a2b77"),
  alt: "Aerial view of green agricultural crop rows stretching to the horizon",
  photographer: "jean wimmerlin",
  username: "jwimmerli",
  photoUrl:
    "https://unsplash.com/photos/birds-eye-view-photo-of-plant-fields-RUj5b4YXaHE",
};

/** Sunlight through a single leaf — veins read like glowing circuitry. */
export const LEAF_CIRCUITRY: UnsplashPhoto = {
  src: base("1764206816417-0e180f17f21b"),
  alt: "Sunlight glowing through the translucent veins of a single green leaf",
  photographer: "瑞秋 Z",
  username: "zxd0615",
  photoUrl:
    "https://unsplash.com/photos/sunlight-shines-through-a-large-green-leaf-TBaIfHtTDlo",
};

/** Lush forest canopy from above — warmth for the About page. */
export const FOREST_CANOPY: UnsplashPhoto = {
  src: base("1646928234724-ddfac30993e6"),
  alt: "Aerial view of a dense, lush green forest canopy",
  photographer: "Geio Tischler",
  username: "oww",
  photoUrl:
    "https://unsplash.com/photos/an-aerial-view-of-a-lush-green-forest-UtilSW8zuZk",
};

/** Every photo used on the site, for the footer credit list. */
export const ALL_PHOTOS: UnsplashPhoto[] = [
  AGRICULTURE,
  LEAF_CIRCUITRY,
  FOREST_CANOPY,
];

/**
 * Build a sized source URL. We request a generously sized, auto-formatted,
 * cropped image; next/image re-optimises it per device on top.
 */
export function photoSrc(
  photo: UnsplashPhoto,
  { w = 2400, q = 80 }: { w?: number; q?: number } = {}
) {
  return `${photo.src}?auto=format&fit=crop&w=${w}&q=${q}`;
}
