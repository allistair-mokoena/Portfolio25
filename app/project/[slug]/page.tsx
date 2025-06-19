'use client'
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react'
import styles from './slug.module.css'
import { type Project } from '@/app/page'
import { useRouter } from 'next/navigation'

import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import {Observer} from 'gsap/Observer'
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrambleTextPlugin)
gsap.registerPlugin(SplitText)
gsap.registerPlugin(Observer) 

export default function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}){
    const router = useRouter()
    const [url_slug, setUrl_slug] = useState('')
    const [loading, setLoading] = useState(true)
    const mobile = useRef(false)
    const gal: RefObject<string[]> = useRef([])
    const container = useRef(null)
    const ImgIndex = useRef(0)
    const next = useRef('')
    const prev = useRef('')

    const handleParams = async () =>{
        var { slug } = await params
        setUrl_slug(slug)
    }

    const handleReturn = ()=>{
        const tl = gsap.timeline()
        tl.fromTo('#reveal',{
            height: '100vh',
            width: '0vw',
            zIndex: '1100'
        },{
            width: '100vw',
            duration: 0.5
        })        

        setTimeout(()=>{
            router.push('/')
            tl.to('#reveal',{
                width: '0vw',
                duration: 0.1,
            })
        },1000)
    }

    const handleDelta = (indx:string)=>{
        const folder = Opts[indx].folder

        const tl = gsap.timeline()
        tl.fromTo('#reveal',{
            height: '100vh',
            width: '0vw',
            zIndex: '1100'
        },{
            width: '100vw',
            duration: 0.5
        })

        setTimeout(()=>{
            router.push(`/project${folder}`)
            tl.to('#reveal',{
                width: '0vw',
                delay: 1
            })
        },1000)

    }
    const GallerySetUp = async()=>{
        var { slug } = await params
        const imgLen = Opts[`${slug}`].gallery ?? 0
        var newGal: string[] = []
        for(let i=0;i<imgLen;i++){
            newGal.push(`IMG${i+1}`)
        }
        gal.current = newGal

        const folders = Object.keys(Opts)
        const indx = folders.findIndex((folder)=> folder == slug)

        next.current =  folders[indx+1] ? folders[indx+1] : ''
        prev.current =  folders[indx-1] ? folders[indx-1] : ''

        setLoading(false)
        if(window.innerWidth < 1020){
            mobile.current = true
            return
        }
        const tl = gsap.timeline()
        tl.fromTo('#reveal',{
            height: '100vh',
            width: '100vw'
        },{
            width: '0vw',
            delay: 0.5,
            duration: 0.5
        })
        tl.fromTo(`.${styles.title}`,{
            rotateX: 90
        },{
            rotateX: 0,
            duration: 0.3
        })
        tl.fromTo(`.${styles.img}`,{
            width: '0%'
        },{
            width: 'auto',
            duration: 1
        })
        tl.fromTo(`.${styles.title}`,{
            width: '0%'
        },{
            width: 'auto',
            duration: 1
        })
    }

    const galleryForward = async () =>{
        if(window.innerWidth < 1080){
            return
        }
        //alert('here')
        
        
        var { slug } = await params
        const len = Opts[`${slug}`].gallery ?? 0

        if(ImgIndex.current == (len - 1)){
                return
        }
        
        ImgIndex.current = ImgIndex.current + 1


        var widths = []
        var currentOffset = 0
        for(let i = 0; i<ImgIndex.current;i++){
            const img = document.getElementById(`ID-${i}`)
            widths.push(img?.offsetWidth)   
        }
        for(let i = 0; i<ImgIndex.current; i++){
            const curr = widths[i] ?? 0
            currentOffset = currentOffset + curr + 15         
        }

        //const img = document.getElementById(`ID-${ImgIndex.current}`)
        //const gal = document.getElementById('Gally')
        gsap.to('#Gally',{
                x: `-${currentOffset}px`,
                duration: 0.5,
                ease: 'power3.inOut'
            })
        
        
    }
    const galleryBack = async () =>{
        if(window.innerWidth < 1080){
            return
        }
        var { slug } = await params
        const len = Opts[`${slug}`].gallery ?? 0

        if(ImgIndex.current == 0){
                return
        }
        
        ImgIndex.current = ImgIndex.current - 1

        var widths = []
        var currentOffset = 0
        for(let i = 0; i<ImgIndex.current;i++){
            const img = document.getElementById(`ID-${i}`)
            widths.push(img?.offsetWidth)   
        }
        for(let i = 0; i<ImgIndex.current; i++){
            const curr = widths[i] ?? 0
            currentOffset = currentOffset + curr + 15         
        }

        //const img = document.getElementById(`ID-${ImgIndex.current}`)
        //const gal = document.getElementById('Gally')
        gsap.to('#Gally',{
                x: `-${currentOffset}px`,
                duration: 0.5
            })
        
    }

    
    useGSAP(()=>{
        if(window.innerWidth < 1080){
            return
        }
        Observer.create({
            target: window,
            type: "wheel,touch,pointer",
            wheelSpeed: -0.5,
            tolerance: 2,
            preventDefault: true,
            onUp: () => galleryForward(),
            onDown: () => galleryBack()
        })
    },{scope: container})
    useLayoutEffect(()=>{
        handleParams()
        GallerySetUp()
    },[loading])

      const Opts: Record<string,Project> = {
        'FF': {
        Name: 'FounderFirst',
        folder: '/FF',
        url: 'https://founder-first-git-main-allistair-mokoenas-projects.vercel.app/',
        colors: ['#4233CC','#29283E','#0073DF',['#CECECE','#C11B8D','#4233CC','#000000']],
        tools: ['React', 'Next', 'Supabase', 'Vercel','Motion'],
        gallery: 8,
        year: '2025'
        },
        'HA': {
        Name: 'Hyperscale Africa',
        folder: '/HA',
        url: 'https://www.hyperscale.africa/',
        colors: ['#171717', '#001F32','#FFFFFF','#E3D9CF'],
        tools: ['Figma','Webflow','Affinity','Blender'],
        gallery: 7,
        year: '2024'
        },
        'NS': {
        Name: 'NCP Solutions',
        folder: '/NS',
        url: 'https://ncp-solutions.webflow.io/',
        colors: ['#002AEE', '#041D2D','#DEDAD4','#A48374'],
        tools: ['Figma','Webflow','Affinity'],
        gallery: 6,
        year: '2024'
        },
        'PD': {
        Name: 'Paullettes Decor',
        folder: '/PD',
        url: 'https://paullettedecor.webflow.io/',
        colors: ['#205453', '#F2F2F2','#EBEBE1','#262626'],
        tools: ['Figma','Webflow','Affinity'],
        gallery: 7,
        year: '2024'
        },
        'P1': {
        Name: 'Portfolio 2023',
        folder: '/P1',
        url: 'https://allistairs-portfolio.webflow.io/',
        colors: ['#000000', '#d9d9d9','#FFFFFF','#161616'],
        tools: ['Figma','Webflow','Affinity','Blender'],
        gallery: 8,
        year: '2023'
        },
        'MH': {
        Name: 'Marite Harvest',
        folder: '/MH',
        url: 'https://mariteharvest.webflow.io/',
        colors: ['#002C25','#FFFFFF','#001A16','#66807C'],
        tools: ['Webflow'],
        gallery: 7,
        year: '2023'
        },
      }
    
    return(
        <div className='main' ref={container}>
        
        <div className={styles.reveal} id="reveal"></div>

        {loading ? 
        <>
            <div className={styles.loading}></div>
        </>
        :
        <div className={styles.col}>
            <button className={styles.return} onClick={handleReturn}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                return
            </button>
            <div className={styles.row}>
                <h1 className={styles.title}>{url_slug ? Opts[`${url_slug}`].Name : ''}</h1>
                <div className={styles.Controls}>
                    <a className={styles.visit} href={Opts[`${url_slug}`].url} target='_blank'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                        visit
                    </a>
                    <div className={styles.navWrap} >
                    {Opts[prev.current] ?
                    <button className={styles.nav} onClick={()=>handleDelta(prev.current)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
                         {Opts[prev.current].Name}
                    </button>
                    : '' }
                    <div className={styles.Dot}></div>
                    {Opts[next.current] ?
                    <button className={styles.nav} onClick={()=>handleDelta(next.current)}>
                        {Opts[next.current].Name}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 17 5-5-5-5"/><path d="m13 17 5-5-5-5"/></svg>
                    </button>
                    : '' }
                    </div>
                    
                    <p className={styles.lbl}>scroll</p>
                    <div className={styles.pill}>
                        <div className={styles.ind}></div>
                    </div>
                </div>
            </div>
            {url_slug ?
            <div className={styles.overFlowHide}> 
            <div className={styles.gallery} id='Gally'>
                {gal.current.map((val,ind)=>
                    <div className={styles.imgWrap} id={`ID-${ind}`} key={`ID-${ind}`}><img id={`IDImg-${ind}`} className={styles.img} src={mobile.current ? `/${url_slug}/Gallery-M/${val}.jpg`:`/${url_slug}/Gallery/${val}.png`} alt={`gallery image number ${ind+1}`}/></div>
                )}
            </div></div>:''}
            <div className={styles.row}>
            <div className={styles.toolsCont}>
                <h3 className={styles.Head}>TOOLS & TECH</h3>
                <div className={styles.toolsWrap}>
                {Opts[`${url_slug}`] ? 
                <>
                {Opts[`${url_slug}`].tools?.map((val,ind)=>
                    <img className={styles.toolsImg} src={`/Dets/${val}.png`} key={`tool-${val}`} alt={`logo-${val}`}/>
                )}
                </>
                :""}
                </div>
            </div>
            <div className={styles.yearCont}>
                <h3 className={styles.Head}>Year</h3>
                <p className={styles.Content}>{Opts[`${url_slug}`].year}</p>
            </div>
            </div>
        </div>
        }
        </div>
    )
}