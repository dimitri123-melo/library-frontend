'use client';
import React from 'react'
import './Nav.css';
import Link from 'next/link';
import { MdLibraryBooks } from 'react-icons/md';
import { CiGift } from 'react-icons/ci';
import { LuHistory } from "react-icons/lu";
import { TbReservedLine } from "react-icons/tb";
import { FaBoxTissue } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
const SidebarStudentTeacher = () => {
  return (
    <div>
            <ul>
                    <li><MdLibraryBooks size={20} className='inline' />
                    <Link style={{marginLeft:2,}} href='/'>Books</Link>
                    </li>

                    <li><CiGift size={20} className='inline' />
                    <Link style={{marginLeft:2,}} href='/pages/studentsTeachers/borrow'>Borrow</Link>
                    </li>

                    <li><LuHistory size={20} className='inline' />
                    <Link style={{marginLeft:2,}} href='/pages/studentsTeachers/loanHistory'>History</Link>
                    </li>

                    <li><FaBoxTissue size={20} className='inline' />
                    <Link style={{marginLeft:2,}} href='/pages/studentsTeachers/issue'>Borrow Feedback</Link>
                    </li>

                    <li><TbReservedLine size={20} className='inline' />
                    <Link style={{marginLeft:2,}} href='/pages/studentsTeachers/reserve'>Reserve</Link>
                    </li>

                    <li><TbReservedLine size={20} className='inline' />
                    <Link style={{marginLeft:2,}} href='/pages/studentsTeachers/reserveFeedback'>Reserve Feedback</Link>
                    </li>

                     <li><VscGitPullRequestGoToChanges size={20} className='inline' />
                    <Link style={{marginLeft:2,}} href='/pages/studentsTeachers/request'>Request</Link>
                    </li>

                     <li><VscGitPullRequestGoToChanges size={20} className='inline' />
                    <Link style={{marginLeft:2,}} href='/pages/studentsTeachers/requestFeedback'>Request Feedback</Link>
                    </li>

                      <li><VscGitPullRequestGoToChanges size={20} className='inline' />
                    <Link style={{marginLeft:2,}} href='/pages/studentsTeachers/renew'>Renew</Link>
                    </li>

                       <li><VscGitPullRequestGoToChanges size={20} className='inline' />
                    <Link style={{marginLeft:2,}} href='/pages/studentsTeachers/renewalFeedback'>Renew Feedback</Link>
                    </li>

                    <li><IoNotifications size={20} className='inline' />
                    <Link style={{marginLeft:2,}} href='/pages/studentsTeachers/notification'>Notifications</Link>
                    </li>
                  </ul>
    </div>
  )
}

export default SidebarStudentTeacher;