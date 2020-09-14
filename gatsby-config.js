require(`dotenv`).config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
      siteTitle: `sambee.be`,
      siteTitleAlt: `sambee.be`,
      siteHeadline: `stuff`,
      siteUrl: `https://sambee.be`,
      siteDescription: `stuff`,
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
        description: `Sam Beebe portfolio`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#000000`,
        display: `standalone`,
        icons: [
          {
            src: `/android-icon-192x192.png`,
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
