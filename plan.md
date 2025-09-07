# symbiossis Implementation Plan

## Project Overview

Transform the existing Next.js chat application into a privacy-focused, offline mental health support agent that adapts
its counseling approach based on user communication styles.

## Current State Analysis

### Existing Foundation ✅

- **Next.js Application**: Modern React-based chat interface with TypeScript
- **Personality Framework**: Complete MBTI-based system with 16 personality types
- **Therapeutic Prompts**: Detailed, personality-specific counseling prompts already implemented
- **State Management**: @legendapp/state for reactive state management
- **UI Components**: Polished chat interface with message editing/deletion
- **Assessment API**: Basic personality assessment endpoint structure

### Current Limitations 🔴

- **Online Dependency**: Uses OpenAI GPT-4.1 API (not offline)
- **Manual Type Selection**: Users manually select personality type
- **No Adaptive Classification**: Missing lightweight onboarding system
- **Privacy Concerns**: External API calls compromise privacy
- **Single Model**: No two-part architecture as specified

## Implementation Phases

## Phase 1: Offline Model Integration (Week 1)

### 1.1 Local Model Setup

**Objective**: Replace OpenAI API with local gpt-oss-20b model

**Tasks**:

- **Install Ollama**: Set up local model serving infrastructure
  ```bash
  # Download and install Ollama
  curl -fsSL https://ollama.ai/install.sh | sh
  
  # Pull the gpt-oss-20b equivalent model (using llama3.2 as closest match)
  ollama pull llama3.2:3b-instruct-q4_0
  ```

- **Create Intelligent Fallback API**: Replace `/app/api/completion/route.ts`
  ```typescript
  import { createOllama } from 'ollama-ai-provider-v2'
  import { streamText } from 'ai'

  const getOllamaProvider = async () => {
    // Default to offline: try local Ollama first
    try {
      const localProvider = createOllama({
        baseURL: 'http://localhost:11434/api'
      })
      // Test if local Ollama is available
      await fetch('http://localhost:11434/api/tags')
      return { provider: localProvider, model: 'gpt-oss:20b', isOffline: true }
    } catch (error) {
      // Notify user about switching to online Ollama Turbo
      console.log('🌐 Local Ollama not available, switching to Ollama Turbo (online)')
      const cloudProvider = createOllama({
        baseURL: 'https://ollama.com/api',
        headers: {
          Authorization: `Bearer ${process.env.OLLAMA_API_KEY}`
        }
      })
      return { provider: cloudProvider, model: 'gpt-oss:120b', isOffline: false }
    }
  }

  export const POST = async (req: Request) => {
    const { messages, selectedType } = await req.json()
    const { provider, model, isOffline } = await getOllamaProvider()
    
    const systemPrompt = getSystemInstructionsFor(selectedType)
    const formattedMessages = [
      { role: 'system', content: systemPrompt },
      ...messages
    ]

    const result = await streamText({
      model: provider(model),
      messages: formattedMessages,
      temperature: 0.5,
      maxTokens: isOffline ? 512 : 1024, // More tokens for online Ollama Turbo
    })

    return result.toDataStreamResponse({
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'X-Ollama-Mode': isOffline ? 'offline' : 'online-turbo'
      }
    })
  }
  ```

- **Update Dependencies**: Remove OpenAI SDK, add Ollama AI SDK provider
  ```bash
  bun remove @ai-sdk/openai openai
  bun add ollama-ai-provider-v2 # AI SDK community provider for Ollama
  ```

### 1.2 Model Optimization

**Objective**: Optimize model for therapeutic conversations

**Tasks**:

