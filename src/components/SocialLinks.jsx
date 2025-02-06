

import React from 'react';
import '../assets/ContactPage.css'

const SocialLinks = ({ socialLinks }) => {
  if (!socialLinks) return null;

  return (
    <div className="d-flex gap-3">
      {socialLinks.map((social) => (
        <a key={social.id} href={social.link} target="_blank" rel="noopener noreferrer" className="text-decoration-none"
           dangerouslySetInnerHTML={{ __html: social.svg_text }} />
      ))}
    </div>
  );
};

export default SocialLinks;