export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sk Sazid',
    alternateName: ['Md Ahasanul Haque Sazid', 'sk_sazid', 'sksazid_sust', 'Ahasanul Haque Sazid', 'Ahasanul Sazid', 'Ahasanul Haque', 'Ahasanul', 'Sk Sazid Bogura'],
    jobTitle: 'Full Stack Developer',
    description: 'Full Stack Developer and Computer Science student at SUST with expertise in Next.js, React, Python, Machine Learning, and competitive programming',
    url: 'https://sksazid.me',
    image: 'https://sksazid.me/sksazid.webp',
    sameAs: [
      'https://github.com/sksazid01',
      'https://linkedin.com/in/sk-sazid',
      'https://twitter.com/sk_sazid',
      'https://codeforces.com/profile/sk_sazid',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Shahjalal University of Science and Technology',
      alternateName: 'SUST',
    },
    knowsAbout: [
      'Full Stack Development',
      'React',
      'Next.js',
      'TypeScript',
      'Python',
      'Machine Learning',
      'Competitive Programming',
      'Web Development',
      'Software Engineering',
      'Computer Science',
    ],
    affiliation: {
      '@type': 'Organization',
      name: 'SUST CSE',
      alternateName: 'Shahjalal University of Science and Technology - Computer Science and Engineering',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