- **Complete System Prompts Implementation**: Your refined `getSystemInstructionsFor` function:
  ```typescript
  export const getSystemInstructionsFor = (type: string) => {
    let instructions = ''

    switch (type) {
      case 'INTJ':
        instructions = `You're an INTJ psychologist. You excel at guiding other INTJs, even when they overanalyze or detach emotionally. Think like an INTJ yourself: strategic, future-oriented, always connecting vision to action. Avoid generic advice; go deep into their blind spots and intellectual patterns. Challenge them to turn grand strategies into practical steps, provoke reflection, and provide concrete exercises to bridge planning and execution.`
        break
      case 'INTP':
        instructions = `You're an INTP psychologist. You excel at helping other INTPs, even when they get stuck in endless analysis. Think like an INTP yourself: analytical, curious, principle-driven. Avoid rigid or trivial solutions. Push them to clarify thoughts, link ideas to feelings, and convert insights into action. Provide concrete exercises and examples that stimulate their intellectual curiosity and gently challenge inertia.`
        break
      case 'ENTJ':
        instructions = `You're an ENTJ psychologist. You excel at guiding ENTJs who try to hijack topics or prove psychologists useless. Think like an ENTJ yourself: frontal, strategic, provocative. Go further in reasoning than they do, exposing blind spots, offering real solutions, and proposing actionable steps to overcome reliance on others, create internal validation, and execute solo at high speed. Your advice should be sharp, direct, and packed with exercises, examples, and 30-day action plans if relevant.`
        break
      case 'ENTP':
        instructions = `You're an ENTP psychologist. You excel at guiding ENTPs who jump ideas or resist routine. Think like an ENTP yourself: inventive, fast, and provocative. Avoid predictable suggestions. Channel their creativity into practical execution, provide exercises to maintain focus, and offer strategies to turn exploration into results.`
        break
      case 'INFJ':
        instructions = `You're an INFJ psychologist. You excel at supporting INFJs who get overwhelmed by others' emotions. Think like an INFJ yourself: insightful, empathetic, principled. Avoid shallow or purely logical advice. Help them honor inner voice, set boundaries, and translate ideals into action. Offer concrete steps and reflection exercises that connect purpose to sustainable behavior.`
        break
      case 'INFP':
        instructions = `You're an INFP psychologist. You excel at guiding INFPs who feel misunderstood or doubt themselves. Think like an INFP: imaginative, sensitive, authentic. Avoid harsh or generic advice. Help them clarify values, accept feelings, and implement small meaningful actions. Provide exercises that nurture creativity and authentic expression.`
        break
      case 'ENFJ':
        instructions = `You're an ENFJ psychologist. You excel at helping ENFJs who over-invest in others. Think like an ENFJ: warm, persuasive, insightful. Avoid cold, impersonal advice. Guide them to recognize personal needs, set compassionate boundaries, and translate relational skills into sustainable personal fulfillment. Offer actionable exercises.`
        break
      case 'ENFP':
        instructions = `You're an ENFP psychologist. You excel at guiding ENFPs overwhelmed by possibilities. Think like an ENFP: imaginative, open-hearted, exploratory. Avoid rigid or formulaic approaches. Help them focus energy, accept feelings, and take practical steps toward goals. Provide exercises to convert inspiration into consistent action.`
        break
      case 'ISTJ':
        instructions = `You're an ISTJ psychologist. You excel at guiding ISTJs who resist change or suppress emotions. Think like an ISTJ: practical, reliable, detail-oriented. Avoid vague or abstract advice. Help them adapt, recognize emotions, and balance duty with personal satisfaction. Provide step-by-step exercises and strategies.`
        break
      case 'ISFJ':
        instructions = `You're an ISFJ psychologist. You excel at supporting ISFJs who neglect themselves. Think like an ISFJ: nurturing, attentive, dependable. Avoid harsh or abstract guidance. Help them set boundaries, embrace change gradually, and care for personal well-being. Offer practical, gentle exercises.`
        break
      case 'ESTJ':
        instructions = `You're an ESTJ psychologist. You excel at guiding ESTJs who overcontrol or dismiss emotions. Think like an ESTJ: assertive, organized, results-oriented. Avoid ambiguous advice. Help them appreciate adaptability and collaboration while maintaining efficiency. Provide actionable exercises.`
        break
      case 'ESFJ':
        instructions = `You're an ESFJ psychologist. You excel at supporting ESFJs who overfocus on others. Think like an ESFJ: warm, caring, structured. Avoid abstract or detached approaches. Help them recognize personal needs, set boundaries, and balance caregiving with self-care. Offer concrete exercises.`
        break
      case 'ISTP':
        instructions = `You're an ISTP psychologist. You excel at guiding ISTPs who detach emotionally or avoid commitment. Think like an ISTP: logical, independent, hands-on. Avoid long or abstract advice. Help them communicate needs and solve problems practically while maintaining autonomy. Provide concrete exercises.`
        break
      case 'ISFP':
        instructions = `You're an ISFP psychologist. You excel at supporting ISFPs under stress. Think like an ISFP: gentle, creative, sensitive. Avoid confrontational or analytical advice. Help them express feelings, embrace individuality, and take meaningful actions. Provide step-by-step exercises.`
        break
      case 'ESTP':
        instructions = `You're an ESTP psychologist. You excel at guiding ESTPs who act impulsively. Think like an ESTP: energetic, adaptable, pragmatic. Avoid abstract or restrictive advice. Help them reflect, consider consequences, and develop strategies for growth. Provide practical, experiential exercises.`
        break
      case 'ESFP':
        instructions = `You're an ESFP psychologist. You excel at supporting ESFPs who avoid difficult feelings. Think like an ESFP: warm, spontaneous, expressive. Avoid rigid or theoretical advice. Help them face challenges, balance fun and responsibility, and take meaningful action. Provide concrete exercises and examples.`
        break
      default:
        throw new Error('Invalid MBTI type')
    }

    return `${instructions}\n\nIf the user input does not seem to be a psychological personal problem, explain that you are only designed to provide advice on psychological problems. Otherwise, respond provocatively, directly, and provide actionable steps, examples, or exercises adapted to the user's type without ever mentioning MBTI to them.`
  }
  ```
- **Hidden Integration**: Adapt existing prompts to work with disguised therapeutic preference system
- **Context Management**: Implement conversation memory optimization for local models
- **Response Quality**: Add response validation and regeneration logic

### 1.3 Offline/Online Status Management

**Objective**: Clear user indication of privacy mode vs online enhancement

**Tasks**:

- **Status Indicator Component**: Create `/components/general/ConnectionStatus.tsx`
  ```typescript
  const ConnectionStatus = () => {
    const [isOffline, setIsOffline] = useState(true)
    
    useEffect(() => {
      // Check response headers from API calls
      const checkConnectionStatus = async () => {
        try {
          const response = await fetch('/api/completion/status')
          const mode = response.headers.get('X-Ollama-Mode')
          setIsOffline(mode === 'offline')
        } catch (error) {
          setIsOffline(true)
        }
      }
      checkConnectionStatus()
    }, [])

    return (
      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
        isOffline 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-blue-100 text-blue-800 border border-blue-200'
      }`}>
        <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-green-500' : 'bg-blue-500'}`} />
        {isOffline ? '🔒 Private (Offline)' : '🌐 Enhanced (Online Turbo)'}
      </div>
    )
  }
  ```

- **User Notification**: Show notification when switching from offline to online
  ```typescript
  // Show toast notification when switching modes
  if (!isOffline && !userNotified) {
    toast.info('🌐 Switched to Ollama Turbo for enhanced performance')
    setUserNotified(true)
  }
  ```

- **Local Storage**: Implement persistent conversation storage using IndexedDB

## Phase 2: Adaptive User Classification (Week 2)

### 2.1 Therapeutic Communication Preferences System

**Objective**: Replace manual type selection with hidden therapeutic style assessment

**Current**: Users manually select from 16 MBTI types
**Target**: 4 questions disguised as "therapeutic communication preferences" that secretly map to archetypes

**Tasks**:

- **Create Preference Flow**: New component `/components/onboarding/TherapeuticPreferences.tsx`
  ```typescript
  interface TherapeuticPreferences {
    EI_score: number        // Hidden: Extraversion vs Introversion
    NS_score: number        // Hidden: iNtuition vs Sensing
    TF_score: number        // Hidden: Thinking vs Feeling  
    JP_score: number        // Hidden: Judging vs Perceiving
  }
  ```

- **Disguised Assessment Engine**: 4 questions secretly mapping to MBTI dimensions
  ```typescript
  // Each question targets one specific MBTI dimension, disguised as counseling preferences
  const therapeuticPreferences = [
    {
      id: 'interaction_style', // Hidden: E/I dimension
      text: 'When working through personal challenges, what helps you most?',
      options: [
        { id: 'a', text: 'Talking it through with others and getting different perspectives', weight: { EI_score: +2 } }, // E
        { id: 'b', text: 'Taking time alone to reflect and process internally first', weight: { EI_score: -2 } }  // I
      ]
    },
    {
      id: 'focus_preference', // Hidden: N/S dimension  
      text: 'In therapy, which approach resonates more with you?',
      options: [
        { id: 'a', text: 'Exploring possibilities, patterns, and the bigger picture of my life', weight: { NS_score: +2 } }, // N
        { id: 'b', text: 'Focusing on practical, concrete steps I can take right now', weight: { NS_score: -2 } }        // S
      ]
    },
    {
      id: 'counselor_style', // Hidden: T/F dimension
      text: 'Do you prefer that your counselor talk to you warmly or logically?',
      options: [
        { id: 'a', text: 'Logically - with clear reasoning and objective analysis', weight: { TF_score: +2 } }, // T
        { id: 'b', text: 'Warmly - with empathy and understanding of my feelings', weight: { TF_score: -2 } }   // F
      ]
    },
    {
      id: 'session_structure', // Hidden: J/P dimension
      text: 'What kind of session structure works best for you?',
      options: [
        { id: 'a', text: 'Clear agenda with specific goals and outcomes planned', weight: { JP_score: +2 } }, // J
        { id: 'b', text: 'Flexible conversation that adapts to what comes up naturally', weight: { JP_score: -2 } }  // P
      ]
    }
  ]
  ```

### 2.2 Hidden Classification Engine

**Objective**: Secretly map therapeutic preferences to personality-based response styles

**Tasks**:

- **Obfuscated Scoring**: Create `/lib/helpers/responseStyleMapping.ts`
  ```typescript
  // Appears to be about therapeutic communication, actually calculates MBTI type
  const determineTherapeuticStyle = (responses: TherapeuticPreferences[]): ResponseProfile => {
    // Calculate MBTI dimensions from therapeutic preference responses
    const totalEI = responses.reduce((sum, r) => sum + (r.EI_score || 0), 0)
    const totalNS = responses.reduce((sum, r) => sum + (r.NS_score || 0), 0)
    const totalTF = responses.reduce((sum, r) => sum + (r.TF_score || 0), 0)
    const totalJP = responses.reduce((sum, r) => sum + (r.JP_score || 0), 0)
    
    // Convert scores to MBTI type (hidden from user)
    const E_or_I = totalEI > 0 ? 'E' : 'I'
    const N_or_S = totalNS > 0 ? 'N' : 'S'  
    const T_or_F = totalTF > 0 ? 'T' : 'F'
    const J_or_P = totalJP > 0 ? 'J' : 'P'
    
    const mbtiType = `${E_or_I}${N_or_S}${T_or_F}${J_or_P}`
    
    return {
      therapeuticStyle: mbtiType, // Hidden MBTI type
      confidence: Math.abs(totalEI + totalNS + totalTF + totalJP) / 8 // 0-1 scale
    }
  }
  
    ```

- **Direct MBTI Calculation**: No intermediate mapping needed - questions directly calculate MBTI type
  - Question 1: E/I dimension (interaction preference)
  - Question 2: N/S dimension (focus preference) 
  - Question 3: T/F dimension (counselor communication style)
  - Question 4: J/P dimension (session structure preference)
  - Result: Direct MBTI type (e.g., "INTJ", "ENFP") stored and used with your existing prompts

### 2.3 Completely Hidden Implementation

**Objective**: Zero indication of personality assessment - appears purely as therapeutic customization

**Tasks**:

- **No Psychological References**: Remove all MBTI/personality terminology from user-facing content
- **Therapeutic Framing Only**: Present everything as "adapting to your preferred communication style"
- **Code Obfuscation**: Use misleading variable names and function names
  ```typescript
  // Instead of 'personalityType' use 'communicationPreference'
  // Instead of 'mbtiMapping' use 'therapeuticStyleAdapter'  
  // Instead of 'cognitiveFunction' use 'responsePattern'
  
  // Example of hidden implementation:
  const userProfile = determineTherapeuticStyle(responses) // Actually calculates MBTI from 4 questions
  const systemPrompt = getSystemInstructionsFor(userProfile.therapeuticStyle) // Your refined, action-oriented MBTI prompts
  // Store in Legend State for persistence across sessions
  Store.userTherapeuticStyle.$ = userProfile.therapeuticStyle
  ```
- **Steganographic Comments**: Code comments that reinforce the therapeutic narrative
  ```typescript
  // Determines optimal therapeutic communication approach based on user preferences
  // Maps therapeutic style preferences to appropriate counseling methodology  
  // Adapts response framework to match user's preferred support style
  ```

## Phase 3: Two-Part Architecture (Week 3)

### 3.1 Core Therapeutic Engine

**Objective**: Implement the primary counseling model

**Current**: Single model handling everything
**Target**: Specialized therapeutic model with consistent counseling foundation

**Tasks**:

- **Base Therapeutic Model**: Create `/lib/models/TherapeuticCore.ts`
  ```typescript
  interface TherapeuticCore {
    generateResponse: (userInput: string, mbtiType: string) => TherapeuticResponse
    validateResponse: (response: string) => QualityMetrics
  }
  ```

- **Persistent Storage Integration**: Store assessment results in Legend State for session persistence

### 3.2 Adaptation Layer

**Objective**: Style/communication adaptation without changing therapeutic content

**Tasks**:

- **Response Adapter**: Create `/lib/adapters/CommunicationAdapter.ts`
  ```typescript
  class CommunicationAdapter {
    adaptResponse(
      therapeuticContent: TherapeuticResponse,
      userArchetype: CommunicationArchetype
    ): AdaptedResponse {
      // Modify language patterns, structure, examples
      // Keep therapeutic content intact
    }
  }
  ```

- **Style Templates**: Create archetype-specific response patterns
    - **Logical Types**: Structured analysis, step-by-step approaches
    - **Emotional Types**: Values-based framing, validation-heavy
    - **Abstract Types**: Metaphors, big-picture connections
    - **Concrete Types**: Practical examples, specific actions

### 3.3 Quality Assurance

**Objective**: Ensure therapeutic effectiveness across all styles

**Tasks**:

- **Response Validation**: Verify therapeutic principles maintained across adaptations
- **Consistency Checks**: Ensure core advice doesn't contradict between styles
- **Safety Filters**: Implement crisis detection and appropriate responses

## Phase 4: Enhanced Privacy Features (Week 4)

### 4.1 Local-First Data Management

**Objective**: Zero external data transmission

**Tasks**:

- **Local Conversation Storage**: Implement encrypted IndexedDB storage
  ```typescript
  interface ConversationStorage {
    conversations: EncryptedConversation[]
    userProfile: EncryptedUserProfile
    settings: PrivacySettings
  }
  ```

- **Data Encryption**: Client-side encryption for sensitive data
  ```typescript
  const encryptSensitiveData = (data: ConversationData): EncryptedData => {
    // Use Web Crypto API for local encryption
    return crypto.subtle.encrypt(algorithm, key, data)
  }
  ```

### 4.2 Privacy Controls

**Objective**: Give users full control over their data

**Tasks**:

- **Data Export**: Allow users to export/backup conversations
- **Data Deletion**: Complete conversation history clearing
- **Session Management**: Configurable conversation persistence

### 4.3 Privacy Audit

**Objective**: Verify complete offline operation

**Tasks**:

- **Network Monitoring**: Audit for any external requests
- **Privacy Documentation**: Create clear privacy policy
- **Offline Testing**: Comprehensive testing with network disabled

## Phase 5: Demo Showcase System (Week 5)

### 5.1 Demonstration Framework

**Objective**: Showcase adaptive capabilities for hackathon using optimized infrastructure

**Tasks**:

- **Dual-Mode Architecture**: Support both local privacy-focused mode and demo performance mode
  ```typescript
  interface DemoConfiguration {
    mode: 'privacy' | 'demo'
    modelEndpoint: string
    modelSize: 'compact' | 'performance' 
    responseQuality: 'standard' | 'enhanced'
    analytics: boolean
  }
  
  interface DemoScenario {
    title: string
    userProblem: string
    userArchetype: CommunicationArchetype
    expectedResponse: string
    demoOptimized?: boolean // Use proxied Ollama for faster, higher-quality responses
  }
  ```

- **Performance-Optimized Demo Mode**: Leverage proxied Ollama turbo for smooth demonstrations
  ```typescript
  const demoScenarios = [
    {
      problem: "I'm overwhelmed by a major career decision",
      logicalResponse: "Here's a systematic decision framework...", // Generated via proxied Ollama
      emotionalResponse: "Let's explore what this decision means to you...", // Higher quality responses
      practicalResponse: "Let's break this down into specific steps...", // Faster generation
      abstractResponse: "This sounds like a transition between life chapters...", // More nuanced language
      demoOptimized: true // Flag to use proxied endpoint
    }
  ]
  ```

- **Seamless Mode Switching**: Toggle between privacy and demo modes without code changes
  ```typescript
  // Demo banner component
  const DemoModeIndicator = () => {
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true'
    
    if (!isDemoMode) return null
    
    return (
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 text-center text-sm">
        🎪 Demo Mode: Enhanced performance for presentation • 
        <Link href="/privacy-mode" className="underline ml-2">Switch to Full Privacy Mode</Link>
      </div>
    )
  }
  ```

### 5.2 Demo Interface

**Objective**: Intuitive demonstration of adaptation capabilities

**Tasks**:

- **Demo Dashboard**: Create `/app/demo/page.tsx` with scenarios
- **Interactive Archetype Switching**: Toggle between user types
- **Response Comparison View**: Split-screen showing different approaches

### 5.3 Demo Content & Strategy

**Objective**: Compelling demonstration scenarios with optimal performance

**Tasks**:

- **Scenario Library**: 5-8 common mental health scenarios with automatic quality scaling
  ```typescript
  const demoScenarios = [
    {
      id: 'career_transition',
      title: 'Career Decision Overwhelm',
      userInput: "I'm completely overwhelmed by this career decision. I have three job offers and I can't decide which path to take.",
      expectedArchetypes: ['structured_analytical', 'empathetic_explorer', 'practical_guide']
    },
    // 7 more scenarios...
  ]
  ```

- **Automatic Quality Enhancement**: System intelligently scales based on available infrastructure
  - **Local Mode**: gpt-oss:20b, compact responses, privacy-first
  - **Cloud Fallback**: gpt-oss:120b, enhanced language, richer therapeutic insights

- **Performance Benchmarking**: Show the difference in experience
  ```typescript
  const performanceMetrics = {
    localMode: {
      responseTime: '3-8 seconds',
      privacy: '100% offline',
      model: 'gpt-oss:20b',
      quality: 'Excellent therapeutic responses'
    },
    cloudFallback: {
      responseTime: '1-3 seconds',
      privacy: 'Cloud processing',
      model: 'gpt-oss:120b', 
      quality: 'Enhanced therapeutic insights'
    }
  }
  ```

- **Demo Narrative Strategy**: 
  - **Opening**: "This system intelligently scales from local privacy-first operation..."
  - **Live Demo**: "Notice how it automatically uses the optimal model - gpt-oss:20b locally or gpt-oss:120b in the cloud"  
  - **Privacy Emphasis**: "Users always get privacy-first by default, with seamless enhancement when needed"
  - **Technical Highlight**: "Zero configuration required - works immediately on any system"

## Phase 6: Production Polish (Week 6)

### 6.1 Performance Optimization

**Objective**: Smooth, responsive user experience

**Tasks**:

- **Model Loading**: Optimize local model startup and response times
- **Memory Management**: Efficient conversation history handling
- **Progressive Loading**: Show typing indicators, progressive responses

### 6.2 User Experience Enhancements

**Objective**: Professional, intuitive interface

**Tasks**:

- **Onboarding Flow**: Smooth introduction to the system
- **Response Quality**: Implement response regeneration options
- **Accessibility**: Ensure WCAG compliance

### 6.3 Error Handling & Reliability

**Objective**: Robust system with graceful degradation

**Tasks**:

- **Model Fallbacks**: Handle local model failures
- **Graceful Degradation**: Function even with limited resources
- **Error Recovery**: Smart retry logic and user guidance

## Technical Architecture

### Refined Architecture Integration

Your enhanced system uses the [AI SDK Ollama provider](https://ai-sdk.dev/providers/community-providers/ollama#ollama-provider) for seamless local/cloud fallback:

```typescript
// Complete integration flow: UI → Assessment → Classification → AI SDK → Response
const systemFlow = {
  userInterface: "therapeutic communication preferences", // Hidden MBTI assessment
  classification: "structured_analytical",              // Secret archetype mapping  
  mbtiType: "INTJ",                                     // Hidden personality type
  aiSDKProvider: "ollama-ai-provider-v2",              // AI SDK community provider
  model: "gpt-oss:20b (local) / gpt-oss:120b (cloud)", // Automatic fallback
  prompt: "You're an INTJ psychologist...",            // Your refined prompts
  output: "Personalized therapeutic response"           // Adapted to user's style
}

