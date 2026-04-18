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
<<<<<<< HEAD
      <HeroSection />
      < KindergartenSection />
      <GetInvolvedSection/>
      <OurClasses />
      <Teacher/>
       <Gallery/>
      <TestimonialSection/>
      <BlogActivitesHome/>
      <EnrollSection />
      <FAQSection/>
      
      
=======

      <section id="home">
        <HeroSection />
      </section>

      <section id="about">
        <KindergartenSection />
      </section>

      <section id="whychooseus">
        <GetInvolvedSection/>
      </section>

      <section id="classes">
        <OurClasses />
      </section>

      <section id="programms">
        <EnrollSection />
      </section>

      <section id="teachers">
        <Teacher/>
      </section>

      <section id="gallery">
        <Gallery/>
      </section>

      <section id="news">
        <BlogActivitesHome/>
      </section>

      <section id="testimonials">
        <TestimonialSection/>
      </section>

      <section id="faq">
        <FAQSection/>
      </section>

      <section id="contact">
        {/* You can place your Contact component here */}
      </section>

>>>>>>> 2b3a55396ff254168e444fdbc7ab968092109351
    </div>
  )
}

export default Home