// import components
import Navbar from "./components/navbar/navbar"
import AboutMe from "./components/aboutMe/aboutMe";
import BestServices from "./components/bestServices/bestServices";
import Education from "./components/Education/Education";
import Work_skill from "./components/work_skill/work_skill";
import Funfact from "./components/Funfact/Funfact";
import FreelancerWork from "./components/FreelancerWork/FreelancerWork";
import PricingPlans from "./components/PricingPlans/PricingPlans";
import AmazingWork from "./components/AmazingWork/AmazingWork";
import FeaturedPosts from "./components/Featured posts/FeaturedPosts";
function App() {
  return (
    <>
      <Navbar />
      <AboutMe />
      <BestServices/>
      <Education/>
      <Work_skill/>
      <Funfact/>
      <FreelancerWork/>
      <PricingPlans/>
      <AmazingWork/>
      <FeaturedPosts/>
    </>

  )
}

export default App;