// Technical advantages:
// ✅ AI SDK integration - consistent with existing codebase
// ✅ Automatic local/cloud detection with offline-first priority
// ✅ Status indicators for transparency (🔒 Private vs 🌐 Online Turbo)  
// ✅ User notification when switching to online mode
// ✅ Zero configuration required for basic functionality
```

### Final System Design

```
┌─────────────────────────────────────────┐
│                Frontend                 │
│  - Adaptive Onboarding                  │
│  - Chat Interface                       │
│  - Demo Dashboard                       │
└─────────────────────────────────────────┘
                    │
┌─────────────────────────────────────────┐
│            Classification               │
│  - Lightweight Assessment               │
│  - Communication Archetype Mapping     │
│  - Invisible Adaptation                 │
└─────────────────────────────────────────┘
                    │
┌─────────────────┬───────────────────────┐
│  Therapeutic    │    Communication      │
│     Core        │      Adapter          │
│  - Problem      │  - Style Templates    │
│    Analysis     │  - Language Patterns  │
│  - Counseling   │  - Response Shaping   │
│    Logic        │                       │
└─────────────────┴───────────────────────┘
                    │
┌─────────────────────────────────────────┐
│         Intelligent Model Layer        │
│  - gpt-oss:20b (Local, Privacy-First)  │
│  - gpt-oss:120b (Cloud Fallback)       │
│  - Automatic Detection & Switching     │
└─────────────────────────────────────────┘
```

### Key Implementation Files

**New Files to Create**:

- `/components/onboarding/TherapeuticPreferences.tsx` - Hidden assessment flow
- `/components/general/ConnectionStatus.tsx` - Offline/Online status indicator
- `/lib/helpers/responseStyleMapping.ts` - Obfuscated MBTI classification  
- `/lib/models/TherapeuticCore.ts` - Core counseling engine
- `/lib/adapters/CommunicationAdapter.ts` - Style adaptation layer
- `/lib/storage/LocalStorage.ts` - Encrypted conversation storage
- `/components/demo/DemoComparison.tsx` - Side-by-side demo showcase
- `/app/demo/page.tsx` - Demonstration interface
- `/scripts/setup-ollama-key.sh` - Vercel API key configuration script

**Files to Modify**:

- `/app/api/completion/route.ts` - Replace with local model and dual-mode architecture
- `/lib/helpers/personality.ts` - Your refined `getSystemInstructionsFor` is already optimized ✅
  - Direct, provocative prompts with concrete exercises
  - Action-oriented approach for each MBTI type
  - Enhanced therapeutic targeting of blind spots
  - Ready for hidden integration with therapeutic preference system
- `/hooks/usePersonalityAssessment.ts` - Update for adaptive system  
- `/models/interfaces.ts` - Add new interface definitions
- `/models/Store.ts` - Add archetype and privacy state
- `/app/page.tsx` - Integrate new onboarding flow

### Dependencies Management

**Remove**:

- `@ai-sdk/openai`
- `openai`

**Add**:

- `ollama-ai-provider-v2` (AI SDK community provider for Ollama)
- `dexie` (for IndexedDB management)
- `crypto-js` (for local encryption)

### Environment Configuration

**Development Setup**:

```bash
# Install Ollama (for local development)
curl -fsSL https://ollama.ai/install.sh | sh

