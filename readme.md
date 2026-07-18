
# Poly Dental Clinic Static Website

A pure HTML, CSS, and JavaScript website for a modern dental clinic using a black, white, and gold visual system.

## Pages

- Home: `index.html`
- About: `about.html`
- Services: `services.html`
- Gallery: `gallery.html`
- Contact: `contact.html`

## Features

- Pure static stack with no framework dependencies
- Fully responsive multi-page layout
- Semantic HTML structure for better accessibility and SEO
- Page-specific titles, descriptions, canonical tags, and Open Graph tags
- JSON-LD schema markup on the homepage for a dental practice
- `robots.txt` and `sitemap.xml` included
- `site.webmanifest` and SVG favicon included
- Front-end contact form validation ready for backend integration
- Mobile navigation and scroll reveal interactions powered by vanilla JavaScript

## Project Structure

```text
.
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   |-- images/
|   |   `-- favicon.svg
|   `-- js/
|       `-- script.js
|-- contact.html
|-- gallery.html
|-- about.html
|-- index.html
|-- robots.txt
|-- services.html
|-- site.webmanifest
|-- sitemap.xml
`-- README.md
```

## Local Preview

Open `index.html` directly in a browser, or serve the folder with a local static server.

Example using Python:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deployment Notes

- Update all canonical URLs, Open Graph URLs, `robots.txt`, and `sitemap.xml` with your final production domain.
- Replace the placeholder clinic contact details with real business information.
- Replace gallery placeholders with real clinic photography for stronger trust and conversion.
- Connect the form in `contact.html` to your backend or a form service if you want submissions to be delivered.

## SEO Checklist

- Add a real domain before launch
- Submit `sitemap.xml` to Google Search Console and Bing Webmaster Tools
- Compress and add real gallery images with descriptive file names and alt text
- Add a favicon and social share image if branding assets are available
- Review metadata after final copy and contact details are approved