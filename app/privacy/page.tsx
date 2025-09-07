'use client'

import {observer} from '@legendapp/state/react'

const PrivacyPolicy = observer(() => (
  <div className='container mx-auto px-4 py-8 max-w-4xl'>
    <div className='mb-8'>
      <h1 className='text-3xl font-bold mb-2 text-gradient'>Privacy Policy</h1>
      <p className='text-foreground/80'>Last updated: May 2023</p>
    </div>

    <div className='space-y-6'>
      <section>
        <h2 className='text-xl font-semibold mb-3'>Introduction</h2>
        <p className='text-foreground/80'>
          This Privacy Policy explains how we collect, use, and protect your information when you
          use the Symbiossis application. We respect your privacy and are committed to protecting
          your personal data.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-3'>Information We Collect</h2>
        <p className='text-foreground/80'>
          When you use Symbiossis, we may collect the following types of information:
        </p>
        <ul className='list-disc pl-6 mt-2 text-foreground/80 space-y-2'>
          <li>
            <strong>Usage Data:</strong> Information about how you interact with our application,
            including the questions you ask and the responses you receive.
          </li>
          <li>
            <strong>Analytics Data:</strong> We use Plausible Analytics, a privacy-friendly
            analytics tool that collects anonymous usage data to help us improve our service.
          </li>
          <li>
            <strong>Feedback Data:</strong> Any ratings or feedback you provide about the quality of
            responses.
          </li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-3'>How We Use Your Information</h2>
        <p className='text-foreground/80'>
          We use the information we collect for the following purposes:
        </p>
        <ul className='list-disc pl-6 mt-2 text-foreground/80 space-y-2'>
          <li>To provide and maintain our service</li>
          <li>To improve and personalize your experience</li>
          <li>To analyze usage patterns and improve our application</li>
          <li>To develop new features and functionality</li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-3'>Data Sharing and Disclosure</h2>
        <p className='text-foreground/80'>
          We do not sell your personal information to third parties. We may share anonymized data
          with:
        </p>
        <ul className='list-disc pl-6 mt-2 text-foreground/80 space-y-2'>
          <li>Service providers who help us operate and improve our application</li>
          <li>Analytics providers to help us understand how our application is used</li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-3'>Data Security</h2>
        <p className='text-foreground/80'>
          We implement appropriate security measures to protect your personal information from
          unauthorized access, alteration, disclosure, or destruction.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-3'>Your Rights</h2>
        <p className='text-foreground/80'>
          Depending on your location, you may have certain rights regarding your personal
          information, including:
        </p>
        <ul className='list-disc pl-6 mt-2 text-foreground/80 space-y-2'>
          <li>The right to access the personal information we hold about you</li>
          <li>The right to request correction or deletion of your personal information</li>
          <li>The right to restrict or object to our processing of your personal information</li>
          <li>The right to data portability</li>
        </ul>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-3'>Changes to This Privacy Policy</h2>
        <p className='text-foreground/80'>
          We may update our Privacy Policy from time to time. We will notify you of any changes by
          posting the new Privacy Policy on this page.
        </p>
      </section>

      <section>
        <h2 className='text-xl font-semibold mb-3'>Contact Us</h2>
        <p className='text-foreground/80'>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className='mt-2 text-foreground/80'>
          <a href='mailto:contact@anbiti.me' className='text-primary hover:underline'>
            contact@anbiti.me
          </a>
        </p>
      </section>
    </div>
  </div>
))

export default PrivacyPolicy