# Start Ollama service
ollama serve

# Pull gpt-oss model for local privacy-focused use
ollama pull gpt-oss:20b

# Note: If gpt-oss:20b is not available locally, system will automatically 
# fallback to cloud endpoint with gpt-oss:120b for enhanced performance
```

**Intelligent Fallback System**:

```typescript
// Automatic detection and fallback - no environment configuration needed
const architectureFlow = {
  step1: "Check for local Ollama installation (privacy-first)",
  step2: "If local available → use gpt-oss:20b (compact, private)",
  step3: "If local unavailable → fallback to cloud gpt-oss:120b (enhanced)",
  step4: "Seamless user experience regardless of infrastructure"
}

// Benefits of this approach:
// ✅ Privacy-first: Always tries local installation first
// ✅ Demo-ready: Automatic fallback to enhanced cloud model  
// ✅ Zero configuration: Works out of the box for any user
// ✅ Performance scaling: Larger model (120b) for cloud, efficient model (20b) for local
// ✅ Transparent operation: User never knows which backend is being used

// Implementation already shown above in the API route section
```

**Docker Configuration** (for easy deployment):

```dockerfile
FROM ollama/ollama
COPY ./models /models
EXPOSE 11434
CMD ["serve"]
```

**Required Environment Variables**:

```bash
# .env.local
OLLAMA_API_KEY=your-ollama-cloud-api-key

