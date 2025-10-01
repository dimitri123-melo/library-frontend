'use client';
import React from 'react'
import './Nav.css';
import Link from 'next/link';
import { GiArchiveRegister } from "react-icons/gi";
import { MdLibraryBooks } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";
import { GiGoalKeeper } from "react-icons/gi";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { CiGift } from "react-icons/ci";
import { RiReservedFill } from "react-icons/ri";
import { FiGitPullRequest } from "react-icons/fi";
const Sidebar = () => {
  
  return (
    <div>
     <ul>
            <li><GiArchiveRegister size={20} className='inline' />
            <Link style={{marginLeft:5,}} href='/pages/librarian/registerdashboard'>Register</Link>
            </li>

            <li><MdLibraryBooks size={20} className='inline' />
            <Link style={{marginLeft:5,}} href='/pages/librarian/bookdashboard'>Books</Link>
            </li>

            <li><VscGitPullRequestGoToChanges size={20} className='inline' /> 
            <Link style={{marginLeft:5,}} href='/pages/librarian/renewdashboard'>Request</Link>
            </li>

             <li><FaHandshakeSimple size={20} className='inline' />
             <Link style={{marginLeft:5,}} href='/pages/librarian/issuedashboard'>Issue</Link>
             </li>

            <li><GiGoalKeeper size={20} className='inline' />
            <Link style={{marginLeft:5,}} href='/pages/librarian/reservedashboard'>Reserve</Link>
            </li>

            <li><MdLightMode size={20} className='inline' />
            <Link style={{marginLeft:5,}} href='/pages/librarian/requestdashboard'>Renew</Link>
            </li>

            <li><CiGift size={20} className='inline' />
            <Link style={{marginLeft:5,}} href='/pages/librarian/borrowmadedashboard'>Borrows Made</Link>
            </li>

             <li><MdLightMode size={20} className='inline' />
            <Link style={{marginLeft:5,}} href='/pages/librarian/renewmadedashboard'>Renews Made</Link>
            </li>

            <li><RiReservedFill size={20} className='inline' />
            <Link style={{marginLeft:5,}} href='/pages/librarian/reservemadedashboard'>Reserves Made</Link>
            </li>

            <li><FiGitPullRequest size={20} className='inline' />
            <Link style={{marginLeft:5,}} href='/pages/librarian/requestmadedashboard'>Requests Made</Link>
            </li>

            <li><CiGift size={20} className='inline' />
            <Link style={{marginLeft:5,}} href='/pages/librarian/TheRules'>The Rules</Link>
            </li>
          </ul>
    </div>
  )
}

export default Sidebar;