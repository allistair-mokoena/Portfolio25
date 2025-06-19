"use client"
import { useEffect, useState } from "react";
import styles from "./foot.module.css";
import { useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import Link from "next/link";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrambleTextPlugin)
gsap.registerPlugin(SplitText)

const Panels = [1,1,2,2,3,3,4,4,5,5,6,6]

export default function Foot(){
    const container = useRef(null)
    useGSAP(()=>{
        gsap.to(`#footTitle`, {
            duration: 1,
            scrambleText:{
                text: "PORTFOLIO",
                revealDelay: 0.5,
                chars: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
                speed: 1,
            }
        })
    },{scope: container})
    return(
        <div className={styles.OuterCont}>
            <div className={styles.LeftCont} ref={container}>
    
                <h1 className={styles.footTitle} id="footTitle">PORTFOLIO</h1>
                <div className={styles.pannelsCont}>
                    {
                        Panels.map((val,ind)=>
                            <div className={styles.Pannel} style={{width: `${ind}px`}} key={`Pannel-${ind}`} ></div>
                        )
                    }
                </div>
            </div>

            <div className={styles.rightCont}>
                <div className={styles.line}></div>
                <h2>2025</h2>
            </div>
        </div>
    )
}