import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaSyncAlt, FaUserSecret } from 'react-icons/fa';
import Background from '../components/Background';

const features = [
  { icon: FaShieldAlt, title: 'Military-Grade Encryption',
    text: 'AES-256 encryption—the standard trusted by governments and security experts worldwide.' },
  { icon: FaSyncAlt,   title: 'Cross-Platform Sync',
    text: 'Securely access your passwords on every device—phone, tablet, or desktop.' },
  { icon: FaUserSecret, title: 'Zero-Knowledge Architecture',
    text: 'Data is encrypted before it leaves your device; even we can’t read it.' },
];

export default function About() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <Helmet><title>About | SecureVault</title></Helmet>

      <Background />

      {/* HERO */}
      <section className="relative isolate min-h-[45vh] flex flex-col items-center justify-center text-center px-4 pt-24">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 drop-shadow">
          About <span className="text-emerald-600">SecureVault</span>
        </h1>
        <p className="mt-4 text-lg text-slate-700 max-w-xl">
          Your trusted partner in digital security
        </p>
      </section>

      {/* OUR MISSION */}
      <Section title="Our Mission">
        <p>
          At SecureVault, we believe digital security should be simple and accessible.
          Since 2023 we’ve focused on delivering a password manager that pairs
          <strong> world-class protection</strong> with effortless usability.
        </p>
      </Section>

      {/* FEATURES */}
      <Section title="Core Features">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(({ icon: Icon, title, text }) => (
            <FeatureCard key={title} title={title} icon={<Icon />} text={text} />
          ))}
        </div>
      </Section>

      {/* SECURITY COMMITMENT */}
      <Section title="Our Security Commitment" tinted>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li>Regular third-party security audits</li>
          <li>Open-source transparency for core components</li>
          <li>Continuous vulnerability testing</li>
          <li>Public bug-bounty program</li>
        </ul>
      </Section>

      {/* CTA */}
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold mb-6">Ready to take security seriously?</h2>
        <Link to="/">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg transition-colors">
            Get Started for Free
          </button>
        </Link>
      </section>
    </>
  );
}

/* ---------- small helpers ---------- */

function Section({ title, children, tinted }) {
  return (
    <section className={`py-16 px-4 ${tinted ? 'bg-emerald-50' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">{title}</h2>
        <div className="prose prose-slate">{children}</div>
      </div>
    </section>
  );
}

function FeatureCard({ title, icon, text }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:-translate-y-1 hover:shadow-md transition">
      <div className="text-emerald-600 text-3xl mb-4">{icon}</div>
      <h3 className="font-semibold text-xl mb-2">{title}</h3>
      <p className="text-slate-700">{text}</p>
    </div>
  );
}
