import React from 'react'
import youtube from '../../assets/youtube_icon.png'
import twitter from '../../assets/twitter_icon.png'
import instagram from '../../assets/instagram_icon.png'
import facebook from '../../assets/facebook_icon.png'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <button><img src={facebook} alt="" /></button>
        <button><img src={instagram} alt="" /></button>
        <button><img src={twitter} alt="" /></button>
        <button><img src={youtube} alt="" /></button>
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Terms of Use</li>
        <li>Privacy</li>
        <li>Audio Description</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>© Tech Innovators Inc. 2024</p>
    </div>
  )
}

export default Footer
