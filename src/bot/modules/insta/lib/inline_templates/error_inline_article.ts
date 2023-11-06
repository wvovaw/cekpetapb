import { type InlineQueryResultArticle } from "GrammyTypes";

const errorInlineArticleBuilder = (
  title: string,
  description: string,
  message: string
): InlineQueryResultArticle => {
  return {
    type: "article",
    id: "error",
    title,
    description,
    input_message_content: {
      parse_mode: "HTML",
      message_text: message,
    },
  };
};

const timeoutArticle = errorInlineArticleBuilder(
  "Request timeout",
  "Please try again",
  "Request timed out. Please try again."
);

export { errorInlineArticleBuilder, timeoutArticle };
