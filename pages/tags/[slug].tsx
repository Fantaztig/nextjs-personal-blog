import matter from "gray-matter";
import Layout from "../../components/Layout";
import BlogList from "../../components/BlogList";
import orderBy from "lodash/orderBy";
import React from "react";
import fs from "fs";

const TagList = (props) => {
  return (
    <Layout
      pathname="/"
      siteTitle={props.title}
      siteDescription={props.description}
    >
      <section className="h-full">
        <h1 className="text-3xl font-bold p-4 bg-ruuk-gray-100 text-center">
          Blog entries for tag '{props.tag}'
        </h1>
        <BlogList allBlogs={props.allBlogs} />
      </section>
    </Layout>
  );
};

export default TagList;

export async function getStaticProps({ ...ctx }) {
  const { slug } = ctx.params;
  const siteConfig = await import(`../../data/config.json`);
  //get posts & context from folder
  const blogPostFolder = "./posts";

  const mdFiles = fs.readdirSync(blogPostFolder);

  const posts = mdFiles
    .map((file) => {
      const grayMatter = matter.read(`${blogPostFolder}/${file}`);
      const slug = file
        .replace(/^.*[\\\/]/, "")
        .split(".")
        .slice(0, -1)
        .join(".");
      return {
        frontmatter: grayMatter.data,
        markdownBody: grayMatter.content,
        slug: slug,
      };
    })
    .filter((post) => {
      return post.frontmatter.tags?.split(",").includes(slug);
    });

  return {
    props: {
      allBlogs: orderBy(posts, "frontmatter.date", "desc"),
      title: siteConfig.default.title,
      description: siteConfig.default.description,
      tag: slug,
    },
  };
}

export async function getStaticPaths() {
  const tagSlugs = [];
  const blogPostFolder = "./posts";
  const mdFiles = fs.readdirSync(blogPostFolder);
  mdFiles.forEach((file) => {
    const grayMatter = matter.read(`${blogPostFolder}/${file}`);
    if (grayMatter.data?.tags) {
      grayMatter.data.tags.split(",").forEach((tag) => {
        if (!tagSlugs.includes(tag)) {
          tagSlugs.push(tag);
        }
      });
    }
  });

  // create paths with `slug` param
  const paths = tagSlugs
    .filter((slug) => !!slug)
    .map((slug) => `/tags/${slug}`);
  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}