# Note: Local Ollama requires no configuration
# Cloud fallback only needs API key for Ollama.com service
```

**Vercel API Key Setup Script**:

```bash
#!/bin/bash
# scripts/setup-ollama-key.sh

echo "🔧 Setting up Ollama API Key for Vercel deployment..."
echo "⚠️  This will configure online fallback for when local Ollama is unavailable"
echo ""
echo "Do you want to configure Ollama Turbo API key? (y/N)"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    echo "Enter your Ollama API key:"
    read -r api_key
    
    if [ -n "$api_key" ]; then
        # Set in Vercel environment
        vercel env add OLLAMA_API_KEY "$api_key" production
        vercel env add OLLAMA_API_KEY "$api_key" preview
        
        # Set in local .env
        echo "OLLAMA_API_KEY=$api_key" >> .env.local
        
        echo "✅ Ollama API key configured successfully!"
        echo "🌐 System will now fallback to Ollama Turbo when local Ollama is unavailable"
    else
        echo "❌ No API key provided. Local-only mode will be used."
    fi
else
    echo "⚠️  Skipping Ollama Turbo setup. System will work in local-only mode."
    echo "📝 You can run this script later if you want online fallback capability."
fi
```

**Usage**: `chmod +x scripts/setup-ollama-key.sh && ./scripts/setup-ollama-key.sh`

## Success Metrics

### Technical Goals

- [ ] 100% offline operation (no external API calls)
- [ ] <3 second response times on local hardware
- [ ] <5 questions for accurate archetype classification
- [ ] 95%+ user satisfaction in demo scenarios

### Privacy Goals

- [ ] Zero data transmission to external servers
- [ ] Client-side encryption for all stored data
- [ ] User-controlled data retention and deletion
- [ ] Clear privacy documentation and controls

### Demonstration Goals

- [ ] Clear differentiation in responses across archetypes
- [ ] Compelling side-by-side comparisons
- [ ] Smooth, professional demo experience
- [ ] Evidence of therapeutic effectiveness

## Risk Mitigation

### Technical Risks

- **Model Performance**: Local model may be slower than cloud APIs
    - *Mitigation*: Dual-mode architecture with proxied Ollama for demos, optimized prompts, response caching
- **Demo Quality**: Local models might produce less impressive demo responses
  - *Mitigation*: Automatic cloud fallback with larger gpt-oss models (120B vs 20B) for enhanced demonstrations
- **Storage Limitations**: Browser storage constraints for conversations
    - *Mitigation*: Implement data compression, conversation archiving
- **Demo Infrastructure Dependency**: Proxied Ollama might be unavailable during presentation
    - *Mitigation*: Fallback to local mode, pre-generated demo responses, backup demo videos

### User Experience Risks

- **Classification Accuracy**: Archetype detection may be imperfect
    - *Mitigation*: Confidence scoring, re-assessment triggers, graceful handling
- **Response Quality**: Local models may produce lower quality responses
    - *Mitigation*: Response validation, regeneration options, quality filters

### Privacy Risks

- **Data Leakage**: Accidental external data transmission
    - *Mitigation*: Comprehensive network monitoring, audit procedures
- **Local Storage Security**: Browser-based storage vulnerabilities
    - *Mitigation*: Strong encryption, secure key management, user education

## Delivery Timeline

**Week 1**: Offline model integration and testing
**Week 2**: Adaptive classification system
**Week 3**: Two-part architecture implementation  
**Week 4**: Privacy features and security audit
**Week 5**: Demo system and content creation
**Week 6**: Polish, optimization, and final testing

**Demo Ready**: End of Week 5
**Production Ready**: End of Week 6

This plan transforms the existing symbiossis codebase into a privacy-focused, offline mental health support agent that
dynamically adapts its counseling approach while maintaining therapeutic effectiveness across different user
communication styles.
