import { Helmet } from "react-helmet-async";
import { BASE_URL, DEFAULT_DESCRIPTION } from "../constants";
import { useTheme } from "../theme/useTheme";

export const absoluteUrl = (path: string = '') => {
  if (path.startsWith('http')) return path;
  if (path.startsWith('/')) return `${BASE_URL}${path}`
  return `${BASE_URL}/${path}`
}

type getMetaTagsProps = {
  title: string;
  description: string;
  url: string;
  contentType: string;
  published: string;
  updated: string;
  category: string;
  tags: string[];
  twitter: string;
  image: string;
};
const getMetaTags = ({
  title,
  description,
  url,
  contentType,
  published,
  updated,
  category,
  tags,
  twitter,
  image,
}: getMetaTagsProps) => {
  const metaTags = [
    { itemprop: "name", content: title },
    { itemprop: "description", content: description },
    { name: "viewport", content: `width=device-width,initial-scale=1` },
    { name: "description", content: description },
    { name: "twitter:title", content: `${title} | ${BASE_URL}` },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@bbmariomaker2" },
    { name: "og:title", content: `${title} | ${BASE_URL}` },
    { name: "og:type", content: contentType },
    { name: "og:url", content: url },
    { name: "og:description", content: description },
    { name: "og:site_name", content: `${BASE_URL}` },
    { name: "og:locale", content: "en_EN" },
  ];

  if (published)
    metaTags.push({ name: "article:published_time", content: published });
  if (updated)
    metaTags.push({ name: "article:modified_time", content: updated });
  if (category) metaTags.push({ name: "article:section", content: category });
  if (tags) metaTags.push({ name: "article:tag", content: tags.join(",") });
  if (image) {
    metaTags.push({ itemprop: "image", content: image });
    metaTags.push({ name: "twitter:image", content: image });
    metaTags.push({ name: "og:image", content: image });
    metaTags.push({ name: "twitter:card", content: twitter });
    metaTags.push({ name: "twitter:image:alt", content: title });
  } else {
    metaTags.push({ name: "twitter:card", content: twitter });
  }

  return metaTags;
};

type getHtmlAttributesProps = {
  schema?: string;
};
const getHtmlAttributes = ({ schema }: getHtmlAttributesProps) => {
  let result = {
    lang: "en",
  };
  if (schema) {
    return {
      ...result,
      itemscope: undefined,
      itemtype: `http://schema.org/${schema}`,
    };
  }
  return result;
};

type SeoProps = {
  schema?: string;
  title?: string;
  description?: string;
  contentType?: string;
  updated?: string;
  category?: string;
  tags?: string[];
  twitter?: string;
  image?: string;
};

export function Seo({
  schema,
  title = "",
  description = DEFAULT_DESCRIPTION,
  contentType = "image/png",
  updated = new Date(Date.now()).toDateString(),
  category = "gaming",
  tags = ["Mario Maker 2", "Mario Maker Community Levels", "Mario Anniversary"],
  twitter = "summary",
  image = "",
}: Readonly<SeoProps>) {
  const { data, themeSlug } = useTheme();
  const published = data.batches[0].releaseDate.formatted;
  if (title === "") title = data.caps;
  tags.push(data.caps);
  return (
    <Helmet
      htmlAttributes={getHtmlAttributes({
        schema,
      })}
      title={title}
      link={[
        { rel: "icon", href: absoluteUrl(data.images.favicon.src) },
        {
          rel: "icon",
          sizes: "64_64",
          href: absoluteUrl(data.images.favicon_512x512.src),
        },
        {
          rel: "icon",
          sizes: "192x192",
          href: absoluteUrl(data.images.favicon_192x192.src),
        },
      ]}
      meta={getMetaTags({
        title,
        description,
        contentType,
        url: absoluteUrl(themeSlug),
        published,
        updated,
        category,
        tags,
        twitter,
        image: absoluteUrl(
          image !== "" ? image : data.images.favicon_512x512.src
        ),
      })}
    />
  );
};
