import * as matter from "gray-matter";
import Layout from "../components/Layout";
import BlogList from "../components/BlogList";
import orderBy from "lodash/orderBy";
import * as fs from "fs";

const Index = (props) => {
  return (
    <Layout
      pathname="/"
      siteTitle={props.title}
      siteDescription={props.description}
    >
      <section className="h-full">
        <h1 className="text-3xl font-bold p-4 bg-ruuk-gray-100 text-center">
          All blog entries so far
        </h1>
        <BlogList
          allBlogs={orderBy(props.allBlogs, "frontmatter.date", "desc")}
        />
      </section>
    </Layout>
  );
};

export default Index;

export async function getStaticProps() {
  const siteConfig = await import(`../data/config.json`);
  //get posts & context from folder
  const blogPostFolder = "./posts";

  const mdFiles = fs.readdirSync(blogPostFolder);

  const posts = mdFiles.map((file) => {
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
  });

  return {
    props: {
      allBlogs: posts,
      title: siteConfig.default.title,
      description: siteConfig.default.description,
    },
  };
}
