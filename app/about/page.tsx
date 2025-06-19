'use client'
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './about.module.css'
import { type Project } from '@/app/page'
import { useRouter } from 'next/navigation'

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import {Observer} from 'gsap/Observer'
import { SplitText } from "gsap/SplitText";
import {EasePack} from 'gsap/EasePack'
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrambleTextPlugin)
gsap.registerPlugin(EasePack)
gsap.registerPlugin(SplitText)
gsap.registerPlugin(Observer)

export default function(){

    const container = useRef(null)
    const [gridArr, setGridArr] = useState<string[][] | null[][]>([[]])
    const [show, setShow] = useState(false)


    const Skills = [
        [
            'Front-End development',
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/></svg>
        ],
        [
            'Back-End development',
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2"/><path d="M6 6h.01"/><path d="M6 18h.01"/><path d="m13 6-4 6h6l-4 6"/></svg>
        ],
        [
            'UI Design',
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.034 12.681a.498.498 0 0 1 .647-.647l9 3.5a.5.5 0 0 1-.033.943l-3.444 1.068a1 1 0 0 0-.66.66l-1.067 3.443a.5.5 0 0 1-.943.033z"/><path d="M5 17A12 12 0 0 1 17 5"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/></svg>
        ],
        [
            'Graphic Design',
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"/><path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"/><path d="m2.3 2.3 7.286 7.286"/><circle cx="11" cy="11" r="2"/></svg>
        ],
        [
            'Simple database design',
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>

        ],
        [
            'UI Animation',
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 11h.01"/><path d="M14 6h.01"/><path d="M18 6h.01"/><path d="M6.5 13.1h.01"/><path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"/><path d="M17.4 9.9c-.8.8-2 .8-2.8 0"/><path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"/><path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"/></svg>

        ],
        [
            'Communication',
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"/><path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"/><path d="M17 15a3.5 3.5 0 0 0-.025-4.975"/></svg>

        ],
        [
            'System design',
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 22v-2"/><path d="m17 20.66-1-1.73"/><path d="M11 10.27 7 3.34"/><path d="m20.66 17-1.73-1"/><path d="m3.34 7 1.73 1"/><path d="M14 12h8"/><path d="M2 12h2"/><path d="m20.66 7-1.73 1"/><path d="m3.34 17 1.73-1"/><path d="m17 3.34-1 1.73"/><path d="m11 13.73-4 6.93"/></svg>

        ]
    ]

    const tools = [
        'React',
        'Next',
        'TS',
        'Vercel',
        'Jest',
        'Supabase',
        'CSS',
        'HTML',
        'Figma',
        'Python',
        'Postgres',
        'Flask',
        'Selenium',
        'Affinity',
        'Blender',
        'Make',
        'Motion',
        'Office',
        'Webflow',
    ]
    const textRef1 = useRef<SplitText | null>(null)
    const textRef2 = useRef<SplitText | null>(null)
    const textRef3 = useRef<SplitText | null>(null)
    useGSAP(()=>{
        
        textRef1.current = SplitText.create("#titleAbout", {
            type: "words, chars",
        });
        textRef2.current = SplitText.create("#titleAbout1", {
            type: "words, chars",
        });
        textRef3.current = SplitText.create("#para", {
            type: "words, chars",
        });
        const tl = gsap.timeline()
        tl.fromTo('#reveal',{
            height: '100vh',
            width: '100vw'
        },{
            width: '0vw',
            delay: 0.5,
            duration: 0.5
        })

        tl.from(textRef1.current?.chars,{
            rotateX: 90,
            x: -15,
            autoAlpha: 0,
            delay: 0.2,
            duration: 0.2
        })
        tl.from(textRef2.current?.chars,{
            rotateX: 90,
            x: -15,
            autoAlpha: 0,
            delay: 0.2,
            duration: 0.2
        })
        tl.from(`#skillslbl`,{
            rotateX: 90,
            autoAlpha: 0
        },'<')
        tl.from(textRef3.current?.words,{
            rotateX: -90,
            autoAlpha: 0,
            duration: 0.2,
            stagger: 0.07
        })
        tl.from(`.${styles.skill}`,{
            rotateX: 90,
            autoAlpha: 0,
            stagger: 0.08
        },'<')

        tl.from(`.${styles.tool}`,{
            autoAlpha: 0,
            stagger: 0.04
        })
        
        tl.fromTo(`.${styles.GridCont}`,{
            rotateX: 90,
        },{
            rotateX: 0
        })
    },{scope: container})
    useEffect(()=>{
    const GridCont = document.getElementById('GridCont') as HTMLDivElement
    const rect = GridCont.getBoundingClientRect()

    const Rows = 5
    
    const Cols = 30

    console.log(rect.height)
    console.log(rect.width)
    var RowsArr = []
    var ColsArr: string[][] = []

    for(let i=0;i<Cols;i++){
      RowsArr.push('+')
    }
    for(let i=0;i<Rows;i++){
      ColsArr.push(RowsArr)
    }

    if(gridArr.length == 1){
      setGridArr(ColsArr)
    }
    
    const elems = document.querySelectorAll(`.${styles.gridEl}`)
    GridCont.addEventListener('pointermove',(e)=>{
      if(!show){
      elems.forEach((elem)=>{
        const rect = elem.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if(dist<50){
          let tl = gsap.timeline()
          tl.to(elem, {
            duration: 0.8,
            color: '#980030',
            scale: 1.03,
            rotate: 360,
            ease:'none'
          });
          tl.to(elem, {
            duration: 0.2,
            rotate: 0,
            ease:'none',
            color: '#8C8C8C'
          });
        }
      })
    }
    })
  },[gridArr])
    return(
        <div className='main' ref={container}>
            <div className={styles.col}>
            <div className={styles.reveal} id="reveal"></div>
            <div className={styles.aboutContent}>
                
                <div className={styles.DetsCont}>
                    <div className={styles.col}>
                    <h1 className={styles.DetsHead} id='titleAbout'>Full stack Developer</h1>
                    <h1 className={styles.DetsHead} id='titleAbout1'>and Designer</h1>
                    </div>
                    <p className={styles.DetsPara} id='para'>I lead with creativity and I make an effort to deliver the best technical results I can. Constantly learning and improving on what I know. There is still unrealised potential in the world of Software</p>
                </div>
                <div className={styles.skillsCont}>
                    <h2 id='skillslbl'>Skills</h2>
                    <div className={styles.skillsWrap}>
                        {Skills.map((val,ind)=>
                            <div className={styles.skill} key={`skill-${ind}`}>
                                {val[1]}
                                <p className={styles.skillName}>{val[0]}</p>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
            <div className={styles.toolsCont}>
                {tools.map((val,ind)=>
                    <img className={styles.tool} src={`/Dets/${val}.png`} key={`tool-${val}`}/>
                )}
            </div>
            <div className={styles.GridCont} id="GridCont">
                {
                gridArr.map((val,ind)=>
                    <div className={styles.RC} key={`RC-${ind}`}>
                    {
                    val.map((valI, indI)=>
                    <div className={styles.gridEl} key={`El-${indI}`}>
                        <svg  width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 8.99622H18" stroke="currentColor"/>
                        <path d="M9.00381 0L9.00381 18" stroke="currentColor"/>
                        </svg>
                    </div>
                    )
                    }
                    </div>
                )
                }
            </div>
            </div>
        </div>
    )
}