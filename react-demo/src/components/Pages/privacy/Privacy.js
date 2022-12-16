import React, { useEffect } from 'react'
import './Privacy.css';
export default function Privacy() {
  useEffect(() => {
    document.body.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  },[])
    return (
      <div className="mainContainerPrivacy">
        <div className="mainHeaderPrivacy">
          <h1>Privacy Policy</h1>
        </div>

        <div>
          <h4>Device information</h4>
          <ul>
            <li>
              <p>
                Examples of Personal Information collected: version of web
                browser, IP address, time zone, cookie information, what sites
                or products you view, search terms, and how you interact with
                the Site.
              </p>
            </li>
            <li>
              <p>
                Purpose of collection: to load the Site accurately for you, and
                to perform analytics on Site usage to optimize our Site.
              </p>
            </li>
            <li>
              <p>
                Source of collection: Collected automatically when you access
                our Site using cookies, log files, web beacons, tags, or pixels.
              </p>
            </li>
          </ul>
        </div>
        <div>
          <h4>Order information</h4>

          <ul>
            <li>
              <p>
                Examples of Personal Information collected: name, billing
                address, shipping address, payment information (including credit
                card numbers), email address, and phone number.
              </p>
            </li>
            <li>
              <p>
                Purpose of collection: to provide products or services to you to
                fulfill our contract, to process your payment information,
                arrange for shipping, and provide you with invoices and/or order
                confirmations, communicate with you, screen our orders for
                potential risk or fraud, and when in line with the preferences
                you have shared with us, provide you with information or
                advertising relating to our products or services.
              </p>
            </li>
            <li>
              <p>Source of collection: collected from you.</p>
            </li>
          </ul>
        </div>
        <div className="topicSection">
          <h4>Using Personal Information</h4>
          <p>
            We use your personal Information to provide our services to you,
            which includes: offering products for sale, processing payments,
            shipping and fulfillment of your order, and keeping you up to date
            on new products, services, and offers.
          </p>
          <h4>Retention</h4>
          <p>
            When you place an order through the Site, we will retain your
            Personal Information for our records unless and until you ask us to
            erase this information.
          </p>
        </div>
        
        <div className="topicSection">
          <h4>Cookies</h4>
          <p>
            A cookie is a small amount of information that’s downloaded to your
            computer or device when you visit our Site. We use a number of
            different cookies, including functional, performance, advertising,
            and social media or content cookies. Cookies make your browsing
            experience better by allowing the website to remember your actions
            and preferences (such as login and region selection). This means you
            don’t have to re-enter this information each time you return to the
            site or browse from one page to another. Cookies also provide
            information on how people use the website, for instance whether it’s
            their first time visiting or if they are a frequent visitor. We use
            the following cookies to optimize your experience on our Site and to
            provide our services.
          </p>
          <p>
            The length of time that a cookie remains on your computer or mobile
            device depends on whether it is a “persistent” or “session” cookie.
            Session cookies last until you stop browsing and persistent cookies
            last until they expire or are deleted. Most of the cookies we use
            are persistent and will expire between 30 minutes and two years from
            the date they are downloaded to your device. You can control and
            manage cookies in various ways. Please keep in mind that removing or
            blocking cookies can negatively impact your user experience and
            parts of our website may no longer be fully accessible. Most
            browsers automatically accept cookies, but you can choose whether or
            not to accept cookies through your browser controls, often found in
            your browser’s “Tools” or “Preferences” menu. For more information
            on how to modify your browser settings or how to block, manage or
            filter cookies can be found in your browser’s help file or through
            such sites as www.allaboutcookies.org. Additionally, please note
            that blocking cookies may not completely prevent how we share
            information with third parties such as our advertising partners.
          </p>
        </div>
        <div className="topicSection">
          <h4>Changes</h4>
          <p>
            We may update this Privacy Policy from time to time in order to
            reflect, for example, changes to our practices or for other
            operational, legal, or regulatory reasons.
          </p>
        </div>
        <div className="topicSection">
          <h4>Contact</h4>
          <p>
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by e-mail at contact@dhullo.com If you are not satisfied with our
            response to your complaint, you have the right to lodge your
            complaint with the relevant data protection authority.
          </p>
        </div>
        <div>
          <h4>Refunds</h4>
          <h5>Monthly:</h5>
          <ul>
            <li>
              <p>
              You will get a full refund before service start date.
              </p>
            </li>
            <li>
              <p>
              Once subscription starts, you are entitled to unsubscribe service with 50% return.
              </p>
            </li>
            <li>
              <p>Once subscription starts, you can reschedule dates by calling customer care (only one time).</p>
            </li>
            <li>
              <p>Once subscription starts you can’t reschedule or ask for refund after 15 days.</p>
            </li>
            <li>
              <p>In quarterly, half-yearly and yearly subscription 15 days services(excluding days services provided) refund will be processed</p>
            </li>
          </ul>
          <h5>One Time:</h5>
          <ul>
            <li>
              <p>
              Customer will get full refund if cleaner didn’t show up.
              </p>
            </li>
            <li>
              <p>
              Convenience charges(max Rs.1000/-) will be deducted, if cleaner reached your location and you refuses job due to some reason.
              </p>
            </li>
            <li>
              <p>Once subscription starts, you can reschedule dates by calling customer care (only one time).</p>
            </li>
            <li>
              <p>You can reschedule service one time, 1 hour before schedule time.</p>
            </li>
            <li>
              <p>You will not get any refund once job started.</p>
            </li>
          </ul>
        </div>
      </div>
    );
}
