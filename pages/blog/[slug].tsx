import * as React from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
const glob = require("glob");

import Layout from "../../components/Layout";
import Link from "next/link";

export default function BlogTemplate({ frontmatter, markdownBody, siteTitle }) {
  function reformatDate(fullDate) {
    const date = new Date(fullDate);
    return date.toLocaleDateString("de", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  /*
   ** Odd fix to get build to run
   ** It seems like on first go the props
   ** are undefined — could be a Next bug?
   */

  if (!frontmatter) return <></>;

  return (
    <Layout siteTitle={siteTitle}>
      <article>
        {frontmatter.hero_image && (
          <figure className="w-full">
            <img
              className="w-full"
              src={frontmatter.hero_image}
              alt={`${frontmatter.title}`}
            />
          </figure>
        )}
        <div className="blog__info">
          <h1>{frontmatter.title}</h1>
          <h3>{reformatDate(frontmatter.date)}</h3>
        </div>
        <div className="blog__body">
          <ReactMarkdown source={markdownBody} />
        </div>
        <h3 className="blog__footer justify-start">
          Tags:{" "}
          {frontmatter.tags?.split(",").map((tag) => {
            return (
              <Link key={tag} href={`/tags/[slug]`} as={`/tags/${tag}`}>
                <a className={"ml-2"}>[{tag}]</a>
              </Link>
            );
          })}
        </h3>
      </article>
    </Layout>
  );
}

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;
  const content = await import(`../../posts/${slug}.md`);
  const config = await import(`../../data/config.json`);
  const data = matter(content.default);

  return {
    props: {
      siteTitle: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}

export async function getStaticPaths() {
  //get all .md files in the posts dir
  const blogs = glob.sync("posts/**/*.md");

  //remove path and extension to leave filename only
  const blogSlugs = blogs.map((file) =>
    file.split("/")[1].replace(/ /g, "-").slice(0, -3).trim(),
  );

  // create paths with `slug` param
  const paths = blogSlugs.map((slug) => `/blog/${slug}`);
  return {
    paths,
    fallback: false,
  };
}
