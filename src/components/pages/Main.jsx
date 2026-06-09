import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useInView, 
  useAnimate, 
  stagger 
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import HorizontalScroll from "./HorizontalScroll";
import { usePicture } from "../../context/PictureContext";

function TypewriterText({ text, speed = 10, start }) {
  const [displayed, setDisplayed] = useState("")
  const indexRef = useRef(0)

  useEffect(() => {
    if (!start) return
    indexRef.current = 0
    setDisplayed("")

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayed(text.slice(0, indexRef.current + 1))
        indexRef.current++
      } else {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [start, text, speed])

  return <span className="whitespace-pre-line">{displayed}</span>
}

export default function MainPage() {
    const { scrollY } = useScroll();
    const ref = useRef();
    const [scope, animate] = useAnimate(); 
    const [heroScope, heroAnimate] = useAnimate();
    const isInView = useInView(scope, {amount:0.8})
    const { setActiveImageUrl } = usePicture()
    const pictureRef = useRef(null)
    const isPictureInView = useInView(pictureRef, { amount: 0.5 })
    const [typewriterStarted, setTypewriterStarted] = useState(false)
    const [showContact, setShowContact] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopyEmail = () => {
      navigator.clipboard.writeText('beckaustine@outlook.com')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    useEffect(() => {
      setActiveImageUrl(isPictureInView ? '/augustus3.png' : null)
    }, [isPictureInView, setActiveImageUrl])

    // Calculate the opacity based on the scroll position
    // If ref is not mounted, use a default height of 150
    const opacity = useTransform(scrollY, [0, ref.current?.offsetHeight / 2 || 150], [1, 0]);
    const sequence = [
      ['#main', {opacity:[0,1]}], 
      ['#main', {x:[0,-15]}, {at: "+0.5"}],
      ['.foo',{opacity:[0,1], x:[-15,-14]}, {duration: 0.5}]
    ]
    useEffect(() => {
      heroAnimate(sequence);
      if (isInView) {
        animate("p", {y:"0%"}, {delay: stagger(0.4), ease:"easeIn", type:"spring", stiffness:50})
        setTypewriterStarted(true)
      }else { 
        animate("p", {y:"100%"}, {delay: stagger(0.3, {from: "last"}), ease:"easeOut"})
      }
    }, [isInView])

    return (
        <div className="relative z-40 px-4 md:px-6 pointer-events-none">
          <nav className="sticky top-0 z-50 text-white p-2 md:p-4 font-Bebas bg-black pointer-events-auto">
            <AnimatePresence mode="wait">
              {showContact ? (
                <motion.ul
                  key="contact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-between text-sm md:text-base"
                >
                  <motion.li
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0 }}
                  >
                    <button onClick={() => setShowContact(false)} className="hover:underline cursor-pointer">← BACK</button>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <button onClick={handleCopyEmail} className="hover:underline cursor-pointer">{copied ? 'EMAIL COPIED' : 'EMAIL'}</button>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <a href="https://github.com/Bahdmanbabzo" target="_blank" rel="noopener noreferrer">GITHUB</a>
                  </motion.li>
                  <motion.li
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <a href="https://www.linkedin.com/in/oserebameh-beckley/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
                  </motion.li>
                </motion.ul>
              ) : (
                <motion.ul
                  key="main"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-between text-sm md:text-base"
                >
                  <li><a href="#about" className="hover:underline">ABOUT</a></li>
                  <li><a href="#works" className="hover:underline">WORKS</a></li>
                  <li><button onClick={() => setShowContact(true)} className="hover:underline cursor-pointer">CONTACT</button></li>
                </motion.ul>
              )}
            </AnimatePresence>
          </nav>
          <div className="text-white h-screen relative font-Epilogue grid place-items-center">
           <motion.div ref={heroScope} style={{opacity: opacity}}>
             <span id="main" className="text-4xl md:text-6xl font-bold font-Ewert inline-block">BECKLEY</span><span className="text-xs md:text-sm foo inline-block">.PORTFOLIO</span>
           </motion.div>
          </div>
          <div id="works">
            <HorizontalScroll />
          </div>
          <div id="about" className="text-white font-light h-auto min-h-screen md:h-screen font-Epilogue flex flex-col md:flex-row" ref={scope}>
            <section className="w-full md:w-1/2 border-b-2 md:border-b-0 md:border-r-2 border-white relative min-h-[40vh] md:min-h-0">
             <div className="overflow-hidden absolute top-20 md:top-40 left-4 md:left-0" ref={pictureRef}>
                 <motion.p initial={{y:"100%"}}>
                  <img src="/DSC_0218.jpg" alt="" />
                 </motion.p>
               </div>
           </section>
            <section className="w-full md:w-1/2 flex items-center">
              <div className="flex flex-col gap-4 p-4 md:p-6">
                <div className="overflow-hidden">
                  <motion.p
                    initial={{ y: "100%" }}
                    animate={{ y: isInView ? "0%" : "100%" }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.8, type: "spring", stiffness: 50 }}
                    className="text-2xl md:text-3xl font-bold font-Bebas"
                  >
                    about me
                  </motion.p>
                </div>
                <div className="text-sm font-light leading-relaxed text-zinc-200 max-w-lg flex flex-col gap-3">
                  <TypewriterText start={typewriterStarted} text="I'm a creative systems engineer, ML researcher, and medical student based in Lagos, crafting immersive 3D experiences that blend graphics infrastructure with clinical neuroscience.I architect client-side WebGPU/WebGL pipelines, WebXR environments, and custom WGSL compute shaders—pushing boundaries within a browser tab.
                  From publishing on arXiv and speaking internationally at conferences to building real-time 3D digital twins, I build high-performance edge technology." />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['WebGPU/WebGL', 'WebXR', 'WGSL', 'Three.js', 'React', 'Machine Learning'].map(skill => (
                      <span key={skill} className="text-xs border border-white/20 px-2 py-0.5 rounded-full text-zinc-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
       </div>
    );
}