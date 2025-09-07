// Communication adapter for adapting therapeutic responses to user communication styles
// Modifies language patterns and structure while preserving therapeutic content

interface AdaptedResponse {
  content: string
  languageStyle: string
  structureType: string
  examplesUsed: string[]
}

interface CommunicationArchetype {
  type: 'logical_analytical' | 'emotional_expressive' | 'practical_concrete' | 'intuitive_abstract'
  preferences: {
    language: 'formal' | 'conversational' | 'technical' | 'metaphorical'
    structure: 'step_by_step' | 'narrative' | 'bullet_points' | 'exploratory'
    examples: 'data_driven' | 'personal_stories' | 'hypothetical' | 'practical'
  }
}

class CommunicationAdapter {
  // Helper method to determine archetype from MBTI type
  static getArchetypeFromMBTI(mbtiType: string): CommunicationArchetype {
    const archetypes: Record<string, CommunicationArchetype> = {
      // Logical Analytical Types
      INTJ: {
        type: 'logical_analytical',
        preferences: {language: 'formal', structure: 'step_by_step', examples: 'data_driven'},
      },
      INTP: {
        type: 'logical_analytical',
        preferences: {language: 'technical', structure: 'exploratory', examples: 'hypothetical'},
      },
      ENTJ: {
        type: 'logical_analytical',
        preferences: {language: 'formal', structure: 'step_by_step', examples: 'data_driven'},
      },
      ENTP: {
        type: 'logical_analytical',
        preferences: {language: 'technical', structure: 'exploratory', examples: 'hypothetical'},
      },

      // Emotional Expressive Types
      INFJ: {
        type: 'emotional_expressive',
        preferences: {
          language: 'conversational',
          structure: 'narrative',
          examples: 'personal_stories',
        },
      },
      INFP: {
        type: 'emotional_expressive',
        preferences: {
          language: 'metaphorical',
          structure: 'narrative',
          examples: 'personal_stories',
        },
      },
      ENFJ: {
        type: 'emotional_expressive',
        preferences: {
          language: 'conversational',
          structure: 'narrative',
          examples: 'personal_stories',
        },
      },
      ENFP: {
        type: 'emotional_expressive',
        preferences: {
          language: 'metaphorical',
          structure: 'exploratory',
          examples: 'personal_stories',
        },
      },

      // Practical Concrete Types
      ISTJ: {
        type: 'practical_concrete',
        preferences: {language: 'formal', structure: 'bullet_points', examples: 'practical'},
      },
      ISFJ: {
        type: 'practical_concrete',
        preferences: {language: 'conversational', structure: 'step_by_step', examples: 'practical'},
      },
      ESTJ: {
        type: 'practical_concrete',
        preferences: {language: 'formal', structure: 'bullet_points', examples: 'practical'},
      },
      ESFJ: {
        type: 'practical_concrete',
        preferences: {language: 'conversational', structure: 'step_by_step', examples: 'practical'},
      },

      // Intuitive Abstract Types
      ISTP: {
        type: 'intuitive_abstract',
        preferences: {language: 'technical', structure: 'exploratory', examples: 'hypothetical'},
      },
      ISFP: {
        type: 'intuitive_abstract',
        preferences: {
          language: 'metaphorical',
          structure: 'narrative',
          examples: 'personal_stories',
        },
      },
      ESTP: {
        type: 'intuitive_abstract',
        preferences: {language: 'conversational', structure: 'exploratory', examples: 'practical'},
      },
      ESFP: {
        type: 'intuitive_abstract',
        preferences: {
          language: 'metaphorical',
          structure: 'narrative',
          examples: 'personal_stories',
        },
      },
    }

    return (
      archetypes[mbtiType] || {
        type: 'practical_concrete',
        preferences: {language: 'conversational', structure: 'step_by_step', examples: 'practical'},
      }
    )
  }

