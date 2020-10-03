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
      <ul className="grid lg:grid-cols-2 gap-4 content-start p-4 bg-ruuk-gray-100 h-full">
        {allBlogs.length >= 1 &&
          allBlogs.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/[slug]`}
              as={`/blog/${post.slug}`}
            >
              <a>
                <li className="flex flex-col lg:flex-row rounded-lg overflow-hidden bg-white m-auto bg-ruuk-gray-200">
                  {post.frontmatter.hero_image && (
                    <div className="">
                      <img
                        className="w-full h-32 lg:w-64 object-cover"
                        src={post.frontmatter.hero_image}
                        alt={post.frontmatter.hero_image}
                      />
                    </div>
                  )}
                  {!post.frontmatter.hero_image && (
                    <div className="h-32 w-64 bg-white"></div>
                  )}

                  <div className="flex flex-col justify-between p-4">
                    <div>
                      <h2 className="font-semibold">
                        {post.frontmatter.title}
                      </h2>
                      <p className="mb-4">
                        <ReactMarkdown source={post.frontmatter.summary} />
                      </p>
                    </div>
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
