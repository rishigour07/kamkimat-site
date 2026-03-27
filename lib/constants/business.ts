export const businessInfo = {
  name: "Kamkimat",
  email: "kamkimat67@gmail.com",
  phone: "9111256684",
  address: "78 Vijay Nagar, Indore",
  domain: "www.kamkimat.com"
} as const;

export const businessContactItems = [
  { label: "Email", value: businessInfo.email, href: `mailto:${businessInfo.email}` },
  { label: "Mobile", value: businessInfo.phone, href: `tel:${businessInfo.phone}` },
  { label: "Office", value: businessInfo.address, href: undefined }
] as const;
