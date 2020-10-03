import Link from "next/link";
import ReactMarkdown from "react-markdown";

const BlogList = ({ allBlogs }) => {
  function reformatDate(fullDate) {
    const date = new Date(fullDate);
    return date.toLocaleDateString("de", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  return (
    <>
      <ul className="p-4">
        {allBlogs.length >= 1 &&
          allBlogs.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/[slug]`}
              as={`/blog/${post.slug}`}
            >
              <a>
                <li
                  className="flex flex-row rounded-l-full overflow-hidden bg-white m-auto"
                  style={{
                    borderTopRightRadius: "2500px",
                    borderBottomRightRadius: "2500px",
                  }}
                >
                  {post.frontmatter.hero_image && (
                    <div className="">
                      <img
                        className="h-32"
                        src={post.frontmatter.hero_image}
                        alt={post.frontmatter.hero_image}
                      />
                    </div>
                  )}

                  <div className="flex flex-col justify-center pl-4 pr-16">
                    <h2 className="font-semibold">{post.frontmatter.title}</h2>
                    <p className="mb-4">
                      <ReactMarkdown source={post.frontmatter.summary} />
                    </p>
                    <span>{reformatDate(post.frontmatter.date)}</span>
                  </div>
                </li>
              </a>
            </Link>
          ))}
      </ul>
    </>
  );
};

export default BlogList;
