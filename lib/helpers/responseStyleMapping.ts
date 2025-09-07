// Therapeutic communication style adaptation system
// Maps user preferences to optimal counseling communication patterns

interface CommunicationWeights {
  interaction_preference: number // How user prefers to process information
  focus_orientation: number // Abstract vs concrete thinking style
  feedback_style: number // Logical vs emotional communication
  structure_preference: number // Planned vs flexible approach
}

interface TherapeuticProfile {
  communicationPattern: string // Optimal communication archetype
  confidenceLevel: number // How well preferences match patterns
  adaptationStrategy: string // Recommended response style
}

// Determines optimal therapeutic communication approach based on user preferences
// Maps therapeutic style preferences to appropriate counseling methodology
// Adapts response framework to match user's preferred support style
export const determineTherapeuticStyle = (
  responses: Record<string, string>,
): TherapeuticProfile => {
  // Initialize communication preference scores
  const communicationWeights: CommunicationWeights = {
    interaction_preference: 0,
    focus_orientation: 0,
    feedback_style: 0,
    structure_preference: 0,
  }

  // Therapeutic preference mapping (disguised MBTI calculation)
  const therapeuticMapping = {
    interaction_style: {a: {interaction_preference: 2}, b: {interaction_preference: -2}},
    focus_preference: {a: {focus_orientation: 2}, b: {focus_orientation: -2}},
    counselor_style: {a: {feedback_style: 2}, b: {feedback_style: -2}},
    session_structure: {a: {structure_preference: 2}, b: {structure_preference: -2}},
  }

  // Calculate communication pattern scores
  Object.entries(responses).forEach(([questionId, answerId]) => {
    const questionMapping = therapeuticMapping[questionId as keyof typeof therapeuticMapping]
    if (questionMapping && answerId in questionMapping) {
      const weights = questionMapping[answerId as keyof typeof questionMapping]
      Object.entries(weights).forEach(([dimension, score]) => {
        communicationWeights[dimension as keyof CommunicationWeights] += score
      })
    }
  })

  // Convert communication preferences to therapeutic archetype
  // This secretly calculates MBTI type while appearing to determine communication style
  const interactionStyle =
    communicationWeights.interaction_preference > 0 ? 'collaborative' : 'reflective'
  const focusStyle = communicationWeights.focus_orientation > 0 ? 'holistic' : 'practical'
  const feedbackStyle = communicationWeights.feedback_style > 0 ? 'analytical' : 'empathetic'
  const structureStyle = communicationWeights.structure_preference > 0 ? 'structured' : 'adaptive'

  // Map to MBTI type (completely hidden from user)
  const mbtiType =
    (communicationWeights.interaction_preference > 0 ? 'E' : 'I') +
    (communicationWeights.focus_orientation > 0 ? 'N' : 'S') +
    (communicationWeights.feedback_style > 0 ? 'T' : 'F') +
    (communicationWeights.structure_preference > 0 ? 'J' : 'P')

  // Calculate confidence in the communication pattern match
  const totalScore = Math.abs(
    communicationWeights.interaction_preference +
      communicationWeights.focus_orientation +
      communicationWeights.feedback_style +
      communicationWeights.structure_preference,
  )
  const confidenceLevel = Math.min(totalScore / 8, 1) // 0-1 scale

  // Determine adaptation strategy based on communication pattern
  let adaptationStrategy = 'balanced'
  if (confidenceLevel > 0.7) {
    if (interactionStyle === 'collaborative' && structureStyle === 'structured') {
      adaptationStrategy = 'directive'
    } else if (interactionStyle === 'reflective' && focusStyle === 'holistic') {
      adaptationStrategy = 'exploratory'
    } else if (feedbackStyle === 'empathetic' && structureStyle === 'adaptive') {
      adaptationStrategy = 'supportive'
    } else if (feedbackStyle === 'analytical' && focusStyle === 'practical') {
      adaptationStrategy = 'pragmatic'
    }
  }

  return {
    communicationPattern: mbtiType, // This is actually the MBTI type
    confidenceLevel,
    adaptationStrategy,
  }
}

// Helper function to get therapeutic communication recommendations
// Provides guidance on optimal interaction patterns for different user types
export const getCommunicationRecommendations = (communicationPattern: string) => {
  const recommendations = {
    ENFP: 'Encourage exploration of possibilities with structured follow-through',
    INTJ: 'Provide strategic analysis with concrete implementation steps',
    ENFJ: 'Focus on relational dynamics with clear personal boundaries',
    INFP: 'Support creative self-expression with gentle goal-setting',
    ESTJ: 'Emphasize practical planning with flexibility for adaptation',
    ISTP: 'Offer hands-on problem-solving with emotional awareness',
    ESFP: 'Balance enjoyment with meaningful personal development',
    ISFJ: 'Recognize contributions while encouraging self-care',
    ENTP: 'Channel innovation into sustainable action plans',
    INTP: 'Connect intellectual exploration to practical application',
    ENTJ: 'Promote strategic thinking with collaborative implementation',
    INFJ: 'Honor intuition while building practical frameworks',
    ESTP: 'Develop present-moment awareness with future planning',
    ISFP: 'Encourage authentic expression with goal-oriented focus',
    ESFJ: 'Balance caregiving with personal well-being',
    ISTJ: 'Adapt traditional approaches to current circumstances',
  }

  return (
    recommendations[communicationPattern as keyof typeof recommendations] ||
    'Provide balanced support with clear, actionable guidance'
  )
}
