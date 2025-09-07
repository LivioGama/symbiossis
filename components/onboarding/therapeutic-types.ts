export interface TherapeuticPreferencesProps {
  onComplete: (psychologicalPreference: string) => void
}

export interface Question {
  id: string
  text: string
  options: {
    text: string
    value: string
    description?: string
  }[]
}

export interface TherapeuticDescription {
  title: string
  description: string
}
