/** @jsx jsx */
import { animated, useSpring, config } from "react-spring"
import { Container, jsx, Flex, Heading } from "theme-ui"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Layout from "./layout"
import SEO from "./seo"
import { ChildImageSharp } from "../types"
import Hero from "./hero"

type PageProps = {
  data: {
    page: {
      title: string
      slug: string
      excerpt: string
      body: string
      cover: ChildImageSharp
    }
  }
}

const Page = ({ data: { page } }: PageProps) => {
  const titleProps = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: `translate3d(0, 30px, 0)` },
    to: { opacity: 0, transform: `translate3d(0, 300px, 0)` },
  })
  const contentProps = useSpring({ config: config.slow, delay: 1000, from: { opacity: 1 }, to: { opacity: 1 } })

  return (
    <Layout>
      <SEO title={page.title} description={page.excerpt} pathname={page.slug} />

      <Container>
        <animated.div style={contentProps}>
          <MDXRenderer>{page.body}</MDXRenderer>
        </animated.div>
      </Container>
    </Layout>
  )
}

export default Page
