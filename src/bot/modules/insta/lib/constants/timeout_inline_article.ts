import { type InlineQueryResultArticle } from "GrammyTypes";

const timeout: InlineQueryResultArticle = {
  type: "article",
  id: "timeout",
  title: "Request timeout",
  description: "Please try again",
  input_message_content: {
    parse_mode: "HTML",
    message_text: "Request timed out. Please try again.",
  },
};

export default timeout;
