require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
      siteTitle: `sam beebe`,
      siteTitleAlt: ``,
      siteHeadline: ``,
      siteUrl: `https://sambee.be`,
      siteDescription: ``,
      siteLanguage: `en`,
      siteImage: ``,
      author: ``,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-emma`,
      // See the theme's README for all available options
      options: {},
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `sambee.be`,
        short_name: `sam`,
        description: ``,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#000000`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify`,
  ],
}
