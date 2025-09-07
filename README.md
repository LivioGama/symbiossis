# Symbiossis - Personalized Therapeutic AI Companion

<img src="./public/hero.webp" height="350" alt="Symbiossis Hero">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.4.7-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Health & Wellness](https://img.shields.io/badge/category-Health%20%26%20Wellness-purple.svg)
![AI/ML](https://img.shields.io/badge/category-AI%2FML-orange.svg)

### 🧠 Revolutionizing Mental Health Support Through Personalized AI Therapy

*Experience truly individualized therapeutic conversations that adapt to your unique personality and communication
style*

---

## 🌟 **What Makes Symbiossis Special?**

Symbiossis isn't just another AI chatbot—it's a **personalized therapeutic companion** that understands you. Using
advanced personality analysis and GPT-OSS models, it creates tailored mental health support that feels genuinely human
and uniquely yours.

### ✨ **How does it work?**

Simply submit your biggest challenges in life recently, and you will be shocked by THE answer. Symbiossis is BETTER than
your therapist and available 24/7 for FREE.

---

## 🎬 **Demonstration**

### **Video Presentation**

📹 Demo Video? What for? Why watch someone else's business when you can experience it yourself?

> [Try Symbiossis Now! 🧠](https://symbiossis.devliv.io)

> ⚠️ This version uses a **self-hosted** instance of [Plausible Analytics](https://plausible.io) to enable privacy-respecting, anonymous usage tracking. The solution is entirely cookieless, fully GDPR-compliant, and limited to visit data collection. No personal data (and nothing you will input) is collected, ensuring full transparency. See [Ollama Turbo](https://ollama.com/turbo).
> 

### 🔍 **Intelligent Problem Analysis Engine**

- **Real-time Analysis**: personal issues, no way-through and bottlenecks unlocked methodically.
- **Quality**: built on my multiple years of psychology side passion. Of course, I am nobody, but does it matter that I am famous or that it _actually_ works?

### 🤖 **GPT-OSS Integration**

- **Dual-Mode Processing**: 20B offline model + 120B online Ollama turbo fallback
- **Ollama Framework**: Local-first with seamless cloud enhancement
- **Edge Runtime**: Ultra-low latency responses
- **Automatic Fallback**: Seamlessly switches to remote Ollama Turbo servers when local processing is unavailable or
  insufficient, ensuring continuous optimal performance without interrupting the therapeutic experience

---

## 🎯 **Hackathon Categories**

### 🥇 **Primary: Best Overall**

*The absolutely most interesting application of GPT-OSS models - what can be better than helping every human overcome
their deepest bottlenecks through personalized AI therapy?*

### 🥈 **Secondary: For Humanity**

*The best application of GPT-OSS that benefits all of humanity - democratizing mental health support with accessible,
stigma-free therapeutic AI*

### 🥉 **Secondary: Best Local Agent**

*The most useful agentic application of GPT-OSS with no internet access - privacy-first local processing for secure
therapeutic conversations*

### 🎖️ **Secondary: Wildcard**

*The most unexpected use of GPT-OSS that OpenAI didn't think of - nobody thought they could bring their therapist in
their luggage when travelling*

### 🏆 **Devpost Hackathon Context**

This project was developed in the context of the [OpenAI Devpost Hackathon](https://openai.devpost.com/), demonstrating
innovative applications of AI for improving mental health accessibility and personalized therapeutic support.

---

## 📊 **Technical Specifications**

### **Model Performance**

- **Offline Mode**: GPT-OSS 20B parameters (~3-8s response time)
- **Online Turbo**: GPT-OSS 120B parameters (~1-3s response time)
- **Automatic Fallback**: Seamless switching based on availability

### **Supported Platforms**

- ✅ **Web Browsers**: Chrome, Firefox, Safari, Edge
- ✅ **Mobile**: Responsive design for all screen sizes
- ✅ **Accessibility**: WCAG 2.1 AA compliant

### **Security & Privacy**
- 🔐 **Client-Side Processing**: No data transmission by default
- 🛡️ **End-to-End Encryption**: For any cloud processing
- 📋 **GDPR Compliant**: User-controlled data retention
- 🔐 **Local Profile Storage**: User profiles stored in browser localStorage for continuity across sessions

---

## 🚀 **Quick Start**

### Prerequisites

```bash
# Install Ollama for local AI processing
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull gpt-oss:20b
```

⚠️ Requires a good GPU or Apple Silicon MacBook with 32 GB+ RAM for local model hosting.

### Installation

```bash
git clone https://github.com/LivioGama/symbiossis
cd symbiossis
bun install
```

### Setup Environment

```bash
# To use your own Ollama turbo API key (optional)
cp .env.example .env.local
```

### Development

```bash
bun run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** and experience personalized therapeutic AI! 🌱

---

## 🏗️ **Architecture Overview**

### **Core Components**

|      Component       |       Technology        |                  Purpose                  |
|:--------------------:|:-----------------------:|:-----------------------------------------:|
|     **Frontend**     | Next.js 15 + TypeScript |     Responsive therapeutic interface      |
| **Therapeutic Core** |      Custom Engine      | Problem analysis & personality adaptation |
| **AI Processing**   |   GPT-OSS via Ollama    |        Natural language generation        |
| **State Management** |      Legend State       |          Reactive data handling           |
|   **UI Framework**   |     Tailwind CSS v4     |         Modern, accessible design         |

---

*Built with ❤️ for mental health accessibility and AI innovation*

[![Made with Next.js](https://img.shields.io/badge/Made%20with-Next.js-black.svg)](https://nextjs.org)
[![Powered by GPT-OSS](https://img.shields.io/badge/Powered%20by-GPT--OSS-orange.svg)](https://ollama.ai)
[![Therapeutic AI](https://img.shields.io/badge/Therapeutic-AI-purple.svg)](https://github.com/LivioGama/symbiossis)
