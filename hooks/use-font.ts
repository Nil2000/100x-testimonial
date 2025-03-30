import { useState, useEffect } from "react";
const popularGoogleFonts = [
  {
    family: "Roboto",
    category: "sans-serif",
    variants: ["100", "300", "400", "500", "700", "900"],
  },
  {
    family: "Open Sans",
    category: "sans-serif",
    variants: ["300", "400", "600", "700", "800"],
  },
  {
    family: "Lato",
    category: "sans-serif",
    variants: ["100", "300", "400", "700", "900"],
  },
  {
    family: "Montserrat",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Roboto Condensed",
    category: "sans-serif",
    variants: ["300", "400", "700"],
  },
  {
    family: "Source Sans Pro",
    category: "sans-serif",
    variants: ["200", "300", "400", "600", "700", "900"],
  },
  {
    family: "Oswald",
    category: "sans-serif",
    variants: ["200", "300", "400", "500", "600", "700"],
  },
  {
    family: "Raleway",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Merriweather",
    category: "serif",
    variants: ["300", "400", "700", "900"],
  },
  {
    family: "Poppins",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  { family: "PT Sans", category: "sans-serif", variants: ["400", "700"] },
  {
    family: "Roboto Mono",
    category: "monospace",
    variants: ["100", "200", "300", "400", "500", "600", "700"],
  },
  { family: "Noto Sans", category: "sans-serif", variants: ["400", "700"] },
  {
    family: "Ubuntu",
    category: "sans-serif",
    variants: ["300", "400", "500", "700"],
  },
  {
    family: "Nunito",
    category: "sans-serif",
    variants: ["200", "300", "400", "600", "700", "800", "900"],
  },
  {
    family: "Playfair Display",
    category: "serif",
    variants: ["400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Rubik",
    category: "sans-serif",
    variants: ["300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Work Sans",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Inter",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Mukta",
    category: "sans-serif",
    variants: ["200", "300", "400", "500", "600", "700", "800"],
  },
  { family: "Lora", category: "serif", variants: ["400", "500", "600", "700"] },
  {
    family: "Fira Sans",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Nunito Sans",
    category: "sans-serif",
    variants: ["200", "300", "400", "600", "700", "800", "900"],
  },
  { family: "PT Serif", category: "serif", variants: ["400", "700"] },
  {
    family: "Titillium Web",
    category: "sans-serif",
    variants: ["200", "300", "400", "600", "700", "900"],
  },
  {
    family: "Quicksand",
    category: "sans-serif",
    variants: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Karla",
    category: "sans-serif",
    variants: ["200", "300", "400", "500", "600", "700", "800"],
  },
  {
    family: "Noto Sans JP",
    category: "sans-serif",
    variants: ["100", "300", "400", "500", "700", "900"],
  },
  {
    family: "Hind Siliguri",
    category: "sans-serif",
    variants: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Arimo",
    category: "sans-serif",
    variants: ["400", "500", "600", "700"],
  },
  {
    family: "IBM Plex Sans",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700"],
  },
  { family: "Noto Serif", category: "serif", variants: ["400", "700"] },
  {
    family: "DM Sans",
    category: "sans-serif",
    variants: ["400", "500", "700"],
  },
  {
    family: "Barlow",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Inconsolata",
    category: "monospace",
    variants: ["200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Josefin Sans",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700"],
  },
  {
    family: "Libre Franklin",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Cabin",
    category: "sans-serif",
    variants: ["400", "500", "600", "700"],
  },
  {
    family: "Source Code Pro",
    category: "monospace",
    variants: ["200", "300", "400", "500", "600", "700", "900"],
  },
  { family: "Abel", category: "sans-serif", variants: ["400"] },
  {
    family: "Crimson Text",
    category: "serif",
    variants: ["400", "600", "700"],
  },
  { family: "Libre Baskerville", category: "serif", variants: ["400", "700"] },
  {
    family: "Bitter",
    category: "serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Hind",
    category: "sans-serif",
    variants: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Cairo",
    category: "sans-serif",
    variants: ["200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Comfortaa",
    category: "display",
    variants: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Noto Sans KR",
    category: "sans-serif",
    variants: ["100", "300", "400", "500", "700", "900"],
  },
  {
    family: "EB Garamond",
    category: "serif",
    variants: ["400", "500", "600", "700", "800"],
  },
  {
    family: "Asap",
    category: "sans-serif",
    variants: ["400", "500", "600", "700"],
  },
  {
    family: "Assistant",
    category: "sans-serif",
    variants: ["200", "300", "400", "500", "600", "700", "800"],
  },
  {
    family: "Heebo",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Mulish",
    category: "sans-serif",
    variants: ["200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Teko",
    category: "sans-serif",
    variants: ["300", "400", "500", "600", "700"],
  },
  { family: "Bebas Neue", category: "display", variants: ["400"] },
  { family: "Pacifico", category: "handwriting", variants: ["400"] },
  {
    family: "Kanit",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Manrope",
    category: "sans-serif",
    variants: ["200", "300", "400", "500", "600", "700", "800"],
  },
  {
    family: "Barlow Condensed",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Archivo",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Exo 2",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Space Grotesk",
    category: "sans-serif",
    variants: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Caveat",
    category: "handwriting",
    variants: ["400", "500", "600", "700"],
  },
  { family: "Lobster", category: "display", variants: ["400"] },
  {
    family: "Maven Pro",
    category: "sans-serif",
    variants: ["400", "500", "600", "700", "800", "900"],
  },
  { family: "Russo One", category: "sans-serif", variants: ["400"] },
  {
    family: "Montserrat Alternates",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  { family: "Architects Daughter", category: "handwriting", variants: ["400"] },
  { family: "Patrick Hand", category: "handwriting", variants: ["400"] },
  {
    family: "Dancing Script",
    category: "handwriting",
    variants: ["400", "500", "600", "700"],
  },
  {
    family: "Prompt",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  { family: "Righteous", category: "display", variants: ["400"] },
  { family: "Shadows Into Light", category: "handwriting", variants: ["400"] },
  {
    family: "Spectral",
    category: "serif",
    variants: ["200", "300", "400", "500", "600", "700", "800"],
  },
  {
    family: "Yanone Kaffeesatz",
    category: "sans-serif",
    variants: ["200", "300", "400", "500", "600", "700"],
  },
  { family: "Permanent Marker", category: "handwriting", variants: ["400"] },
  { family: "Space Mono", category: "monospace", variants: ["400", "700"] },
  { family: "Satisfy", category: "handwriting", variants: ["400"] },
  {
    family: "Domine",
    category: "serif",
    variants: ["400", "500", "600", "700"],
  },
  { family: "Crete Round", category: "serif", variants: ["400"] },
  { family: "Abril Fatface", category: "display", variants: ["400"] },
  { family: "Amatic SC", category: "handwriting", variants: ["400", "700"] },
  {
    family: "Cormorant Garamond",
    category: "serif",
    variants: ["300", "400", "500", "600", "700"],
  },
  { family: "Questrial", category: "sans-serif", variants: ["400"] },
  {
    family: "Cinzel",
    category: "serif",
    variants: ["400", "500", "600", "700", "800", "900"],
  },
  { family: "Cantarell", category: "sans-serif", variants: ["400", "700"] },
  {
    family: "Exo",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Outfit",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Urbanist",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  {
    family: "Sora",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800"],
  },
  {
    family: "Josefin Slab",
    category: "serif",
    variants: ["100", "200", "300", "400", "500", "600", "700"],
  },
  {
    family: "Alegreya",
    category: "serif",
    variants: ["400", "500", "600", "700", "800", "900"],
  },
  { family: "Fredoka One", category: "display", variants: ["400"] },
  {
    family: "Signika",
    category: "sans-serif",
    variants: ["300", "400", "500", "600", "700"],
  },
  {
    family: "PT Sans Narrow",
    category: "sans-serif",
    variants: ["400", "700"],
  },
  { family: "Varela Round", category: "sans-serif", variants: ["400"] },
  {
    family: "Public Sans",
    category: "sans-serif",
    variants: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  },
  { family: "Sacramento", category: "handwriting", variants: ["400"] },
  { family: "Fjalla One", category: "sans-serif", variants: ["400"] },
  { family: "Indie Flower", category: "handwriting", variants: ["400"] },
  {
    family: "Vollkorn",
    category: "serif",
    variants: ["400", "500", "600", "700", "800", "900"],
  },
  { family: "Lobster Two", category: "display", variants: ["400", "700"] },
];

export const useFont = () => {
  const [fontSelected, setFontSelected] = useState<string>("Roboto");
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  useEffect(() => {
    const font = popularGoogleFonts.find(
      (font) => font.family === fontSelected
    );
    try {
      if (font) {
        const link = document.createElement("link");
        link.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(
          " ",
          "+"
        )}:wght@${font.variants.join(";")}&display=swap`;
        link.rel = "stylesheet";
        link.crossOrigin = "anonymous";
        document.head.appendChild(link);
        setFontLoaded(true);
      }
    } catch (error) {
      console.error("Error loading font:", error);
    }
  }, [fontSelected]);

  const handleFontSelect = (font: string) => {
    setFontSelected(font);
  };
  return {
    fontSelected,
    fontLoaded,
    handleFontSelect,
    fontList: popularGoogleFonts,
  };
};
