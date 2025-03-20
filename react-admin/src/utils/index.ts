export const isDark = (theme: string) => {
    const isDarkTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
    )?.matches;
    return theme == "system" && isDarkTheme ? true : theme == "system" && !isDarkTheme ? false : theme == 'dark' ? true : false;
}