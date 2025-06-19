import gsap from "gsap";
export const flicker = (tl: gsap.core.Timeline, ref_id: string, prev: string = '0.4') =>{
    tl.fromTo(ref_id,{opacity: 0},{opacity: 1,duration: 0.1}, `-=${prev}`)
    tl.fromTo(ref_id,{opacity: 0},{opacity: 1,duration: 0.05, delay: 0.05}, '<')
    tl.fromTo(ref_id,{opacity: 0,},{opacity: 1,duration: 0.1, delay: 0.05}, `<`)
    tl.fromTo(ref_id,{opacity: 0,},{opacity: 1,duration: 0.05, delay: 0.05 }, `<`)
    tl.fromTo(ref_id,{opacity: 0,},{opacity: 1,duration: 0.1, delay: 0.05}, `<`)
    tl.fromTo(ref_id,{opacity: 0,},{opacity: 1,duration: 0.05, delay: 0.05}, `<`)
  }