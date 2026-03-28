import { buildBusinessContactItems, buildSiteConfig, getEditableSiteContent } from "@/lib/content";
import { mapServicesWithIcons } from "@/lib/site";

export async function getSiteContentData() {
  const content = await getEditableSiteContent();

  return {
    content,
    siteConfig: buildSiteConfig(content),
    services: mapServicesWithIcons(content.services.items),
    aboutValues: content.about.values,
    contactServices: content.services.items.map((service) => service.title),
    businessContactItems: buildBusinessContactItems(content)
  };
}
