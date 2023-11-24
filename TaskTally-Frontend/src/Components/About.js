import React from 'react';
import logo from './note.svg'

const About = () => {
  return (
    <div className='container'>
      <h1 className='text-center'>TASKTALLY</h1>
      <div className='d-flex justify-content-evenly'> 
        <div className='about_desc'>
          <p style={{textAlign: "justify"}}>Welcome to TASKTALLY, your online destination for efficient note-taking, organization, and task management. In our fast-paced world, it's easy to forget important information or get overwhelmed by an ever-growing to-do list. That's where TASKTALLY comes in – a user-friendly platform designed to help you store, access, and manage your notes, to-dos, and important information seamlessly.</p>

          <p>With TASKTALLY, you can easily jot down notes, create to-do lists, and keep track of all your essential details in one convenient location. Our straightforward interface makes it simple to stay organized and productive, whether you're a student, professional, or someone who just needs an easy way to keep information handy.</p>

          <h5>Key Features:</h5>
          <ul>
            <li>Easy Note-Taking: Effortlessly capture your thoughts, ideas, and important details.</li>
            <li>To-Do Lists: Stay on top of tasks and goals by creating and managing to-do lists.</li>
            <li>Cloud-Based Access: Access your notes and lists from anywhere, on any device with internet access.</li>
            <li>Secure and Private: Your data is protected to ensure your information remains confidential.</li>
          </ul>
          <p>Say goodbye to scattered notes and hello to TASKTALLY, your digital hub for staying organized. Sign up today and start simplifying your life by bringing all your information together in one place.</p>
        </div>
        <div className='about_icon'>
          <img src={logo} alt="" />
          <h6 className='text-center'>Organize. Simplify. Succeed</h6>
        </div>
      </div>
    </div>
  )
}

export default About