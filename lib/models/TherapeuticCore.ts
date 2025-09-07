// Core therapeutic engine for counseling logic and problem analysis
// Provides the foundation for therapeutic responses before adaptation

interface TherapeuticResponse {
  content: string
  therapeuticGoals: string[]
  interventionType: 'supportive' | 'exploratory' | 'directive' | 'educational'
  confidence: number
}

interface ProblemAnalysis {
  primaryIssue: string
  underlyingFactors: string[]
  immediateNeeds: string[]
  longTermGoals: string[]
  riskLevel: 'low' | 'moderate' | 'high'
}

interface TherapeuticCore {
  analyzeProblem: (userInput: string, context: string[]) => ProblemAnalysis
  generateResponse: (analysis: ProblemAnalysis, mbtiType: string) => TherapeuticResponse
  validateResponse: (response: TherapeuticResponse) => boolean
}

class TherapeuticEngine implements TherapeuticCore {
  analyzeProblem(userInput: string): ProblemAnalysis {
    // Analyze user input for therapeutic content
    const input = userInput.toLowerCase()

    // Identify primary issue
    let primaryIssue = 'general distress'
    if (input.includes('anxiety') || input.includes('worried') || input.includes('nervous')) {
      primaryIssue = 'anxiety'
    } else if (input.includes('depress') || input.includes('sad') || input.includes('hopeless')) {
      primaryIssue = 'depression'
    } else if (
      input.includes('relationship') ||
      input.includes('conflict') ||
      input.includes('communication')
    ) {
      primaryIssue = 'relationship issues'
    } else if (
      input.includes('stress') ||
      input.includes('overwhelm') ||
      input.includes('pressure')
    ) {
      primaryIssue = 'stress management'
    } else if (
      input.includes('self-esteem') ||
      input.includes('confidence') ||
      input.includes('worth')
    ) {
      primaryIssue = 'self-esteem'
    }

    // Identify underlying factors
    const underlyingFactors = []
    if (input.includes('work') || input.includes('job') || input.includes('career')) {
      underlyingFactors.push('work-related stress')
    }
    if (input.includes('family') || input.includes('parent') || input.includes('child')) {
      underlyingFactors.push('family dynamics')
    }
    if (input.includes('past') || input.includes('trauma') || input.includes('history')) {
      underlyingFactors.push('past experiences')
    }
    if (input.includes('future') || input.includes('uncertainty') || input.includes('change')) {
      underlyingFactors.push('future uncertainty')
    }

    // Assess immediate needs
    const immediateNeeds = []
    if (input.includes('help') || input.includes('support') || input.includes('advice')) {
      immediateNeeds.push('immediate guidance')
    }
    if (input.includes('coping') || input.includes('manage') || input.includes('handle')) {
      immediateNeeds.push('coping strategies')
    }
    if (input.includes('understand') || input.includes('why') || input.includes('reason')) {
      immediateNeeds.push('understanding and insight')
    }

    // Determine risk level
    let riskLevel: 'low' | 'moderate' | 'high' = 'low'
    if (input.includes('suicide') || input.includes('kill') || input.includes('end it')) {
      riskLevel = 'high'
    } else if (input.includes('harm') || input.includes('hurt') || input.includes('crisis')) {
      riskLevel = 'moderate'
    }

    return {
      primaryIssue,
      underlyingFactors,
      immediateNeeds,
      longTermGoals: ['develop coping skills', 'build resilience', 'improve self-awareness'],
      riskLevel,
    }
  }

  generateResponse(analysis: ProblemAnalysis, mbtiType: string): TherapeuticResponse {
    // Generate therapeutic response based on analysis and MBTI type
    const baseResponse = this.createBaseResponse(analysis)
    const adaptedResponse = this.adaptToPersonality(baseResponse, mbtiType)

    return {
      content: adaptedResponse,
      therapeuticGoals: analysis.longTermGoals,
      interventionType: this.determineInterventionType(analysis),
      confidence: this.calculateConfidence(analysis),
    }
  }

