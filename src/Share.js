import React from 'react';
import Nav from 'react-bootstrap/Nav';
import {
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  LinkedinIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon,
} from "react-share";
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";


const Share = ({ title, url }) => (
  <Nav className="justify-content-center">
    <Nav.Item>
    <WhatsappShareButton quote={title} url={url}>
      <WhatsappIcon round size={32} />
    </WhatsappShareButton>
    </Nav.Item>

    <Nav.Item>
    <ViberShareButton quote={title} url={url}>
      <ViberIcon round size={32} />
    </ViberShareButton>
    </Nav.Item>

    <Nav.Item>
    <OKShareButton quote={title} url={url}>
      <OKIcon round size={32} />
    </OKShareButton>
    </Nav.Item>

    <Nav.Item>
    <MailruShareButton quote={title} url={url}>
      <MailruIcon round size={32} />
    </MailruShareButton>
    </Nav.Item>

    <Nav.Item>
    <EmailShareButton quote={title} url={url}>
      <EmailIcon round size={32} />
    </EmailShareButton>
    </Nav.Item>

    <Nav.Item>
    <FacebookShareButton quote={title} url={url}>
      <FacebookIcon round size={32} />
    </FacebookShareButton>
    </Nav.Item>

    <Nav.Item>
    <LinkedinShareButton title={title} url={url}>
      <LinkedinIcon round size={32} />
    </LinkedinShareButton>
    </Nav.Item>

    <Nav.Item>
    <RedditShareButton title={title} url={url}>
      <RedditIcon round size={32} />
    </RedditShareButton>
    </Nav.Item>

    <Nav.Item>
    <TelegramShareButton title={title} url={url}>
      <TelegramIcon round size={32} />
    </TelegramShareButton>
    </Nav.Item>

    <Nav.Item>
    <TwitterShareButton title={title} url={url}>
      <TwitterIcon round size={32} />
    </TwitterShareButton>
    </Nav.Item>

    <Nav.Item>
    <InstapaperShareButton title={title} url={url}>
      <InstapaperIcon round size={32} />
    </InstapaperShareButton>
    </Nav.Item>
  </Nav>
)

export default Share;