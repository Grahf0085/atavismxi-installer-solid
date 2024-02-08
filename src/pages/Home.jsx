import '../styles/pages/home.css'
import landingVideo from '../assets/video/landing-video.mp4'

export function Home() {
  return (
    <>
      {/* <video class='landingVideo' src={landingVideo} muted loop autoplay /> */}
      <div class='homeContainer'>
        <h1 class='siteTitle'>Atavism XI</h1>
        <h2 class='madmen'>FOR MADMEN ONLY</h2>
        <h3 class='subTitle'>...or Party Like it's 2005</h3>
      </div>
    </>
  )
}
