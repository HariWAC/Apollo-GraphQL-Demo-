

import React from 'react';
import { Card } from 'react-bootstrap';
import SocialLinks from './SocialLinks';
import '../assets/ContactPage.css'

const ContentCard = ({ content }) => {
  switch (content.type) {
    case 'store':
      return (
        <Card key={content.id} className="mb-4">
          <Card.Body>
            <Card.Title>{content.name}</Card.Title>
            <Card.Text>
              {content.street}<br />
              {content.city}<br />
              Phone: <a href={`tel:${content.phone}`}>{content.phone}</a><br />
              Email: <a href={`mailto:${content.email}`}>{content.email}</a>
            </Card.Text>
            {content.link && <Card.Link href={content.link}>{content.link_label}</Card.Link>}
          </Card.Body>
        </Card>
      );

    case 'social_media':
      return (
        <Card key={content.id} className="mb-4">
          <Card.Body>
            <Card.Title>{content.name}</Card.Title>
            <SocialLinks socialLinks={content.socialLinks} />
          </Card.Body>
        </Card>
      );

    default:
      return null;
  }
};

export default ContentCard;