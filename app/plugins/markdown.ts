import MarkdownIt from "markdown-it";

export default defineNuxtPlugin(() => {
  const md = new MarkdownIt({ breaks: true });

  return {
    provide: {
      md: (text: string) => md.render(text || ""),
    },
  };
});