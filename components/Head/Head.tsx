"use client";
import { useEffect, useState } from "react";
import styles from "./head.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrambleTextPlugin)
gsap.registerPlugin(SplitText) 


export default function Head() {
    const router = useRouter()
    const container = useRef(null)
    const textRef = useRef<SplitText | null>(null)
    const [menu, setMenu] = useState(false);
    const [mode, setMode] = useState(false)

    
    useEffect(()=>{
        textRef.current = SplitText.create("#MenuText", {
        type: "words, chars",
        });

        gsap.from("#MenuText", {
            duration: 0.2,
            delay: 0.5,
            opacity: 0,
            ease: "power2.inOut",
        })
        gsap.from("#MenuBlock", {
            duration: 0.2,
            delay: 0.5,
            opacity: 0,
            ease: "power2.inOut",
        })
    })
    useGSAP(()=>{
        gsap.to(`#titleText`, {
            duration: 1,
            scrambleText:{
                text: "AL.S.M",
                revealDelay: 0.5,
                chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                speed: 1,
                newClass: `${styles.titleText}`
            }
        })
    },{scope: container})

    const handleScramble = () => {
        gsap.to(`#titleText`, {
            duration: 1,
            scrambleText:{
                text: "AL.S.M",
                revealDelay: 0.5,
                chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                speed: 1,
                newClass: `${styles.titleText}`
            }
        })
    }

    const handleMenuHover = () => {
        let tl = gsap.timeline();
        let tl2 = gsap.timeline(); 
        if (!textRef.current) return;
        
        tl2.to("#MenuBlock",{
            duration: 0.1, 
            y: -10,
            rotateX: 90, 
            autoAlpha: 0, 
            stagger: 0.05
        })
        tl.to(textRef.current.chars, {
            duration: 0.1, 
            y: -10,
            rotateX: 90, 
            autoAlpha: 0, 
            stagger: 0.05
        });
        tl.to(textRef.current.chars, {
            duration: 0.05, 
            y: 20, 
            autoAlpha: 0,
            rotateX: 90, 
            stagger: 0.05,
            delay: 0.05
        }, "<");
        tl2.to("#MenuBlock", {
            duration: 0.05, 
            y: 20, 
            autoAlpha: 0,
            rotateX: 90, 
            stagger: 0.05,
            delay: 0.05
        }, "<");
        tl.to(textRef.current.chars, {
            duration: 0.2, 
            y: 0, 
            autoAlpha: 1,
            rotateX: 0, 
            stagger: 0.05
        });
        tl2.to("#MenuBlock", {
            duration: 0.2, 
            y: 0, 
            autoAlpha: 1,
            rotateX: 0, 
            stagger: 0.05
        });
    }

    
    const handleMenuOut = () => {
        let tl = gsap.timeline();
        let tl2 = gsap.timeline(); 
        if (!textRef.current) return;
        
        tl2.to("#MenuBlock",{
            duration: 0.1, 
            y: 10,
            rotateX: -45, 
            autoAlpha: 0, 
            stagger: 0.05
        })
        tl.to(textRef.current.chars, {
            duration: 0.1, 
            y: 10,
            rotateX: -45, 
            autoAlpha: 0, 
            stagger: 0.05
        });
        tl.to(textRef.current.chars, {
            duration: 0.05, 
            y: -20, 
            autoAlpha: 0,
            rotateX: -90, 
            stagger: 0.05,
            delay: 0.05
        }, "<");
        tl2.to("#MenuBlock", {
            duration: 0.05, 
            y: -20, 
            autoAlpha: 0,
            rotateX: -90, 
            stagger: 0.05,
            delay: 0.05
        }, "<");
        tl.to(textRef.current.chars, {
            duration: 0.2, 
            y: 0, 
            autoAlpha: 1,
            rotateX: 0, 
            stagger: 0.05,
            ease: "power3.inOut"
        });
        tl2.to("#MenuBlock", {
            duration: 0.2, 
            y: 0, 
            autoAlpha: 1,
            rotateX: 0, 
            stagger: 0.05,
            ease: "power3.inOut"
        });
    }
    const handleReturn = (r:string)=>{
        gsap.fromTo(`.${styles.reveal}`,{
            display: 'inline',
            width: '0vw',
            height: '100vh'
        },{
            width: '100vw',
            duration: 0.5
        })
        gsap.to(`.${styles.reveal}`,{
            display: 'none',
            delay: 1,
            duration: 0.5
        })

        setTimeout(()=>{router.push(`/${r}`)},1000)
    }
    const handleMode = ()=>{
        var root = document.documentElement;
        if(!mode){
            root.style.setProperty('color-scheme','dark')
        }else{
            root.style.setProperty('color-scheme','light')
        }
        setMode(m=>!m)
        
    }
    const hendleMenuClick = () => {
        let tl = gsap.timeline();
        tl.to("#Overwipe",{
            duration: 0.2,
            width: "50%",
            ease: "power2.inOut",
        })
        
        setMenu(!menu);
        tl.to("#Overwipe",{
            duration: 0.2,
            width: "0%",
            delay: 0.2,
            ease: "power2.inOut",
        })

        tl.from("#Opts", {
            opacity: 0,
            autoAlpha: 0,
        })
    }

    return(
        <div className={styles.OuterWrapper} >
            <div className={styles.reveal} id="reveal"></div>
            <div className={styles.title} ref={container}>
                <h1 className={styles.titleText} id="titleText" onMouseEnter={handleScramble}>AL.S.M</h1>
                <h3 className={styles.sub}></h3>
            </div>

            <div className={menu ? styles.Opts : styles.MenuWrap} onMouseEnter={handleMenuHover} onMouseLeave={handleMenuOut} onClick={()=> menu ? "":hendleMenuClick()}>
                <div className={styles.overWipe} id="Overwipe"></div>
                { menu ? 
                <>
                    <button className={`${styles.menuLink} ${styles.close}`} id="Opts-4" onClick={hendleMenuClick}><span className={styles.OptsGrabL}>{`[`}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                    <span className={styles.OptsGrabR}>{`]`}</span></button>
                    <button onClick={()=>handleReturn(`about`)} className={styles.menuLink} id="Opts" ><span className={styles.OptsGrabL}>{`[`}</span>about<span className={styles.OptsGrabR}>{`]`}</span></button>
                    <button onClick={()=>handleReturn(`contact`)} className={styles.menuLink} id="Opts" ><span className={styles.OptsGrabL}>{`[`}</span>contact<span className={styles.OptsGrabR}>{`]`}</span></button>
                    <Link href="/" className={styles.menuLink} id="Opts" ><span className={styles.OptsGrabL}>{`[`}</span>home<span className={styles.OptsGrabR}>{`]`}</span></Link>
                    <button className={styles.menuLink} onClick={handleMode}><span className={styles.OptsGrabL}>{`[`}</span>
                        { !mode ? 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 4h.01"/><path d="M20 12h.01"/><path d="M12 20h.01"/><path d="M4 12h.01"/><path d="M17.657 6.343h.01"/><path d="M17.657 17.657h.01"/><path d="M6.343 17.657h.01"/><path d="M6.343 6.343h.01"/></svg>
                        }
                    <span className={styles.OptsGrabR}>{`]`}</span></button>
                </>
                :
                <>
                <h3 className={styles.menublb} id="MenuText" >MENU</h3>
                <div className={styles.block} id="MenuBlock"></div>
                </>
                }
            </div>
        </div>
    )
}