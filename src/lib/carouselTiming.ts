/**
 * Auto-advance timing shared by every carousel (hero + Selected Works cards), in ms.
 *  image      → image slide, mouse away
 *  hover      → while the mouse is over the carousel (counted from when it enters; for a video: from when it ends)
 *  videoExtra → extra wait after a video has ended (mouse away)
 */
export const timing = { image: 4000, hover: 7000, videoExtra: 2500 } as const
