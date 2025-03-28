import { Link } from "react-router-dom";
import Background from "./Background";


export default function About() {
  
    
        return ( 
          <>  <Background/>
          <div className="about-page min-h-[calc(100vh-57px)] container mx-auto px-4  pt-16 py-8">
         
            <header className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">About SecureVault</h1>
              <p className="text-gray-600 text-lg">
                Your Trusted Partner in Digital Security
              </p>
            </header>
      
            <section className="mb-16">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  At SecureVault, we believe in making digital security simple and accessible for everyone.
                  Our password manager helps you protect your online accounts while maintaining
                  convenience and ease of use.
                </p>
                <p className="text-gray-600">
                  Founded in 2023, we dedicated ourselves to creating the most secure yet user-friendly
                  password management solution available.
                </p>
              </div>
            </section>
      
            <section className="features-grid grid md:grid-cols-3 gap-8 mb-16">
              <div className="feature-card p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Military-Grade Encryption</h3>
                <p className="text-gray-600">
                  We use AES-256 encryption, the same standard trusted by governments and security
                  experts worldwide.
                </p>
              </div>
              <div className="feature-card p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Cross-Platform Sync</h3>
                <p className="text-gray-600">
                  Access your passwords securely across all your devices, including smartphones, tablets,
                  and computers.
                </p>
              </div>
              <div className="feature-card p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Zero-Knowledge Architecture</h3>
                <p className="text-gray-600">
                  Your data is encrypted before it leaves your device. Not even our team can access
                  your information.
                </p>
              </div>
            </section>

      
            <section className="security-commitment bg-green-300 p-8 rounded-lg mb-16">
              <h2 className="text-2xl font-semibold mb-6">Our Security Commitment</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-4">
                <li>Regular third-party security audits</li>
                <li>Open-source transparency for core components</li>
                <li>Continuous vulnerability testing</li>
                <li>Bug bounty program</li>
              </ul>
            </section>

            <section className="cta-section text-center py-4">
              <h2 className="text-3xl font-bold mb-6">Ready to Take Security Seriously?</h2>
              <Link to='/' ><button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
                Get Started for Free
              </button></Link>
            </section>
          </div>
          </>
        );
      }
      
      
