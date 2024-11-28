import React from 'react'
import MainNav from '../../component/MainNav'
import Wrapper from '../../component/Wrapper'
import BackToTopButton from '../../component/BackToTopButton'
import JobList from '../../component/announcement/JobList'
import Footer from '../../component/Footer'

const JobListPage = () => {
    return (
        <div>
            <MainNav />
            <Wrapper />
            <BackToTopButton />
            <JobList />
            <Footer />
        </div>
    )
}

export default JobListPage