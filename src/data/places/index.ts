export { hunzaPlaces, hunzaPlaceSlugs } from "./hunza";
export { skarduPlaces, skarduPlaceSlugs } from "./skardu";
export { gilgitPlaces, gilgitPlaceSlugs } from "./gilgit";
export { nagarPlaces, nagarPlaceSlugs } from "./nagar";

import { hunzaPlaces } from "./hunza";
import { skarduPlaces } from "./skardu";
import { gilgitPlaces } from "./gilgit";
import { nagarPlaces } from "./nagar";

export const allPlaces = [
  ...hunzaPlaces,
  ...skarduPlaces,
  ...gilgitPlaces,
  ...nagarPlaces,
];
