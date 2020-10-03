import Layout from "../components/Layout";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

export default function Info({ frontmatter, markdownBody, title }) {
  return (
    <Layout
      pathname="info"
      bgColor={frontmatter.background_color}
      siteTitle={title}
    >
      <section className="info_blurb">
        <ReactMarkdown source={markdownBody} />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const content = await import(`../data/info.md`);
  const config = await import(`../data/config.json`);
  const data = matter(content.default);

  return {
    props: {
      title: config.title,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}
