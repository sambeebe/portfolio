/* eslint react/display-name: 0 */
import React, { Component } from "react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { useTrail } from "react-spring";
import styled from "styled-components";
import { Layout, ProjectItem } from "../components";

import * as THREE from "three";
const ListWrapper = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-gap: 1rem;
  /* margin: 1rem; */
  padding: 1.5rem;
  border-radius: 1rem;
  /* font: 12px system-ui; */
  /* grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-column-gap: 20px;

  grid-row-gap: 20px; */
  width: 100%;
`;

const Index = ({
  data: {
    allMdx: { nodes: projectEdges }
  },
  location
}) => {
  const trail = useTrail(projectEdges.length, {
    from: { height: "0%" },
    to: { height: "100%" }
  });

  return (
    <Layout pathname={location.pathname}>
      <ListWrapper>
        {trail.map((style, index) => (
          <ProjectItem
            testid={`projectItem-${index}`}
            style={style}
            key={projectEdges[index].fields.slug}
            node={projectEdges[index]}
          />
        ))}
      </ListWrapper>
    </Layout>
  );
};
class App extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    var animate = function() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }
  render() {
    return <div ref={ref => (this.mount = ref)} />;
  }
}

// export default () => (
//   <div>
//     <App />
//     <Index />
//   </div>
// );

export default Index;

Index.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          fields: PropTypes.shape({
            slug: PropTypes.string
          }),
          frontmatter: PropTypes.shape({
            service: PropTypes.string,
            color: PropTypes.string,
            client: PropTypes.string,
            cover: PropTypes.any
          })
        })
      )
    })
  }).isRequired,
  location: PropTypes.object.isRequired
};

export const pageQuery = graphql`
  query IndexQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "projects" } } }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          service
          color
          client
          cover {
            childImageSharp {
              fluid(
                maxWidth: 850
                quality: 90
                traceSVG: { color: "#f3f3f3" }
              ) {
                ...GatsbyImageSharpFluid_withWebp_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;