  validateResponse(response: TherapeuticResponse): boolean {
    // Validate that response meets therapeutic standards
    const hasContent = response.content.length > 50
    const hasGoals = response.therapeuticGoals.length > 0
    const validIntervention = ['supportive', 'exploratory', 'directive', 'educational'].includes(
      response.interventionType,
    )
    const validConfidence = response.confidence >= 0 && response.confidence <= 1

    return hasContent && hasGoals && validIntervention && validConfidence
  }

  private createBaseResponse(analysis: ProblemAnalysis): string {
    let response = ''

    switch (analysis.primaryIssue) {
      case 'anxiety':
        response = `I hear that you're experiencing anxiety, which is a common and understandable response to the challenges you're facing. It's important to acknowledge these feelings rather than trying to push them away.`
        break
      case 'depression':
        response = `Feeling depressed can make everything seem overwhelming and hopeless. It's brave of you to reach out and talk about these feelings. Depression doesn't define who you are, and there are ways to work through it.`
        break
      case 'relationship issues':
        response = `Relationships can be both our greatest source of joy and our biggest challenge. It's clear you're invested in improving this situation, which is an important first step.`
        break
      case 'stress management':
        response = `Stress is your body's way of signaling that something needs attention. While some stress can be motivating, chronic stress can take a toll on your well-being.`
        break
      case 'self-esteem':
        response = `Struggling with self-esteem often stems from critical self-talk and unhelpful beliefs we've internalized over time. Building self-compassion is a powerful way to begin changing this pattern.`
        break
      default:
        response = `Thank you for sharing what's been going on for you. It takes courage to open up about personal challenges. I'm here to help you explore this and find ways forward.`
    }

    // Add risk-specific content
    if (analysis.riskLevel === 'high') {
      response += `\n\nI'm concerned about your safety right now. If you're having thoughts of harming yourself, please reach out to emergency services (911) or a crisis hotline immediately. You don't have to face this alone.`
    } else if (analysis.riskLevel === 'moderate') {
      response += `\n\nIf you're in crisis or need immediate support, consider contacting a crisis hotline or emergency services.`
    }

    return response
  }

  private adaptToPersonality(baseResponse: string, mbtiType: string): string {
    // Adapt response based on MBTI type preferences
    let adaptedResponse = baseResponse

    switch (mbtiType) {
      case 'INTJ':
        adaptedResponse += `\n\nLet's approach this systematically. What specific outcomes are you hoping to achieve, and what steps have you already considered?`
        break
      case 'ENFP':
        adaptedResponse += `\n\nI sense there's a lot of passion and creativity in you. How might you channel that energy toward finding solutions that align with your values?`
        break
      case 'ISTJ':
        adaptedResponse += `\n\nBuilding on your strengths in organization and reliability, what practical steps can we identify to address this challenge?`
        break
      case 'ENFJ':
        adaptedResponse += `\n\nYour concern for others' well-being is evident. How can we balance that with taking care of your own needs right now?`
        break
      default:
        adaptedResponse += `\n\nWhat feels most important for you to focus on right now?`
    }

    return adaptedResponse
  }

  private determineInterventionType(
    analysis: ProblemAnalysis,
  ): 'supportive' | 'exploratory' | 'directive' | 'educational' {
    if (analysis.riskLevel === 'high') {
      return 'directive'
    } else if (analysis.immediateNeeds.includes('understanding and insight')) {
      return 'exploratory'
    } else if (analysis.immediateNeeds.includes('coping strategies')) {
      return 'educational'
    } else {
      return 'supportive'
    }
  }

  private calculateConfidence(analysis: ProblemAnalysis): number {
    // Calculate confidence based on clarity of analysis
    let confidence = 0.5 // Base confidence

    if (analysis.primaryIssue !== 'general distress') confidence += 0.2
    if (analysis.underlyingFactors.length > 0) confidence += 0.1
    if (analysis.immediateNeeds.length > 0) confidence += 0.1
    if (analysis.riskLevel !== 'low') confidence += 0.1

    return Math.min(confidence, 1.0)
  }
}

// Export singleton instance
export const therapeuticCore = new TherapeuticEngine()
export default therapeuticCore
