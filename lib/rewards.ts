/**
 * The swag catalogue, kept in one place so the rewards section and the terms
 * page can never drift apart on what an item costs.
 */
export interface SwagItem {
  name: string;
  /** Points deducted on redemption, or null when the team prices it case by case. */
  points: number | null;
  /** Product shot. Items without one fall back to a drawn placeholder. */
  image?: string;
  /** Short qualifier shown under the name. */
  note?: string;
}

/** Ordered cheapest first, so the first reward always looks reachable. */
export const SWAG_ITEMS: SwagItem[] = [
  {
    name: "Keychain",
    points: 30,
    image: "/Merch-CA/Keychain.png",
  },
  {
    name: "Sticker Sheet",
    points: 30,
    image: "/Merch-CA/Sticker_Sheet.png",
  },
  {
    name: "Certificate",
    points: 40,
    note: "Issued physically. Can be co-branded with your club or college on request.",
  },
  {
    name: "Cap",
    points: 120,
    image: "/Merch-CA/Cap.png",
  },
  {
    name: "Mobile Phone Holder",
    points: 150,
    image: "/Merch-CA/Phone-Holder.png",
  },
  {
    name: "Bottle",
    points: 500,
    image: "/Merch-CA/Bottle.png",
  },
  {
    name: "Amazon Gift Card",
    points: null,
    image: "/Merch-CA/Amazon-Gift-Card-Voucher-PNG-Image.webp",
    note: "Value is decided by the team, case to case.",
  },
];
