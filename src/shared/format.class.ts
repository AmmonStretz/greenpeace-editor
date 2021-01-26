export interface Format {
  name: string;
  width: number;
  height: number;
}
export interface FormatGroup {
  name: string;
  formats: Format[];
}

export const formats: FormatGroup[] = [
  {
    name: "Facebook",
    formats: [
      { name: "Shared Image", width: 1200, height: 630 },
      { name: "Highlighted Image", width: 1200, height: 717 },
      { name: "Event Image", width: 1920, height: 1080 },
    ],
  },
  {
    name: "Twitter",
    formats: [
      { name: "Header Photo", width: 1500, height: 500 },
      { name: "Sharing a Single Image", width: 1200, height: 675 },
      { name: "Image with shared link", width: 1200, height: 628 },
    ],
  },
  {
    name: "Instagram",
    formats: [
      { name: "Photo Thumbnails", width: 161, height: 161 },
      { name: "Photo Size", width: 1080, height: 1920 },
      { name: "Stories", width: 1080, height: 1920 },
    ],
  },
  {
    name: "YouTube",
    formats: [
      { name: "Channel Cover Photo", width: 2048, height: 1152 }
    ],
  },
];