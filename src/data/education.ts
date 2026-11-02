export type Education = {
  programme: string;
  institution: string;
  period: string;
  /** University gets the visual emphasis. */
  primary: boolean;
};

export const education: Education[] = [
  {
    programme: "Information Systems",
    institution: "BINUS University",
    period: "2023 – 2027",
    primary: true,
  },
  {
    programme: "IPS – Social Sciences",
    institution: "SMA Dharma Suci",
    period: "2020 – 2023",
    primary: false,
  },
  {
    programme: "Junior High School",
    institution: "SMP Sukses Abadi",
    period: "2017 – 2020",
    primary: false,
  },
];
