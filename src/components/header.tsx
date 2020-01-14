/** @jsx jsx */
import { Header as ThemeHeader, jsx, useColorMode, Styled } from "theme-ui"
import { Link } from "gatsby"
import Navigation from "./navigation"
import SocialLinks from "./social-links"

type MetaType = {
  meta: {
    [key: string]: string
  }
  nav: {
    title: string
    slug: string
  }[]
}

const Header = ({ meta, nav }: MetaType) => {
  const [colorMode, setColorMode] = useColorMode()
  const isDark = colorMode === `dark`
  const toggleColorMode = (e: any) => {
    setColorMode(isDark ? `light` : `dark`)
  }

  const navEmpty = nav.length === 0

  return (
    <ThemeHeader>
      {!navEmpty && <Navigation nav={nav} />}
      <div
        sx={{

          fontSize: 3,
          display: `flex`,
          flex: navEmpty ? 1 : [`1 0 100%`, 1],
          justifyContent: navEmpty ? `flex-start` : `center`,
          order: [1, 2],
          zIndex: 1,
        }}
      >
        <Styled.a
          // aria-label={`${"Sam Beebe"}, Back to homepage`}  // {meta.siteTitle}
          aria-label={`Sam`}
          as={Link}
          sx={{ color: `text`, ":hover": { color: `primary`, textDecoration: `none` } }}
          to="/"
        >
        Sam Beebe
        </Styled.a>
      </div>
      <div
        sx={{
          a: {
            fontSize: 4,
            color: `text`,
            display: `flex`,
            alignItems: `center`,
            "&:hover": {
              color: `primary`,
            },
            "&:not(:first-of-type)": {
              ml: 2,
            },
          },
          justifyContent: `flex-end`,
          flex: 1,
          display: `flex`,
          order: 3,
          zIndex: 1,
        }}
      >
<SocialLinks />

      </div>
    </ThemeHeader>
  )
}

export default Header
