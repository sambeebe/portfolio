import React from "react"
import * as ReactDOM from "react-dom";
import { useMousePosition } from "./useMousePosition";
import { Global } from "@emotion/core"
import { Box, jsx, Container, Styled  } from "theme-ui"
import useSiteMetadata from "../hooks/use-site-metadata"
import useNavigation from "../hooks/use-navigation"
import Footer from "./footer"
import Header from "./header"
import SEO from "./seo"
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//
var uniforms;
uniforms = {
   time: { value: 1.0 },
   mouseX: { value: 1.0 },
   mouseY: { value: 1.0 }
 };
const style = {
  position: `fixed`,
  width: "100%",
  height: "100%",
  zIndex: -1000,
  opacity:"1",
  // background: "white",
};

var timestamp = 1;

      var x = null;
      var y = null

      export class App extends React.Component<{}> {
        componentDidMount() {
          this.sceneSetup();
          this.addCustomSceneObjects();
          this.startAnimationLoop();
          window.addEventListener("resize", this.handleWindowResize);
        }

        componentWillUnmount() {
          window.removeEventListener("resize", this.handleWindowResize);
          window.cancelAnimationFrame(this.requestID);
          this.controls.dispose();
        }

        // Standard scene setup in Three.js. Check "Creating a scene" manual for more information
        // https://threejs.org/docs/#manual/en/introduction/Creating-a-scene
        sceneSetup = () => {
          // get container dimensions and use them for scene sizing
          const width = this.el.clientWidth;
          const height = this.el.clientHeight;

          this.scene = new THREE.Scene();
          this.camera = new THREE.PerspectiveCamera(
            75, // fov = field of view
            width / height, // aspect ratio
            0.1, // near plane
            1000 // far plane
          );
          this.controls = new OrbitControls(this.camera, this.el);
          this.renderer = new THREE.WebGLRenderer();
          this.renderer.setClearColor( 0xffffff, 0);
          this.renderer.setSize(width, height);
          this.el.appendChild(this.renderer.domElement); // mount using React ref
        };

        addCustomSceneObjects = () => {


        var vertex = `
        varying vec2 vUv;
                    void main()    {
                        vUv = uv;
                        gl_Position = vec4( position, 1.0 );
                    }
        `;

        var frag = `varying vec2 vUv;
                    uniform float time;
                    uniform float mouseX;
                    uniform float mouseY;

                    vec3 niceGrad(in vec2 uv)
                    {
                        float w = .1;
                        float q = .7;
                        float a = sqrt(1.0-uv.y);
                        vec3 w3 = vec3(w,w*2.0,w*4.0);
                        float h = pow((mouseY*.50)/ uv.y,1.0 / 15.0);
                        h = 1.0 - clamp(h,0.2,1.0);
                        vec3 hh = mix(vec3(1.0),vec3(1.0,q,0.0) * 1.5,h);
                        return mix(w3,vec3(hh),a / 1.3);
                    }

                    void main()	{
                      vec2 uv = vUv;
                      vec3 grad = niceGrad(uv);
                      vec3 col = 0.5 + 0.5*cos((mouseX*.00075)+uv.xyx+vec3(0,2,4));
                      col = mix(grad,col,.5);
                      //col *= .75;
                      gl_FragColor = vec4(col,1.0);
                    }

        // `;


            document.addEventListener("mousemove", onMouseUpdate, false);
            document.addEventListener("mouseenter", onMouseUpdate, false);

            function onMouseUpdate(e) {
              x = e.pageX;
              y = e.pageY;

            }

            function getMouseX() {
              return x;
            }

            function getMouseY() {
              return y;
            }
          const geo = new THREE.PlaneBufferGeometry(2, 2);
          const geometry = new THREE.CubeGeometry(2);

          const mat = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertex,
            fragmentShader: frag,
            transparent: true,
            blending: THREE.NormalBlending,
            depthTest: false,
            depthWrite: false
          });
          this.scene.add(this.cube);
          this.mesh = new THREE.Mesh(geo, mat);

          this.scene.add(this.mesh);

          const lights = [];



        };

        startAnimationLoop = () => {


          timestamp += 0.0095;

          uniforms["time"].value = timestamp;
                uniforms["mouseX"].value = x;
                uniforms["mouseY"].value = y;
          this.renderer.render(this.scene, this.camera);

          // The window.requestAnimationFrame() method tells the browser that you wish to perform
          // an animation and requests that the browser call a specified function
          // to update an animation before the next repaint
          this.requestID = window.requestAnimationFrame(this.startAnimationLoop);
        };

        handleWindowResize = () => {
          const width = this.el.clientWidth ;
          const height = this.el.clientHeight;

          this.renderer.setSize(width, height);
          this.camera.aspect = width / height;
          this.camera.updateProjectionMatrix();
        };

        render() {
          return <div style={style} ref={ref => (this.el = ref)} />;
        }
      }

type LayoutProps = { children: React.ReactNode; className?: string }

const Layout = ({ children, className = `` }: LayoutProps) => {
  const meta = useSiteMetadata()
  const nav = useNavigation()

  return (
    <React.Fragment>

      <Global
        styles={(theme) => ({
          "*": {
            boxSizing: `inherit`,
          },
          html: {
            WebkitTextSizeAdjust: `100%`,
          },
          img: {
            borderStyle: `none`,
          },
          pre: {
            fontFamily: `Times New Roman`,
            fontSize: `1em`,
          },
          "[hidden]": {
            display: `none`,
          },
          "::selection": {
            backgroundColor: theme.colors.text,
            color: theme.colors.background,
          },
          a: {
            transition: `all 0.3s ease-in-out`,
          },
        })}
      />
      <SEO />
      <App/>
      <Header meta={meta} nav={nav} />

      <Box as="main" variant="layout.main" className={className}>
        {children}
      </Box>



    </React.Fragment>

  )
}

export default Layout
