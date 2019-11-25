/** @jsx jsx */
import { Footer as ThemeFooter, Styled, Flex, jsx } from "theme-ui"
import * as THREE from "three";

var timestamp = 1;
var rand = Math.floor(Math.random() * 2 + 1);
var mouseX = 0,
  mouseY = 0;
function onDocumentMouseMove(event) {
  mouseX = event.clientX * 0.001;
  mouseY = event.clientY * 0.001;
}
document.addEventListener("mousemove", onDocumentMouseMove, false);

const Wrapper = styled.footer`
  /* margin: 1rem 0 1rem 0; */
  /* padding: 1rem ${props => props.theme.spacer.horizontal}; */
  height: 50%;
  left: 0;
  /* position: absolute; */
  top: 0;
  position: absolute;
  z-index: -1;
  width: 50%;
  text-align: center;
  color: ${props => props.theme.colors.grey};
  a {
    text-decoration: none;
    color: ${props => props.theme.brand.primary};
  }
`;

class App extends Component {
  componentDidMount() {
    // BASIC THREE.JS THINGS: SCENE, CAMERA, RENDERER
    // This code is taken from Three.js Creating a scene manual
    // https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75, // field of view
      window.innerWidth / window.innerHeight, // aspect ratio
      0.1, // near plane
      100 // far plane
    );
    // camera.position.z = 5;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    // MOUNT INSIDE OF REACT
    this.mount.appendChild(renderer.domElement); // mount a scene inside of React using a ref

    // ADD CUBE AND LIGHTS
    // https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry
    // https://threejs.org/docs/scenes/geometry-browser.html#BoxGeometry
    // var geometry = new THREE.BoxGeometry(2, 2, 2);
    var geo = new THREE.PlaneBufferGeometry(2, 2);
    // geo.onAfterRender = onAfterRender
    var uniforms;

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
                float hash(in vec2 p)
                {
                    p = fract(p * vec2(821.35, 356.17));
                    p += dot(p, p+23.5);
                    return fract(p.x*p.y);
                }

                float noise(in vec2 p)
                {
                    vec2 ipos = floor(p);
                    vec2 fpos = fract(p);

                    float a = hash(ipos + vec2(0, 0));
                    float b = hash(ipos + vec2(1, 0));
                    float c = hash(ipos + vec2(0, 1));
                    float d = hash(ipos + vec2(1, 1));

                    vec2 t = smoothstep(0.0, 1.0, fpos);
                    return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
                }

                float fbm(in vec2 p)
                {
                    p += 1.13;

                    float res = 0.0;
                    vec4  m  = iMouse / iResolution.xyxy;
                    m*=.05;
                    float amp = 0.5+m.x;
                    float freq = 2.0+m.y;
                    for (int i = 0; i < 6; ++i)
                    {
                        res += amp*noise(freq*p);
                        amp *= 0.5;
                        freq *= 2.0;
                    }
                    return res;
                }

                vec3 palette(float t)
                {
                    vec3 a = vec3(1, 1, 1);
                    vec3 b = vec3(0, 0.3, 0);
                    vec3 c = vec3(1, 0.7, 0);
                    vec3 d = vec3(1, 0, 0);

                    if (t < 0.333)
                    {
                        return mix(a, b, 3.0*t);
                    }
                    else if (t < 0.666)
                    {
                        return mix(b, c, 3.0*(t - 0.3333));
                    }
                    else
                    {
                        return mix(c, d, 3.0*(t - 0.6666));
                    }
                }
      void main()	{
        vec2 uv = vUv;

        gl_FragColor = vec4(1.,1.,0.,1.0);
      }

    // `;

    // `;
    const MyIframe = ({ url }) => <iframe src={"https://www.w3schools.com"} />;

    uniforms = {
      time: { value: 1.0 },
      mouseX: { value: 1.0 },
      mouseY: { value: 1.0 }
    };
    var mat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertex,
      fragmentShader: frag,
      transparent: true,
      blending: THREE.NormalBlending,
      depthTest: false,
      depthWrite: false
    });

    var mesh = new THREE.Mesh(geo, mat);

    scene.add(mesh);
    var x, y, coor;
    // ANIMATE THE SCENE
    var animate = function() {
      requestAnimationFrame(animate);

      timestamp += 0.095;

      uniforms["time"].value = timestamp / 10;
      uniforms["mouseX"].value = mouseX;
      uniforms["mouseY"].value = mouseY;

      renderer.render(scene, camera);
    };

    animate();
  }
  render() {
    return (
      <>
        <App />
      </>
    );
  }
}

const Footer = () => (
  <ThemeFooter>
    dfghjk
    <br />
    <Flex
      sx={{
        justifyContent: `center`,
        alignItems: `center`,
        mt: 3,
        color: `text`,
        fontWeight: `semibold`,
        a: { color: `text` },
      }}
    >
      <img width="30" height="30" src="https://img.lekoarts.de/gatsby/logo_w30.png" alt="LekoArts Logo" />
      {` `}
      <Styled.a
        aria-label="Link to the theme's GitHub repository"
        sx={{ ml: 2 }}
        href="https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-emma"
      >
        Theme
      </Styled.a>
      <div sx={{ mx: 1 }}>by</div>
      {` `}
      <Styled.a aria-label="Link to the theme author's website" href="https://www.lekoarts.de/en">
        LekoArts
      </Styled.a>
    </Flex>
  </ThemeFooter>
)

export default Footer
