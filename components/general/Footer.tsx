const Footer = () => (
  <footer className='border-t border-border/40 py-8 mt-10 bg-background/50 backdrop-blur-sm'>
    <div className='container mx-auto px-4'>
      <div className='flex flex-col md:flex-row justify-between items-center'>
        <div className='flex items-center mb-4 md:mb-0'>
          <div className='size-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center mr-2'>
            <span className='text-primary font-bold text-sm'>R</span>
          </div>
          <span className='text-sm text-foreground/80'>
            © {new Date().getFullYear()} Symbiossis AI
          </span>
        </div>

        <div className='flex space-x-8'>
          <a
            href='/terms'
            className='text-sm text-foreground/60 hover:text-foreground/80 transition-colors'>
            Terms
          </a>
          <a
            href='/privacy'
            className='text-sm text-foreground/60 hover:text-foreground/80 transition-colors'>
            Privacy
          </a>
          <a
            href='/contact'
            className='text-sm text-foreground/60 hover:text-foreground/80 transition-colors'>
            Contact
          </a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
