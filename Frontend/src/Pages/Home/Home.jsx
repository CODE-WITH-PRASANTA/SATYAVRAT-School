import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection'
import KindergartenSection from '../../components/KindergartenSection/KindergartenSection'
import GetInvolvedSection from '../../components/GetInvolvedSection/GetInvolvedSection'
import TestimonialSection from '../../components/TestimonialSection/TestimonialSection'
import Gallery from '../../components/Gallery/Gallery'
import Teacher from '../../components/Teacher/Teacher'
import BlogActivitesHome from '../../components/BlogActivitesHome/BlogActivitesHome'
import OurClasses from '../../components/OurClasses/OurClasses'
import EnrollSection from '../../components/EnrollSection/EnrollSection'
import FAQSection from '../../components/FAQSection/FAQSection'

const Home = () => {
  return (
    <div>
      <HeroSection />
      < KindergartenSection />
      <GetInvolvedSection/>
      <OurClasses />
      <EnrollSection />
       <Teacher/>
       <Gallery/>
      <TestimonialSection/>
      <BlogActivitesHome/>
      <FAQSection/>
    </div>
  )
}

export default Home
