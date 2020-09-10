/** @jsx jsx */
import { jsx, Container, Styled } from "theme-ui"
import { useTrail } from "react-spring"
import Layout from "./layout"
import { ChildImageSharp } from "../types"
import ProjectItem from "./project-item"

type ProjectsProps = {
  projects: {
    color: string
    slug: string
    title: string
    service: string
    client: string
    cover: ChildImageSharp
  }[]
}

const Projects = ({ projects }: ProjectsProps) => {
  const trail = useTrail(projects.length, {

  })

  if (projects.length > 0) {
    return (
      <Layout>

    <div
        sx={{
          display: `grid`,
          gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
          padding: 3,
          gridColumnGap: 3,
          gridRowGap: 3,

          width: `100%`,
        }}
    >
    {trail.map((style, index) => (
      <ProjectItem style={style} node={projects[index]} key={projects[index].slug} />
    ))}
  </div>
  <Container>
    <Styled.p>
      <b>About</b> <br />
      I recently graduated from Tulane University, where I double majored in Music and Computer Science with a minor in Music Science and Technology. I like solving challenging problems at the intersection of art and technology, and strive to be the bridge between sound, light and interaction.
<br/>

Email: {` `}
      <Styled.a href="samuelbeebe@gmail.com">
       samuel.beebe@gmail.com
      </Styled.a>
<br/>
View {` `}
      <Styled.a href="https://docdro.id/hrA1lb6">
       resume
      </Styled.a>


    </Styled.p>
  </Container>
      </Layout>
    )
  }

  return (
    <Layout
      sx={{
        display: `grid`,
        gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
        padding: 3,
        gridColumnGap: 3,
        gridRowGap: 3,

        width: `100%`,
      }}
    >



      {trail.map((style, index) => (
        <ProjectItem style={style} node={projects[index]} key={projects[index].slug} />
      ))}


    </Layout>
  )
}

export default Projects
