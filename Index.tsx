import { useEffect } from "react";
import headshot from "@/assets/headshot.jpg";
import "../styles/portfolio.css";

const Index = () => {
  useEffect(() => {
    // Navigation scroll effect
    const navbar = document.getElementById("navbar");
    const navMenu = document.getElementById("nav-menu");
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelectorAll(".nav-link");

    function handleScroll() {
      if (window.scrollY > 50) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Mobile menu toggle
    const toggleHandler = () => {
      navMenu?.classList.toggle("active");
      const icon = navToggle?.querySelector("i");
      if (navMenu?.classList.contains("active")) {
        icon?.classList.remove("fa-bars");
        icon?.classList.add("fa-times");
      } else {
        icon?.classList.remove("fa-times");
        icon?.classList.add("fa-bars");
      }
    };
    navToggle?.addEventListener("click", toggleHandler);

    // Close mobile menu on link click
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu?.classList.remove("active");
        const icon = navToggle?.querySelector("i");
        icon?.classList.remove("fa-times");
        icon?.classList.add("fa-bars");
      });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll("section[id]");
    function highlightNavLink() {
      const scrollY = window.pageYOffset;
      sections.forEach((section) => {
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionId = section.getAttribute("id");
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + sectionId) {
              link.classList.add("active");
            }
          });
        }
      });
    }
    window.addEventListener("scroll", highlightNavLink);

    // Scroll animations
    const observerOptions = { root: null, rootMargin: "0px", threshold: 0.1 };
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeInObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(
      ".skill-card, .timeline-item, .project-card, .cert-card, .about-content, .contact-item, .section-header"
    );
    fadeElements.forEach((el) => {
      (el as HTMLElement).style.opacity = "0";
      (el as HTMLElement).style.transform = "translateY(30px)";
      (el as HTMLElement).style.transition = "opacity 0.6s ease, transform 0.6s ease";
      fadeInObserver.observe(el);
    });

    const style = document.createElement("style");
    style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
    document.head.appendChild(style);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");
        if (href) {
          const target = document.querySelector(href);
          target?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    // Parallax
    const parallaxHandler = () => {
      const scrolled = window.pageYOffset;
      const heroBg = document.querySelector(".hero-bg") as HTMLElement;
      if (heroBg && scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", parallaxHandler);

    // Back to top
    const backToTop = document.createElement("button");
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Back to top");
    document.body.appendChild(backToTop);

    const backToTopStyles = document.createElement("style");
    backToTopStyles.textContent = `
      .back-to-top { position:fixed;bottom:30px;right:30px;width:48px;height:48px;background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a855f7 100%);color:white;border:none;border-radius:12px;cursor:pointer;font-size:1rem;display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transform:translateY(20px);transition:all 0.3s ease;box-shadow:0 4px 15px rgba(99,102,241,0.4);z-index:999; }
      .back-to-top.visible { opacity:1;visibility:visible;transform:translateY(0); }
      .back-to-top:hover { transform:translateY(-3px);box-shadow:0 8px 25px rgba(99,102,241,0.5); }
    `;
    document.head.appendChild(backToTopStyles);

    const scrollTopHandler = () => {
      if (window.scrollY > 500) backToTop.classList.add("visible");else
      backToTop.classList.remove("visible");
    };
    window.addEventListener("scroll", scrollTopHandler);
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", highlightNavLink);
      window.removeEventListener("scroll", parallaxHandler);
      window.removeEventListener("scroll", scrollTopHandler);
      navToggle?.removeEventListener("click", toggleHandler);
      style.remove();
      backToTopStyles.remove();
      backToTop.remove();
    };
  }, []);

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar" id="navbar">
        <div className="nav-container">
          <a href="#home" className="nav-logo">
            <span className="logo-text">TR</span>
          </a>
          <div className="nav-menu" id="nav-menu">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#skills" className="nav-link">Skills</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#certifications" className="nav-link">Certifications</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <button className="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <i className="fas fa-rocket"></i>
            <span>Available for Opportunities</span>
          </div>
          <h1 className="hero-title animate-slide-up text-5xl">
            Hi, I'm <span className="gradient-text">Tanya Rajani</span>
          </h1>
          <p className="hero-subtitle animate-slide-up-delay">
            Digital Marketing Executive | SEO Specialist | MBA Graduate
          </p>
          <div className="hero-tags animate-fade-in-delay">
            <span className="hero-tag"><i className="fas fa-search"></i> SEO Specialist</span>
            <span className="hero-tag"><i className="fas fa-bullhorn"></i> Digital Marketing Expert</span>
            <span className="hero-tag"><i className="fas fa-shopping-cart"></i> E-commerce Builder</span>
            <span className="hero-tag"><i className="fas fa-pen-fancy"></i> Content Strategist</span>
            <span className="hero-tag"><i className="fas fa-graduation-cap"></i> MBA Graduate</span>
          </div>
          <p className="hero-description animate-fade-in-delay">
            Driving organic growth through <strong>Technical SEO</strong>, <strong>Content Strategy</strong>,{" "}
            <strong>E-commerce Optimization</strong> & <strong>AI-driven Marketing</strong>
          </p>
          <div className="hero-cta animate-fade-in-delay-2">
            <a href="#projects" className="btn btn-primary">
              <i className="fas fa-briefcase"></i> View My Work
            </a>
            <a href="#contact" className="btn btn-secondary">
              <i className="fas fa-envelope"></i> Get In Touch
            </a>
            <a href="https://drive.google.com/drive/folders/1sYHikT4uxV1CFw4H8y-IbuDnb4YQJwqb?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-outline shadow-none opacity-100 rounded-none border-primary text-primary bg-destructive-foreground border-none border">
              <i className="fas fa-folder-open"></i> Portfolio Drive
            </a>
          </div>
          <div className="hero-social animate-fade-in-delay-3 shadow-none">
            <a href="https://www.linkedin.com/in/tanya-rajani-827223236" target="_blank" rel="noopener noreferrer" className="social-link shadow-none" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="mailto:tanyarajani01@gmail.com" className="social-link" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
            <a href="https://www.instagram.com/_bakenflake" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://youtube.com/@tanyarajani4753" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className="scroll-indicator">
          <a href="#about" aria-label="Scroll down">
            <i className="fas fa-chevron-down"></i>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section className="section about" id="about">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">About Me</span>
            <h2 className="section-title">The Digital Architect</h2>
          </div>
          <div className="about-content">
            <div className="about-image">
              <div className="image-wrapper">
                <img src={headshot} alt="Tanya Rajani" className="about-headshot" />
                <div className="image-decoration"></div>
              </div>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Companies</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">30+</span>
                  <span className="stat-label">Projects</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2025</span>
                  <span className="stat-label">MBA</span>
                </div>
              </div>
            </div>
            <div className="about-text">
              <h3>Building Digital Presence That Drives Results</h3>
              <p>
                <strong>MBA Graduate in Digital Marketing</strong> with hands-on experience in <strong>SEO (Technical, On-page, Off-page)</strong>,
                content strategy, social media marketing, and e-commerce optimization at <strong>Meetanshi.com</strong> and <strong>Webguru.dev</strong>.
              </p>
              <p>
                I don't just understand digital marketing theory—I build it, brick by digital brick, into living, breathing ecosystems.
                I launched an entire e-commerce universe for <strong>BAKE N' FLAKE</strong>, weaving together Shopify stores, social media channels,
                blogs, and local SEO into a seamless tapestry of brand presence.
              </p>
              <p>
                Proven ability to work on live projects, execute SEO audits, improve organic visibility,
                and manage end-to-end digital initiatives. Strong interest in applying <strong>AI and automation</strong>
                to drive smarter marketing outcomes.
              </p>
              <div className="about-highlights">
                <div className="highlight-item"><i className="fas fa-check-circle"></i><span>Technical & On-page SEO Expert</span></div>
                <div className="highlight-item"><i className="fas fa-check-circle"></i><span>E-commerce Optimization (Shopify/WordPress)</span></div>
                <div className="highlight-item"><i className="fas fa-check-circle"></i><span>AI-driven Marketing Strategies (GEO, AEO, LLMO)</span></div>
                <div className="highlight-item"><i className="fas fa-check-circle"></i><span>Content Strategy & Social Media Marketing</span></div>
                <div className="highlight-item"><i className="fas fa-check-circle"></i><span>Local SEO & Google Business Profile</span></div>
                <div className="highlight-item"><i className="fas fa-check-circle"></i><span>Marketing Automation with Make.com</span></div>
              </div>
              <div className="about-cta">
                <a href="https://www.genspark.ai/api/files/s/niEYL0C7" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  <i className="fas fa-download"></i> Download Resume
                </a>
                <a href="https://drive.google.com/drive/folders/1sYHikT4uxV1CFw4H8y-IbuDnb4YQJwqb?usp=sharing" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <i className="fas fa-folder-open"></i> View Full Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section skills" id="skills">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Skills & Tools</span>
            <h2 className="section-title">What I Bring to the Table</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon"><i className="fas fa-search"></i></div>
              <h3>Search Engine Optimization</h3>
              <ul className="skill-list">
                <li>Technical SEO & Site Architecture</li>
                <li>On-page Optimization</li>
                <li>Off-page & Link Building</li>
                <li>JavaScript SEO</li>
                <li>Local SEO & GMB Optimization</li>
                <li>Core Web Vitals Optimization</li>
                <li>SEO Audits & Reporting</li>
              </ul>
            </div>
            <div className="skill-card">
              <div className="skill-icon"><i className="fas fa-pen-fancy"></i></div>
              <h3>Content Strategy</h3>
              <ul className="skill-list">
                <li>Content Planning & Creation</li>
                <li>Blog Writing & Optimization</li>
                <li>Keyword Research & Analysis</li>
                <li>Content Audits</li>
                <li>Copywriting</li>
                <li>Topic Cluster Strategy</li>
              </ul>
            </div>
            <div className="skill-card">
              <div className="skill-icon"><i className="fas fa-shopping-cart"></i></div>
              <h3>E-commerce</h3>
              <ul className="skill-list">
                <li>Shopify Store Development</li>
                <li>WordPress/WooCommerce</li>
                <li>Magento SEO (Meetanshi Experience)</li>
                <li>Product Page Optimization</li>
                <li>E-commerce SEO</li>
                <li>Conversion Rate Optimization</li>
              </ul>
            </div>
            <div className="skill-card">
              <div className="skill-icon"><i className="fas fa-robot"></i></div>
              <h3>AI-Driven Marketing</h3>
              <ul className="skill-list">
                <li>Generative Engine Optimization (GEO)</li>
                <li>Answer Engine Optimization (AEO)</li>
                <li>LLM Optimization (LLMO)</li>
                <li>Marketing Automation (Make.com)</li>
                <li>AI Content Tools</li>
                <li>Custom GPT Development</li>
                <li>Prompt Engineering</li>
              </ul>
            </div>
            <div className="skill-card">
              <div className="skill-icon"><i className="fas fa-share-alt"></i></div>
              <h3>Social Media Marketing</h3>
              <ul className="skill-list">
                <li>Social Strategy Development</li>
                <li>Instagram & Facebook Marketing</li>
                <li>LinkedIn Content Strategy</li>
                <li>YouTube Channel Management</li>
                <li>Community Management</li>
                <li>Social Media Automation</li>
              </ul>
            </div>
            <div className="skill-card">
              <div className="skill-icon"><i className="fas fa-tools"></i></div>
              <h3>Tools & Platforms</h3>
              <ul className="skill-list">
                <li>Google Analytics & Search Console</li>
                <li>SEMrush / Ahrefs</li>
                <li>Screaming Frog</li>
                <li>Mageworx SEO Suite</li>
                <li>Make.com (Automation)</li>
                <li>Canva & Design Tools</li>
                <li>Google Workspace</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section experience" id="experience">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Work Experience</span>
            <h2 className="section-title">My Professional Journey</h2>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Digital Marketing Executive</h3>
                  <span className="timeline-company">
                    <i className="fas fa-building"></i>
                    <a href="https://meetanshi.com" target="_blank" rel="noopener noreferrer">Meetanshi.com</a>
                  </span>
                  <span className="timeline-date"><i className="fas fa-calendar-alt"></i> July 2025 - Present</span>
                </div>
                <div className="timeline-body">
                  <p className="timeline-description">Leading SEO initiatives for a premier Magento development company, focusing on technical SEO, content optimization, and driving organic growth.</p>
                  <ul>
                    <li>Executing comprehensive SEO audits using Screaming Frog and Mageworx tools</li>
                    <li>Implementing technical SEO fixes including indexing errors and site architecture improvements</li>
                    <li>Managing on-page and off-page SEO strategies for Magento extensions marketplace</li>
                    <li>Optimizing meta descriptions, hreflang tags, and canonical URLs</li>
                    <li>Working on JavaScript SEO optimization for modern web applications</li>
                    <li>Analyzing competitor strategies using SEMrush and Ahrefs</li>
                    <li>Creating SEO measurement reports with KPIs tracking</li>
                  </ul>
                  <div className="timeline-tags">
                    <span className="tag">Technical SEO</span>
                    <span className="tag">On-page SEO</span>
                    <span className="tag">Magento SEO</span>
                    <span className="tag">Screaming Frog</span>
                    <span className="tag">Mageworx</span>
                  </div>
                  <div className="timeline-results">
                    <h4><i className="fas fa-chart-line"></i> Key Results:</h4>
                    <ul>
                      <li>Achieved 30% increase in organic clicks (4.15K vs 3.19K previous quarter)</li>
                      <li>Improved total impressions from 109K to 151K (38% increase)</li>
                      <li>Enhanced average position from 20 to 17.2</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>SEO Specialist</h3>
                  <span className="timeline-company">
                    <i className="fas fa-building"></i>
                    <a href="https://webguru.dev" target="_blank" rel="noopener noreferrer">Webguru.dev</a>
                  </span>
                  <span className="timeline-date"><i className="fas fa-calendar-alt"></i> July 2025</span>
                </div>
                <div className="timeline-body">
                  <p className="timeline-description">Contributed to SEO strategy and implementation for a Magento eCommerce development agency with 15+ years of experience.</p>
                  <ul>
                    <li>Conducted in-depth website audits and SEO analysis</li>
                    <li>Developed keyword strategies for Magento-related content</li>
                    <li>Created blog content plans targeting e-commerce keywords</li>
                    <li>Optimized service pages for better search visibility</li>
                    <li>Implemented 301 redirects and URL structure improvements</li>
                    <li>Assisted with Knowledge Base theme setup and optimization</li>
                  </ul>
                  <div className="timeline-tags">
                    <span className="tag">SEO Strategy</span>
                    <span className="tag">Keyword Research</span>
                    <span className="tag">Content Planning</span>
                    <span className="tag">WordPress</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>Digital Marketing & E-commerce Freelancer</h3>
                  <span className="timeline-company"><i className="fas fa-laptop-house"></i> Self-Employed</span>
                  <span className="timeline-date"><i className="fas fa-calendar-alt"></i> 2024 - 2025</span>
                </div>
                <div className="timeline-body">
                  <p className="timeline-description">Built complete digital ecosystems for local businesses while pursuing MBA.</p>
                  <ul>
                    <li>Created complete digital presence for BAKE N' FLAKE (Shopify store, GMB, Social Media, Blog)</li>
                    <li>Managed BAKERS CLUB digital marketing (GMB, Instagram, Zomato listing)</li>
                    <li>Conducted UX & Technical SEO audits for Rangachakra.com</li>
                    <li>Implemented Shopify SEO best practices and checklists</li>
                  </ul>
                  <div className="timeline-tags">
                    <span className="tag">Shopify</span>
                    <span className="tag">Local SEO</span>
                    <span className="tag">GMB</span>
                    <span className="tag">Social Media</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="timeline-item education">
              <div className="timeline-marker"><i className="fas fa-graduation-cap"></i></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3>MBA in Digital Marketing</h3>
                  <span className="timeline-company"><i className="fas fa-university"></i> University Graduate</span>
                  <span className="timeline-date"><i className="fas fa-calendar-alt"></i> 2023 - 2025</span>
                </div>
                <div className="timeline-body">
                  <p>Specialized in Digital Marketing with focus on SEO, Content Strategy, E-commerce Management, and AI-driven Marketing.</p>
                  <div className="timeline-tags">
                    <span className="tag">Digital Marketing</span>
                    <span className="tag">SEO</span>
                    <span className="tag">E-commerce</span>
                    <span className="tag">Business Strategy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section projects" id="projects">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Projects & Case Studies</span>
            <h2 className="section-title">Work That Speaks for Itself</h2>
          </div>

          <div className="work-gallery">
            <h3 className="gallery-title"><i className="fas fa-images"></i> Work Screenshots & Results</h3>
            <div className="gallery-grid">
              <div className="gallery-item">
                <img src="https://www.genspark.ai/api/files/s/NDEbROdj" alt="Google Search Console Performance - 30% increase in clicks" loading="lazy" />
                <div className="gallery-caption">Google Search Console - 30% Traffic Growth</div>
              </div>
              <div className="gallery-item">
                <img src="https://www.genspark.ai/api/files/s/UORr0iNF" alt="SEO Audit with Screaming Frog and Mageworx" loading="lazy" />
                <div className="gallery-caption">Technical SEO Audit - Screaming Frog & Mageworx</div>
              </div>
              <div className="gallery-item">
                <img src="https://www.genspark.ai/api/files/s/hMIr7RSP" alt="Technical SEO Implementation" loading="lazy" />
                <div className="gallery-caption">Technical SEO - XML Sitemap & Robots.txt</div>
              </div>
              <div className="gallery-item">
                <img src="https://www.genspark.ai/api/files/s/DkqHMHyi" alt="301 Redirects and URL Optimization" loading="lazy" />
                <div className="gallery-caption">URL Optimization & 301 Redirects</div>
              </div>
              <div className="gallery-item">
                <img src="https://www.genspark.ai/api/files/s/OfOL2jTB" alt="Meta Description Optimization" loading="lazy" />
                <div className="gallery-caption">Meta Description & Hreflang Setup</div>
              </div>
              <div className="gallery-item">
                <img src="https://www.genspark.ai/api/files/s/abPKx4EP" alt="Rangachakra Google Search Results" loading="lazy" />
                <div className="gallery-caption">Rangachakra - SERP Analysis</div>
              </div>
            </div>
          </div>

          <div className="projects-grid">
            {/* Project 1: Bake N' Flake */}
            <div className="project-card featured">
              <div className="project-image">
                <div className="project-overlay"><span className="project-category">E-commerce | SEO | Social Media</span></div>
                <div className="project-icon"><i className="fas fa-birthday-cake"></i></div>
              </div>
              <div className="project-content">
                <h3>Bake N' Flake - Complete Digital Ecosystem</h3>
                <p>End-to-end digital marketing project including Shopify store setup, SEO optimization, Google My Business profile, social media presence across all platforms, and content marketing through blog.</p>
                <div className="project-problem"><strong>Challenge:</strong> Launch a complete online presence for a local bakery business from scratch.</div>
                <div className="project-solution"><strong>Solution:</strong> Built integrated digital ecosystem with e-commerce, local SEO, social media, and content strategy working together.</div>
                <div className="project-highlights">
                  <div className="highlight"><i className="fas fa-store"></i><span>Shopify Store</span></div>
                  <div className="highlight"><i className="fas fa-map-marker-alt"></i><span>Local SEO</span></div>
                  <div className="highlight"><i className="fas fa-hashtag"></i><span>Social Media</span></div>
                  <div className="highlight"><i className="fas fa-blog"></i><span>Content Blog</span></div>
                </div>
                <div className="project-links">
                  <a href="https://bakenflake1.myshopify.com/" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-external-link-alt"></i> Shopify Store</a>
                  <a href="https://maps.app.goo.gl/KwU3eAmdGeSpU7o99" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fab fa-google"></i> GMB Profile</a>
                  <a href="https://bakenflake067.blogspot.com/p/blog-page_95.html?view=classic&m=1" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-blog"></i> Blog</a>
                  <a href="https://www.facebook.com/Bake-N-Flake-107926504956201" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fab fa-facebook"></i> Facebook</a>
                  <a href="https://www.instagram.com/_bakenflake?igsh=Y2g4NWRzaHh1NXpx" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fab fa-instagram"></i> Instagram</a>
                  <a href="https://youtube.com/@tanyarajani4753?si=pV9rCCoSeyAFkzV0" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fab fa-youtube"></i> YouTube</a>
                </div>
              </div>
            </div>

            {/* Project 2: Bakers Club */}
            <div className="project-card featured">
              <div className="project-image" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)" }}>
                <div className="project-overlay"><span className="project-category">Local SEO | Social Media | Food Business</span></div>
                <div className="project-icon"><i className="fas fa-cookie-bite"></i></div>
              </div>
              <div className="project-content">
                <h3>Bakers Club - Digital Marketing & Business Operations</h3>
                <p>Comprehensive digital marketing setup for a local bakery including Google My Business optimization, Instagram business profile management, and Zomato listing for food discovery.</p>
                <div className="project-highlights">
                  <div className="highlight"><i className="fab fa-google"></i><span>Google Business</span></div>
                  <div className="highlight"><i className="fab fa-instagram"></i><span>Instagram Business</span></div>
                  <div className="highlight"><i className="fas fa-utensils"></i><span>Zomato Listing</span></div>
                </div>
                <div className="project-links">
                  <a href="https://share.google/Yrd9RyxojJM30k6aD" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fab fa-google"></i> GMB Profile</a>
                  <a href="https://www.instagram.com/bakersclub__?igsh=MTQwN2xkcTkyZ2FmZw==" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fab fa-instagram"></i> Instagram</a>
                  <a href="https://share.google/URGkcgxt0CKLf9mZb" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-utensils"></i> Zomato</a>
                </div>
              </div>
            </div>

            {/* Project 3: Rangachakra */}
            <div className="project-card featured">
              <div className="project-image" style={{ background: "linear-gradient(135deg, #ec4899 0%, #f97316 100%)" }}>
                <div className="project-overlay"><span className="project-category">UX Audit | Technical SEO | Core Web Vitals</span></div>
                <div className="project-icon"><i className="fas fa-clipboard-check"></i></div>
              </div>
              <div className="project-content">
                <h3>Rangachakra.com - UX & Technical SEO Audit</h3>
                <p>Comprehensive UX and Technical SEO audit for an e-commerce saree website. Identified critical issues and provided actionable recommendations for improvement.</p>
                <div className="project-problem">
                  <strong>Issues Found:</strong>
                  <ul>
                    <li>CLS = 0.54 (target &lt; 0.1)</li>
                    <li>Poor LCP and TTFB scores</li>
                    <li>Image optimization gaps</li>
                    <li>Mobile usability issues</li>
                    <li>Accessibility improvements needed</li>
                  </ul>
                </div>
                <div className="project-highlights">
                  <div className="highlight"><i className="fas fa-tachometer-alt"></i><span>Core Web Vitals</span></div>
                  <div className="highlight"><i className="fas fa-mobile-alt"></i><span>Mobile UX</span></div>
                  <div className="highlight"><i className="fas fa-universal-access"></i><span>Accessibility</span></div>
                  <div className="highlight"><i className="fas fa-image"></i><span>Image Optimization</span></div>
                </div>
                <div className="project-links">
                  <a href="https://www.genspark.ai/api/files/s/vlGf8mV5" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-file-pdf"></i> View Audit Report</a>
                  <a href="https://rangachakra.com" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-external-link-alt"></i> Visit Website</a>
                </div>
              </div>
            </div>

            {/* Project 4: Meetanshi */}
            <div className="project-card">
              <div className="project-image" style={{ background: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)" }}>
                <div className="project-overlay"><span className="project-category">Technical SEO | Magento | Analytics</span></div>
                <div className="project-icon"><i className="fas fa-chart-line"></i></div>
              </div>
              <div className="project-content">
                <h3>Meetanshi.com - SEO Performance Improvement</h3>
                <p>Ongoing SEO optimization for Magento development company, achieving significant improvements in organic visibility and traffic.</p>
                <div className="project-results">
                  <strong>Results Achieved:</strong>
                  <ul>
                    <li>📈 30% increase in organic clicks</li>
                    <li>📊 38% increase in impressions</li>
                    <li>🎯 Improved avg. position from 20 to 17.2</li>
                  </ul>
                </div>
                <div className="project-highlights">
                  <div className="highlight"><i className="fas fa-chart-line"></i><span>Traffic Growth</span></div>
                  <div className="highlight"><i className="fas fa-bullseye"></i><span>Ranking Improvement</span></div>
                </div>
                <div className="project-links">
                  <a href="https://meetanshi.com" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-external-link-alt"></i> Visit Website</a>
                </div>
              </div>
            </div>

            {/* Project 5: SEO Reports */}
            <div className="project-card">
              <div className="project-image" style={{ background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)" }}>
                <div className="project-overlay"><span className="project-category">Analytics | KPIs | Reporting</span></div>
                <div className="project-icon"><i className="fas fa-chart-bar"></i></div>
              </div>
              <div className="project-content">
                <h3>SEO Measurement & Traffic Dashboard</h3>
                <p>Created comprehensive SEO measurement reports and traffic dashboards tracking key performance indicators, organic traffic metrics, ranking improvements, and ROI analysis.</p>
                <div className="project-highlights">
                  <div className="highlight"><i className="fas fa-chart-line"></i><span>Performance Tracking</span></div>
                  <div className="highlight"><i className="fas fa-bullseye"></i><span>KPI Analysis</span></div>
                </div>
                <div className="project-links">
                  <a href="https://www.genspark.ai/api/files/s/c3ZzFiTn" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-file-excel"></i> SEO KPI Report</a>
                  <a href="https://www.genspark.ai/api/files/s/M80NGLTB" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-file-excel"></i> Traffic Dashboard</a>
                </div>
              </div>
            </div>

            {/* Project 6: AI Case Studies */}
            <div className="project-card">
              <div className="project-image" style={{ background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)" }}>
                <div className="project-overlay"><span className="project-category">AI Marketing | Case Studies</span></div>
                <div className="project-icon"><i className="fab fa-google"></i></div>
              </div>
              <div className="project-content">
                <h3>AI Marketing Case Studies - Google Gemini</h3>
                <p>Real-world AI marketing case studies demonstrating practical applications of Google Gemini for content strategy, SEO optimization, and marketing automation.</p>
                <div className="project-highlights">
                  <div className="highlight"><i className="fas fa-robot"></i><span>AI Integration</span></div>
                  <div className="highlight"><i className="fas fa-lightbulb"></i><span>Practical Use Cases</span></div>
                </div>
                <div className="project-links">
                  <a href="https://gemini.google.com/share/6b6ddc9193fb" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-external-link-alt"></i> Case Study 1</a>
                  <a href="https://gemini.google.com/share/6a0be2db1c6e" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-external-link-alt"></i> Case Study 2</a>
                </div>
              </div>
            </div>

            {/* Project 7: Competitor Analysis */}
            <div className="project-card">
              <div className="project-image" style={{ background: "linear-gradient(135deg, #14b8a6 0%, #22c55e 100%)" }}>
                <div className="project-overlay"><span className="project-category">SEO Analysis | Competitor Research</span></div>
                <div className="project-icon"><i className="fas fa-search-dollar"></i></div>
              </div>
              <div className="project-content">
                <h3>SEO Competitor Analysis Report</h3>
                <p>Comprehensive competitor analysis identifying keyword gaps, backlink opportunities, and strategic recommendations for improving search rankings.</p>
                <div className="project-highlights">
                  <div className="highlight"><i className="fas fa-search"></i><span>Keyword Research</span></div>
                  <div className="highlight"><i className="fas fa-link"></i><span>Backlink Analysis</span></div>
                </div>
                <div className="project-links">
                  <a href="https://www.genspark.ai/api/files/s/4QPKQbD8" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-file-excel"></i> View Report</a>
                </div>
              </div>
            </div>

            {/* Project 8: AI Search Optimization */}
            <div className="project-card">
              <div className="project-image">
                <div className="project-overlay"><span className="project-category">GEO | AEO | LLMO</span></div>
                <div className="project-icon"><i className="fas fa-brain"></i></div>
              </div>
              <div className="project-content">
                <h3>AI Search Optimization Research (GEO, AEO, LLMO)</h3>
                <p>Research and strategy development for optimizing content for AI-powered search engines, including Generative Engine Optimization and Answer Engine Optimization.</p>
                <div className="project-highlights">
                  <div className="highlight"><i className="fas fa-robot"></i><span>GEO Strategy</span></div>
                  <div className="highlight"><i className="fas fa-comments"></i><span>AEO Implementation</span></div>
                  <div className="highlight"><i className="fas fa-brain"></i><span>LLMO</span></div>
                </div>
                <div className="project-links">
                  <a href="https://www.genspark.ai/api/files/s/ZyODqgCr" target="_blank" rel="noopener noreferrer" className="project-link"><i className="fas fa-file-pdf"></i> AI Search Guide</a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="additional-resources">
            <h3><i className="fas fa-folder-open"></i> Additional Work & Resources</h3>
            <div className="resources-grid">
              <a href="https://www.genspark.ai/api/files/s/QZlVHxgb" target="_blank" rel="noopener noreferrer" className="resource-link"><i className="fas fa-file-word"></i><span>Advanced Technical SEO Guidelines</span></a>
              <a href="https://www.genspark.ai/api/files/s/sB7iYUTQ" target="_blank" rel="noopener noreferrer" className="resource-link"><i className="fas fa-file-excel"></i><span>223-Point SEO Audit Checklist</span></a>
              <a href="https://www.genspark.ai/api/files/s/GG9pyvE7" target="_blank" rel="noopener noreferrer" className="resource-link"><i className="fas fa-file-excel"></i><span>AI Search Content Optimization Checklist</span></a>
              <a href="https://www.genspark.ai/api/files/s/j95FHqDn" target="_blank" rel="noopener noreferrer" className="resource-link"><i className="fas fa-file-excel"></i><span>Shopify SEO Checklist</span></a>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="section certifications" id="certifications">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Certifications & Training</span>
            <h2 className="section-title">Continuous Learning Journey</h2>
          </div>
          <div className="cert-grid">
            <div className="cert-card featured">
              <div className="cert-badge"><i className="fas fa-star"></i> Featured</div>
              <div className="cert-icon"><i className="fas fa-robot"></i></div>
              <h3>Generative AI Mastermind Bootcamp</h3>
              <p>Comprehensive training in AI tools, prompt engineering, custom GPT development, and marketing automation with Make.com</p>
              <ul className="cert-topics">
                <li>Foundations of Gen AI & Prompt Engineering</li>
                <li>Building Personalized AI Agents</li>
                <li>AI Automations with Make.com</li>
                <li>Custom GPT Development</li>
              </ul>
              <div className="cert-links">
                <a href="https://www.genspark.ai/api/files/s/UuPRijdM" target="_blank" rel="noopener noreferrer" className="cert-link"><i className="fas fa-certificate"></i> View Certificate 1</a>
                <a href="https://www.genspark.ai/api/files/s/ShVNH9XU" target="_blank" rel="noopener noreferrer" className="cert-link"><i className="fas fa-certificate"></i> View Certificate 2</a>
              </div>
            </div>
            <div className="cert-card">
              <div className="cert-icon"><i className="fas fa-search"></i></div>
              <h3>SEO & AI: Future of Search Optimization</h3>
              <p>Advanced training on SEO evolution with AI integration, GEO, AEO, and LLMO strategies</p>
              <div className="cert-links">
                <a href="https://www.genspark.ai/api/files/s/Nmr9CDqV" target="_blank" rel="noopener noreferrer" className="cert-link"><i className="fas fa-file-powerpoint"></i> View Training Material</a>
              </div>
            </div>
            <div className="cert-card">
              <div className="cert-icon"><i className="fas fa-graduation-cap"></i></div>
              <h3>MBA in Digital Marketing</h3>
              <p>Master's degree with specialization in Digital Marketing, E-commerce Strategy, and Business Management (2023-2025)</p>
            </div>
            <div className="cert-card">
              <div className="cert-icon"><i className="fas fa-code"></i></div>
              <h3>Advanced Technical SEO</h3>
              <p>Specialized training in JavaScript SEO, Core Web Vitals optimization, and technical auditing methodologies</p>
              <div className="cert-links">
                <a href="https://www.genspark.ai/api/files/s/QZlVHxgb" target="_blank" rel="noopener noreferrer" className="cert-link"><i className="fas fa-file-word"></i> View Guidelines</a>
              </div>
            </div>
            <div className="cert-card">
              <div className="cert-icon"><i className="fas fa-tools"></i></div>
              <h3>50+ AI Tools Mastery</h3>
              <p>Hands-on experience with diverse AI tools including Whispr Flow, Gemini, ChatGPT, and various marketing automation platforms</p>
              <div className="cert-links">
                <a href="https://www.genspark.ai/api/files/s/JJr9j8kU" target="_blank" rel="noopener noreferrer" className="cert-link"><i className="fas fa-file-pdf"></i> View Tools List</a>
              </div>
            </div>
            <div className="cert-card">
              <div className="cert-icon"><i className="fas fa-cogs"></i></div>
              <h3>Marketing Automation with Make.com</h3>
              <p>Building automated workflows for content generation, social media posting, email automation, and cold outreach</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact" id="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title">Let's Work Together</h2>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <p className="contact-intro">
                Ready to boost your digital presence? I'm always open to discussing new projects,
                creative ideas, or opportunities to be part of your vision. Whether you need SEO expertise,
                e-commerce development, or AI-driven marketing strategies - let's connect!
              </p>
              <div className="contact-details">
                <a href="mailto:tanyarajani01@gmail.com" className="contact-item">
                  <div className="contact-icon"><i className="fas fa-envelope"></i></div>
                  <div className="contact-text">
                    <span className="contact-label">Email</span>
                    <span className="contact-value">tanyarajani01@gmail.com</span>
                  </div>
                </a>
                <a href="tel:+918758277794" className="contact-item">
                  <div className="contact-icon"><i className="fas fa-phone-alt"></i></div>
                  <div className="contact-text">
                    <span className="contact-label">Phone</span>
                    <span className="contact-value">+91 8758277794</span>
                  </div>
                </a>
                <div className="contact-item">
                  <div className="contact-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <div className="contact-text">
                    <span className="contact-label">Location</span>
                    <span className="contact-value">Bhavnagar, Gujarat, India</span>
                  </div>
                </div>
                <a href="https://www.linkedin.com/in/tanya-rajani-827223236" target="_blank" rel="noopener noreferrer" className="contact-item">
                  <div className="contact-icon"><i className="fab fa-linkedin-in"></i></div>
                  <div className="contact-text">
                    <span className="contact-label">LinkedIn</span>
                    <span className="contact-value">Connect with me</span>
                  </div>
                </a>
              </div>
              <div className="contact-social">
                <h4>Find me on:</h4>
                <div className="social-grid">
                  <a href="https://www.linkedin.com/in/tanya-rajani-827223236" target="_blank" rel="noopener noreferrer" className="social-card"><i className="fab fa-linkedin-in"></i><span>LinkedIn</span></a>
                  <a href="https://www.instagram.com/_bakenflake" target="_blank" rel="noopener noreferrer" className="social-card"><i className="fab fa-instagram"></i><span>Instagram</span></a>
                  <a href="https://youtube.com/@tanyarajani4753" target="_blank" rel="noopener noreferrer" className="social-card"><i className="fab fa-youtube"></i><span>YouTube</span></a>
                  <a href="https://drive.google.com/drive/folders/1sYHikT4uxV1CFw4H8y-IbuDnb4YQJwqb?usp=sharing" target="_blank" rel="noopener noreferrer" className="social-card"><i className="fab fa-google-drive"></i><span>Portfolio Drive</span></a>
                </div>
              </div>
            </div>
            <div className="contact-cta">
              <div className="cta-card">
                <h3>Ready to Start?</h3>
                <p>Let's discuss how I can help grow your digital presence and drive results through SEO, content strategy, and AI-powered marketing.</p>
                <a href="mailto:tanyarajani01@gmail.com?subject=Let's%20Work%20Together" className="btn btn-primary btn-lg text-primary-foreground mx-[20px] bg-primary">
                  <i className="fas fa-paper-plane"></i> Send Me a Message
                </a>
                

                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="footer-logo">TR</span>
              <p className="text-muted">Digital Marketing Executive & SEO Specialist</p>
              <p className="footer-tagline text-secondary">Building digital ecosystems that drive results.</p>
            </div>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#experience">Experience</a>
              <a href="#projects">Projects</a>
              <a href="#certifications">Certifications</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-social">
              <a href="https://www.linkedin.com/in/tanya-rajani-827223236" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
              <a href="mailto:tanyarajani01@gmail.com" aria-label="Email"><i className="fas fa-envelope"></i></a>
              <a href="https://www.instagram.com/_bakenflake" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://youtube.com/@tanyarajani4753" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Tanya Rajani. All Rights Reserved.</p>
            <p className="footer-made">Made with <i className="fas fa-heart" style={{ color: "#ec4899" }}></i> for digital growth</p>
          </div>
        </div>
      </footer>
    </div>);

};

export default Index;