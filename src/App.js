// import components
import Navbar from "./components/Main Page/navbar/navbar"
import AboutMe from "./components/Main Page/aboutMe/aboutMe";
import BestServices from "./components/Main Page/bestServices/bestServices";
import Education from "./components/Main Page/Education/Education";
import Work_skill from "./components/Main Page/work_skill/work_skill";
import Funfact from "./components/Main Page/Funfact/Funfact";
import FreelancerWork from "./components/Main Page/FreelancerWork/FreelancerWork";
import PricingPlans from "./components/Main Page/PricingPlans/PricingPlans";
import AmazingWork from "./components/Main Page/AmazingWork/AmazingWork";
import FeaturedPosts from "./components/Main Page/Featured posts/FeaturedPosts";
import ContactMe from "./components/Main Page/ContactMe/ContactMe";
import CustomFooter from "./components/Main Page/Footer/CustomFooter";

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
      <ContactMe/>
      <CustomFooter/>
    </>

  )
}

export default App;