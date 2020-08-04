import matter from 'gray-matter'
import Layout from '../../components/Layout'
import BlogList from '../../components/BlogList'
import orderBy from 'lodash/orderBy'
import React from "react";

const TagList = props => {
    return (
        <Layout
            pathname="/"
            siteTitle={props.title}
            siteDescription={props.description}
        >
            <section className="bg-red-100 h-full">
                <BlogList allBlogs={props.allBlogs} />
            </section>
        </Layout>
    )
}

export default TagList

export async function getStaticProps({ ...ctx }) {
    const { slug } = ctx.params
    const siteConfig = await import(`../../data/config.json`)
    //get posts & context from folder
    const posts = (context => {
        const keys = context.keys()
        const values = keys.map(context)

        const data = keys.map((key, index) => {
            // Create slug from filename
            const slug = key
                .replace(/^.*[\\\/]/, '')
                .split('.')
                .slice(0, -1)
                .join('.')
            const value = values[index]
            // Parse yaml metadata & markdownbody in document
            const document = matter(value.default)
            return {
                frontmatter: document.data,
                markdownBody: document.content,
                slug,
            }
        }).filter(post => {
            return post.frontmatter.tags?.split(",").includes(slug)
        });
        return data
    })(require.context('../../posts', true, /\.md$/))

    return {
        props: {
            allBlogs: orderBy(posts, 'frontmatter.date',"desc"),
            title: siteConfig.default.title,
            description: siteConfig.default.description,
        },
    }
}

export async function getStaticPaths() {
    const tagSlugs = [];
    (context => {
        const keys = context.keys()
        const values = keys.map(context)

        keys.map((key, index) => {
            const value = values[index]
            // Parse yaml metadata & markdownbody in document
            const document = matter(value.default)
            return document.data.tags || ""
        }).forEach(tags => {
            tags?.split(",").forEach(tag => {
                if (!tagSlugs.includes(tag)){
                    tagSlugs.push(tag);
                }
            })
        });
    })(require.context('../../posts', true, /\.md$/))

    // create paths with `slug` param
    const paths = tagSlugs.filter(slug => !!slug).map(slug => `/tags/${slug}`)
    console.log(paths)
    return {
        paths,
        fallback: false,
    }
}