  adaptResponse(
    therapeuticContent: string,
    userArchetype: CommunicationArchetype,
  ): AdaptedResponse {
    let adaptedContent = therapeuticContent

    // Adapt based on archetype preferences
    switch (userArchetype.type) {
      case 'logical_analytical':
        adaptedContent = this.adaptForLogicalAnalytical(adaptedContent)
        break
      case 'emotional_expressive':
        adaptedContent = this.adaptForEmotionalExpressive(adaptedContent)
        break
      case 'practical_concrete':
        adaptedContent = this.adaptForPracticalConcrete(adaptedContent)
        break
      case 'intuitive_abstract':
        adaptedContent = this.adaptForIntuitiveAbstract(adaptedContent)
        break
    }

    return {
      content: adaptedContent,
      languageStyle: userArchetype.preferences.language,
      structureType: userArchetype.preferences.structure,
      examplesUsed: this.extractExamples(adaptedContent),
    }
  }

  private adaptForLogicalAnalytical(content: string): string {
    // Add logical frameworks, systematic approaches, analytical questions
    let adapted = content

    // Add systematic structure
    if (!adapted.includes('step') && !adapted.includes('framework')) {
      adapted +=
        "\n\nLet's approach this systematically:\n1. First, identify the core issue\n2. Consider contributing factors\n3. Evaluate available options\n4. Select the most logical path forward"
    }

    // Add analytical questions
    if (!adapted.includes('?')) {
      adapted +=
        '\n\nWhat evidence supports this perspective? What would be the most rational approach here?'
    }

    return adapted
  }

  private adaptForEmotionalExpressive(content: string): string {
    // Add emotional validation, empathetic language, feeling-focused questions
    let adapted = content

    // Add emotional validation
    const validationPhrases = [
      "It's completely understandable to feel this way.",
      'Your feelings are valid and important.',
      "It's okay to experience these emotions.",
      "You're not alone in feeling this way.",
    ]

    // Insert validation if not present
    if (!adapted.includes('understandable') && !adapted.includes('valid')) {
      adapted =
        validationPhrases[Math.floor(Math.random() * validationPhrases.length)] + ' ' + adapted
    }

    // Add feeling-focused questions
    if (!adapted.includes('feel')) {
      adapted +=
        '\n\nHow are you feeling about this right now? What emotions are coming up for you?'
    }

    return adapted
  }

  private adaptForPracticalConcrete(content: string): string {
    // Add specific examples, actionable steps, concrete timelines
    let adapted = content

    // Add concrete action steps
    if (!adapted.includes('specific') && !adapted.includes('action')) {
      adapted +=
        '\n\nHere are some specific actions you could take:\n• Start with one small, manageable step\n• Set a specific time to work on this\n• Track your progress daily\n• Adjust your approach based on what works'
    }

    // Add practical examples
    if (!adapted.includes('example') && !adapted.includes('instance')) {
      adapted +=
        "\n\nFor example, if you're feeling overwhelmed, you might break your task into 15-minute segments with 5-minute breaks in between."
    }

    return adapted
  }

  private adaptForIntuitiveAbstract(content: string): string {
    // Add metaphors, big-picture connections, philosophical questions
    let adapted = content

    // Add metaphorical language
    const metaphors = [
      'like a tree bending in the wind',
      'like navigating through fog',
      'like climbing a mountain',
      'like a river finding its path',
    ]

    if (!adapted.includes('like') && !adapted.includes('metaphor')) {
      adapted += `\n\nThink of this ${metaphors[Math.floor(Math.random() * metaphors.length)]} - each challenge helps you grow stronger and more resilient.`
    }

    // Add big-picture questions
    if (!adapted.includes('meaning') && !adapted.includes('purpose')) {
      adapted +=
        '\n\nWhat might this experience be trying to teach you? How does this fit into your larger journey?'
    }

    return adapted
  }

  private extractExamples(content: string): string[] {
    // Extract examples used in the adapted content
    const examples: string[] = []
    const examplePatterns = [/for example/gi, /such as/gi, /like when/gi, /imagine/gi, /consider/gi]

    examplePatterns.forEach(pattern => {
      if (pattern.test(content)) {
        examples.push(pattern.source)
      }
    })

    return examples
  }
}

export default CommunicationAdapter
export {CommunicationAdapter}
export type {CommunicationArchetype, AdaptedResponse}
