import React from 'react'
import { skills,experiences } from '../constants'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import CTA from '../components/CTA';


const About = () => {
  return (
    <section className='max-container'>
      <h1 className='head-text'>Hello, I am <span className='blue-gradient_text font-semibold drop-shadow-sm'>CC Lim</span></h1>
      <div className='mt-5 flex flex-col gap-3 text-slate-500'>
        <p>
          Software Engineer based in Malaysia.
        </p>
      </div>
      <div className='py-10 flex flex-col'>
        <h3 className='subhead-text'>My Skills</h3>
        <div className='flex-wrap mt-16 flex gap-12'>
          {skills.map((skill)=>(
            <div className='block-container w-20 h-20'>
              <div className='btn-back rounded-xl'/>
              <div className='btn-front rounded-xl flex justify-center items-center'>
                <img src={skill.imageUrl} className='w-1/2 h-1/2 object-contain'/>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='py-16'>
        <h3 className='subhead-text'>Work Experiences</h3>
        <div className='mt-5 flex flex-col gap-3 text-slate-500'>
          <p>
            I've worked with all sorts of companies and project, leveling up my skills and teaming up with smart people. Here's the rundown:-
          </p>
        </div>
        <div className='mt-12 flex'>
            <VerticalTimeline>
              {experiences.map((experience)=>(
                <VerticalTimelineElement key={experience.company_name} date={experience.date} iconStyle={{background:experience.iconBg}} contentStyle={{borderBottom:'8px',borderStyle:'solid',borderBottomColor:experience.iconBg,boxShadow:'none'}} icon={<div className='flex justify-center items-center w-full h-full'><img src={experience.icon} alt={experience.company_name} className='w-[60%] h-[60%] object-contain'/></div>}>
                  <div>
                    <h3 className='text-black text-xl font-semibold font-poppins'>
                      {experience.title}
                    </h3>
                    <p className='text-black-500 font-medium font-base' style={{margin:0}}>
                      {experience.company_name}
                    </p>
                  </div>
                  <ul className='my-5 list-disc ml-5 space-y-2'>
                    {experience.points.map((point,index)=>(
                      <li key={`experiences-point-${index}`} className='text-black-500/50 font-normal pl-1 font-sm'>
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
            </VerticalTimeline>
        </div>
      </div>
      <hr className='border-slate-200'/>
      <CTA/>
    </section>
  )
}

export default About