'use client'
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './contact.module.css'
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

import { flicker } from '@/components/Flicker'

export default function(){

    const container = useRef(null)

    const handleALSM = ()=>{
        let tl = gsap.timeline()
        flicker(tl, '#inTitleA', '0.1')
        flicker(tl, '#inTitleL', '0.1')
        flicker(tl, '#inTitle-', '0.3')
        flicker(tl, '#inTitleS', '0.4')
        flicker(tl, '#inTitle-', '0.2')
        flicker(tl, '#inTitleM', '0.3')
        flicker(tl, '#inTitleblock', '0.1')
    }
    const handleMouseIn = ()=>{
        let tl = gsap.timeline()
        tl.to(`.${styles.BracketCont1}`,{
            x: -15,
            y:-15
        })
        tl.to(`.${styles.BracketCont2}`,{
            x: 15,
            y:-15
        },'<')
        tl.to(`.${styles.BracketCont3}`,{
            x: -15,
            y:15
        },'<')
        tl.to(`.${styles.BracketCont4}`,{
            x: 15,
            y:15
        },'<')

        
    }
    const handleMouseOut = () => {
        let tl = gsap.timeline()
        tl.to(`.${styles.BracketCont1}`,{
            x: 0,
            y: 0
        },'<')
        tl.to(`.${styles.BracketCont2}`,{
            x: 0,
            y: 0
        },'<')
        tl.to(`.${styles.BracketCont3}`,{
            x: 0,
            y: 0
        },'<')
        tl.to(`.${styles.BracketCont4}`,{
            x: 0,
            y: 0
        },'<')
    }
    useGSAP(()=>{
        let tl = gsap.timeline()
        let tl2 = gsap.timeline({repeat: -1})

        if(window.innerWidth < 1020){
            tl.fromTo('#Outer',{
                width: '2px',
                height: '2px'
            },
            {
                width: '100%',
                height: '85vh',
                duration: 0.6
            })
        }else{
            tl.fromTo('#Outer',{
                width: '2px',
                height: '2px'
            },
            {
                width: '70%',
                height: 'fit-content',
                duration: 0.6
            })
        }
        
        flicker(tl, '#inTitleA', '0.1')
        flicker(tl, '#inTitleL', '0.1')
        flicker(tl, '#inTitle-', '0.3')
        flicker(tl, '#inTitleS', '0.4')
        flicker(tl, '#inTitle-', '0.2')
        flicker(tl, '#inTitleM', '0.3')
        flicker(tl, '#inTitleblock', '0.1')
        tl.fromTo(`.${styles.introWrap}`,{autoAlpha: 0}, {autoAlpha: 1, duration: 1})
        
        const pulsers = document.querySelectorAll(`.${styles.pulser}`)

        for(let i = 0; i<pulsers.length;i++){
            let tl2 = gsap.timeline({repeat: -1})
            tl2.fromTo(pulsers[i],{
                x: 0,
                y: 0,
                boxShadow: '0px 0px 0px var(--accent1)'
            },{
                x: -4,
                y: -4,
                boxShadow: '4px 4px 2px var(--accent1)',
                delay: 1+(i*0.1),
                duration:0.3
            })

            tl2.to(pulsers[i],{
                x: 0,
                y: 0,
                boxShadow: '0px 0px 0px var(--accent1)',
                duration:0.1
            })
            tl2.to(pulsers[i],{
                x: 0,
                y: 0,
                boxShadow: '0px 0px 0px var(--accent1)',
                duration: ((pulsers.length - i)*0.2+(1+(i*0.1)))-7
            })
        }
        
    },{scope: container})

    var arr = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    return(
        <div className='main'>
            <div className={styles.rightCont} ref={container}>

                <div className={`${styles.Outer}`} id="Outer" onMouseEnter={handleMouseIn} onMouseLeave={handleMouseOut}>
                <div className={styles.BracketCont1}>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.23077 18.5385V3.61539C1.23077 2.51082 2.1262 1.61539 3.23077 1.61539H18.1539" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>
                <div className={styles.BracketCont2}>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 18.5385V3.61539C17 2.51082 16.1046 1.61539 15 1.61539H0.0769043" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>

                <div className={styles.center} id="intro">
                    <div className={styles.back} onMouseEnter={handleALSM} onMouseLeave={handleALSM}>
                    <svg id="inTitleA" width={100+30} height={74+30} viewBox="0 0 100 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M68.5327 37.0139L72.8207 12.4379H42.1007L34.8687 18.5819L31.6687 37.0139H68.5327ZM0.564697 73.8779L10.2927 18.5819L31.9887 0.149925H99.5727L86.5807 73.8779H62.0047L66.3567 49.3019H29.4927L25.1407 73.8779H0.564697Z" fill="currentColor"/>
                    </svg>
                    <svg id="inTitleL" width={89+30} height={75+30} viewBox="0 0 89 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.0429688 74.5735L13.035 0.845482H37.611L26.795 62.2855H88.235L86.059 74.5735H0.0429688Z" fill="currentColor"/>
                    </svg>
                    <svg id="inTitle-" width={29+30} height={19+30} viewBox="0 0 29 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.564697 18.6604L3.8287 0.228399H28.4047L25.1407 18.6604H0.564697Z" fill="currentColor"/>
                    </svg>
                    <svg id="inTitleS" width={100+30} height={75+30} viewBox="0 0 100 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.168701 74.6066L2.3447 62.3186H57.6407L64.8727 56.1746L65.9607 50.0306H4.5207L9.8967 19.3106L31.5927 0.878563H99.1767L94.8247 25.4546H70.2487L72.4247 13.1666H41.7047L34.4727 19.3106L31.2727 37.7426H92.7127L89.4487 56.1746L67.7527 74.6066H0.168701Z" fill="currentColor"/>
                    </svg>
                    <svg id="inTitle-" width={29+30} height={19+30} viewBox="0 0 29 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.199463 18.8447L3.46346 0.412725H28.0395L24.7755 18.8447H0.199463Z" fill="currentColor"/>
                    </svg>
                    <svg id="inTitleM" width={134+30} height={75+30} viewBox="0 0 134 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.668457 74.1025L13.6605 0.374535H118.108L133.276 18.8065L123.548 74.1025H98.9725L108.7 18.8065L103.644 12.6625H85.2125L74.3965 74.1025H49.8205L60.6365 12.6625H36.0605L25.2445 74.1025H0.668457Z" fill="currentColor"/>
                    </svg>
                    <svg id="inTitleblock" width={192} height={93} viewBox="0 0 192 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-0.00268555 92.2235L16.3173 0.0635986L191.287 0.0635986L174.967 92.2235H-0.00268555Z" fill="#51001A"/>
                    </svg>
                   
                    </div>

                    <div className={styles.details}>
                        <div className={styles.Contacts}>
                            <div className={styles.contact}>
                                <div className={styles.row}>
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.5144 5.18738C14.5144 6.34208 14.5144 9.22884 12.5144 10.3835L5.36057 14.5138C3.36057 15.6685 0.860564 14.2251 0.860565 11.9157L0.860565 3.65519C0.860565 1.34579 3.36056 -0.0975874 5.36056 1.05711L12.5144 5.18738Z" fill="currentColor"/>
                                    </svg>
                                    <p>Mail</p>
                                </div>
                                <div className={styles.pulsarArr} >
                                    {arr.map((val,ind)=>
                                        <div id='pulser' className={styles.pulser} key={`Pulsers1-${ind}`}></div>
                                    )}
                                </div>
                                <p className={styles.contactDets}>allistair.mokoena @outlook.com</p>
                            </div>
                            <div className={styles.contact}>
                                <div className={styles.row}>
                                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.5144 5.18738C14.5144 6.34208 14.5144 9.22884 12.5144 10.3835L5.36057 14.5138C3.36057 15.6685 0.860564 14.2251 0.860565 11.9157L0.860565 3.65519C0.860565 1.34579 3.36056 -0.0975874 5.36056 1.05711L12.5144 5.18738Z" fill="currentColor"/>
                                    </svg>
                                <p>LinkedIn</p>
                                </div>
                                <div className={styles.pulsarArr}>
                                    {arr.map((val,ind)=>
                                        <div id='pulser' className={styles.pulser} key={`Pulsers2-${ind}`}></div>
                                    )}
                                </div>
                                <a className={styles.contactDetsL} target='_blank' href='https://www.linkedin.com/in/allistair-mokoena-3a4043270/'>visit</a>
                            </div>
                            <div className={styles.whos}>
                                <div className={styles.who3}>
                                    <p>Allistair S. Mokoena</p>
                                </div>
                                <div className={styles.who2}>
                                    <p>Allistair S. Mokoena</p>
                                </div>
                                <div className={styles.who1}>
                                    <p>Allistair S. Mokoena</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className={styles.BracketCont3}>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.23077 0.896667V15.8198C1.23077 16.9243 2.1262 17.8198 3.23077 17.8198H18.1539" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>
                <div className={styles.BracketCont4}>
                    <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 0.896667V15.8198C17 16.9243 16.1046 17.8198 15 17.8198H0.0769043" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>
                </div>
                </div>
        </div>
    )
}