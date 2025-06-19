"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import {EasePack} from 'gsap/EasePack'
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Metrophobic } from "next/font/google";
import { flicker } from "@/components/Flicker";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrambleTextPlugin)
gsap.registerPlugin(EasePack)
gsap.registerPlugin(SplitText)

export type Project = {
  Name: string;
  url: string;
  folder: string;
  colors: any;
  tools?: string[];
  gallery?: number;
  year?: string;
}

export default function Home() {

  const router = useRouter()
  const [gridArr, setGridArr] = useState<string[][] | null[][]>([[]])
  const [show, setShow] = useState(false)
  const [option, setOption] = useState<Project|null>(null)
  const container = useRef(null)
  const mobile = useRef(false)
  
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
  const Opts = [
    {
      Name: 'FounderFirst',
      folder: '/FF',
      url: 'https://founder-first-git-main-allistair-mokoenas-projects.vercel.app/',
      colors: ['#4233CC','#29283E','#0073DF',['#CECECE','#C11B8D','#4233CC','#000000']]
    },
    {
      Name: 'Hyperscale Africa',
      folder: '/HA',
      url: 'https://www.hyperscale.africa/',
      colors: ['#171717', '#001F32','#FFFFFF','#E3D9CF']
    },
    {
      Name: 'NCP Solutions',
      folder: '/NS',
      url: 'https://ncp-solutions.webflow.io/',
      colors: ['#002AEE', '#041D2D','#DEDAD4','#A48374']
    },
    {
      Name: 'Paullettes Decor',
      folder: '/PD',
      url: 'https://paullettedecor.webflow.io/',
      colors: ['#205453', '#F2F2F2','#EBEBE1','#262626']
    },
    {
      Name: 'Portfolio 2023',
      folder: '/P1',
      url: 'https://allistairs-portfolio.webflow.io/',
      colors: ['#000000', '#d9d9d9','#FFFFFF','#161616']
    },
    {
      Name: 'Marite Harvest',
      folder: '/MH',
      url: 'https://mariteharvest.webflow.io/',
      colors: ['#002C25','#FFFFFF','#001A16','#66807C']
    },
  ]
  const [project, setProject] = useState<number|null>(null)


  useGSAP(()=>{
    let tl = gsap.timeline()

    if(window.innerWidth > 1020){
      tl.fromTo('#Outer',{
        width: '2px',
        height: '2px'
      },
      {
        width: '100%',
        height: '60%',
        duration: 0.6
      })
      tl.to('#Outer',{
        height: '100%',
        duration: 0.2
      })
    }else{
      tl.fromTo('#Outer',{
        width: '2px',
        height: '2px'
      },
      {
        width: '100%',
        height: '75vh',
        duration: 0.6
      })
    }
    
    
  
    flicker(tl, '#inTitleA', '0.1')
    flicker(tl, '#inTitleL', '0.1')
    flicker(tl, '#inTitle-', '0.3')
    flicker(tl, '#inTitleS', '0.4')
    flicker(tl, '#inTitle-', '0.2')
    flicker(tl, '#inTitleM', '0.3')

    tl.fromTo(`.${styles.introWrap}`,{autoAlpha: 0}, {autoAlpha: 1, duration: 1})
    tl.fromTo(`#Opt-All`,{
        rotateX: 90
      },{
        rotateX: 0,
        duration: 0.2
      }, '<')

    tl.fromTo(`#rail`,{
        width: '0%'
      },{
        width: '100%',
        duration: 1
      },)
    
    

  },{scope: container})

  const handleClose = () =>{
    document.getElementById('Close')?.click()
  }
  const handleWipe = () =>{
    const tl = gsap.timeline()

    tl.fromTo(`.${styles.WipeOver}`,{
      display: 'inline',
      width: '0vw'
    },{
      width: '95vw'
    })

    tl.to(`.${styles.WipeOver}`,{
      width: '0vw',
      display: 'none'
    })
  }
  const handleALSM = ()=>{
    let tl = gsap.timeline()
    flicker(tl, '#inTitleA', '0.1')
    flicker(tl, '#inTitleL', '0.1')
    flicker(tl, '#inTitle-', '0.3')
    flicker(tl, '#inTitleS', '0.4')
    flicker(tl, '#inTitle-', '0.2')
    flicker(tl, '#inTitleM', '0.3')
  }

  const handleMore = (folder: string) =>{

    gsap.fromTo(`.${styles.reveal}`,{
      display: 'inline',
      width: '0vw',
      height: '100vh'
    },{
      width: '100vw',
      duration: 0.5
    })

    setTimeout(()=>{router.push(`/project${folder}`)},800)
  }
  useEffect(()=>{
    if(window.innerWidth < 1020){
      mobile.current = true
    }
    const GridCont = document.getElementById('GridCont') as HTMLDivElement
    const rect = GridCont.getBoundingClientRect()

    const Rows = Math.floor(rect.height /30)-4
    const Cols = Math.floor(rect.width /18)-3

    console.log(Rows)
    console.log(Cols)
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
  return (
    <div className="main">
      
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
      <div className={styles.reveal}></div>
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
            <div className={styles.introWrap}>
            <div className={styles.intro1}>
              <div className={styles.introDesc}>
                <svg width="13" height="14" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1924 5.17115C14.1924 6.32585 14.1924 9.2126 12.1924 10.3673L5.03854 14.4976C3.03854 15.6523 0.538543 14.2089 0.538543 11.8995L0.538543 3.63896C0.538544 1.32956 3.03854 -0.113823 5.03854 1.04088L12.1924 5.17115Z" fill="currentColor"/>
                </svg>
                <p>WHO</p>
              </div>
              <p className={styles.IntroContent}>Allistair S. Mokoena</p>
            </div>
            <div className={styles.intro1}>
              <div className={styles.introDesc}>
                <svg width="13" height="14" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1924 5.17115C14.1924 6.32585 14.1924 9.2126 12.1924 10.3673L5.03854 14.4976C3.03854 15.6523 0.538543 14.2089 0.538543 11.8995L0.538543 3.63896C0.538544 1.32956 3.03854 -0.113823 5.03854 1.04088L12.1924 5.17115Z" fill="currentColor"/>
                </svg>
                <p>USING</p>
              </div>
              <p className={styles.IntroContent}>React / Next.JS /Figma / Webflow / +</p>
            </div>
            </div>
            
            <div className={styles.back} onMouseEnter={handleALSM}>
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
            </div>

            <div className={styles.introWrap}>
            <div className={styles.intro2}>
              <p className={styles.introPara}>My goal is to deliver technical refinement with creative flare while respecting project context and stakeholder expectations</p>
            </div>
            <div className={styles.intro1}>
              <div className={styles.introDesc}>
                <svg width="13" height="14" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.1924 5.17115C14.1924 6.32585 14.1924 9.2126 12.1924 10.3673L5.03854 14.4976C3.03854 15.6523 0.538543 14.2089 0.538543 11.8995L0.538543 3.63896C0.538544 1.32956 3.03854 -0.113823 5.03854 1.04088L12.1924 5.17115Z" fill="currentColor"/>
                </svg>
                <p>WHAT</p>
              </div>
              <p className={styles.IntroContent}>Designer // Developer</p>
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
        <h2 className={styles.projhead}>Projects</h2>
        <button onClick={()=>setProject(null)} className={styles.Hide} id="Close">j</button>
        <div className={styles.Opts}>
          
          <div className={styles.OptsLeft}>
            {Opts.slice(0,3).map((val,ind)=>
              <div className={project != ind ? styles.Opt : styles.OptN} key={`Opt-${ind}`} id={`Opt-All`} onMouseOver={()=>{project == ind ? '': setOption(val)}} onMouseLeave={()=>setOption(null)} onClick={()=>{project == ind ? '' : setProject(ind); handleWipe(); setOption(null);}}
              >
                <div id='rail' className={project != ind ? `${styles.rail}` : `${styles.railN}`}>
                  <div className={styles.railFill}></div>
                </div>
                <div className={styles.ContentOpt}>
                  { project != ind ? 
                    <h3 onClick={()=>setOption(val)} className={styles.OptTitle}>{val.Name}</h3>
                    :
                    <div className={styles.OptsOptions} id="OptsOptions">
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 11.1006L6.5 6.10065L1.5 1.10065M8.5 11.1006L13.5 6.10065L8.5 1.10065" stroke="#EBEBEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div onClick={handleClose} className={styles.OptsButtons} id="OptsButtons" >Close</div>
                      <button className={styles.OptsButtons} id="OptsButtons" onClick={()=>{handleMore(val.folder)}}>More</button>
                      <Link href={val.url} className={styles.OptsButtons} id="OptsButtons">Visit</Link>
                    </div>
                  }
                </div>
              </div>
            )}
          </div>
          <div className={styles.OptsLeft}>
            {Opts.slice(3,6).map((val,ind)=>
              <div className={project != ind+3 ? styles.Opt : styles.OptN} key={`Opt-${ind+3}`} id={`Opt-All`} onMouseOver={()=>{project == ind+3 ? '': setOption(val)}} onMouseLeave={()=>setOption(null)} onClick={()=>{ project == ind+3 ? '' : setProject(ind+3); handleWipe(); setOption(null)}}>
                <div id='rail' className={project != ind+3 ? `${styles.rail}` : `${styles.railN}`}>
                  <div className={styles.railFill}></div>
                </div>
                <div className={styles.ContentOpt}>
                  { project != ind+3 ? 
                    <h3 onClick={()=>setOption(val)} className={styles.OptTitle}>{val.Name}</h3>
                    :
                    <div className={styles.OptsOptions} id="OptsOptions">
                      <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.5 11.1006L6.5 6.10065L1.5 1.10065M8.5 11.1006L13.5 6.10065L8.5 1.10065" stroke="#EBEBEB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div onClick={handleClose} className={styles.OptsButtons} id="OptsButtons" >Close</div>
                      <button className={styles.OptsButtons} id="OptsButtons" onClick={()=>{handleMore(val.folder)}}>More</button>
                      <Link href={val.url} target="_blank" className={styles.OptsButtons} id="OptsButtons">Visit</Link>
                    </div>
                  }
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      { option ?
        <div className={styles.ProjectHov}>
          <Image className={styles.LogoHov} src={`${option.folder}/Logo.png`} width={1080} height={1080} alt="Logo"/>
        </div>
      :''}
      <div className={styles.WipeOver}></div>
      { Opts.map((proj,ind)=>
      <div key={`Opts-${ind}`} className={project == ind ? `${styles.Project}`:`${styles.Project} ${styles.Hide}`}>
        <div className={styles.LogoTitle}>
          <Image className={styles.Logo} src={`${proj.folder}/Logo.png`} width={1080} height={1080} alt="Logo"/>
          <Image className={styles.Title} src={`${proj.folder}/Title.png`} width={1080} height={2560} alt="Title"/>
        </div>
        <div className={styles.Desktop}>
          <Image className={styles.DesktopImg} src={`${proj.folder}/Desktop.png`} width={1920} height={878} alt="Desktop"/>
        </div>
        <div className={styles.Mobile}>
          <div className={styles.MobileImg}>
            <Image className={styles.MobilePNG} src={`${proj.folder}/Mobile.png`} width={1080} height={2088} alt="Mobile"/>
          </div>
          <div className={styles.PalleteCont}>
            <div className={styles.Pallete} style={{backgroundColor: String(proj?.colors[0])}}></div>
            <div className={styles.Pallete} style={{backgroundColor: String(proj?.colors[1])}}></div>
            <div className={styles.Pallete} style={{backgroundColor: String(proj?.colors[2])}}></div>
            <div className={styles.Pallete} style={ proj?.colors[0].length > 0  ? {backgroundImage: `linear-gradient(45deg ,${proj?.colors[3].toString()}`} : {backgroundColor: proj?.colors[3]}}></div>
          </div>
        </div>
      </div>)
      }
    </div>
  );
}
