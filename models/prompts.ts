import {UIMessage} from 'ai'

export const examplePrompts = [
  "I keep starting projects and getting excited about new ideas, but then I lose focus and jump to something else. My brain feels like it's constantly spinning with possibilities.",
  "I feel overwhelmed by all the possibilities in my life and don't know which direction to take. Everything seems equally interesting but also equally daunting.",
  "I'm struggling with routine tasks at work because they feel meaningless, but I know they're important. How can I stay motivated when things aren't intellectually stimulating?",
]

export const initialAssistantMessage = {
  role: 'assistant',
  id: 'initial',
  parts: [
    {
      type: 'text',
      text: "Hello! I'm here to provide therapeutic support tailored to your preferences. How are you feeling today? You can click one of the examples below or type your own message.",
    },
  ],
} as UIMessage
