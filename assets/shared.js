// Shared navigation and footer templates
const NAV_HTML = `
<div class="ticker-bar">
  <div class="ticker-inner" id="ticker">
    <span class="ticker-item">Cohort Application Window Now Open — Apply Before June 30, 2026</span>
    <span class="ticker-item">New Participants Onboarded in Q1 2026 — 3 Innovations Approved</span>
    <span class="ticker-item">Regulatory Sandbox Workshop — July 12, 2026 · Kathmandu</span>
    <span class="ticker-item">NRB Innovation Challenge 2026 — Register Today</span>
    <span class="ticker-item">Updated Sandbox Guidelines Published — Download Now</span>
    <!-- duplicate for seamless loop -->
    <span class="ticker-item">Cohort Application Window Now Open — Apply Before June 30, 2026</span>
    <span class="ticker-item">New Participants Onboarded in Q1 2026 — 3 Innovations Approved</span>
    <span class="ticker-item">Regulatory Sandbox Workshop — July 12, 2026 · Kathmandu</span>
    <span class="ticker-item">NRB Innovation Challenge 2026 — Register Today</span>
    <span class="ticker-item">Updated Sandbox Guidelines Published — Download Now</span>
  </div>
</div>
<nav class="main-nav">
  <a href="index.html" class="nav-brand">
    <img src="assets/logo.png" alt="NRB RegHub Logo" class="nav-logo-img">
    <div class="nav-brand-text">
      <strong>NRB Regulatory Sandbox</strong>
      <small>Nepal Rastra Bank · FinTech Innovation</small>
    </div>
  </a>
  <div class="nav-menu">
    <div class="nav-item" id="nav-about">
      <span>About Us</span>
      <div class="nav-dropdown">
        <a href="about.html#introduction">Introduction</a>
        <a href="about.html#governance">Governance Structure</a>
        <a href="about.html#objective">Objective</a>
        <a href="about.html#scope">Scope</a>
        <a href="about.html#benefits">Benefits</a>
      </div>
    </div>
    <div class="nav-item" id="nav-framework">
      <span>Sandbox Framework</span>
      <div class="nav-dropdown">
        <a href="framework.html#target-audience">Target Audience</a>
        <a href="framework.html#eligibility">Eligibility Criteria</a>
        <a href="framework.html#products">Permissible Products</a>
        <a href="framework.html#application">Application Requirements</a>
        <a href="framework.html#process">Sandbox Process</a>
      </div>
    </div>
    <div class="nav-item" id="nav-policies">
      <span>Policies &amp; Guidelines</span>
      <div class="nav-dropdown">
        <a href="policies.html#guidelines">Guidelines on the Regulatory Sandbox</a>
        <a href="policies.html#nrb-act">Nepal Rastra Bank Act, 2058</a>
        <a href="policies.html#payment-act">Payment and Settlement Act, 2075</a>
        <a href="policies.html#forex-act">Foreign Exchange Regulations Act, 2019</a>
      </div>
    </div>
    <div class="nav-item" id="nav-stats">
      <span>Sandbox Statistics</span>
      <div class="nav-dropdown">
        <a href="statistics.html#active">Active Sandbox Participants</a>
        <a href="statistics.html#graduated">Graduated Solutions</a>
        <a href="statistics.html#highlights">Innovation Highlights</a>
      </div>
    </div>
    <div class="nav-item" id="nav-knowledge">
      <span>Knowledge Hub</span>
      <div class="nav-dropdown">
        <a href="knowledge.html#faq">Frequently Asked Questions</a>
        <a href="knowledge.html#reports">Monthly/Quarterly Reports</a>
        <a href="knowledge.html#annual">Annual Reports</a>
        <a href="knowledge.html#blogs">Innovation Blogs</a>
        <a href="knowledge.html#insights">FinTech Insights</a>
        <a href="knowledge.html#case-studies">International Case Studies</a>
        <a href="knowledge.html#infographics">Infographics</a>
        <a href="knowledge.html#videos">Informative Videos</a>
      </div>
    </div>
    <div class="nav-item" id="nav-events">
      <span>Events &amp; Announcements</span>
      <div class="nav-dropdown">
        <a href="events.html#cohort">Cohort Announcements</a>
        <a href="events.html#workshops">Workshops</a>
        <a href="events.html#challenges">Innovation Challenges</a>
      </div>
    </div>
    <a href="apply.html" class="btn nav-apply" id="nav-apply">Apply Now →</a>
  </div>
</nav>`;

const FOOTER_HTML = `
<footer class="main-footer">
  <div class="footer-grid">
    <div class="footer-brand">
      <img src="assets/logo.png" alt="NRB RegHub Logo" class="footer-logo-img">
      <p>A Nepal Rastra Bank initiative to enable responsible financial innovation within a structured regulatory environment.</p>
    </div>
    <div class="footer-col">
      <h5>Quick Links</h5>
      <ul>
        <li><a href="apply.html">Apply Now</a></li>
        <li><a href="statistics.html">Key Statistics</a></li>
        <li><a href="events.html">Events &amp; Announcements</a></li>
        <li><a href="apply.html#template">Application Template</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Document Repository</h5>
      <ul>
        <li><a href="policies.html#guidelines">Guidelines on the Regulatory Sandbox</a></li>
        <li><a href="policies.html">Key Regulations</a></li>
        <li><a href="knowledge.html#reports">Press Releases</a></li>
        <li><a href="knowledge.html#reports">Reports</a></li>
        <li><a href="knowledge.html#blogs">Blog</a></li>
        <li><a href="knowledge.html#case-studies">International Case Studies</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Contact</h5>
      <dl class="footer-contact-row">
        <dt>Office Address</dt>
        <dd>Baluwatar, Kathmandu, Nepal</dd>
        <dt>Email</dt>
        <dd>sandbox@nrb.org.np</dd>
        <dt>Phone</dt>
        <dd>+977-1-4419804</dd>
      </dl>
      <dl class="footer-contact-row" style="margin-top:16px">
        <dt>Innovation Support</dt>
        <dd>fintech@nrb.org.np</dd>
      </dl>
    </div>
  </div>
  <div class="footer-bottom">
    <span>Copyright © 2026 NRB Regulatory Sandbox. All Rights Reserved.</span>
    <div class="footer-bottom-links">
      <a href="#">Terms of Use</a>
      <a href="#">Privacy Policy</a>
      <a href="#">Terms &amp; Conditions</a>
      <a href="#">Support</a>
      <a href="knowledge.html#faq">FAQs</a>
    </div>
  </div>
</footer>`;

// Inject and highlight active nav
function initPage(activeNavId) {
  document.getElementById('nav-container').innerHTML = NAV_HTML;
  document.getElementById('footer-container').innerHTML = FOOTER_HTML;
  if (activeNavId) {
    const el = document.getElementById(activeNavId);
    if (el) el.classList.add('active');
  }
}
