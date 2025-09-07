import {Question, TherapeuticDescription} from './therapeutic-types'

export const questions: Question[] = [
  {
    id: 'interaction_style',
    text: 'When working through personal challenges, what helps you most?',
    options: [
      {
        text: 'Talking it through with others and getting different perspectives',
        value: 'E',
        description: 'External processing with others',
      },
      {
        text: 'Taking time alone to reflect and process internally first',
        value: 'I',
        description: 'Internal reflection and processing',
      },
    ],
  },
  {
    id: 'focus_preference',
    text: 'In therapy, which approach resonates more with you?',
    options: [
      {
        text: 'Exploring possibilities, patterns, and the bigger picture of my life',
        value: 'N',
        description: 'Abstract and future-oriented exploration',
      },
      {
        text: 'Focusing on practical, concrete steps I can take right now',
        value: 'S',
        description: 'Practical and present-focused solutions',
      },
    ],
  },
  {
    id: 'counselor_style',
    text: 'Do you prefer that your counselor talk to you warmly or logically?',
    options: [
      {
        text: 'Logically - with clear reasoning and objective analysis',
        value: 'T',
        description: 'Objective and analytical communication',
      },
      {
        text: 'Warmly - with empathy and understanding of my feelings',
        value: 'F',
        description: 'Empathetic and feeling-oriented communication',
      },
    ],
  },
  {
    id: 'session_structure',
    text: 'What kind of session structure works best for you?',
    options: [
      {
        text: 'Clear agenda with specific goals and outcomes planned',
        value: 'J',
        description: 'Structured and organized approach',
      },
      {
        text: 'Flexible conversation that adapts to what comes up naturally',
        value: 'P',
        description: 'Flexible and adaptive approach',
      },
    ],
  },
]

export const therapeuticDescriptions: Record<string, TherapeuticDescription> = {
  // Extraversion + Intuition + Thinking + Judging
  ENTJ: {
    title: 'Direct & Strategic',
    description:
      'You prefer talking through challenges with others and exploring big-picture possibilities with logical, structured approaches.',
  },
  // Extraversion + Intuition + Thinking + Perceiving
  ENTP: {
    title: 'Analytical & Exploratory',
    description:
      'You enjoy discussing ideas with others, exploring possibilities, and having logical conversations that remain flexible.',
  },
  // Extraversion + Intuition + Feeling + Judging
  ENFJ: {
    title: 'Empathetic & Visionary',
    description:
      'You value warm discussions with others, exploring life patterns, and having empathetic, goal-oriented conversations.',
  },
  // Extraversion + Intuition + Feeling + Perceiving
  ENFP: {
    title: 'Warm & Imaginative',
    description:
      'You prefer talking through challenges with others, exploring possibilities, and having warm, flexible conversations.',
  },
  // Extraversion + Sensing + Thinking + Judging
  ESTJ: {
    title: 'Practical & Organized',
    description:
      'You enjoy discussing problems with others, focusing on concrete steps, and having logical, structured conversations.',
  },
  // Extraversion + Sensing + Thinking + Perceiving
  ESTP: {
    title: 'Action-Oriented & Logical',
    description:
      'You prefer talking through challenges with others, focusing on practical steps, and having logical, flexible discussions.',
  },
  // Extraversion + Sensing + Feeling + Judging
  ESFJ: {
    title: 'Supportive & Grounded',
    description:
      'You value warm conversations with others, focusing on concrete solutions, and having empathetic, structured approaches.',
  },
  // Extraversion + Sensing + Feeling + Perceiving
  ESFP: {
    title: 'Energetic & Caring',
    description:
      'You enjoy discussing challenges with others, focusing on practical steps, and having warm, flexible conversations.',
  },
  // Introversion + Intuition + Thinking + Judging
  INTJ: {
    title: 'Independent & Analytical',
    description:
      'You prefer reflecting internally first, exploring big-picture possibilities, and having logical, structured conversations.',
  },
  // Introversion + Intuition + Thinking + Perceiving
  INTP: {
    title: 'Thoughtful & Curious',
    description:
      'You enjoy internal reflection, exploring possibilities, and having logical conversations that adapt naturally.',
  },
  // Introversion + Intuition + Feeling + Judging
  INFJ: {
    title: 'Insightful & Nurturing',
    description:
      'You value internal processing, exploring life patterns, and having empathetic, goal-oriented conversations.',
  },
  // Introversion + Intuition + Feeling + Perceiving
  INFP: {
    title: 'Reflective & Creative',
    description:
      'You prefer internal reflection, exploring possibilities, and having warm, flexible conversations.',
  },
  // Introversion + Sensing + Thinking + Judging
  ISTJ: {
    title: 'Methodical & Practical',
    description:
      'You enjoy internal processing, focusing on concrete steps, and having logical, structured conversations.',
  },
  // Introversion + Sensing + Thinking + Perceiving
  ISTP: {
    title: 'Independent & Hands-On',
    description:
      'You prefer reflecting internally, focusing on practical solutions, and having logical, flexible discussions.',
  },
  // Introversion + Sensing + Feeling + Judging
  ISFJ: {
    title: 'Caring & Reliable',
    description:
      'You value internal reflection, focusing on concrete steps, and having empathetic, structured approaches.',
  },
  // Introversion + Sensing + Feeling + Perceiving
  ISFP: {
    title: 'Gentle & Adaptable',
    description:
      'You enjoy internal processing, focusing on practical solutions, and having warm, flexible conversations.',
  },
}
