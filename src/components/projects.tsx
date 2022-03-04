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
          gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
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
      hi, I'm Sam. I'm a Software Engineer at       <Styled.a href="https://www.nlight.net/">
             nLIGHT
            </Styled.a>, where I work on computer graphics and real-time rendering for novel, high-resolution 3D cameras. </br>

I have a B.A. from Tulane University, where I double majored in Music and Computer Science with a minor in Music Science and Technology. I graduated in May 2020.
</br>

      {` `}
      <Styled.a href="samuel.beebe@gmail.com">
       samuel.beebe@gmail.com
      </Styled.a>
      <br/>
<br/>



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
