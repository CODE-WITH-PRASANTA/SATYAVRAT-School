import React from 'react'
import AdminDashboardCards from '../../Component/AdminDashboardCards/AdminDashboardCards'
import AdminAnalyticsDashboard from '../../Component/AdminAnalyticsDashboard/AdminAnalyticsDashboard'
import DashboardSection from '../../Component/DashboardSection/DashboardSection'
import SocialStats from '../../Component/SocialStats/SocialStats'

const DashBoard = () => {
  return (
    <div>
      <AdminDashboardCards/>
      <AdminAnalyticsDashboard/>
      <DashboardSection/>
      <SocialStats/>
      
    </div>
  )
}

export default DashBoard
