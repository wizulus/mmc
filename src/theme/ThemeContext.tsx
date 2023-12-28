import { createContext } from 'react';
import { convertNumberToWord } from './convertNumberToWord';
import { capitalize, snakeCase } from 'lodash';
import themes from "../data/themes.json";


export const themeKeys = Object.keys(themes) as (keyof typeof themes)[];
export const themesTotal = themeKeys.length
export type Theme = typeof themeKeys[number];

export type ThemeContextData = (typeof themes)[Theme];
export type ThemeContextImages = ThemeContextData["images"];
export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  startDate: Date;
  info: ThemeInfo;
  themeSlug: string;
  data: ThemeContextData;
};

const getThemeInfo = (theme: Theme, pathname: string) => {
  const caps = theme.toUpperCase();
  const snake = snakeCase(theme);
  const ordinalString = snake.split("_")[0];
  const ordinal = Number(ordinalString);
  const themeYear = convertNumberToWord(ordinal, "english");
  const writtenOutOrdinal = convertNumberToWord(ordinal, "englishOrdinal");
  const writtenOut = theme.endsWith("ymm")
    ? capitalize(themeYear) + " Years of Mario Maker"
    : capitalize(writtenOutOrdinal) + " Mario Maker Celebration";
  const pathnameFromTheme = pathname.replace(`${theme}/`, "");
  return {
    caps,
    snake,
    ordinal,
    themeYear,
    writtenOutOrdinal,
    writtenOut,
    isHome: !pathnameFromTheme || pathnameFromTheme === "/",
    currentThemeUrl: `${theme}${pathnameFromTheme}`,
    nextThemeUrl: `${nextTheme(theme)}${pathnameFromTheme}`,
    prevThemeUrl: `${prevTheme(theme)}${pathnameFromTheme}`,
    nextTheme: nextTheme(theme),
    prevTheme: prevTheme(theme),
  };
};
type ThemeInfo = ReturnType<typeof getThemeInfo>;

export const createThemeContext = (context: Omit<ThemeContextType, 'info' | 'data' | 'startDate'>, pathname: string): ThemeContextType => {
    return ({
        ...context,
        data: themes[context.theme],
        startDate: new Date(themes[context.theme].batches[0].releaseDate.date),
        info: getThemeInfo(context.theme, pathname)
    })
};

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const nextTheme = (current: Theme) => {
    const currentIndex = themeKeys.indexOf(current);
    if (currentIndex + 1 === themeKeys.length) {
        return;
    }
    return themeKeys[currentIndex + 1];
}
export const prevTheme = (current: Theme) => {
    const currentIndex = themeKeys.indexOf(current);
    if (currentIndex === 0) {
        return;
    }
    return themeKeys[currentIndex - 1];
}
