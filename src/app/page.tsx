'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { Transition } from 'framer-motion'
import RSVPModal from '@/components/RSVPModal'

const BASE: Transition = { repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }

const float = (y: number[], duration: number, delay = 0) => ({
    animate: { y },
    transition: { ...BASE, duration, delay },
})

const sway = (rotate: number[], duration: number, delay = 0) => ({
    animate: { rotate },
    transition: { ...BASE, duration, delay },
})

const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: 'easeOut' } satisfies Transition,
})

export default function MobileBabyShowerInvite() {
    const [rsvpOpen, setRsvpOpen] = useState(false)
    return (
        /* h-[100dvh] is crucial for mobile web to prevent the bottom from
          being cut off by Safari/Chrome URL bars.
        */
        <div className="relative w-full h-[100dvh] bg-[#fdfdfc] overflow-hidden flex flex-col items-center justify-center select-none">

            {/* --- BACKGROUND WATERCOLORS --- */}


            {/*top with banner*/}
            <div>
                {/* --- TOP DECORATIONS --- */}
                <motion.div className="absolute top-[-70] left-0 w-full z-10" {...sway([-1, 1, -1], 5)}>
                    <Image src="/images/banner.png" alt="" width={500} height={150} className="w-full h-auto object-contain" priority />
                </motion.div>

                <Image
                    src="/images/light_green_waterdrop.png"
                    alt=""
                    width={400}
                    height={400}
                    loading="eager"
                    className="absolute top-[-130] right-[-200] w-full pointer-events-none"
                />
                <Image
                    src="/images/light_green_waterdrop.png"
                    alt=""
                    width={400}
                    height={400}
                    loading="eager"
                    className="absolute top-[-120] left-[-230] w-full pointer-events-none]"
                />
            </div>

            {/*two leafs and the waterdrop color*/}
            <div>
                <motion.div className="absolute top-[10%] left-[-12%] w-[40%] z-20 scale-x-[-1] rotate-[70deg]" {...sway([-3, 3, -3], 6)}>
                    <Image src="/images/leaf.png" alt="" width={200} height={300} className="w-full h-auto object-contain" />
                </motion.div>

                <motion.div className="absolute top-[10%] right-[-12%] w-[40%] z-20 -scale-x-[-1] rotate-[-69deg] " {...sway([3, -3, 3], 6, 1)}>
                    <Image src="/images/leaf.png" alt="" width={200} height={300} className="w-full h-auto object-contain" />
                </motion.div>

                <Image
                    src="/images/light_green_waterdrop.png"
                    alt=""
                    width={400}
                    height={400}
                    loading="eager"
                    className="absolute top-[-12%] left-[-60%]  rotate-[-75deg] w-full pointer-events-none"
                />
                <Image
                    src="/images/light_green_waterdrop.png"
                    alt=""
                    width={400}
                    height={400}
                    loading="eager"
                    className="absolute top-[-5%] right-[-70%] rotate-[75deg]  w-full pointer-events-none]"
                />
            </div>

            <div>
                <motion.div
                    className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[45%] max-w-[200px] z-30"
                    {...float([0, -12, 0], 4)}
                >
                    <Image src="/images/panda_in_ballon.png" alt="Panda in hot air balloon" width={300} height={400} className="w-full h-auto object-contain scale-125" priority />
                </motion.div>

                <Image
                    src="/images/light_green_waterdrop.png"
                    alt=""
                    width={400}
                    height={400}
                    loading="eager"
                    className="absolute top-[-5%] left-1/2 -translate-x-1/2  scale-75 rotate-[-0-deg] w-full pointer-events-none]"
                />
            </div>





            {/* --- TYPOGRAPHY & CONTENT --- */}
            {/* Using vh/vw for margins and clamp() ensures the text dynamically
        shrinks/grows perfectly based on the mobile device's screen size.
      */}
            <div className="absolute z-30 flex flex-col items-center text-center w-[90%] top-[38%]">

                <motion.p {...fadeUp(0.1)} className="font-[family-name:var(--font-dancing)] text-[#8c6d4b] text-[clamp(1.5rem,5vw,2.8rem)] mb-1">
                    Please join us for a
                </motion.p>

                <motion.h1 {...fadeUp(0.2)} className="font-[family-name:var(--font-playfair)] text-[#365744] text-[clamp(2.9rem,12vw,4.5rem)] font-extrabold tracking-widest leading-none">
                    BABY
                </motion.h1>

                <motion.h2 {...fadeUp(0.3)} className="font-[family-name:var(--font-dancing)] text-[#a8825c] text-[clamp(3.5rem,14vw,5rem)] -mt-[2%] mb-2">
                    Shower
                </motion.h2>

                <motion.p {...fadeUp(0.4)} className="font-[family-name:var(--font-dancing)] text-[#8c6d4b] text-[clamp(1.8rem,5.5vw,1.5rem)] -mt-[6%] mb-3">
                    Honoring Priya Patel
                </motion.p>

                {/* Date Row */}
                <motion.div {...fadeUp(0.5)} className="flex items-center justify-center w-[90%] my-1">
                    <div className="h-px bg-[#a37c58] flex-1 opacity-50"></div>
                    <div className="px-3 flex items-center space-x-3 text-[#5c5c5c] font-[family-name:var(--font-lato)]">
                        <span className="text-[clamp(0.8rem,2.5vw,0.8rem)] font-bold tracking-widest">SUNDAY</span>
                        <div className="flex flex-col items-center">
                            <span className="font-[family-name:var(--font-playfair)] text-[clamp(2.5rem,8vw,3rem)] font-bold text-[#8c6d4b] leading-none">09</span>
                            <span className="text-[clamp(0.6rem,2vw,0.6rem)] font-bold tracking-widest mt-1">AUGUST</span>
                        </div>
                        <span className="text-[clamp(0.8rem,2.5vw,0.8rem)] font-bold tracking-widest">AT 10:00 AM</span>
                    </div>
                    <div className="h-px bg-[#a37c58] flex-1 opacity-50"></div>
                </motion.div>

                {/* Buttons Row */}
                <motion.div {...fadeUp(0.6)} className="mt-4 flex gap-3 justify-center">
                    <button
                        onClick={() => setRsvpOpen(true)}
                        style={{
                            background: '#365744', color: '#fff', border: 'none',
                            borderRadius: '9999px', padding: '0.5rem 1.5rem',
                            fontFamily: 'var(--font-lato)', fontWeight: 700,
                            fontSize: 'clamp(0.7rem, 3vw, 0.85rem)', letterSpacing: '0.07em',
                            cursor: 'pointer',
                        }}
                    >
                        RSVP
                    </button>
                    <a
                        href="https://maps.google.com/?q=2000+Billy+G+Webb+Dr,+Portland,+TX"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: '#365744', background: 'transparent',
                            border: '2px solid #365744', borderRadius: '9999px',
                            padding: '0.5rem 1.5rem',
                            fontFamily: 'var(--font-lato)', fontWeight: 700,
                            fontSize: 'clamp(0.7rem, 3vw, 0.85rem)', letterSpacing: '0.07em',
                            textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
                        }}
                    >
                        Location
                    </a>
                </motion.div>

            </div>



            {/* --- BOTTOM DECORATIONS --- */}
            {/*left side*/}
            <div>
                <Image
                    src="/images/light_blue_waterdrop.png"
                    alt=""
                    width={400}
                    height={400}
                    className="absolute top-[20%] left-[-70%]  pointer-events-none"
                />
                <motion.div className="absolute top-[49%] left-[-10%] w-[50%] max-w-[130px] z-10 scale-150 rotate-3" {...float([0, -10, 0], 3.5, 0.8)}>
                    <Image src="/images/ballons.png" alt="" width={150} height={200} className="w-full h-auto object-contain" />
                </motion.div>
                <motion.div className="absolute bottom-[-3%] left-[-6%] w-[28%] max-w-[140px] z-40" {...float([0, -8, 0], 4.5, 0.2)}>
                    <Image src="/images/box_baby.png" alt="" width={200} height={200} className="w-full h-auto object-contain" />
                </motion.div>
            </div>

            <div>
                <Image
                    src="/images/light_blue_waterdrop.png"
                    alt=""
                    width={400}
                    height={400}
                    className="absolute top-[20%] right-[-65%] pointer-events-none"
                />
                <motion.div className="absolute top-[40%] right-[-6%] w-[28%] max-w-[120px] z-20 rotate-[-25deg]" {...sway([-3, 3, -3], 5.5, 0.5)}>
                    <Image src="/images/baby_cloths.png" alt="" width={150} height={200} className="w-full h-auto object-contain" />
                </motion.div>
            </div>



            <div>
                <motion.div className="absolute bottom-[5%] right-[-8%] w-[26%] max-w-[130px] z-10 rotate-12 scale-125" {...float([0, -10, 0], 3.5, 0.8)}>
                    <Image src="/images/ballons.png" alt="" width={150} height={200} className="w-full h-auto object-contain" />
                </motion.div>
                <motion.div className="absolute bottom-[-4%] right-[-6%] w-[28%] max-w-[110px] z-40" {...float([0, -5, 0], 5, 1)}>
                    <Image src="/images/gift_box.png" alt="" width={150} height={150} className="w-full h-auto object-contain" />
                </motion.div>
            </div>

            <div>
                <motion.div className="absolute bottom-[-10%] left-[25%] w-[50%] max-w-[250px] z-20" {...float([0, -4, 0], 6, 0.5)}>
                    <Image src="/images/rainbow.png" alt="" width={300} height={150} className="w-full h-auto object-contain" />
                </motion.div>
            </div>

            <div>
                <Image
                    src="/images/light_blue_waterdrop.png"
                    alt=""
                    width={400}
                    height={400}
                    className="absolute bottom-[-30%] left-[-55%] pointer-events-none"
                />
                <Image
                    src="/images/light_blue_waterdrop.png"
                    alt=""
                    width={400}
                    height={400}
                    className="absolute bottom-[-37%] left-[-25%] pointer-events-none"
                />
                <Image
                    src="/images/light_blue_waterdrop.png"
                    alt=""
                    width={400}
                    height={400}
                    className="absolute bottom-[-40%] right-[-5%]  pointer-events-none"
                />
                <Image
                    src="/images/light_blue_waterdrop.png"
                    alt=""
                    width={400}
                    height={400}
                    className="absolute bottom-[-20%] right-[-68%]  pointer-events-none"
                />

            </div>

            <AnimatePresence>
                {rsvpOpen && <RSVPModal key="rsvp-modal" onClose={() => setRsvpOpen(false)} />}
            </AnimatePresence>

        </div>
    )
}
