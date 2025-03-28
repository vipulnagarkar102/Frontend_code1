import React from 'react'
import AiSolutionCard from './AiSolutionCard'
import HighRatedCard from './SolutionHighRatedCard'
import TrendingCard from './SolutionTrendingCard'
import WorksCard from './SolutionWorksCard'

const AiSolution = () => {
  return (
    <div className='my-10'>
        <p className='font-semibold font-poppins text-[40px] text-center text-[#003F5C]'>AI Solutions That Deliver Results</p>
    
        {/* Highest rated AI Solutions:  */}
        <div className='mt-10 flex flex-wrap gap-6'>
            <div className='w-[30%]'>
            <AiSolutionCard 
                highlightedText='HIGHEST RATED'
                mainText='AI SOLUTIONS:'
                subText='That Deliver Results'
            />
            </div>
            <div className='flex flex-wrap items-center justify-center gap-8'>
                <HighRatedCard/>
                <HighRatedCard/>
                <HighRatedCard/>
            </div>
        </div>

        {/* Trending AI Solutions:  */}

        <div className='mt-10 flex flex-wrap gap-6'>
            <div className='w-[30%]'>
            <AiSolutionCard 
                highlightedText='TRENDING'
                mainText='AI SOLUTIONS:'
                subText='What’s Changing the Game'
            />
            </div>
            <div className='flex flex-wrap items-center justify-center gap-8'>
                <TrendingCard/>
                <TrendingCard/>
                <TrendingCard/>
            </div>
        </div>

        {/* AI That Works: */}

        <div className='mt-10 flex flex-wrap gap-6'>
            <div className='w-[30%]'>
            <AiSolutionCard 
                highlightedText='AI THAT'
                mainText='WORKS: '
                subText='Top Reviewed Solutions You Should Know'
            />
            </div>
            <div className='flex flex-wrap items-center justify-center gap-8'>
                <WorksCard/>
                <WorksCard/>
                <WorksCard/>
            </div>
        </div>

        
    </div>
  )
}

export default AiSolution